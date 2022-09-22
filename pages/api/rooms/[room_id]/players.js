import { getSession } from 'next-auth/react';
import Room from '../../../../Schema/Room';
import { connectDb } from '../../../../utils/db';
import { ObjectId } from 'mongodb';
import User from '../../../../Schema/User';
import Frivia from '../../../../Schema/Frivia';

export default async function handler(request, response) {
  try {
    connectDb(); // connect to db

    const session = await getSession({ req: request }); // get session

    if (!session) {
      return response.status(401).json({ error: 'Not authenticated' }); // if session is not set block access
    }
    switch (request.method) {
      case 'GET':
        let rooms = await Room.find({
          _id: ObjectId(request.query.room_id),
        }).sort({ createdAt: -1 }); // get rooms with certain id from GET['room_id']

        if (rooms.length === 0) {
          response.status(404).json({ error: 'Room not found' }); // if no such room was found respond with 404 error
        }

        let users = await User.find({
          _id: { $in: rooms[0].players },
        }).lean(); // find users which IDs match the IDs of players that belong to fhe found room

        let frivia = await Frivia.find({
          roomId: ObjectId(request.query.room_id),
        }); // find frivia that belong to the room with certain id from GET['room_id']

        users.map(userInRoom => {
          // iterate through players
          userInRoom.rightAnswers = 0; // initiate new property for object User: rightAnswers
          userInRoom.totalAnswers = 0; // initiate new property for object User: totalAnswers
          frivia.map(friviaInRoom => {
            // iterate through frivias
            const correctAnswers = friviaInRoom.answers.reduce(
              (filtered, answer) => {
                if (answer.correct) {
                  filtered.push(answer.value);
                }
                return filtered;
              },
              []
            ); // create new array "correctAnswers" that contains only correct answers from frivias that belong to this room

            friviaInRoom.userAnswers.map(userAnswered => {
              // iterate through answers submitted by players
              if (userAnswered.userId.valueOf() === userInRoom._id.valueOf()) {
                // check if answer belongs to the player
                userInRoom.totalAnswers++; // increment total answers submitted by player

                if (correctAnswers.includes(userAnswered.value)) {
                  userInRoom.rightAnswers++; // if player's answer was correct increment total correct answers submitted by player
                }
              }
            });
          });
        });

        response.status(200).json(users); // return players

        break;

      case 'PATCH':
        let room = await Room.findById(request.query.room_id).exec(); // get room with certain id from GET['room_id']

        if (room.players.includes(session.user.id)) {
          return response
            .status(400)
            .json({ error: 'Already active in the Room' }); // if player already belongs to this room respond with 400
        }
        await Room.findByIdAndUpdate(room._id, {
          // add player to the players belonging to the room
          $push: {
            players: session.user.id,
          },
        });

        response.status(200).json(room); // respond with room
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
