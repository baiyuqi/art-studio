import '../static/globals.css'
import Layout from '../src/components/layout'

function MyApp({ Component, pageProps }) {
  return (
      <Layout >
        <Component {...pageProps} />
      </Layout>
   
  )
}

export default MyApp
