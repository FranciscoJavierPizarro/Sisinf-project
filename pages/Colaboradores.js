import Layout from '../components/Layout'
import Sidebar from '@/components/Sidebar';

export default function Colaboradores() {
    return (
        <>
            <div className='w-full'>
                <div class="grid justify-items-center">
                <Sidebar/>
                    Gracias a nuestros Colaboradores:
                </div>
                <div class="grid justify-items-center">. </div>
                <div class="grid justify-items-center">. </div>
                <div class="grid justify-items-center">. </div>
                <div class="grid justify-items-center">Muchas gracias  a todos (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧</div>
            </div>
        </>
    )

}
Colaboradores.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}