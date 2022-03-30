import { getSession } from "next-auth/react";
import Room from "../../../schema/Room";
import { connectDb } from "../../../utils/db";

export default async function handler(request, response) {
  try {
    connectDb();

    const session = await getSession({ req: request });

    switch (request.method) {
      case "POST":
        if (session) {
          const createdRoom = await Room.create({
            ...request.body,
            userId: session.user.id,
          });
          response.status(200).json({ success: true, data: createdRoom });
        } else {
          response.status(401).json({ error: "Not authenticated" });
        }
        break;

      default:
        response.status(405).json({ error: "Method not allowed" });
        break;
    }
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: error.message });
  }
}
