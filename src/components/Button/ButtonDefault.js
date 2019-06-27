import React from 'react';
import './ButtonDefault.css';

class ButtonDefault extends React.Component{
  constructor(props){
    super(props);

 }

  render(){
    return (
      <div className="ButtonDefault">
          <button className={this.props.className}>{this.props.children}</button>
      </div>
    )
  }
}

export default ButtonDefault;
