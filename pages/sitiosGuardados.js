import Layout from '../components/Layout'
import CityCard from '@/components/CityCard';
import PlaceCard from '@/components/PlaceCard';
import Sidebar from '@/components/Sidebar';
import { useSession, getSession } from "next-auth/react"
import React, { useState, useEffect, useRef } from 'react';
export default function SitiosGuardados() {
  let { data: session, status } = useSession()
  session = session?.session
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    console.log(status)
    if (status !== 'authenticated') return

    const getPlaces = async () => {
      let places = await fetch(`/api/savedPlaces/` + session.user.email)
        .then(res => res.json())

        places = places
          .filter(p => p.userId === session?.user?.email)
          
          .map(item => item.placeId)
          .map(async id => {
            const res = await fetch(`/api/places/${id}`)
              .then(res => res.json())
            return res
          })
      
        Promise.all(places).then(res => {
          let newPlaces = res.map(item => item)
          setPlaces(newPlaces)
        });
    }
    getPlaces().catch(console.error)
    

  }, [status])

  return (
    <>

      <div className='w-full flex justify-center'>
        <Sidebar />
        <h1 className="w-2/3 h-full capitalize text-white text-2xl text-center">
          {console.log(places)
          }
          {places.filter(p => !(p === null)).map(u => <PlaceCard key={u._id + u.name} title={u.name}
          likes={u.favs} idPlace={u._id} idCity={u.cityId} urlMaps={u.mapsUrl} urlPhotos={u.photoUrl} descp={u.descp} />)}
        </h1>
      </div>

    </>
  );
}

SitiosGuardados.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}