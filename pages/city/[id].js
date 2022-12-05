import Layout from '@/components/Layout'
import Link from 'next/link';
import PlaceCard from '@/components/PlaceCard';

import { useSession } from "next-auth/react"
import Sidebar from '@/components/Sidebar';
import React, { useState } from 'react';
import { FiSearch,FiThermometer,FiCoffee,FiHome } from "react-icons/fi";

export default function Home({ city, cityPlaces, weather }) {
  const { data: session } = useSession()
  const [filtro, setFiltro] = useState("");
  const [typeofplace, setType] = useState("");
  const handleSearch = async (e) => {
    e.preventDefault()
    const { name } = e.target
    setFiltro(name.value)
  }

  function monumento() {
    if (typeofplace == "monumento") {
      return <>
        <FiHome className={"ml-1.5 h-9 w-9 text-black fill-stone-400"} />
      </>;
    }
    return <>
      <FiHome className={"ml-1.5 h-9 w-9 text-black fill-transpartent"} /></>;
  }

  function bar() {
    if (typeofplace == "bar") {
      return <>
        <FiCoffee className={"ml-2 h-9 w-9 text-black fill-amber-700"} />
      </>;
    }
    return <>
      <FiCoffee className={"ml-2 h-9 w-9 text-black fill-transparent"} /></>;
  }

  return (
    <>
      <div className='w-full flex'>
        <Sidebar />
        <div className='flex-col content-center flex-1 text-2xl'>
          <div className="mt-4 flex justify-center"> Estás visitando {city.name}</div>
          {!(weather === undefined) && !(weather.main === undefined) && <><div className="flex justify-center text-2xl">
            <FiThermometer className='fill-sky-200'/> La temperatura es de {weather.main.temp} ºC</div></>}
          <br></br>

          <div className="flex justify-center h-24 ">
            <form
              method="post"
              onSubmit={async (e) => {
                await handleSearch(e)
              }}
              className="mt-5 w-1/3 h-1/2 text-base"
            >
              <div className="rounded-lg w-full mx-auto h-full">
                <div className="h-full">

                  <div className="flex h-full">
                    <label type="name" className="block w-full h-full">
                      <div className="flex h-full">
                      <input
                        type="name"
                        id="name"
                        name="name"
                        placeholder="Busca un sitio"
                        autoComplete="name"
                        className="px-2 h-full text-md block rounded-l-lg w-full
                bg-white border-2 border-cyan-900 placeholder-gray-600 shadow-md focus:placeholder-gray-500 
                focus:bg-white focus:border-cyan-700 focus:outline-none"         
                      />
                      </div>
                    </label>
                    

                  <button
                    type="submit"
                    className=" grid justify-items-center items-center text-2xl w-1/6 text-white bg-cyan-900 hover:bg-cyan-700 rounded-r-lg hover:bg-blue-200">
                    <FiSearch/>
                  </button>
                </div>
              </div>
              </div>
            </form>

          </div>
            <div className="flex justify-center">
          <button onClick={(e) => {
            e.preventDefault()
            if (typeofplace != "monumento") {
              setType("monumento")
            }
            else {
              setType("")
            }
          }}>
            {monumento()}
          </button>
          <button onClick={(e) => {
            e.preventDefault()
            if (typeofplace != "bar") {
              setType("bar")
            }
            else {
              setType("")
            }
          }}>
            {bar()} 
          </button>
          </div>
          <div className='flex-col content-center'>
            <div className='mx-auto flex flex-wrap gap-x-4 w-4/5'>
              {cityPlaces.filter(u => u?.name.toLowerCase().includes(filtro.toLowerCase()) && (typeofplace === "" || typeofplace === u.kindOfPlace))
              .map(u => <PlaceCard key={u._id} title={u.name}
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
  const weather = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city.name + ",ES&appid=" + process.env.WEATHER_API + "&units=metric").then(res => res.json())
  //check apikey
  return {
    props: { city, cityPlaces, weather }// will be passed to the page component as props
  }
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}