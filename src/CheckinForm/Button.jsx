import React from 'react';
import ButtonRightShape from './ButtonRightShape';

const Button = ({checkInputsData, disabled=false, loading=false }) => {
  console.log(loading)
  return (
    <div onClick={(e) => checkInputsData(e)} className="button-wrapper">
      <button id="continue" className={`step__button ${ disabled ? 'hide': ''} ${ loading ? 'hide': ''}`} disabled={disabled ? 'disabled': ''}>Continue</button>
      <ButtonRightShape/>
    </div>
  )
}

export default Button;