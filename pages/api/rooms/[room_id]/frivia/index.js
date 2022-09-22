import { getSession } from 'next-auth/react';
import { connectDb } from '../../../../../utils/db';
import Frivia from '../../../../../Schema/Frivia';
import { ObjectId } from 'mongodb';

export default async function handler(request, response) {
  try {
    connectDb();

    const session = await getSession({ req: request });
    let x = '-answers.correct';

    if (request.query.oldFrivias && request.query.oldFrivias === 'true') {
      x = null;
    }

    switch (request.method) {
      case 'GET':
        if (session) {
          let frivias = await Frivia.find({
            // find frivias of that room per request
            roomId: request.query.room_id,
          })
            .sort({ createdAt: -1 })
            .limit(100)
            .populate('userId')
            .select(x)
            .lean();

          if (request.query.youAsked && request.query.youAsked === 'true') {
            frivias = frivias.filter(userFrivia => {
              if (userFrivia.userId._id.valueOf() === session.user.id) {
                return userFrivia;
              }
            });
            return response.status(200).json(frivias);
          } // if the user asked the question then filter it out and send it on your frivia page

          frivias = frivias.reduce((filtered, frivia) => {
            if (frivia.userId._id.valueOf() === session.user.id) {
              return filtered;
            } // remove frivias the user made

            frivia.userAnswers = frivia.userAnswers.filter(answer => {
              return answer.userId._id.valueOf() === session.user.id;
            }); // get all answers of the user

            if (
              request.query.oldFrivias &&
              request.query.oldFrivias === 'true'
            ) {
              if (frivia.userAnswers.length > 0) {
                // sends it to old frivia
                filtered.push(frivia);
              }
            } else {
              if (frivia.userAnswers.length === 0) {
                // sends it to current frivia
                filtered.push(frivia);
              }
            }

            return filtered;
          }, []);

          response.status(200).json(frivias);
        } else {
          response.status(401).json({ error: 'Not authenticated' });
        }
        break;

      case 'POST':
        if (session) {
          const createdFrivia = await Frivia.create({
            ...request.body,
            userId: session.user.id,
          });
          response.status(200).json({ success: true, data: createdFrivia });
        } else {
          response.status(401).json({ error: 'Not authenticated' });
        }
        break;

      case 'PATCH':
        const updatedFrivia = await Frivia.findByIdAndUpdate(
          friviaId,
          {
            $set: request.body,
          },
          { returnDocument: 'after', runValidators: true }
        ).where({ userId: session.user.id });

        if (updatedFrivia) {
          response.status(200).json({
            success: true,
            data: updatedFrivia,
          });
        } else {
          response.status(404).json({ error: 'Not found' });
        }

        break;

      default:
        console.log('request method was neither GET or POST');
        response.status(405).json({ error: 'Method not allowed' });
        break;
    }
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: error.message });
  }
}
