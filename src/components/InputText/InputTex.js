import React, { Component } from 'react';
import './InputText.css';

function InputText(props) {
    return (
      <div className="InputText">
          <input type={props.type} placeholder={props.placeholder}className="InputText-text" value={props.value} onChange={props.onChange}/>
      </div>
    );
}

export default InputText;
