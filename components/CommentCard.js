import Link from "next/link"
import { useRouter } from "next/router"
export default function CommentCard({ autor, fecha, contenido }) {
  const router = useRouter()
  return (
    <>
      <div className="mt-4 mx-4 bg-white font-normal text-gray-900">

        <div className="p-4 flex items-center p-2 text-base font-normal text-gray-900">
          {autor}
          <p>{fecha}</p>
          </div>  
          <span className="ml-3">{contenido}</span>
        
      </div>
    </>
  )
}