import Layout from '../components/Layout'
import Link from 'next/link';
import CityCard from '@/components/CityCard';
import { useSession } from "next-auth/react"
import Sidebar from '@/components/Sidebar';

export default function Home({cities}) {
  const { data: session } = useSession()

  return (
    <>
     
       
      <div className='w-full flex justify-center'>
        <Sidebar/>
        <h1 className="w-2/3 h-full capitalize text-white text-2xl text-center">
          {cities.map(u => <CityCard key={u.id} title={u.name} urlImg={u.photoUrl} urlMaps={u.mapsUrl} descp ={u.descp} urlCity={"/city/"+u.id} 
          likes={0} Validacion={u.Validacion} idCity={u.id}/>)} 
        </h1>
      </div>
      
    </>
  );
}

export async function getServerSideProps() {
  let cities = await fetch(process.env.NEXTAUTH_URL+"/api/cities").then(res => res.json())
  cities = cities.filter(p => !p.Validacion)
  return {
    props: {cities}, // will be passed to the page component as props
  }
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}