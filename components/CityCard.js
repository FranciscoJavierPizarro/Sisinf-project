import Link from "next/link"
import { FiMapPin,FiX,FiCheck} from "react-icons/fi";
import { useSession } from "next-auth/react";


export default function CityCard({ title, descp, urlMaps, urlImg, urlCity, Validacion, idCity }) {
    const { data: session } = useSession()

    const handleValid = async (e) => {
        e.preventDefault()
        await fetch(`http://localhost:3000/api/cities/` + idCity, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Validacion: true })
        })
        location.href = "http://localhost:3000/admin"
    }
    const handleDelete = async (e) => {
        e.preventDefault()
        await fetch(`http://localhost:3000/api/cities/` + idCity, {
            method: "delete",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify("")
        })
        location.href = "/admin"
    }


    return (//meterle  la validacion mirar para ello el placecard
        <>
        <Link href={urlCity}>
            <div className="flex text-black mx-auto mt-8 bg-gray-200 w-2/3 h-40 rounded-2xl border-2 border-gray-600 hover:cursor-pointer">
                <div className="w-1/6 h-24 mt-8 ml-8 rounded-2xl">
                    <img src={urlImg} className="mx-auto w-24 h-24" />
                </div>
                <div className="ml-16  w-5/6 h-full">
                    <div className="flex w-full align-left font-semibold mt-8">
                        
                            {title}
                        <Link href={urlMaps} className="hover:cursor-pointer">
                            <FiMapPin className="ml-8 text-red-400 hover:cursor-pointer" />
                        </Link>

                    </div>
                    <div className="text-left text-base">
                        {descp}
                    </div>
                    {session && <>
                        <div className="grid place-items-end mr-7">
                            {
                                !Validacion &&
                                <>
                                    <button className="bg-blue-200 hover:cursor-pointer" onClick={(e) => {
                                        handleValid(e)
                                    }} >
                                        <FiCheck className="text-green-500" />
                                    </button>
                                    <button className="bg-blue-200 hover:cursor-pointer" onClick={(e) => {
                                        handleDelete(e, idCity)
                                    }}>
                                        <FiX className="text-red-500" />
                                    </button>
                                </>
                            }


                        </div>
                    </>}
                </div>
            </div>
        </Link>
        </>
    )
}