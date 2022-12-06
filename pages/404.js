import Layout from "@/components/Layout"
import Sidebar from "@/components/Sidebar"
import Link from 'next/link';
export default function Custom404() {
  
    return (
      <>
      <div className='w-full flex'>
        <Sidebar />
        <div className="flex-col mx-auto w-full content-center text-center text-lg p-8">
          Has intentado entrar a un sitio que no existe vuelve atrás porfavor :D
          
          <Link href="https://youtu.be/7_8slCdJseg">
          <div className="flex mx-auto justify-center pt-4"> 
          <img classNAme="" src="https://i1.wp.com/metro.co.uk/wp-content/uploads/2017/01/ezgif-com-crop-33.gif?quality=90&strip=all&zoom=1&resize=540%2C341&ssl=1"/>
          </div>
          </Link>
      </div>
      </div>
      </>
    );
  }

  Custom404.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
  }