import React, { useContext, useState } from 'react'
import Map from './Map';
import Logo from './Logo';
import Button from './Button';
import UserContext from './UserContext';
import stepImage from '../images/step-1-bg.jpg'
import { updateUserData } from './services/updateUserData';
import { useEffect } from 'react';

const Consent = ({handleChange, acceptGDPR, acceptDataConsent, setAcceptGDPR, seAcceptDataConsent}) => {
  // useEffect(() => {
  //     const externalScript = document.createElement("script");
  //     externalScript.src = `https://www.smartwaiver.com/m/webpl/f.js?webpl_waiver=615fa299c802a&webpl_title=Sign%20our%20waiver&webpl_align=Right&webpl_fontsize=20&webpl_background=%23000000&webpl_fontcolor=%23FFFFFF&webpl_font=Verdana`;
  //     externalScript.addEventListener('load', () => setLoaded(true))
  //     document.body.appendChild(externalScript)
  // }, []);

  // const [loaded, setLoaded] = useState(false)

  const handlerChecked = (e) => {
    if(e.target.classList.contains('gdpr-checkbox')){
      if(e.target.dataset.value == 'true'){
        setAcceptGDPR(true)
      }else{
        setAcceptGDPR(false)
      }
      e.target.name = 'GDPR consent'
      e.target.value = acceptGDPR
      handleChange(e)
    }

    if(e.target.classList.contains('data-consent-checkbox')){
      if(e.target.dataset.value == 'true'){
        seAcceptDataConsent(true)
      }else{
        seAcceptDataConsent(false)
      }
      e.target.name = 'Data consent'
      e.target.value = acceptGDPR
      handleChange(e)
    }
  }
  return (
    <>
      <div className="col-lg-4 offset-lg-4 consent-wrapper">
        <p className="label">GDPR Consent Text</p>
        <p className="consent__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dui eu mollis est viverra amet purus. Link to privacy policy or more details</p>
        <div className="consent-inputs">
          <label className="input-wrapper input-wrapper--checkbox" htmlFor="GDPR consent">
            <span className="input-label">Yes</span>
            <input type="radio"  name="GDPR consent" value="true" checked={acceptGDPR == true } />
            <span className="checkmark gdpr-checkbox" data-value="true" onClick={(e) => handlerChecked(e)}/>
          </label>
          <label className="input-wrapper input-wrapper--checkbox" htmlFor="GDPR consent">
            <span className="input-label">No</span>
            <input type="radio"  name="GDPR consent" value="false" checked={acceptGDPR == false}  />
            <span className="checkmark gdpr-checkbox" name="GDPR consent" data-value="false" onClick={(e) => handlerChecked(e)}/>
          </label>
          
         
        </div>
      </div>
      <div className="col-lg-4 consent-wrapper">
        <p className="label">Publish Data Consent</p>
        <p className="consent__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dui eu mollis est viverra amet purus. Link to privacy policy or more details</p>
        <div className="consent-inputs">
          <label className="input-wrapper input-wrapper--checkbox" htmlFor="Data consent">
            <span className="input-label">Yes</span>
            <input type="radio"  name="Data consent" value="true" checked={acceptDataConsent == true } />
            <span className="checkmark data-consent-checkbox" data-value="true" onClick={(e) => handlerChecked(e)}/>
          </label>
          <label className="input-wrapper input-wrapper--checkbox" htmlFor="dataCData consentonsent">
            <span className="input-label">No</span>
            <input type="radio"  name="Data consent" value="false" checked={acceptDataConsent == false} />
            <span className="checkmark data-consent-checkbox" data-value="false" onClick={(e) => handlerChecked(e)}/>
          </label>
        </div>
      </div>
      <div className="col-lg-4 offset-lg-4 consent-wrapper">
        <p className="label">Liability Consent</p>
        <p className="consent__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dui eu mollis est viverra amet purus. Link to privacy policy or more details</p>
        <div className="consent-inputs">
        <a href='https://waiver.smartwaiver.com/w/615fa299c802a/web/' target='_blank'><div class='signdigitalwaiver_button_div'>Sign&nbsp;Digital&nbsp;Waiver</div></a>
        {/* <label className="input-wrapper input-wrapper--checkbox" htmlFor="Liability Consent">
            <span className="input-label">I've read...</span>
            <input 
              value="false"
              id="data-no" 
              type="checkbox" 
              name="Liability Consent"
            />
            <span className="checkmark"/>
          </label> */}
        </div>
      </div>
    </>
  )
}

export const Step2 = ({ formData, loadingMap, acceptGDPR, acceptDataConsent, acceptGeolocation, setAcceptGeolocation, handleClick, handleChange, localizationEnabled, setAcceptGDPR, seAcceptDataConsent }) => {
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
    // } else if(!formData["Affiliation"]) {
    //   setError('Please, add the affiliation of the Crew')
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
              <input type="text" 
                id="crew-name" 
                name="Crew name - manual" 
                onChange={(e) => checkFormState(e)}
                value={formData["Crew name - manual"] ? formData["Crew name - manual"] : ""}
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
            <div className="col-lg-4 input-wrapper">
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


            <div className="offset-lg-4 col-lg-4 input-wrapper">
              <label htmlFor="role">Role*</label>
              <select 
                id="role" 
                name="Role" 
                value={formData.Role}
                onChange={(e) => checkFormState(e)}
              >
                <option value="">Select</option>
                <option value="Solo Trekker">Solo Trekker</option>
                <option value="">Special Impact Crew Leader - Soroities</option>
                <option value="">Special Impact Crew Leader - Churches</option>
                <option value="">Special Impact Crew Leader - Adventure Squad</option>
                <option value="">Special Impact Crew Leader - HBCUs</option>
                <option value="">Special Impact Crew Leader - Partner/Organization</option>
              </select>
            </div>

            <div className="col-lg-4 input-wrapper padding-l">
              <p>Are you leading a crew that is officially associated with a special impact area? Let us know and connect with a special impact coach here.</p>
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
              acceptGDPR={acceptGDPR}  
              handleChange={handleChange}
              acceptDataConsent={acceptDataConsent}
              setAcceptGDPR={setAcceptGDPR} 
              seAcceptDataConsent={seAcceptDataConsent}
              
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
