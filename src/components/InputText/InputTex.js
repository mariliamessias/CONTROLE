import React, { Component } from 'react';
import './InputText.css';

class InputText extends React.Component {
  constructor(props) {
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

  render() {
    return (
      <div className="InputText">
        <input
        autoComplete="none"
        autoCorrect="off"
        spellCheck="off"
          style={{
            borderColor: this.props.errors ? 'red' : '#000',
          }}
          onKeyPress={this.props.onKeyPress}
          maxLength={this.props.maxLength}
          type={this.props.type}
          placeholder={this.props.placeholder}
          className="InputText-text"
          value={this.props.value}
          onChange={this.props.onChange}
          onKeyPress={this.props.onKeyPress}
          ref={this.setTextInputRef}
          disabled={this.props.disabled}
        />

        <span className="error-input">{this.props.errors}</span>

      </div>
    );
  }
}

export default InputText;
