import { useSession, signOut } from "next-auth/react"
import { FiLogOut,FiHome,FiMap,FiUsers,FiBookmark } from "react-icons/fi";
import SidebarButton from "./SidebarButton";
export default function Sidebar() {
    const { data: session } = useSession()

    const buttons = [
        {
            text: "Dashboard",
            url:"/",
            logoName:<FiHome/>
        },
        
        {
            text: "Descubre",
            url:"https://www.google.es/maps/place/Espa%C3%B1a/@39.8754131,-12.7190775,5z/data=!3m1!4b1!4m5!3m4!1s0xc42e3783261bc8b:0xa6ec2c940768a3ec!8m2!3d40.463667!4d-3.74922?hl=es",
            logoName:<FiMap/>
        },
        {
            text: "Colaboradores",
            url:"/Colaboradores",
            logoName:<FiUsers/>
        },
        
    ]
    
    const Loggedbuttons = [
        {
            text: "Lugares guardadas",
            url:"/sitiosGuardados",
            logoName:<FiBookmark/>
        },
        {
            text: "Administrar",
            url:"/admin",
            logoName:<FiHome/>,
        }
    ]

    const list = buttons.map((item, idx) => (
        <SidebarButton
        key={idx}
        text = {item.text}
        url = {item.url}
        logo = {item.logoName}
        />
    ))

    const Loggedlist = Loggedbuttons.map((item, idx) => (
        <SidebarButton
        key={idx}
        text = {item.text}
        url = {item.url}
        logo = {item.logoName}
        />
    ))
    return (
        <>
            <aside className="w-64 h-full absolute top-0 left-0 bg-gradient-to-t from-cyan-500 to-blue-500" aria-label="Sidebar">
            <div className="w-1/8 h-24 mb-6 mt-8 ml-1/6 rounded-2xl">
                <img src={"public\logoNombre.png"}/*{"https://cdn-icons-png.flaticon.com/512/5667/5667206.png"}*/ className="ml-16 w-34 h-24 object-cover self-auto"/>

            </div>
            <div className="overflow-y-auto rounded">
                <ul className="">
                    {list}
                    {session && Loggedlist}
                </ul>
            {session && 
            <button className='absolute bottom-0 ml-4 mb-4' onClick={() => signOut()}><FiLogOut className='h-11 w-11'/></button>
            }
            </div>
            </aside>
        </>
    )
}