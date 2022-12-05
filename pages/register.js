import Layout from "@/components/Layout"
import CryptoJS from "crypto-js"
import crypto from "crypto"
import Sidebar from "@/components/Sidebar"
export default function Register() {
    
  const handleSubmit = async (e) => {
      e.preventDefault()
      const { name, gmail, password,spam } = e.target
      const salt = crypto.randomBytes(32).toString("hex")
      const user = {
        name: name.value,
        salt: salt,
        gmail:gmail.value,
        password:CryptoJS.SHA512(salt + password.value).toString(),
        admin:false,
        spam:spam.value
      }

      await fetch(`/api/log/`, {
        method: "post",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(user)
      })
      location.href = "/"
    }
  
    return (
      <>
      <div className="flex justify-center">
      <Sidebar /> 
      <form
      method="post"
      onSubmit={(e) => {
        handleSubmit(e)
      }}
      className="mt-4"
      >
      <div className=" bg-purple-200  bg-opacity-70 rounded-md px-6 py-10 w-full ml-70 mx-auto">
        <h1 className="text-center text-2xl font-bold text-gray-500 mb-10">Registrarse</h1>
        <div className="space-y-4">
      
      
        <div className="flex gap-x-2 mt-1 transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 ">
          <label className="block w-full">
          <span className="mt-10 px-1 text-sm text-xl text-gray-600">Introduce un nombre de usuario:</span>
                    <input
                    type="name"
                    id="name"
                    name="name"
                    autoComplete="name"
                    placeholder="Nombre de usuario "
                    className="w-full border-white bg-transparent outline-none  focus:outline-none"
                    required
                  />
                  </label>
                
        </div>
          <div className="flex gap-x-2 mt-1 transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 ">
          <label className="block w-full">
          <span className="mt-10 mb-10 px-1 text-sm text-xl text-gray-600">Introduce un correo electrónico:</span>
                  <input
                    type="gmail"
                    id="gmail"
                    name="gmail"
                    autoComplete="gmail"
                    placeholder="Correo electrónico"
                    className="w-full border-black bg-transparent outline-none  focus:outline-none"
                    required
                  />
                  </label>
                
              </div>
              <div className="flex gap-x-2 mt-1 transform border-b-2 bg-transparent text-lg  mb-10 duration-300 focus-within:border-indigo-500 ">
              <label className="block w-full">
              <span className="mt-10 px-1 text-sm text-xl text-gray-600">Introduce una contraseña:</span>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="password"
                    placeholder="Contraseña"
                    className="w-full border-white bg-transparent outline-none focus:outline-none"
                    required
                  />
                  </label>
                
              </div>
          <div className="flex gap-x-2 mt-50 transform border-b-2 bg-transparent text-lg   duration-300 focus-within:border-indigo-500">
            <label className="block w-full">
              <span className="mt-10 px-1 text-sm text-xl text-gray-600">Enlace a tu cuenta de tu RRSS favorita para que te sigan:</span>
              <input
                type="spam"
                id="spam"
                name="spam"
                autoComplete="spam"
                placeholder="Enlace a otra RRSS"
                className="w-full border-white bg-transparent outline-none focus:outline-none"
                required
                />
            </label>
          </div>    
        <button
                type="submit"
                className="capitalize mt-4 w-full tracking-normal px-4 py-3 text-base font-bold text-center text-black bg-purple-300 hover:bg-purple-400 rounded-md "
                >
                Registrarse
              </button>
              </div>
        </div>
        </form>
      
      </div>
      </>
    );
  }

  Register.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
  }