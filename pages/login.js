import Layout from "@/components/Layout"
import Github from "next-auth/providers/github";
import { signIn } from 'next-auth/react';
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
export default function Login() {
  return (
    <>
    <div className="w-full flex">
      <Sidebar />
      <div className="w-full grid justify-items-center mt-4 ">
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
          className="mt-4 w-1/4"
        >
          <div>
          <div className="bg-white rounded-md px-6 py-8 w-full ml-50 mx-auto ">
            <h1 className="text-center text-2xl font-bold text-gray-500 mb-10">Sign Up</h1>
            <div className="space-y-4">

              <div className="flex gap-x-2 mt-1">
                <label className="block w-full">
                  <span className="px-1 text-base text-gray-600">Dirección de correo electrónico:</span>
                  <input
                    type="username"
                    id="username"
                    name="username"
                    autoComplete="username"
                    className="text-md block px-3 py-2 rounded-lg w-full
                  bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 
                  focus:bg-white focus:border-gray-600 focus:outline-none"
                    required
                  />
                </label>
              </div>
              <div className="flex gap-x-2 mt-1">
                <label className="block w-full">
                  <span className=" px-1 text-base text-gray-600">Contraseña:</span>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="password"
                    className="text-md block px-3 py-2 rounded-lg w-full
                  bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 
                  focus:bg-white focus:border-gray-600 focus:outline-none"
                    required
                  />
                </label>
              </div>


            </div>
            </div>

            <button
              type="submit"
            className ="flex mt-3 bg-red-500 hover:bg-yellow-700 text-white font-bold py-2 px-10 mx-auto ml-50 rounded-full">
              Loguear
            </button>
        
       
          <div className="w-full flex mx-auto">
            <button className ="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 mx-auto ml-50 rounded-full">
            <Link href="/register">
              Registrarse
            </Link>
            </button>
          </div>
          <div>
            <button className="flex mt-3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-10 mx-auto ml-50 rounded-full" 
            onClick={() => signIn("github", { callbackUrl: '/' })}>
              Sign in with github
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