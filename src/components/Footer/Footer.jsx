import React from "react";
import { HomeIcon, PhoneIcon } from "@heroicons/react/solid";
import logo from "../../assets/images/logo_250.png";

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-gray-300 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="mb-4 lg:mb-0 lg:w-1/3">
            <div className="flex items-center mb-2">
              <img src={logo} alt="NIT Jalandhar Logo" className="h-10 mr-2" />
              <h2 className="text-white text-lg font-bold">
                Dr B R Ambedkar National Institute of Technology Jalandhar
              </h2>
            </div>
            <p className="text-sm">
              <HomeIcon className="h-4 w-4 inline-block mr-1" />
              G.T Road, Amritsar Bypass, Jalandhar, Punjab, India-144008
            </p>
            <p className="text-sm">
              <PhoneIcon className="h-4 w-4 inline-block mr-1" />
              +91-0181-5037855, 2690301, 2690453, 3082000
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 lg:grid-cols-3 lg:w-2/3">
            <div>
              <h3 className="text-white font-semibold mb-2 text-sm">
                Quick Links
              </h3>
              <ul className="space-y-1 text-xs sm:text-sm">
                <li>
                  <a
                    href="https://nitj.ac.in/template/index.html?id=6433e06be7b7ce1ef620fd53?category=notice"
                    className="hover:text-blue-400"
                  >
                    Academic Calendar
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.nitj.ac.in/admin/Contact.html"
                    className="hover:text-blue-400"
                  >
                    Academic Section Officials
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.nitj.ac.in/admissions/index.html#btech"
                    className="hover:text-blue-400"
                  >
                    Admission
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.nitj.ac.in/template/index.html?id=651e908479c68ff6aaa9df9e?category=newpage"
                    className="hover:text-blue-400"
                  >
                    Annual Reports
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.nitj.ac.in/admin/administration.html"
                    className="hover:text-blue-400"
                  >
                    Deans
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.nitj.ac.in/template/index.html?id=6551f252a7c0e1110f0f7882?category=newpage"
                    className="hover:text-blue-400"
                  >
                    List of Holidays
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.nitj.ac.in/template/index.html?id=64cb8905f9a66f2de548282f?category=newpage"
                    className="hover:text-blue-400"
                  >
                    Minutes of Meeting
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.nitj.ac.in/template/index.html?id=64faf68538ceda75f04478fe?category=newpage"
                    className="hover:text-blue-400"
                  >
                    NIT Act and Statutes
                  </a>
                </li>

                {/* <li>
                  <a href="#" className="hover:text-blue-400">
                    Proformas (Bilingual)
                  </a>
                </li> */}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2 text-sm">
                Quick Links
              </h3>
              <ul className="space-y-1 text-xs sm:text-sm">
                <li>
                  <a
                    href="https://www.nitj.ac.in/template/index.html?id=654cc416a7c0e1110ff06af5?category=newpage"
                    className="hover:text-blue-400"
                  >
                    Other Charges Payment Link
                  </a>
                </li>

                <li>
                  <a
                    href="https://v1.nitj.ac.in/index.php/nitj_cinfo/nisp"
                    className="hover:text-blue-400"
                  >
                    National Innovation and Startup Policy (NISP)
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.nitcouncil.org.in/"
                    className="hover:text-blue-400"
                  >
                    Council of NITs
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.vlab.co.in/"
                    className="hover:text-blue-400"
                  >
                    Virtual labs
                  </a>
                </li>

                <li>
                  <a
                    href="https://v1.nitj.ac.in/nitj_files/links/salientfeatures_Highereducation_final-merged_73472.pdf"
                    className="hover:text-blue-400"
                  >
                    National Education Policy 2020
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.nitj.ac.in/template/index.html?id=64ae4b97a5e16718759c7e9c?category=newpage"
                    className="hover:text-blue-400"
                  >
                    Rules/Policies
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.nitj.ac.in/admin/UMC.html"
                    className="hover:text-blue-400"
                  >
                    UMC Rules
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.nitj.ac.in/admin/ranking.html"
                    className="hover:text-blue-400"
                  >
                    Rankings
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2 text-sm">
                Quick Links
              </h3>
              <ul className="space-y-1 text-xs sm:text-sm">
                <li>
                  <a
                    href="https://xceed.nitj.ac.in/classrooms"
                    className="hover:text-blue-400"
                  >
                    Classroom Information
                  </a>
                </li>
                <li>
                  <a
                    href="https://xceed.nitj.ac.in/timetable"
                    className="hover:text-blue-400"
                  >
                    Institute Timetable
                  </a>
                </li>

                <li>
                  <a
                    href="https://nitj.ac.in/template/index.html?id=660e3243b7c092452508e69a?category=newpage"
                    className="hover:text-blue-400"
                  >
                    Library Resources
                  </a>
                </li>
                <li>
                  <a
                    href="https://drive.google.com/drive/folders/1jTvMxunYARWam0_Ye6oOlcw5VGhkCYiY"
                    className="hover:text-blue-400"
                  >
                    New Criminal Laws
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.nitj.ac.in/template/index.html?id=666161b6deaa374518e51e76?category=newpage"
                    className="hover:text-blue-400"
                  >
                    Standard Operating Procedures (SOPs)
                  </a>
                </li>

                <li>
                  <a
                    href="https://main.mohfw.gov.in/E-Citizen-and-Tender/csma/punjab"
                    className="hover:text-blue-400"
                  >
                    CS MA Empanelled Hospitals
                  </a>
                </li>
                <li>
                  <a
                    href="https://cghs.nic.in/reports/view_hospital.jsp"
                    className="hover:text-blue-400"
                  >
                    CGHS empanelled hospitals
                  </a>
                </li>
                <li>
                  <a
                    href="https://v1.nitj.ac.in/NITJ-Compendium/"
                    className="hover:text-blue-400"
                  >
                    NITJ Compendium
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-center border-t border-gray-700 pt-2 mt-2">
          <p className="text-xs">
            &copy; Copyright 2024, All Rights Reserved NIT Jalandhar
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
