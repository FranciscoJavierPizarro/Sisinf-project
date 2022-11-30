import dbConnect from '@/models/dbConnect';
import City from '@/models/City';
import Comment from '@/models/Comment';
import Like from '@/models/Like';
import Place from '@/models/Place';
import SavedPlace from '@/models/SavedPlace';
import User from '@/models/User';
export default async function handler(req, res) {
  const allowedMethods = ["GET"]
  const method = req.method

  if (!allowedMethods.includes(method)) {
    res.setHeader("Allow", allowedMethods)
    res.status(405).end(`Method ${method} Not Allowed`)
  }
  
  await dbConnect();
  if (method === "GET") {
    const ncities = await City.find({}).count()
    const ncomments = await Comment.find({}).count()
    const nlikes = await Like.find({}).count()
    const nplaces = await Place.find({}).count()
    const nsavedplaces = await SavedPlace.find({}).count()
    const nusers = await User.find({}).count()
    res.status(200).json({
        nCities:ncities,
        nComments:ncomments,
        nLikes:nlikes,
        nPlaces:nplaces,
        nSavedPlaces:nsavedplaces,
        nUsers:nusers
    })
  }
}
