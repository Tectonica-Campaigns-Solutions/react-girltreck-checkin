import React, { useContext, useState } from "react";
import Map from "./Map";
import Logo from "./Logo";
import Button from "./Button";
import Consent from "./Consent";
import UserContext from "./UserContext";
import stepImage from "../images/step-1-bg.jpg";
import axios from "axios";
import iconInfo from "../images/icon-info.svg";
import { useEffect } from "react";

const Step2 = ({
  formData,
  loadingMap,
  acceptGDPR,
  acceptDataConsent,
  acceptGeolocation,
  setAcceptGeolocation,
  handleClick,
  handleChange,
  localizationEnabled,
  setAcceptGDPR,
  setAcceptDataConsent,
  setFormData,
  acceptLiabilty,
  setAcceptLiabilty,
  step,
}) => {
  const [error, setError] = useState("");
  const [networkError, setNetworkError] = useState(false);
  const userData = useContext(UserContext);
  const [showBubbleInfo, setShowBubbleInfo] = useState(false);
  const [loadingResponse, setLoadingResponse] = useState(false);

  const { user } = userData;

  useEffect(() => {
    document.querySelector("body").addEventListener("click", (e) => {
      if (!e.target.classList.contains("icon-info")) {
        setShowBubbleInfo(false);
      }
    });
  });

  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        ["Crew name - manual"]: user["Crew name - manual"],
        ["Role - new form"]: user["Role - new form"],
        Phone: user.Phone,
      });
    }
  }, [user]);

  // ======================
  // Event handlers

  const handlerBubble = () => {
    setShowBubbleInfo(true);
  };

  const checkInputsData = async (e) => {
    if (!formData["Crew name - manual"]) {
      setError("Please, add crew name");
    } else if (!formData["Name"]) {
      setError("Please, add the name of the Crew Leader");
    } else if (formData["Email"] && !formData["Email"].includes("@")) {
      setError("Please, add a correct email for the Crew Leader");
    } else if (!formData["Email"]) {
      setError("Please, add the email of the Crew Leader");
    } else if (!formData["Phone"] && !user) {
      setError("Please, add phone number");
    } else if (formData["Liability Consent"] === "false") {
      setError("Please, confirm you have read and sign Liability Consent");
    } else if (!formData["Role - new form"]) {
      setError("Please, choose role");
    } else {
      if (!acceptGeolocation) {
        handleClick(e);
      } else {
        try {
          setLoadingResponse(true);
          let response = await axios({
            method: "post",
            url: "https://us-central1-girltrektectonica.cloudfunctions.net/appUpdateUserData",
            headers: { "Content-Type": "application/json" },
            data: formData,
          });

          if (response.status == 200) {
            handleClick(e);
            setLoadingResponse(false);
          } else {
            setNetworkError(true);
          }
        } catch (error) {
          console.error(error);
          setError("");
          setNetworkError(true);
          setLoadingResponse(false);
        }
      }
    }
  };

  const checkFormState = (e) => {
    handleChange(e);
  };

  return (
    <div className="step step__2">
      <div className="step__background">
        <img src={stepImage} alt="" />
      </div>

      <div className="container">
        <div className="site__logo">
          <Logo />
        </div>
        <div className="step__background--color"></div>
        <div className="step__content">
          <div className="row">
            <div className="offset-lg-4 col-lg-8 step__intro">
              {user ? (
                <>
                  <h2 className="step__headline">
                    Nice to see you again, {formData.Name}!
                  </h2>
                  <p className="step__text">
                    You can confirm or update your info below.{" "}
                    <a href="">Not {formData.Name}?</a>
                  </p>
                </>
              ) : (
                <>
                  <h2 className="step__headline">
                    Welcome to GirlTrek Crew Leaders
                  </h2>
                  <p className="step__text">
                    Let us know your details. Fill out the information below
                    only once and it will pre-fill in the future
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="row step__inputs">
            <div className="offset-lg-4 col-lg-4 input-wrapper">
              <label htmlFor="crew-name">Crew Name *</label>
              <input
                type="text"
                id="crew-name"
                name="Crew name - manual"
                onChange={(e) => checkFormState(e)}
                value={
                  formData["Crew name - manual"]
                    ? formData["Crew name - manual"]
                    : ""
                }
              />
            </div>
            <div className="col-lg-4 input-wrapper">
              <label htmlFor="crew-leader-name">Crew Leader Name *</label>
              <input
                required
                type="text"
                placeholder=""
                id="crew-leader-name"
                name="Name"
                value={formData.Name}
                onChange={(e) => checkFormState(e)}
              />
            </div>
            <div className="offset-lg-4 col-lg-4 input-wrapper">
              <label htmlFor="email">Crew Leader Email*</label>
              <input
                required
                type="email"
                placeholder=""
                id="crew-leader-email"
                name="Email"
                value={formData.Email}
                onChange={(e) => checkFormState(e)}
              />
            </div>

            <div className={`col-lg-4 input-wrapper ${user ? "d-none" : ""}`}>
              <label htmlFor="phone">Phone Number*</label>
              <input
                required
                id="phone"
                type="phone"
                placeholder="+18762229999"
                name="Phone"
                value={formData.Phone}
                onChange={(e) => checkFormState(e)}
              />
            </div>

            <div
              className={`${!user ? "offset-lg-4" : ""} col-lg-4 input-wrapper`}
            >
              <label htmlFor="role">Role*</label>
              <select
                id="role"
                name="Role - new form"
                value={formData["Role - new form"]}
                onChange={(e) => checkFormState(e)}
              >
                <option value="">Select</option>
                <option value="Neighborhood Crew Leader">
                  Neighborhood Crew Leader
                </option>
                <option value="Special Impact Crew Leader - Soroities">
                  Special Impact Crew Leader - Soroities
                </option>
                <option value="Special Impact Crew Leader - Churches">
                  Special Impact Crew Leader - Churches
                </option>
                <option value="Special Impact Crew Leader - Adventure Squad">
                  Special Impact Crew Leader - Adventure Squad
                </option>
                <option value="Special Impact Crew Leader - HBCUs">
                  Special Impact Crew Leader - HBCUs
                </option>
                <option value="Special Impact Crew Leader - Partner/Organization">
                  Special Impact Crew Leader - Partner/Organization
                </option>
              </select>
            </div>

            <div
              className={`${
                user ? "offset-lg-4" : ""
              } col-lg-4 input-wrapper padding-l bubble-info d-flex align-items-center`}
            >
              <img
                src={iconInfo}
                alt=""
                onClick={() => handlerBubble()}
                className="icon-info"
              />
              {showBubbleInfo && (
                <p className="buble-box-right">
                  Are you leading a crew that is officially associated with one
                  of GirlTrek's special interest groups? Let us know and connect
                  with a special impact coach{" "}
                  <a href="/" target="_blank">
                    here
                  </a>
                  .
                </p>
              )}
            </div>

            <div className="offset-lg-4 col-lg-8 mt-4 mt-lg-0">
              <h3 className="step__input-headline">
                Where are you walking with your crew?
              </h3>
              <p className="step__text">
                Fill out the info below so we can connect women to you.
              </p>
            </div>

            {"geolocation" in navigator && (
              <>
                <div className="offset-lg-4 col-lg-8">
                  <label
                    className="input-wrapper input-wrapper--checkbox"
                    htmlFor="geolocation"
                  >
                    <span
                      className={`input-label ${
                        !localizationEnabled ? "disabled" : null
                      }`}
                    >
                      <span
                        className={!localizationEnabled ? "text-disabled" : ""}
                      >
                        Use my location.
                      </span>{" "}
                      {!localizationEnabled
                        ? `Please, turn on location permissions in your browser to enble geolocation.`
                        : ""}
                    </span>
                    <input
                      type="checkbox"
                      id="geolocation"
                      name="geolocation"
                      value="geolocation"
                      checked={acceptGeolocation ? true : false}
                      disabled={!localizationEnabled ? true : false}
                      onChange={() => setAcceptGeolocation(!acceptGeolocation)}
                    />
                    <span className="checkmark" />
                  </label>
                </div>
                {loadingMap && (
                  <div className="col-lg-5 offset-lg-4">
                    <div className="loader-container">
                      <div class="loader"></div>
                    </div>
                  </div>
                )}
                {formData.Latitude && formData.Longitude && !loadingMap && (
                  <Map lat={formData.Latitude} lng={formData.Longitude} />
                )}
                <div className="offset-lg-4 col-lg-8">
                  <label
                    className="input-wrapper input-wrapper--checkbox"
                    htmlFor="editLocation"
                  >
                    <span className="input-label">
                      Edit my location manually.
                    </span>
                    <input
                      type="checkbox"
                      id="editLocation"
                      name="editLocation"
                      value="editLocation"
                      checked={acceptGeolocation ? false : true}
                      onChange={() =>
                        localizationEnabled &&
                        setAcceptGeolocation(!acceptGeolocation)
                      }
                    />
                    <span className="checkmark" />
                  </label>
                </div>
              </>
            )}

            {!user && (
              <Consent
                acceptGDPR={acceptGDPR}
                handleChange={handleChange}
                acceptDataConsent={acceptDataConsent}
                setAcceptGDPR={setAcceptGDPR}
                setAcceptDataConsent={setAcceptDataConsent}
                formData={formData}
                setFormData={setFormData}
                checkInputsData={checkInputsData}
                acceptLiabilty={acceptLiabilty}
                setAcceptLiabilty={setAcceptLiabilty}
                showPopupLiabilty={true}
                step={step}
              />
            )}

            <div className="offset-lg-4 col-lg-8">
              {networkError && (
                <div className="alert alert-danger mt-3" role="alert">
                  Something went wrong. Try again later
                </div>
              )}
              <Button checkInputsData={checkInputsData} disabled={loadingResponse} loading={loadingResponse} />
              {error && <p className="error-message">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
