import React from 'react';
import './SimpleLink.css';

function SimpleLink(props) {
    return (
      <div className="SimpleLink">
          <a hfef="#" className="SimpleLink-link">{props.children}</a>
      </div>
    );
}

export default SimpleLink;
