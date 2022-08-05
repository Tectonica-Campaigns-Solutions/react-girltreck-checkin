import React, { useContext, useState } from 'react'
import { getUserData } from './services/getUserData'
import UserContext from './UserContext';
import Logo from './Logo';
import Button from './Button';
import stepImage from '../images/step-1-bg.jpg'

export const Step1 = ({ formData, setFormData, handleClick, handleChange }) => {
  const [error, setError] = useState(false);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const { setUser } = useContext(UserContext);


  // ======================
  // Event handlers
  
  const checkInputsData = (e) => {
    if(!formData.Email) {
      setError('Please, add an email to continue');
    } else if (formData.Email && !formData.Email.includes('@')) {
      setError('Please, add a correct email to continue');
    } else if(!formData["How many women are in your crew?"]) {
      setError('Please, add the how many women are in your crew')
    } else {
      checkEmail(e);
    }
  }
  
  const checkEmail = async (e) => {
    setLoadingResponse(true);
    try {
      let response = await getUserData(formData.Email);
      if (response) {
        setUser(response);
        console.log(response)
        const formatedResponse = {
          Name: response.Name,
          Email: response.Email,
          Role: 'Crew Attendee'
        }
        setFormData({...formData, ...formatedResponse});
      } else {
        setUser(false);
      }
      handleClick(e);
      setLoadingResponse(false);
    } catch (error) {
      console.error(error);
    }
  }
  
  
  const checkFormState = (e) => {
    handleChange(e)
  }

  return (
    <div className="step step__1">

      <div className="step__background">
        <img src={stepImage} alt="" />
      </div>

      <div className="container">
        <div className="step__background--color">
        </div>
        <div className="row">

          <div className="col-lg-7">
            <div className="step__hero">
              <div className="site__logo">
                <Logo/>
              </div>
              <h1 className="step__hero__headline">Calling all Leaders to<br/>Check in!</h1>
            </div>
          </div>

          <div className="col-lg-5 step__content">

            <div className="step__intro">
              <h2 className="step__headline">Did you lead a crew walk?</h2>
            </div>

            <div className="step__inputs">

              <div className="input-wrapper">
                <label htmlFor="Email">Enter your email address*</label>
                <input 
                  onChange={(e) => checkFormState(e)}
                  type="email" 
                  id="Email" 
                  name="Email" 
                  required 
                  placeholder="ie: yourname@example.com"
                  value={formData.Email ? formData.Email : ""}
                />
              </div>

              <div className="input-wrapper">
                <label htmlFor="How many women are in your crew?">How many women are in you walking with?*</label>
                <input 
                  onChange={(e) => checkFormState(e)}
                  type="number" 
                  id="How many women are in your crew?" 
                  name="How many women are in your crew?" 
                  required 
                  min="1"
                  placeholder=""
                  value={formData['How many women are in your crew?'] ? formData['How many women are in your crew?'] : ""}
                />
              </div>
            </div>

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
  )
}
