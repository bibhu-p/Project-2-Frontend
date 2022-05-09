import Sidebar from '../components/SideBar'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }) => {

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  }

  return (
    <>
      <div className='flex flex-auto'>
        <Sidebar />
        <div className='p-2'>
          <Component {...pageProps} />

        </div>
      </div>

    </>
  )
}

export default MyApp
