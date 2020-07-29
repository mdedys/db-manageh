import Head from "next/head"

import DatabaseProvider from "../client/contexts/database"
import "../styles/globals.css"

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DatabaseProvider>
        <Component {...pageProps} />
      </DatabaseProvider>
    </>
  )
}

export default App
