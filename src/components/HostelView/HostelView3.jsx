import { useEffect, useState } from "react";
const HostelView3 = ({ floor,hname, roomsDetails, newSelectedRoom, changeSelectedRoom }) => {
    const [roomDetails, setRoomDetails] = useState({
        lw_os: [],
        lw_is: [],
        mw_os: [],
        mw_is: [],
        rw_os: [],
        rw_is: [],
    });

    useEffect(() => {
        //console.log('newSelectedRoom,rf,d,dc', newSelectedRoom);
        ////console.log('i am room details',newSelectedRoom)

        const updateRoomDetails = (type, rooms) => {
            ////console.log('i am room details', rooms)

            const updatedRooms = rooms.map(room => {
                // if (room.roomId === 'mbhA_635') {
                //    //console.log('room hun', room);
                // }
                return (
                    <div key={room.roomId}
                        className={`cursor-pointer border-1 border-black w-8 h-8 rounded-md text-white ${(!room.isAvailable)
                            ? ('bg-orange-950 cursor-not-allowed pointer-events-none')
                            : ((room.no_of_vacant === 0)
                                ? ('bg-red-500 cursor-not-allowed pointer-events-none')
                                : (room.roomId === newSelectedRoom
                                    ? 'bg-blue-500'
                                    : 'bg-green-500'))
                            } flex justify-center items-center`}
                        onClick={() => {
                            //console.log('kunal', !room.isAvailable);
                            changeSelectedRoom({
                                id: room.roomId,
                                no: room.room_No,
                            });
                        }}
                    >
                        {room.room_No}
                    </div>

                )
            });
            setRoomDetails(prevDetails => ({ ...prevDetails, [type]: updatedRooms }));
        };

        if (roomsDetails) {
            if (roomsDetails.lw_os) updateRoomDetails('lw_os', roomsDetails.lw_os);
            if (roomsDetails.lw_is) updateRoomDetails('lw_is', roomsDetails.lw_is);
            if (roomsDetails.mw_os) updateRoomDetails('mw_os', roomsDetails.mw_os);
            if (roomsDetails.mw_is) updateRoomDetails('mw_is', roomsDetails.mw_is);
            if (roomsDetails.rw_os) updateRoomDetails('rw_os', roomsDetails.rw_os);
            if (roomsDetails.rw_is) updateRoomDetails('rw_is', roomsDetails.rw_is);
        }
    }, [newSelectedRoom, roomsDetails, changeSelectedRoom]);





    return (<>

        <div className="md:w-[98%] flex flex-col justify-center items-center bg-green-800 ml-auto mr-auto mt-[10px] pb-2  rounded-t-2xl sticky  top-72 md:top-56 ">


            <div className="text-center w-[100%]   bg-gray-700 h-16 rounded-xl flex flex-col items-center justify-center font-bold text-zinc-50 text-2xl" > {hname} </div>
        </div>

        <div className="md:w-[98%] flex flex-col justify-center items-center bg-green-800 ml-auto mr-auto  rounded-b-2xl  overflow-scroll ">

            <div className="flex  flex-col justify-around items-start  w-[660px] h-[505px]  rounded-t-none rounded-b-xl m-auto bg-zinc-500  ">

                <div className="flex  justify-around items-start  w-[660px] h-[425px]  rounded-t-none rounded-b-xl m-auto bg-zinc-500 ">

                    <div className="flex flex-col mt-4 justify-around items-center w-[50px] h-[340px]  rounded-xl bg-zinc-50 ">
                        {/* lo */}

                        {roomDetails.lw_os}



                    </div>



                    <div className="flex  flex-col justify-between items-center w-[500px] h-[425px] rounded-t-none rounded-b-xl bg-yellow-50 ">



                        <div className="  flex  flex-col items-start w-[450px] h-[400px] bg-zinc-500  rounded-t-none rounded-b-xl  ">
                            <div className="  flex  fl items-start w-[450px] h-[340px] bg-zinc-500  rounded-t-none rounded-b-xl  ">

                                <div className="  flex flex-col ml-auto mt-4 justify-around items-center w-[50px] h-[300px] bg-zinc-50   rounded-xl  ">
                                    {roomDetails.lw_is}




                                </div>


                                <div className="  flex ml-auto justify-center items-start w-[290px] h-[320px] bg-green-800  rounded-t-none rounded-b-xl  ">

                                    <h1 className="mt-32 font-bold text-zinc-50 text-2xl">{floor}
                                    </h1>
                                </div>


                                <div className="  flex flex-col ml-auto mr-auto mt-4 justify-around items-center w-[50px] h-[300px] bg-zinc-50   rounded-xl  ">
                                    {/* ri */}
                                    {roomDetails.rw_is}



                                </div>
                            </div>


                            <div className="  flex   items-center w-[450px] h-[80px] bg-zinc-500  rounded-t-none rounded-b-xl  ">


                                <div className="  flex flex-col ml-auto  justify-center items-center w-[50px] h-[50px] bg-zinc-50   rounded-xl font-bold ">
                                    <h1> Lift /</h1>
                                    <h1> Stairs</h1>


                                </div>


                                <div className="  flex ml-auto justify-around items-center w-[290px] h-[50px] bg-zinc-50   rounded-xl  ">
                                    {/* mi */}

                                    {roomDetails.mw_is}



                                </div>
                                <div className="  flex flex-col  ml-auto  mr-auto justify-center items-center w-[50px] h-[50px] bg-zinc-50  rounded-xl  font-bold ">

                                    <h1> Lift /</h1>
                                    <h1> Stairs</h1>

                                </div>


                            </div>



                        </div>

                        <div className="  flex  flex-col items-center w-[450px] h-[40px]  rounded-t-none rounded-b-xl text-black font-bold">

                            Corridor

                        </div>





                    </div>

                    <div className="flex flex-col mt-4 justify-around items-center w-[50px] h-[340px]  rounded-xl bg-zinc-50 ">
                        {/* ro */}
                        {roomDetails.rw_os}



                    </div>



                </div>

                <div className="flex  justify-around items-center  w-[660px] h-[80px]  rounded-t-none rounded-b-xl m-auto bg-zinc-500">
                    <div className="flex flex-col  justify-center items-center w-[50px] h-[50px]  rounded-xl bg-zinc-50 font-bold text-wrap">

                        <h1>Bath</h1> <h1>room</h1>
                    </div>

                    <div className="flex   justify-around items-center w-[500px] h-[50px] rounded-xl bg-zinc-50 ">
                        {/* mo */}

                        {roomDetails.mw_os}






                    </div>

                    <div className="flex flex-col  justify-center items-center w-[50px] h-[50px]  rounded-xl bg-zinc-50 font-bold text-wrap">

                        <h1>Bath</h1> <h1>room</h1>
                    </div>

                </div>





            </div>


            <div className="text-center w-[50%]  mt-3 rounded-xl flex flex-col items-center justify-center font-bold text-zinc-50 text-2xl" > {floor == "Ground Floor" && ("Entry Gate")} </div>


        </div>




    </>



    )
}

export default HostelView3;