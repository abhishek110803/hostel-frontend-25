import { useEffect, useState } from "react";

const BH1view1 = ({ floor, roomsDetails, newSelectedRoom, changeSelectedRoom, extraThings }) => {

    const [roomDetails, setRoomDetails] = useState({

        lw_os_a: [],
        lw_os_b: [],
        lw_os_c: [],
        lw_is_a: [],
        lw_is_b: [],
        lw_is_c: [],

        rw_os_a: [],
        rw_os_b: [],
        rw_os_c: [],
        rw_is_a: [],
        rw_is_b: [],
        rw_is_c: [],
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
            if (roomsDetails.lw_os_a)updateRoomDetails('lw_os_a', roomsDetails.lw_os_a);
          
            if (roomsDetails.lw_os_b) updateRoomDetails('lw_os_b', roomsDetails.lw_os_b);
            if (roomsDetails.lw_os_c) updateRoomDetails('lw_os_c', roomsDetails.lw_os_c);

         
            if (roomsDetails.lw_is_a) updateRoomDetails('lw_is_a', roomsDetails.lw_is_a);
            if (roomsDetails.lw_is_b) updateRoomDetails('lw_is_b', roomsDetails.lw_is_b);
            if (roomsDetails.lw_is_c) updateRoomDetails('lw_is_c', roomsDetails.lw_is_c);

            if (roomsDetails.rw_os_a) updateRoomDetails('rw_os_a', roomsDetails.rw_os_a);
            if (roomsDetails.rw_os_b) updateRoomDetails('rw_os_b', roomsDetails.rw_os_b);
            if (roomsDetails.rw_os_c) updateRoomDetails('rw_os_c', roomsDetails.rw_os_c);
            if (roomsDetails.rw_is_a) updateRoomDetails('rw_is_a', roomsDetails.rw_is_a);
            if (roomsDetails.rw_is_b) updateRoomDetails('rw_is_b', roomsDetails.rw_is_b);
            if (roomsDetails.rw_is_c) updateRoomDetails('rw_is_c', roomsDetails.rw_is_c);
        }
    }, [newSelectedRoom, roomsDetails, changeSelectedRoom]);

    return (<>


        <div className="bg-green-800 w-[98%]  ml-auto mr-auto rounded-xl pt-6 pb-6 mb-5 mt-5 overflow-scroll">
            <div className=" font-bold flex  justify-end  w-[90%] h-64  rounded-xl bg-zinc-500 flex-col mt-5 mb-5 ml-auto mr-auto truncate">
                <div className="w-[40%] mb-2 ml-auto mr-auto bg-gray-700 text-center text-zinc-50 font-semibold h-11 flex justify-center items-center rounded-xl text-2xl" > {floor}</div>
                <div className=" w-full    bg-zinc-50  font-bold flex justify-around items-center   h-[15%] border-x  border-black" >
                    <h1>  A-Block</h1>   <h1>B-Block  </h1>  <h1>  C-Block</h1>
                </div>

                <div className="  flex w-full items-center  bg-zinc-50 border border-black h-[30%]  justify-around">


                    <div className=" text-wrap flex  justify-around items-center w-[13%] h-14    rounded-xl bg-slate-400">

                        {roomDetails.lw_is_a}
                    </div>

                    {extraThings.is_1 != " " && (<div className=" text-wrap flex  justify-around items-center w-[4%] h-14    rounded-xl bg-slate-400">

                        <h1 className="text-center">{extraThings.os_1}</h1>
                    </div>)}

                    <div className=" flex  justify-around items-center w-[13%] h-14    rounded-xl bg-slate-400">

                        {roomDetails.rw_is_a}
                    </div>
                    {extraThings.is_2 != " " && (<div className=" text-wrap flex  justify-around items-center w-[4%] h-14  text-sm  rounded-xl bg-slate-400">
                        <h1 className="text-center">{extraThings.os_2}</h1>
                    </div>)}


                    <div className=" flex  justify-around items-center w-[13%] h-14    rounded-xl bg-slate-400">

                        {roomDetails.lw_is_b}
                    </div>
                    {extraThings.is_3 != " " && (<div className=" text-wrap flex  justify-around items-center w-[4%] h-14    rounded-xl bg-slate-400">
                        <h1 className="text-center">{extraThings.os_3}</h1>
                    </div>)}
                    <div className=" flex  justify-around items-center w-[13%] h-14    rounded-xl bg-slate-400">

                        {roomDetails.rw_is_b}
                    </div>
                    {extraThings.is_4 != " " && (<div className=" text-wrap flex  justify-around items-center w-[4%] h-14    rounded-xl bg-slate-400">
                        <h1 className="text-center">{extraThings.os_4}</h1>
                    </div>)}
                    <div className=" flex  justify-around items-center w-[13%] h-14    rounded-xl bg-slate-400">

                        {roomDetails.lw_is_c}
                    </div>
                    {extraThings.is_5 != " " && (<div className=" text-wrap flex  justify-around items-center w-[4%] h-14    rounded-xl bg-slate-400">
                        <h1 className="text-center">{extraThings.os_5}</h1>
                    </div>)}
                    <div className=" flex  justify-around items-center w-[13%] h-14    rounded-xl bg-slate-400">

                        {roomDetails.rw_is_c}
                    </div>




                </div>

                <div className=" w-full    bg-zinc-50 border border-black font-bold flex justify-around items-center   h-[15%]">
                    <h1>  Corridor</h1>    <h1>  Corridor</h1><h1>  Corridor</h1>
                </div>

                <div className="  flex w-full items-center  bg-zinc-50 border border-black h-[30%]  justify-around">


                    <div className=" text-wrap flex  justify-around items-center w-[13%] h-14    rounded-xl bg-slate-400">

                        {roomDetails.lw_os_a}
                    </div>

                    {extraThings.os_1 != " " && (<div className=" text-wrap flex  justify-around items-center w-[4%] h-14    rounded-xl bg-slate-400">

                        <h1 className="text-center">{extraThings.in_1}</h1>
                    </div>)}

                    <div className=" flex  justify-around items-center w-[13%] h-14    rounded-xl bg-slate-400">

                        {roomDetails.rw_os_a}
                    </div>
                    {extraThings.os_2 != " " && (<div className=" text-wrap flex  justify-around items-center w-[4%] h-14    rounded-xl bg-slate-400">
                        <h1 className="text-center">{extraThings.in_2}</h1>
                    </div>)}


                    <div className=" flex  justify-around items-center w-[13%] h-14    rounded-xl bg-slate-400">

                        {roomDetails.lw_os_b}
                    </div>
                    {extraThings.os_3 != " " && (<div className=" text-wrap flex  justify-around items-center w-[4%] h-14    rounded-xl bg-slate-400">
                        <h1 className="text-center">{extraThings.in_3}</h1>
                    </div>)}
                    <div className=" flex  justify-around items-center w-[13%] h-14    rounded-xl bg-slate-400">

                        {roomDetails.rw_os_b}
                    </div>
                    {extraThings.os_4 != " " && (<div className=" text-wrap flex  justify-around items-center w-[4%] h-14    rounded-xl bg-slate-400">
                        <h1 className="text-center">{extraThings.in_4}</h1>
                    </div>)}
                    <div className=" flex  justify-around items-center w-[13%] h-14    rounded-xl bg-slate-400">

                        {roomDetails.lw_os_c}
                    </div>
                    {extraThings.os_5 != " " && (<div className=" text-wrap flex  justify-around items-center w-[4%] h-14    rounded-xl bg-slate-400">
                        <h1 className="text-center">{extraThings.in_5}</h1>
                    </div>)}
                    <div className=" flex  justify-around items-center w-[13%] h-14    rounded-xl bg-slate-400">

                        {roomDetails.rw_os_c}
                    </div>




                </div>



            </div>
        </div>
    </>



    )
}

export default BH1view1;