import Layout from '../components/Layout'
import Sidebar from '@/components/Sidebar';
import Link from "next/link"
import UserCard from '@/components/UserCard';
import { FaCity,FaCommentAlt,FaHeart,FaMonument,FaUserAlt,FaInstagram,FaUserPlus} from "react-icons/fa";

import { BsListStars} from "react-icons/bs";
export default function Colaboradores({ users, stats }) {
    return (
        <>
            <div className='w-full'>
                <div className="grid mt-3 text-2xl ">
                    <Sidebar />
                    
                    <div className="px-6 py-8 w-full ml-6 mx-auto h-5">
                        <h1 className="text-center text-2xl font-bold text-white-500 mb-10">Estadísticas</h1>
                    </div>

                    <div className="grid grid-cols-2 gap-4 justify-self-center mb-10 mt-3 w-2/3 ml-10  p-6  rounded-lg ">
                               
                            <div className="container mx-auto pr-4 mt-5">
                                <div className="w-2/3 bg-white  mx-auto rounded-sm mb-3  shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100">
                                    <div className="h-10 bg-purple-400 ">
                                        <FaCity className="inline-block w-8 h-6 ml-4  text-black-400 " />
                                    </div>
                                    <div className="flex justify-between px-5 pt-2 mt -1 mb-1 text-base text-gray-600">
                                        <p>Número de ciudades</p>
                                    </div>
                                    <p className="py-2 text-1xl ml-5">{stats.nCities}</p>
                                
                                </div>

                                
                            </div>

                            <div className="container mx-auto pr-4 mt-5">
                                <div className="w-2/3 mb-3 bg-white  mx-auto rounded-sm  shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 ">
                                    <div className="h-10 bg-purple-400 ">
                                        <FaHeart className="inline-block w-8 h-6 ml-4  text-black-400 " />
                                    </div>
                                    <div className="flex justify-between px-5 pt-2 mt -1 mb-1 text-base text-gray-600">
                                        <p>Número de likes</p>
                                    </div>
                                    <p className="py-2 text-1xl ml-5">{stats.nLikes}</p>
                                
                                </div>
                            </div>
                            
                            <div className="container mx-auto pr-4 mt-5">
                                <div className="w-2/3 mb-3 bg-white  mx-auto rounded-sm  shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 ">
                                    <div className="h-10 bg-purple-400 ">
                                        <FaCommentAlt className="inline-block w-8 h-6 ml-4  text-black-400 " />
                                    </div>
                                    <div className="flex justify-between px-5 pt-2 mt -1 mb-1 text-base text-gray-600">
                                        <p>Número de comentarios</p>
                                    </div>
                                    <p className="py-2 text-1xl ml-5">{stats.nComments}</p>
                                
                                </div>
                            </div>

                       
                        

                            <div className="container mx-auto pr-4 mt-5">
                                <div className="w-2/3 mb-3 bg-white  mx-auto rounded-sm  shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 ">
                                    <div className="h-10 bg-purple-400 ">
                                        <FaMonument className="inline-block w-8 h-6 ml-4  text-black-400 " />
                                    </div>
                                    <div className="flex justify-between px-5 pt-2 mt -1 mb-1 text-base text-gray-600">
                                        <p>Número de sitios</p>
                                    </div>
                                    <p className="py-2 text-1xl ml-5">{stats.nPlaces}</p>
                                
                                </div>
                            </div>

                            <div className="container mx-auto pr-4 mt-5">
                                <div className="w-2/3 mb-3 bg-white  mx-auto rounded-sm  shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 ">
                                    <div className="h-10 bg-purple-400 ">
                                        <BsListStars className="inline-block w-8 h-6 ml-4  text-black-400 " />
                                    </div>
                                    <div className="flex justify-between px-5 pt-2 mt -1 mb-1 text-base text-gray-600">
                                        <p>Sitios guardados</p>
                                    </div>
                                    <p className="py-2 text-1xl ml-5">{stats.nSavedPlaces}</p>
                                    
                                </div>
                            </div>

                            <div className="container mx-auto pr-4 mt-5">
                                <div className="w-2/3 mb-3 bg-white  mx-auto rounded-sm  shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 ">
                                    <div className="h-10 bg-purple-400 ">
                                        <FaUserAlt className="inline-block w-8 h-6 ml-4  text-black-400 " />
                                    </div>
                                    <div className="flex justify-between px-5 pt-2 mt -1 mb-1 text-base text-gray-600">
                                        <p>Número de usuarios</p>
                                    </div>
                                    <p className="py-2 text-1xl ml-5">{stats.nUsers}</p>
                                
                                </div>
                            </div>

                            

                    </div>
                    <div className="px-10 py-1 w-full ml-10 mx-auto h-5">
                        <h1 className="text-center text-2xl font-bold text-white-500">Nuestros colaboradores</h1>
                    </div>
                    <div className="grid grid-cols-3 gap-1 justify-self-center mb-10 mt-10 w-2/3 ml-10 ">
                   
                    {users.map(u =>  <UserCard key={u.id} name={u.name}  gmail={u.gmail} spam={u.spam}/>)}

                    </div>

                       
              
                    
                </div>
            </div>
                
        </>
    )

}
export async function getServerSideProps() {
    const users = await fetch(process.env.NEXTAUTH_URL + "/api/log/login").then(res => res.json())
    const stats = await fetch(process.env.NEXTAUTH_URL + "/api/stats").then(res => res.json())
    return {
        props: { users, stats }, // will be passed to the page component as props
    }
}


Colaboradores.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}