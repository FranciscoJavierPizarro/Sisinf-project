import Layout from '@/components/Layout'

export default function Home({city, cityPlaces}) {
  return (
    <>
      <h1 className="h-full bg-orange-600 capitalize text-white text-2xl text-center">
        <p>{city.name}</p>
        <p>{city.publisherId}</p>
        <p>{city.publishingDate}</p>
        <br></br>
        {cityPlaces.map(u => <p key={u.id}>{u.name}</p>)}
      </h1>
    </>
  );
}

export async function getServerSideProps(req) {
  const { id } = req.params
  const city = await fetch("http://localhost:3000/api/cities/" + id).then(res => res.json())
  const cityPlaces = await fetch("http://localhost:3000/api/places/").then(res => res.json())
  return {
    props: {city, cityPlaces}// will be passed to the page component as props
  }
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}