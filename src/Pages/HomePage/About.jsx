import React from "react";

export default function About() {
  return (
    <div
      className="aboutSection mx-4 sm:mx-8 md:mx-14 my-10 md:my-14 bg-blue-50 border border-blue-600 rounded-lg shadow-lg sm:p-6 md:p-10 py-2 px-1"
      id="AboutUs"
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 text-center mb-4 sm:mb-6">
        <strong>About Us</strong>
      </h1>
      <div className="text-base sm:text-lg text-gray-800 text-justify mb-4 p-2 sm:p-6 md:p-10 px-4">
        <p>
          Dr B R Ambedkar National Institute of Technology (NIT) Jalandhar
          offers comprehensive hostel facilities for both male and female
          students. The hostels are designed to provide a comfortable and
          conducive living environment that supports academic pursuits as well
          as personal growth.
        </p>
      </div>

      <div className="facilitiesHolder bg-white rounded-lg p-2 sm:p-6 shadow-md mx-2 sm:mx-4 mt-8 mb-2">
        <div id="content1 ">
          <p className="text-center text-xl sm:text-2xl font-bold mb-2 mt-2">
            Accommodation
          </p>
          <ul className="list-disc list-outside  text-gray-800 space-y-2 px-4 ">
            <li>
              Shared Rooms: Most students are accommodated in shared rooms,
              which promotes camaraderie and mutual support among hostel
              residents.
            </li>
            <li>
              Single Rooms: Limited in number and available on a first-come,
              first-served basis. These rooms offer privacy and a quiet space
              for studying.
            </li>
          </ul>
          <p className="text-center text-xl sm:text-2xl font-bold mb-2 mt-4">
            Facilities
          </p>
          <ul className="list-disc list-outside text-gray-800 space-y-2 px-4">
            <li>
              Rooms: Each room is equipped with basic furniture including a bed,
              study table, chair, and wardrobe.
            </li>
            <li>
              Common Areas: Hostels feature common rooms with televisions,
              reading rooms, and recreational areas for relaxation and
              socializing.
            </li>
            <li>
              Internet: LAN or Wi-Fi connectivity is available throughout the
              hostel premises to facilitate academic work and communication.
            </li>
            <li>
              Mess: Each hostel has a mess with a well-spaced dining hall. The
              mess is managed by the student mess committee to provide
              nutritious and hygienic meals. The menu is varied and caters to
              different dietary preferences.
            </li>
            <li>
              Laundry: Laundry facilities are available for students'
              convenience.
            </li>
            <li>
              Security: The hostels are secure, with round-the-clock security
              personnel and CCTV surveillance to ensure the safety of residents.
            </li>
          </ul>

          <p className="text-center text-xl sm:text-2xl font-bold mb-2 mt-4">
            Additional Amenities
          </p>
          <ul className="list-disc list-outside text-gray-800 space-y-2 px-4">
            <li>
              Sports Facilities: Hostels are equipped with indoor and outdoor
              sports facilities including basketball courts, volleyball courts,
              and table tennis.
            </li>
            <li>
              Health Services: On-campus medical facilities are available to
              address any health concerns or emergencies.
            </li>
            <li>
              Housekeeping: Regular cleaning services are provided to maintain
              hygiene and cleanliness in the hostel premises.
            </li>
          </ul>
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-2 mt-4">
            Rules and Regulations
          </h2>

          <ul className="list-disc list-outside text-gray-800 space-y-2 px-4">
            <li>
              Code of Conduct: Students are expected to maintain discipline and
              adhere to the hostel's code of conduct, which also includes
              respecting fellow residents, hostel staff, and not damaging the
              hostel property.
            </li>
            <li>
              Visitors: Visitors are generally not allowed in the hostel rooms
              and are allowed only in the designated visiting areas.
            </li>
          </ul>

          <p className="p-4">
            The detailed Hostel Rules are available on the following link:{" "}
            <a
              href="https://www.nitj.ac.in/lifeAtNitj/hostel.html#"
              className="text-blue-600 underline"
            >
              www.nitj.ac.in/lifeAtNitj/hostel
            </a>
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-center mb-2 mt-4">
            Application Process
          </h2>

          <ul className="list-disc list-outside text-gray-800 space-y-2 px-4">
            <li>
              Online Allotment: Hostel rooms are allotted through an online
              process, which is notified from time to time. Students must fill
              out an application form, upload necessary documents, and select
              their preferred type of accommodation.
            </li>
            <li>
              Fees: Additional fees apply for single room accommodations.
              Payments must be made within the specified deadlines to confirm
              the booking.
            </li>
          </ul>

          <p className="p-4">
            The hostels at NIT Jalandhar aim to create a home-like atmosphere,
            where students can focus on their studies while also participating
            in extracurricular activities and socializing with peers.
          </p>
        </div>
      </div>
    </div>
  );
}
