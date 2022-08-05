import React, { useContext, useState } from 'react'
import Map from './Map';
import Logo from './Logo';
import Button from './Button';
import UserContext from './UserContext';
import stepImage from '../images/step-1-bg.jpg'
import { updateUserData } from './services/updateUserData';
import { useEffect } from 'react';

const Consent = ({formData, acceptData, acceptGDPR, setAcceptData,setAcceptGDPR}) => {

  const [accData, setAcctData] = useState(false)
  const [accGdpr, setAcctGdpr] = useState(false)

  const handleChangeData = () => {
    setAcctData(!accData)
  }

  const handleChangeGdpr = () => {
    setAcctGdpr(!accGdpr)
  }
  
  return (
    <>
      <div className="col-lg-4 offset-lg-4 consent-wrapper">
        <p className="label">GDPR Consent Text</p>
        <p className="consent__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dui eu mollis est viverra amet purus. Link to privacy policy or more details</p>
        <div className="consent-inputs">
          <label className="input-wrapper input-wrapper--checkbox" htmlFor="gdprConsent">
            <span className="input-label">Yes</span>
            <input 
              value="yes"
              id="gdpr-yes" 
              type="checkbox" 
              name="gdprConsent"
              checked={accGdpr ? true : false}
              
            />
            <span className="checkmark" onClick={ handleChangeGdpr }/>
          </label>
          <label className="input-wrapper input-wrapper--checkbox" htmlFor="gdprConsent">
            <span className="input-label">No</span>
            <input 
              value="no"
              id="gdpr-no" 
              type="checkbox" 
              name="gdprConsent"
              checked={accGdpr ? false : true}
             
            />
            <span className="checkmark" onClick={ handleChangeGdpr } />
          </label>
        </div>
      </div>
      <div className="col-lg-4 consent-wrapper">
        <p className="label">Publish Data Consent</p>
        <p className="consent__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dui eu mollis est viverra amet purus. Link to privacy policy or more details</p>
        <div className="consent-inputs">
          <label className="input-wrapper input-wrapper--checkbox" htmlFor="dataConsent">
            <span className="input-label">Yes</span>
            <input 
              value="yes"
              id="data-yes" 
              type="checkbox" 
              name="dataConsent"
              checked={accData ? true : false}
              
            />
            <span className="checkmark" onClick={ handleChangeData } />
          </label>
          <label className="input-wrapper input-wrapper--checkbox" htmlFor="dataConsent">
            <span className="input-label">No</span>
            <input 
              value="no"
              id="data-no" 
              type="checkbox" 
              name="dataConsent"
              checked={accData ? false : true}
               
            />
            <span className="checkmark" onClick={ handleChangeData }/>
          </label>
        </div>
      </div>
    </>
  )
}

