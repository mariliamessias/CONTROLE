import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ButtonDefault from '../../components/Button/ButtonDefault';
import InputText from '../../components/InputText/InputTex';
import SimpleText from '../../components/SimpleText/SimpleText';
import Logo from '../../images/lontrasLogo.jpg'
import SimpleLink from '../../components/SimpleLink/SimpleLink';
import './Login.css';

class Login extends Component {
  constructor(props){
    super(props)

  }
  render() {
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
              <InputText type="text"></InputText>
            </div>
            <div className="Login-body-userInformation-1">
              <SimpleText className="userPassword">Senha:</SimpleText>
              <InputText type="password"></InputText>
            </div>
            <SimpleLink>Recuperar a senha</SimpleLink>
          </div>
          <div className="Login-body-buttons">
            <ButtonDefault className="buttonNewUser">Criar Conta</ButtonDefault>
            <Link to="/home" className="Login-body-buttonLogin">Entrar</Link>
          </div>

        </div>
      </div>
    );
  }
}

export default Login;
