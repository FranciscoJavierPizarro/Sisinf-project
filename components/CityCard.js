import Link from "next/link"
import { FiMapPin, FiX, FiCheck, FiTrash2 } from "react-icons/fi";
import { useSession } from "next-auth/react";


export default function CityCard({ title, descp, urlMaps, urlImg, urlCity, Validacion, idCity }) {
    const { data: session } = useSession()

    const handleValid = async (e) => {
        e.preventDefault()
        await fetch(`/api/cities/` + idCity, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Validacion: true })
        })
        location.href = "/admin"
    }
    const handleDelete = async (e) => {
        e.preventDefault()
        await fetch(`/api/cities/` + idCity, {
            method: "delete",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify("")
        })
        location.href = "/"
    }
    const handleDeleteAdmin = async (e) => {
        e.preventDefault()
        await fetch(`/api/cities/` + idCity, {
            method: "delete",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify("")
        })
        location.href = "/admin"
    }

    return (

        <Link href={urlCity}>
            <div className="flex text-black mt-8 bg-gray-200 w-1/3 h-40 rounded-2xl border-2 border-gray-600 hover:cursor-pointer">
                <div className="w-24 h-24 mt-8 ml-8 rounded-2xl">
                    <img src={urlImg} className="mx-auto w-24 h-24" />
                </div>
                <div className="w-2/3 ml-8 h-full">

                    <div className="flex w-full align-left font-semibold mt-8">

                        {title}
                        <Link href={urlMaps} className="hover:cursor-pointer">
                            <FiMapPin className="ml-4 text-red-400 hover:cursor-pointer" />
                        </Link>
                        {session?.session?.user?.image === true && <>
                            <button className="ml-2 text-gray-500" onClick={(e) => { handleDelete(e) }}>
                                <FiTrash2 />
                            </button>
                        </>}


                    </div>
                    <p className="h-full text-justify text-base text-ellipsis">
                        {descp}
                    </p>
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
                                        handleDeleteAdmin(e)
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

    )
}