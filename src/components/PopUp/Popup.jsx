import React, { useState } from "react";
import { toast } from "react-hot-toast";
import "./Popup.css";
// import { changeparticipantsverification } from "../../Redux/participantsSlice";
import { useDispatch } from "react-redux";


const Popup = ({ usersdata, setPopup }) => {
    const dispatch = useDispatch();
    const [userInput, setUserInput] = useState({

        subject: "",
        message: "",
    });

    // Function to handle the input change
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserInput({ ...userInput, [name]: value });
    };

    // Function to send form data to backend
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // Check for empty fields
        if (!userInput.subject || !userInput.message) {
            toast.error("All fields are mandatory");
            return;
        }



        try {
            // Send form data to backend

            const data = { courseId: usersdata.courseId, lectureId: usersdata.lectureId, subjects: userInput.subject, messages: userInput.message, isverified: false };
            //console.log("datav swvb b", data);
            // await dispatch(changeparticipantsverification(data));
            // const res = await axiosInstance.post("/Popup", { ...userInput });



            // Clear input fields after successful submission
            setUserInput({

                subject: "",
                message: "",
            });

            // Close the popup
            setPopup(false);
        } catch (error) {
            toast.error("Operation failed...");
        }
    };

    // Function to handle cancel button click
    const handleCancelClick = () => {
        // Close the popup
        setPopup(false);
    };

    return (
        <div className="popup-container">
            <div className="popup-content">

                <form onSubmit={handleFormSubmit} className="popup-form">
                    <h3 className="popup-title">Rejection Form</h3>

                    <div className="popup-input-group">
                        <label htmlFor="subject" className="popup-label">
                            subject
                        </label>
                        <input
                            type="subject"
                            name="subject"
                            id="subject"
                            value={userInput.subject}
                            onChange={handleInputChange}
                            className="popup-input"
                            placeholder="Enter your subject"
                        />
                    </div>
                    <div className="popup-input-group">
                        <label htmlFor="message" className="popup-label">
                            Message
                        </label>
                        <textarea
                            name="message"
                            id="message"
                            value={userInput.message}
                            onChange={handleInputChange}
                            className="popup-textarea"
                            placeholder="Enter your message"
                        ></textarea>
                    </div>
                    <button type="submit" className="popup-submit-btn">
                        Submit
                    </button>
                    <button className="popup-cancel-btn" onClick={handleCancelClick}>
                        Cancel
                    </button>

                </form>
            </div>
        </div>
    );
};

export default Popup;
