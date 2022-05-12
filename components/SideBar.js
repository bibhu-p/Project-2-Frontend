import { FaUserCircle, FaUsersCog, FaCalendarAlt, FaWrench, FaEye, FaEdit } from "react-icons/fa";
import { RiLogoutCircleFill } from "react-icons/ri";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
const Sidebar = () => {

    const router = useRouter()
    const [dropZero, setDropZero] = useState(false)
    const [dropOne, setDropOne] = useState(false)
    const [dropTwo, setDropTwo] = useState(false)

    const userType = router.route.split('/');
    // console.log(userType[2]);
    const onLogout = ()=>{
        localStorage.clear()
        router.push('/')
    }
    const profileClick = ()=>{
        if(userType[1] === 'admin'){
            router.push('/admin/profile')
        }else{
          router.push('/user/profile')
        }
    }
    

    return (
        <div className=" w-[4rem] sm:w-[14rem] min-h-screen shadow-lg bg-white">
            <div className="p-2 sm:p-4 flex top-7 w-full h-20 sm:h-32 items-center justify-center">
                    <div className="flex w-full h-20 items-center justify-center">
                            <img className="w-22 h-10 sm:w-42 sm:h-20 " src="https://coronavirus.dc.gov/sites/default/files/dc/sites/coronavirus/shot.png" alt=""/>
                        </div>
            </div>
            <ul className="relative px-1">
                <li className="relative">
                    <button onClick={()=> userType[1]==='admin'? router.push('/admin/dashboard'):router.push('/user/dashboard')} className="flex items-center w-full justify-center text-lg h-12 overflow-hidden text-gray-800 text-ellipsis whitespace-nowrap rounded font-bold">
                        <FaUserCircle size={30} className="mr-2"/><span className="hidden sm:block">{userType[1] === 'admin'?'ADMIN':'USER'}</span>
                    </button>
                </li>  
            </ul>
            <hr className="my-2"/>
                <ul className="relative p-2">

                    <Link className="relative" href={userType[1]==='admin'?'/admin/vaccineDetails':'/user/slotDetails'}>
                        <button className="flex w-full justify-items-start items-center text-md p-2 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:font-bold hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer" >
                            <FaCalendarAlt  size={15} className="mr-2"/>
                            <span className="hidden sm:block">{userType[1] === 'admin'?'Slot Management':'Slot Details'}</span>
                        </button>
                    </Link>
                    <li className="relative">
                        <button onClick={()=> dropTwo? setDropTwo(false): setDropTwo(true)} className="flex items-center  sm:justify-items-start w-full text-md p-2 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:font-bold hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer" >
                            <FaWrench size={15} className="mr-2"/>
                            <span className="hidden sm:block">Settings</span>
                        </button>
                        <ul className={dropTwo ? 'relative':'hidden relative'}>
                            <li className="relative">
                                <button onClick={()=>profileClick()} className="flex w-full items-center text-xs py-1 sm:py-4 pl-0 ml-2 sm:ml-0 sm:pl-8 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:font-bold hover:bg-blue-50 transition duration-300 ease-in-out">
                                <FaUserCircle size={18} className="mr-2"/><span className="hidden sm:block">Profile</span></button>
                            </li>
                            <li className="relative">
                                <button onClick={()=>onLogout()} className="flex w-full items-center text-xs py-1 sm:py-4 pl-0 ml-2 sm:ml-0 sm:pl-8 pr-6 h-8 sm:h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:font-bold hover:bg-blue-50 transition duration-300 ease-in-out">
                                <RiLogoutCircleFill size={20} className="mr-2"/><span className="hidden sm:block">Logout</span></button>
                            </li>
                        </ul>
                    </li>
                </ul>
        </div>
    );
}

export default Sidebar;