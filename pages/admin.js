import Layout from '../components/Layout'
import Link from 'next/link';
import CityCard from '@/components/CityCard';
import { useSession } from "next-auth/react"
import Sidebar from '@/components/Sidebar';

import AdministrateUserCard from '@/components/AdministrateUserCard';
export default function Home({cities, users}) {
  const { data: session } = useSession()

  return (
    <>
     
       
      <div className='w-full flex justify-center'>
        <Sidebar/>
        <div className="grid mt-2 justify-items-center w-full">
        {cities.length > 0 && <h1 className="grid w-5/6 justify-items-center text-black text-2xl text-center font-bold">Aprobar ciudades
         <div className="font-normal w-full mx-auto h-full text-black text-2xl text-center flex flex-wrap gap-x-2 justify-around">
          {cities.map(u => <CityCard key={u.id} title={u.name} urlImg={u.photoUrl} urlMaps={u.mapsUrl} descp ={u.descp} urlCity={"/city/"+u.id} 
          likes={0} Validacion={u.Validacion} idCity={u.id}/>)} 
          </div>
        </h1>}
        {users.length > 0 && <h1 className=" mt-5 w-2/5 text-black text-2xl text-center font-bold"> Administrar usuarios </h1>}
         
          <div className="grid grid-cols-3 gap-1 justify-self-center mb-10 mt-10 w-2/3 ml-10 ">
            {users.map(u => <AdministrateUserCard key={u.id} name={u.name} gmail ={u.gmail} spam={u.spam} admin={u.admin} id={u.id}/>)} 
          </div>
       
        </div>
      </div>
      
    </>
  );
}

export async function getServerSideProps() {
  let cities = await fetch(process.env.NEXTAUTH_URL+"/api/cities").then(res => res.json())
  cities = cities.filter(p => !p.Validacion)
  const users = await fetch(process.env.NEXTAUTH_URL+"/api/log/login").then(res => res.json())
  return {
    props: {cities, users}, // will be passed to the page component as props
  }
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}