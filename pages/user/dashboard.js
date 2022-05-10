import { data } from "autoprefixer";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
// import { FaCalendar } from "react-icons/fa";


const View = () => {
    const [userInfo, setUserInfo] = useState({})
    const [slotData, setSlotData] = useState([])
    const [showSlots, setShowSlots] = useState(false)
    const [slotDate, setSlotDate] = useState({
        checkDate : ''
    })

    const clear=()=>{
        setSlotDate({...slotDate,date:''})
    }
    useEffect(() => {
        getAllData()
        clear()
        // getSlotData()
    }, [])

    const getAllData = () => {
        const id = JSON.parse(localStorage.getItem('userId'));
        let url = 'http://localhost:5001/user/' + id;

        // console.log(url);
        axios.get(url)
            .then((response) => {
                // console.log(response);
                setUserInfo(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    // console.log(slotDate);
    const getSlotData = () => {
        const date = moment(slotDate).format('DD-MM-YYYY');
        console.log(date);
        
        // let url = 'http://localhost:5001/slot/find/'+date;

        // console.log(url);
        // axios.get(url)
        //     .then((response) => {
        //         console.log(response);
        //         clear()
        //         // setUserInfo(response.data.data);
        //         setSlotData(response.data.data[0]);
        //         setShowSlots(true)
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     })
    }
    return (
        <div className="flex flex-col w-[75vw] h-[90vh] ">
            <div className=" ">
                Welcome {userInfo.name}
            </div>
            <div className="">
                Book Your Vaccination Slot .!!!
            </div>
            <div className="">
                Choose A Date :
                <input 
                    type="date" 
                    className=" mx-3 rounded-md bg-transparent text-sm font-mono ring-2 ring-slate-800 " 
                    value={slotDate.checkDate}
                    onChange={(e)=> setSlotDate({...slotDate, checkDate: e.target.value})}
                    />
            </div>
            <div className="">
                <button onClick={()=> getSlotData()}>Show Available Slots</button>
                <div className={showSlots ? '':'hidden'}>
                    {/* {slotData.user} */}
                </div>
            </div>
        </div>
    );
}

export default View;