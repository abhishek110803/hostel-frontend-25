import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../../Helper/axiosInstance";
import toast from "react-hot-toast";
import { useSession } from "../ProtectedPath/SessionContext";

export default function SelfVerificationTable() {
  const [isChecked, setIsChecked] = useState(false);
  const [studentData, setStudentData] = useState({});
  const { session } = useSession();
  const formRef = useRef(null);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = () => {
    if (isChecked) {
      formRef.current.submit();
    }
  };

  const flattenObject = (obj, parentKey = '', result = {}) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let newKey = key;
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          flattenObject(obj[key], newKey, result);
        } else {
          result[newKey] = obj[key];
        }
      }
    }
    return result;
  };
  const base_url = `${import.meta.env.VITE_BASE_URL}`;

  const getConfirmationData = async () => {
    const url = '/get_confirmation_details.php';
    try {
      let res = axiosInstance.post(url, { code: session.code });
      await toast.promise(res, {
        loading: "Fetching data for you.",
        success: (data) => data?.data?.message,
        error: (data) => data?.response?.data.message,
      });

      res = await res;

      if (res?.data?.status === "success") {
        setStudentData(flattenObject(res?.data?.data));
      }
    } catch (error) {
      console.error("Error accepting request.", error);
    }
  };

  useEffect(() => {
    getConfirmationData();
  }, []);

  return (
    <>
      <div className="my-10 mx-auto md:w-2/3">
        <div className="container w-full py-4">
          <div className="rounded-lg border-blue-600 border-1 shadow-md p-3 md:p-6">
            <div className="mb-4">
              <div className=" font-bold mx-auto text-lg text-center">
                Final Verification
              </div>
            </div>
            <hr className="my-2 border-t border-blue-900" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              {Object.keys(studentData).map((key) => (
                <div key={key} className="m-4 mt-4 text-left">
                  <span className="font-bold">
                    {key.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())} :
                  </span>
                  {studentData[key]}
                </div>
              ))}
            </div>
            <hr className="my-2 border-t border-blue-900" />
            <div className="flex flex-col items-center mt-4">
              <div>
                <input
                  type="checkbox"
                  id="agreement"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label htmlFor="agreement" className="text-lg">
                  I agree to the terms and conditions
                </label>
              </div>
              <button
                onClick={handleSubmit}
                disabled={!isChecked}
                className={`mt-4 px-4 py-2 rounded ${isChecked ? "bg-blue-600 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
              >
                Download Hostel form
              </button>
            </div>
          </div>
        </div>
      </div>
       {session.underTaking === true ? <form ref={formRef}
        action= {`${base_url}hoste_form.php`}
        // action="http://localhost/Updated_Backend_Hostels_Allotment/single_undertaking.php" 
        method="post" target="_blank" style={{ display: 'none' }}>
        <input type="hidden" name="rollno" value={session?.application_id} />
      </form> :
        <form ref={formRef}
          action={`${base_url}undertaking.php`}
          // action="http://localhost/Updated_Backend_Hostels_Allotment/undertaking.php" 
          method="post" target="_blank" style={{ display: 'none' }}>
          <input type="hidden" name="rollno" value={session?.application_id} />
        </form>}

      {/* <form ref={formRef}
        // action="https://v1.nitj.ac.in/hostelsNITJ/hostel_form.php"
        // action="http://localhost/hostel-php-first-year/hostel_form.php"
        action="https://v1.nitj.ac.in/hostel-php-first-year-main/hostel_form.php"
        method="post" target="_blank" style={{ display: 'none' }}>
        <input type="hidden" name="application_id" value={session?.application_id} />
      </form> */}
    </>
  );
}
