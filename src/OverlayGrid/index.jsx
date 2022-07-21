import './index.scss';
import * as React from "react";

const OverlayGrid = ({ show }) => {

  return (
    <>
      <section className={`page-grid ${show ? 'show' : null}`}>
        <div className="container">
          <div className="row">
            <div className="col-md-1">
              <div className="col-bg"></div>
            </div>
            <div className="col-md-1">
              <div className="col-bg"></div>
            </div>
            <div className="col-md-1">
              <div className="col-bg"></div>
            </div>
            <div className="col-md-1">
              <div className="col-bg"></div>
            </div>
            <div className="col-md-1">
              <div className="col-bg"></div>
            </div>
            <div className="col-md-1">
              <div className="col-bg"></div>
            </div>
            <div className="col-md-1">
              <div className="col-bg"></div>
            </div>
            <div className="col-md-1">
              <div className="col-bg"></div>
            </div>
            <div className="col-md-1">
              <div className="col-bg"></div>
            </div>
            <div className="col-md-1">
              <div className="col-bg"></div>
            </div>
            <div className="col-md-1">
              <div className="col-bg"></div>
            </div>
            <div className="col-md-1">
              <div className="col-bg"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default OverlayGrid;