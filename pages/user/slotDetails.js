import { useEffect, useState } from "react";
import axios from "axios";

const SlotDetails = () => {
    const [slotData, setSlotData] = useState({})
    const [loading, setLoading] = useState(true)
    const [slotDate, setSlotDate] = useState('')

    useEffect(() => {
        setLoading(true)
        getSlotData()
    }, [])

    const getSlotData = async () => {
        // const date = moment(slotDate).format('DD-MM-YYYY');
        // console.log(date);
        const id = JSON.parse(localStorage.getItem('userId'));

        let url = 'http://localhost:5001/slot/search/' + id;
        // console.log(url);
        await axios.get(url)
            .then((response) => {
                // console.log(response);
                setLoading(false)
                setSlotData(response.data.data.user.filter(ele => ele.userId === id)[0]);
                setSlotDate(response.data.data.date);
                // setShowSlots(true)
                // console.log(slotData);
            })
            .catch((error) => {
                console.log(error);
                clear()
            })
    }

    return ( 
        <>
        {loading
        ?
        <div className=" flex justify-center items-center">
            <div className=" bg-white rounded-lg p-4 w-[20rem]  m-4 mt-10 shadow-xl">
                <div className="border-b pb-2 flex flex-row">
                    <span className="w-28 h-6 bg-gray-200 animate-pulse"> </span>
                </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="rounded col-span-1 my-4">
                            <div className="w-40 h-4 bg-gray-200 animate-pulse"></div>
                        </div>
                    </div>
            </div>
        </div>
        :
        <div className=" flex justify-center items-center">
            <div className=" bg-white rounded-lg p-4 w-[20rem]  m-4 mt-10 shadow-xl">
                <div className="border-b pb-2 flex flex-row">
                    <span className="text-xl"> Vaccine Slot Info</span>
                </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="rounded col-span-1 my-4">
                            <div className="mb-2">Date  : {slotDate} </div>
                            <div className="mb-2">Status  : {slotData && slotData.length != 0 ?slotData.status ? 'Booked':'Cancelled':''} </div>
                        </div>
                    </div>
            </div>
        </div>
        }
        </>
     );
}
 
export default SlotDetails;