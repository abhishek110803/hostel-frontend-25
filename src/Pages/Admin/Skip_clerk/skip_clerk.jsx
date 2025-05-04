// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import AdminSidebar from "../AdminSidebar";
// import { Search } from "lucide-react";
// import axiosInstance from "../../../Helper/axiosInstance";
// // Custom Button component
// const Button = ({ onClick, children, variant, className, size = "md" }) => {
//   const baseStyles =
//     "focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center";

//   const variantStyles = {
//     default:
//       "bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white",
//     outline: "border border-gray-300 hover:bg-gray-100 text-gray-700",
//     success:
//       "bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 text-white",
//     danger:
//       "bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 text-white",
//     neutral:
//       "bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 text-white",
//   };

//   const sizeStyles = {
//     sm: "text-sm px-4 py-2",
//     md: "text-base px-5 py-2.5",
//     lg: "text-lg px-6 py-3",
//   };

//   return (
//     <button
//       onClick={onClick}
//       className={`${baseStyles} ${variantStyles[variant || "default"]} ${
//         sizeStyles[size]
//       } ${className}`}
//     >
//       {children}
//     </button>
//   );
// };

// // Custom Input component
// const Input = ({
//   value,
//   onChange,
//   placeholder,
//   name,
//   id,
//   type = "text",
//   className,
//   required = false,
// }) => {
//   return (
//     <input
//       type={type}
//       name={name}
//       id={id}
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       required={required}
//       className={`bg-white border border-blue-300 text-blue-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 ${className}`}
//     />
//   );
// };

// const Skip_Clerk = () => {
//   const [rollno, setRollNo] = useState("");
//   const [errors, setErrors] = useState({});
//   const [responses, setResponses] = useState([]); 
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const validateForm = () => {
//     const newErrors = {};
//     if (!rollno) {
//       newErrors.rollno = "Roll number is required.";
//     }
//     return newErrors;
//   };

//   const fetchResponses = async (search = "") => {
//     try {
//       const data = await axiosInstance.get(
//         `/skip_clerk.php?request=get_responses&search=${search}`
//       );
//       console.log(data.data);

//       if (data.data.success) {
//         setResponses(data.data.data);
//       } else {
//         console.error("Error fetching responses:", data.data);
//       }
//     } catch (error) {
//       console.error("Error fetching responses:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchResponses();
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }
//     setErrors({});
//     fetchResponses(rollno);
//   };

//   const handleBulkUpdate = async (allowed) => {
//     try {
//       const response = await axiosInstance.post(
//         `skip_clerk.php?request=update_all_status`, {allowed}
//       );

//       console.log(response.data);
//       if (response.data.success) {
//         fetchResponses(rollno);
//       } else {
//         console.error("Error updating all responses:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error updating all responses:", error);
//     }
//   };

//   const handleSingleResponse = async (id, allowed) => {
//     try {
//       const response = await axiosInstance.post(
//         `/skip_clerk.php?request=update_status`, { id, allowed }
//       );

//       if (response.data.success) {
//         fetchResponses(rollno);
//       } else {
//         console.error("Error updating response:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error updating response:", error);
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       <section className="min-h-screen lg:m-10 flex-1 items-center justify-center bg-white px-4 py-4 mt-8 md:py-0">
//         <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-white border-1 border-blue-600 rounded-lg shadow-md overflow-hidden relative">
//           <button
//             onClick={() => navigate(-1)}
//             className="absolute top-4 left-4 text-blue-600 hover:text-blue-800 focus:outline-none"
//           ></button>
//           <div className="p-6 md:p-8 space-y-6">
//             <form className="space-y-4" onSubmit={handleSubmit} method="POST">
//               <div>
//                 <label
//                   htmlFor="rollno"
//                   className="block mb-2 text-sm font-medium text-blue-900"
//                 >
//                   Roll No.
//                 </label>
//                 <div className="relative">
//                   <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
//                   <Input
//                     type="text"
//                     name="rollno"
//                     id="rollno"
//                     value={rollno}
//                     onChange={(e) => setRollNo(e.target.value)}
//                     className={`bg-white border ${
//                       errors.rollno ? "border-red-500" : "border-blue-300"
//                     } text-blue-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 pl-10`}
//                     placeholder="12345678"
//                     required
//                   />
//                 </div>
//                 {errors.rollno && (
//                   <p className="mt-2 text-sm text-red-600">{errors.rollno}</p>
//                 )}
//               </div>
//               <Button type="submit">Search</Button>
//             </form>
//             <div className="flex justify-end space-x-2">
//               <Button variant="success" onClick={() => handleBulkUpdate(true)}>
//                 Allow All
//               </Button>
//               <Button variant="danger" onClick={() => handleBulkUpdate(false)}>
//                 Disallow All
//               </Button>
//             </div>
//             <div className="space-y-4">
//               {loading ? (
//                 <div className="text-center py-4">Loading...</div>
//               ) : responses.length === 0 ? (
//                 <div className="text-center py-4">No responses found</div>
//               ) : (
//                 responses.map((response) => (
//                   <div
//                     key={response.id}
//                     className={`p-4 rounded-lg border flex justify-between items-center ${
//                       response.allowed === 1 ? "bg-green-200 bg-opacity-60" : ""
//                     } ${response.allowed === 0 ? "bg-red-200 bg-opacity-60" : ""}`}
//                   >
//                     <span className="flex-1">{response.rollno}</span>
//                     <div className="flex space-x-2">
//                       <Button
//                         size="sm"
//                         variant={response.allowed === 1 ? "default" : "success"}
//                         onClick={() => handleSingleResponse(response.rollno, true)}
//                       >
//                         Allow
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant={response.allowed === 0 ? "default" : "danger"}
//                         onClick={() => handleSingleResponse(response.rollno, false)}
//                       >
//                         Disallow
//                       </Button>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../AdminSidebar";
import { Search } from "lucide-react";
import axiosInstance from "../../../Helper/axiosInstance";

