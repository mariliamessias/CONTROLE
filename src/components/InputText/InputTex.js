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
      // Foca o input de texto usando a API DOM diretamente
      if (this.textInput) this.textInput.focus();
    };
  }
  componentDidMount() {
    // auto-foca o input na montagem
    this.focusTextInput();
  }
  
  render(){
    return (
      <div className="InputText">
          <input 
          type={this.props.type} 
          placeholder={this.props.placeholder}
          className="InputText-text" 
          value={this.props.value} 
          onChange={this.props.onChange} 
          onKeyPress={this.props.onKeyPress}
          ref={this.setTextInputRef}
          />
      </div>
    );
  }
}

export default InputText;
