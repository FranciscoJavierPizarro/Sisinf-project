import Layout from '../components/Layout'
import Link from 'next/link';
export default function Home({cities}) {
  return (
    <>
      <h1 className="h-full bg-orange-600 capitalize text-white text-2xl text-center">
        {cities.map(u => <p key={u.id}><Link className="p-4" href={"http://localhost:3000/"+u.id}>{u.name}</Link></p>)}
        <Link href="http://localhost:3000/addCity" className='test-white'>+</Link>
      </h1>
    </>
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