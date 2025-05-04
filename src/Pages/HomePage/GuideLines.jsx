import React from "react";
import { Link } from "react-router-dom";

const Schedule_url =
  "http://localhost:8080/src/components/Downloads/Schedule_Hostel_allotment.pdf";
const Steps_url = "http://localhost:8080/src/components/Downloads/Steps.pdf";
const Hostel_Availability_url =
  "http://localhost:8080/src/components/Downloads/Room_Availability.pdf";

const downloadFileAtURL = (url) => {
  const fileName = url.split("/").pop();
  const aTag = document.createElement("a");
  aTag.href = url;
  aTag.setAttribute("download", fileName);
  document.body.appendChild(aTag);
  aTag.click();
  aTag.remove();
};

export default function GuideLines() {
  return (
    <div className="p-4 sm:p-6 md:p-10 mx-4 sm:mx-8 md:mx-14 my-10 md:my-14 bg-blue-50 border border-blue-600 rounded-lg shadow-lg mb-14">
      <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 text-center mb-4 sm:mb-6">
        <strong>Guidelines</strong>
      </h1>
      <div className="sm:px-10">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4">
          Hostel Allotment Policy for Session July – December 2024
        </h2>
        <div className="text-base sm:text-lg text-gray-800">
          <ol className="list-decimal list-outside space-y-4 px-4">
            <li>
              The hostel allotment to UG and PG students for the session July –
              December 2024 will be carried out as per details given in Annexure
              A (
              <Link
                className="text-blue-600"
                onClick={() => downloadFileAtURL(Hostel_Availability_url)}
              >
                See attachment
              </Link>
              ).
            </li>
            <li>
              The hostel allotment process will be carried out online where the
              students will choose their room as well as room partner (in case
              of shared accommodation). The single room accommodation for UG
              2021 batch is limited and available on a first come, first served
              basis during the online allotment. The shifting of accommodation
              is not allowed once the accommodation has been allotted to the
              student. The details of the online hostel process are provided in
              Annexure B (
              <Link
                className="text-blue-600"
                onClick={() => downloadFileAtURL(Steps_url)}
              >
                See attachment
              </Link>
              ). The students will be able to see all the options as per their
              batch for the hostel/room selection in the online hostel allotment
              process.
            </li>
            <li>
              Due to the limited hostel accommodation, the students (Boys)
              belonging to Jalandhar and nearby places (within 35 km distance
              from campus) will not be given hostel accommodation.
            </li>
            <li>
              The allotment of hostel accommodation for UG/PG students will
              start online from 08.07.2024 onwards. Dr Samayveer Singh will act
              as overall coordinator for the hostel allotment process.
            </li>
            <li>
              Online hostel allotment will be conducted first for the existing
              hostel residents only. The students who are defaulters and having
              pending dues from the previous hostels will not be allowed the
              possession of the room.
            </li>
            <li>
              Any student willingly submitting false information during the
              hostel allotment process will be automatically debarred from the
              hostel accommodation for the semester.
            </li>
            <li>
              It is important to mention here that due to the limited hostel
              facility for Boys, the inmates have to share the available
              resources in the hostel. Further students, if opts, may be allowed
              to leave the hostel accommodation if they are not comfortable with
              the infrastructure provided to them (within one week of physical
              reporting at Hostels). The hostel mess advance will be refunded to
              such students as per hostel rules.
            </li>
            <li>
              The mess fee needs to be paid during the hostel allotment process.
              The mess fees for the next semester is: Rs 25000 for the existing
              hostelers. The mess payment link is available at the Institute
              website. Moreover, the students need to fill in the last
              semester's hostel details while submitting fees at the online fee
              portal.
            </li>
            <li>
              There may be some deviations while implementing this policy and
              the same may be considered on a case to case basis.
            </li>
          </ol>
        </div>

        <p className="mt-8">
          For more details, refer to the{" "}
          <Link
            to="https://www.nitj.ac.in/lifeAtNitj/hostel.html#"
            className="text-blue-600 underline"
          >
            Hostel Allotment Policy Document
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
