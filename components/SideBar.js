import { FaUserCircle, FaUsersCog, FaCalendarAlt, FaWrench, FaEye } from "react-icons/fa";

const Sidebar = () => {
    return (
        <div class=" w-fit top-0 left-0 sticky min-h-screen shadow-lg bg-white">
            <div class="p-4 flex top-7 w-full h-28 items-center justify-center">
                    <div class="flex w-full h-20 items-center justify-center">
                            <p class="text-sm font-semibold text-gray-800">LOGO</p>
                        </div>
            </div>
            <ul class="relative px-1">
                <li class="relative">
                    <button class="flex items-center w-full justify-center text-lg h-12 overflow-hidden text-gray-800 text-ellipsis whitespace-nowrap rounded hover:font-bold  hover:bg-blue-50 transition duration-300 ease-in-out">
                        <FaUserCircle width={30} className="mr-2"/>ADMIN  
                    </button>
                </li>
                
            </ul>
            <hr class="my-2"/>
                <ul class="relative p-2">
                    <li class="relative">
                        <button class="flex w-40 justify-center items-center text-sm p-2 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:font-bold hover:bg-blue-50 transition duration-300 ease-in-out">
                            <FaUsersCog size={15} className="mr-2"/>
                            <span>User Management</span>
                        </button>
                    </li>
                    <li class="relative">
                        <button class="flex w-full justify-center items-center text-sm p-2 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:font-bold hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer" >
                            <FaCalendarAlt  size={15} className="mr-2"/>
                            <span>Slot Management</span>
                            
                        </button>
                        <ul class="relative">
                            <li class="relative">
                                <button class="flex w-full items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:font-bold hover:bg-blue-50 transition duration-300 ease-in-out"><FaEye className="mr-2"/>View Slots</button>
                            </li>
                            <li class="relative">
                                <button class="flex w-full items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:font-bold hover:bg-blue-50 transition duration-300 ease-in-out">Manage Slots</button>
                            </li>
                        </ul>
                    </li>
                    <li class="relative">
                        <a class="flex items-center justify-center w-full text-sm p-2 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:font-bold hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer" >
                            <FaWrench size={15} className="mr-2"/>
                            <span>Settings</span>
                        </a>
                        <ul class="relative">
                            <li class="relative">
                                <button  class="flex w-full items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:font-bold hover:bg-blue-50 transition duration-300 ease-in-out">Link 7</button>
                            </li>
                            <li class="relative">
                                <button class="flex w-full items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:font-bold hover:bg-blue-50 transition duration-300 ease-in-out">Link 8</button>
                            </li>
                        </ul>
                    </li>
                </ul>
        </div>
    );
}

export default Sidebar;