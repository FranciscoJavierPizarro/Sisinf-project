import Link from "next/link"
import { FiMessageSquare} from "react-icons/fi";
import { useRouter } from "next/router"
export default function CommentCard({ autor, fecha, contenido }) {
  const router = useRouter()
  return (
    <>
      <div className="mt-4 mx-4 bg-white font-normal text-gray-900  rounded-md">

        <div className="flex items-end text-base font-normal text-gray-900">
          <div className="mt-2 mx-2 text-xl text-black">
            <FiMessageSquare/>
          </div>  
           {autor}
          <p>{fecha}</p>
          </div> 
          <div className="text-justify mx-2 text-lg">{contenido}</div>
          
      </div>
    </>
  )
}