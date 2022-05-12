import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import SlotModal from "../../components/SlotModal";
// import { FaCalendar } from "react-icons/fa";


const View = () => {
    const [userInfo, setUserInfo] = useState({})
    const [slotData, setSlotData] = useState([])
    const [showSlots, setShowSlots] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [showBookedMsg, setShowBookedMsg] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [confirmModal, setConfirmModal] = useState(false)
    const [slotDate, setSlotDate] = useState('')
    const [datedSlot, setDatedSlot] = useState([])
    const [message, setMessage] = useState('')
    const maxSlot = 5;
    const clear = () => {
        setSlotDate('')
    }
    useEffect(() => {
        getAllData()
        clear()
        // getSlotData()
    }, [])

    const getAllData = () => {
        const id = JSON.parse(localStorage.getItem('userId'));
        let url = 'http://localhost:5001/user/' + id;

        axios.get(url)
            .then((response) => {
                setUserInfo(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const getSlotData = async () => {
        const date = moment(slotDate).format('DD-MM-YYYY');
        // console.log(date);
        // let fUrl = 'http://localhost:5001/slot/find/' + cDate;
        // const isDateExists = await axios.get(fUrl);

        let url = 'http://localhost:5001/slot/find/' + date;
        await axios.get(url)
            .then((response) => {
                // console.log(response);
                // console.log(response.data);
                setSlotData(response.data.data);
                setDatedSlot(response.data.data[0].user)
                setShowSlots(true)
                // console.log(slotData);
            })
            .catch((error) => {
                console.log(error);
                clear()
            })
    }
    const hideSlots = () => {
        setShowSlots(false)
        clear()
        setButtonDisabled(false)
        setShowMessage(false)
        setShowBookedMsg(false)
        setMessage('')
    }
    const bookSlot = async (id) => {
        const cDate = moment(slotDate).format('DD-MM-YYYY');
        let fUrl = 'http://localhost:5001/slot/find/' + cDate;
        let sUrl = 'http://localhost:5001/slot/search/' + id;

        const isDateExists = await axios.get(fUrl);
        if (isDateExists.data.length === 0) {

            let url = 'http://localhost:5001/slot/create';
            const body = {
                date: cDate,
                user: { userId: id, status: true }
            }
            await axios.post(url, body).then(res => {
                console.log(res);
                setShowMessage(true)
                getSlotData()
                setButtonDisabled(true)
                setConfirmModal(false)
            }).catch(err => {
                console.log(err);
            })
        } else {
            const isUserBooked = await axios.get(sUrl)
            if (isUserBooked.status === 200) {
                setConfirmModal(false)
                const sDate = isUserBooked.data.data.date;
                const dateObj = new Date();
                const pDate = moment(dateObj).format('DD-MM-YYYY');
                if (pDate < sDate) {
                    setMessage('Slot Date has not reached yet..!')
                    setShowBookedMsg(true)
                } else if (pDate === sDate) {
                    setMessage('Today is your slot date')
                    setShowBookedMsg(true)
                } else {
                    setMessage('Already Vaccinated')
                    setShowBookedMsg(true)
                }
            } else {
                let url = 'http://localhost:5001/slot/book/' + cDate;
                const body = {
                    user: { userId: id, status: true }
                }
                await axios.put(url, body).then(res => {
                    console.log(res);
                    setConfirmModal(false)
                    setShowMessage(true)
                    setButtonDisabled(true)

                }).catch(err => {
                    console.log(err);
                })
            }

        }
        
    };
    
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
                    value={slotDate}
                    onChange={(e) => setSlotDate(e.target.value)}
                />
            </div>
            <div className="flex gap-5 mt-5 p-3">
                <button className="bg-gray-800 w-[6rem] ring-1 ring-gray-800 h-8 text-white text-sm rounded-md hover:bg-gray-600 hover:ring-0  transition ease-in-out hover:duration-300" onClick={() => getSlotData()}>Show Slots</button>
                <button className="bg-gray-800 w-[6rem] ring-1 ring-gray-800 h-8 text-white text-sm rounded-md hover:bg-gray-600 hover:ring-0  transition ease-in-out hover:duration-300" onClick={() => hideSlots()}>Clear</button>
            </div>
            <div className={showSlots ? '' : 'hidden'}>
                <h1>No of Slots : 5</h1>
                <h1>Available Slots : {slotData && slotData.length != 0 ? maxSlot - datedSlot.length : maxSlot} </h1>
                {/* <h1>No of Available Slots : {maxSlot - datedSlot.length}  </h1>  */}

                <button disabled={buttonDisabled}
                    className='bg-gray-800 w-[6rem] mt-4 ring-1 ring-gray-800 h-10 text-white rounded-md disabled:cursor-not-allowed hover:bg-gray-700 hover:ring-0 flex justify-center items-center font-semibold transition ease-in-out hover:duration-300'
                    onClick={() => setConfirmModal(true) }>
                    Book Slot
                </button>

            </div>
            {showMessage &&
                <h1 className=" font-medium p-2 mt-4 m-2">Success</h1>
            }
            {showBookedMsg &&
                <h2 className="mt-1 m-3 p-1 text-base">{message}</h2>
            }
            { confirmModal && 
                <SlotModal 
                    userInfo = {userInfo}
                    bookSlot = {bookSlot}
                    setConfirmModal={setConfirmModal}
                />
            }
        </div>
    );
}

export default View;