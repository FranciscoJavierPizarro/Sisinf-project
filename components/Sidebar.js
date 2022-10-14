import { useSession, signOut } from "next-auth/react"
import { FiLogOut } from "react-icons/fi";
import SidebarButton from "./SidebarButton";
export default function Sidebar() {
    const { data: session } = useSession()

    const buttons = [
        {
            text: "Dashboard",
            url:"http://localhost:3000/",
            logoName:<FiLogOut/>
        },
        {
            text: "Ciudades guardadas",
            url:"http://localhost:3000/",
            logoName:<FiLogOut/>
        },
        {
            text: "Lugares guardadas",
            url:"http://localhost:3000/",
            logoName:<FiLogOut/>
        },
        {
            text: "Estadísticas",
            url:"http://localhost:3000/",
            logoName:<FiLogOut/>
        },
        {
            text: "Descubre",
            url:"http://localhost:3000/",
            logoName:<FiLogOut/>
        },
        {
            text: "Colaboradores",
            url:"http://localhost:3000/",
            logoName:<FiLogOut/>
        },
    ]
    
    const list = buttons.map((item, idx) => (
        <SidebarButton
        key={idx}
        text = {item.text}
        url = {item.url}
        logo = {item.logoName}
        />
    ))
    return (
        <>
            <aside class="w-64 h-full absolute top-0 left-0 bg-sidebarBackground" aria-label="Sidebar">
            <div class="overflow-y-auto py-4 px-3 rounded">
                <ul class="space-y-2">
                    {list}
                    
                </ul>
            {session && 
            <button className='absolute bottom-0 ml-4 mb-4' onClick={() => signOut()}><FiLogOut className='h-11 w-11'/></button>
            }
            </div>
            </aside>
        </>
    )
}