import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import InputText from '../InputText/InputTex';
import carregando from '../../images/loading.svg';
import axios from 'axios';
import PubSub from 'pubsub-js';
import Modal from 'react-bootstrap/Modal';
import wavesBackground from '../../images/waves.png';
import $ from 'jquery';

import './Form.css';

class FormApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fields: {
        nome: '',
        email: '',
        confEmail: '',
        avatarUrl: '',
        senha: '',
        confSenha: '',
        telefone: ''
      },
      errors: {},
      showForm: false,
      showImage: true,
      showLoading: '',
      successModal: false,
      errorModal: false
    }

    this.saveUser = this.saveUser.bind(this);
  }

  handleChange(field, e) {
    e.preventDefault();
    let fields = this.state.fields;
    let errors = {};
    if (field === "value") {
      fields[field] = e;
      this.setState({ fields });
    } else {
      fields[field] = e.target.value;
      this.setState({ fields });
    }

    if (this.state.fields[field] != '') {
      this.setState((prevState) => ({
        errors: [field, '']
      }));
    } else {
      if (!fields[field]) {

        switch (field) {
          case "confEmail": errors[field] = `A confirmação de email precisa ser preenchida`; break;
          case "email": errors[field] = `O email precisa ser preenchido`; break;
          case "telefone": errors[field] = `O telefone precisa ser preenchido`; break;
          case "nome": errors[field] = `O nome precisa ser preenchido`; break;
          case "senha": errors[field] = `A senha precisa ser preenchida`; break;
          case "confSenha": errors[field] = `A confirmação de senha precisa ser preenchida`; break;
        }
      }
      this.setState({ errors: errors });
    }
  }

  saveUser() {
    const data = {
      email: this.state.fields.email,
      nome: this.state.fields.nome,
      imagem: this.state.fields.avatarUrl,
      senha: this.state.fields.senha,
      telefones: [{
        numero: this.state.fields.telefone,
        ddd: 11
      }],
    }
    return $.ajax({
      url: "https://api-sky.herokuapp.com/api/auth/sign-up",
      type: 'POST',
      async: false,
      dataType: "json",
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function (resposta) {
        return resposta;
      }.bind(this),
      error: function (resposta) {
        console.log(resposta)
      }.bind(this)
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const res = this.handleValidation();
    if (res) {
      const result = this.saveUser();
      if(result.status === 200){
        this.setState({
          successModal: true
        })
      } else {
        this.setState({
          errorModal: true
        })
      }
    }
  }

  componentDidMount() {
    PubSub.subscribe('mostrarIcones', (topico, objeto) => {
      if (!objeto) {
        this.setState({
          showImage: false,
        });
      }
    });
  }

  async handleSend() {
    let fields = this.state.fields;
    let errors = {};
    let resp = {};

    this.setState({
      showLoading: 'content_loading'
    })

    if (!fields["email"]) {
      errors["email"] = "O email precisa ser preenchido";
    }
    else {
      let response = {};
      if (this.props.mediaSelected == "gitHub") {
        try {
          response = await axios.get(`https://api.github.com/search/users?q=${this.state.fields['email']}`);
          const result = response.data.items;
          if (result.length == 1) {
            const res = result[0];
            resp = await axios.get(`https://api.github.com/users/${res.login}`)
            if (resp) {
              fields['nome'] = resp.data.name;
              fields['confEmail'] = this.state.fields['email'];
              fields['avatarUrl'] = resp.data.avatar_url;
              this.setState({
                showForm: true,
                fields,
              })

              PubSub.publish("mostrarIcones", true);

            } else errors["email"] = "Infelizmente não localizamos a conta informada"

          } else errors["email"] = "Infelizmente não localizamos a conta informada";
        } catch (e) {
          errors["email"] = "Infelizmente não localizamos a conta informada";
          console.log(e)
        }

      }
    }

    this.setState({
      errors,
      showLoading: ''
    });
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};

    if (!fields["confEmail"]) {
      errors["confEmail"] = "A confirmação de email precisa ser preenchida`";
    }

    if (!fields["email"]) {
      errors["email"] = "O email precisa ser preenchido";
    }

    if (!fields["telefone"]) {
      errors["telefone"] = "O telefone precisa ser preenchido";
    }

    if (!fields["nome"]) {
      errors["nome"] = "O nome precisa ser preenchido";
    }

    if (!fields["senha"]) {
      errors["senha"] = "A senha precisa ser preenchida";
    }

    if (!fields["confSenha"]) {
      errors["confSenha"] = "A confirmação de senha precisa ser preenchida";
    }

    this.setState({ errors: errors });

    if (Object.keys(errors).length == 0) {
      return true;
    } else return false;

  }

  render() {
    return (
      <div>
        <Modal show={this.state.successModal} onHide={this.handleCloseSair}>
          <Modal.Header closeButton>
            <Modal.Title>Parabéns!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Sua conta foi criada com sucesso!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button>
              <Link to="/" className="Menu-items-btn-sair">Fazer Login</Link>
            </Button>
          </Modal.Footer>
        </Modal>
        
        <Modal show={this.state.errorModal} onHide={this.handleCloseSair}>
          <Modal.Header closeButton>
            <Modal.Title>Ops!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Infelizmmente não pudemos criar sua conta nesse momento, tente novamente mais tarde.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button>
              <Link to="/" className="Menu-items-btn-sair">Ir para tela de Login</Link>
            </Button>
          </Modal.Footer>
        </Modal>
      <form
        onSubmit={this.handleSubmit.bind(this)}
      >
        <div className="newAccount-form-content">
          <div className="newAccount-form-group-one">
            <div className="newAccount-form">
              <div className="newAccount-form-item">
                <div className="newAccount-image-container"
                  style={{
                    display: this.state.showImage ? 'flex' : 'none',
                    backgroundImage: `url(${wavesBackground})`,
                  }}
                >
                  <img className="newAccount-profile-image" src={this.state.fields['avatarUrl']} alt="Logo Github"
                    style={{
                      display: this.props.showSocialIcons && !this.state.showForm ? 'none' : 'flex',
                      cursor: this.state.enableGithub ? 'pointer' : 'auto',
                    }}>
                  </img>
                </div>
                <label className="newAccount-form-item-text"
                  style={{ display: this.state.showForm ? "none" : "block" }}>

                  {this.props.showSocialIcons ? `Informe o email que você utiliza no ${this.props.mediaSelected}:` : this.state.showForm ? `` : `Coloque o email que você mais utiliza:`}</label>
                <InputText
                  disabled={this.state.showForm ? "disabled" : ""}
                  onChange={this.handleChange.bind(this, "email")}
                  value={this.state.fields["email"]}
                  name="email"
                  type="email"
                  placeholder="Ex.: email.maravilhoso@provedor.com"
                  errors={this.state.errors['email']}
                />
              </div>
              <div className="newAccount-form-buttons" style={{ display: this.props.showSocialIcons && !this.state.showForm ? 'flex' : 'none' }}>
                <Link className="button-newAccount" to="/">Cancelar</Link>
                <Button className={this.state.showLoading != "" ?
                  this.state.showLoading :
                  this.props.mediaSelected === "facebook" ?
                    "content_format_facebook" :
                    this.props.mediaSelected === "gitHub" ?
                      "content_format_git_hub" :
                      "content_format_gmail"}
                  onClick={this.handleSend.bind(this)}
                >
                  <img className={this.state.showLoading != "" ? "loading" : "loading_none"} src={carregando} alt="Carregando" />
                  {this.state.showLoading == "" ? `Buscar no ${this.props.mediaSelected}` : "Carregando"}

                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="newAccount-form-group-two"
          style={{ display: this.props.showSocialIcons && !this.state.showForm ? 'none' : 'block' }}>
          <div className="newAccount-form">
            <div className="newAccount-form-item"
              style={{ display: !this.props.showSocialIcons && this.state.showForm ? 'none' : 'flex' }}>
              <label className="newAccount-form-item-text">
                Acreditamos em você, mas seria legal se você repetisse ele aqui:</label>
              <InputText
                value={this.state.fields["confEmail"]}
                name="confEmail"
                onChange={this.handleChange.bind(this, "confEmail")}
                errors={this.state.errors['confEmail']}
                type="email"
                placeholder="Ex.: email.maravilhoso@provedor.com" />
            </div>
            <div className="newAccount-form-item">
              <label className="newAccount-form-item-text"
                style={{ display: this.state.showForm ? "none" : "block" }}
              >
                {this.state.showForm ? `` : `Gostaríamos muito de saber seu nome, informe para nós:`}</label>
              <InputText
                disabled={this.state.showForm ? "disabled" : ""}
                onChange={this.handleChange.bind(this, "nome")}
                errors={this.state.errors['nome']}
                value={this.state.fields["nome"] || ''}
                name="nome"
                type="text"
                placeholder="Nome mais lindo do mundo" />
            </div>
            <div className="newAccount-form-item" >
              <label className="newAccount-form-item-text">Informe para nós seu telefone celular:</label>
              <InputText
                name="telefone"
                value={this.state.fields["telefone"] || ''}
                onChange={this.handleChange.bind(this, "telefone")}
                errors={this.state.errors['telefone']}
                type="text"
                placeholder="Exemplo: 11988887777" />
            </div>
            <div className="newAccount-form-item">
              <label className="newAccount-form-item-text">Indicamos utilizar uma senha forte, assim como você:</label>
              <InputText
                onChange={this.handleChange.bind(this, "senha")}
                errors={this.state.errors['senha']}
                name="senha"
                type="password" />
            </div>
            <div className="newAccount-form-item">
              <label className="newAccount-form-item-text">Só pra confirmar, repita ela aqui, por favor:</label>
              <InputText
                onChange={this.handleChange.bind(this, "confSenha")}
                errors={this.state.errors['confSenha']}
                name="confSenha"
                type="password" />
            </div>

            <div className="newAccount-form-buttons">
              <Link className="button-newAccount" to="/">Cancelar</Link>
              <Button className="button-newAccount" type="submit">Confirmar</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
    );

  }
}

export default FormApp;
