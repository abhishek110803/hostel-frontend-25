import React, { useState } from 'react';
import './Contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faEnvelope, faMapMarkerAlt, faPhone, faUser, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../../Helper/axiosInstance';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { faTeamspeak } from '@fortawesome/free-brands-svg-icons';

const ContactSection = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    //console.log(name);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(formData);

    try {
      const url = '/contact'

      let res = axiosInstance.post(url, formData);
      await toast.promise(res, {
        loading: "Loading...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to Send",
      });
      res = await res;

      //console.log(res.data);
      if (res?.data?.success) {
        toast.success(res.data.message)
      } else {
        toast.error(res?.data?.message);
      }
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

    } catch (err) {
      //console.log(err);
      toast.error('Connection Error');
    }
  }
  const location = useLocation();

  return (
    <div style={{ zIndex: '3' }}>{(location.pathname === '/Contacts') && <div style={{ minHeight: '5rem' }}></div>}
      <section style={{ backgroundColor: 'aliceblue', padding: '30px 0px 30px', zIndex: '1' }}>
        <div className="contact" id="contact">
          <div className="max-width">
            <h2 className="title" style={{ textAlign: 'center', color: '#070707', marginBottom: '30px' }}>Contact Us</h2>

            <div className="contact-content">
              <div className="column ">
                <div className="text">Get in Touch</div>
                <div className="icons">
                  <div className="row">



                    <FontAwesomeIcon icon={faUserGroup} />
                    <div className="info">
                      {/* <div className="head">Name</div> */}
                      <div className="sub-title">Team Utkansh</div>
                    </div>
                  </div>

                  <div className="row">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <div className="info">
                      <div className="head">Address</div>
                      <div className="sub-title">NIT Jalandhar</div>
                    </div>
                  </div>


                  <div className="row">
                    <FontAwesomeIcon icon={faEnvelope} />
                    <div className="info">
                      <div className="head">Email</div>
                      <div className="sub-title">utkansh@nitj.ac.in</div>
                    </div>
                  </div>


                  <div className="row">
                    <FontAwesomeIcon icon={faPhone} />
                    <div className="info">
                      <div className="head">Phone No.</div>
                      <div className="sub-title">8905060066</div>
                    </div>
                  </div>


                </div>
              </div>


              <div className="column right">
                <div className="text">Message us</div>
                <form className='contactform' onSubmit={handleSubmit}>
                  <div className="fields">
                    <div className="field namee">
                      <input type="text" placeholder="Name" name='name' className='textarae' required onChange={handleChange} value={formData.name} />
                    </div>

                    <div className="field email">
                      <input type="email" placeholder="Email" name='email' className='textarae' required onChange={handleChange} value={formData.email} />
                    </div>
                  </div>
                  <div className="field">
                    <input type="text" placeholder="Subject" name='subject' className='textarae' required onChange={handleChange} value={formData.subject} />
                  </div>
                  <div className="field textarea textarat">
                    <textarea cols="30" rows="10" placeholder="Message.." name='message' className='textarae' required onChange={handleChange} value={formData.message} ></textarea>
                  </div>
                  <div className="button-area">
                    <button type="submit">Send message</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

  );
};

export default ContactSection;