import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import HostelView1 from "../../components/HostelView/Hostelview1";
import HostelView2 from "../../components/HostelView/Hostelvie2";
import HostelView3 from "../../components/HostelView/HostelView3";
import HostelView4 from "../../components/HostelView/HostelView4";
import AvailabilityTab from "../../components/AvailabilityTab/Availability";
import ProceedButton from "../../components/ProceedButton/ProceedButton";
import MGHview1 from "../../components/HostelView/MGHview1";
import BH1view1 from "../../components/HostelView/BH1view1";

import { mbhA } from "../../components/HostelSeats/Mbha";
import { mbhB } from "../../components/HostelSeats/Mbhb";
import { mbhF } from "../../components/HostelSeats/Mbhf";
import { bh6 } from "../../components/HostelSeats/Bh6";
import { bh7 } from "../../components/HostelSeats/Bh7";
import { bh3 } from "../../components/HostelSeats/Bh3";
import { bh1 } from "../../components/HostelSeats/Bh1";
import { bh2 } from "../../components/HostelSeats/Bh2";
import { bh4 } from "../../components/HostelSeats/Bh4";
import { bh5 } from "../../components/HostelSeats/Bh5";
import { bh7e } from "../../components/HostelSeats/Bh7E";
import { gh2 } from "../../components/HostelSeats/Gh2";
import { gh1 } from "../../components/HostelSeats/Gh1";
import { mgh2020 } from "../../components/HostelSeats/mgh2020";
import { mgh_p2_a } from "../../components/HostelSeats/MghPhase2A";
import { mgh_p2_b } from "../../components/HostelSeats/MghPhase2B";

