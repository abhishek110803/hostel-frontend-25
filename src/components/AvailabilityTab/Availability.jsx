function AvailabilityTab({ newSelectedRoom, hostelName }) {


    return (

        <> 
         
        <div className="w-full h-12 z-1 bg-zinc-50 sticky top-36 md:top-38 pt-2 mb-20">
            <div className=" w-[98%]   ml-auto mr-auto bg-slate-600 flex flex-col justify-around p-1 rounded-xl text-zinc-50 md:flex-row ">


                <div className="flex  row justify-center items-center w-[98%]  md:w-[35%] h-[40px] md:h-[70px] rounded-xl text-1xl md:text-2xl font-bold ">
                    Room  Availability

                    <h1 className=" text-sm text-center">{newSelectedRoom ? `Selected Room No :  ${newSelectedRoom} in ${hostelName}` : 'Have Not Selected any Room'}</h1>
                </div>


                <div className="flex   justify-around items-center w-[98%]   md:w-[60%]  h-[70px]  md:h-[70px] rounded-xl   font-normal text-sm">

                    <div className="flex flex-col h-[70px] md:h-[70px] justify-around items-center  ">
                        <div className=" w-6 h-6 md:w-8 mb-1 md:h-8  rounded-md  bg-green-500  border border-zinc-50">


                        </div>
                        <h1 className="text-center md:hidden"> Avail able</h1>
                        <h1 className="text-center hidden md:contents"> Available</h1>
                    </div>

                    <div className="flex flex-col h-[70px] md:h-[70px] justify-around items-center  ">
                        <div className=" w-6 h-6 md:w-8  md:h-8  mb-1 rounded-md  bg-blue-500  border border-zinc-50">


                        </div>
                        <h1 className="text-center md:hidden"> Sele cted </h1>
                        <h1 className="text-center hidden md:contents"> Selected</h1>



                    </div>

                    <div className="flex flex-col h-[70px] md:h-[70px] justify-around items-center  ">
                        <div className=" w-6 h-6 md:w-8  md:h-8 mb-1 rounded-md  bg-yellow-500 border border-zinc-50 ">


                        </div>
                        <h1 className="text-center">  Partially Booked </h1>
                    </div>


                    <div className="flex flex-col h-[70px] md:h-[70px] justify-around items-center  ">
                        <div className="w-6 h-6 md:w-8  md:h-8  mb-1 rounded-md  bg-red-500 border border-zinc-50 ">


                        </div>
                        <h1 className="text-center"> Fully Booked</h1>
                    </div>

                    <div className="flex flex-col h-[70px] md:h-[70px] justify-around items-center  ">
                        <div className="w-6 h-6 md:w-8  md:h-8 mb-1 rounded-md  bg-orange-950 border border-zinc-50">


                        </div>
                        <h1 className="text-center"> Not Available</h1>
                    </div>




                </div>

            </div>
        </div>
        </>
    )
}
export default AvailabilityTab;