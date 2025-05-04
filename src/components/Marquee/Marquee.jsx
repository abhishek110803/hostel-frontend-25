import React, { useEffect, useRef } from 'react';
import { Link } from "react-router-dom";

const Schedule_url = 'https://drive.google.com/file/d/12XixvATiUnumOCUZWmOI-mZJdRRXcvpA/view';
const Steps_url = 'https://drive.google.com/file/d/1RgQ0_VkJnNoLC6xXO8AIE-yUc_1BESZF/view';
const Hostel_Availability_url = 'https://drive.google.com/file/d/12zPFHhPt8EhglLDLQVNKTX-ufiErMBIa/view';

const downloadFileAtURL = (url) => {

    const fileName = url.split('/').pop()
    const aTag = document.createElement('a')
    aTag.href = url
    aTag.setAttribute('download', fileName)
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();

}


const Marquee = ({ text, speed = 5}) => {
    const marqueeRef = useRef(null);

    useEffect(() => {
        const marquee = marqueeRef.current;
        let startPosition = marquee.scrollWidth;

        const scrollMarquee = () => {
            startPosition -= 1;
            if (startPosition < -marquee.scrollWidth) {
                startPosition = marquee.offsetWidth;
            }
            marquee.style.transform = `translateX(${startPosition}px)`;
        };

        const intervalId = setInterval(scrollMarquee, speed);

        return () => clearInterval(intervalId);
    }, [speed]);

    return (
        <div className="overflow-hidden whitespace-nowrap w-full bg-gray-200 ">
            <div
                className="inline-block pl-full animate-marquee hover:pause-marquee mt-4 mb-4 font-bold text-xl "
                ref={marqueeRef}
            >
    
                 <Link to="https://nitj.ac.in/template/index.html?id=6674fc88d331148a19c98825?category=newpage" className="text-blue-600 inline"  > Click Here For Institute Fee Payment .
                </Link>

                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              
                <Link to="https://nitj.ac.in/template/index.html?id=6687b76404e16af6817a565e?category=newpage" className="text-blue-600 inline"  > Click Here For Mess Fee Payment .
                </Link>

                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              
              
                <Link className="text-blue-600 inline" onClick={() => downloadFileAtURL(Hostel_Availability_url)} > The hostel allotment to UG and PG students for the session July – December 2024 .
                </Link>

                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              
              
                <Link className="text-blue-600 inline" onClick={() => downloadFileAtURL(Steps_url)} > The details of the online hostel allotment process .

                </Link>

                {/* </div> */}

            </div>
        </div>
    );
};

export default Marquee;
