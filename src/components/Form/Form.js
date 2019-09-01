import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import InputText from '../InputText/InputTex';
import axios from 'axios';
import Icon from '../../images/lontraIcon.png';
import './Form.css';

class FormApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      errors: {},
      showForm : false
    }
  }

  handleChange(field, e) {
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

  handleSubmit(e) {
    e.preventDefault();
    this.handleValidation();
  }

  async handleSend() {
    let fields = this.state.fields;
    let errors = {};

    if (!fields["email"]) {
      errors["email"] = "O email precisa ser preenchido";
    }
    else {
      if (this.props.mediaSelected == "gitHub") {

        const response = await axios.get(`https://api.github.com/search/users?q=${this.state.fields['email']}`);
        console.log(response);
        const result = response.data.items;
        if (result.length == 1) {
          result.map(async res => {
            this.setState({
              showForm: true
            })
            const resp = await axios.get(`https://api.github.com/users/${res.login}`)
            fields['nome'] = resp.data.name;
            fields['confEmail'] = this.state.fields['email'];
            // console.log(resp.data.name)
           
          })
        } else errors["email"] = "Infelizmente não localizamos a conta informada";
      }
    }
    this.setState({ fields, errors });
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
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="newAccount-form-content">
          <div className="newAccount-form-group-one">
            <div className="newAccount-form">
              <div className="newAccount-form-item">
                <label className="newAccount-form-item-text">{this.props.showSocialIcons ? `Informe o email que você utiliza no ${this.props.mediaSelected}:` : `Coloque o email que você mais utiliza:`}</label>
                <InputText
                  onChange={this.handleChange.bind(this, "email")}
                  value={this.state.fields["email"] || ''}
                  name="email"
                  type="email"
                  placeholder="Ex.: email.maravilhoso@provedor.com"
                  errors={this.state.errors['email']}
                />
              </div>
              <div className="newAccount-form-buttons" style={{ display: this.props.showSocialIcons && !this.state.showForm ? 'flex' : 'none' }}>
                <Link className="button-newAccount" to="/">Cancelar</Link>
                <Button className="button-newAccount"
                  onClick={this.handleSend.bind(this)}
                  style={{ background: this.props.mediaSelected == "facebook" ? '#347aeb' : this.props.mediaSelected == "gitHub" ? '#191d24' : '#db212a' }}>
                  Buscar no {this.props.mediaSelected}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="newAccount-form-group-two"
          style={{ display: this.props.showSocialIcons && !this.state.showForm ? 'none' : 'block' }}>
          <div className="newAccount-form">
            <div className="newAccount-form-item">
              <label className="newAccount-form-item-text">Acreditamos em você, mas seria legal se você repetisse ele aqui:</label>
              <InputText
                name="confEmail"
                onChange={this.handleChange.bind(this, "confEmail")}
                errors={this.state.errors['confEmail']}
                type="email"
                placeholder="Ex.: email.maravilhoso@provedor.com" />
            </div>
            <div className="newAccount-form-item" >
              <label className="newAccount-form-item-text">Informe para nós seu telefone celular:</label>
              <InputText
                name="telefone"
                onChange={this.handleChange.bind(this, "telefone")}
                errors={this.state.errors['telefone']}
                type="text"
                placeholder="Exemplo: 11988887777" />
            </div>
            <div className="newAccount-form-item">
              <label className="newAccount-form-item-text">Gostaríamos muito de saber seu nome, informe para nós:</label>
              <InputText
                onChange={this.handleChange.bind(this, "nome")}
                errors={this.state.errors['nome']}
                name="nome"
                type="text"
                placeholder="Nome mais lindo do mundo" />
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
    );

  }
}

export default FormApp;
