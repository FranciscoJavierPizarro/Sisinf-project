import Layout from "@/components/Layout"
import { useSession } from "next-auth/react"

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

      await fetch(`http://localhost:3000/api/cities/`, {
        method: "post",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(city)
      })
      location.href = "/"
    }
  
    return (
      <>
      <div className="flex justify-center h-5/6">
        
      <form
      method="post"
      onSubmit={(e) => {
        handleSubmit(e,session)
      }}
      className="mt-8"
      >
      <div className="bg-white rounded-md px-6 py-8 w-full mx-auto h-full">
        <h1 className="text-center text-2xl font-bold text-gray-500 mb-10">Añadir nombre de ciudad o pueblo</h1>
          <div className="space-y-4 h-full">
      
      
        <div>
          <label type="name" className="block w-full">
              <span className="px-1 text-md text-gray-600">Añadir nombre de ciudad:</span>
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
          <div>
            <label className="block w-full">
              <span className="px-1 text-md text-gray-600">Añadir URL de Google Maps:</span>
              <input
                type="url"
                id="maps"
                name="maps"
                autoComplete="maps"
                className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 
                focus:bg-white focus:border-gray-600 focus:outline-none"
                required
              />
            </label>
          </div>
          <div>
            <label className="block w-full">
              <span className="px-1 text-md text-gray-600">Añadir URL foto:</span>
              <input
                type="url"
                id="photo"
                name="photo"
                autoComplete="photo"
                className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 
                focus:bg-white focus:border-gray-600 focus:outline-none"
                required
                />
            </label>
          </div>
          <div className="h-40">
            <span className="ml-2 text-md text-gray-600">Añadir descripción del sitio:</span>
              <textarea id="descp" maxlength="251" required className="h-5/6 mt-2  w-full font-arial p-4 text-gray-600 bg-indigo-50 outline-none rounded-md" placeholder="Añadir descripción..."></textarea>
          </div>
          
              
        <button
                type="submit"
                className="capitalize w-full tracking-normal px-2 py-3 focus:ring-black focus:ring-1 text-xs font-bold text-center text-black bg-gray-300 hover:bg-gray-500 rounded-md hover:bg-blue-200"
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