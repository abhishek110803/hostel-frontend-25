import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import HostelView1 from "../../../components/HostelView/Hostelview1";
import HostelView2 from "../../../components/HostelView/Hostelvie2";
import HostelView3 from "../../../components/HostelView/HostelView3";
import HostelView4 from "../../../components/HostelView/HostelView4";
import RoomStatus from "../../Admin/RoomStatus/RoomStatus";
import UpdateButton from "../../Admin/Update/UpdateButton";
import MGHview1 from "../../../components/HostelView/MGHview1";
// import { bh_3_gf_lw_tp_hf, bh_3_gf_rw_tp_hf } from '../../components/HostelSeats/Bh3';
import { mbhA } from "../../../components/HostelSeats/Mbha";
import { mbhB } from "../../../components/HostelSeats/Mbhb";
import { mbhF } from "../../../components/HostelSeats/Mbhf";
import { bh6 } from "../../../components/HostelSeats/Bh6";
import { bh7 } from "../../../components/HostelSeats/Bh7";
import { bh3 } from "../../../components/HostelSeats/Bh3";
import { bh4 } from "../../../components/HostelSeats/Bh4";
import { bh7e } from "../../../components/HostelSeats/Bh7E";
import { gh2 } from "../../../components/HostelSeats/Gh2";
import { gh1 } from "../../../components/HostelSeats/Gh1";

import { useEffect, useState } from 'react';
import Steps from '../../../components/Steps/Steps';
import { mgh2020 } from '../../../components/HostelSeats/mgh2020';
import StepProcessBar from '../../../components/StepProcessBar/StepProcessBar';
import { mgh_p2_a } from '../../../components/HostelSeats/MghPhase2A';
import { mgh_p2_b } from '../../../components/HostelSeats/MghPhase2B';
import AdminSidebar from "../AdminSidebar";
import { useNavigate } from "react-router-dom";


