import React, { useState } from 'react'
import Button from './Button';
import axios from 'axios'
import countriesList from './utils/countiresList';
import statesUsa from './utils/statesUsa'
import stepImage from '../images/step-1-bg.jpg'
import Logo from './Logo';

export const Step3 = ({ formData, handleClick, handleChange }) => {
  const [error, setError] = useState('')
  const [currentUsa, setCurrentUsa] = useState(false)

  // ======================
  // Event handlers

  const checkInputsData = async (e) => {
    if(!formData["Country"]) {
      setError('Please, add the country')
    } else if (!formData["City"]) {
      setError('Please, add a city')
    } else if(!formData["State"] && formData["Country"] == 'United States of America (the)') {
      setError('Please, add a state')
    } else if(!formData["Postal Code"]) {
      setError('Please, add a postal code')
    } else {
      try {
        let response = await axios({method:'post', url: '/.netlify/functions/updateUserData', data: formData })
        if (response.status == 200) {
          handleClick(e);
        } else {
          setError(`Error`)
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
  
  const checkFormState = (e) => {
    
    if(e.target.id == 'country'){
      setCurrentUsa(false)
      if(e.target.value == 'United States of America (the)'){
        setCurrentUsa(true)
      }
    }
    handleChange(e)
  }

  return (
    <div className="step step__3">
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

          <div className="row step__inputs">
            <div className="offset-lg-4 col-lg-8">
              <h3 className="step__input-headline">Where are you walking with your crew?</h3>
              <p className="step__text">Fill out the info below so we can connect women to you.</p>
            </div>

            <div className="col-lg-4 offset-lg-4">
              <div className="input-wrapper">
                <label htmlFor="country">Country *</label>
                <select 
                  onChange={(e) => checkFormState(e)}
                  id="country" 
                  name="Country" 
                  value={formData.country}
                >
                  <option value="">Select</option>
                  {
                    countriesList.map(country => <option key={country} value={country}>{country}</option>)
                  }
                </select>
              </div>
            </div>
            {
              currentUsa && (
                <div className="col-lg-4">
                  <div className="input-wrapper">
                    <label htmlFor="state">State *</label>
                    <select 
                      onChange={(e) => checkFormState(e)}
                      id="state" 
                      name="State"
                    >
                      
                      <option value="">Select</option>
                      {
                        statesUsa.map(state => <option key={state} value={state}>{state}</option>)
                      }
                      
                    </select>
                  </div>
                </div>
              )
            }
            {
              !currentUsa && (
                <div className="col-lg-4">
                  <div className="input-wrapper">
                    <label htmlFor="state">State</label>
                    <input 
                      onChange={(e) => checkFormState(e)}
                      type="text" 
                      id="non-usa-state" 
                      name="non USA state"
                      value={formData["non USA state"]} 
                    />
                  </div>
                </div>  
              )
            }
            <div className="col-lg-4 offset-lg-4">
              <div className="input-wrapper">
                <label htmlFor="city">City *</label>
                <input 
                  onChange={(e) => checkFormState(e)}
                  type="text" 
                  id="city" 
                  name="City" 
                  placeholder=""
                  value={formData.city}
                />
              </div>
            </div>
            <div className="col-lg-4 ">
              <div className="input-wrapper">
                <label htmlFor="neighborhood">Neighborhood *</label>
                <input 
                  onChange={(e) => checkFormState(e)}
                  type="text" 
                  id="neighborhood" 
                  name="Neighborhood" 
                  placeholder="ie: Greenville"
                  value={formData.neighborhood}
                />
              </div>
            </div>
            
            
            <div className="col-lg-4 offset-lg-4">
              <div className="input-wrapper">
                <label htmlFor="postal-code">ZIP or Postal Code *</label>
                <input 
                  onChange={(e) => checkFormState(e)}
                  type="text" 
                  id="postal-code" 
                  name="Postal Code" 
                  value={formData["Postal Code"]}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-8 offset-lg-4">
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
