import { useEffect, useState } from "react";

const HostelView1 = ({ floor, roomsDetails, newSelectedRoom, changeSelectedRoom }) => {

    const [roomDetails, setRoomDetails] = useState({
        lw_os: [],
        lw_is: [],

        rw_os: [],
        rw_is: [],
    });


    useEffect(() => {
        ////console.log(roomsDetails);

        const updateRoomDetails = (type, rooms) => {
            const updatedRooms = rooms.map(room => (
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
            ));
            setRoomDetails(prevDetails => ({ ...prevDetails, [type]: updatedRooms }));
        };

        if (roomsDetails) {
            if (roomsDetails.lw_os) updateRoomDetails('lw_os', roomsDetails.lw_os);
            if (roomsDetails.lw_is) updateRoomDetails('lw_is', roomsDetails.lw_is);

            if (roomsDetails.rw_os) updateRoomDetails('rw_os', roomsDetails.rw_os);
            if (roomsDetails.rw_is) updateRoomDetails('rw_is', roomsDetails.rw_is);
        }
    }, [newSelectedRoom, roomsDetails, changeSelectedRoom]);

    return (<>


        <div className="bg-green-800 w-[98%] ml-auto mr-auto rounded-xl pt-6 pb-6 mb-5 mt-5 overflow-scroll">
            <div className="flex  justify-end  w-[90%] h-64  rounded-xl bg-zinc-500 flex-col mt-5 mb-5 ml-auto mr-auto truncate">
                <div className="w-[40%] mb-2 ml-auto mr-auto bg-gray-700 text-center text-zinc-50 font-semibold h-11 flex justify-center items-center rounded-xl text-2xl" > {floor}</div>
                <div className=" w-full    bg-zinc-50  font-bold flex justify-around items-center   h-[15%] border-x  border-black" >
                    <h1>  Left Wing</h1>   <h1>  </h1>  <h1>  Right Wing</h1>
                </div>

                <div className="  flex w-full items-center  bg-zinc-50 border border-black h-[30%]  justify-around">

                    <div className=" flex  justify-around items-center w-[48%] h-14    rounded-xl bg-slate-400">
                        {/* {bh_3_gf_lw_tp_hf} */}
                        {roomDetails.lw_is}
                    </div>
                    <div className=" flex  justify-around items-center w-[48%] h-14    rounded-xl bg-slate-400">
                        {/* {bh_3_gf_rw_tp_hf} */}
                        {roomDetails.rw_is}
                    </div>

                </div>

                <div className=" w-full    bg-zinc-50 border border-black font-bold flex justify-around items-center   h-[15%]">
                    <h1>  Corridor</h1>    <h1>  Corridor</h1><h1>  Corridor</h1>
                </div>


                <div className="  flex w-full items-center  bg-zinc-50 border border-black h-[30%]  justify-around">

                    <div className=" flex  justify-around items-center w-[48%] h-14    rounded-xl bg-slate-400">
                        {/* {bh_3_gf_lw_tp_hf} */}
                        {roomDetails.lw_os}
                    </div>
                    <div className=" flex  justify-around items-center w-[48%] h-14    rounded-xl bg-slate-400">
                        {/* {bh_3_gf_rw_tp_hf} */}
                        {roomDetails.rw_os}
                    </div>

                </div>
            </div>
        </div>
    </>



    )
}

export default HostelView1;