import React from 'react';
import './ButtonDefault.css';

function ButtonDefault(props){
  return (
    <div className="ButtonDefault">
        <button className={props.className}>{props.children}</button>
    </div>
  )
}

export default ButtonDefault;
