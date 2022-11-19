import { useSession, signOut } from "next-auth/react"
import { FiLogOut,FiHome,FiMap,FiUsers,FiBookmark } from "react-icons/fi";
import SidebarButton from "./SidebarButton";
export default function Sidebar() {
    const { data: session } = useSession()

    const buttons = [
        {
            text: "Dashboard",
            url:"http://localhost:3000/",
            logoName:<FiHome/>
        },
        {
            text: "Lugares guardadas",
            url:"http://localhost:3000/sitiosGuardados",
            logoName:<FiBookmark/>
        },
        {
            text: "Descubre",
            url:"https://www.google.es/maps/place/Espa%C3%B1a/@39.8754131,-12.7190775,5z/data=!3m1!4b1!4m5!3m4!1s0xc42e3783261bc8b:0xa6ec2c940768a3ec!8m2!3d40.463667!4d-3.74922?hl=es",
            logoName:<FiMap/>
        },
        {
            text: "Colaboradores",
            url:"http://localhost:3000/Colaboradores",
            logoName:<FiUsers/>
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
            <aside className="w-64 h-full absolute top-0 left-0 bg-sidebarBackground" aria-label="Sidebar">
            <div className="overflow-y-auto py-4 px-3 rounded">
                <ul className="space-y-2">
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