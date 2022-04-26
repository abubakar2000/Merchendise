import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';

function MyApp({ Component, pageProps }) {
  return <>
    <div className='sticky-top'>
    <Navbar />
    </div>
    <Component {...pageProps} />
  </>
}

export default MyApp
