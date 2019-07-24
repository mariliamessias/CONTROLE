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
      email: "",
      password: "",
      id: "",
      login: false,
      redirect: false,
      redirectNewAccount: false,
      token: "",
      errors: [],
      buttonStatus: 'Login-body-buttonLogin',
      buttonValue: 'Entrar',
      loadingImage: 'login_none'
    };
    this.showValidationError = this.showValidationError.bind(this);
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

  submitLogin(e) {
    if (this.state.email === "") {
      return this.showValidationError('email', 'O email não pode estar vazio!');
    } else if (this.state.password === "") {
      return this.showValidationError('password', 'A senha deve ser preenchida!');
    }
    this.setState({ buttonStatus: 'Login-body-buttonLoginCarregando', buttonValue: 'Carregando', loadingImage: 'login_loading' })
    $.ajax({
      url: 'https://api-sky.herokuapp.com/api/auth/sign-in',
      contentType: 'application/json',
      dataType: 'json',
      type: 'post',
      data: JSON.stringify({
        email: this.state.email,
        senha: this.state.password,
      }),
      success: function (resposta) {
        this.setState({
          token: resposta.token,
          id: resposta.id
        })
        this.clearValidationError("login");
        return this.setRedirect();
      }.bind(this),
      error: function (resposta) {
        this.setState({ buttonStatus: 'Login-body-buttonLogin', buttonValue: 'Entrar', loadingImage: 'login_none' })
        if (resposta.status === 401) {
          return this.showValidationError('login', 'A senha informada está incorreta.');
        } else if (resposta.status === 404) {
          return this.showValidationError('login', 'O email informado não foi localizado.');
        }

      }.bind(this)
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

  showValidationError(elm, msg) {
    this.setState((prevState) => ({
      errors: [...prevState.errors, { elm, msg }]
    }));
  }

  clearValidationError(elm, msg) {
    this.setState((prevState) => {
      let newArr = [];
      for (let err of prevState.errors) {
        if (elm != err.elm) {
          newArr.push(err);
        }
      }
      return { errors: newArr };;
    });
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

    // let emailErr = null,
    //   passwordErr = null,
    //   loginErr = null;

    // for (let err of this.state.errors) {
    //   if (err.elm === "email") {
    //     emailErr = err.msg;
    //   } else if (err.elm === "password") {
    //     passwordErr = err.msg;
    //   } else if (err.elm === "login") {
    //     loginErr = err.msg;

    //   }
    // }

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
            .min(6, 'A senha precisa conter no mínimo 6 caracteres.')
            .required('Senha é obrigatória.')
        })}
        onSubmit={fields => {
          alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
        }}

        render={({ errors, status, touched }) => (
          <Form className="Form">
            <div className="Login">
              <div className="Login-body">
                <div className="Login-bodyTop">
                  <img className="Login-body-image" src={Logo} />
                  <h2 className="Login-body-title">Controle</h2>
                </div>
                <SimpleText className="simpleSubtitle">Informe abaixo seus dados de acesso:</SimpleText>
                <div className="Login-body-middleForm">
                  <div className="Login-body-userInformation">
                    <SimpleText className="userEmail">Email:</SimpleText>
                    {/* <InputText onChange={this.onEmailChange.bind(this)} ref={this.inputEmailRef} onKeyPress={this.handleSubmit.bind(this)} type="text" ></InputText> */}
                    <Field name="email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} type="email" placeholder="seuemail@email.com" />
                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                  </div>
                  <div className="Login-body-container">
                    {/* <span className="Login-body-error">{emailErr ? emailErr : ""}</span> */}
                  </div>

                  <div className="Login-body-userInformation-1">
                    <SimpleText className="userPassword">Senha:</SimpleText>
                    <Field name="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} type="password"/>
                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                    {/* <InputText onChange={this.onPasswordChange.bind(this)} onKeyPress={this.handleSumitButton.bind(this)} ref={this.inputRef} type="password"></InputText> */}
                  </div>
                  <div className="Login-body-container">
                    {/* <span className="Login-body-error">{passwordErr ? passwordErr : ""}</span> */}
                  </div>
                  {/* <span className="Login-body-error">{loginErr ? loginErr : ""}</span> */}

                  <SimpleLink>Recuperar a senha</SimpleLink>
                </div>
                <div className="Login-body-buttons">
                  <ButtonDefault className="buttonNewUser" onClick={this.newAccount.bind(this)}>Criar Conta</ButtonDefault>
                  {this.renderRedirect()}
                  <button className={this.state.buttonStatus} ref={this.buttonRef} onClick={this.submitLogin.bind(this)}><img className={this.state.loadingImage} src={carregando} alt="Carregando" />{this.state.buttonValue}</button>
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
