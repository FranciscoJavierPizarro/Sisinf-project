import Link from "next/link"
import { FiMapPin} from "react-icons/fi";
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
      await fetch(`/api/comments/`, {
        method: "post",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(comment)
      })
      location.href = "/place/" + id
    }
    return (
        <>
          <Sidebar/>
          <div class="  w-full h-full" >
              <div className="flex h-full align-left font-semibold mx-auto ml-20 justify-center">
              
                <div className="text-black text-3xl bg-white h-11/12 w-1/3 rounded-l-lg my-4">
                  <div className="capitalize flex w-full align-left font-semibold mt-8 ml-8">
                      {name}
                      <Link href={mapsUrl} className="hover:cursor-pointer">
                          <FiMapPin className="ml-4 text-red-600 hover:cursor-pointer" />
                      </Link>
                  </div>
                  <div className="mt-8 ml-8 rounded-2xl items-justify-center">
                    <img src={photoUrl} className="mx-auto w-80 h-50" />
                  </div>
                  <h1 className="text-black text-xl ml-8 mt-4">
                      {descp}
                  </h1>

              </div>
              <div className="bg-indigo-50 h-11/12 w-1/4 rounded-r-lg my-4">
                <div className={session ? "h-3/5" : "h-full pb-8"}>
                <div className="text-black text-xl ml-4 mr-4 mt-4 h-full justify-center border-3 overflow-y-scroll">
                  {comms.map(u => {
                        return <CommentCard key={u.id} autor={u.userName} fecha={u.publishingDate} contenido={u.content} idComment={u.id} idPlace={id}/>
                  })}
                </div>
                </div>
                {session && <div>
                  <form
                      method="post"
                      onSubmit={(e) => {
                          handleSubmit(e)
                      }}
                      className="mt-4"
                  > 
                    <div className="grid w-full justify-items-center">
                      <span className="text-m mb-4 text-black"> Añadir nuevo comentario:</span>
                        <textarea id="contentt" minlength="1" maxlength="251" required className=" px-2 py-2 focus:ring-black focus:ring-1 w-5/6 font-arial h-36 text-black bg-gray-200 outline-none rounded-md" placeholder=" Nuevo comentario..."></textarea>
                    
                      <button type="submit"
                          className="capitalize mt-5 w-1/2 tracking-normal px-4 py-3 text-xs font-bold text-center text-black  rounded-md  bg-blue-400 hover:bg-blue-600 "
                      >
                          Añadir
                      </button>
                    </div>
                  </form>
                </div>}

              </div>
            </div>

          </div>

        </>
    )
}

export async function getServerSideProps(req) {
    const { id } = req.params
    const { name, descp, mapsUrl, photoUrl, publisherId } = await fetch(process.env.NEXTAUTH_URL+"/api/places/" + id).then(res => res.json())
    const comms = await fetch(process.env.NEXTAUTH_URL+"/api/comments/" + id ).then(res => res.json())
    return {
        props: { id,name, descp, mapsUrl, photoUrl, publisherId, comms }// will be passed to the page component as props
    }
}

Sitio.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}