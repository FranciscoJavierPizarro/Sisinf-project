import Layout from '../components/Layout'
import Sidebar from '@/components/Sidebar';
import Link from "next/link"

export default function Colaboradores({ users, stats }) {
    return (
        <>
            <div className='w-full'>
                <div class="grid justify-items-center">
                    <Sidebar />
                    Estadisiticas:
                    <div>
                        <p>{stats.nCities}</p>
                        <p>{stats.nComments}</p>
                        <p>{stats.nLikes}</p>
                        <p>{stats.nPlaces}</p>
                        <p>{stats.nSavedPlaces}</p>
                        <p>{stats.nUsers}</p>
                    </div>
                    Gracias a nuestros Colaboradores:
                    
                    
                    {users.map(u => {
                        return(
                        <p key={u.id}>
                            {u.name} {u.gmail}
                            {!(u?.spam === undefined) && <Link href={u.spam}>{u.spam}</Link>}
                        </p>)
                    })}
                </div>

                <div class="grid justify-items-center">. </div>
                <div class="grid justify-items-center">. </div>
                <div class="grid justify-items-center">. </div>
                <div class="grid justify-items-center">Muchas gracias  a todos (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧</div>
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