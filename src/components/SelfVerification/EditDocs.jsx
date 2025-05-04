import React, { useState } from "react";
import axiosInstance from "../../Helper/axiosInstance";
import toast from "react-hot-toast";
import { useSession } from "../../components/ProtectedPath/SessionContext";
import { ArrowLeftIcon } from "@heroicons/react/solid";

const EditDocs = ({
  setIsEditing,
}) => {
  const [formData, setFormData] = useState(new FormData());
  const [fileURLs, setFileURLs] = useState({
    hostelReceipt: null,
    messAdvance: null,
    aadhaar: null,
    photos: null,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const userConfirmed = window.confirm(
      "Please make sure your files are uploaded correctly. In the future, you will not be able to update this. Do you want to proceed?"
    );
    if (userConfirmed) {
      sendForm();
    } else {
      toast("Please review and update your files if needed.");
    }
  };


  const handleFileChange = (event) => {
    const { name, files } = event.target;
    if (files.length > 0 && files[0].size > 500000) {
      toast.error("File size exceeds 500KB limit");
      return;
    }
    if (files.length > 0) {
      formData.set(name, files[0]);
      setFormData(formData);
      const fileURL = URL.createObjectURL(files[0]);
      setFileURLs((prevURLs) => ({ ...prevURLs, [name]: fileURL }));
    }
  };

  const { session } = useSession();

  const sendForm = async () => {
    formData.set('code', session.code);

    try {
      let res = axiosInstance.post(`/upload_doc_insert.php`, formData);

      await toast.promise(res, {
        loading: "Updating.",
        success: (data) => {
          console.log('Success response data:', data);
          return data?.data?.message;
        },
        error: (data) => {
          console.log('Error response data:', data);
          return data?.response?.data.message;
        },
      });

      res = await res;
      //console.log('Response after toast promise:', res?.data);

      if (res?.data?.status === "success") {
        setIsEditing(false);
      }

    } catch (error) {
      console.error("Error uploading form:", error);
    }
  };


  return (
    <>

      <div className="flex justify-center align-center mb-2">

        <section className="bg-white w-full lg:w-2/3 h-full">

          <div className="flex items-center justify-center px-2 py-4 mt-4 md:h-screen lg:py-0">
            <div className="w-full">

              <h1 className="text-xl font-bold leading-tight tracking-tight text-blue-600 md:text-2xl ml-4 mb-4 text-center">
                Please Upload the all again:
              </h1>
              <div className="rounded-lg shadow-2xl border-2 border-blue-600 bg-gray-100 p-6">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <button
                  
                    className=" text-blue-600 hover:text-blue-800 focus:outline-none"
                  >
                    <ArrowLeftIcon className="h-6 w-6" />
                    
                  </button>

                  <form
                    encType="multipart/form-data"
                    className="space-y-4 md:space-y-6"
                    action=""
                    method="POST"
                    onSubmit={handleSubmit}
                  >
                    <div className="space-y-4">
                      <div className="w-full">
                        <label
                          htmlFor="hostel-receipt"
                          className="block mb-2 text-m font-medium text-black"
                        >
                          1. Institute Fee Receipt
                        </label>
                        <div className="flex flex-col md:flex-row items-center">
                          <input
                            type="file"
                            id="hostel-receipt"
                            name="hostelReceipt"
                            accept=".pdf"
                            className="bg-white border mb-2 border-red-500 text-blue-900 sm:text-m rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            onChange={handleFileChange}
                            required
                          />
                          {fileURLs.hostelReceipt && (
                            <a
                              href={fileURLs.hostelReceipt}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline ml-2"
                            >
                              View
                            </a>
                          )}
                        </div>
                        <small className="block text-red-500 mt-1">
                          Note: Receipt should be in PDF format only, size not
                          more than 500Kb.
                        </small>
                      </div>

                      <div className="w-full">
                        <label
                          htmlFor="mess-receipt"
                          className="block mb-2 text-m font-medium text-black"
                        >
                          2. Mess Advance Receipt (July to Dec-2024)
                          <small className="text-red-600 text-2xl ">*</small>
                        </label>
                        <div className="flex flex-col md:flex-row items-center">
                          <input
                            type="file"
                            id="mess-receipt"
                            name="messAdvance"
                            accept=".pdf"
                            className="bg-white border mb-2 border-red-500 text-blue-900 sm:text-m rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            onChange={handleFileChange}
                            required
                          />
                          {fileURLs.messAdvance && (
                            <a
                              href={fileURLs.messAdvance}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline ml-2"
                            >
                              View
                            </a>
                          )}
                        </div>
                        <small className="block text-red-500 mt-1">
                          Note: Receipt should be in PDF format only, size not
                          more than 500Kb.
                        </small>
                      </div>

                      <div className="w-full">
                        <label
                          htmlFor="aadhar-card"
                          className="block mb-2 text-m font-medium text-black"
                        >
                          3. Student's Aadhar Card (Self attested)
                          <small className="text-red-600 text-2xl ">*</small>
                        </label>
                        <div className="flex flex-col md:flex-row items-center">
                          <input
                            type="file"
                            name="aadhaar"
                            accept=".pdf"
                            className="bg-white  mb-2 border border-red-500 text-blue-900 sm:text-m rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            onChange={handleFileChange}
                            required
                          />
                          {fileURLs.aadhaar && (
                            <a
                              href={fileURLs.aadhaar}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline ml-2"
                            >
                              View
                            </a>
                          )}
                        </div>
                        <small className="block text-red-500 mt-1">
                          Note: Receipt should be in PDF format only, size not
                          more than 500Kb.
                        </small>
                      </div>

                      <div className="w-full">
                        <label
                          htmlFor="passport-photo"
                          className="block mb-2 text-m font-medium text-black"
                        >
                          4. Student's Passport Size photo
                          <small className="text-red-600 text-2xl ">*</small>
                        </label>
                        <div className="flex flex-col md:flex-row items-center">
                          <input
                            type="file"
                            id="passport-photo"
                            name="photos"
                            accept=".jpg"
                            className="bg-white mb-2 border border-red-500 text-blue-900 sm:text-m rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            onChange={handleFileChange}
                            required
                          />
                          {fileURLs.photos && (
                            <a
                              href={fileURLs.photos}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline ml-2"
                            >
                              View
                            </a>
                          )}
                        </div>
                        <small className="block text-red-500 mt-1">
                          Note: Photo should be in image format only, size not
                          more than 500Kb.
                        </small>
                      </div>
                    </div>
                    <div className="flex items-center justify-center mt-6">
                      <button
                        type="submit"
                        className="text-white bg-blue-600 hover:bg-blue-700 flex items-center justify-center w-full md:w-1/3 py-3 px-4 border rounded-md focus:ring-2 focus:ring-offset-1 border-red-500 hover:border-blue-400 focus:ring-blue-400"
                      >
                        Save & Update
                      </button>
                    </div>

                  </form>


                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default EditDocs;
