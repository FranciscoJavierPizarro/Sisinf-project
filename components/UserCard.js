import Link from "next/link"
import { FiMapPin, FiX, FiCheck } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { FaCity,FaCommentAlt,FaHeart,FaMonument,FaUserAlt,FaInstagram,FaUserPlus} from "react-icons/fa";


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
     
        <div className="mb-6 card ml-12 bg-white  shadow-lg hover:shadow-2xl  flex flex-col items-center justify-center p-4 shadow-lg rounded-2xl w-2/3">
            <div className="profile mx-auto rounded-full py-2 w-16 "> 
                <img src="https://www.disneyplusinformer.com/wp-content/uploads/2021/09/The-Simpsons-Profile-Icons-8.png" alt="profile"></img>
            </div>
            <div className="name text-gray-800 text-2xl font-medium mt-4 ">
                <p>{name}</p>
               
                                       
                {(!spam == "") && 
                    <Link href={spam} className="hover:cursor-pointer">
                        <FaUserPlus className="ml-4 text-green-400 hover:cursor-pointer" />
                    </Link>
                }
            </div>
                                    
        </div>
                            
                        
       


    )
}