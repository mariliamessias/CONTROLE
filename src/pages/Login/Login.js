import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import $ from 'jquery';
import ButtonDefault from '../../components/Button/ButtonDefault';
import InputText from '../../components/InputText/InputTex';
import SimpleText from '../../components/SimpleText/SimpleText';
import Logo from '../../images/lontrasLogo.jpg'
import SimpleLink from '../../components/SimpleLink/SimpleLink';
import carregando from '../../images/loading.svg';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: "",
      login: false,
      msgError: "",
      redirect: false,
      redirectNewAccount: false,
      token: "",
      buttonStatus: 'Login-body-buttonLogin',
      buttonValue: 'Entrar',
      loadingImage: 'login_none'
    };

    this.inputRef = React.createRef();
    this.buttonRef = React.createRef();
    this.inputEmailRef = React.createRef();
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: '/home',
        //state: { token: this.state.token , id: this.state.id}
      }} />
    } else if (this.state.redirectNewAccount) {
      return <Redirect to={{
        pathname: '/novaConta',
        //state: { token: this.state.token , id: this.state.id}
      }} />
    }
  }

  newAccount = () => {
    this.setState({
      redirectNewAccount: true
    })
  }

  // componentDidMount() {
  //   this.inputEmailRef.current.focusTextInput();
  // }

  onEmailChange(e) {
    this.setState({ email: e.target.value });
    this.clearValidationError("email");
    this.clearValidationError("login");
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
    this.clearValidationError("password");
    this.clearValidationError("login");

  }

  handleError = () => {
    this.setState({ msgError: "" })
  }

  handleSubmit = (e) => {
    if (e.key === "Enter") {
      this.inputRef.current.focusTextInput();
    }
  };

  handleSumitButton = (e) => {
    if (e.key === "Enter") {
      this.buttonRef.current.focus();
    }
  };

  render() {
    return (
      <Formik
        initialValues={{
          password: '',
          email: '',
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Email inválido.')
            .required('Email é obrigatório.'),
          password: Yup.string()
            .required('Senha é obrigatória.')
        })}

        onSubmit={fields => {
          this.setState({ buttonStatus: 'Login-body-buttonLoginCarregando', buttonValue: 'Carregando', loadingImage: 'login_loading' })
          $.ajax({
            url: 'https://api-sky.herokuapp.com/api/auth/sign-in',
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({
              email: fields.email,
              senha: fields.password,
            }),
            success: function (resposta) {
              this.setState({
                token: resposta.token,
                id: resposta.id
              })
              return this.setRedirect();
            }.bind(this),
            error: function (resposta) {
              this.setState({ buttonStatus: 'Login-body-buttonLogin', buttonValue: 'Entrar', loadingImage: 'login_none' })
              if (resposta.status === 401 || resposta.status === 404) {
                return this.setState({ msgError: "Email ou senha incorretos." });
              }
            }.bind(this)
          })
        }}

        render={({ errors, status, touched }) => (
          <Form className="Form">
            <div className="Login">
              <div className="Login-body">
                <div className="Login-bodyTop">
                  <img className="Login-body-image" src={Logo} />
                  {/* <h2 className="Login-body-title">Controle</h2> */}
                </div>
                {/* <SimpleText className="simpleSubtitle">Informe abaixo seus dados de acesso:</SimpleText> */}
                <div className="Login-body-middleForm">
                  <div className="Login-body-userInformation">
                    {/* <SimpleText className="userEmail">Email:</SimpleText> */}
                    <div className="Login-body-container">
                      <Field
                        name="email"
                        className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                        type="email"
                        placeholder="Email"
                        onClick={ () =>
                          this.handleError()
                        }
                      />
                      <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </div>
                  </div>
                  <div className="Login-body-userInformation-1">
                    {/* <SimpleText className="userPassword">Senha:</SimpleText> */}
                    <div className="Login-body-container">
                      <Field
                        name="password"
                        className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')}
                        type="password"
                        placeholder="••••••"
                        onClick ={()=>
                          this.handleError()
                        }
                      />
                      <ErrorMessage name="password" component="div" className="invalid-feedback" />
                    </div>
                  </div>
                  <span className="invalid-password">{this.state.msgError}</span>
                  <SimpleLink>Recuperar a senha</SimpleLink>
                </div>
                <div className="Login-body-buttons">
                  <div className="buttonNewUser" onClick={this.newAccount.bind(this)}>Criar Conta</div>
                  {this.renderRedirect()}
                  <div className={this.state.buttonStatus} ref={this.buttonRef}><img className={this.state.loadingImage} src={carregando} alt="Carregando" />{this.state.buttonValue}</div>
                </div>
              </div>
            </div>
          </Form>
        )}
      />
    );
  }
}

export default Login;
