import Layout from '../components/Layout'
import CityCard from '@/components/CityCard';
import PlaceCard from '@/components/PlaceCard';
import Sidebar from '@/components/Sidebar';
import { useSession, getSession } from "next-auth/react"
import React, { useState, useEffect, useRef } from 'react';
export default function SitiosGuardados() {
  let { data: session } = useSession()
  session = session?.session
  const [places, setPlaces] = useState([]);
  let loadedAtributtes = useRef(false)
  useEffect(() => {
    async function getData() {
      const saved = await fetch(`http://localhost:3000/api/savedPlaces/` + session.user.email,).then(res => res.json())
      let aux = []
      await saved.map(async u => {
        if(u.userId === session?.user?.email) {
          const place = await fetch(`http://localhost:3000/api/places/` + u.placeId,).then(res => res.json())
          aux.push(place)
        }
      })
      setPlaces(aux)
    }

    if (!loadedAtributtes.current && session != undefined) {
      getData();
      loadedAtributtes.current = true
    }
    
  });

  return (
    <>

      <div className='w-full flex justify-center'>
        <Sidebar />
        <h1 className="w-2/3 h-full capitalize text-white text-2xl text-center">
          {//console.log(places)
          }
          {places.map(u => <PlaceCard key={u._id + u.name} title={u.name}
          likes={u.favs} idPlace={u._id} idCity={u.cityId} urlMaps={u.mapsUrl} urlPhotos={u.photoUrl} descp={u.descp} />)}
        </h1>
      </div>

    </>
  );
}

SitiosGuardados.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}