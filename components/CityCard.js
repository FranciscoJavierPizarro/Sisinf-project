import Link from "next/link"
import { FiMapPin } from "react-icons/fi";
import { FiThumbsUp } from "react-icons/fi";

export default function CityCard({title,descp,likes,urlMaps,urlImg,urlCity}) {
    return (
        <>
        <div className="flex text-black mx-auto mt-8 bg-gray-200 w-2/3 h-40 rounded-2xl border-2 border-gray-600">
           <div className="bg-gray-400 w-1/6 h-24 mt-8 ml-8 rounded-2xl">
                <img src={urlImg} className="mx-auto w-24 h-24 object-fill"/>
           </div>
           <div className="ml-16  w-5/6 h-full">
                <div className="text-right">
                    funcion por implementar
                </div>
                <div className="flex w-full align-left font-semibold">
                    <Link href={urlCity}>
                        {title}
                    </Link>
                    <Link href={urlMaps} className="hover:cursor-pointer">
                        <FiMapPin className="ml-8 text-red-400 hover:cursor-pointer"/>
                    </Link>
                    
                    <sub className="ml-8 mt-3 text-gray-500">
                        {likes}
                    </sub>
                    <sub className="ml-2 text-gray-500">
                        <FiThumbsUp/>
                    </sub>                   
                </div>
                <div className="text-left text-base">
                    {descp}
                </div>
           </div>
        </div>
        </>
    )
}