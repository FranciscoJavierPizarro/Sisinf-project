import Layout from '@/components/Layout'
import Link from 'next/link';
import PlaceCard from '@/components/PlaceCard';
import { FiMapPin } from "react-icons/fi";
import { useSession } from "next-auth/react"
import Sidebar from '@/components/Sidebar';
export default function Home({ city, cityPlaces }) {
  const { data: session } = useSession()
  return (
    <>
      <div className='w-full flex justify-center'>
        <Sidebar />
        <div className="w-full h-full tracking-wide capitalize text-black text-2xl text-center justify-center">
          <FiMapPin className="" />
          <h1> Estás visitando {city.name}</h1>
          <br></br>
          <div className='flex-col content-center'>
            <div className='mx-auto flex flex-wrap gap-x-4 w-4/5'>
              {cityPlaces.map(u => <PlaceCard key={u._id} title={u.name}
                likes={u.favs} idPlace={u._id} idCity={u.cityId} urlMaps={u.mapsUrl} urlPhotos={u.photoUrl} descp={u.descp} autor={u.publisherId} />)}
            </div>
            {session &&
              <Link href={"/addPlace/" + city.id} className='test-white'>
                <div className='mx-auto capitalize w-40 mx-auto mt-8 text-black border-2 border-gray-600 px-4 py-3 text-xs font-bold text-center bg-gray-200 rounded-md hover:bg-gray-300 hover:cursor-pointer'>
                  Añadir sitio
                </div>
              </Link>
            }
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(req) {
  const { id } = req.params
  const city = await fetch(process.env.NEXTAUTH_URL + "/api/cities/" + id).then(res => res.json())
  const cityPlaces = await fetch(process.env.NEXTAUTH_URL + "/api/placesbycity/" + id).then(res => res.json())
  return {
    props: { city, cityPlaces }// will be passed to the page component as props
  }
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}