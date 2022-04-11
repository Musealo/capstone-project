import { getSession } from 'next-auth/react';
import User from '../../../Schema/User';
import { connectDb } from '../../../utils/db';

export default async function handler(request, response) {
  try {
    connectDb();

    const session = await getSession({ req: request });

    if (!session) {
      return response.status(401).json({ error: 'Not authenticated' });
    }
    switch (request.method) {
      case 'GET':
        let users = await User.find()
          .sort({ createdAt: -1 })
          .where({ userId: session.user.id });

        response.status(200).json(users);

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
