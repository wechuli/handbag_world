import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompass,
  faPhone,
  faClock,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="bck_b_dark">
      <div className="container">
        <div className="logo">Handbag World</div>
        <div className="wrapper">
          <div className="left">
            <h2>Contact Information</h2>
            <div className="business_nfo">
              <div className="tag">
                <FontAwesomeIcon icon={faCompass} className="icon" />
                <div className="nfo">
                  <div>Address</div>
                  <div>Nairobi</div>
                </div>
              </div>

              <div className="tag">
                <FontAwesomeIcon icon={faPhone} className="icon" />
                <div className="nfo">
                  <div>Phone</div>
                  <div>1234567</div>
                </div>
              </div>

              <div className="tag">
                <FontAwesomeIcon icon={faClock} className="icon" />
                <div className="nfo">
                  <div>Working Hours</div>
                  <div>Mon-Fri 9am-5pm</div>
                </div>
              </div>

              <div className="tag">
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
                <div className="nfo">
                  <div>Email</div>
                  <div>handbworld@hworld.com</div>
                </div>
              </div>
            </div>
          </div>
          <div className="left">
            <h2>Be the first to know</h2>
            <div>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Incidunt repellendus explicabo mollitia ipsam nem
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