import { useEffect, useRef, useState } from "react";
import Steps from "../../components/Navbar/Steps";
import StepProcessBar from "../../components/StepProcessBar/StepProcessBar";
import ProcessBar from "../../components/StepProcessBar/ProcessBar";
import FirstYear from "../../components/StepProcessBar/FirstYearProcessBar";
import { useSession } from "../../components/ProtectedPath/SessionContext";
import axiosInstance from "../../Helper/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function JustifiedExample() {
  const [selectedHostel, setSelectedHostel] = useState("");
  const [selectedRoom, setSelectedRoom] = useState({
    hname: "",
    roomID: "",
    roomNo: null,
  });
  const [roomDetails, setRoomDetails] = useState({});

  const [mbhAState, setMbhAState] = useState(mbhA);
  const [mbhBState, setMbhBState] = useState(mbhB);
  const [mbhFState, setMbhFState] = useState(mbhF);
  const [bh6State, setBh6State] = useState(bh6);
  const [bh7State, setBh7State] = useState(bh7);
  const [bh3State, setBh3State] = useState(bh3);
  const [bh4State, setBh4State] = useState(bh4);
  const [bh7eState, setBh7eState] = useState(bh7e);
  const [gh2State, setGh2State] = useState(gh2);
  const [gh1State, setGh1State] = useState(gh1);
  const [mgh2020State, setMgh2020State] = useState(mgh2020);
  const [mghP2AState, setMghP2AState] = useState(mgh_p2_a);
  const [mghP2BState, setMghP2BState] = useState(mgh_p2_b);

  // Example backend data
  const [backendData, setBackendData] = useState(null);

  const [fetchedData, setFetchedData] = useState(null);

  const [sem, setSem] = useState();
  const [course, setCourse] = useState();
  const [gender, setGender] = useState();

  const { session, updateSession } = useSession();
  const navigate = useNavigate();

  const getRoomData = async () => {
    try {
      let url = (session?.sem === '1') ? `/first_year_get_room_details.php` : `/get_room_details.php`;

      let res = axiosInstance.post(url, {
        code: session.code,
        rollno: session?.roll,
        application_id: session?.application_id,
      });
      await toast.promise(res, {
        loading: "Fetching rooms for you.",
        success: (data) => {
          // console.log(data?.data);
          return data?.data?.message;
        },
        error: (data) => {
          // console.log('error data', data);
          return data?.response?.data.message;
        },
      });

      res = await res;

      //console.log('allotment layout: line-104', res);

      if (res?.data?.isBooked === true) {
        updateSession({ stepIndex: 6 });
        // navigate("/confirmationPage");
        return;
      }

      if (res?.data?.status === "success") {
        setFetchedData(res?.data?.rooms);
        setSem(res?.data?.sem);
        setCourse(res?.data?.course);
        setGender(res?.data?.gender);
        // hostel_name,room_no, total_seats,filled_seats,vacant_seats,
      }
    } catch (error) {
      console.error("Error accepting request.", error);
    }
  };

  useEffect(() => {
    getRoomData();
  }, []);

  const processFetchedData = () => {
    ////console.log('i am fetched data', fetchedData);
    if (fetchedData) {
      setBackendData(
        fetchedData.map((item) => ({
          roomId: `${item.hostel_name}_${item.room_no}`,
          isAvailable:
            Boolean(Number(item.available)) && !Boolean(Number(item.block)),
          no_of_vacant: Number(item.vacant_seats),
          no_of_available_seats: Number(item.total_seats),
        }))
      );
    }
  };

  useEffect(() => {
    processFetchedData();
    //console.log('hhhsbdhshdfhgsdhfhsdfsfsd', sem, course, gender);
  }, [fetchedData]);

  // Function to update the state with backend data
  const updateRoomData = (state, setState, backendData) => {
    const newState = { ...state };
    for (const floor in newState) {
      for (const wing in newState[floor]) {
        newState[floor][wing] = newState[floor][wing].map((room) => {
          const backendRoomData = backendData.find(
            (data) => data.roomId === room.roomId
          );
          if (backendRoomData) {
            return {
              ...room,
              isAvailable: backendRoomData.isAvailable,
              no_of_vacant: backendRoomData.no_of_vacant,
              no_of_available_seats: backendRoomData.no_of_available_seats,
            };
          }
          return room;
        });
      }
    }
    setState(newState);
  };

  useEffect(() => {
    if (backendData) {
      //console.log('backend se hun bhai', backendData);
      updateRoomData(mbhAState, setMbhAState, backendData);
      updateRoomData(mbhBState, setMbhBState, backendData);
      updateRoomData(mbhFState, setMbhFState, backendData);
      updateRoomData(bh6State, setBh6State, backendData);
      updateRoomData(bh7State, setBh7State, backendData);
      updateRoomData(bh3State, setBh3State, backendData);
      updateRoomData(bh4State, setBh4State, backendData);
      updateRoomData(bh7eState, setBh7eState, backendData);
      updateRoomData(gh2State, setGh2State, backendData);
      updateRoomData(gh1State, setGh1State, backendData);
      updateRoomData(mgh2020State, setMgh2020State, backendData);
      updateRoomData(mghP2AState, setMghP2AState, backendData);
      updateRoomData(mghP2BState, setMghP2BState, backendData);
    }
  }, [backendData]); // Empty dependency array to run only once on mount

  useEffect(() => {
    //console.log("Selected hostel updated:", selectedHostel);
  }, [selectedHostel]);

  function handleClick() {
    //console.log("selected room", selectedRoom);
  }

  const handleHostelChange = (hostel) => {
    if (selectedHostel !== hostel) {
      //console.log("selected hostel1: ", hostel);
      setSelectedHostel((pre) => hostel);
      setSelectedRoom({
        hname: "",
        roomID: "",
        roomNo: null,
      });
    }
  };
  const show = (courses, gen, hostel) => {
    return courses.includes(course + sem) && gen === gender;
  };

  return (
    <>
      <Steps />
      <div className=" hidden md:block">
        {/* <FirstYear /> */}
        {session?.sem === "1" ? <FirstYear /> : <StepProcessBar />}
      </div>
      <div className=" p-7  sticky top-7 z-1 bg-zinc-50">
        <h1 className="text-center bold text-4xl m-auto font-black ">
          Available Hostels
        </h1>
      </div>

      <Tabs
        defaultActiveKey={selectedHostel}
        id="justify-tab-example"
        className=" bg-slate-300 font-bold text-zinc-50 text-1xl sticky top-24 z-1 overflow-scroll"
        justify
        onSelect={handleHostelChange}
      >
        {show(["", "", ""], "male", " ") && (
          <Tab eventKey="MBH-A" title="MBH-A" className="  ">
            <AvailabilityTab
              newSelectedRoom={selectedRoom.roomNo}
              hname={selectedHostel}
            />

            <HostelView3
              floor="Ground Floor"
              hname="MBH-A"
              roomsDetails={mbhA.gf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "MBH-A",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView3
              floor="First Floor"
              hname="MBH-A"
              roomsDetails={mbhAState.ff}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "MBH-A",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView3
              floor="Second Floor"
              hname="MBH-A"
              roomsDetails={mbhAState.sf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "MBH-A",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView3
              floor="Third Floor"
              hname="MBH-A"
              roomsDetails={mbhAState.tf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "MBH-A",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView3
              floor="Fourth Floor"
              hname="MBH-A"
              roomsDetails={mbhAState.fof}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "MBH-A",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView3
              floor="Fifth Floor"
              hname="MBH-A"
              roomsDetails={mbhAState.fif}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "MBH-A",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <ProceedButton
              newSelectedRoom={selectedRoom.roomID}
              handleClick={handleClick}
            />
          </Tab>
        )}

        {show([""], "male", "BH-1") && (
          <Tab eventKey="BH-1" title="BH-1" className="  ">
            <AvailabilityTab
              newSelectedRoom={selectedRoom.roomNo}
              hname={selectedHostel}
            />

            <BH1view1
              floor="Ground Floor"
              hname="MBH-A"
              roomsDetails={bh1.gf}
              newSelectedRoom={selectedRoom.roomID}
              extraThings={{
                in_1: "Stairs",
                in_2: "Washroom ",
                in_3: "Back Exit",

                os_1: "A Block Entry",
                os_2: "Water Cooler ",
                os_3: "B Block Entry",
              }}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "MBH-A",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <BH1view1
              floor="First Floor"
              hname="BH-1"
              roomsDetails={bh1.ff}
              newSelectedRoom={selectedRoom.roomID}
              extraThings={{
                in_1: "Stairs",
                in_2: "Musicroom ",
                in_3: "Stairs",
                in_4: "Gym Room ",
                in_5: "Stairs",
                os_1: "Elec Store",
                os_2: "Water Cooler ",
                os_3: "Elec Store",
                os_4: "Wash Room",
                os_5: "Elec Store",
              }}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "BH-1",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <BH1view1
              floor="Second Floor"
              hname="BH-1"
              roomsDetails={bh1.sf}
              newSelectedRoom={selectedRoom.roomID}
              extraThings={{
                in_1: "Stairs",
                in_2: "Wasroom ",
                in_3: "Stairs",
                in_4: "Wasroom ",
                in_5: "Stairs",
                os_1: "Elec Store",
                os_2: "Wasroom ",
                os_3: "Elec Store",
                os_4: "Wash Room",
                os_5: "Elec Store ",
              }}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "BH-1",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <ProceedButton
              newSelectedRoom={selectedRoom.roomID}
              handleClick={handleClick}
            />
          </Tab>
        )}

        {show([""], "male", "BH-2") && (
          <Tab eventKey="BH-2" title="BH-2" className="  ">
            <AvailabilityTab
              newSelectedRoom={selectedRoom.roomNo}
              hname={selectedHostel}
            />

            <HostelView3
              floor="Ground Floor"
              hname="BH-2"
              roomsDetails={bh2.gf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "BH-2",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView3
              floor="First Floor"
              hname="BH-2"
              roomsDetails={bh2.ff}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "BH-2",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView3
              floor="Second Floor"
              hname="BH-2"
              roomsDetails={bh2.sf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "BH-2",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <ProceedButton
              newSelectedRoom={selectedRoom.roomID}
              handleClick={handleClick}
            />
          </Tab>
        )}

        {show([""], "male", "BH-5") && (
          <Tab eventKey="BH-5" title="BH-5" className="  ">
            <AvailabilityTab
              newSelectedRoom={selectedRoom.roomNo}
              hname={selectedHostel}
            />

            <HostelView4
              floor="Ground Floor"
              hname="BH-5"
              roomsDetails={bh5.gf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "BH-5",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView4
              floor="First Floor"
              hname="BH-5"
              roomsDetails={bh5.ff}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "BH-5",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView4
              floor="Second Floor"
              hname="BH-5"
              roomsDetails={bh5.sf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "BH-5",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <ProceedButton
              newSelectedRoom={selectedRoom.roomID}
              handleClick={handleClick}
            />
          </Tab>
        )}

        {show(["", "", ""], "male", "MBH-B") && (
          <Tab eventKey="MBH-B" title="MBH-B" className="  ">
            <AvailabilityTab
              newSelectedRoom={selectedRoom.roomNo}
              hname={selectedHostel}
            />

            <HostelView3
              floor="Ground Floor"
              hname="MBH-B"
              roomsDetails={mbhBState.gf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "MBH-A",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView3
              floor="First Floor"
              hname="MBH-B"
              roomsDetails={mbhBState.ff}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "MBH-A",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView3
              floor="Second Floor"
              hname="MBH-B"
              roomsDetails={mbhBState.sf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "MBH-A",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView3
              floor="Third Floor"
              hname="MBH-B"
              roomsDetails={mbhBState.tf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "MBH-A",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView3
              floor="Fourth Floor"
              hname="MBH-B"
              roomsDetails={mbhBState.fof}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "MBH-A",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView3
              floor="Fifth Floor"
              hname="MBH-B"
              roomsDetails={mbhBState.fif}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "MBH-A",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView3
              floor="Sixth Floor"
              hname="MBH-B"
              roomsDetails={mbhBState.sif}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "MBH-A",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <ProceedButton
              newSelectedRoom={selectedRoom.roomID}
              handleClick={handleClick}
            />
          </Tab>
        )}

        {show(["", "", ""], "male", "MBH-F") && (
          <Tab eventKey="MBH-F" title="MBH-F" className="  ">
            <AvailabilityTab
              newSelectedRoom={selectedRoom.roomNo}
              hname={selectedHostel}
            />

            <HostelView3
              floor="Ground Floor"
              hname="MBH-F"
              roomsDetails={mbhFState.gf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "MBH-F",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView3
              floor="First Floor"
              hname="MBH-F"
              roomsDetails={mbhFState.ff}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "MBH-F",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView3
              floor="Second Floor"
              hname="MBH-F"
              roomsDetails={mbhFState.sf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "MBH-F",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView3
              floor="Third Floor"
              hname="MBH-F"
              roomsDetails={mbhFState.tf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "MBH-F",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView3
              floor="Fourth Floor"
              hname="MBH-F"
              roomsDetails={mbhFState.fof}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "MBH-F",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView3
              floor="Fifth Floor"
              hname="MBH-F"
              roomsDetails={mbhFState.fif}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "MBH-F",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <ProceedButton
              newSelectedRoom={selectedRoom.roomID}
              handleClick={handleClick}
            />
          </Tab>
        )}

        {show(["mtech1", "mba1", "msc1"], "male") && (
          <Tab eventKey="BH-3" title="BH-3" className="xyz  ">
            <AvailabilityTab
              newSelectedRoom={selectedRoom.roomNo}
              hname={selectedHostel}
            />

            <HostelView4
              floor="Ground Floor"
              hname="BH-3"
              roomsDetails={bh3State.gf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "MBH-F",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView4
              floor="First Floor"
              hname="BH-3"
              roomsDetails={bh3State.ff}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "MBH-F",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView4
              floor="Second Floor"
              hname="BH-3"
              roomsDetails={bh3State.sf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "MBH-F",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <ProceedButton
              newSelectedRoom={selectedRoom.roomID}
              handleClick={handleClick}
            />
          </Tab>
        )}

        {show(["mtech1", "mba1", "msc1"], "male", "BH-4") && (
          <Tab eventKey="BH-4" title="BH-4" className="  ">
            <AvailabilityTab
              newSelectedRoom={selectedRoom.roomNo}
              hname={selectedHostel}
            />

            <HostelView4
              floor="Ground Floor"
              hname="BH-4"
              roomsDetails={bh4State.gf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "MBH-F",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView4
              floor="First Floor"
              hname="BH-4"
              roomsDetails={bh4State.ff}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "MBH-F",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView4
              floor="Second Floor"
              hname="BH-4"
              roomsDetails={bh4State.sf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "MBH-F",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <ProceedButton
              newSelectedRoom={selectedRoom.roomID}
              handleClick={handleClick}
            />
          </Tab>
        )}

        {show(["mtech1", "mba1", "msc1"], "male", "BH-6") && (
          <Tab eventKey="BH-6" title="BH-6" className="  ">
            <AvailabilityTab
              newSelectedRoom={selectedRoom.roomNo}
              hname={selectedHostel}
            />

            <HostelView4
              floor="Ground Floor"
              hname="BH-6"
              roomsDetails={bh6State.gf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "MBH-F",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView4
              floor="First Floor"
              hname="BH-6"
              roomsDetails={bh6State.ff}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "MBH-F",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView4
              floor="Second Floor"
              hname="BH-6"
              roomsDetails={bh6State.sf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "MBH-F",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <ProceedButton
              newSelectedRoom={selectedRoom.roomID}
              handleClick={handleClick}
            />
          </Tab>
        )}

        {show(["mtech1", "mba1", "msc1"], "male", "BH-7") && (
          <Tab eventKey="BH-7" title="BH-7" className="  ">
            <AvailabilityTab
              newSelectedRoom={selectedRoom.roomNo}
              hname={selectedHostel}
            />

            <HostelView4
              floor="Ground Floor"
              hname="BH-7"
              roomsDetails={bh7State.gf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "BH-7",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView4
              floor="First Floor"
              hname="BH-7"
              roomsDetails={bh7State.ff}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "MBH-F",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView4
              floor="Second Floor"
              hname="BH-7"
              roomsDetails={bh7State.sf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "MBH-F",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView4
              floor="Third Floor"
              hname="BH-7"
              roomsDetails={bh7State.tf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "MBH-F",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <ProceedButton
              newSelectedRoom={selectedRoom.roomID}
              handleClick={handleClick}
            />
          </Tab>
        )}

        {show(["", ""], "male", "BH-7E") && (
          <Tab eventKey="BH-7E" title="BH-7E" className=" ">
            <AvailabilityTab
              newSelectedRoom={selectedRoom.roomNo}
              hname={selectedHostel}
            />
            <HostelView1
              floor="Ground Floor"
              roomsDetails={bh7eState.gf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "BH-7E",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <HostelView1
              floor="First Floor"
              roomsDetails={bh7eState.ff}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "BH-7E",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <HostelView1
              floor="Second Floor"
              roomsDetails={bh7eState.sf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "BH-7E",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <HostelView1
              floor="Third Floor"
              roomsDetails={bh7eState.tf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "BH-7E",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <ProceedButton
              newSelectedRoom={selectedRoom.roomID}
              handleClick={handleClick}
            />
          </Tab>
        )}

        {show(["", ""], "female") && (
          <Tab eventKey="GH-1" title="GH-1" className=" ">
            <AvailabilityTab
              newSelectedRoom={selectedRoom.roomNo}
              hname={selectedHostel}
            />
            <HostelView1
              floor="Ground Floor"
              roomsDetails={gh1State.gf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "BH-7E",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <HostelView1
              floor="First Floor"
              roomsDetails={gh1State.ff}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "BH-7E",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <ProceedButton
              newSelectedRoom={selectedRoom.roomID}
              handleClick={handleClick}
            />
          </Tab>
        )}

        {show(["", ""], "female") && (
          <Tab eventKey="GH-2" title="GH-2" className=" ">
            <AvailabilityTab
              newSelectedRoom={selectedRoom.roomNo}
              hname={selectedHostel}
            />
            <HostelView1
              floor="Ground Floor"
              roomsDetails={gh2State.gf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "BH-7E",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <HostelView1
              floor="First Floor"
              roomsDetails={gh2State.ff}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "BH-7E",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView1
              floor="Second Floor"
              roomsDetails={gh2State.sf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "BH-7E",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <ProceedButton
              newSelectedRoom={selectedRoom.roomID}
              handleClick={handleClick}
            />
          </Tab>
        )}
        {show([""], "female") && (
          <Tab eventKey="MGH-PHASE-1" title="MGH-PHASE-1" className=" ">
            <AvailabilityTab
              newSelectedRoom={selectedRoom.roomNo}
              hname={selectedHostel}
            />

            <MGHview1
              floor="Ground Floor"
              roomsDetails={mgh2020State.gf}
              extraThings={{
                is_left: "Stairs",
                is_mid: "Frontside ",
                is_right: "Stairs",
                os_left: "Wash Room",
                os_mid: "Stairs / Lifts ",
                os_right: "Wash Room",
              }}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "BH-7E",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <MGHview1
              floor="First Floor"
              roomsDetails={mgh2020State.ff}
              extraThings={{
                is_left: "Stairs",
                is_mid: "Reading Room ",
                is_right: "Stairs",
                os_left: "Wash Room",
                os_mid: "Stairs / Lifts ",
                os_right: "Wash Room",
              }}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "BH-7E",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <MGHview1
              floor="Second Floor"
              roomsDetails={mgh2020State.sf}
              extraThings={{
                is_left: "Stairs",
                is_mid: "Gym Machine ",
                is_right: "Stairs",
                os_left: "Wash Room",
                os_mid: "Stairs / Lifts ",
                os_right: "Wash Room",
              }}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "BH-7E",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <MGHview1
              floor="Third Floor"
              roomsDetails={mgh2020State.tf}
              extraThings={{
                is_left: "Stairs",
                is_mid: "Reading Room",
                is_right: "Stairs",
                os_left: "Wash Room",
                os_mid: "Stairs / Lifts ",
                os_right: "Wash Room",
              }}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "BH-7E",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <MGHview1
              floor="Fourth Floor"
              roomsDetails={mgh2020State.fof}
              extraThings={{
                is_left: "Stairs",
                is_mid: "Reading Room ",
                is_right: "Stairs",
                os_left: "Wash Room",
                os_mid: "Stairs / Lifts ",
                os_right: "Wash Room",
              }}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "BH-7E",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <MGHview1
              floor="Fifth Floor"
              roomsDetails={mgh2020State.fif}
              extraThings={{
                is_left: "Stairs",
                is_mid: "Reading Room ",
                is_right: "Stairs",
                os_left: "Wash Room",
                os_mid: "Stairs / Lifts ",
                os_right: "Wash Room",
              }}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "BH-7E",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <MGHview1
              floor="Sixth Floor"
              roomsDetails={mgh2020State.sif}
              extraThings={{
                is_left: "Stairs",
                is_mid: "Store Room ",
                is_right: "Stairs",
                os_left: "Wash Room",
                os_mid: "Stairs / Lifts ",
                os_right: "Wash Room",
              }}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log("room details: ", room);
                setSelectedRoom({
                  hname: "BH-7E",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <ProceedButton
              newSelectedRoom={selectedRoom.roomID}
              handleClick={handleClick}
            />
          </Tab>
        )}

        {show(["mtech1", "mba1", "msc1"], "female", "MGH-P-2 A Block") && (
          <Tab eventKey="MGH-P-2 A Block" title="MGH-P-2 A Block" className=" ">
            <AvailabilityTab
              newSelectedRoom={selectedRoom.roomNo}
              hname={selectedHostel}
            />
            <MGHview1
              floor="First Floor"
              roomsDetails={mghP2AState.gf}
              extraThings={{
                is_left: "",
                is_mid: "Lift / Stairs ",
                is_right: " ",
                os_left: "Toilets",
                os_mid: "Space ",
                os_right: "Toilets",
              }}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log('room details: ', room);
                setSelectedRoom({
                  hname: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <MGHview1
              floor="Second Floor"
              roomsDetails={mghP2AState.ff}
              extraThings={{
                is_left: "",
                is_mid: "Lift / Stairs ",
                is_right: " ",
                os_left: "Toilets",
                os_mid: "Space ",
                os_right: "Toilets",
              }}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                setSelectedRoom({
                  hname: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <MGHview1
              floor="Third Floor"
              roomsDetails={mghP2AState.sf}
              extraThings={{
                is_left: "",
                is_mid: "Lift / Stairs ",
                is_right: " ",
                os_left: "Toilets",
                os_mid: "Space ",
                os_right: "Toilets",
              }}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log('room details: ', room);
                setSelectedRoom({
                  hname: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <MGHview1
              floor="Fourth Floor"
              roomsDetails={mghP2AState.tf}
              extraThings={{
                is_left: "",
                is_mid: "Lift / Stairs ",
                is_right: " ",
                os_left: "Toilets",
                os_mid: "Space ",
                os_right: "Toilets",
              }}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log('room details: ', room);
                setSelectedRoom({
                  hname: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <MGHview1
              floor="Fifth Floor"
              roomsDetails={mghP2AState.fof}
              extraThings={{
                is_left: "",
                is_mid: "Lift / Stairs ",
                is_right: " ",
                os_left: "Toilets",
                os_mid: "Space ",
                os_right: "Toilets",
              }}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log('room details: ', room);
                setSelectedRoom({
                  hname: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <MGHview1
              floor="Sixth Floor"
              roomsDetails={mghP2AState.fif}
              extraThings={{
                is_left: "",
                is_mid: "Lift / Stairs ",
                is_right: " ",
                os_left: "Toilets",
                os_mid: "Space ",
                os_right: "Toilets",
              }}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log('room details: ', room);
                setSelectedRoom({
                  hname: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />{" "}
            <MGHview1
              floor="Seventh Floor"
              roomsDetails={mghP2AState.sif}
              extraThings={{
                is_left: "",
                is_mid: "Lift / Stairs ",
                is_right: " ",
                os_left: "Toilets",
                os_mid: "Space ",
                os_right: "Toilets",
              }}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log('room details: ', room);
                setSelectedRoom({
                  hname: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />{" "}
            <MGHview1
              floor="Eighth Floor"
              roomsDetails={mghP2AState.sef}
              extraThings={{
                is_left: "",
                is_mid: "Lift / Stairs ",
                is_right: " ",
                os_left: "Toilets",
                os_mid: "Space ",
                os_right: "Toilets",
              }}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log('room details: ', room);
                setSelectedRoom({
                  hname: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />{" "}
            <MGHview1
              floor="Nineth Floor"
              roomsDetails={mghP2AState.eif}
              extraThings={{
                is_left: "",
                is_mid: "Lift / Stairs ",
                is_right: " ",
                os_left: "Toilets",
                os_mid: "Space ",
                os_right: "Toilets",
              }}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log('room details: ', room);
                setSelectedRoom({
                  hname: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />{" "}
            <MGHview1
              floor="Tenth Floor"
              roomsDetails={mghP2AState.nif}
              extraThings={{
                is_left: "",
                is_mid: "Lift / Stairs ",
                is_right: " ",
                os_left: "Toilets",
                os_mid: "Space ",
                os_right: "Toilets",
              }}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log('room details: ', room);
                setSelectedRoom({
                  hname: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />{" "}
            <MGHview1
              floor="Eleventh Floor"
              roomsDetails={mghP2AState.tef}
              extraThings={{
                is_left: "",
                is_mid: "Lift / Stairs ",
                is_right: " ",
                os_left: "Toilets",
                os_mid: "Space ",
                os_right: "Toilets",
              }}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log('room details: ', room);
                setSelectedRoom({
                  hname: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <ProceedButton
              newSelectedRoom={selectedRoom.roomID}
              handleClick={handleClick}
            />
          </Tab>
        )}

        {show(["mtech1", "mba1", "msc1"], "female", "MGH-P-2 B Block") && (
          <Tab eventKey="MGH-P-2 B Block" title="MGH-P-2 B Block" className=" ">
            <AvailabilityTab
              newSelectedRoom={selectedRoom.roomNo}
              hname={selectedHostel}
            />
            <MGHview1
              floor="First Floor"
              roomsDetails={mghP2BState.gf}
              extraThings={{
                is_left: "",
                is_mid: "Lift / Stairs ",
                is_right: " ",
                os_left: "Toilets",
                os_mid: "Space ",
                os_right: "Toilets",
              }}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log('room details: ', room);
                setSelectedRoom({
                  hname: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <MGHview1
              floor="Second Floor"
              roomsDetails={mghP2BState.ff}
              extraThings={{
                is_left: "",
                is_mid: "Lift / Stairs ",
                is_right: " ",
                os_left: "Toilets",
                os_mid: "Space ",
                os_right: "Toilets",
              }}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log('room details: ', room);
                setSelectedRoom({
                  hname: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <MGHview1
              floor="Third Floor"
              roomsDetails={mghP2BState.sf}
              extraThings={{
                is_left: "",
                is_mid: "Lift / Stairs ",
                is_right: " ",
                os_left: "Toilets",
                os_mid: "Space ",
                os_right: "Toilets",
              }}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log('room details: ', room);
                setSelectedRoom({
                  hname: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <MGHview1
              floor="Fourth Floor"
              roomsDetails={mghP2BState.tf}
              extraThings={{
                is_left: "",
                is_mid: "Lift / Stairs ",
                is_right: " ",
                os_left: "Toilets",
                os_mid: "Space ",
                os_right: "Toilets",
              }}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log('room details: ', room);
                setSelectedRoom({
                  hname: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <MGHview1
              floor="Fifth Floor"
              roomsDetails={mghP2BState.fof}
              extraThings={{
                is_left: "",
                is_mid: "Lift / Stairs ",
                is_right: " ",
                os_left: "Toilets",
                os_mid: "Space ",
                os_right: "Toilets",
              }}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log('room details: ', room);
                setSelectedRoom({
                  hname: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <MGHview1
              floor="Sixth Floor"
              roomsDetails={mghP2BState.fif}
              extraThings={{
                is_left: "",
                is_mid: "Lift / Stairs ",
                is_right: " ",
                os_left: "Toilets",
                os_mid: "Space ",
                os_right: "Toilets",
              }}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log('room details: ', room);
                setSelectedRoom({
                  hname: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />{" "}
            <MGHview1
              floor="Seventh Floor"
              roomsDetails={mghP2BState.sif}
              extraThings={{
                is_left: "",
                is_mid: "Lift / Stairs ",
                is_right: " ",
                os_left: "Toilets",
                os_mid: "Space ",
                os_right: "Toilets",
              }}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log('room details: ', room);
                setSelectedRoom({
                  hname: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />{" "}
            <MGHview1
              floor="Eighth Floor"
              roomsDetails={mghP2BState.sef}
              extraThings={{
                is_left: "",
                is_mid: "Lift / Stairs ",
                is_right: " ",
                os_left: "Toilets",
                os_mid: "Space ",
                os_right: "Toilets",
              }}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log('room details: ', room);
                setSelectedRoom({
                  hname: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />{" "}
            <MGHview1
              floor="Nineth Floor"
              roomsDetails={mghP2BState.eif}
              extraThings={{
                is_left: "",
                is_mid: "Lift / Stairs ",
                is_right: " ",
                os_left: "Toilets",
                os_mid: "Space ",
                os_right: "Toilets",
              }}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log('room details: ', room);
                setSelectedRoom({
                  hname: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />{" "}
            <MGHview1
              floor="Tenth Floor"
              roomsDetails={mghP2BState.nif}
              extraThings={{
                is_left: "",
                is_mid: "Lift / Stairs ",
                is_right: " ",
                os_left: "Toilets",
                os_mid: "Space ",
                os_right: "Toilets",
              }}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log('room details: ', room);
                setSelectedRoom({
                  hname: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />{" "}
            <MGHview1
              floor="Eleventh Floor"
              roomsDetails={mghP2BState.tef}
              extraThings={{
                is_left: "",
                is_mid: "Lift / Stairs ",
                is_right: " ",
                os_left: "Toilets",
                os_mid: "Space ",
                os_right: "Toilets",
              }}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
                //console.log('room details: ', room);
                setSelectedRoom({
                  hname: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <ProceedButton
              newSelectedRoom={selectedRoom.roomID}
              handleClick={handleClick}
            />
          </Tab>
        )}
      </Tabs>
    </>
  );
}

export default JustifiedExample;
