import Layout from '../components/Layout'
import Link from 'next/link';
import CityCard from '@/components/CityCard';
export default function Home({cities}) {
  return (
    <>
      <div className='flex justify-center'>
        <h1 className="w-2/3 h-full capitalize text-white text-2xl text-center">
          {cities.map(u => <CityCard key={u.id} title={u.name} urlCity={"http://localhost:3000/"+u.id} likes={0}/>)}
          <Link href="http://localhost:3000/addCity" className='test-white'>Añadir ciudad</Link>
        </h1>
      </div>
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