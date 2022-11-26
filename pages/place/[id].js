import Link from "next/link"
import { FiMapPin } from "react-icons/fi";
import { FiThumbsUp } from "react-icons/fi";
import Sidebar from '@/components/Sidebar';
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import CommentCard from "@/components/CommentCard";
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
          <div class=" bg-gradient-to-r from-sky-500 to-indigo-500 w-full h-full" >
              <div className="flex h-full align-left font-semibold mx-auto ml-20 justify-center">
              
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

              </div>
              <div className="bg-indigo-50 h-full w-1/4">
                <div className="text-black text-xl ml-4 mr-4 mt-4 h-2/3 justify-center border-2 overflow-y-scroll">
                  {comms.map(u => {
                        return <CommentCard key={u.id} autor={u.userName} fecha={u.publishingDate} contenido={u.content}/>
                  })}
                </div>
                  <div>
                  <form
                      method="post"
                      onSubmit={(e) => {
                          handleSubmit(e)
                      }}
                      className="mt-2"
                  > 
                    <div className="grid w-full justify-items-center">
                      <span className="px-1 text-m mb-2 text-black">Añadir nuevo comentario:</span>
                        <textarea id="contentt" rows="4" className="w-5/6 font-arial p-5 text-black bg-gray-200 outline-none rounded-md" placeholder="Nuevo comentario..."></textarea>
                    
                      <button type="submit"
                          className="capitalize mt-3 w-1/2 tracking-normal px-4 py-3 text-xs font-bold text-center text-black bg-gray-300 rounded-md hover:bg-blue-200"
                      >
                          Añadir
                      </button>
                    </div>
                  </form>
                </div>

              </div>
            </div>

          </div>

        </>
    )
}

export async function getServerSideProps(req) {
    const { id } = req.params
    const { name, descp, mapsUrl, photoUrl, publisherId } = await fetch("http://localhost:3000/api/places/" + id).then(res => res.json())
    const comms = await fetch("http://localhost:3000/api/comments/" + id ).then(res => res.json())
    return {
        props: { id,name, descp, mapsUrl, photoUrl, publisherId, comms }// will be passed to the page component as props
    }
}

Sitio.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}