import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { MdChangeCircle } from "react-icons/md";
const VaccineDetails = () => {

    const [checkDate, setCheckDate] = useState('')
    const [singleSlot, setSingleSlot] = useState({})
    const [showSlotsData, setShowSlotsData] = useState(false)
    const [slotUsers, setSlotUsers] = useState([])
    const clear = () => {
        setCheckDate('')
    }
    const hideSlots = () => {
        setShowSlotsData(false)
        clear()
        // setShowMessage(false)
        // setShowBookedMsg(false)
    }
    const getSlotData = async () => {
        const date = moment(checkDate).format('DD-MM-YYYY');
        // console.log(date);

        let url = 'http://localhost:5001/slot/find/' + date;
        const exist = await axios.get(url);
        // console.log(exist.data.data[0].user[0]);
        setSlotUsers(exist.data.data[0].user);
        if (exist.status === 200) {
            setSingleSlot(exist.data.data[0])
            setShowSlotsData(true)
        }
    }

    const onChange = async(id , status) => {
         let url = 'http://localhost:5001/slot/status/'+id;
         if(status){
            var body = {
                status : false
            }
         }else{
            var body = {
                status : true
            }
         }
         const updateData = await axios.put(url,body)
        //  console.log(updateData.status);
         getSlotData()
    };

    return (
        <>
            <div className=" ml-2 sm:ml-8 w-[75vw] h-[80vh] ">
                <div className="flex mt-8 rounded-md items-center justify-center shadow-md h-16 p-2 w-[20rem] sm:w-[28rem] ">
                    <span className=" text-sm sm:text-md"> Choose a Date :</span>
                    <input className="  mx-6 w-[12rem] p-2 h-6 ring-1 ring-slate-800" type="date"
                        value={checkDate}
                        onChange={(e) => setCheckDate(e.target.value)} />
                </div>
                <div className=" bg-white rounded-lg p-4 w-fit mt-10 shadow-md">
                    <div className=" flex mt-2 gap-4">
                        <button
                            className="bg-gray-800 w-[6rem] ring-1 ring-gray-800 h-8 text-white text-sm rounded-md hover:bg-gray-600 hover:ring-0  transition ease-in-out hover:duration-300"
                            onClick={() => getSlotData()}>
                            Show Details
                        </button>
                        <button className="bg-gray-800 w-[6rem] ring-1 ring-gray-800 h-8 text-white text-sm rounded-md hover:bg-gray-600 hover:ring-0  transition ease-in-out hover:duration-300" onClick={() => hideSlots()}>Clear</button>

                    </div>
                </div>
                <div className="mt-5">
                    <div className={showSlotsData ? '' : 'hidden'}>
                        <h1>Date: {singleSlot.length != 0 && singleSlot.date} </h1>
                        <h1>Max Slots : 5</h1>
                        {/* <h1>Booked Slot : {singleSlot.user.length}</h1> */}
                        <h1>User List</h1>

                        <div className="flex flex-col mt-4">
                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="overflow-hidden rounded-md">
                                        <table className="min-w-full ">
                                            <thead className="border-b bg-white">
                                                <tr>
                                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    SL.NO 
                                                    </th>
                                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    NAME
                                                    </th>
                                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    E-MAIL  
                                                    </th>
                                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    AGE  
                                                    </th>
                                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    PHONE  
                                                    </th>
                                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    STATUS  
                                                    </th>
                                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    ACTION  
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {singleSlot.length !=0 && slotUsers.map((data, i) =>
                                                <tr key={i} className="bg-white border-b">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {i + 1}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {data.userId.name}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {data.userId.email}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {data.userId.age}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {data.userId.phone}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {data.status ? 'Booked':'Cancelled'}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    <button onClick={()=> onChange(data.userId._id, data.status)}><MdChangeCircle size={25} /></button>
                                                    </td>
                                                </tr>
                                            )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </>
    );
}

export default VaccineDetails;