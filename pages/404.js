import Layout from "@/components/Layout"
export default function Custom404() {
  
    return (
      <>
        error 404
      </>
    );
  }

  Custom404.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
  }