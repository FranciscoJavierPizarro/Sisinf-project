import Link from "next/link"
import { FiMapPin, FiX, FiCheck, FiTrash2 } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { RxCrossCircled} from "react-icons/rx";
import { CiCircleCheck } from "react-icons/ci";

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
            <div className=" bg-white  shadow-lg hover:shadow-2xl hover:cursor-pointer flex text-black mt-8  w-1/3 h-40 shadow-lg rounded-2xl">
                <div className="w-24 h-24 mt-8 ml-8 rounded-2xl">
                    <img src={urlImg} className="mx-auto w-24 h-24" />
                </div>
                <div className="w-2/3 ml-8 h-full">

                    <div className="uppercase text-xl flex w-full align-left font-semibold mt-8">

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
                    <p className="h-auto w-full text-left text-base text-ellipsis mr-2">
                        {descp}
                    </p>
                    {session && <>
                        <div className="name text-gray-800 text-2xl font-medium mt-4">
                            {
                                !Validacion &&
                                <>
                                    <button className="bg-transparent hover:cursor-pointer" onClick={(e) => {
                                        handleValid(e)
                                    }} >
                                        <CiCircleCheck className="text-green-500" />
                                    </button>
                                    <button className="bg-transaprent ml-2 hover:cursor-pointer" onClick={(e) => {
                                        handleDeleteAdmin(e)
                                    }}>

                                        < RxCrossCircled className="text-red-500" />
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