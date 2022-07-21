import React, { useState } from 'react'
import finalStep from '../images/final-step.jpg';
import Logo from './Logo';

export const FinalStep = ({ formData, handleClick, handleChange }) => {


  return (
    <>
      <section className="step step__final">
        <div className="step__background">
          <img src={finalStep} alt="" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Logo />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <h1 className="step__headline">Thank you for hitting the streets!<br/>You are checked in.</h1>
            </div>
          </div>

        </div>
      </section>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <p className="footer__content">Please make sure you have <a href="/">read and signed GirlTrek's Liability Waiver</a> as you hit the streets!</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
