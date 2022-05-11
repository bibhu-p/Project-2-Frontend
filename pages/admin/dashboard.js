import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {

    const [usersInfo, setUsersInfo] = useState([])

    useEffect(() => {
        // setLoading(true);
        getAllData()
    }, [])

    const getAllData = async () => {

        let url = 'http://localhost:5001/user/find';
        await axios.get(url)
            .then(res => {
                // console.log(res);
                setUsersInfo(res.data.data);
                // setLoading(false )
            })
            .catch(err => {
                console.log(err);
            })
    }

    return ( 
        <div className="flex  flex-col justify-start h-[100vh] w-[75vw]">
            <div className=" bg-white rounded-lg p-4 w-[100%] h-fit  m-4  shadow-md">
                <div className="border-b pb-2 h-2 flex flex-row justify-between">
                </div>
                    <div className="grid grid-cols-1 h-8 gap-2 mb-4">
                        <div className="rounded col-span-1 my-4">
                            <div className="mb-2 text-center text-4xl font-mono">Welcome</div>
                            
                        </div>
                    </div>
                    <div className="border-b mb-2 h-4 flex flex-row justify-between">
                </div>
            </div>
            <div className=" bg-white rounded-lg p-4 w-[18rem]  m-4 mt-10 shadow-md">
                <div className="border-b pb-2 flex flex-row justify-between">
                    <span className="text-xl">Users Info</span>
                </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="rounded col-span-1 my-4">
                            <div className="mb-2">No of Users : {usersInfo.length}</div>
                        </div>
                    </div>
            </div>
        
        </div>
     );
}
 
export default AdminDashboard;