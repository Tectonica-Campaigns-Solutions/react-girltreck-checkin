import React, { useEffect, useState } from 'react'


const Consent = ({formData, acceptGDPR, acceptDataConsent, setAcceptGDPR,         setAcceptDataConsent, setFormData, acceptLiabilty, setAcceptLiabilty}) => {
  
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
  "https://www.smartwaiver.com/m/webpl/f.js?webpl_waiver=615fa299c802a&webpl_title=Sign%20our%20waiver&webpl_align=Right&webpl_fontsize=20&webpl_background=%23000000&webpl_fontcolor=%23FFFFFF&webpl_font=Verdana";
    script.addEventListener('load', ()=> setLoaded(true))
    document.body.appendChild(script)
  }, [])
  
  const handleCheckedGDPR = (e) => {
    setAcceptGDPR(e.target.value)
    setFormData({
      ...formData,
        [e.target.name]: e.target.value
    });
  }

  const handleCheckedDataConsent = (e) => {
    setAcceptDataConsent(e.target.value)
    setFormData({
      ...formData,
        [e.target.name]: e.target.value
    });
  }

  const handleCheckedLiability = (e) => {
    setAcceptLiabilty(e.target.value)
    setFormData({
      ...formData,
        [e.target.name]: e.target.value
    });
  }


  return (
    <>
      <div className="col-lg-4 offset-lg-4 consent-wrapper">
        <p className="label">GDPR Consent Text</p>
        <p className="consent__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dui eu mollis est viverra amet purus. Link to privacy policy or more details</p>
        <div className="consent-inputs">
          <label className="input-wrapper input-wrapper--checkbox" htmlFor="">
            <span className="input-label">Yes</span>
            <input type="radio"  name="GDPR consent" value="true" checked={acceptGDPR === 'true'} />
            <span className="checkmark" onClick={(e) => handleCheckedGDPR({target: {value: 'true', name: 'GDPR consent'}}) }></span>
          </label>
          <label className="input-wrapper input-wrapper--checkbox" htmlFor="">
            <span className="input-label">No</span>
            <input type="radio"  name="GDPR consent" value="false" checked={acceptGDPR === 'false'}/>
            <span className="checkmark" onClick={(e) => handleCheckedGDPR({target: {value: 'false', name: 'GDPR consent'}}) }></span>
          </label>
         
        </div>
      </div>
      <div className="col-lg-4 consent-wrapper">
        <p className="label">Publish Data Consent</p>
        <p className="consent__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dui eu mollis est viverra amet purus. Link to privacy policy or more details</p>
        <div className="consent-inputs">
          <label htmlFor="" className="input-wrapper input-wrapper--checkbox">
            <span className="input-label">Yes</span>
            <input type="radio"  name="Data consent" value="true" checked={acceptDataConsent === 'true'} />
            <span className="checkmark" onClick={(e) => handleCheckedDataConsent({target: {value: 'true', name: 'Data consent'}}) }></span>
          </label>
          <label htmlFor="" className="input-wrapper input-wrapper--checkbox">
          <span className="input-label">No</span>
            <input type="radio"  name="Data consent" value="false" checked={acceptDataConsent === 'false'}/>
            <span className="checkmark" onClick={(e) => handleCheckedDataConsent({target: {value: 'false', name: 'Data consent'}}) }></span>
          </label>
        </div>
      </div>
      <div className="col-lg-4 offset-lg-4 consent-wrapper">
        <p className="label">Liability Consent</p>
        <p className="consent__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dui eu mollis est viverra amet purus. Link to privacy policy or more details</p>
        <div className="consent-inputs">
           <label htmlFor="" className="input-wrapper input-wrapper--checkbox">
           <span className="input-label">I've read and signed Liability Consent</span>
            <input 
              value={acceptLiabilty ? 'true' : 'false'}
              id="data-no" 
              type="checkbox" 
              name="Liability Consent"
              checked={acceptLiabilty == 'true'}
              
            />
            <span className="checkmark" onClick={(e) => handleCheckedLiability({target: {value: 'true', name: 'Liability Consent'}})}></span>
           </label>
          
            
          
         
        </div>
      </div>
    </>
  )
}

export default Consent