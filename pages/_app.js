import '../static/globals.css'
import TopLayout from '../src/components/TopLayout'
import { ReactNotifications } from 'react-notifications-component'
function MyApp({ Component, pageProps }) {
  return (
      <TopLayout >
                   <ReactNotifications />
        <Component {...pageProps} />
      </TopLayout>
   
  )
}

export default MyApp
