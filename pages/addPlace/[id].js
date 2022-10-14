import Layout from "@/components/Layout"
import { useSession } from "next-auth/react"
export default function AddPlace(id) {
    const { data: session } = useSession()
    const handleSubmit = async (e,id,session) => {
      id = id.id
      e.preventDefault()
      const { name,descp } = e.target
      const place = {
        name: name.value,
        descp: descp.value,
        publisherId: session.user.email,
        // mapsUrl:maps.value,
        // photoUrl:photo.value,
        // publishingDate: new Date().toLocaleDateString('es-ES', {
        //   year: 'numeric',
        //   month: 'numeric',
        //   day: 'numeric',
        // }),
        publisherDate:'2022/10/13',
        cityId: id,
        favs: 0
      }

      await fetch(`http://localhost:3000/api/places/`, {
        method: "post",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(place)
      })
      location.href = "http://localhost:3000/" + id
    }
  
    return (
      <>
      <div className="flex justify-center">

      <form
      method="post"
      onSubmit={(e) => {
        handleSubmit(e,id,session)
      }}
      className="mt-4"
    >
      <div className="grid justify-items-center gap-x-2 mt-1 mb-10">
        <label type="name" className="block w-full">
          <span className="text-2xl self-auto text-black">Añadir un sitio</span>
  
        </label>
      </div>
      <div className="flex gap-x-2 mt-1">
        <label type="name" className="block w-full">
          <span className="text-sm self-auto text-black">Añadir nombre del sitio:</span>
          <input
            type="name"
            id="name"
            name="name"
            autoComplete="name"
            className="block w-full px-3 py-2 mt-1 text-black border rounded-md form-input focus:border-blue-600 bg-transparent"
            required
          />
        </label>
      </div>
      {/* <div className="flex gap-x-2 mt-1">
        <label className="block w-full">
          <span className="text-sm self-auto text-black">Añadir URl de Google Maps:</span>
          <input
            type="maps"
            id="maps"
            name="maps"
            autoComplete="maps"
            className="block w-full px-3 py-2 mt-1 text-black border rounded-md form-input focus:border-blue-600 bg-transparent"
            required
          />
        </label>
      </div>
      <div className="flex gap-x-2 mt-1">
        <label className="block w-full">
          <span className="text-sm self-auto text-black">Añadir URL foto:</span>
          <input
            type="photo"
            id="photo"
            name="photo"
            autoComplete="photo"
            className="block w-full px-3 py-2 mt-1 text-black border rounded-md form-input focus:border-blue-600 bg-transparent"
            required
            />
            </label> 
          </div>  */}
        <div className="gap-x-2 mt-2">
        <span className="text-sm text-black">Añadir descripción del sitio:</span>
          <textarea id="descp" rows="4" className="block p-2.5 mb-5 bg-gray-300 w-full text-sm  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 border-gray-600 placeholder-white-400 text-black focus:ring-blue-500 focus:border-blue-500" placeholder="Añadir descripción..."></textarea>
      </div>
      <button
              type="submit"
              className="capitalize mt-4 w-full tracking-normal px-4 py-3 text-xs font-bold text-center text-black bg-gray-300 rounded-md hover:bg-blue-200"
              >
              Añadir
            </button>
      </form>
    </div>
      </>
    );
  }

  AddPlace.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
  }

  export async function getServerSideProps(req) {
    const { id } = req.params
    return {
      props: {id}// will be passed to the page component as props
    }
  }