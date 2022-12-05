import Layout from "@/components/Layout"
import { useSession } from "next-auth/react"
import { FiCoffee,FiHome } from "react-icons/fi";
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
      <div className="flex justify-center h-11/12">
      <Sidebar />
        <form
          method="post"
          onSubmit={(e) => {
            handleSubmit(e, id, session)
          }}
          className="mt-8 h-full"
        >

          <div className="bg-purple-200  bg-opacity-70 rounded-md px-6 py-10 w-full ml-70 mx-auto">
            <h1 className="text-center text-2xl font-bold text-gray-500 mb-10">Añadir nombre de un sitio</h1>
            <div className="space-y-4 h-full">
            <div className="flex gap-x-2 mt-1 transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 ">
              <label className="block w-full">
              <span className="mt-10 px-1 text-sm text-xl text-gray-600">Añadir nombre del sitio:</span>
                        <input
                    type="name"
                    id="name"
                    name="name"
                    autoComplete="name"
                    placeholder="Nombre del sitio"
                    className="w-full border-white bg-transparent outline-none  focus:outline-none"
                    required
                  />
                  </label>
                
            </div>

            

             
            <div className="flex gap-x-2 mt-1 transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 ">
              <label className="block w-full">
              <span className="mt-10 px-1 text-sm text-xl text-gray-600">Añadir URL de Google Maps:</span>
                        <input
                    type="url"
                    id="maps"
                    name="maps"
                    autoComplete="maps"
                    placeholder="Enlace a Google Maps "
                    className="w-full border-white bg-transparent outline-none  focus:outline-none"
                    required
                  />
                  </label>
                
             </div>


              <div className="flex gap-x-2 mt-1 transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 ">
                <label className="block w-full">
                <span className="mt-10 px-1 text-sm text-xl text-gray-600">Añadir URL foto:</span>
                          <input
                    type="url"
                    id="photo"
                    name="photo"
                    autoComplete="photo"
                    placeholder="Enlace a la foto "
                    className="w-full border-white bg-transparent outline-none  focus:outline-none"
                    required
                  />
                  </label>
                
              </div>

              <div >
                <span className="ml-2 text-md text-gray-600">Añadir descripción del sitio:</span>
                <textarea id="descp" maxlength="251" required className="h-5/6 mt-2  w-full font-arial p-4 text-gray-600 bg-indigo-50 outline-none rounded-md" placeholder="Añadir descripción..."></textarea>
              </div>
              <span className="ml-1 text-lg text-gray-700">Marcar alguna opción si este sitio es un monumento o un bar<br></br></span>
              <div className="flex justify-center h-auto">
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

              <button
                type="submit"
                className="capitalize w-full tracking-normal px-2 py-3 focus:ring-black focus:ring-1 text-xs font-bold text-center text-black bg-purple-300 hover:bg-purple-400 rounded-md "
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