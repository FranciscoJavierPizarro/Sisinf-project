import Layout from '../components/Layout'
import Link from 'next/link';
import CityCard from '@/components/CityCard';
import { useSession } from "next-auth/react"
import Sidebar from '@/components/Sidebar';
import React, { useState } from 'react';
export default function Home({ citiess }) {
  const { data: session } = useSession()
  const [cities, setCities] = useState(citiess);
  // console.log(cities)
  // const handleSearch = async (e) => {
  //   e.preventDefault()
  //   const { name } = e.target
  //   let aux = await fetch(`/api/cities/search/` + name.value).then(res => res.json())
  //   if (aux.constructor == Object) {
  //     aux = [aux.Object]
  //   }
  //   console.log("devulve",aux)
  //   setCities(aux)
  //   console.log("cambio",cities)
  // }
  return (
    <>
      <div className='w-full flex justify-center'>
        <Sidebar />
        <div className='flex-col content-center'>
          {/* <div className="flex justify-center">

            <form
              method="post"
              onSubmit={async (e) => {
                await handleSearch(e)
              }}
              className="mt-4"
            >
              <div className=" bg-white rounded-md px-6 py-10 w-full ml-70 mx-auto">
                <h1 className="text-center text-2xl font-bold text-gray-500 mb-10">Registrarse</h1>
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

                        required
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

          </div> */}



          <div className="w-3/4 mx-auto h-full capitalize text-white text-2xl text-center flex flex-wrap gap-x-4">
            {cities.map(u => <CityCard key={u.id} title={u.name} urlImg={u.photoUrl} urlMaps={u.mapsUrl} descp={u.descp} urlCity={"/city/" + u.id} likes={0} Validacion={u.Validacion} idCity={u.id} />)}
          </div>
          {session &&
            <Link href="/addCity" className='w-full h-full'>
              <div className='capitalize w-40 mx-auto mt-8 text-black border-2 border-gray-600 px-4 py-3 text-xs font-bold text-center bg-gray-200 rounded-md hover:bg-gray-300 hover:cursor-pointer'>
                Añadir ciudad
              </div>
            </Link>
          }

        </div>
      </div>

    </>
  );
}

export async function getServerSideProps() {
  let citiess = await fetch(process.env.NEXTAUTH_URL + "/api/cities").then(res => res.json())
  citiess = citiess.filter(p => p.Validacion)
  return {
    props: { citiess }, // will be passed to the page component as props
  }
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}