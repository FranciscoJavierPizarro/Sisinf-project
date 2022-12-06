import Layout from "@/components/Layout"
import { useSession } from "next-auth/react"
import { FiCoffee,FiHome,FiImage,FiUser } from "react-icons/fi";
import Sidebar from "@/components/Sidebar"
import React, { useState } from 'react';
export default function AddPlace(id) {

  let { data: session } = useSession()
  session = session?.session
  const [typeofplace, setType] = useState("");
  const handleSubmit = async (e, id, session) => {
    id = id.id
    e.preventDefault()
    const { name, descp, maps, photo } = e.target
    const place = {
      name: name.value,
      descp: descp.value,
      publisherId: session?.user?.email,
      publisherName: session?.user?.name,
      mapsUrl: maps.value,
      photoUrl: photo.value,
      // publishingDate: new Date().toLocaleDateString('es-ES', {
      //   year: 'numeric',
      //   month: 'numeric',
      //   day: 'numeric',
      // }),
      publisherDate: '2022/10/13',
      cityId: id,
      favs: 0,
      kindOfPlace: typeofplace
    }
    await fetch(`/api/places/`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(place)
    })
    location.href = "/city/" + id
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
            <div className="grid justify-items-center ">
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
      <div className="flex justify-center h-11/12">
      <Sidebar />
        <form
          method="post"
          onSubmit={(e) => {
            handleSubmit(e, id, session)
          }}
          className="mt-8 h-full"
        >

          <div className="bg-sky-300  border-2 border-white-300 rounded-md px-6 py-10 w-full ml-70 mx-auto">
            <h1 className="text-center text-2xl font-bold text-gray-900 mb-10">Añadir nombre de un sitio</h1>
            <div className="space-y-4 h-full">
            <div className="flex gap-x-2 mt-1 transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 ">
              <label className="block w-full">
              <span className="mt-8 px-1 text-xl text-black">Añadir nombre del sitio:</span>
                        <input
                    type="name"
                    id="name"
                    name="name"
                    autoComplete="name"
                    placeholder="Nombre del sitio"
                    className="placeholder:text-stone-600 w-full border-white bg-transparent outline-none  focus:outline-none"
                    required
                  />
                  </label>
                
            </div>

            

             
            <div className="flex gap-x-2 mt-1 transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 ">
              <label className="block w-full">
              <span className="mt-10 px-1 text-xl text-black">Añadir URL de Google Maps:</span>
                        <input
                    type="url"
                    id="maps"
                    name="maps"
                    autoComplete="maps"
                    placeholder="Enlace a Google Maps "
                    className="placeholder:text-stone-600 w-full border-white bg-transparent outline-none focus:outline-none"
                    required
                  />
                  </label>
                
             </div>


              <div className="flex gap-x-2 mt-1 transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 ">
                <label className="block w-full">
                <span className="mt-10 px-1 text-xl text-black">Añadir URL foto:</span>
                          <input
                    type="url"
                    id="photo"
                    name="photo"
                    autoComplete="photo"
                    placeholder="Enlace a la foto "
                    className="placeholder:text-stone-600 w-full border-white bg-transparent outline-none  focus:outline-none"
                    required
                  />
                  </label>
                
              </div>

              <div >
                <span className="ml-2 text-xl text-black">Añadir descripción del sitio:</span>
                <textarea id="descp" maxlength="151" required className="h-full mt-2 w-full font-arial p-4 text-gray-600 bg-indigo-50 outline-none rounded-md" placeholder="Añadir descripción..."></textarea>
              </div>
              <span className="ml-1 text-lg text-gray-800">Marcar opción si es un monumento, bar, estatua o un paisaje<br></br></span>
              <div className="flex justify-center h-auto ">
                <button onClick={(e) => {
                  e.preventDefault()
                  if (typeofplace != "monumento") {
                    setType("monumento")
                  }
                  else {
                    setType("")
                  }
                }} className="w-1/6">
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
                }} className="w-1/6">
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
                }} className="w-1/6">
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
                }} className="w-1/6">
                  {paisaje()}
                </button>
              </div>

              <button
                type="submit"
                className="mx-auto capitalize w-full mx-auto mt-4 text-white px-4 py-3 text-sm font-bold text-center rounded-md bg-blue-500 hover:bg-blue-600  hover:cursor-pointer"
                >
                Añadir
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

AddPlace.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export async function getServerSideProps(req) {
  const { id } = req.params
  return {
    props: { id }// will be passed to the page component as props
  }
}