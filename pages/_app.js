import Sidebar from '../components/SideBar'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }) => {

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  }

  return (
    <>
      <div className='flex flex-auto bg-[#fcfcfc] h-screen'>
        <div className=' fixed '>
          <Sidebar />
        </div>
        <div className='p-3 mx-16 sm:mx-52   md:mx-60'>
          <Component {...pageProps} />

        </div>
      </div>

    </>
  )
}

export default MyApp
