import Layout from '../components/Layout'

export default function Home() {
  return (
    <div className="h-full bg-orange-600">
      prueba
    </div>
  )
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}