// Custom Button component
const Button = ({
  onClick,
  children,
  variant,
  className,
  size = "md",
  type = "button",
}) => {
  const baseStyles =
    "focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center";

  const variantStyles = {
    default:
      "bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white",
    outline: "border border-gray-300 hover:bg-gray-100 text-gray-700",
    success:
      "bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 text-white",
    danger:
      "bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 text-white",
    neutral:
      "bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 text-white",
  };

  const sizeStyles = {
    sm: "text-sm px-4 py-2",
    md: "text-base px-5 py-2.5",
    lg: "text-lg px-6 py-3",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant || "default"]} ${
        sizeStyles[size]
      } ${className}`}
    >
      {children}
    </button>
  );
};
// Custom Input component
const Input = ({
  value,
  onChange,
  placeholder,
  name,
  rollno,
  type = "text",
  className,
  required = false,
}) => {
  return (
    <input
      type={type}
      name={name}
      rollno={rollno}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`bg-white border border-blue-300 text-blue-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 ${className}`}
    />
  );
};

const Skip_Clerk = () => {
  const [rollno, setRollNo] = useState("");
  const [errors, setErrors] = useState({});
  const [responses, setResponses] = useState([]); 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!rollno) {
      newErrors.rollno = "Roll number is required.";
    }
    return newErrors;
  };

  const fetchResponses = async (search = "") => {
    try {
      const data = await axiosInstance.get(
        `/skip_clerk.php?request=get_responses&search=${search}`
      );
      console.log(data.data);

      if (data.data.success) {
        setResponses(data.data.data);
      } else {
        console.error("Error fetching responses:", data.data);
      }
    } catch (error) {
      console.error("Error fetching responses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResponses();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    fetchResponses(rollno);
  };

  const handleBulkUpdate = async (rollno,skip_clerk) => {
    try {
      const response = await axiosInstance.post(
        `skip_clerk.php?request=update_all_status`, {rollno,skip_clerk}
      );

      console.log(response.data);
      if (response.data.success) {
        fetchResponses(rollno);
      } else {
        console.error("Error updating all responses:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating all responses:", error);
    }
  };

  const handleSingleResponse = async (rollno, skip_clerk) => {
    try {
      const response = await axiosInstance.post(
        `/skip_clerk.php?request=update_status`, { rollno, skip_clerk }
      );

      if (response.data.success) {
        fetchResponses(rollno);
      } else {
        console.error("Error updating response:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating response:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <section className="min-h-screen lg:m-10 flex-1 items-center justify-center bg-white px-4 py-4 mt-8 md:py-0">
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-white border-1 border-blue-600 rounded-lg shadow-md overflow-hidden relative">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 text-blue-600 hover:text-blue-800 focus:outline-none"
          ></button>
          <div className="p-6 md:p-8 space-y-6">
            <form className="space-y-4" onSubmit={handleSubmit} method="POST">
              <div>
                <label
                  htmlFor="rollno"
                  className="block mb-2 text-sm font-medium text-blue-900"
                >
                  Roll No.
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="text"
                    name="rollno"
                    rollno="rollno"
                    value={rollno}
                    onChange={(e) => setRollNo(e.target.value)}
                    className={`bg-white border ${
                      errors.rollno ? "border-red-500" : "border-blue-300"
                    } text-blue-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 pl-10`}
                    placeholder="12345678"
                    required
                  />
                </div>
                {errors.rollno && (
                  <p className="mt-2 text-sm text-red-600">{errors.rollno}</p>
                )}
              </div>
              <Button type="submit">Search</Button>
            </form>
            <div className="flex justify-end space-x-2">
              <Button variant="success" onClick={() => handleBulkUpdate(rollno,true)}>
                Allow All
              </Button>
              <Button variant="danger" onClick={() => handleBulkUpdate(rollno,false)}>
                Disallow All
              </Button>
            </div>
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-4">Loading...</div>
              ) : responses.length === 0 ? (
                <div className="text-center py-4">No responses found</div>
              ) : (
                responses.map((response) => (
                  <div
                    key={response.rollno}
                    className={`p-4 rounded-lg border flex justify-between items-center ${
                      response.skip_clerk === 1 ? "bg-green-50" : ""
                    } ${response.skip_clerk === 0 ? "bg-red-50" : ""}`}
                  >
                    <span className="flex-1">{response.rollno}</span>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant={response.skip_clerk === 1 ? "default" : "success"}
                        onClick={() => handleSingleResponse(response.rollno, true)}
                      >
                        Allow
                      </Button>
                      <Button
                        size="sm"
                        variant={response.skip_clerk === 0 ? "default" : "danger"}
                        onClick={() => handleSingleResponse(response.rollno, false)}
                      >
                        Disallow
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skip_Clerk;