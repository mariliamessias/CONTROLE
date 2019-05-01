import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import ButtonDefault from '../../components/Button/ButtonDefault';
import InputText from '../../components/InputText/InputTex';
import SimpleText from '../../components/SimpleText/SimpleText';
import Logo from '../../images/lontrasLogo.jpg'
import SimpleLink from '../../components/SimpleLink/SimpleLink';
import './Login.css';

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      email:"", 
      password: "", 
      redirect: false,
      errors:[]};
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/home' />
    }
  }
  
  submitLogin(e){
    if (this.state.email === ""){
      return this.showValidationError('email', 'email não pode ser vazio!');
    }else if(this.state.password === ""){
      return this.showValidationError('password', 'senha não pode ser vazia!');
    } 
    return this.setRedirect();
  }

  onEmailChange(e){
    this.setState({email: e.target.value});
    this.clearValidationError("email");
  }

  onPasswordChange(e){
    this.setState({password: e.target.value});
    this.clearValidationError("password");
  }

  showValidationError(elm, msg){
    this.setState((prevState) =>({
      errors: [...prevState.errors, {elm, msg}]
    }));
  }

  clearValidationError(elm, msg){
    this.setState((prevState) =>{
      let newArr = [];
      for(let err of prevState.errors){
        if(elm != err.elm){
          newArr.push(err);
        }
      }
      return {errors: newArr};;
    });
  }

  render() {

    let emailErr = null,
        passwordErr = null;

    for(let err of this.state.errors){
      if (err.elm === "email"){
        emailErr = err.msg;
      }if (err.elm === "password"){
        passwordErr = err.msg;
      }
    }
    return (
      <div className="Login">
        <div className="Login-body">
        <div className="Login-bodyTop">
          <img className ="Login-body-image" src={Logo} />
          <h2 className="Login-body-title">MolTrole</h2>
        </div>
          <SimpleText className="simpleSubtitle">Informe abaixo seus dados de acesso:</SimpleText>
          <div className="Login-body-middleForm">
            <div className="Login-body-userInformation">
              <SimpleText className="userEmail">Email:</SimpleText>
              <InputText onChange={this.onEmailChange.bind(this)} type="text"></InputText>
            </div>
            <span>{emailErr ? emailErr : ""}</span>
            <div className="Login-body-userInformation-1">
              <SimpleText className="userPassword">Senha:</SimpleText>
              <InputText onChange={this.onPasswordChange.bind(this)} type="password"></InputText>
            </div>
            <span>{passwordErr ? passwordErr : ""}</span>
            <SimpleLink>Recuperar a senha</SimpleLink>
          </div>
          <div className="Login-body-buttons">
            <ButtonDefault className="buttonNewUser">Criar Conta</ButtonDefault>
            {this.renderRedirect()}
            <button className="Login-body-buttonLogin" onClick={this.submitLogin.bind(this)}>Entrar</button>
          </div>

        </div>
      </div>
    );
  }
}

export default Login;
