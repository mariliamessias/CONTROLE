import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import $ from 'jquery';
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
      id: "",
      login: false,
      redirect: false,
      token: "",
      errors:[],
    };

    this.showValidationError = this.showValidationError.bind(this);
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname:'/home',
        state: { token: this.state.token , id: this.state.id}
      }}/>
    }
  }
  
  submitLogin(e){
    if (this.state.email === ""){
      return this.showValidationError('email', 'O email não pode estar vazio!');
    }else if(this.state.password === ""){
      return this.showValidationError('password', 'A senha deve ser preenchida!');
    }

  $.ajax({
    url:'https://api-sky.herokuapp.com/api/auth/sign-in',
    contentType: 'application/json',
    dataType: 'json',
    type: 'post',
    data: JSON.stringify({
      email:this.state.email, 
      senha: this.state.password,
    }),
    success: function(resposta){
    this.setState({
      token: resposta.token,
      id: resposta.id
    })
     this.clearValidationError("login");
     return this.setRedirect();
  }.bind(this),
    error: function(resposta){
      if (resposta.status === 401){
        return this.showValidationError('login', 'A senha informada está incorreta.'); 
      }else if (resposta.status === 404){
        return this.showValidationError('login', 'O email informado não foi localizado.'); 
      }
    }.bind(this)
  })
}

  onEmailChange(e){
    this.setState({email: e.target.value});
    this.clearValidationError("email");
    this.clearValidationError("login");

  }

  onPasswordChange(e){
    this.setState({password: e.target.value});
    this.clearValidationError("password");
    this.clearValidationError("login");
   
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
        passwordErr = null,
        loginErr = null;

    for(let err of this.state.errors){
      if (err.elm === "email"){
        emailErr = err.msg;
      }else if (err.elm === "password"){
        passwordErr = err.msg;
      }else if (err.elm === "login"){
        loginErr = err.msg;

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
            <div className="Login-body-container">
              <span className="Login-body-error">{emailErr ? emailErr : ""}</span>
            </div>
           
            <div className="Login-body-userInformation-1">
              <SimpleText className="userPassword">Senha:</SimpleText>
              <InputText onChange={this.onPasswordChange.bind(this)} type="password"></InputText>
            </div>
            <div className="Login-body-container">
              <span className="Login-body-error">{passwordErr ? passwordErr : ""}</span>
            </div>
            <span className="Login-body-error">{loginErr ? loginErr : "" }</span>

           
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
