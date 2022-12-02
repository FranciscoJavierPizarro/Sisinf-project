import Head from "next/head"

export default function Meta({ title }) {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Social network for turistss"/>
      <meta name="keywords" content="Social Network, Turism, Turilist" />
      <meta property="og:title" content="Turilist"/>
      <meta property="og:description" content="Una red social de turismo para compartir sitios"/>
      <meta property="og:url" content="https://turilist.vercel.app"/>
      <meta property="og:type" content="website"/>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

Meta.defaultProps = {
  title: "Turilist",
}