import Link from "next/link"
import { FiMapPin } from "react-icons/fi";
import { FiThumbsUp } from "react-icons/fi";
import Sidebar from '@/components/Sidebar';
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Sitio({ id,name, descp, mapsUrl, photoUrl, publisherId, comms }) {
    
    let { data: session } = useSession()
    session = session?.session
    const handleSubmit = async (e) => {
      e.preventDefault()
      const { contentt } = e.target
      const comment = {
        userName: session?.user?.email,
        userId: session?.user?.email,
        // publishingDate: new Date().toLocaleDateString('es-ES', {
        //   year: 'numeric',
        //   month: 'numeric',
        //   day: 'numeric',
        // }),
        publisherDate:'2022/10/13',
        placeId: id,
        content:contentt.value,
      }
      await fetch(`http://localhost:3000/api/comments/`, {
        method: "post",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(comment)
      })
      location.href = "/place/" + id
    }
    return (
        <>
          <Sidebar/>
          <div class=" bg-gradient-to-r from-sky-500 to-indigo-500 w-full h-screen w-screen overflow-y-scroll" >
              <div className="flex h-full align-left font-semibold mx-auto mt-10 ml-20 justify-center">
              
                <div className="text-black text-2xl bg-white h-full w-1/3">
                  <div className="flex w-full align-left font-semibold mt-8 ml-8">
                      {name}
                      <Link href={mapsUrl} className="hover:cursor-pointer">
                          <FiMapPin className="ml-8 text-red-600 hover:cursor-pointer" />
                      </Link>
                  </div>
                  <div className="mt-8 ml-8 rounded-2xl items-justify-center">
                    <img src={photoUrl} className="mx-auto w-80 h-50" />
                  </div>
                  <h1 className="text-black ml-8 mt-4">
                      {descp}
                  </h1>
                  {//ver comentarios
                  }
                  {comms.map(u => {
                      return <p key={u}>{u.content}</p>
                })}
              </div>
              <div className="text-black text-2xl bg-indigo-50 h-full w-1/4">
                
              </div>
            </div>
              <div className="flex justify-center">

                  <form
                      method="post"
                      onSubmit={(e) => {
                          handleSubmit(e)
                      }}
                      className="mt-4"
                  >
                      
                      <div className="gap-x-2 mt-2">
                          <span className="text-sm text-black">Añadir descripción del Sitio:</span>
                          <textarea id="contentt" rows="4" className="block p-2.5 mb-5 bg-gray-300 w-full text-sm  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 border-gray-600 placeholder-white-400 text-black focus:ring-blue-500 focus:border-blue-500" placeholder="Añadir descripción..."></textarea>
                      </div>
                      <button
                          type="submit"
                          className="capitalize mt-4 w-full tracking-normal px-4 py-3 text-xs font-bold text-center text-black bg-gray-300 rounded-md hover:bg-blue-200"
                      >
                          Añadir
                      </button>
                  </form>
              </div>
          </div>

        </>
    )
}

export async function getServerSideProps(req) {
    const { id } = req.params
    const { name, descp, mapsUrl, photoUrl, publisherId } = await fetch("http://localhost:3000/api/places/" + id).then(res => res.json())
    const comms = await fetch("http://localhost:3000/api/comments/").then(res => res.json())
    return {
        props: { id,name, descp, mapsUrl, photoUrl, publisherId, comms }// will be passed to the page component as props
    }
}

Sitio.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}