import Layout from "@/components/Layout"
import { useSession } from "next-auth/react"
import Sidebar from "@/components/Sidebar"

export default function AddCity() {
    
  let { data: session } = useSession()
  session = session?.session
  const handleSubmit = async (e) => {
      e.preventDefault()
      const { name, descp, maps, photo } = e.target
      console.log(descp.value)
      const city = {
        name: name.value,
        descp: descp.value,
        publisherId: session?.user?.email,
        mapsUrl:maps.value,
        photoUrl:photo.value,
        Validacion:false,
        // publishingDate: new Date().toLocaleDateString('es-ES', {
        //   day: 'numeric',
        //   month: 'numeric',
        //   year: 'numeric',
        // })
        publisherDate:'2022/10/13',
      }

      await fetch(`/api/cities/`, {
        method: "post",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(city)
      })
      location.href = "/"
    }
  
    return (
      <>
      <div className="flex justify-center h-5/6">
      <Sidebar />
      <form
      method="post"
      onSubmit={(e) => {
        handleSubmit(e,session)
      }}
      className="mt-8"
      >
      <div className=" bg-blue-300 rounded-md px-6 py-10 w-full ml-70 mx-auto border-2 border-white-300">
        <h1 className="text-center text-2xl font-bold text-gray-500 mb-10">Añadir nombre de ciudad o pueblo</h1>
          <div className="space-y-4 h-full">
      
      
        
        <div className="flex gap-x-2 mt-1 transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 ">
          <label className="block w-full">
          <span className="mt-10 px-1 text-sm text-xl text-gray-600">Añadir nombre de ciudad:</span>
                    <input className="w-full border-white bg-transparent outline-none placeholder-black-400 "
                    type="name"
                    id="name"
                    name="name"
                    autoComplete="name"
                    placeholder=" Nombre de ciudad o pueblo"
                    
                    required
                  />
                  </label>
                
        </div>
        <div className="flex gap-x-2 mt-1 transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 ">
          <label className="block w-full">
          <span className="mt-10 px-1 text-sm text-xl text-gray-600">Añadir URL de Google Maps:</span>
                    <input
                    type="url"
                    id="maps"
                    name="maps"
                    autoComplete="maps"
                    placeholder="Enlace a Google Maps "
                    className="w-full border-white bg-transparent outline-none  focus:outline-none"
                    required
                  />
                  </label>
                
        </div>

        <div className="flex gap-x-2 mt-1 transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 ">
          <label className="block w-full">
          <span className="mt-10 px-1 text-sm text-xl text-gray-600">Añadir URL foto:</span>
                    <input
                    type="url"
                    id="photo"
                    name="photo"
                    autoComplete="photo"
                    placeholder="Enlace a la foto "
                    className="w-full border-white bg-transparent outline-none  focus:outline-none"
                    required
                  />
                  </label>
                
        </div>

          <div className="h-40">
            <span className="ml-2 text-md text-gray-600">Añadir descripción del sitio:</span>
              <textarea id="descp" maxlength="150" required className="h-5/6 mt-2  w-full font-arial p-4 text-gray-600 bg-indigo-50 outline-none rounded-md" placeholder="Añadir descripción..."></textarea>
          </div>
          
              
        <button
                type="submit"
                className="capitalize w-full tracking-normal px-2 py-3 focus:ring-black focus:ring-1 text-xs font-bold text-center text-black bg-blue-400 hover:bg-blue-600 rounded-md "
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

  AddCity.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
  }