export const Step2 = ({ formData, loadingMap, acceptGDPR, acceptData, setAcceptGDPR, setAcceptData, acceptGeolocation, setAcceptGeolocation, handleClick, handleChange, localizationEnabled }) => {
  const [error, setError] = useState('');
  const userData = useContext(UserContext);

  const  { user } = userData;

  // ======================
  // Event handlers

  const checkInputsData = async (e) => {
    if(!formData["Name"]) {
      setError('Please, add the name of the Crew Leader')
    } else if (formData["Email"] && !formData["Email"].includes('@')) {
      setError('Please, add a correct email for the Crew Leader')
    } else if(!formData["Email"]) {
      setError('Please, add the email of the Crew Leader')
    } else if(!formData["Affiliation"]) {
      setError('Please, add the affiliation of the Crew')
    } else {
      if(!acceptGeolocation) {
        handleClick(e);
      } else {
        try {
          let response = await updateUserData(formData);
          if (response) {
            handleClick(e);
          } else {
            setError(`Error`)
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  }
  
  
  const checkFormState = (e) => {
    handleChange(e)
  }

  return (
    <div className="step step__2">

      <div className="step__background">
        <img src={stepImage} alt="" />
      </div>

      <div className="container">
        <div className="site__logo">
          <Logo/>
        </div>
        <div className="step__background--color">
        </div>
        <div className="step__content">

          <div className="row">
            <div className="offset-lg-4 col-lg-8 step__intro">
              {
                user ?
                  <>
                    <h2 className="step__headline">Nice to see you again, {formData.Name}!</h2>
                    <p className="step__text">You can confirm or update your info below. <a href="">Not {formData.Name}?</a></p>
                  </>
                :
                  <h2 className="step__headline">Welcome to GirlTrek Crew Leaders</h2>
              }
            </div>
          </div>

          <div className="row step__inputs">
            <div className="offset-lg-4 col-lg-4 input-wrapper">
              <label htmlFor="crew-name">Crew Name *</label>
              <select        
                required 
                id="crew-name" 
                name="Crew Name" 
                onChange={(e) => checkFormState(e)}
                value={formData["Crew Name"] ? formData["Crew Name"] : ""}
              >
                <option value="">Select</option>
                <option value="CrewName-1">CrewName-1</option>
                <option value="CrewName-2">CrewName-2</option>
              </select>
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
            <div className="offset-lg-4 col-lg-4 input-wrapper padding-l">
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
            <div className="col-lg-4 input-wrapper">
              <label htmlFor="crew-affiliation">Crew Affiliation: My crew is officially associated with...*</label>
              <select 
                id="crew-affiliation" 
                name="Affiliation" 
                value={formData.Affiliation}
                onChange={(e) => checkFormState(e)}
              >
                <option value="">Select</option>
                <option value="Church">Church</option>
                <option value="Sorority">Sorority</option>
                <option value="Partner/Organization">Partner/Organization</option>
                <option value="HBCU">HBCU</option>
                <option value="Ally">Ally</option>
              </select>
            </div>
            <div className="offset-lg-4 col-lg-4 input-wrapper">
              <label htmlFor="phone">Phone Number*</label>
              <input 
                required 
                id="phone" 
                type="phone" 
                placeholder=""
                name="Phone" 
                value={formData.Phone}
                onChange={(e) => checkFormState(e)}
              />
            </div>
            <div className="col-lg-4 input-wrapper">
              <label htmlFor="role">Role*</label>
              <select 
                id="role" 
                name="Role" 
                value={formData.Role}
                onChange={(e) => checkFormState(e)}
              >
                <option value="">Select</option>
                <option value="Crew Attendee">Crew Attendee</option>
                <option value="Crew Leader">Crew Leader</option>
                <option value="Solo Treker">Solo Treker</option>
              </select>
            </div>

            <div className="offset-lg-4 col-lg-8">
              <h3 className="step__input-headline">Where are you walking with your crew?</h3>
              <p className="step__text">Fill out the info below so we can connect women to you.</p>
            </div>

            {
              'geolocation' in navigator
                &&
              <>
                <div className="offset-lg-4 col-lg-8">
                  <label className="input-wrapper input-wrapper--checkbox" htmlFor="geolocation">
                    <span className={`input-label ${!localizationEnabled ? 'disabled' : null}`}><span className={!localizationEnabled ? 'text-disabled' : ''}>Use my location.</span> {!localizationEnabled ? `Please, turn on location permissions in your browser to enble geolocation.` : ''}</span>
                    <input 
                      type="checkbox" 
                      id="geolocation" 
                      name="geolocation"
                      value="geolocation"
                      checked={acceptGeolocation ? true : false}
                      disabled={!localizationEnabled ? true : false}
                      onChange={() => setAcceptGeolocation(!acceptGeolocation)} 
                    />
                    <span className="checkmark"/>
                  </label>
                </div>
                {
                  loadingMap &&
                  <div className="col-lg-5 offset-lg-4">
                    <div className="loader-container">
                      <div class="loader"></div>
                    </div>
                  </div>
                }
                {
                  formData.Latitude 
                  && 
                  formData.Longitude 
                  &&
                  !loadingMap 
                  &&
                  <Map lat={formData.Latitude } lng={formData.Longitude }/>
                }
                <div className="offset-lg-4 col-lg-8">
                  <label className="input-wrapper input-wrapper--checkbox" htmlFor="editLocation">
                    <span className="input-label">Edit my location manually.</span>
                    <input 
                      type="checkbox"
                      id="editLocation"
                      name="editLocation"
                      value="editLocation"
                      checked={acceptGeolocation ? false : true}
                      onChange={() => localizationEnabled && setAcceptGeolocation(!acceptGeolocation)} 
                    />
                    <span className="checkmark"/>
                  </label>
                </div>
              </>
            }

            {
              !user
                &&
              <Consent 
                formData={formData} 
                acceptData={acceptData}
                acceptGDPR={acceptGDPR}
                setAcceptGDPR={setAcceptGDPR}
                setAcceptData={setAcceptData}
              />
            }

            <div className="offset-lg-4 col-lg-8">
              <Button checkInputsData={checkInputsData}/>
              {
                error 
                  &&
                <p className="error-message">{error}</p>
              }
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
