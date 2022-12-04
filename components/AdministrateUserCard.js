import Link from "next/link"
import { FiMapPin, FiX, FiCheck } from "react-icons/fi";
import { useSession } from "next-auth/react";


export default function AdministrateUserCard({ name, gmail, admin, spam, id }) {
    const { data: session } = useSession()
    const handleDelete = async (e) => {
        e.preventDefault()
        await fetch(`/api/log/` + id, {
            method: "delete",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify("")
        })
        location.href = "/admin"
    }

    const handleNewAdmin = async (e) => {
        e.preventDefault()
        await fetch(`/api/log/` + id, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ admin: true })
        })
        location.href = "/admin"
    }
    return (

        <div className="bg-white  shadow-lg hover:shadow-2xl flex text-black mx-auto mt-8  w-2/3 h-40 shadow-lg rounded-2xl">
            <div className="ml-8 h-full">
                <div className="flex w-full font-semibold mt-8 text-ellipsis">
                    {name} {gmail} {spam}
                </div>
                {session?.session?.user?.image === true && <>
                    <div className="grid place-items-start mr-7">
                        {
                            !admin &&
                            <>
                                <button className="bg-blue-200 hover:cursor-pointer" onClick={(e) => {
                                    handleNewAdmin(e)
                                }} >
                                    <FiCheck className="text-green-500" />
                                </button>
                                <button className="bg-blue-200 hover:cursor-pointer" onClick={(e) => {
                                    handleDelete(e)
                                }}>
                                    <FiX className="text-red-500" />
                                </button>
                            </>
                        }
                        {admin && <>
                        <p>
                            Already admin
                        </p>
                        </>}


                    </div>
                </>}
            </div>
        </div>


    )
}