import { getSession } from 'next-auth/react';
import Room from '../../../../Schema/Room';
import { connectDb } from '../../../../utils/db';
import { ObjectId } from 'mongodb';
import User from '../../../../Schema/User';
import Frivia from '../../../../Schema/Frivia';

export default async function handler(request, response) {
  try {
    connectDb();

    const session = await getSession({ req: request });

    if (!session) {
      return response.status(401).json({ error: 'Not authenticated' });
    }
    switch (request.method) {
      case 'GET':
        let rooms = await Room.find({
          _id: ObjectId(request.query.room_id),
        }).sort({ createdAt: -1 });

        if (rooms.length === 0) {
          response.status(404).json({ error: 'Room not found' });
        }

        let users = await User.find({
          _id: { $in: [rooms[0].players] },
        }).lean();

        let frivia = await Frivia.find({
          roomId: ObjectId(request.query.room_id),
        });

        users.map(userInRoom => {
          userInRoom.rightAnswers = 0;
          userInRoom.totalAnswers = 0;
          frivia.map(friviaInRoom => {
            const correctAnswers = friviaInRoom.answers.reduce(
              (filtered, answer) => {
                if (answer.correct) {
                  filtered.push(answer.value);
                }
                return filtered;
              },
              []
            );

            friviaInRoom.userAnswers.map(userAnswered => {
              if (userAnswered.userId.valueOf() === userInRoom._id.valueOf()) {
                userInRoom.totalAnswers++;

                if (correctAnswers.includes(userAnswered.value)) {
                  userInRoom.rightAnswers++;
                }
              }
            });
          });
        });

        response.status(200).json(users);

        break;

      case 'PATCH':
        let room = await Room.findById(request.query.room_id).exec();

        if (room.players.includes(session.user.id)) {
          return response
            .status(400)
            .json({ error: 'Already active in the Room' });
        }
        let modifyRoom = await Room.findByIdAndUpdate(
          room._id,
          {
            $push: {
              players: session.user.id,
            },
          },
          { returnDocument: 'after', runValidators: true }
        );

        response.status(200).json(room);
        break;

      default:
        response.status(405).json({ error: 'Method not allowed' });
        break;
    }
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: error.message });
  }
}
