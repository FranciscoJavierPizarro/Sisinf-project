import Link from "next/link"
import { FiMessageSquare,FiTrash2 } from "react-icons/fi";
import { useSession } from "next-auth/react"
export default function CommentCard({ autor, fecha, contenido, idComment, idPlace }) {
  let { data: session } = useSession()
  session = session?.session
  const handleDelete = async (e) => {
    e.preventDefault()
    await fetch(`/api/comments/` + idComment, {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify("")
    })
    location.href = "/place/" + idPlace
  }
  return (
    <>
      <div className="mt-4 mx-4 bg-white font-normal text-gray-900  rounded-md">

        <div className="flex items-end text-base font-normal text-gray-900">
          <div className="mt-2 mx-2 text-xl text-black">
            <FiMessageSquare />
          </div>
          {autor}
          <p>{fecha}</p>
        </div>
        <div className="text-justify mx-2 text-lg">{contenido}</div>
        {(session?.user?.email === autor || session?.user?.image === true) && <button className="ml-2 text-gray-500" onClick={(e) => { handleDelete(e) }}>
          <FiTrash2 />
        </button>}

      </div>
    </>
  )
}