import Link from "next/link"
import { FiMapPin, FiX, FiCheck,FaUserPlus,FiAward } from "react-icons/fi";
import { useSession } from "next-auth/react";

import {TiUserDelete} from "react-icons/ti";
import {FaUserCheck} from "react-icons/fa";
import { useRouter } from 'next/router'
export default function AdministrateUserCard({ name, gmail, admin, spam, id }) {
    const { data: session } = useSession()
    const router = useRouter()
    const handleDelete = async (e) => {
        e.preventDefault()
        await fetch(`/api/log/` + id, {
            method: "delete",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify("")
        })
        router.push("/admin")
    }

    const handleNewAdmin = async (e) => {
        e.preventDefault()
        await fetch(`/api/log/` + id, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ admin: true })
        })
        router.push("/admin")
    }
    return (
        <>{session?.session?.user?.image === true && <>
            <div className="relative mb-6 card ml-12 bg-white  shadow-lg hover:shadow-2xl  flex flex-col items-center justify-center p-4 shadow-lg rounded-2xl w-2/3">
                <div className="profile mx-auto rounded-full py-2 w-16 ">
                    <img src="https://www.disneyplusinformer.com/wp-content/uploads/2021/09/The-Simpsons-Profile-Icons-8.png" alt="profile"></img>
                </div>
                <div className="name text-gray-800 text-2xl font-medium mt-4 ">
                    <p>{name}</p>
                    {
                    !admin &&
                    <>
                        <button className="bg-transparent hover:cursor-pointer" onClick={(e) => {
                            handleNewAdmin(e)
                        }} >
                            < FaUserCheck className="text-green-500" />
                        </button>
                        <button className="bg-transparent ml-2 hover:cursor-pointer" onClick={(e) => {
                            handleDelete(e)
                        }}>
                            <TiUserDelete className="text-red-500" />
                        </button>
                    </>
                } {admin && <>
                    <div className="absolute top-4 left-4">
                        <FiAward/>
                    </div>
                </>}

                </div>

            </div>

        </> || <></>}</>


    )
}