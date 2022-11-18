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
    const savedplaces = await SavedPlace.find({})
    res.status(200).json(savedplaces.map(item => cleanSchema(item)))
  } else if (method === "POST") {
    const data = req.body
    const save = await SavedPlace.create(data)
    res.status(201).json(cleanSchema(save))
  } else if (method === "DELETE") {
    const {placeId,userId} = req.body
    await SavedPlace.deleteOne({placeId: placeId,userId: userId})
    res.status(204).json()
  }
}
