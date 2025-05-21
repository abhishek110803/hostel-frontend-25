import React, { useEffect, useState } from "react";
import { useSession } from "../../components/ProtectedPath/SessionContext";
import toast from "react-hot-toast";
import AdminSidebar from "./AdminSidebar";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../Helper/axiosInstance";

const DocumentVerification = () => {
  const [students, setStudents] = useState([]);
  const { session } = useSession();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!session?.role) {
  //     toast.error("Please sign in before viewing this page.");
  //     navigate("/AdminSignIn");
  //   }
  // }, [session, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = axiosInstance.post("/admin_data_fetch.php");
        await toast.promise(res, {
          loading: "Fetching data.",
          success: (data) => {
            console.log("success", data?.data);
            return data?.data?.message;
          },
          error: (data) => {
            console.log("error", data?.data);
            return data?.response?.data.message;
          },
        });

        res = await res;
        console.log("res ka data", res?.data?.form_data);

        if (res?.data?.status === "success") {
          setStudents(res?.data?.form_data);
        }
      } catch (error) {
        console.error("Error fetching data.", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex flex-col flex-grow mt-4">
          <div className="overflow-y-auto max-h-screen">
            <table className="min-w-full bg-white border mt-4">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Sr No.</th>
                  <th className="px-4 py-2 border">Student Roll no.</th>
                  <th className="px-4 py-2 border">Details</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student.rollno}>
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{student.rollno}</td>
                    <td className="px-4 py-2 border">
                      <Link
                        to={`/Sdtdet/${student.rollno}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        View
                      </Link>
                    </td>
                    <td
                      className={`px-4 py-2 border ${
                        student.clerk_verified === "1"
                          ? "text-green-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {student.clerk_verified === "1" ? "Verified" : "Pending"}
                    </td>
                    <td className="px-4 py-2 border">
                      {student.clerk_remarks}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentVerification;
