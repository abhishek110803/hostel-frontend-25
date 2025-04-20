import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import './hostelDetails.css';
import './style.css';
import NavBar from '../../components/Navbar/Navbar';
const MBHA = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('step-one');


    const handleTabClick = (tabId) => {
        //console.log("tabId", tabId);
        setActiveTab(tabId);
    };



    return (
        <><NavBar />
            <div className='ALLEVENT'>
                <section className="our-schedule-area">
                    <h1 className="text-center font-bold text-3xl md:mt-5 md:mb-5 ">BH-3</h1>

                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="schedule-tab">
                                    <ul className="nav nav-tabs wow fadeInUp" data-wow-delay="300ms" id="conferScheduleTab" role="tablist">
                                        <li className="nav-item">
                                            <a
                                                className={`nav-link ${activeTab === 'step-one' ? 'active' : ''}`}
                                                id="tab-onr"
                                                onClick={() => handleTabClick('step-one')}
                                            >
                                                About
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className={`nav-link ${activeTab === 'step-two' ? 'active' : ''}`}
                                                id="tab-two"
                                                onClick={() => handleTabClick('step-two')}
                                            >
                                                Commitee Members
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className={`nav-link ${activeTab === 'step-three' ? 'active' : ''}`}
                                                id="tab-three"
                                                onClick={() => handleTabClick('step-three')}
                                            >
                                                Contact Person
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                { <div className="tab-content text-black" id="conferScheduleTabContent">

                                    {activeTab === 'step-one' && (
                                        <div className="tab-pane fade show active" id="step-one" role="tabpanel" aria-labelledby="monday-tab">

                                            <div className="single-tab-content ">
                                                <div className="row">
                                                    <div className="col-12">
                                                         <div className="bg-gray-100 border-2 border-black single-schedule-area single-page d-flex flex-wrap justify-content-between align-items-center wow " data-wow-delay="0ms">
                                                         <h3 className='text-center font-bold'>Yet To Update .</h3>
                                                                  
                                                   
                                                          
                                                            <div className="single-schedule-tumb-info d-flex align-items-center">
                                                                <div className="single-schedule-info text-black">
                                                                     {/* <p>
                                                                        A solo dance face-off is a dance competition where individual dancers compete against each other to showcase their skills, technique, and performance abilities.<br /><br />
                                                                    </p>
                                                                    <p className='text-black'>
                                                                        <b>Time Limit:</b><br />
                                                                        • First round: 1 min<br />
                                                                        <b>Team size</b> : Solo<br /><br />
                                                                    </p> */}
                                                                    {/* <h6 >Rules:</h6>
                                                                    <p className='text-black'>
                                                                        1. There are three rounds for this competition as listed below:<br />
                                                                        2. Elimination round:<br />
                                                                        • First Round: Contestants will have to perform for a time duration of 1 min on the track of their own choice.<br />
                                                                        • Semi-final round: A face-off round, your opponent will be selected by the judges randomly and you have to perform on a random track.<br />
                                                                        • Final Round: The winners of the previous round will battle each other for winning the title, again a face-off round.<br />
                                                                        3. The track of the semi-finals and final round will be played on the spot.<br />
                                                                        4. Rules will be the same as Finals.<br />
                                                                        <b>Finals:</b><br />
                                                                        1. Participants can incorporate styles like Hip-hop, Tutting, Flooring, Breaking or B-Boying, Krumping, Popping, Locking, Bollywood, and freestyle. Styles other than these are not encouraged.<br />
                                                                        2. Participants need to bring their soundtrack.<br />
                                                                        • Participants may use multiple songs.<br />
                                                                        • Pre-recorded music should be brought in a CD/DVD or a pen drive in .cad or .mp3 format only (Other formats may not be supported on the computer. Use them at your own risk).<br />
                                                                        • Submit your track through the app at least 15-30 minutes before the start of the event.<br />
                                                                        • The track should be in .mp3 format.<br />
                                                                        3. Teams must follow the Time Limits. The teams which fail to do so will be penalized by the judges.<br />
                                                                        4. Props can be used. They need to be brought by the team itself. However, the organizing team holds the discretion of not allowing it on the stage.<br />
                                                                        5. Any kind of fluids, heavy objects, and flame are prohibited on stage.<br />
                                                                        6. Obscenity of any kind is not allowed and will lead to immediate disqualification.<br />
                                                                        7. The decision of the judges and the organizing team shall be final and binding.<br /><br />

                                                                        <br />

                                                                        <span  className='text-black'><b>Prize Pool: INR 7,000/-</b></span><br /><br />

                                                                        <span  className='text-black'>
                                                                            Date: 9<sup>th</sup> March<br />
                                                                            Note: Reach 1 day prior to the venue.<br />
                                                                            Registration date: On spot registration. <br />
                                                                            Entry Fee: 200/- per person   <br />
                                                                        </span>

                                                                        <br />
                                                                        <span  className='text-black'>
                                                                            *If the event registration fee is less than Rs. 200/person then participant have to pay Rs. 200 college entry fee.<br></br>
                                                                            *Exclusively relevant to events with single participants
                                                                        </span> <br /><br />
                                                                    </p> */}
                                                                </div>
                                                            </div>


                                                        </div>
                                                    </div>



                                                </div>
                                            </div>
                                        </div>
                                        
                                    
                                    )
                                    }


                                    {activeTab === 'step-two' && (
                                        <div className="tab-pane fade show active" id="step-two" role="tabpanel" aria-labelledby="tuesday-tab">

                                            <div className="single-tab-content">
                                            <div className="row">
                                                    <div className="col-12">
                                                        <div className="bg-gray-100 border-2 border-black single-schedule-area single-page d-flex flex-wrap justify-content-between align-items-center wow " data-wow-delay="0ms">
                                                            <div className="single-schedule-tumb-info d-flex align-items-center">
                                                                <div className="single-schedule-info text-black">
                                                                    <h3 className='text-center font-bold' >Yet To Update </h3>
                                                                    {/* <p>
                                                                        A solo dance face-off is a dance competition where individual dancers compete against each other to showcase their skills, technique, and performance abilities.<br /><br />
                                                                    </p>
                                                                    <p className='text-black'>
                                                                        <b>Time Limit:</b><br />
                                                                        • First round: 1 min<br />
                                                                        <b>Team size</b> : Solo<br /><br />
                                                                    </p>
                                                                    <h6 >Rules:</h6>
                                                                    <p className='text-black'>
                                                                        1. There are three rounds for this competition as listed below:<br />
                                                                        2. Elimination round:<br />
                                                                        • First Round: Contestants will have to perform for a time duration of 1 min on the track of their own choice.<br />
                                                                        • Semi-final round: A face-off round, your opponent will be selected by the judges randomly and you have to perform on a random track.<br />
                                                                        • Final Round: The winners of the previous round will battle each other for winning the title, again a face-off round.<br />
                                                                        3. The track of the semi-finals and final round will be played on the spot.<br />
                                                                        4. Rules will be the same as Finals.<br />
                                                                        <b>Finals:</b><br />
                                                                        1. Participants can incorporate styles like Hip-hop, Tutting, Flooring, Breaking or B-Boying, Krumping, Popping, Locking, Bollywood, and freestyle. Styles other than these are not encouraged.<br />
                                                                        2. Participants need to bring their soundtrack.<br />
                                                                        • Participants may use multiple songs.<br />
                                                                        • Pre-recorded music should be brought in a CD/DVD or a pen drive in .cad or .mp3 format only (Other formats may not be supported on the computer. Use them at your own risk).<br />
                                                                        • Submit your track through the app at least 15-30 minutes before the start of the event.<br />
                                                                        • The track should be in .mp3 format.<br />
                                                                        3. Teams must follow the Time Limits. The teams which fail to do so will be penalized by the judges.<br />
                                                                        4. Props can be used. They need to be brought by the team itself. However, the organizing team holds the discretion of not allowing it on the stage.<br />
                                                                        5. Any kind of fluids, heavy objects, and flame are prohibited on stage.<br />
                                                                        6. Obscenity of any kind is not allowed and will lead to immediate disqualification.<br />
                                                                        7. The decision of the judges and the organizing team shall be final and binding.<br /><br />

                                                                        <br />

                                                                        <span  className='text-black'><b>Prize Pool: INR 7,000/-</b></span><br /><br />

                                                                        <span  className='text-black'>
                                                                            Date: 9<sup>th</sup> March<br />
                                                                            Note: Reach 1 day prior to the venue.<br />
                                                                            Registration date: On spot registration. <br />
                                                                            Entry Fee: 200/- per person   <br />
                                                                        </span>

                                                                        <br />
                                                                        <span  className='text-black'>
                                                                            *If the event registration fee is less than Rs. 200/person then participant have to pay Rs. 200 college entry fee.<br></br>
                                                                            *Exclusively relevant to events with single participants
                                                                        </span> <br /><br />
                                                                    </p> */}
                                                                </div>
                                                            </div>


                                                        </div>
                                                    </div>



                                                </div>
                                            </div>
                                        </div>)
                                    }

                                    {activeTab === 'step-three' && (
                                        <div className="tab-pane fade show active" id="step-three" role="tabpanel" aria-labelledby="wednesday-tab">

                                            <div className="single-tab-content">
                                            <div className="row">
                                                    <div className="col-12">
                                                        <div className="bg-gray-100 border-2 border-black single-schedule-area single-page d-flex flex-wrap justify-content-between align-items-center wow " data-wow-delay="0ms">
                                                            <div className="single-schedule-tumb-info d-flex align-items-center">
                                                                <div className="single-schedule-info text-black">
                                                                    <h3 className='text-center font-bold'>Yet To Update </h3>
                                                                    {/* <p>
                                                                        A solo dance face-off is a dance competition where individual dancers compete against each other to showcase their skills, technique, and performance abilities.<br /><br />
                                                                    </p>
                                                                    <p className='text-black'>
                                                                        <b>Time Limit:</b><br />
                                                                        • First round: 1 min<br />
                                                                        <b>Team size</b> : Solo<br /><br />
                                                                    </p>
                                                                    <h6 >Rules:</h6>
                                                                    <p className='text-black'>
                                                                        1. There are three rounds for this competition as listed below:<br />
                                                                        2. Elimination round:<br />
                                                                        • First Round: Contestants will have to perform for a time duration of 1 min on the track of their own choice.<br />
                                                                        • Semi-final round: A face-off round, your opponent will be selected by the judges randomly and you have to perform on a random track.<br />
                                                                        • Final Round: The winners of the previous round will battle each other for winning the title, again a face-off round.<br />
                                                                        3. The track of the semi-finals and final round will be played on the spot.<br />
                                                                        4. Rules will be the same as Finals.<br />
                                                                        <b>Finals:</b><br />
                                                                        1. Participants can incorporate styles like Hip-hop, Tutting, Flooring, Breaking or B-Boying, Krumping, Popping, Locking, Bollywood, and freestyle. Styles other than these are not encouraged.<br />
                                                                        2. Participants need to bring their soundtrack.<br />
                                                                        • Participants may use multiple songs.<br />
                                                                        • Pre-recorded music should be brought in a CD/DVD or a pen drive in .cad or .mp3 format only (Other formats may not be supported on the computer. Use them at your own risk).<br />
                                                                        • Submit your track through the app at least 15-30 minutes before the start of the event.<br />
                                                                        • The track should be in .mp3 format.<br />
                                                                        3. Teams must follow the Time Limits. The teams which fail to do so will be penalized by the judges.<br />
                                                                        4. Props can be used. They need to be brought by the team itself. However, the organizing team holds the discretion of not allowing it on the stage.<br />
                                                                        5. Any kind of fluids, heavy objects, and flame are prohibited on stage.<br />
                                                                        6. Obscenity of any kind is not allowed and will lead to immediate disqualification.<br />
                                                                        7. The decision of the judges and the organizing team shall be final and binding.<br /><br />

                                                                        <br />

                                                                        <span  className='text-black'><b>Prize Pool: INR 7,000/-</b></span><br /><br />

                                                                        <span  className='text-black'>
                                                                            Date: 9<sup>th</sup> March<br />
                                                                            Note: Reach 1 day prior to the venue.<br />
                                                                            Registration date: On spot registration. <br />
                                                                            Entry Fee: 200/- per person   <br />
                                                                        </span>

                                                                        <br />
                                                                        <span  className='text-black'>
                                                                            *If the event registration fee is less than Rs. 200/person then participant have to pay Rs. 200 college entry fee.<br></br>
                                                                            *Exclusively relevant to events with single participants
                                                                        </span> <br /><br />
                                                                    </p> */}
                                                                </div>
                                                            </div>


                                                        </div>
                                                    </div>



                                                </div>
                                            </div>
                                        </div>)
                                    }
                                </div> 
                            
                                }
                            </div>
                        </div>
                    </div>
                </section>

                <div className="d-flex justify-content-around mb-3">
                </div>
            </div>
        </>


    );
}

export default MBHA;
