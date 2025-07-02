import React, { useEffect, useState } from "react";
import EditForm from "./EditForm";
import { useSession } from "../ProtectedPath/SessionContext";
import axiosInstance from "../../Helper/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import EditDocs from "./EditDocs";
import { Captcha } from "../../components/CAPTACH/Captcha";
import { Alert } from "@mui/material";

export default function SelfVerificationTable() {
  const [verified, setVerified] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);

  const [isChecked, setIsChecked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingForm, setEditingForm] = useState(true);

  const [studentData, setStudentData] = useState({});
  const [documents, setDocuments] = useState({});

  const handleCheckboxChange = () => {
    setShowCaptcha(!showCaptcha);
    setIsChecked(!isChecked);
  };
  const sendToCaptchaForValidation = (e) => {
    setVerified(e);
  };

  const { updateSession, session } = useSession();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!isChecked) {
      window.alert("Please Accept the undertaking.");
    }
    if (isChecked) {
      var f = 0;
      if (flag !== studentData) {
        f = 1;
      }
      var data = {
        code: session.code,
        flag: f,
        studentData: studentData,
        rollno: session?.roll,
      };

      //console.log('data to be sent', data);
      try {
        let url = (session?.sem === '1') ? `/first_year_self_verification_edit.php` : `/self_verification_edit.php`;

        let res = axiosInstance.post(url, data);
        await toast.promise(res, {
          loading: "Submitting...",
          success: (data) => {
            ////console.log(data?.data);
            return data?.data?.message;
          },
          error: (data) => {
            //console.log(data);
            return data?.response?.data.message;
            setVerified(false);
            setShowCaptcha(true);
          },
        });
        res = await res;
        //console.log('res ka data', res?.data);
        if (res?.data?.status === "success") {
          updateSession({
            stepIndex: res?.data?.step,
            step: res?.data?.step,
            self_verification: 1,
          });
        }
      } catch (error) {
        console.error("Error revoking request.", error);
        setVerified(false);
        setShowCaptcha(true);
      }
    }
  };

  var flag = {};

  const handleEdit = () => {
    const userConfirmed = window.confirm(
      `Please make sure after editing, you must click on "Save and Proceed" to save your changes.`
    );
    if (userConfirmed) {
      flag = studentData;
      setEditingForm(true);
      setIsEditing(true);
    }
  };

  //self_verification_edit.php
  const getData = async () => {
    const data = {
      code: session?.code,
      rollno: session?.roll,
    };
    try {
      let url = (session?.sem === '1') ? `/first_year_self_verification.php` : `/self_verification.php`;

      let res = axiosInstance.post(url, data);
      await toast.promise(res, {
        loading: "Loading...",
        success: (data) => {
          ////console.log(data?.data);
          return data?.data?.message;
        },
        error: (data) => {
          //console.log(data);
          setVerified(false);
          setShowCaptcha(true);
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
        setDocuments(res?.data?.documents);
        if (res?.data?.step && (session?.step != res?.data?.step)) {
          updateSession({ step: res?.data?.step });
        }
      }
    } catch (error) {
      console.error("Error revoking request.", error);
      setVerified(false);
      setShowCaptcha(true);
    }
  };

  const handleEditDoc = () => {
    setVerified(false);
    setShowCaptcha(true);
    setEditingForm(false);
    setIsEditing(true);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {isEditing ? (
        editingForm ? (
          <EditForm
            studentData={studentData}
            setStudentData={setStudentData}
            setIsEditing={setIsEditing}
          />
        ) : (
          <EditDocs setIsEditing={setIsEditing} />
        )
      ) : (
        <>
          {" "}
          <div className="my-10 mx-auto md:w-2/3">
            <div className="container w-full py-4">
              <div className="rounded-lg border-blue-600 border-1 shadow-md p-3 md:p-6">
                <div className="mb-4">
                  <div className="font-bold mx-auto text-lg text-center">
                    Self Verification
                  </div>
                </div>
                <hr className="my-2 border-t border-blue-900" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                  {Object.keys(studentData).map((key) => (
                    <div key={key} className="mx-4 mb-4 text-left">
                      <span className="font-bold">
                        {key
                          .replace("_", " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                        :
                      </span>{" "}
                      {studentData[key]}
                    </div>
                  ))}
                  {/* {Object.keys(documents).map((key) => (
                  <div key={key} className="mb-4">
                    <span className="font-bold w-48">
                      {key
                        .replace("_", " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                      :
                    </span>
                    <a
                      href={`https://nitj.in/${documents[key]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Document
                    </a>
                  </div>
                ))} */}
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={handleEdit}
                    className="mr-4 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Edit Personal Details
                  </button>
                </div>
                <div className="flex justify-center flex-col mt-5">
                  <h1 className="text-center text-red-700">
                    If you are not Sure about your documents you can re-upload
                    here.
                  </h1>
                  <button
                    onClick={handleEditDoc}
                    className=" px-4 py-2 mx-[38%] w-42 mt-5 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Re-upload Documents
                  </button>
                </div>
                <div className="flex flex-col items-center mt-4">
                  <div className="flex flex-col mt-4">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="agreement"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        className="mr-3 mt-1 ml-1"
                      />
                      <label htmlFor="agreement" className="text-lg">
                        I hereby confirm that all the details filled and
                        uploaded by me are true and accurate to the best of my
                        knowledge. I understand that providing false or
                        misleading information may result in disciplinary
                        actions, including but not limited to cancellation of
                        hostel allotment, or other administrative penalties as
                        per the institution's policies.
                      </label>
                    </div>
                  </div>

                  <div className="w-1/2 m-auto">
                    {verified && (
                      <Alert variant="outlined" sx={{ marginBottom: "10px" }}>
                        Captcha Validated Successful
                      </Alert>
                    )}
                  
                      <Captcha
                        setVerification={sendToCaptchaForValidation}
                        setShowCaptcha={setShowCaptcha}
                      />
                 
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={!verified}
                    className={`mt-4 px-4 py-2 rounded ${
                      verified
                        ? "bg-blue-600 text-white"
                        : "bg-gray-400 text-gray-700 cursor-not-allowed"
                    }`}
                  >
                    Save and Proceed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
