import Layout from '@/components/Layout'
import Link from 'next/link';
import PlaceCard from '@/components/PlaceCard';

import { useSession } from "next-auth/react"
import Sidebar from '@/components/Sidebar';
import React, { useState } from 'react';
import {FiMapPin, FiSearch,FiThermometer,FiCoffee,FiHome,FiUser,FiImage } from "react-icons/fi";

import {Popover,PopoverHandler,PopoverContent,Button} from "@material-tailwind/react";
 
 function tiempo({ city, cityPlaces, weather }) {
  return (
    
    <Popover placement="right-start">
      <PopoverHandler>
        <Button variant="gradient">Right Start</Button>
      </PopoverHandler>
      <PopoverContent>
      <FiThermometer className='fill-sky-200 mt-1'/> 
      </PopoverContent>
    </Popover>
 
  );
}

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
      <div className="grid justify-items-center text-transparent hover:text-black">
        <FiHome className="ml-1.5 h-9 w-9 text-black fill-stone-400 "/>
        <span> Monumento</span>
      </div></>;
    }
    return <>
      <div className="grid justify-items-center text-transparent hover:text-black">
        <FiHome className="ml-1.5 h-9 w-9 text-black fill-transpartent "/>
        <span> Monumento</span>
      </div></>;
  }

  function bar() {
    if (typeofplace == "bar") {
      return <>
      <div className="grid justify-items-center text-transparent hover:text-black">
        <FiCoffee className="ml-1.5 h-9 w-9 text-black fill-orange-800 "/>
        <span> Bar</span>
      </div></>;
    }
    return <>
      <div className="grid justify-items-center text-transparent hover:text-black">
        <FiCoffee className="ml-1.5 h-9 w-9 text-black fill-transpartent "/>
        <span> Bar</span>
      </div></>;
  }
  function estatua() {
    if (typeofplace == "estatua") {
      return <>
      <div className="grid justify-items-center text-transparent hover:text-black">
        <FiUser className="ml-1.5 h-9 w-9 text-black fill-stone-400 "/>
        <span> Estatua</span>
      </div></>;
    }
    return <>
      <div className="grid justify-items-center text-transparent hover:text-black">
        <FiUser className="ml-1.5 h-9 w-9 text-black fill-transpartent "/>
        <span> Estatua</span>
      </div></>;
  }
  function paisaje() {
    if (typeofplace == "paisaje") {
      return <>
      <div className="grid justify-items-center text-transparent hover:text-black">
        <FiImage className="ml-1.5 h-9 w-9 text-black fill-green-400 "/>
        <span> Paisaje</span>
      </div></>;
    }
    return <>
      <div className="grid justify-items-center text-transparent hover:text-black">
        <FiImage className="ml-1.5 h-9 w-9 text-black fill-transpartent "/>
        <span> Paisaje</span>
      </div></>;
  }

  return (
    <>
      <div className='w-full flex'>
        <Sidebar />
        <div className='flex-col content-center flex-1 text-2xl'>

        <div className="flex justify-self-center mb-1 w-full  mt-10 ">

          <div className="flex justify-center mt-5 w-1/4">
            <Popover placement="right-start">
                <PopoverHandler>
                  <Button className="text-sm h-14 bg-red-500" variant=" border-white-200 ">Estás visitando {city.name}</Button>
                </PopoverHandler>
                <PopoverContent>
                  <div className="profile mx-auto rounded-full py-2 w-16 "> 
                      <img src={city.photoUrl} alt="profile"></img>
                  </div>
                  
                  <div className="name text-gray-800 text-2xl font-medium mt-4 ">
                      <p>{city.name}</p>
                      <p>{city.urlCity}</p>
                      <p>{city.urlImg}</p>
                      <p className="name text-gray-800 text-sm mt-3 " >{city.descp}</p>
                
                      <Link href={city.mapsUrl} className="hover:cursor-pointer">
                              <FiMapPin className="mt-5 mr-6 ml-10 text-red-400 hover:cursor-pointer" />
                      </Link>
                  </div>
                                    
                              
              </PopoverContent>
            </Popover>
          </div>
          
          
          <div className="flex justify-center h-24  w-1/2 ">
            <form
              method="post"
              onSubmit={async (e) => {
                await handleSearch(e)
              }}
              className="mt-5 w-1/2 h-1/2 text-base"
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

          {!(weather === undefined) && !(weather.main === undefined) && <><div className="flex justify-center w-1/4 h-14 mt-5">
          <Popover placement="left-start">
            <PopoverHandler>
              <Button className="text-sm h-14 bg-blue-500" variant="outlined border-white-200 ">El tiempo</Button>
            </PopoverHandler>
            <PopoverContent>
            <div className="flex justify-center w-full text-gray-800 text-sm  mt-1 ">
                <FiThermometer className='fill-sky-200 inline-block mr-2  mt-1 w-4 h-4 mb-3'/><p className="mb-3 mr-2">{weather.main.temp} ºC</p>  
                
              </div>
              <p className="ml-2 text-gray-800 text-sm mr-3"> Sensación real : </p>
              <p className="flex justify-center text-gray-800 text-sm mr-3">{weather.main.feels_like} ºC</p>         
            </PopoverContent>
          </Popover>
           </div></>}


           </div>
         
           <div className="flex justify-center h-auto text-xl">
                <button onClick={(e) => {
                  e.preventDefault()
                  if (typeofplace != "monumento") {
                    setType("monumento")
                  }
                  else {
                    setType("")
                  }
                }} className="w-1/12">
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
                }} className="w-1/12">
                  {bar()}
                </button>
                <button onClick={(e) => {
                  e.preventDefault()
                  if (typeofplace != "estatua") {
                    setType("estatua")
                  }
                  else {
                    setType("")
                  }
                }} className="w-1/12">
                  {estatua()}
                </button>
                <button onClick={(e) => {
                  e.preventDefault()
                  if (typeofplace != "paisaje") {
                    setType("paisaje")
                  }
                  else {
                    setType("")
                  }
                }} className="w-1/12">
                  {paisaje()}
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
                <div className='mx-auto capitalize w-40 mx-auto mt-8 text-white px-4 py-3 text-sm font-bold text-center rounded-md bg-blue-500 hover:bg-blue-600  hover:cursor-pointer'>
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