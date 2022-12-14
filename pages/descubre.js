import Layout from '@/components/Layout'
import PlaceCard from '@/components/PlaceCard';
import { useSession } from "next-auth/react"
import Sidebar from '@/components/Sidebar';
import React, { useState } from 'react';
import { FiHome, FiCoffee,FiSearch,FiUser,FiImage } from "react-icons/fi";

export default function Home({ places }) {
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
                        placeholder="Descubre un sitio"
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
            <div className='mx-auto flex flex-wrap gap-x-4 w-4/5 mb-3'>
              {places.filter(u => u?.name.toLowerCase().includes(filtro.toLowerCase()) && (typeofplace === "" || typeofplace === u.kindOfPlace))
              .map(u => <PlaceCard key={u._id} title={u.name}
                likes={u.favs} idPlace={u._id} idCity={u.cityId} urlMaps={u.mapsUrl} urlPhotos={u.photoUrl} descp={u.descp} autor={u.publisherId} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const places = await fetch(process.env.NEXTAUTH_URL + "/api/places/").then(res => res.json())
  
  return {
    props: { places }// will be passed to the page component as props
  }
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}