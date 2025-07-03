import React, { useEffect, useState } from "react";
import Popup from "./Popup.jsx";
import BackButton from "../../components/General/BackButton.jsx";
import axiosInstance from "../../Helper/axiosInstance.js";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const Sdtdet = () => {
  const navigate = useNavigate(-1);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupData, setPopupData] = useState({});

  const [studentData, setStudentData] = useState({});
  const [documents, setDocuments] = useState({});

  const { rollno } = useParams();

  const handleRaiseIssue = () => {
    setPopupData({
      roll_number: studentData.roll_number,
      name: studentData.name,
    });
    setIsPopupVisible(true);
  };

  //self_verification_edit.php
  const getData = async () => {
    try {
      let res = axiosInstance.post(`/self_verification.php`, { rollno });
      await toast.promise(res, {
        loading: "Loading...",
        success: (data) => {
          console.log(data?.data);
          return data?.data?.message;
        },
        error: (data) => {
          console.log(data);
          return data?.response?.data.message;
        },
      });
      res = await res;
      if (res?.data?.status === "success") {
        var student = res?.data?.studentData;
        delete student.sno;
        delete student.timestamp;
        delete student.uploaded;
        delete student.self_verified;

        var doc = res?.data?.documents;
        delete doc.sno;
        delete doc.timestamp;
        delete doc.uploaded;
        delete doc.rollno;
        delete doc.clerk_verified;

        //console.log('res ka data', res?.data);
        setStudentData(student);
        setDocuments(doc);
      }
    } catch (error) {
      console.error("Error revoking request.", error);
    }
  };

  const setVerify = async () => {
    try {
      let res = axiosInstance.post(`/verify_students_details.php`, { rollno });
      await toast.promise(res, {
        loading: "Verifying...",
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
      //console.log('res ka data', res?.data);

      if (res?.data?.status === "success") {
        setStudentData({ ...studentData, clerk_verified: "Verified" });

        // navigate("/DocumentVerification");
      }
    } catch (error) {
      console.error("Error revoking request.", error);
    }
  };

  const handleVerify = () => {
    setVerify();
  };
  useEffect(() => {
    getData();
  }, []);

  const base_url = `${import.meta.env.VITE_BASE_URL}`;

  return (
    <div className="mx-auto md:w-2/3">
      <div className="container w-full py-4">
        <div className="">
          <div className="rounded-lg border-blue-600 border-1 shadow-md p-6">
            <div className="mb-4">
              <div className="w-1/4 font-bold mx-auto text-lg">
                <BackButton />
                Student Information
              </div>

              
            </div>
            <hr className="my-2 border-t border-blue-900" />
            <div className="grid grid-cols-2 gap-1">
              {Object.entries(studentData).map(([key, value]) => (
                <div className="mb-4" key={key}>
                  <span className="font-bold capitalize">
                    {key.replace(/_/g, " ")}:
                  </span>{" "}
                  {value}
                </div>
              ))}
              {Object.entries(documents).map(([key, value]) => (
                <div className="mb-4" key={key}>
                  <span className="font-bold capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}:
                  </span>
                  <a
                    href={base_url + value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline ml-2"
                  >
                    View Document
                  </a>
                </div>
              ))}
            </div>
            <div className="flex flex-row justify-around items-center mt-4">
              <div className="flex justify-around w-3/6">
                {!studentData.clerk_verified && (
                  <button
                    onClick={handleVerify}
                    className="mt-4 px-4 py-2 rounded bg-blue-600 text-white"
                  >
                    Verify
                  </button>
                )}
                <button
                  onClick={handleRaiseIssue}
                  className="mt-4 px-4 py-2 rounded bg-blue-600 text-white"
                >
                  Raise Issue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isPopupVisible && <Popup setPopup={setIsPopupVisible} rollno={rollno} />}
    </div>
  );
};

export default Sdtdet;
