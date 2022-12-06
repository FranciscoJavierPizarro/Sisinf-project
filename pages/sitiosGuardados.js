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
        <h1 className="w-2/3 h-full capitalize text-white text-2xl text-center">
          {places.filter(p => !(p === null) && filtro.includes(p._id)).map(u => <PlaceCard key={u._id + u.name} title={u.name}
          likes={u.favs} idPlace={u._id} idCity={u.cityId} urlMaps={u.mapsUrl} urlPhotos={u.photoUrl} descp={u.descp} />)}
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