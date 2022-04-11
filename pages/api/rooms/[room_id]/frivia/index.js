import { getSession } from 'next-auth/react';
import { connectDb } from '../../../../../utils/db';
import Frivia from '../../../../../Schema/Frivia';
import { ObjectId } from 'mongodb';

export default async function handler(request, response) {
  console.log(request.query);
  try {
    connectDb();

    const session = await getSession({ req: request });
    let x = '-answers.correct';

    if (request.query.includeCorrect === 'true') {
      x = null;
    }

    switch (request.method) {
      case 'GET':
        if (session) {
          let frivias = await Frivia.find({
            roomId: request.query.room_id,
          })
            .sort({ createdAt: -1 })
            .limit(100)
            .populate('userId')
            .select(x)
            .lean();

          frivias = frivias.map(frivia => {
            frivia.userAnswered = false;
            frivia.userAnswers.map(answer => {
              if (answer.userId.valueOf() === session.user.id) {
                frivia.userAnswered = true;
              }
            });
            return frivia;
          });

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
