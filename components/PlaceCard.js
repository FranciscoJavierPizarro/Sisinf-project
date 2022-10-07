import Link from "next/link"
import { FiMapPin } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { FiStar } from "react-icons/fi";
import { useSession } from "next-auth/react"
export default function PlaceCard({title,likes,descp,idPlace,idCity,urlMaps,urlImg,urlCity}) {
    const { data: session } = useSession()
    const handleDelete= async (e,place,city) => {
        e.preventDefault()
        await fetch(`http://localhost:3000/api/places/` + place, {
          method: "delete",
          headers: {"Content-Type" : "application/json"},
          body: JSON.stringify("")
        })
        location.href = "http://localhost:3000/" + city
    }

    return (
        <>
        <div className="flex text-black mx-auto mt-8 bg-gray-200 w-2/3 h-40 rounded-2xl border-2 border-gray-600">
           <div className="bg-gray-400 w-1/6 h-24 mt-8 ml-8 rounded-2xl">
                <img src={"https://i.pinimg.com/564x/05/9e/4e/059e4ebb4a8f8b7753f66ff3333672ec.jpg"} className="mx-auto w-24 h-24 object-fill"/>
           </div>
           <div className="ml-16  w-5/6 h-full align-right">
                <div className="flex mr-4 mt-4 justify-end text-right">
                    {session && <><button className="ml-2 text-gray-500" onClick={(e) => {handleDelete(e,idPlace,idCity)}}>
                        <FiTrash2/>
                    </button>
                    <FiStar className="ml-2 h-6 w-6 text-yellow-500"/>
                    </>}
                    <FiHeart className="ml-1.5 h-6 w-6 text-red-600"/>
                    <sub className="ml-0 mt-3 text-gray-500">
                        {likes}
                    </sub>
                </div>
                <div className="flex w-full align-left font-semibold">
                    {/* <Link href={urlCity}> */}
                        {title}
                    {/* </Link> */}
                    <FiMapPin className="ml-8 text-red-400"/>
                                  
                </div>
                <div className="text-black text-left">
                    {descp}
                </div>
        </div>
        </div>
        </>
    )
}