import Layout from '@/components/Layout'
import Link from 'next/link';
import PlaceCard from '@/components/PlaceCard';
import { FiMapPin } from "react-icons/fi";
import { useSession } from "next-auth/react"
import Sidebar from '@/components/Sidebar';
import React, { useState } from 'react';
export default function Home({ city, cityPlaces,weather }) {
  const { data: session } = useSession()
  const [filtro, setFiltro] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault()
    const { name } = e.target
    setFiltro(name.value)
  }
  return (
    <>
      <div className='w-full flex justify-center'>
        <Sidebar />
        
        <div className="w-full h-full tracking-wide capitalize text-black text-2xl text-center justify-center">
          <FiMapPin className="" />
          <h1> Estás visitando {city.name}</h1>
          {!(weather === undefined) && <><p>La temperatura es de {weather.main.temp} ºC</p></>}
          <br></br>
          
          <div className="flex justify-center">

            <form
              method="post"
              onSubmit={async (e) => {
                await handleSearch(e)
              }}
              className="mt-4"
            >
                            <div className=" bg-white rounded-md px-4 py-4 w-full ml-70 mx-auto">
                <div className="space-y-4">


                  <div className="flex gap-x-2 mt-1">
                    <label type="name" className="block w-full">
                      <span className="px-1 text-sm text-gray-600">Nombre:</span>
                      <input
                        type="name"
                        id="name"
                        name="name"
                        autoComplete="name"
                        className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 
                focus:bg-white focus:border-gray-600 focus:outline-none"         
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="capitalize mt-4 w-full tracking-normal px-4 py-3 text-xs font-bold text-center text-black bg-gray-300 hover:bg-gray-500 rounded-md hover:bg-blue-200"
                  >
                    Buscar
                  </button>
                </div>
              </div>
            </form>

          </div>
          
          <div className='flex-col content-center'>
            <div className='mx-auto flex flex-wrap gap-x-4 w-4/5'>
              {cityPlaces.filter(u => u?.name.includes(filtro)).map(u => <PlaceCard key={u._id} title={u.name}
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
  //const weather = await fetch("https://api.weatherbit.io/v2.0/current?city="+city.name+"&country=ES&key=" + process.env.WEATHER_API2 + "&include=minutel").then(res => res.json()).data[0]
  const weather = await fetch("https://api.openweathermap.org/data/2.5/weather?q="+city.name+",ES&appid=" + process.env.WEATHER_API + "&units=metric").then(res => res.json())
  //check apikey
  return {
    props: { city, cityPlaces,weather }// will be passed to the page component as props
  }
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}