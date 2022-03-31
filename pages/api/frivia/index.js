import { getSession } from "next-auth/react";
import Room from "../../../schema/Room";
import { connectDb } from "../../../utils/db";
import Frivia from "../../../schema/Frivia";
import { FaRegCommentDots } from "react-icons/fa";

export default async function handler(request, response) {
  try {
    connectDb();

    const session = await getSession({ req: request });
    
    switch (request.method) {
        case "GET":
          if (session) {
            const frivias = await Frivia.find()
              .sort({ createdAt: -1 })
              .limit(100)
              .where({ userId: session.user.id })
              .populate("userId");
            response.status(200).json(frivias);
          } else {
            response.status(401).json({ error: "Not authenticated" });
          }
          break;
  
        case "POST":
          if (session) {
            const createdFrivia = await Frivia.create({
              ...request.body,
              userId: session.user.id,
               
            });
            response.status(200).json({ success: true, data: createdFrivia });
          } else {
            response.status(401).json({ error: "Not authenticated" });
          }
          break;
  
        default:
          console.log("request method was neither GET or POST");
          response.status(405).json({ error: "Method not allowed" });
          break;
      }
    } catch (error) {
      console.error(error.message);
      response.status(500).json({ error: error.message });
    }
  }
