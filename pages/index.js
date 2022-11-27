import Layout from '../components/Layout'
import Link from 'next/link';
import CityCard from '@/components/CityCard';
import { useSession } from "next-auth/react"
import Sidebar from '@/components/Sidebar';

export default function Home({ cities }) {
  const { data: session } = useSession()

  return (
    <>
      <div className='w-full flex justify-center'>
        <Sidebar />
        <div className='flex-col content-center'>
          <div className="w-3/4 mx-auto h-full capitalize text-white text-2xl text-center flex flex-wrap gap-x-4">
            {cities.map(u => <CityCard key={u.id} title={u.name} urlImg={u.photoUrl} urlMaps={u.mapsUrl} descp={u.descp} urlCity={"/city/" + u.id} likes={0} Validacion={u.Validacion} idCity={u.id} />)}
          </div>
          {session &&
            <Link href="/addCity" className='w-full h-full'>
              <div className='capitalize w-40 mx-auto mt-8 text-black border-2 border-gray-600 px-4 py-3 text-xs font-bold text-center bg-gray-200 rounded-md hover:bg-gray-300 hover:cursor-pointer'>
                Añadir ciudad
              </div>
            </Link>
          }

        </div>
      </div>

    </>
  );
}

export async function getServerSideProps() {
  let cities = await fetch(process.env.NEXTAUTH_URL + "/api/cities").then(res => res.json())
  cities = cities.filter(p => p.Validacion)
  return {
    props: { cities }, // will be passed to the page component as props
  }
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}