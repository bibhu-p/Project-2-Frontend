const AdminDashboard = () => {
    return ( 
        <div className="flex  justify-center items-baseline h-[100vh] w-[75vw]">
            <div className=" bg-white rounded-lg p-4 w-1/4  m-4 mt-10 shadow-md">
                <div className="border-b pb-2 flex flex-row justify-between">
                    <span className="text-xl"> Info</span>
                </div>
                    <div className="grid grid-cols-1 h-16 gap-2">
                        <div className="rounded col-span-1 my-4">
                            <div className="mb-2">Name :  </div>
                            <div className="mb-2">Email : </div>
                        </div>
                    </div>
            </div>
            <div className=" bg-white rounded-lg p-4 w-1/4  m-4 mt-10 shadow-md">
                <div className="border-b pb-2 flex flex-row justify-between">
                    <span className="text-xl"> Users Info</span>
                </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="rounded col-span-1 my-4">
                            <div className="mb-2">No of Users : </div>
                        </div>
                    </div>
            </div>
            <div className=" bg-white rounded-lg p-4 w-1/4  m-4 mt-10 shadow-md">
                <div className="border-b pb-2 flex flex-row justify-between">
                    <span className="text-xl"> Vaccine Info</span>
                </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="rounded col-span-1 my-4">
                            <div className="mb-2">No of  :  </div>
                        </div>
                    </div>
            </div>
        </div>
     );
}
 
export default AdminDashboard;