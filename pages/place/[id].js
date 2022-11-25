import Link from "next/link"
import { FiMapPin } from "react-icons/fi";
import { FiThumbsUp } from "react-icons/fi";
import Sidebar from '@/components/Sidebar';
import Layout from "@/components/Layout";
export default function sitio({ name, descp, mapsUrl, photoUrl, publisherId }) {
    return (
        <>

            <div class=" bg-gradient-to-r from-sky-500 to-indigo-500 w-full h-screen w-screen overflow-y-scroll" >
                <Sidebar />
                <div className="fill text-black  bg-white-500 w-screen h-100 rounded-2xl border-2 border-transparent align-baseline"></div>
                <div className=" mb-30  ml-70 text-black mx-auto my-40 mt-20 bg-white-500 w-2/3 h-full rounded-2xl border-2 border-white-600">
                    <h1>
                        {name}
                    </h1>
                </div>

            </div>

        </>
    )
}

export async function getServerSideProps(req) {
    const { id } = req.params
    const { name, descp, mapsUrl, photoUrl, publisherId } = await fetch("http://localhost:3000/api/places/" + id).then(res => res.json())

    return {
        props: { name, descp, mapsUrl, photoUrl, publisherId }// will be passed to the page component as props
    }
}

sitio.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}