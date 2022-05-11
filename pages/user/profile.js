import { BiEditAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../../components/Modal";

const Profile = () => {
    const [userInfo, setUserInfo] = useState({})
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [action, setAction] = useState('edit')

    useEffect(() => {
        setLoading(true);
        getAllData()
    }, [])

    const getAllData = () => {
        const id = JSON.parse(localStorage.getItem('userId'));
        let url = 'http://localhost:5001/user/' + id;

        axios.get(url)
            .then((response) => {
                setUserInfo(response.data.data);
                setLoading(false )
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (

    <>
    {loading ? 
            <div className = "flex justify-center items-baseline  h-[90vh] w-[75vw]">
                <div className = "bg-white rounded-lg p-4 w-[70%] mt-10 shadow-md" >
                    <div className="mb-4 flex flex-row justify-between">
                        <span className=" w-16 h-4 bg-gray-200 animate-pulse"></span>
                        <button className="w-6 h-6 bg-gray-200 animate-pulse "></button>
                    </div>
                    <div className="border-t">
                        <div class="grid grid-cols-3 gap-2">
                            <div class="rounded col-span-1 my-4">
                                <div className="mb-2 w-36 h-4 bg-gray-200 animate-pulse"></div>
                                <div className=" w-32 h-4 bg-gray-200 animate-pulse"></div>
                            </div>
                            <div class="rounded col-span-1 my-4">
                                <div className="mb-2 w-14 h-4 bg-gray-200 animate-pulse"></div>
                                <div className=" w-32 h-4 bg-gray-200 animate-pulse"></div>
                            </div>
                            <div class="rounded col-span-1 my-4">
                                <div className="mb-2 w-32 h-4 bg-gray-200 animate-pulse"></div>
                                <div className=" w-28 h-4 bg-gray-200 animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        :
            <div className="flex justify-center items-baseline  h-[90vh] w-[75vw] ">
                <div className=" bg-white rounded-lg p-4 w-[70%] mt-10 shadow-md">
                    <div className="border-b pb-2 flex flex-row justify-between">
                        <span className="text-xl"> Profile</span>
                        <button onClick={() => setShowModal(true)} ><BiEditAlt size={25} /></button>

                    </div>
                    <div className="">
                        <div className="grid grid-cols-3 gap-2">
                            <div className="rounded col-span-1 my-4">
                                <div className="mb-2">Name : {userInfo.name} </div>
                                <div>Email : {userInfo.email}  </div>
                            </div>
                            <div className="rounded col-span-1 my-4">
                                <div className="mb-2">Age :{userInfo.age} </div>
                                <div>Adhaar :{userInfo.adhaar} </div>
                            </div>
                            <div className="rounded col-span-1 my-4">
                                <div className="mb-2">Phone No :{userInfo.phone} </div>
                                <div>Address :{userInfo.address} </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        {showModal ? 
        <Modal
            setShowModal={setShowModal}
            userInfo={userInfo}
            action={action}
            getAllData={getAllData}/>
        : null}
    </>
    );
}

export default Profile;