function Allhostels() {
  const Navigate = useNavigate();
  const [selectedHostel, setHostel] = useState("MBH-A");
  const [selectedRoom, setSelectedRoom] = useState({
    hostelName: "",
    roomID: "",
    roomNo: null,
  });
  const [roomDetails, setRoomDetails] = useState({});



  useEffect(() => {
   //console.log("Selected hostel updated:", selectedHostel);
  }, [selectedHostel]);

  function handleClick() {
    Navigate("/Rmedt")
  }

  const handleHostelChange = (hostel) => {
    if (selectedHostel !== hostel) {
     //console.log("selected hostel1: ", hostel);
      setHostel((pre) => hostel);
      setSelectedRoom({
        hostelName: "",
        roomID: "",
        roomNo: null,
      });
    }
    ////console.log('selected hostel2:', selectedHostel)
  };

  return (
    <div className="flex">

      <AdminSidebar />
      <div className="w-[85%]">
        <div className=" p-7  sticky top-0 z-1 bg-zinc-50">
          <h1 className="text-center bold text-4xl m-auto font-black ">
            All Hostels
          </h1>
        </div>

        <Tabs
          defaultActiveKey={selectedHostel}
          id="justify-tab-example"
          className=" bg-slate-300 font-bold text-zinc-50 text-1xl sticky top-24 w-[100%] z-1 oveflow-scroll"
          justify
          onSelect={handleHostelChange}
        >
          <Tab eventKey="MBH-A" title="MBH-A" className="  ">
            <RoomStatus
              newSelectedRoom={selectedRoom.roomNo}
              hostelName={selectedHostel}
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
                  hostelName: "MBH-A",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView3
              floor="First Floor"
               hname="MBH-A"
              roomsDetails={mbhA.ff}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "MBH-A",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView3
              floor="Second Floor"
               hname="MBH-A"
              roomsDetails={mbhA.ff}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "MBH-A",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView3
              floor="Third Floor"
               hname="MBH-A"
              roomsDetails={mbhA.tf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "MBH-A",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView3
              floor="Fourth Floor"
               hname="MBH-A"
              roomsDetails={mbhA.fof}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "MBH-A",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView3
              floor="Fifth Floor"
              hname="MBH-A"
              roomsDetails={mbhA.fif}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "MBH-A",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <UpdateButton
              newSelectedRoom={selectedRoom.roomID}
              handleClick={handleClick}
            />
          </Tab>

          <Tab eventKey="MBH-B" title="MBH-B" className="  ">
            <RoomStatus
              newSelectedRoom={selectedRoom.roomNo}
              hostelName={selectedHostel}
            />

            <HostelView3
              floor="Ground Floor"
              hname="MBH-B"
              roomsDetails={mbhB.gf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "MBH-A",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView3
              floor="First Floor"
               hname="MBH-B"
              roomsDetails={mbhB.ff}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "MBH-A",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView3
              floor="Second Floor"
               hname="MBH-B"
              roomsDetails={mbhB.ff}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "MBH-A",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView3
              floor="Third Floor"
               hname="MBH-B"
              roomsDetails={mbhB.tf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "MBH-A",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView3
              floor="Fourth Floor"
               hname="MBH-B"
              roomsDetails={mbhB.fof}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "MBH-A",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView3
              floor="Fifth Floor"
               hname="MBH-B"
              roomsDetails={mbhB.fif}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "MBH-A",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView3
              floor="Sixth Floor"
               hname="MBH-B"
              roomsDetails={mbhB.sif}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "MBH-A",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <UpdateButton
              newSelectedRoom={selectedRoom.roomID}
              handleClick={handleClick}
            />
          </Tab>

          <Tab eventKey="MBH-F" title="MBH-F" className="  ">
            <RoomStatus
              newSelectedRoom={selectedRoom.roomNo}
              hostelName={selectedHostel}
            />

            <HostelView3
              floor="Ground Floor"
               hname="MBH-F"
              roomsDetails={mbhF.gf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "MBH-F",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView3
              floor="First Floor"
               hname="MBH-F"
              roomsDetails={mbhF.ff}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "MBH-F",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView3
              floor="Second Floor"
               hname="MBH-F"
              roomsDetails={mbhF.ff}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "MBH-F",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView3
              floor="Third Floor"
               hname="MBH-F"
              roomsDetails={mbhF.tf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "MBH-F",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView3
              floor="Fourth Floor"
               hname="MBH-F"
              roomsDetails={mbhF.fof}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "MBH-F",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView3
              floor="Fifth Floor"
               hname="MBH-F"
              roomsDetails={mbhF.fif}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "MBH-F",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <UpdateButton
              newSelectedRoom={selectedRoom.roomID}
              handleClick={handleClick}
            />
          </Tab>
          <Tab eventKey="BH-3" title="BH-3" className="  ">
            <RoomStatus
              newSelectedRoom={selectedRoom.roomNo}
              hostelName={selectedHostel}
            />

            <HostelView4
              floor="Ground Floor"
               hname="BH-3"
              roomsDetails={bh3.gf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "MBH-F",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView4
              floor="First Floor"
               hname="BH-3"
              roomsDetails={bh3.ff}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "MBH-F",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView4
              floor="Second Floor"
               hname="BH-3"
              roomsDetails={bh3.sf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "MBH-F",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <UpdateButton
              newSelectedRoom={selectedRoom.roomID}
              handleClick={handleClick}
            />
          </Tab>

          <Tab eventKey="BH-4" title="BH-4" className="  ">
            <RoomStatus
              newSelectedRoom={selectedRoom.roomNo}
              hostelName={selectedHostel}
            />

            <HostelView4
              floor="Ground Floor"
               hname="BH-4"
              roomsDetails={bh4.gf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "MBH-F",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView4
              floor="First Floor"
                hname="BH-4"
              roomsDetails={bh4.ff}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "MBH-F",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView4
              floor="Second Floor"
                hname="BH-4"
              roomsDetails={bh4.sf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "MBH-F",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <UpdateButton
              newSelectedRoom={selectedRoom.roomID}
              handleClick={handleClick}
            />
          </Tab>

          <Tab eventKey="BH-6" title="BH-6" className="  ">
            <RoomStatus
              newSelectedRoom={selectedRoom.roomNo}
              hostelName={selectedHostel}
            />

            <HostelView4
              floor="Ground Floor"
                hname="BH-6"
              roomsDetails={bh6.gf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "MBH-F",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView4
              floor="First Floor"
                hname="BH-6"
              roomsDetails={bh6.ff}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "MBH-F",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView4
              floor="Second Floor"
                hname="BH-6"
              roomsDetails={bh6.sf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "MBH-F",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <UpdateButton
              newSelectedRoom={selectedRoom.roomID}
              handleClick={handleClick}
            />
          </Tab>

          <Tab eventKey="BH-7" title="BH-7" className="  ">
            <RoomStatus
              newSelectedRoom={selectedRoom.roomNo}
              hostelName={selectedHostel}
            />

            <HostelView4
              floor="Ground Floor"
                hname="BH-7"
              roomsDetails={bh7.gf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "MBH-F",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView4
              floor="First Floor"
               hname="BH-7"
              roomsDetails={bh7.ff}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "MBH-F",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView4
              floor="Second Floor"
               hname="BH-7"
              roomsDetails={bh7.sf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "MBH-F",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView4
              floor="Third Floor"
               hname="BH-7"
              roomsDetails={bh7.tf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "MBH-F",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <UpdateButton
              newSelectedRoom={selectedRoom.roomID}
              handleClick={handleClick}
            />
          </Tab>

          <Tab eventKey="BH-7E" title="BH-7E" className=" ">
            <RoomStatus
              newSelectedRoom={selectedRoom.roomNo}
              hostelName={selectedHostel}
            />
            <HostelView1
              floor="Ground Floor"
              roomsDetails={bh7e.gf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "BH-7E",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <HostelView1
              floor="First Floor"
              roomsDetails={bh7e.ff}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "BH-7E",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <UpdateButton
              newSelectedRoom={selectedRoom.roomID}
              handleClick={handleClick}
            />
          </Tab>

          <Tab eventKey="GH-1" title="GH-1" className=" ">
            <RoomStatus
              newSelectedRoom={selectedRoom.roomNo}
              hostelName={selectedHostel}
            />
            <HostelView1
              floor="Ground Floor"
              roomsDetails={gh1.gf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "BH-7E",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <HostelView1
              floor="First Floor"
              roomsDetails={gh1.ff}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "BH-7E",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <UpdateButton
              newSelectedRoom={selectedRoom.roomID}
              handleClick={handleClick}
            />
          </Tab>

          <Tab eventKey="GH-2" title="GH-2" className=" ">
            <RoomStatus
              newSelectedRoom={selectedRoom.roomNo}
              hostelName={selectedHostel}
            />
            <HostelView1
              floor="Ground Floor"
              roomsDetails={gh2.gf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "BH-7E",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <HostelView1
              floor="First Floor"
              roomsDetails={gh2.ff}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "BH-7E",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <HostelView1
              floor="Second Floor"
              roomsDetails={gh2.sf}
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log("room details: ", room);
                setSelectedRoom({
                  hostelName: "BH-7E",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <UpdateButton
              newSelectedRoom={selectedRoom.roomID}
              handleClick={handleClick}
            />
          </Tab>

          <Tab eventKey="MGH-PHASE-1" title="MGH-PHASE-1" className=" ">
            <RoomStatus
              newSelectedRoom={selectedRoom.roomNo}
              hostelName={selectedHostel}
            />

            <MGHview1
              floor="Ground Floor"
              roomsDetails={mgh2020.gf}
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
                  hostelName: "BH-7E",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <MGHview1
              floor="First Floor"
              roomsDetails={mgh2020.ff}
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
                  hostelName: "BH-7E",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <MGHview1
              floor="Second Floor"
              roomsDetails={mgh2020.sf}
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
                  hostelName: "BH-7E",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <MGHview1
              floor="Third Floor"
              roomsDetails={mgh2020.tf}
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
                  hostelName: "BH-7E",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <MGHview1
              floor="Fourth Floor"
              roomsDetails={mgh2020.fof}
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
                  hostelName: "BH-7E",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <MGHview1
              floor="Fifth Floor"
              roomsDetails={mgh2020.fif}
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
                  hostelName: "BH-7E",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />
            <MGHview1
              floor="Sixth Floor"
              roomsDetails={mgh2020.sif}
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
                  hostelName: "BH-7E",
                  roomID: room.id,
                  roomNo: room.no,
                });
              }}
            />

            <UpdateButton
              newSelectedRoom={selectedRoom.roomID}
              handleClick={handleClick}
            />
          </Tab>

          <Tab eventKey="MGH-P-2 A Block" title="MGH-P-2 A Block" className=" ">
            <RoomStatus newSelectedRoom={selectedRoom.roomNo} hostelName={selectedHostel} />
            <MGHview1

              floor="Ground Floor"
              roomsDetails={mgh_p2_a.gf}
              extraThings={

                {
                  is_left: "",
                  is_mid: "Lift / Stairs ",
                  is_right: " ",
                  os_left: "Toilets",
                  os_mid: "Space ",
                  os_right: "Toilets"
                }
              }
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log('room details: ', room);
                setSelectedRoom({
                  hostelName: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no
                })


              }}
            />
            <MGHview1

              floor="First Floor"
              roomsDetails={mgh_p2_a.ff}
              extraThings={

                {
                  is_left: "",
                  is_mid: "Lift / Stairs ",
                  is_right: " ",
                  os_left: "Toilets",
                  os_mid: "Space ",
                  os_right: "Toilets"
                }
              }
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log('room details: ', room);
                setSelectedRoom({
                  hostelName: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no
                })


              }}
            />
            <MGHview1

              floor="Second Floor"
              roomsDetails={mgh_p2_a.sf}
              extraThings={

                {
                  is_left: "",
                  is_mid: "Lift / Stairs ",
                  is_right: " ",
                  os_left: "Toilets",
                  os_mid: "Space ",
                  os_right: "Toilets"
                }
              }
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log('room details: ', room);
                setSelectedRoom({
                  hostelName: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no
                })


              }}
            />
            <MGHview1

              floor="Third Floor"
              roomsDetails={mgh_p2_a.tf}
              extraThings={

                {
                  is_left: "",
                  is_mid: "Lift / Stairs ",
                  is_right: " ",
                  os_left: "Toilets",
                  os_mid: "Space ",
                  os_right: "Toilets"
                }
              }
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log('room details: ', room);
                setSelectedRoom({
                  hostelName: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no
                })


              }}
            />
            <MGHview1

              floor="Fourth Floor"
              roomsDetails={mgh_p2_a.fof}
              extraThings={

                {
                  is_left: "",
                  is_mid: "Lift / Stairs ",
                  is_right: " ",
                  os_left: "Toilets",
                  os_mid: "Space ",
                  os_right: "Toilets"
                }
              }
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log('room details: ', room);
                setSelectedRoom({
                  hostelName: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no
                })


              }}
            />
            <MGHview1

              floor="Fifth Floor"
              roomsDetails={mgh_p2_a.fif}
              extraThings={

                {
                  is_left: "",
                  is_mid: "Lift / Stairs ",
                  is_right: " ",
                  os_left: "Toilets",
                  os_mid: "Space ",
                  os_right: "Toilets"
                }
              }
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log('room details: ', room);
                setSelectedRoom({
                  hostelName: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no
                })


              }}
            /> <MGHview1

              floor="Sixth Floor"
              roomsDetails={mgh_p2_a.sif}
              extraThings={

                {
                  is_left: "",
                  is_mid: "Lift / Stairs ",
                  is_right: " ",
                  os_left: "Toilets",
                  os_mid: "Space ",
                  os_right: "Toilets"
                }
              }
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log('room details: ', room);
                setSelectedRoom({
                  hostelName: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no
                })


              }}
            /> <MGHview1

              floor="Seventh Floor"
              roomsDetails={mgh_p2_a.sef}
              extraThings={

                {
                  is_left: "",
                  is_mid: "Lift / Stairs ",
                  is_right: " ",
                  os_left: "Toilets",
                  os_mid: "Space ",
                  os_right: "Toilets"
                }
              }
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log('room details: ', room);
                setSelectedRoom({
                  hostelName: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no
                })


              }}
            /> <MGHview1

              floor="Eighth Floor"
              roomsDetails={mgh_p2_a.eif}
              extraThings={

                {
                  is_left: "",
                  is_mid: "Lift / Stairs ",
                  is_right: " ",
                  os_left: "Toilets",
                  os_mid: "Space ",
                  os_right: "Toilets"
                }
              }
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log('room details: ', room);
                setSelectedRoom({
                  hostelName: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no
                })


              }}
            /> <MGHview1

              floor="Nineth Floor"
              roomsDetails={mgh_p2_a.nif}
              extraThings={

                {
                  is_left: "",
                  is_mid: "Lift / Stairs ",
                  is_right: " ",
                  os_left: "Toilets",
                  os_mid: "Space ",
                  os_right: "Toilets"
                }
              }
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log('room details: ', room);
                setSelectedRoom({
                  hostelName: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no
                })


              }}
            /> <MGHview1

              floor="Tenth Floor"
              roomsDetails={mgh_p2_a.tef}
              extraThings={

                {
                  is_left: "",
                  is_mid: "Lift / Stairs ",
                  is_right: " ",
                  os_left: "Toilets",
                  os_mid: "Space ",
                  os_right: "Toilets"
                }
              }
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log('room details: ', room);
                setSelectedRoom({
                  hostelName: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no
                })


              }}
            />
            <UpdateButton newSelectedRoom={selectedRoom.roomID} handleClick={handleClick} />
          </Tab>

          <Tab eventKey="MGH-P-2 B Block" title="MGH-P-2 B Block" className=" ">
            <RoomStatus newSelectedRoom={selectedRoom.roomNo} hostelName={selectedHostel} />
            <MGHview1

              floor="Ground Floor"
              roomsDetails={mgh_p2_b.gf}
              extraThings={

                {
                  is_left: "",
                  is_mid: "Lift / Stairs ",
                  is_right: " ",
                  os_left: "Toilets",
                  os_mid: "Space ",
                  os_right: "Toilets"
                }
              }
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log('room details: ', room);
                setSelectedRoom({
                  hostelName: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no
                })


              }}
            />
            <MGHview1

              floor="First Floor"
              roomsDetails={mgh_p2_b.ff}
              extraThings={

                {
                  is_left: "",
                  is_mid: "Lift / Stairs ",
                  is_right: " ",
                  os_left: "Toilets",
                  os_mid: "Space ",
                  os_right: "Toilets"
                }
              }
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log('room details: ', room);
                setSelectedRoom({
                  hostelName: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no
                })


              }}
            />
            <MGHview1

              floor="Second Floor"
              roomsDetails={mgh_p2_b.sf}
              extraThings={

                {
                  is_left: "",
                  is_mid: "Lift / Stairs ",
                  is_right: " ",
                  os_left: "Toilets",
                  os_mid: "Space ",
                  os_right: "Toilets"
                }
              }
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log('room details: ', room);
                setSelectedRoom({
                  hostelName: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no
                })


              }}
            />
            <MGHview1

              floor="Third Floor"
              roomsDetails={mgh_p2_b.tf}
              extraThings={

                {
                  is_left: "",
                  is_mid: "Lift / Stairs ",
                  is_right: " ",
                  os_left: "Toilets",
                  os_mid: "Space ",
                  os_right: "Toilets"
                }
              }
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log('room details: ', room);
                setSelectedRoom({
                  hostelName: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no
                })


              }}
            />
            <MGHview1

              floor="Fourth Floor"
              roomsDetails={mgh_p2_b.fof}
              extraThings={

                {
                  is_left: "",
                  is_mid: "Lift / Stairs ",
                  is_right: " ",
                  os_left: "Toilets",
                  os_mid: "Space ",
                  os_right: "Toilets"
                }
              }
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log('room details: ', room);
                setSelectedRoom({
                  hostelName: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no
                })


              }}
            />
            <MGHview1

              floor="Fifth Floor"
              roomsDetails={mgh_p2_b.fif}
              extraThings={

                {
                  is_left: "",
                  is_mid: "Lift / Stairs ",
                  is_right: " ",
                  os_left: "Toilets",
                  os_mid: "Space ",
                  os_right: "Toilets"
                }
              }
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log('room details: ', room);
                setSelectedRoom({
                  hostelName: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no
                })


              }}
            /> <MGHview1

              floor="Sixth Floor"
              roomsDetails={mgh_p2_b.sif}
              extraThings={

                {
                  is_left: "",
                  is_mid: "Lift / Stairs ",
                  is_right: " ",
                  os_left: "Toilets",
                  os_mid: "Space ",
                  os_right: "Toilets"
                }
              }
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log('room details: ', room);
                setSelectedRoom({
                  hostelName: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no
                })


              }}
            /> <MGHview1

              floor="Seventh Floor"
              roomsDetails={mgh_p2_b.sef}
              extraThings={

                {
                  is_left: "",
                  is_mid: "Lift / Stairs ",
                  is_right: " ",
                  os_left: "Toilets",
                  os_mid: "Space ",
                  os_right: "Toilets"
                }
              }
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log('room details: ', room);
                setSelectedRoom({
                  hostelName: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no
                })


              }}
            /> <MGHview1

              floor="Eighth Floor"
              roomsDetails={mgh_p2_b.eif}
              extraThings={

                {
                  is_left: "",
                  is_mid: "Lift / Stairs ",
                  is_right: " ",
                  os_left: "Toilets",
                  os_mid: "Space ",
                  os_right: "Toilets"
                }
              }
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log('room details: ', room);
                setSelectedRoom({
                  hostelName: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no
                })


              }}
            /> <MGHview1

              floor="Nineth Floor"
              roomsDetails={mgh_p2_b.nif}
              extraThings={

                {
                  is_left: "",
                  is_mid: "Lift / Stairs ",
                  is_right: " ",
                  os_left: "Toilets",
                  os_mid: "Space ",
                  os_right: "Toilets"
                }
              }
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log('room details: ', room);
                setSelectedRoom({
                  hostelName: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no
                })


              }}
            /> <MGHview1

              floor="Tenth Floor"
              roomsDetails={mgh_p2_b.tef}
              extraThings={

                {
                  is_left: "",
                  is_mid: "Lift / Stairs ",
                  is_right: " ",
                  os_left: "Toilets",
                  os_mid: "Space ",
                  os_right: "Toilets"
                }
              }
              newSelectedRoom={selectedRoom.roomID}
              changeSelectedRoom={(room) => {
                ////console.log("gvvvv");
               //console.log('room details: ', room);
                setSelectedRoom({
                  hostelName: "BH-7EMGH-P-2 A Block",
                  roomID: room.id,
                  roomNo: room.no
                })


              }}
            />
            <UpdateButton newSelectedRoom={selectedRoom.roomID} handleClick={handleClick} />
          </Tab>


        </Tabs></div> </div>
  );
}

export default Allhostels;
