import React, { Component } from 'react';
import './InputText.css';

class InputText extends React.Component{
  constructor(props){
    super(props);

    this.textInput = null;

    this.setTextInputRef = element => {
      this.textInput = element;
    };

    this.focusTextInput = () => {
      if (this.textInput) this.textInput.focus();
    };
  }
  componentDidMount() {
    this.focusTextInput();
  }
  
  render(){
    return (
      <div className="InputText">
          <input 
            style={{ borderColor: this.props.errors ? 'red' : '#000' }}
            type={this.props.type} 
            placeholder={this.props.placeholder}
            className="InputText-text" 
            value={this.props.value} 
            onChange={this.props.onChange} 
            onKeyPress={this.props.onKeyPress}
            ref={this.setTextInputRef}
          />

          <span className="error-input">{this.props.errors}</span>

      </div>
    );
  }
}

export default InputText;
