import Layout from "@/components/Layout"
import Github from "next-auth/providers/github";
import { signIn } from 'next-auth/react';
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
export default function Login() {
  return (
    <>
    <div className="flex justify-center w-full ">
      <Sidebar />
      <div className="w-full grid justify-items-center mt-4">
        <form
          method="post"
          onSubmit={(e) => {
            e.preventDefault()
            const { username, password } = e.target
            signIn("credentials", {
              username: username.value,
              password: password.value,
              callbackUrl: '/'
            } )
          }}
          className="mt-4 w-1/3"
        >
          <div>
          
      <div className=" bg-sky-300  border-2 border-white-300   rounded-md px-6 py-10 w-full ml-70 mx-auto">
        <h1 className="text-center text-2xl font-bold text-gray-900 mb-10">Login</h1>
        <div className="space-y-4">
      
      
        <div className="flex gap-x-2 mt-1 transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 ">
        <label className="block w-full">
        <span className="mt-10 px-1 text-sm text-xl text-black">Introduce tu correo electrónico:</span>
                  <input
                    type="name"
                    id="username"
                    name="username"
                    autoComplete="username"
                    placeholder="Direccion de correo electrónico "
                    className="placeholder:text-stone-600 w-full border-white bg-transparent outline-none  focus:outline-none"
                    required
                  />
                  </label>
                
              </div>
          
              <div className="flex gap-x-2 mt-1 transform border-b-2 bg-transparent text-lg  mb-10 duration-300 focus-within:border-indigo-500 ">
              <label className="block w-full">
              <span className="mt-10 px-1 text-sm text-xl text-black">Introduce tu contraseña:</span>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="password"
                    placeholder="Contraseña"
                    className="placeholder:text-stone-600 w-full border-white bg-transparent outline-none focus:outline-none"
                    required
                  />
                  </label>
                
              </div>
         
        
              </div>
        </div>

            <button
              type="submit"
            className ="flex mt-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-10 mx-auto ml-50 rounded-full">
              Entrar
            </button>
        
       
          <div className="w-full flex mx-auto">
            <button className ="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 mx-auto ml-50 rounded-full">
            <Link href="/register">
              ¿No tienes una cuenta?
            </Link>
            </button>
          </div>
        </div>

      </form>
      </div>
      </div>
    </>
  );
}


Login.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}