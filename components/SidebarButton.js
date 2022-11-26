import Link from "next/link"
import { useRouter } from "next/router"
export default function SidebarButton({ text,url,logo }) {
    const router = useRouter()
    return (
      <>
        <li className={router.pathname === url ? "bg-activesidebar" : "bg-bg-gradient-to-r from-cyan-500 to-blue-500"}>  
            <Link href={url} >
                <div className="flex items-center p-3 text-lg font-normal text-gray-900 hover:cursor-pointer hover:bg-activesidebar">
                    {logo}
                    <span className="ml-3">{text}</span>
                </div>
            </Link>
        </li>
      </>
    )
  }