import { useState } from "react";
import Search1 from "./SearchRoll/Search1";
import DocumentVerification from "./DocumentVerification";
import Rmedt from "./Rmedt/Rmedt";
import AdminMandatoryDocs from "./AdminMandatoryDocs";
import StudentProfile from "./Student_profile/student_profile";
import Skip_Clerk from "./Skip_clerk/skip_clerk";
import EditDatabase from "./EditDB/EditDatabase";

export default function AdminMainPage() {
    const [popup, setPopup] = useState("none");
    const features = ["Allow Disallow Students", "Verify Student Docs", "Edit Rooms", "Set Mendatory Docs", "Edit Database", "StudentProfile","Skip Clerk"];
      
    return (
        <>
            <div className="w-full h-full flex gap-10 p-8 flex-col">
                <h1 className="font-bold text-2xl">Select what to use</h1>
                
                <div className="w-full grid grid-cols-4 gap-4">
                    {
                        features.map((feature, index) => { 
                            return <div className="border-solid border-2 cursor-pointer p-2 bg-gray-100 relative" key={feature} onClick={() => setPopup(feature)}>
                                <img src={`admin/feature_${index+1}.png`} className="w-full h-full" alt={feature} />
                                <h3 className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center w-full text-xl pt-10 pb-2 bg-gradient-to-t from-black to-transparent text-white">
                                    {feature}
                                </h3>
                            </div>
                        })
                    }
                </div>

            </div>

            {/* Popup */}
            {popup !== "none" && (
                <div className="fixed top-0 left-0 p-14 w-full h-full flex justify-center items-center bg-gray-700 bg-opacity-70">
                    <div className="bg-white rounded-lg shadow-lg w-full h-full overflow-scroll">
                        { popup === features[0] && <Search1 />}
                        { popup === features[1] && <DocumentVerification />}
                        { popup === features[2] && <Rmedt />}
                        { popup === features[3] && <AdminMandatoryDocs />}
                        { popup === features[4] && <EditDatabase />}
                        { popup === features[5] && <StudentProfile />}
                        { popup === features[6] && <Skip_Clerk />}


                    </div>
                    <button onClick={() => setPopup("none")} className="absolute top-4 right-4 bg-white px-2 rounded-lg">
                        Close
                    </button>
                </div>
            )}
        </>
    );
}