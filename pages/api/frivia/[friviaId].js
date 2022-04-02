import { getSession } from "next-auth/react";
import { connectDb } from "../../../utils/db";
import Frivia from "../../../Schema/Frivia";

export default async function handler(request, response) {
  const { friviaId } = request.query;

  try {
    connectDb();

    const session = await getSession({ req: request });

    switch (request.method) {
      case "GET":
        const getFrivia = await Frivia.findById(friviaId).exec();
        response.status(200).json(getFrivia);
        break;

      default:
        console.log("request method was neither PATCH or DELETE");
        response.status(405).json({ error: "Method not allowed" });
        break;

      case "PATCH":
        const modifyFrivia = await Frivia.findByIdAndUpdate(
          friviaId,
          {
            $set: request.body,
          },
          { returnDocument: "after", runValidators: true }
        );
        break;
    }
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: error.message });
  }
}