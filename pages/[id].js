import Layout from '@/components/Layout'

export default function Home({cities}) {
  return (
    <h1 className="h-full bg-orange-600 capitalize text-white text-2xl text-center">
      <p>{cities.name}</p>
      <p>{cities.publisherId}</p>
      <p>{cities.publishingDate}</p>
    </h1>
  );
}

export async function getServerSideProps(req) {
  const { id } = req.params
  const cities = await fetch("http://localhost:3000/api/cities/" + id).then(res => res.json())
  return {
    props: {cities}, // will be passed to the page component as props
  }
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}