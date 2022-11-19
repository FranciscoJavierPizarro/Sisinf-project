import Link from "next/link"
import { useRouter } from "next/router"
export default function SidebarButton({ text,url,logo }) {
    const router = useRouter()
    console.log(url, router.pathname, router.pathname === url )
    return (
      <>
        <li className={router.pathname === url ? "bg-activesidebar" : "bg-sidebarBackground"}>  
            <Link href={url} >
                <div className="p-4 flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:cursor-pointer">

                    {logo}
                    <span className="ml-3">{text}</span>
                </div>
            </Link>
        </li>
      </>
    )
  }