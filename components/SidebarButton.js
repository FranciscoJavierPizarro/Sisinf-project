import Link from "next/link"
export default function SidebarButton({ text,url,logo }) {
    return (
      <>
        <li>  
            <Link href={url} >
                <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:cursor-pointer">

                    {logo}
                    <span className="ml-3">{text}</span>
                </div>
            </Link>
        </li>
      </>
    )
  }