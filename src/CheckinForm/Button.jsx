import React from 'react';
import ButtonRightShape from './ButtonRightShape';

const Button = ({checkInputsData}) => {
  return (
    <div onClick={(e) => checkInputsData(e)} className="button-wrapper">
      <button id="continue" className="step__button">Continue</button>
      <ButtonRightShape/>
    </div>
  )
}

export default Button;