import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SideBar from './components/SideBar';


function MyApp({ Component, pageProps }) {
  return <div>
    
    <SideBar />
    <div style={{ textAlign: 'center', paddingTop: '5pt', paddingBottom: '5pt', backgroundColor: '#53bab9', color: 'white' }}>
      USE COUPON {">"} TO GET EXTRA 20% DISCOUNT
    </div>
    <div className='sticky-top'>
      <Navbar />
    </div>
    <Component {...pageProps} />
    <Footer />
  </div>
}

export default MyApp
