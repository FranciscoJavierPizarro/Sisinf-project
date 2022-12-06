import dbConnect from '@/models/dbConnect';
import SavedPlace from '@/models/SavedPlace';

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
    if(userId === undefined) {
      const savedplaces = await SavedPlace.find({"userId":placeId})
      res.status(200).json(savedplaces)
    } else if(userId === "0") {
      const savedplaces = await SavedPlace.find({"placeId":placeId}).count()
      res.status(200).json({nsavedplaces:savedplaces})
    }
    else {
      const savedplaces = await SavedPlace.find({"placeId":placeId, "userId":userId})
      res.status(200).json(savedplaces)
    }
  }
}
