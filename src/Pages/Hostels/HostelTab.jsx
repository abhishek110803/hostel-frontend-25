import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/solid";

import '../HostelDetails/hostelDetails.css';
import '../HostelDetails/bootstrap.min.css'; 
import '../HostelDetails/fontawesome-all.min.css';
import '../HostelDetails/swiper.min.css';
import '../HostelDetails/style.css';
import '../HostelDetails/div_comming_css.css'
import NavBar from '../../components/Navbar/Navbar';
import Hostels from './BoysHostels';
import BoysHostels from './BoysHostels';
import GirlsHostels from './GirlsHostels ';
const HostelTab = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('step-one');


    // const [eventdetails, setEventdetails] = useState({
    //     eventId: '65d5d596a5858e414584423a',
    //     minParticipants: 1,
    //     maxParticipants: 1,
    //     amount: 200,
    //     eventTitle: 'Beat The Street',

    // });


    const handleTabClick = (tabId) => {
        //console.log("tabId", tabId);
        setActiveTab(tabId);
        // if (tabId === "step-one") {
        //     setEventdetails({
        //         eventId: '65d5d596a5858e414584423a',
        //         minParticipants: 1,
        //         maxParticipants: 1,
        //         amount: 200,
        //         eventTitle: 'Beat The Street',

        //     });
        // }
        // if (tabId === "step-two") {
        //     setEventdetails({
        //         eventId: '65d5d69fa5858e4145844242',
        //         minParticipants: 2,
        //         maxParticipants: 2,
        //         amount: 200,
        //         eventTitle: 'Duet Dance',

        //     });
        // }
        // if (tabId === "step-three") {
        //     setEventdetails({
        //         eventId: '65d5d56ea5858e4145844237',
        //         minParticipants: 5,
        //         maxParticipants: 100,
        //         amount: 120,
        //         eventTitle: `Shut Up 'N' Dance`,

        //     });
        // }


    };
    const handleClick = () => {
        //console.log("clicked", eventdetails);
        navigate("/event/registerinevent", { state: { ...eventdetails } });
    };
    const handleBack = () => {
        navigate(-1);
      };

    return (
        <><NavBar/>
        <div className='ALLEVENT'>
            {/* <div className="cd-overlay-nav">
                <span></span>
            </div> */}

            {/* <div className="cd-overlay-content">
                <span></span>
            </div> */}

            {/* <a href="dance.html#0" className="cd-nav-trigger">Menu<span className="cd-icon"></span></a> */}


            <section className="our-schedule-area">
                {/* <h1 style={{ marginTop: '', paddingBottom: '' }} className="text-center">MBH-A</h1> */}

                {/* <div className="container"> 
                    <div className="row">
                        <div className="col-12"> */}
                            <div className="schedule-tab">
                            <button
          onClick={handleBack}
          className="absolute top-4 left-4 text-blue-600 hover:text-blue-800 focus:outline-none"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
                                <ul className="nav nav-tabs wow fadeInUp" data-wow-delay="300ms" id="conferScheduleTab" role="tablist">
                                    <li className="nav-item">
                                        <a
                                            className={`nav-link ${activeTab === 'step-one' ? 'active' : ''}`}
                                            id="tab-onr"
                                            onClick={() => handleTabClick('step-one')}
                                        >
                                           Boy's Hostels
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className={`nav-link ${activeTab === 'step-two' ? 'active' : ''}`}
                                            id="tab-two"
                                            onClick={() => handleTabClick('step-two')}
                                        >
                                           Girl's Hostels
                                        </a>
                                    </li>
                              
                                </ul>
                            </div>

                            <div className="tab-content" id="conferScheduleTabContent">

                                {activeTab === 'step-one' && (<BoysHostels/>)
                                }


                                {activeTab === 'step-two' && (<GirlsHostels/>)
                                }

                               
                                
                            </div>
                        {/* </div>
                    </div>
                </div> */}
            </section>

            <div className="d-flex justify-content-around mb-3">
                {/* Contact information */}
            </div>
        </div>
        </>


    );
}

export default HostelTab;
