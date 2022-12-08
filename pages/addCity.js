import Layout from "@/components/Layout"
import { useSession } from "next-auth/react"
import Sidebar from "@/components/Sidebar"
import { useRouter } from 'next/router'
export default function AddCity() {
  const router = useRouter()
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
      router.push("/")
    }
  
    return (
      <>
      <div className="flex justify-center h-full">
      <Sidebar />
      <form
      method="post"
      onSubmit={(e) => {
        handleSubmit(e,session)
      }}
      className="mt-8"
      >
      <div className=" bg-sky-300 rounded-md px-6 py-10 w-full ml-70 mx-auto border-2 border-white-300">
        <h1 className="text-center text-2xl font-bold text-gray-900 mb-10">Añadir nombre de ciudad o pueblo</h1>
          <div className="space-y-4 h-full">
      
      
        
        <div className="flex gap-x-2 mt-1 transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 ">
          <label className="block w-full">
          <span className="mt-10 px-1 text-xl text-black">Añadir nombre de ciudad:</span>
                    <input className="placeholder:text-stone-600 w-full border-white bg-transparent outline-none placeholder-black-400 "
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
          <span className="mt-10 px-1 text-xl text-black">Añadir URL de Google Maps:</span>
                    <input
                    type="url"
                    id="maps"
                    name="maps"
                    autoComplete="maps"
                    placeholder="Enlace a Google Maps "
                    className="placeholder:text-stone-600 w-full border-white bg-transparent outline-none  focus:outline-none"
                  />
                  </label>
                
        </div>

        <div className="flex gap-x-2 mt-1 transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 ">
          <label className="block w-full">
          <span className="mt-10 px-1 text-xl text-black">Añadir URL foto:</span>
                    <input
                    type="url"
                    id="photo"
                    name="photo"
                    autoComplete="photo"
                    placeholder="Enlace a la foto "
                    className="placeholder:text-stone-600 w-full border-white bg-transparent outline-none  focus:outline-none"
                    required
                  />
                  </label>
                
        </div>

        <div className="h-40" >
                <span className="ml-2 text-xl text-black">Añadir descripción de la ciudad:</span>
                <textarea id="descp" maxlength="151" required className="h-3/4 mt-2 w-full font-arial p-4 text-gray-600 bg-indigo-50 outline-none rounded-md" placeholder="Añadir descripción..."></textarea>
              </div>
          
              
        <button
                type="submit"
                className="mx-auto capitalize w-full mx-auto mt-4 text-white px-4 py-3 text-sm font-bold text-center rounded-md bg-blue-500 hover:bg-blue-600  hover:cursor-pointer"
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