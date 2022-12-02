import Layout from '../components/Layout'
import Sidebar from '@/components/Sidebar';
import Link from "next/link"

export default function Colaboradores({ users, stats }) {
    return (
        <>
            <div className='w-full'>
                <div class="grid mt-3 justify-items-center text-2xl ">
                    <Sidebar />
                    Estadisiticas:

                    <div class="mt-3 w-1/3 m-auto bg-gradient-to-r from-cyan-500 to-blue-500 p-6  rounded-lg ">
                        <div class="my-auto">
                            
                       
                            <div class="text-lg text-white-300">Numero de sitios: {stats.nPlaces} </div>
                       
                            <div class="text-lg text-white-300">Numero de lugares guardados: {stats.nSavedPlaces} </div>
                       
                            <div class="text-lg text-white-300">Numero de usuarios: {stats.nUsers} </div>
                       
                           
                       
                       
                   
                    
                        <div className="stat">
                                <div className="stat-figure text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                                </div>
                                <div className="text-lg text-white-300">Total de ciudades    {stats.nCities}</div>
                                    
                                </div>


                        </div>

                        <div className="stat">
                                <div className="stat-figure text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                                </div>
                                <div className="text-lg text-white-300">Total de comentarios    {stats.nComments}</div>
                                    
                                </div>


                        </div>

                        <div className="stat">
                                <div className="stat-figure text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                                </div>
                                <div className="text-lg text-white-300">Total de likes    {stats.nLikes}</div>
                                    
                                


                        </div>

                        <div className="stat">
                                <div className="stat-figure text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                                </div>
                                <div className="text-lg text-white-300">Total de sitios   {stats.nPlaces}</div>
                                    
                                


                        </div>

                    </div>

                    
                   
                    
                    
                    {users.map(u => {
                        return(
                        <p key={u.id}>
                            {u.name} {u.gmail}
                            {!(u?.spam === undefined) && <Link href={u.spam}>{u.spam}</Link>}
                        </p>)
                    })}
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