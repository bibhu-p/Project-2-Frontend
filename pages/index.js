import Login from "../components/Login";

export default function Home() {
  return (
<Login/>    
  )
}
Home.getLayout = function PageLayout(page) {
  return (
    <>
      {page}
    </>
  )
}