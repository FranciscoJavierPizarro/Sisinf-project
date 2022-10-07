import Layout from '../components/Layout'
import Link from 'next/link';
import CityCard from '@/components/CityCard';
import { FiUser } from "react-icons/fi";
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home({cities}) {
  const { data: session } = useSession()

  return (
    <>
      {session && 
        <p>
          Signed in as {session.user.email}
        </p>
      }
      {!session && 
        <>
        <div className='grid justify-items-end'>
          <FiUser className='h-11 w-11'/>
          <button onClick={() => signIn()}>Sign in</button>
          Not signed in <br/>
          
        </div></>
      }
       
      <div className='flex justify-center'>
        <h1 className="w-2/3 h-full capitalize text-white text-2xl text-center">
          {cities.map(u => <CityCard key={u.id} title={u.name} urlCity={"http://localhost:3000/"+u.id} likes={0}/>)}
            <Link href="http://localhost:3000/addCity" className='w-full h-full'>
              <div className='capitalize w-40 mx-auto mt-8 text-black border-2 border-gray-600 px-4 py-3 text-xs font-bold text-center bg-gray-200 rounded-md hover:bg-gray-300 hover:cursor-pointer'>
                Añadir ciudad
              </div>
            </Link>
          
        </h1>
      </div>
      {session && 
        <button onClick={() => signOut()}>Sign out</button>
      }
    </>
  );
}

export async function getServerSideProps() {
  const cities = await fetch("http://localhost:3000/api/cities").then(res => res.json())
  return {
    props: {cities}, // will be passed to the page component as props
  }
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}