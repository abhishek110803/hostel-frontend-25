import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";

const sampleDocs = [
  {
    docName: "profile image",
    mandatory: 0,
    docType: "png%jpg%jpeg",
    maxSize: 2,
  },
  { docName: "aadhar card", mandatory: 0, docType: "pdf", maxSize: 10 },
  { docName: "pan card", mandatory: 0, docType: "png%jpeg", maxSize: 14 },
  {
    docName: "birth certificate",
    mandatory: 0,
    docType: "pdf%jpeg",
    maxSize: 1,
  },
  { docName: "payment", mandatory: 0, docType: "png%jpg", maxSize: 1 },
];

export default function AdminMandatoryDocs() {
  const [docs, setDocs] = useState([]);
  const [newdoc, setNewDoc] = useState({
    docName: "",
    mandatory: 0,
    docType: "",
    maxSize: 0,
  });
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    setDocs(sampleDocs);
  });

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="relative w-full h-full">
        <div className="h-full w-full flex flex-col gap-2 p-4 overflow-scroll">
          {docs.map((doc, index) => (
            <div
              key={index}
              className="flex flex-col border-gray-200 border-2 bg-gray-100 rounded p-2 gap-2"
            >
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className={`text-white font-medium rounded-lg text-sm py-1 px-2 text-center ${
                    doc.mandatory
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                  onClick={() => {
                    const updatedDocs = [...docs];
                    updatedDocs[index].mandatory = updatedDocs[index].mandatory
                      ? 0
                      : 1;
                    setDocs(updatedDocs);
                  }}
                >
                  {doc.mandatory ? "Mandatory" : "Not Mandatory"}
                </button>
                <h2 className="text-xl font-bold">{doc.docName}</h2>
              </div>
              <div className="flex gap-2">
                <div className="border-2 border-blue-300 bg-blue-200 rounded-full w-20 text-center">
                  {doc.maxSize} MB
                </div>
                {doc.docType.split("%").map((type, index) => (
                  <div
                    className="border-2 border-gray-300 bg-gray-200 rounded-full w-16 text-center"
                    key={index}
                  >
                    {type}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white text-2xl rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
          onClick={() => setPopup(!popup)}
        >
          +
        </button>
      </div>
    </div>
  );
}
