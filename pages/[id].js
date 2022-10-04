import Layout from '@/components/Layout'
import Link from 'next/link';
export default function Home({city, cityPlaces}) {
  const handleDelete= async (e,place,city) => {
    e.preventDefault()
    console.log(place)
    await fetch(`http://localhost:3000/api/places/` + place._id, {
      method: "delete",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify("")
    })
    location.href = "http://localhost:3000/" + city.id
  }
  
  return (
    <>
      <h1 className="h-full bg-orange-600 capitalize text-white text-2xl text-center">
        <p>{city.name}</p>
        <p>{city.publisherId}</p>
        <p>{city.publishingDate}</p>
        <br></br>
        {cityPlaces.map(u => <p key={u._id}>{u.name} <button onClick={(e) => {handleDelete(e,u,city)
      }}> borrame</button></p>)}
        <Link href={"http://localhost:3000/addPlace/" + city.id} className='test-white'>+</Link>
      </h1>
    </>
  );
}

export async function getServerSideProps(req) {
  const { id } = req.params
  const city = await fetch("http://localhost:3000/api/cities/" + id).then(res => res.json())
  const cityPlaces = await fetch("http://localhost:3000/api/placesbycity/"+ id).then(res => res.json())
  return {
    props: {city, cityPlaces}// will be passed to the page component as props
  }
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}