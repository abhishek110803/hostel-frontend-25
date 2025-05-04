import React from 'react';
import { Link } from 'react-router-dom';
import './Hostels.css'; // Assuming you have the CSS file in your project
import NavBar from '../../components/Navbar/Navbar';

function HostelCard({ hostelName, link }) {
    return (
        <div className="col-md-12 col-sm-12 col-xs-12">
            <div className="card1234">
                <div className={`cover item-${hostelName.toLowerCase().replace(/\s+/g, '-')}`}>
                    <h1>{hostelName}</h1>
                    <div className="card1234-back">
                        <Link to={`${link}`}>
                            View Details
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function GirlsHostels() {
    return (
        <>

            <div className='AllHostels'>
                {/* <h2 className='hostelhead'>Hostels</h2> */}
                <div className="row12">
                    <HostelCard hostelName="GH-1" link="/HostelDetails/GH-1" />
                    <HostelCard hostelName="GH-2" link="/HostelDetails/GH-2" />
                    <HostelCard hostelName="MGH" link="/HostelDetails/MGH-P1" />
                    <HostelCard hostelName="MGH Phase-2" link="/HostelDetails/MGH-P2" />
                </div>
            </div>

        </>
    );
}

export default GirlsHostels;
