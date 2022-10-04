import Layout from "@/components/Layout"
export default function AddPlace(id) {
    
  
    const handleSubmit = async (e,id) => {
      id = id.id
      e.preventDefault()
      const { name, publisherId } = e.target

      const place = {
        name: name.value,
        publisherId: publisherId.value,
        publishingDate: new Date().toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
        }),
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
      <form
      method="post"
      onSubmit={(e) => {
        handleSubmit(e,id)
      }}
      className="mt-4"
    >
      <div className="flex gap-x-2 mt-3">
        <label type="name" className="block">
          <span className="text-sm text-white">Nombre de la ciudad</span>
          <input
            type="name"
            id="name"
            name="name"
            autoComplete="name"
            className="block w-full px-3 py-2 mt-1 text-white border rounded-md form-input focus:border-blue-600 bg-transparent"
            required
          />
        </label>
        <label type="publisherId" className="block">
          <span className="text-sm text-white">ID del usuario que lo publica</span>
          <input
            type="publisherId"
            id="publisherId"
            name="publisherId"
            autoComplete="last name"
            className="block w-full px-3 py-2 mt-1 text-white border rounded-md form-input focus:border-blue-600 bg-transparent"
            required
          />
        </label>
      </div> 
      <button
              type="submit"
              className="capitalize w-full tracking-normal px-4 py-3 text-xs font-bold text-center text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Register
            </button>
      </form>
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