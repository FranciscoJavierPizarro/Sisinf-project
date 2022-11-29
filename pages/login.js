import Layout from "@/components/Layout"
import Github from "next-auth/providers/github";
import { signIn } from 'next-auth/react';
import Link from "next/link";

export default function Login() {
  return (
    <>

      <div className="w-1/3 ml-50 mx-auto">
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
          className="mt-4"
        >
          <div className=" bg-white rounded-md px-6 py-10 w-full ml-50 mx-auto ">
            <h1 className="text-center text-2xl font-bold text-gray-500 mb-10">Sign Up</h1>
            <div className="space-y-4">

              <div className="flex gap-x-2 mt-1">
                <label className="block w-full">
                  <span className="px-1 text-sm text-gray-600">Dirección de correo electrónico:</span>
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
                  <span className=" px-1 text-sm text-gray-600">Contraseña:</span>
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
            className="capitalize mt-4 w-full tracking-normal px-4 py-3 text-xs font-bold text-center text-black bg-gray-300 rounded-md hover:bg-blue-200"
          >
            Loguear
          </button>
        </form>
        <div>
          <button onClick={() => signIn("github", { callbackUrl: '/' })}>
            Sign in with github
          </button>
        </div>
        <div>
          <Link href="/register">
            Registrarse
          </Link>
        </div>
      </div>
    </>
  );
}


Login.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}