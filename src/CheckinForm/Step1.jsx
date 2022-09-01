import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import UserContext from './UserContext';
import Logo from './Logo';
import Button from './Button';
import stepImage from '../images/step-1-bg.jpg'

export const Step1 = ({ formData, setFormData, handleClick, handleChange }) => {
  const [error, setError] = useState(false);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const { setUser } = useContext(UserContext);
  const [showSimilar, setShowSimilar] = useState({show: false, alreadyclicked: false, items: []});
  const [showBubble, setShowBubble] = useState(false)

  // ======================
  // Event handlers

  const handlerBuble = (val) => {
    setShowBubble(val)
  }

  useEffect(()=> {
    document.querySelector('body').addEventListener('click', (e) => {
      if(!e.target.classList.contains('link-open-bubble')){
        setShowBubble(false)
      }
    })
  })
  
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
    let similarMail;
    let preventSend = false;
    try {
      if(!showSimilar.alreadyclicked){
        let getSimilarMail  = await axios({method: 'post', url: '/.netlify/functions/checkSimilarMail', data: {email: formData.Email}})
        similarMail = await getSimilarMail.data
        
        if(similarMail && similarMail.length > 0){
          preventSend = true;
          setShowSimilar({show: true, alreadyclicked: false, items: [...similarMail]})
        }

      }
      if(!preventSend){
        let getUser = await axios({method: 'post', url: '/.netlify/functions/getUserData', data: {email: formData.Email}})
        let response = await getUser.data
        if (response) {
          setUser(response);
         
          const formatedResponse = {
            Name: response.Name,
            Email: response.Email,
            Role: 'Crew Attendee',
            'GDPR consent': response['GDPR consent'].toString(),
            'Data consent': response['Data consent'].toString(),
            'Liability Consent': response['Liability Consent']
          }
          setFormData({...formData, ...formatedResponse});
        } else {
          setFormData({...formData, 'GDPR consent': 'false','Data consent': 'false', 'Liability Consent': 'false'});
          setUser(false);
        }
        handleClick(e);
        setLoadingResponse(false);
      }
      
     
        
    } catch (error) {
      console.error(error);
    }
  }

  const handlerPopUpMail = (newMail) => {
    setLoadingResponse(false)
    setShowSimilar({show: false,alreadyclicked: true, items: []})
    setFormData(current => ({...current, Email: newMail}))
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
              <p>Check-in every time you lead your crew. Help us grow this movement and show that we are taking over 1000 Black Neighborhoods around the nation. </p>
            </div>

            <div className="step__inputs">

              <div className="input-wrapper">
                <label htmlFor="Email">Enter your email address*</label>
                <input 
                  disabled={showSimilar.show}
                  onChange={(e) => checkFormState(e)}
                  type="email" 
                  id="Email" 
                  name="Email" 
                  required 
                  placeholder="ie: yourname@example.com"
                  value={formData.Email ? formData.Email : ""}
                />
                {
                  showSimilar && showSimilar.show && <div className="box-mails">
                   
                    <p>There are this similar emails already registered, choose one to proceed:</p>
                    <div onClick={() => handlerPopUpMail(formData.Email)}>{formData.Email}</div>
                    { showSimilar.items.map((item, index) => 
                        <div key={index} onClick={() => handlerPopUpMail(item)}>{item}</div>
                      )}
                  </div>
                }
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

            <Button checkInputsData={checkInputsData} disabled={showSimilar.show} loading={loadingResponse}/>
            {
              error 
                &&
              <p className="error-message">{error}</p>
            }
            <div>
              
              <div className="buble-link"  >
                <p className="link-open-bubble" onClick={() => handlerBuble(true)}>Are you a solo trekker or crew walk attendee?</p>
                {
                showBubble && (
                  <div className="buble-box">If so, please checkin on instagram or facebook using #girltrek every-time you walk. Represent yourself or your crew and help us show the world this movement is taking over the streets. Our goal of 1,000 posts every week.</div>
                )
              }
                </div>
            </div>
            
          </div>

        </div>

      </div>

    </div>
  )
}
