import Layout from '../components/Layout'
import CityCard from '@/components/CityCard';
import { useSession } from "next-auth/react"
import Sidebar from '@/components/Sidebar';

export default function SitiosGuardados({cities}) {
  const { data: session } = useSession()
  const getData = async (session) => {
    const saved = await fetch(`http://localhost:3000/api/savedPlaces/`+session.user.email,).then(res => res.json())
    console.log(saved)
    console.log(hello)
    return saved
}
  const places = getData(session)
  return (
    <>
            
      <div className='w-full flex justify-center'>
        <Sidebar/>
        <h1 className="w-2/3 h-full capitalize text-white text-2xl text-center">
          {/* {cities.map(u => <CityCard key={u.id} title={u.name} urlImg={u.photoUrl} urlMaps={u.mapsUrl} descp ={u.descp} urlCity={"http://localhost:3000/"+u.id} likes={0} Valido={true}/>)}
          {places.map(u => <div key={u.id}>{u.placeId}</div>)} */}
          {console.log(cities)} {console.log(places)}
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

SitiosGuardados.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}