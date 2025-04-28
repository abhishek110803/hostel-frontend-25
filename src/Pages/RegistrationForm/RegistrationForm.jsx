import React, { useState } from "react";
import axiosInstance from "../../Helper/axiosInstance";
import toast from "react-hot-toast";
import Steps from "../../components/Steps/Steps";
import { useNavigate } from "react-router-dom";
import StepProcessBar from "../../components/StepProcessBar/StepProcessBar";
import ProcessBar from "../../components/StepProcessBar/ProcessBar";
import FirstYear from "../../components/StepProcessBar/FirstYearProcessBar";
import { useSession } from "../../components/ProtectedPath/SessionContext";
import { Captcha } from "../../components/CAPTACH/Captcha";
import { Alert } from "@mui/material";
const RegistrationForm = () => {
  const [verified, setVerified] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(true);


  const { session, updateSession } = useSession();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    application_id: session?.application_id,
    father_name: "",
    mother_name: "",
    branch: "",
    physically_handicapped: "",
    gender: "",
    blood_group: "",

    email: '',
    year: '1',
    course: '',
    sem: '1',
    self_mobile: "",
    father_mobile: "",
    mother_mobile: "",
    sibling_mobile: "",
    guardian_mobile: "",

    postal_address: "",
    state: "",
    local_guardian_address: "",

    code: session.code,
  });
  const sendToCaptchaForValidation = (e) => {
    setVerified(e);
  };

  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validateForm = () => {
    const newErrors = {};
    const mobileNumberPattern = /^\d{10}$/;
    // const emailPattern = /^[a-zA-Z0-9._%+-]+@nitj\.ac\.in$/;
    if (!formData.full_name) {
      newErrors.name = "Full Name is required";
      setVerified(false);
      setShowCaptcha(true);
    }
    // if (!formData.application_id) newErrors.application_id = "Roll No is required";
    if (!formData.father_name) {
      newErrors.father = "Father's Name is required";
      setVerified(false);
      setShowCaptcha(true);
    }
    if (!formData.mother_name) {

      newErrors.mother = "Mother's Name is required";
      setVerified(false);
      setShowCaptcha(true);
    }
    if (!formData.branch) {
      setVerified(false);
      setShowCaptcha(true);
      newErrors.branch = "Branch is required";
    }
    if (!formData.course) {
      setVerified(false);
      setShowCaptcha(true);
      newErrors.course = "Course is required";
    }
    if (!formData.sem) {
      setVerified(false);
      setShowCaptcha(true);
      newErrors.sem = "Sem is required";
    }
    if (!formData.physically_handicapped) {

      setVerified(false);
      setShowCaptcha(true);

      newErrors.physically_handicapped = "Please select an option";
    }
    if (!formData.blood_group) {
      setVerified(false);
      setShowCaptcha(true);
      newErrors.blood_group = "Blood Group is required";
    }
    if (!formData.gender) {
      setVerified(false);
      setShowCaptcha(true);
      newErrors.gender = "Gender is required";
    }

    if (!formData.self_mobile) {
      setVerified(false);
      setShowCaptcha(true);
      newErrors.self_mobile = "Mobile No is required";
    } else if (!mobileNumberPattern.test(formData.self_mobile)) {
      setVerified(false);
      setShowCaptcha(true);
      newErrors.self_mobile = "Mobile No must be exactly 10 digits";
    }
    if (!formData.father_mobile) {
      setVerified(false);
      setShowCaptcha(true);
      newErrors.father_mobile = "Father's Mobile No is required";
    } else if (!mobileNumberPattern.test(formData.father_mobile)) {
      setVerified(false);
      setShowCaptcha(true);
      newErrors.father_mobile = "Father's Mobile No must be exactly 10 digits";
    }
    if (!formData.mother_mobile) {
      setVerified(false);
      setShowCaptcha(true);
      newErrors.mother_mobile = "Mother's Mobile No is required";
    } else if (!mobileNumberPattern.test(formData.mother_mobile)) {
      setVerified(false);
      setShowCaptcha(true);
      newErrors.mother_mobile = "Mother's Mobile No must be exactly 10 digits";
    }
    if (!formData.sibling_mobile) {
      setVerified(false);
      setShowCaptcha(true);
      newErrors.sibling_mobile = "Sibling's Mobile No is required";
    } else if (!mobileNumberPattern.test(formData.sibling_mobile)) {
      setVerified(false);
      setShowCaptcha(true);
      newErrors.sibling_mobile =
        "Sibling's Mobile No must be exactly 10 digits";
    }
    if (!formData.guardian_mobile) {
      setVerified(false);
      setShowCaptcha(true);
      newErrors.guardian_mobile = "Local Gaurdian's Mobile No is required";
    } else if (!mobileNumberPattern.test(formData.guardian_mobile)) {
      setVerified(false);
      setShowCaptcha(true);
      newErrors.guardian_mobile =
        "Local Gaurdian's Mobile No must be exactly 10 digits";
    }
    if (!formData.postal_address) {
      setVerified(false);
      setShowCaptcha(true);

      newErrors.address = "Address is required";
    }
    if (!formData.state) {
      setVerified(false);
      setShowCaptcha(true);
      newErrors.state = "State is required";
    }
    if (!formData.local_guardian_address) {
      setVerified(false);
      setShowCaptcha(true);

      newErrors.local_guardian_address = "Local Guardian Address is required";
    }
    //console.log(newErrors);
    return newErrors;
  };

  const sendForm = async () => {
    //console.log('form data',formData);
    delete formData.application_id;
    try {
      let res = axiosInstance.post(`/application_form_insert.php`, formData);
      await toast.promise(res, {
        loading: "Submitting Form.",
        success: (data) => {
          //console.log(data?.data);
          return data?.data?.message;
        },
        error: (data) => {
          //console.log(data?.response?.data);
          return data?.response?.data.message;
          setVerified(false);
          setShowCaptcha(true);
        },
      });
      res = await res;
      //console.log(res?.data?.status === "success");
      if (res?.data?.status === "success") {
        // setSession(res.data.user);
        updateSession({ stepIndex: 3});
        navigate("/DocumentUpload");
      }
    } catch (error) {
      setVerified(false);
      setShowCaptcha(true);
      console.error("Error Submitting form.", error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    // Submit form logic here
    sendForm();
  };

  return (
    <>
      <Steps />
      <div className=" hidden md:block">
        {/* {
          (session.isSingle === false) ?
            <StepProcessBar /> :
            <>
              <ProcessBar />
              <FirstYear />
            </>
        } */}

        {(session?.sem === '1') ? <FirstYear /> : <StepProcessBar/>}

      </div>
      <div className="flex justify-center align-center  md:h-min-screen md:py-8 md:px-4 md:lt-sm:mt-0">
        <section className="bg-white w-full h-full my-2">
          <div className="text-xl font-bold leading-tight tracking-tight mb-4 md:text-3xl text-blue-800  flex justify-center">
            <h1>Application Form</h1>
          </div>
          <div className="flex items-center justify-center px-1 py-1 ">
            <div className="w-full rounded-lg shadow border md:mt-0 xl:p-0 bg-white-100 border-blue-700">
              <div className="rounded-lg shadow-2xl bg-gray-100 p-6 space-y-4 md:space-y-6 sm:p-8 border-blue-600 border-2">
                <form
                  className="space-y-4 md:space-y-6 border-blue-600"
                  onSubmit={handleSubmit}
                >
                  <div className="block mb-2 bg-slate-200 p-3 pt-2 rounded-lg">
                    <h4 className="text-xl font-bold leading-tight tracking-tight md:text-xl text-black mb-3">
                      Personal Details
                    </h4>
                    <div className="flex flex-wrap -mx-2">
                      <div className="w-full sm:w-1/2 px-2 min-w-[210px]">
                        <label className="block mb-2 text-sm mt-2 font-medium text-black">
                          FULL NAME
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="full_name"
                          id="name"
                          value={formData.full_name}
                          onChange={handleChange}
                          className={`bg-blue-50 border ${errors.name ? "border-red-300" : "border-blue-300"
                            } sm:text-sm rounded-lg focus:ring-primary-400 focus:border-primary-400 block w-full p-2.5 bg-blue-200 border-blue-400 placeholder-black text-black focus:ring-blue-300 focus:border-blue-300`}
                          placeholder="FULL NAME"
                        />
                        {errors.name && (
                          <div className="text-sm text-red-400 mt-2">
                            {errors.name}
                          </div>
                        )}
                      </div>
                      <div className="w-full sm:w-1/2 px-2 min-w-[210px]">
                        <label className="block mb-2 text-sm mt-2 font-medium text-black">
                          Application Number
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="application_id"
                          id="application_id"
                          value={formData.application_id}
                          onChange={handleChange}
                          className={`bg-blue-50 border ${errors.application_id ? "border-red-300" : "border-blue-300"
                            } sm:text-sm rounded-lg focus:ring-primary-400 focus:border-primary-400 block w-full p-2.5 bg-blue-200 border-blue-400 placeholder-black text-black focus:ring-blue-300 focus:border-blue-300`}
                          placeholder="Application number"
                          disabled
                        />
                        {/* {errors.application_id && (
                          <div className="mt-2 text-red-400 text-sm">
                            {errors.application_id}
                          </div>
                        )} */}
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-2">
                      <div className="w-full sm:w-1/2 px-2 min-w-[210px]">
                        <label className="block mb-2 mt-4 text-sm font-medium text-black">
                          FATHER'S NAME
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="father"
                          name="father_name"
                          value={formData.father_name}
                          onChange={handleChange}
                          className={`bg-blue-50 border ${errors.father ? "border-red-300" : "border-blue-300"
                            } sm:text-sm rounded-lg focus:ring-primary-400 focus:border-primary-400 block w-full p-2.5 bg-blue-200 border-blue-400 placeholder-black text-black focus:ring-blue-300 focus:border-blue-300`}
                          placeholder="FATHER'S NAME"
                        />
                        {errors.father && (
                          <div className="text-sm text-red-400 mt-2">
                            {errors.father}
                          </div>
                        )}
                      </div>
                      <div className="w-full sm:w-1/2 px-2 min-w-[210px]">
                        <label className="block mb-2 mt-4 text-sm font-medium text-black">
                          MOTHER'S NAME
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="mother"
                          name="mother_name"
                          value={formData.mother_name}
                          onChange={handleChange}
                          className={`bg-blue-50 border ${errors.mother ? "border-red-300" : "border-blue-300"
                            } sm:text-sm rounded-lg focus:ring-primary-400 focus:border-primary-400 block w-full p-2.5 bg-blue-200 border-blue-400 placeholder-black text-black focus:ring-blue-300 focus:border-blue-300`}
                          placeholder="MOTHER'S NAME"
                        />
                        {errors.mother && (
                          <div className="text-sm text-red-400 mt-2">
                            {errors.mother}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-2">
                      <div className="w-full sm:w-1/2 px-2 min-w-[210px]">
                        <label className="block mb-2 mt-4 text-sm font-medium text-black">
                          BRANCH
                          <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="branch"
                          id="branch"
                          value={formData.branch}
                          onChange={handleChange}
                          className={`bg-blue-50 border ${errors.branch ? "border-red-300" : "border-blue-300"
                            } sm:text-sm rounded-lg focus:ring-primary-400 focus:border-primary-400 block w-full p-2.5 bg-blue-200 border-blue-400 placeholder-black text-black focus:ring-blue-300 focus:border-blue-300`}
                        >
                          <option value="">SELECT</option>
                          <option value="Biotechnology">Biotechnology</option>
                          <option value=" Center for Energy and Environment">
                            Center for Energy and Environment
                          </option>
                          <option value="Center for Artificial Intelligence">
                            Center for Artificial Intelligence
                          </option>
                          <option value="Chemistry">Chemistry</option>
                          <option value=" Chemical Engineering">
                            Chemical Engineering
                          </option>
                          <option value="Civil Engineering">
                            Civil Engineering
                          </option>
                          <option value="Computer Science and Engineering">
                            Computer Science and Engineering
                          </option>
                          <option value="Electronics and Communication Engineering">
                            Electronics and Communication Engineering
                          </option>
                          <option value="Electrical Engineering">
                            Electrical Engineering
                          </option>
                          <option value="Humanities and Management">
                            Humanities and Management
                          </option>
                          <option value="Industrial and Production Engineering">
                            Industrial and Production Engineering
                          </option>
                          <option value="Information Technology">
                            Information Technology
                          </option>
                          <option value="Instrumentation and Control Engineering">
                            Instrumentation and Control Engineering
                          </option>
                          <option value="Mathematics and Computing">
                            Mathematics and Computing
                          </option>
                          <option value="Mechanical Engineering">
                            Mechanical Engineering
                          </option>
                          <option value="Textile Technology">
                            Textile Technology
                          </option>
                          <option value="Physics">Physics</option>
                        </select>
                        {errors.branch && (
                          <div className="text-sm text-red-400 mt-2">
                            {errors.branch}
                          </div>
                        )}
                      </div>
                      <div className="w-full sm:w-1/2 px-2 min-w-[210px]">
                        <label className="block mb-2 mt-4 text-sm font-medium text-black">
                          PHYSICALLY HANDICAPPED
                          <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="physically_handicapped"
                          id="physically_handicapped"
                          value={formData.physically_handicapped}
                          onChange={handleChange}
                          className={`bg-blue-50 border ${errors.physically_handicapped
                            ? "border-red-300"
                            : "border-blue-300"
                            } sm:text-sm rounded-lg focus:ring-primary-400 focus:border-primary-400 block w-full p-2.5 bg-blue-200 border-blue-400 placeholder-black text-black focus:ring-blue-300 focus:border-blue-300`}
                        >
                          <option value="">SELECT</option>
                          <option value="NO">NO</option>
                          <option value="YES">YES</option>
                        </select>
                        {errors.physically_handicapped && (
                          <div className="text-sm text-red-400 mt-2">
                            {errors.physically_handicapped}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-2">
                      <div className="w-full sm:w-1/2 px-2 min-w-[210px]">
                        <label className="block mb-2 mt-4 text-sm font-medium text-black">
                          BLOOD GROUP
                          <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="blood_group"
                          id="blood_group"
                          value={formData.blood_group}
                          onChange={handleChange}
                          className={`bg-blue-50 border ${errors.blood_group
                            ? "border-red-300"
                            : "border-blue-300"
                            } sm:text-sm rounded-lg focus:ring-primary-400 focus:border-primary-400 block w-full p-2.5 bg-blue-200 border-blue-400 placeholder-black text-black focus:ring-blue-300 focus:border-blue-300`}
                        >
                          <option value="">SELECT</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                        {errors.blood_group && (
                          <div className="text-sm text-red-400 mt-2">
                            {errors.blood_group}
                          </div>
                        )}
                      </div>
                      <div className="w-full sm:w-1/2 px-2 min-w-[210px]">
                        <label className="block mb-2 mt-4 text-sm font-medium text-black">
                          GENDER
                          <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="gender"
                          id="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className={`bg-blue-50 border ${errors.gender ? "border-red-300" : "border-blue-300"
                            } sm:text-sm rounded-lg focus:ring-primary-400 focus:border-primary-400 block w-full p-2.5 bg-blue-200 border-blue-400 placeholder-black text-black focus:ring-blue-300 focus:border-blue-300`}
                        >
                          <option value="">SELECT</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          {/* <option value="other">Other</option> */}
                        </select>
                        {errors.gender && (
                          <div className="text-sm text-red-400 mt-2">
                            {errors.gender}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-2">
                      <div className="w-full sm:w-1/2 px-2 min-w-[210px]">
                        <label className="block mb-2 mt-4 text-sm font-medium text-black">
                          Course
                        </label>

                        <select
                          name="course"
                          id="course"
                          value={formData.course}
                          onChange={handleChange}
                          className={`bg-blue-50 border ${errors.course ? "border-red-300" : "border-blue-300"
                            } sm:text-sm rounded-lg focus:ring-primary-400 focus:border-primary-400 block w-full p-2.5 bg-blue-200 border-blue-400 placeholder-gray-800 text-black focus:ring-blue-300 focus:border-blue-300`}
                        // disabled
                        >
                          <option value="">SELECT</option>
                          {/* <option value="1st">1st</option> */}
                          {/* <option value="btech">B.Tech</option> */}
                          <option value="mtech">M.Tech</option>
                          {/* <option value="bsc">Bsc</option> */}
                          <option value="mba">MBA</option>
                          <option value="msc">Msc</option>
                          {/* <option value="phd">Ph.d</option> */}
                        </select>
                        {errors.course && (
                          <div className="text-sm text-red-400 mt-2">
                            {errors.course}
                          </div>
                        )}
                      </div>

                      <div className="w-full sm:w-1/2 px-2 min-w-[210px]">
                        <label className="block mb-2 mt-4 text-sm font-medium text-black">
                          Year
                          <span className="text-red-500">*</span>
                        </label>

                        <select
                          name="year"
                          id="year"
                          value={formData.year}
                          onChange={handleChange}
                          className={`bg-blue-50 border ${errors.year ? "border-red-300" : "border-blue-300"
                            } sm:text-sm rounded-lg focus:ring-primary-400 focus:border-primary-400 block w-full p-2.5 bg-blue-200 border-blue-400 placeholder-gray-800 text-black focus:ring-blue-300 focus:border-blue-300`}
                          disabled
                        >
                          <option value="">SELECT</option>
                          {/* <option value="1st">1st</option> */}
                          <option value="1">1st</option>
                          <option value="2">2nd</option>
                          <option value="3">3rd</option>
                          <option value="4">4th</option>
                          {/* <option value="5">5th</option> */}
                        </select>
                        {errors.year && (
                          <div className="text-sm text-red-400 mt-2">
                            {errors.year}
                          </div>
                        )}
                      </div>

                      <div className="w-full sm:w-1/2 px-2 min-w-[210px]">
                        <label className="block mb-2 mt-4 text-sm font-medium text-black">
                          Semester
                          <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="sem"
                          id="sem"
                          value={formData.sem}
                          onChange={handleChange}
                          className={`bg-blue-50 border ${errors.sem ? "border-red-300" : "border-blue-300"
                            } sm:text-sm rounded-lg focus:ring-primary-400 focus:border-primary-400 block w-full p-2.5 bg-blue-200 border-blue-400 placeholder-gray-800 text-black focus:ring-blue-300 focus:border-blue-300`}
                          disabled
                        >
                          <option value="">SELECT</option>
                          {/* <option value="1st">1st</option> */}
                          <option value="1">1st</option>
                          {/* <option value="2">2nd</option> */}
                          <option value="3">3rd</option>
                          {/* <option value="4">4th</option> */}
                          <option value="5">5th</option>
                          {/* <option value="6">6th</option> */}
                          <option value="7">7th</option>
                          {/* <option value="8">8th</option> */}
                        </select>
                        {errors.sem && (
                          <div className="text-sm text-red-400 mt-2">
                            {errors.sem}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="block mb-2 bg-slate-200 p-3 pt-2 rounded-lg">
                    <h4 className="text-xl font-bold leading-tight tracking-tight md:text-xl text-black mb-3">
                      Contact Details
                    </h4>
                    <div className="flex flex-wrap -mx-2">
                      <div className="w-full sm:w-1/2 px-2 min-w-[210px]">
                        <label className="block mb-2 mt-4 text-sm font-medium text-black">
                        EMAIL ID
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`bg-blue-50 border ${errors.email ? "border-red-300" : "border-blue-300"
                            } sm:text-sm rounded-lg focus:ring-primary-400 focus:border-primary-400 block w-full p-2.5 bg-blue-200 border-blue-400 placeholder-black text-black focus:ring-blue-300 focus:border-blue-300`}
                          placeholder="example"
                          // disabled
                        />
                        {/* {errors.email && (
                          <div className="text-sm text-red-400 mt-2">
                            {errors.email}
                          </div>
                        )} */}
                      </div>
                      <div className="w-full sm:w-1/2 px-2 min-w-[210px]">
                        <label className="block mb-2 mt-4 text-sm font-medium text-black">
                          SELF MOBILE NO
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="self_mobile"
                          name="self_mobile"
                          value={formData.self_mobile}
                          onChange={handleChange}
                          className={`bg-blue-50 border ${errors.self_mobile
                            ? "border-red-300"
                            : "border-blue-300"
                            } sm:text-sm rounded-lg focus:ring-primary-400 focus:border-primary-400 block w-full p-2.5 bg-blue-200 border-blue-400 placeholder-black text-black focus:ring-blue-300 focus:border-blue-300`}
                          placeholder="SELF MOBILE NUMBER"
                          pattern="[0-9]{10}"
                        />
                        {errors.self_mobile && (
                          <div className="mt-2 text-sm text-red-300">
                            {errors.self_mobile}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-2">
                      <div className="w-full sm:w-1/2 px-2 min-w-[210px]">
                        <label className="block mb-2 mt-4 text-sm font-medium text-black">
                          FATHER'S MOBILE NO
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="father_mobile"
                          name="father_mobile"
                          value={formData.father_mobile}
                          onChange={handleChange}
                          className={`bg-blue-50 border ${errors.father_mobile
                            ? "border-red-300"
                            : "border-blue-300"
                            } sm:text-sm rounded-lg focus:ring-primary-400 focus:border-primary-400 block w-full p-2.5 bg-blue-200 border-blue-400 placeholder-black text-black focus:ring-blue-300 focus:border-blue-300`}
                          placeholder="FATHER'S MOBILE NO"
                          pattern="[0-9]{10}"
                        />
                        {errors.father_mobile && (
                          <div className="text-sm text-red-400 mt-2">
                            {errors.father_mobile}
                          </div>
                        )}
                      </div>
                      <div className="w-full sm:w-1/2 px-2 min-w-[210px]">
                        <label className="block mb-2 mt-4 text-sm font-medium text-black">
                          MOTHER'S MOBILE NO
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="mother_mobile"
                          name="mother_mobile"
                          value={formData.mother_mobile}
                          onChange={handleChange}
                          className={`bg-blue-50 border ${errors.mother_mobile
                            ? "border-red-300"
                            : "border-blue-300"
                            } sm:text-sm rounded-lg focus:ring-primary-400 focus:border-primary-400 block w-full p-2.5 bg-blue-200 border-blue-400 placeholder-black text-black focus:ring-blue-300 focus:border-blue-300`}
                          placeholder="MOTHER'S MOBILE NO"
                          pattern="[0-9]{10}"
                        />
                        {errors.mother_mobile && (
                          <div className="text-sm text-red-400 mt-2">
                            {errors.mother_mobile}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-2">
                      <div className="w-full sm:w-1/2 px-2 min-w-[210px]">
                        <label className="block mb-2 mt-4 text-sm font-medium text-black">
                          SIBLING'S MOBILE NO
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="sibling_mobile"
                          name="sibling_mobile"
                          value={formData.sibling_mobile}
                          onChange={handleChange}
                          className={`bg-blue-50 border ${errors.sibling_mobile
                            ? "border-red-300"
                            : "border-blue-300"
                            } sm:text-sm rounded-lg focus:ring-primary-400 focus:border-primary-400 block w-full p-2.5 bg-blue-200 border-blue-400 placeholder-black text-black focus:ring-blue-300 focus:border-blue-300`}
                          placeholder="SIBLING'S MOBILE NO"
                          pattern="[0-9]{10}"
                        />
                        {errors.sibling_mobile && (
                          <div className="text-sm text-red-400 mt-2">
                            {errors.sibling_mobile}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="block mb-2 bg-slate-200 p-3 pt-2 rounded-lg">
                    <h4 className="text-xl mt-2 font-bold leading-tight tracking-tight md:text-xl text-black mb-3">
                      ADDRESS DETAILS
                    </h4>
                    <div className="flex flex-wrap -mx-2">
                      <div className="w-full sm:w-1/2 px-2 min-w-[210px]">
                        <label className="block mb-2 text-sm font-medium text-black">
                          POSTAL ADDRESS WITH PINCODE
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="postal_address"
                          value={formData.postal_address}
                          onChange={handleChange}
                          className={`bg-blue-50 border ${errors.address
                            ? "border-red-300"
                            : "border-blue-300"
                            } sm:text-sm rounded-lg focus:ring-primary-400 focus:border-primary-400 block w-full p-2.5 bg-blue-200 border-blue-400 placeholder-black text-black focus:ring-blue-300 focus:border-blue-300`}
                          placeholder="ADDRESS"
                        />
                        {errors.address && (
                          <div className="text-sm text-red-400 mt-2">
                            {errors.address}
                          </div>
                        )}
                      </div>
                      <div className="w-full sm:w-1/2 px-2 min-w-[210px]">
                        <label className="block mb-2 text-sm font-medium text-black">
                          STATE
                          <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="state"
                          id="state"
                          value={formData.state}
                          onChange={handleChange}
                          className={`bg-blue-50 border ${errors.state ? "border-red-300" : "border-blue-300"
                            } sm:text-sm rounded-lg focus:ring-primary-400 focus:border-primary-400 block w-full p-2.5 bg-blue-200 border-blue-400 placeholder-black text-black focus:ring-blue-300 focus:border-blue-300`}
                          placeholder="SELECT"
                        >
                          <option value="">SELECT</option>
                          <option value="andaman-and-nicobar-islands">
                            Andaman and Nicobar Islands
                          </option>
                          <option value="andhra-pradesh">Andhra Pradesh</option>
                          <option value="arunachal-pradesh">
                            Arunachal Pradesh
                          </option>
                          <option value="assam">Assam</option>
                          <option value="bihar">Bihar</option>
                          <option value="chandigarh">Chandigarh</option>
                          <option value="chhattisgarh">Chhattisgarh</option>
                          <option value="dadra-and-nagar-haveli-and-daman-and-diu">
                            Dadra and Nagar Haveli and Daman and Diu
                          </option>
                          <option value="delhi">Delhi</option>
                          <option value="goa">Goa</option>
                          <option value="gujarat">Gujarat</option>
                          <option value="haryana">Haryana</option>
                          <option value="himachal-pradesh">
                            Himachal Pradesh
                          </option>
                          <option value="jammu-and-kashmir">
                            Jammu and Kashmir
                          </option>
                          <option value="jharkhand">Jharkhand</option>
                          <option value="karnataka">Karnataka</option>
                          <option value="kerala">Kerala</option>
                          <option value="ladakh">Ladakh</option>
                          <option value="lakshadweep">Lakshadweep</option>
                          <option value="madhya-pradesh">Madhya Pradesh</option>
                          <option value="maharashtra">Maharashtra</option>
                          <option value="manipur">Manipur</option>
                          <option value="meghalaya">Meghalaya</option>
                          <option value="mizoram">Mizoram</option>
                          <option value="nagaland">Nagaland</option>
                          <option value="odisha">Odisha</option>
                          <option value="puducherry">Puducherry</option>
                          <option value="punjab">Punjab</option>
                          <option value="rajasthan">Rajasthan</option>
                          <option value="sikkim">Sikkim</option>
                          <option value="tamil-nadu">Tamil Nadu</option>
                          <option value="telangana">Telangana</option>
                          <option value="tripura">Tripura</option>
                          <option value="uttar-pradesh">Uttar Pradesh</option>
                          <option value="uttarakhand">Uttarakhand</option>
                          <option value="west-bengal">West Bengal</option>
                        </select>
                        {errors.state && (
                          <div className="text-sm text-red-400 mt-2">
                            {errors.state}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-2 mt-4">
                      <div className="w-full sm:w-1/2 px-2 min-w-[210px]">
                        <label className="block mb-2 text-sm font-medium text-black">
                          LOCAL GUARDIAN POSTAL ADDRESS WITH PINCODE
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="local_guardian_address"
                          name="local_guardian_address"
                          value={formData.local_guardian_address}
                          onChange={handleChange}
                          className={`bg-blue-50 border ${errors.local_guardian_address
                            ? "border-red-300"
                            : "border-blue-300"
                            } sm:text-sm rounded-lg focus:ring-primary-400 focus:border-primary-400 block w-full p-2.5 bg-blue-200 border-blue-400 placeholder-black text-black focus:ring-blue-300 focus:border-blue-300`}
                          placeholder="ADDRESS WITH PINCODE"
                        />
                        {errors.local_guardian_address && (
                          <div className="text-sm text-red-400 mt-2">
                            {errors.local_guardian_address}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2 px-2 min-w-[210px]">
                      <label className="block mb-2 mt-4 text-sm font-medium text-black">
                        LOCAL GUARDIAN'S MOBILE NO
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="guardian_mobile"
                        name="guardian_mobile"
                        value={formData.guardian_mobile}
                        onChange={handleChange}
                        className={`bg-blue-50 border ${errors.guardian_mobile
                          ? "border-red-300"
                          : "border-blue-300"
                          } sm:text-sm rounded-lg focus:ring-primary-400 focus:border-primary-400 block w-full p-2.5 bg-blue-200 border-blue-400 placeholder-gray-800 text-black focus:ring-blue-300 focus:border-blue-300`}
                        placeholder="LOCAL GUARDIAN'S MOBILE NO"
                        pattern="[0-9]{10}"
                      />
                      {errors.guardian_mobile && (
                        <div className="text-sm text-red-400 mt-2">
                          {errors.guardian_mobile}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-1/2 m-auto">
                    {verified && (
                      <Alert variant="outlined" sx={{ marginBottom: "10px" }}>
                        Captcha Validated Successful
                      </Alert>
                    )}
                    {showCaptcha && <Captcha setVerification={sendToCaptchaForValidation} setShowCaptcha={setShowCaptcha} />}
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      type="submit"
                      name="submit"
                      value="Save & Proceed"
                      className={`bg-blue-400 ${verified ? "bg-blue-700 text-white" : "bg-blue-400"
                        }  flex items-center justify-center w-[6%] py-3 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 min-w-[100px]  border-blue-300 focus:ring-purple-400 hover:border-purple-400`}
                      disabled={!verified}
                    >
                      Save
                    </button>
                  </div>


                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default RegistrationForm;
