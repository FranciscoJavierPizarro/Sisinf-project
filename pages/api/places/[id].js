import dbConnect from '@/models/dbConnect';
import Place from '@/models/Place';
import { cleanSchema } from '@/lib/formater';

export default async function handler(req, res) {
  const allowedMethods = ["GET","POST", "PUT", "DELETE"]
  const method = req.method

  if (!allowedMethods.includes(method)) {
    res.setHeader("Allow", allowedMethods)
    res.status(405).end(`Method ${method} Not Allowed`)
  }
  
  await dbConnect();
  if (method === "GET") {
    const {id} = req.query
    const place = await Place.findById(id)
    //culpa del cleanSchema
    // const place2 = await Place.find({cityId:id})
    // res.status(200).json(cleanSchema(place))
    res.status(200).json(place)
  } else if (method === "DELETE") {
    const {id} = req.query
    await Place.deleteOne({_id: id})
    res.status(204).json()
  }
  else if (method === "PUT") {
    const {id} = req.query
    const {name, descp, publisherId,publishingDate,cityId,favs } = req.body
    const place = await Place.findByIdAndUpdate(id, {name, descp, publisherId,publishingDate,cityId,favs}, {new: true})
    res.status(200).json(cleanSchema(place))
  } 
}

