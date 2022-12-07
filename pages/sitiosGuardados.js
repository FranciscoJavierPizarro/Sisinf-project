import Layout from '../components/Layout'
import CityCard from '@/components/CityCard';
import PlaceCard from '@/components/PlaceCard';
import Sidebar from '@/components/Sidebar';
import { useSession, getSession } from "next-auth/react"
import React, { useState, useEffect, useRef } from 'react';

export default function SitiosGuardados({savedPlaces,places}) {
  let { data: session, status } = useSession()
  session = session?.session
  const [filtro, setFiltro] = useState([]);
  useEffect(() => {
    if (status !== 'authenticated') return
    setFiltro(savedPlaces.filter(p => p.userId === session?.user?.email).map(p => p.placeId))   

  }, [status])

  return (
    <>

      <div className='w-full flex justify-center'>
        <Sidebar />
        <h1 className="w-2/3 h-full  text-white text-2xl text-center">
        <h1 className="mt-2 grid w-full justify-items-center text-black text-2xl text-center font-bold"> 
          Estos son tus lugares guardados  ☜(ﾟヮﾟ☜) .
        </h1>
        <div className="w-full capitalize mx-auto h-full text-white text-2xl text-center flex flex-wrap gap-x-2 justify-around">
          {places.filter(p => !(p === null) && filtro.includes(p._id)).map(u => <PlaceCard key={u._id + u.name} title={u.name}
          likes={u.favs} idPlace={u._id} idCity={u.cityId} urlMaps={u.mapsUrl} urlPhotos={u.photoUrl} descp={u.descp} />)}
      </div>

        </h1>
      </div>

    </>
  );
}

export async function getServerSideProps() {
  const savedPlaces = await fetch(process.env.NEXTAUTH_URL + "/api/savedPlaces/").then(res => res.json())
  const places = await fetch(process.env.NEXTAUTH_URL + "/api/places/").then(res => res.json())
  return {
    props: { savedPlaces,places }, // will be passed to the page component as props
  }
}

SitiosGuardados.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}