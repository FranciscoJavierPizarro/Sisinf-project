import Link from "next/link"
import { FiMapPin} from "react-icons/fi";
import { FaHeart, FaBookmark} from "react-icons/fa";
import Sidebar from '@/components/Sidebar';
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import CommentCard from "@/components/CommentCard";
export default function Sitio({ id, name, descp, mapsUrl, photoUrl, publisherId, publisherName, comms, nlikes, nsavedplaces }) {

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
      publisherDate: '2022/10/13',
      placeId: id,
      content: contentt.value,
    }
    await fetch(`/api/comments/`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment)
    })
    location.href = "/place/" + id
  }
  return (
    <>
      <Sidebar />
      <div class="w-full h-full" >
        <div className="flex h-full align-left mx-auto ml-20 justify-center">

          <div className="relative text-black text-xl bg-white h-full w-1/3 rounded-l-lg">

            <div className="uppercase mt-5 flex text-2xl w-full align-left font-semibold ml-8">
              {name}
              <Link href={mapsUrl} className="hover:cursor-pointer">
                <FiMapPin className="ml-4 text-red-600 hover:cursor-pointer" />
              </Link>
            </div>
            <div className="mt-8 ml-8 rounded-2xl items-justify-center">
              <img src={photoUrl} className="mx-auto w-1/2" />
            </div>
            <h1 className="px-2 text-black text-xl ml-8 mt-4 w-5/6 h-1/6 rounded-lg border-2 border-black text-ellipsis">
              {descp}
              </h1>
              <div className="flex">
              <div className="container mx-auto pr-4 mt-5">
                <div className="w-5/6 bg-white  mx-auto rounded-sm shadow-lg ">
                  <div className="h-8 bg-purple-400 ">
                    <FaHeart className="inline-block w-8 h-6 ml-4  text-black-400 " />
                  </div>
                  <div className="flex justify-between px-5 pt-2 mt -1 mb-1 text-base text-gray-600">
                    <p>Número de likes</p>
                  </div>
                  <p className="py-2 text-1xl ml-5">{nlikes}</p>

                </div>
              </div>
              <div className="container mx-auto pr-4 mt-5 ">
                <div className="w-5/6 bg-white  mx-auto rounded-sm  shadow-lg ">
                  <div className="h-8 bg-purple-400 ">
                    <FaBookmark className="inline-block w-8 h-6 ml-4  text-black-400 " />
                  </div>
                  <div className="flex justify-between px-5 pt-2 mt -1 mb-1 text-base text-gray-600">
                    <p>Nº de veces guardado</p>
                  </div>
                  <p className="py-2 text-1xl ml-5">{nsavedplaces}</p>

                </div>
              </div>
              </div>

            <p className="absolute bottom-4 left-4">Lugar publicado por {(!(publisherName === undefined) && publisherName) || publisherId}</p>



          </div>
          <div className="bg-indigo-50 h-full w-1/4 rounded-r-lg font-semibold">
            <div className={session ? "h-3/5" : "h-full pb-8"}>
              <div className="text-black text-xl ml-4 mr-4 mt-4 h-full justify-center border-3 overflow-y-scroll">
                {comms.map(u => {
                  return <CommentCard key={u.id} autor={u.userName} fecha={u.publishingDate} contenido={u.content} idComment={u.id} idPlace={id} />
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
                    className="mx-auto capitalize w-40 mx-auto mt-4 text-white px-4 py-3 text-sm font-bold text-center rounded-md bg-blue-500 hover:bg-blue-600  hover:cursor-pointer"
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
  const { name, descp, mapsUrl, photoUrl, publisherId, publisherName } = await fetch(process.env.NEXTAUTH_URL + "/api/places/" + id).then(res => res.json())
  const { nlikes } = await fetch(process.env.NEXTAUTH_URL + "/api/likes/" + id).then(res => res.json())
  const { nsavedplaces } = await fetch(process.env.NEXTAUTH_URL + "/api/savedPlaces/" + id + "/0").then(res => res.json())
  const comms = await fetch(process.env.NEXTAUTH_URL + "/api/comments/" + id).then(res => res.json())
  return {
    props: { id, name, descp, mapsUrl, photoUrl, publisherId, comms, nlikes, nsavedplaces, publisherName }// will be passed to the page component as props
  }
}

Sitio.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}