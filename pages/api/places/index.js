import dbConnect from '@/models/dbConnect';
import Place from '@/models/Place';
import { cleanSchema } from '@/lib/formater';

export default async function handler(req, res) {
  const allowedMethods = ["GET", "POST"]
  const method = req.method

  if (!allowedMethods.includes(method)) {
    res.setHeader("Allow", allowedMethods)
    res.status(405).end(`Method ${method} Not Allowed`)
  }
  
  await dbConnect();
  if (method === "GET") {
    const places = await Place.find({})
    res.status(200).json(places.map(item => cleanSchema(item)))
  } else if (method === "POST") {
    const data = req.body
    const place = await Place.create(data)
    res.status(201).json(cleanSchema(place))
  }
}
