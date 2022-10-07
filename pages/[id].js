import Layout from '@/components/Layout'
import Link from 'next/link';
import PlaceCard from '@/components/PlaceCard';
import { useSession } from "next-auth/react"
export default function Home({city, cityPlaces}) {
  const { data: session } = useSession()
  return (
    <>
      <h1 className="h-full capitalize text-white text-2xl text-center">
        <p>{city.name}</p>
        <p>{city.publisherId}</p>
        <p>{city.publishingDate}</p>
        <br></br>


        {cityPlaces.map(u => <PlaceCard key={u._id} title={u.name}
         likes={0} idPlace={u._id} idCity={u.cityId} descp={u.descp}/>)}
        
        {session && 
          <Link href={"http://localhost:3000/addPlace/" + city.id} className='test-white'>
            <div className='capitalize w-40 mx-auto mt-8 text-black border-2 border-gray-600 px-4 py-3 text-xs font-bold text-center bg-gray-200 rounded-md hover:bg-gray-300 hover:cursor-pointer'>
              Añadir sitio
            </div>
          </Link>
        }
      </h1>
    </>
  );
}

export async function getServerSideProps(req) {
  const { id } = req.params
  const city = await fetch("http://localhost:3000/api/cities/" + id).then(res => res.json())
  const cityPlaces = await fetch("http://localhost:3000/api/placesbycity/"+ id).then(res => res.json())
  return {
    props: {city, cityPlaces}// will be passed to the page component as props
  }
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}