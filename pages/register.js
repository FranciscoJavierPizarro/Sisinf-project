import Layout from "@/components/Layout"
import CryptoJS from "crypto-js"
import crypto from "crypto"
export default function Register() {
    
  const handleSubmit = async (e) => {
      e.preventDefault()
      const { name, gmail, password } = e.target
      const salt = crypto.randomBytes(32).toString("hex")
      const user = {
        name: name.value,
        salt: salt,
        gmail:gmail.value,
        password:CryptoJS.SHA512(salt + password.value).toString(),
        
      }

      await fetch(`http://localhost:3000/api/log/`, {
        method: "post",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(user)
      })
      location.href = "/"
    }
  
    return (
      <>
      <div className="flex justify-center">
        
      <form
      method="post"
      onSubmit={(e) => {
        handleSubmit(e)
      }}
      className="mt-4"
      >
      <div className=" bg-white rounded-md px-6 py-10 w-full ml-70 mx-auto">
        <h1 className="text-center text-2xl font-bold text-gray-500 mb-10">Añadir nombre de ciudad o pueblo</h1>
        <div className="space-y-4">
      
      
        <div className="flex gap-x-2 mt-1">
          <label type="name" className="block w-full">
              <span className="px-1 text-sm text-gray-600">Añadir nombre de ciudad:</span>
              <input
                type="name"
                id="name"
                name="name"
                autoComplete="name"
                className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 
                focus:bg-white focus:border-gray-600 focus:outline-none"
                            
                required
              />
            </label>
          </div>
          <div className="flex gap-x-2 mt-1">
            <label className="block w-full">
              <span className="px-1 text-sm text-gray-600">Añadir URL foto:</span>
              <input
                type="gmail"
                id="gmail"
                name="gmail"
                autoComplete="gmail"
                className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 
                focus:bg-white focus:border-gray-600 focus:outline-none"
                required
                />
            </label>
          </div>
          <div className="flex gap-x-2 mt-1">
            <label className="block w-full">
              <span className="px-1 text-sm text-gray-600">Añadir URL foto:</span>
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
              
        <button
                type="submit"
                className="capitalize mt-4 w-full tracking-normal px-4 py-3 text-xs font-bold text-center text-black bg-gray-300 hover:bg-gray-500 rounded-md hover:bg-blue-200"
                >
                Añadir
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