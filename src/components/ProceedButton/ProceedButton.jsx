import { useNavigate } from "react-router-dom";
import { useSession } from "../ProtectedPath/SessionContext";
import axiosInstance from "../../Helper/axiosInstance";
import toast from "react-hot-toast";
import { Captcha } from "../../components/CAPTACH/Captcha";
import { Alert } from "@mui/material";
import { useState } from "react";




function ProceedButton({ newSelectedRoom, handleClick }) {

  function separateString(inputString) {

    const lastUnderscoreIndex = inputString.lastIndexOf('_');


    const part1 = inputString.substring(0, lastUnderscoreIndex);
    const part2 = inputString.substring(lastUnderscoreIndex + 1);


    return {
      hostel_name: part1,
      room_no: part2,
      bhacheed: "chatGptSeExtractKraLiyo",
    };
  }
  const sendToCaptchaForValidation = (e) => {
    setVerified(e);
  };

  const { session, updateSession } = useSession();
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(true);


  const handleProceed = async () => {
    var data = separateString(newSelectedRoom);
    data.code = session.code;
    //  console.log('asdf;lkj', data);
    const userConfirmed = window.confirm(
      "In the future, you will not be able to update this. Do you want to proceed?"
    );
    if (userConfirmed) {
      try {
        let res = axiosInstance.post(`/book_room.php`, data);

        await toast.promise(res, {
          loading: "Booking your room...",
          success: (data) => {
            //console.log(data?.data);
            return data?.data?.message;
          },
          error: (data) => {
            //console.log(data?.response?.data);
            return data?.response?.data.message;
            setVerified(false);
            setShowCaptcha(true);

          },
        });
        res = await res;

        if (res?.data?.status === "success") {
          updateSession({ stepIndex: 6 });
        }
      } catch (error) {
        console.error("Error Logging out the user.", error);
        setVerified(false);
        setShowCaptcha(true);
      }

    } else {
      toast("Please select a room.");
    }

  }

  return (
    <>

      <div className="sticky  bottom-[85px] left-[70%] w-1/4 bg-slate-100">
        {verified && (
          <Alert variant="outlined" sx={{ marginBottom: "10px" }}>
            Captcha Validated Successful
          </Alert>
        )}
        {(newSelectedRoom && showCaptcha) && <Captcha setVerification={sendToCaptchaForValidation} setShowCaptcha={setShowCaptcha} />}

      </div>
      <button className={
        ` sticky  bottom-[5px] left-3/4  md:w-32 text-2xl md:h-16 p-2 rounded-md ml-[80%] z-1 
       
          
           ${verified ? "bg-blue-900 text-white" : "bg-blue-300"
        } `}
        onClick={async () => {
          ////console.log('kukuku', newSelectedRoom);
          handleProceed();
        }}

        disabled={!verified}
      >
        Proceed
      </button>
    </>
  )
}

export default ProceedButton;
