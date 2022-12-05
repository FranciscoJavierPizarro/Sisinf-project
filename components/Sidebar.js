import { useSession, signOut } from "next-auth/react"
import { FiLogOut,FiHome,FiMap,FiUsers,FiBookmark,FiLock } from "react-icons/fi";
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
            url:"/descubre",
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
            text: "Lugares guardados",
            url:"/sitiosGuardados",
            logoName:<FiBookmark/>
        },
        
    ]

    const Adminbuttons = [
        {
            text: "Administrar",
            url:"/admin",
            logoName:<FiLock/>,
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

    const Adminlist = Adminbuttons.map((item, idx) => (
        <SidebarButton
        key={idx}
        text = {item.text}
        url = {item.url}
        logo = {item.logoName}
        />
    ))
    return (
        <div className="w-64">
            <aside className="w-64 h-full absolute top-0 left-0 bg-gradient-to-t from-cyan-500 to-blue-500   border-r-2 border-indigo-100 shadow-md rounded-tr-3xl rounded-br-3xl" aria-label="Sidebar">
            <div className="grid h-36 mb-2 mt-4 justify-items-center text-white">
                <img src={"/logoNombre.png"} className=" justify-self-center h-36"/>

            </div>
            <div className="overflow-y-auto ">
                <ul className="">
                    {list}
                    {session && Loggedlist}
                    {session?.session?.user?.image === true && Adminlist}
                </ul>
            {session && 
            <button className='absolute bottom-0 ml-4 mb-4' onClick={() => signOut()}><FiLogOut className='h-11 w-11'/></button>
            }
            </div>
            </aside>
        </div>
    )
}