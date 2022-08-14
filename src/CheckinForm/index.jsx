import React, { useEffect, useState } from 'react'
import { Step1 } from './Step1';
import Step2 from './Step2';
import { Step3 } from './Step3';
import { FinalStep } from './FinalStep';
import UserContext from './UserContext';

const CheckingForm = () => {
  // ======================
  // States
  const [step, setStep] = useState(0);
  const [user, setUser] = useState(null);
  const [coords, setCoords] = useState();
  const [formData, setFormData] = useState([]);
  const [loadingMap, setLoadingMap] = useState(false);
  const [acceptGDPR, setAcceptGDPR] = useState('false');
  const [acceptDataConsent, setAcceptDataConsent] = useState('false');
  const [acceptLiabilty, setAcceptLiabilty] = useState('false');
  const [acceptGeolocation, setAcceptGeolocation] = useState(false);
  const [localizationEnabled, setLocalizationEnabled] = useState(null);

  
  // ======================
  // Hooks
  // When state acceptGeolocation changes, pass current location to formData
  useEffect(() => {
 
    if(acceptGeolocation) {
      setLoadingMap(true);
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData({
          ...formData,
          Latitude: acceptGeolocation ? position.coords.latitude : null,
          Longitude: acceptGeolocation ? position.coords.longitude : null
        });
        setCoords({lat: position.coords.latitude, long: position.coords.longitude})
      });
    } else {
      setFormData({
        ...formData,
        Latitude: null,
        Longitude: null
      });
      setCoords({lat: '', long: ''})
    }
  }, [acceptGeolocation])

  // Geolocate user when app mounts
  useEffect(() => {
    navigator.permissions.query({name:'geolocation'}).then(function(result) {

      if (result.state === 'granted' || result.state === 'prompt') {
        
        setAcceptGeolocation(true)
        setLocalizationEnabled(true)
      } else if (result.state === 'denied') {
        setAcceptGeolocation(false)
        setLocalizationEnabled(false)
      }})
  }, [])
  
  // Get location data using Mapbox Api when coords state changes
  useEffect(() => {
    const getMapboxEndpoint = async(event) => {
      let formatedResults = {};
      try {
        const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords.long},${coords.lat}.json?access_token=pk.eyJ1IjoiZ2lybHRyZWsiLCJhIjoiY2t2MTkwZzA1NmsyZDJvdDlsczZwczN1byJ9.HUnBdKS9XuAN71k4XM2CZg`;
        const response = await fetch(endpoint);
        const results = await response.json();
        formatedResults = results?.features && {
          Country: results?.features.find(feature => feature.place_type.includes('country') )?.text,
          City: results?.features.find(feature => feature.place_type.includes('place') )?.text,
          Neighborhood: results?.features.find(feature => feature.place_type.includes('neighborhood') )?.text,
          // State: results?.features.find(feature => feature.place_type.includes('region') )?.text,
          'Postal Code': results?.features.find(feature => feature.place_type.includes('postcode') )?.text,
        }
      } catch (error) {
        console.log("Error fetching data", error)
      } finally { 
        setLoadingMap(false);
        setFormData({...formData, ...formatedResults})
      }
    }

    if(coords) {  
      getMapboxEndpoint()
    }
  }, [coords])
  

  // ======================
  // Event handlers
  const returnStep = () => {
    switch (step) {
      case 0:
        return <Step1 formData={formData} setFormData={(e) => setFormData(e)} handleClick={(e) => handleClick(e)} handleChange={(e) => handleChange(e)}/>

      case 1:
        return <Step2 
          formData={formData} 
          acceptGDPR={acceptGDPR}
          acceptDataConsent={acceptDataConsent}
          setAcceptGDPR={setAcceptGDPR}
          setAcceptDataConsent={setAcceptDataConsent}
          loadingMap={loadingMap}
          setFormData={(e) => setFormData(e)} 
          handleClick={(e) => handleClick(e)} 
          handleChange={(e) => handleChange(e)}
          acceptGeolocation={acceptGeolocation} 
          localizationEnabled={localizationEnabled}
          setAcceptGeolocation={setAcceptGeolocation} 
          acceptLiabilty={acceptLiabilty}
          setAcceptLiabilty={setAcceptLiabilty}
        />

      case 2:
        return <Step3 formData={formData} handleClick={(e) => handleClick(e)} handleChange={(e) => handleChange(e)}/>

      case 3:
        return <FinalStep/>

      default:
        return <Step1 formData={formData} handleClick={(e) => handleClick(e)} handleChange={(e) => handleChange(e)}/>
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    
    const target = e.target.id;
    if(target === 'continue') {
      if(step === 1 && acceptGeolocation === true) {
        setStep(3);
      } else if(step === 1 && acceptGeolocation === false) {
        setStep(2);
      } else {
        setStep(step + 1);
      }
    }
  }

  const handleChange = (e) => {
    e.preventDefault();
    
    if(e.target.name !== "geolocation" && e.target.name !== 'How many women are in your crew?') {
      setFormData({
        ...formData,
          [e.target.name]: e.target.value
      });
    } else if (e.target.name === 'How many women are in your crew?') {
      setFormData({
        ...formData,
        [e.target.name]: Number(e.target.value)
      });
    }

    
  }


  return (
    <UserContext.Provider value={{user, setUser}} >
      <section className="form-section">

        {
          returnStep()
        }

      </section>
    </UserContext.Provider>

  )
}

export default CheckingForm;