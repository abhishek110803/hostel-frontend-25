import React, { useEffect, useState } from "react";
import Steps from "../../components/Steps/Steps";
import StepProcessBar from "../../components/StepProcessBar/StepProcessBar";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../components/ProtectedPath/SessionContext";
import toast from "react-hot-toast";
import axiosInstance from "../../Helper/axiosInstance";

const RoomMate = () => {
  const navigate = useNavigate();
  const { session, updateSession, getRequest } = useSession();

  const [newStudent, setNewStudent] = useState({ rollNo: "" });
  const [request, setRequest] = useState(null);
  const [roommate, setRoommate] = useState(null);


  useEffect(() => {
    // getRequest();
    if (session) {
      setRequest(session?.request);
      setRoommate(session?.roommate)
    }

  }, [session]);

  // dummy request data
  // const dummyRequest = { sno: 1, rollNo: "21103001", status: "Revoked requested", colorClass: "text-red-500", requester: '12345678' };

  // const getRequest = async () => {
  //   if (!session) {
  //     toast.error("Please sign in first");
  //     navigate("/SignIn");
  //     return;
  //   }

  //   try {
  //     let res = axiosInstance.post('/get_roommate.php', { rollno: session?.roll });
  //     await toast.promise(res, {
  //       loading: "Fetching data.",
  //       success: (data) => {
  //         ////console.log(data?.data);
  //         return data?.data?.message;
  //       },
  //       error: (data) => {
  //         ////console.log(data?.response?.data);
  //         return data?.response?.data.message;
  //       },
  //     });
  //     res = await res;
  //    //console.log('res ka data', res?.data);
  //     if (res?.data?.status === "success") {
  //       if (res?.data?.flag !== '1') {
  //         setRoommate((await res)?.data?.roommate);

  //         const newRequest = {
  //           rollNo: res?.data?.roommate?.rollno,
  //           email: res?.data?.roommate?.email,
  //           status: res?.data?.request_status,
  //           requester: res?.data?.requester,
  //         };

  //         setRequest(newRequest);

  //         if (res?.data?.revoke_details?.revoke_requester === session.roll) {
  //           setRequest((prevRequest) => ({
  //             ...prevRequest,
  //             status: "Requested for revoke",
  //           }));
  //         } else if (res?.data?.revoke_details?.revoke_accepter === session.roll) {
  //           setRequest((prevRequest) => ({
  //             ...prevRequest,
  //             status: "Revoked requested",
  //           }));
  //         }

  //        //console.log('my request', newRequest);

  //         if (newRequest.status === "Accepted") {
  //          //console.log('hiihihi')
  //           updateSession({ stepIndex: 3, roommate_select: 1 });
  //          //console.log('session is', session);
  //           // updateSession({ roommate_select: 1 });
  //         }
  //       } else {
  //         setRequest(null);
  //         setRoommate(null);
  //       }

  //     }
  //   } catch (error) {
  //     console.error("Error fetching data.", error);
  //   }
  // };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleAddStudent = async () => {
    if (!newStudent.rollNo) {
      alert("Please fill in the Roll No.");
      return;
    }

    try {
      let res = axiosInstance.post(`/add_roommate.php`, {
        rollno: session.roll,
        requested_rollno: newStudent.rollNo,
      });
      await toast.promise(res, {
        loading: "Registering your request.",
        success: (data) => {
         //console.log(data?.data);
          return data?.data?.message;
        },
        error: (data) => {
         //console.log(data);
          return data?.response?.data.message;
        },
      });

      res = await res;

     //console.log('yy:', res.data)

      if (res?.data?.status === "success") {
        setNewStudent({ rollNo: "" });
        getRequest();
      }

    } catch (error) {
      console.error("Error sending request.", error);
    }

    return;
  };

  const handleRevokeRequest = async () => {
    const data = {
      // rollno: session.roll,
      rollno: session.roll,
      requested_rollno: request.rollNo,
    };
    try {
      let res = axiosInstance.post(`/revoke_roommate.php`, data);
      await toast.promise(res, {
        loading: "Registering your request.",
        success: (data) => {
         //console.log(data?.data);
          return data?.data?.message;
        },
        error: (data) => {
         //console.log(data);
          return data?.response?.data.message;
        },
      });
      res = await res;
      if (res?.data?.status === "success") {
        setRequest(null);
        setRoommate(null);
        getRequest();
        updateSession({ stepIndex: 3 });
        updateSession({ roommate_select: 0 });
      }

    } catch (error) {
      console.error("Error revoking request.", error);
    }
  };

  const handleRequestedRevokeRequest = async () => {
    const data = {
      // rollno: session.roll,
      rollno: request.rollNo,
      requested_rollno: session.roll,
    };

   //console.log('datda-akdjfbas', data);
    try {
      let res = axiosInstance.post(`/accept_revokeRequest.php`, data);
      await toast.promise(res, {
        loading: "Registering your request.",
        success: (data) => {
         //console.log(data?.data);
          return data?.data?.message;
        },
        error: (data) => {
         //console.log(data);
          return data?.response?.data.message;
        },
      });
      res = await res;
      if (res?.data?.status === "success") {
        setRequest(null);
        setRoommate(null);
        getRequest();
        updateSession({ stepIndex: 3 });
        updateSession({ roommate_select: 0 });
      }

    } catch (error) {
      console.error("Error revoking request.", error);
    }
  };

  const handleAcceptRequest = async (event) => {
    event.preventDefault();
    const userConfirmed = window.confirm(
      "Please make sure you chosen right roommate. In the future, you will not be able to update this. Do you want to proceed?"
    );
    if (userConfirmed) {
      try {
        let res = axiosInstance.post(`/accept_roommate.php`, { rollno: session.roll });
        await toast.promise(res, {
          loading: "Registering your request.",
          success: (data) => {
           //console.log(data?.data);
            return data?.data?.message;
          },
          error: (data) => {
           //console.log(data);
            return data?.response?.data.message;
          },
        });

        res = await res;

       //console.log('ahbfadf', res?.data);

        if (res?.data?.status === "success") {
          setRequest(null);
          setRoommate(null);
          getRequest();
          updateSession({ stepIndex: 4, roommate_select: 1 });
          navigate('/Allotment')
        }

      } catch (error) {
        console.error("Error accepting request.", error);
      }
    } else {
      toast("Please review and update your roommate request if needed.");
    }

  };

  const handleRejectRequest = async () => {
    try {
      let res = axiosInstance.post(`/reject_roommate.php`, { rollno: session.roll });
      await toast.promise(res, {
        loading: "Registering your request.",
        success: (data) => {
         //console.log(data?.data);
          return data?.data?.message;
        },
        error: (data) => {
         //console.log(data);
          return data?.response?.data.message;
        },
      });
      res = await res;
     //console.log('apna data', res?.data)
      if (res?.data?.status === "success") {
        getRequest();
      } else {
       //console.log('sdhbfhsidbhbshdb')
      }
    } catch (error) {
      console.error("Error rejecting request.", error);
    }
  };

  const [error, setError] = useState("");

  const handleAddClick = () => {
    if (!newStudent.rollNo) {
      setError("Roll number is required.");
      return;
    } else if (!/^\d{8}$/.test(newStudent.rollNo)) {
      setError("Roll number must be exactly 8 digits.");
      return;
    }

    ////console.log(newStudent.rollNo, session.roll);
    if (newStudent.rollNo === session.roll) {
      setError(`You can't send invitation to your self.`);
      return;
    }

    setError("");
    handleAddStudent();
  };


  const handleInputBlur = () => {
    if (error && newStudent.rollNo && /^\d{8}$/.test(newStudent.rollNo)) {
      setError("");
    }
  };

  return (
    <>
      <Steps />
      <div className="hidden md:block">
        <StepProcessBar />
      </div>
      <div className="container mx-auto p-4 my-10">
        {/* <button
          onClick={() => navigate(-1)}
          className="absolute left-12 text-blue-500 hover:text-blue-800 focus:outline-none"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button> */}
        <h1 className="text-2xl font-bold mb-4 text-center">RoomMate Details</h1>

        {(request === null) ? (


          <div className="w-full md:w-1/2 mb-4 md:mb-0 p-2 mx-auto">
            <div className="mb-4 text-center">
              <div className="p-4 border-1 border-gray-300 rounded-md shadow-lg max-w-md mx-auto bg-white">
                <h2 className="text-xl font-bold mb-4">Enter roommates roll number to invite</h2>
                <form onSubmit={(e) => { e.preventDefault() }} method="POST">
                  <div className="grid grid-cols-1 gap-2 sm:gap-4">
                   


                   
                    <input
                      type="text"
                      name="rollNo"
                      value={newStudent.rollNo}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      placeholder="Enter Roll No."
                      className="p-3 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500 text-sm sm:text-base"
                    />


                     

                    {error && (
                      <p className="text-red-500 text-xs sm:text-sm italic">{error}</p>
                    )}
                    <button
                      onClick={handleAddClick}
                      type="submit"
                      className="p-3 bg-blue-500 text-white rounded w-full hover:bg-blue-600 focus:outline-none shadow-md"
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>


        ) : (


          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 p-2">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h2 className="text-lg font-bold mb-2">Request</h2>
                <p className="mb-2">Roll No: {request?.rollNo}</p>
                <p className={`mb-4 ${request?.colorClass}`}>Status: {request?.status}</p>
                <div className="flex space-x-2">


                  {request?.status === "Pending" && ((request.requester === session.roll) ? ( //means he is the sender
                    <>
                      <button
                        onClick={() => handleRevokeRequest()}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Revoke
                      </button>
                    </>
                  ) : (<>
                    {/* means current student is receiver */}
                    <button
                      onClick={(event) => handleAcceptRequest(event)}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleRejectRequest()}
                      className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                      Reject
                    </button>
                  </>))}



                  {request?.status === "Accepted" && (
                    <button
                      onClick={() => handleRevokeRequest()}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Revoke
                    </button>
                  )}




                  {request?.status === "Revoked requested" && (
                    <button
                      onClick={() => handleRequestedRevokeRequest()}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Accept Revoke
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div >


        )}
      </div >
    </>
  );
};

export default RoomMate;
