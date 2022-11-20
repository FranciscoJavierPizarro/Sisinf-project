import Meta from "./Meta"
import { FiUser, FiLogOut } from "react-icons/fi";
import { useSession, signIn, signOut } from "next-auth/react"
export default function Layout({ children }) {
  const { data: session } = useSession()
  return (
    <>
      <Meta />
      <div className="h-screen flex bg-gradient-to-t from-cyan-400 to-blue-300">
        <div className="flex-auto overflow-y-auto">
          <main className="h-screen">
            {!session && 
              <>
              <div className='flex justify-end'>
                <button onClick={() => signIn()} className='flex-col mr-4 mt-2 justify-center'>
                  <FiUser className='mx-auto h-11 w-11'/>
                  <p>Sign in</p>
                </button>
                
              </div></>
            }
            {/* {session && 
              <button className='absolute bottom-0 left-0 ml-4 mb-4' onClick={() => signOut()}><FiLogOut className='h-11 w-11'/></button>
            } */}
            
            {/* {session && 
              <Sidebar/>
            } */}
            {children}
            
          </main>
        </div>
      </div>
    </>
  )
}