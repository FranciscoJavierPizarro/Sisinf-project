import Layout from '../components/Layout'
import Link from 'next/link';
import CityCard from '@/components/CityCard';
import { useSession } from "next-auth/react"
import { FiSearch } from "react-icons/fi";
import Sidebar from '@/components/Sidebar';
import React, { useState } from 'react';
export default function Home({ cities }) {
  const { data: session } = useSession()
  const [filtro, setFiltro] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault()
    const { name } = e.target
    setFiltro(name.value)
  }
  return (
    <>
      <div className='w-full flex'>
        <Sidebar />
        <div className='flex-col content-center flex-1'>
          <div className="flex justify-center h-24 ">
            <form
              method="post"
              onSubmit={async (e) => {
                await handleSearch(e)
              }}
              className="mt-5 w-1/3 h-1/2"
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
                        placeholder="Busca una ciudad o pueblo"
                        autoComplete="name"
                        className="px-2 h-full text-md block rounded-l-lg w-full
                bg-white border-2 border-cyan-900 placeholder-gray-600 shadow-md focus:placeholder-gray-500 
                focus:bg-white focus:border-cyan-700 focus:outline-none"         
                      />
                      </div>
                    </label>
                    

                  <button
                    type="submit"
                    className=" grid justify-items-center items-center text-2xl w-1/6 text-white bg-cyan-900 hover:bg-cyan-700 rounded-r-lg">
                    <FiSearch/>
                  </button>
                 
                  </div>
                </div>
              </div>
            </form>

          </div>



          <div className="w-full mx-auto h-full text-white text-2xl text-center flex flex-wrap gap-x-2 justify-around">
            {cities.filter(u => u?.name.toLowerCase().includes(filtro.toLowerCase())).map(u => <CityCard key={u.id} title={u.name} urlImg={u.photoUrl} urlMaps={u.mapsUrl} descp={u.descp} urlCity={"/city/" + u.id} likes={0} Validacion={u.Validacion} idCity={u.id} />)}
          </div>
          {session &&
            <Link href="/addCity" className='w-full h-full'>
              <div className='mx-auto capitalize w-40 mx-auto text-white px-4 py-3 text-sm font-bold text-center rounded-md bg-blue-500 hover:bg-blue-600  hover:cursor-pointer'>
                Añadir una ciudad
              </div>
            </Link>
          }

        </div>
      </div>

    </>
  );
}

export async function getServerSideProps() {
  let cities = await fetch(process.env.NEXTAUTH_URL + "/api/cities").then(res => res.json())
  // cities = cities.filter(p => p.Validacion)
  return {
    props: { cities }, // will be passed to the page component as props
  }
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}