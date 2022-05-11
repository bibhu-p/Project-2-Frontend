import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const VaccineDetails = () => {

    const [checkDate, setCheckDate] = useState('')
    const [singleSlot, setSingleSlot] = useState({})
    const [showSlotsData, setShowSlotsData] = useState(false)
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
        if(exist.status === 200){
            setSingleSlot(exist.data.data)
            setShowSlotsData(true)
        }
    }

    return ( 
        <>
            <div className=" w-[75vw] h-[80vh] ">
                <div className=" mt-8">
                    <span> Choose a Date :</span>
                    <input className="  mx-6 w-[12rem] p-2 h-6 ring-1 ring-slate-800" type="date"
                    value={checkDate}
                    onChange={(e) => setCheckDate(e.target.value)} />
                </div>
                <div className=" flex mt-5 gap-4"> 
                <button 
                    className="bg-gray-800 w-[6rem] ring-1 ring-gray-800 h-8 text-white text-sm rounded-md hover:bg-gray-600 hover:ring-0  transition ease-in-out hover:duration-300" 
                    onClick={() => getSlotData()}>
                    Show Slots
                </button>
                <button className="bg-gray-800 w-[6rem] ring-1 ring-gray-800 h-8 text-white text-sm rounded-md hover:bg-gray-600 hover:ring-0  transition ease-in-out hover:duration-300" onClick={() => hideSlots()}>Clear</button>

                </div>
                <div className="mt-5">
                    <div className={showSlotsData ? '' : 'hidden'}>
                        <h1>Date: {singleSlot.length !=0 && singleSlot.date} </h1>
                        <h1>Max Slots : 5</h1>
                        {/* {singleSlot.length !=0 && singleSlot.user.map(data =>
                            <li>ID : {data}</li>
                        )} */}
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default VaccineDetails;