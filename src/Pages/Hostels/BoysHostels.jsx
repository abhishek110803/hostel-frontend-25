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

function BoysHostels() {
    return (
        <> 
          
            <div className='AllHostels'>
                {/* <h2 className='hostelhead'>Hostels</h2> */}
                <div className="row12">
                    <HostelCard hostelName="MBH-A" link="/HostelDetails/MBH-A" />
                    <HostelCard hostelName="MBH-B" link="/HostelDetails/MBH-B" />
                    <HostelCard hostelName="MBH-F" link="/HostelDetails/MBH-F" />
                    <HostelCard hostelName="BH-3" link="/HostelDetails/BH-3" />
                    <HostelCard hostelName="BH-4" link="/HostelDetails/BH-4" />
                    <HostelCard hostelName="BH-5" link="/HostelDetails/BH-5" />
                    <HostelCard hostelName="BH-6" link="/HostelDetails/BH-6" />
                    <HostelCard hostelName="BH-7" link="/HostelDetails/BH-7" />
                    <HostelCard hostelName="BH-7E" link="/HostelDetails/BH-7E" />
                </div>
            </div>

        </>
    );
}

export default BoysHostels;
