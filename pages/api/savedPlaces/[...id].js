import dbConnect from '@/models/dbConnect';
import SavedPlace from '@/models/SavedPlace';
import { cleanSchema } from '@/lib/formater';

export default async function handler(req, res) {
  const allowedMethods = ["GET", "POST", "DELETE"]
  const method = req.method

  if (!allowedMethods.includes(method)) {
    res.setHeader("Allow", allowedMethods)
    res.status(405).end(`Method ${method} Not Allowed`)
  }
  
  await dbConnect();
  if (method === "GET") {
    const {id} = req.query
    const placeId = id[0]
    const userId = id[1]
    if(userId === "") {
      const savedplaces = await SavedPlace.find({"userId":placeId})
    }
    else {
      const savedplaces = await SavedPlace.find({"placeId":placeId, "userId":userId})
    }
    res.status(200).json(savedplaces.map(item => cleanSchema(item)))
  }
}
