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
    const onDefault = ()=>{
        router.push()
    }

    return (
        <div class=" w-[14rem] min-h-screen shadow-lg bg-white">
            <div class="p-4 flex top-7 w-full h-28 items-center justify-center">
                    <div class="flex w-full h-20 items-center justify-center">
                            <p class="text-sm font-semibold text-gray-800">LOGO</p>
                        </div>
            </div>
            <ul class="relative px-1">
                <li class="relative">
                    <button onClick={()=> userType[2]==='dashboard'? router.reload():router.back()} class="flex items-center w-full justify-center text-lg h-12 overflow-hidden text-gray-800 text-ellipsis whitespace-nowrap rounded font-bold">
                        <FaUserCircle width={30} className="mr-2"/>{userType[1] === 'admin'?'ADMIN':'USER'}  
                    </button>
                </li>  
            </ul>
            <hr class="my-2"/>
                <ul class="relative p-2">

                    <Link class="relative" href={userType[1]==='admin'?'/admin/vaccineDetails':'/user/slotDetails'}>
                        <button class="flex w-full justify-items-start items-center text-md p-2 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:font-bold hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer" >
                            <FaCalendarAlt  size={15} className="mr-2"/>
                            <span>{userType[1] === 'admin'?'Slot Management':'Slot Details'}</span>
                        </button>
                    </Link>
                    <li class="relative">
                        <button onClick={()=> dropTwo? setDropTwo(false): setDropTwo(true)} class="flex items-center justify-items-start w-full text-md p-2 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:font-bold hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer" >
                            <FaWrench size={15} className="mr-2"/>
                            <span>Settings</span>
                        </button>
                        <ul class={dropTwo ? 'relative':'hidden relative'}>
                            <li class="relative">
                                <button onClick={()=>profileClick()} class="flex w-full items-center text-xs py-4 pl-8 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:font-bold hover:bg-blue-50 transition duration-300 ease-in-out">
                                <FaUserCircle width={15} className="mr-2"/>Profile</button>
                            </li>
                            <li class="relative">
                                <button onClick={()=>onLogout()} class="flex w-full items-center text-xs py-4 pl-8 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:font-bold hover:bg-blue-50 transition duration-300 ease-in-out">
                                <RiLogoutCircleFill width={15} className="mr-2"/>Logout</button>
                            </li>
                        </ul>
                    </li>
                </ul>
        </div>
    );
}

export default Sidebar;