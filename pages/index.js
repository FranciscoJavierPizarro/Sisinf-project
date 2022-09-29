import Layout from '../components/Layout'

export default function Home({cities}) {
  return (
    <h1 className="h-full bg-orange-600 capitalize text-white text-2xl text-center">
      {cities.map(u => <p className="p-4" key={u.id}>{u.name}</p>)}
    </h1>
  );
}

export async function getServerSideProps() {
  const cities = await fetch("http://localhost:3000/api/cities").then(res => res.json())
  return {
    props: {cities}, // will be passed to the page component as props
  }
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}