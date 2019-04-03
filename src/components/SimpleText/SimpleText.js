import React from 'react';
import './SimpleText.css';


function SimpleText(props){
    return (
        <div className="SimpleText">
        <p className={props.className}>{props.children}</p>
        </div>
      )
}

export default SimpleText;
