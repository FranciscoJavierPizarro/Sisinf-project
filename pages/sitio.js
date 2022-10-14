import Link from "next/link"
import { FiMapPin } from "react-icons/fi";
import { FiThumbsUp } from "react-icons/fi";

export default function sitio({title,descp,likes,urlMaps,urlImg}) {
    return (
        <>
        <div className="flex text-black mx-auto my-40 mt-20 bg-grey-200 w-2/3 h-40 rounded-2xl border-2 border-gray-600">
           <div className="bg-gray-400 w-1/6 h-24 mt-8 ml-8 rounded-2xl">
                <img src={urlImg} className="mx-auto w-24 h-24 object-fill"/>
           </div>
          
        </div>
        <div class="mt-3 p-3 w-full flex justify-center items-center mx-auto w-2/3 h-40 ">
             <textarea rows="3" class="border p-2 rounded w-full" placeholder="Añada su comentario aquí..."></textarea>
            
        </div>
        <button
              type="submit"
              className=" mx-auto capitalize mt-4 w-full tracking-normal px-4 py-3 text-xs font-bold text-center text-black bg-gray-300 rounded-md hover:bg-blue-200"
              >
              Añadir
        </button>

    
       
        </>
    )
}