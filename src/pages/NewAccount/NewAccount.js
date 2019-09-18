import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import { Link, Redirect } from 'react-router-dom';
import FormApp from '../../components/Form/Form';
import SimpleText from '../../components/SimpleText/SimpleText';
import Back from '../../images/back.png'
import Facebook from '../../images/facebook.png';
import Gmail from '../../images/iconGmail.png';
import Github from '../../images/github.png';
import './NewAccount.css';

class NewAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mediaSelected:  "",
      showForm: false,
      showButtonVoltar: true,
      showSocialIcons: true,
      showLinkDefault: true,
      enableGmail: true,
      enableFacebook: true,
      enableGithub: true
    }

    this.formHandlerFacebook = this.formHandlerFacebook.bind(this);
    this.formHandlerGmail = this.formHandlerGmail.bind(this);
    this.formHandlerGithub = this.formHandlerGithub.bind(this);
    this.newAccountDefault = this.newAccountDefault.bind(this);
  }

  componentDidMount() {
    this.setState({
      showForm: false,
      showButtonVoltar: true,
      showSocialIcons: true,
      enableGithub: true,
      enableGmail: true,
      enableFacebook: true
    });


      PubSub.subscribe('mostrarIcones', (topico, objeto) => {
        if(objeto){
          this.setState({
            showSocialIcons: false,
          });
        }
      });


  }

  formHandlerFacebook() {
    this.setState({
      showForm: true,
      showButtonVoltar: false,
      enableGmail: false,
      enableGithub: false,
      showLinkDefault: false,
      mediaSelected: "facebook"
    });
  }

  formHandlerGithub() {
    this.setState({
      showForm: true,
      showButtonVoltar: false,
      enableFacebook: false,
      enableGmail: false,
      showLinkDefault: false,
      mediaSelected: "gitHub"
    });
  }

  formHandlerGmail() {
    this.setState({
      showForm: true,
      showButtonVoltar: false,
      enableFacebook: false,
      enableGithub: false,
      showLinkDefault: false,
      mediaSelected: "gmail"
    });
  }
  newAccountDefault() {
    this.setState({ showSocialIcons: false, showForm: true, showLinkDefault: false, showButtonVoltar: false });
    PubSub.publish("mostrarIcones", false);
  }
  
  render() {

    return (
      <div className="newAccount">
        <div className="newAccount-content">
          <div className="newAccount-content-top">
            <Link style={{ display: this.state.showButtonVoltar ? 'block' : 'none' }} className="button-back" to="/"><img src={Back} className="button-back"></img></Link>
            <p style={{ display: this.state.showLinkDefault ? 'block' : 'none' }} className="newAccount-content-paragraph">caso queira 
            <a 
              href='#'
              onClick={this.newAccountDefault}> crie sua conta sem utilizar nenhuma rede social.
            </a></p>
          </div>
          {this.state.showForm == true ? this.state.showSocialIcons == true ? <strong>Crie uma nova conta a partir da rede social selecionada:</strong> : <strong>Certifique-se de preencher todos os campos obrigatórios:</strong> : <div> <strong className="newAccount-content-subtitle">
            Use as informações das suas redes sociais para criar uma conta, basta selecionar uma abaixo:
            </strong>
          </div>
          }
          <div className="newAccount-content-social"
            style={{ display: this.state.showSocialIcons ? 'block' : 'none' }}>
            <img src={Facebook} alt="Logo Facebook"
              onClick={this.formHandlerFacebook}
              style={{
                cursor: this.state.enableFacebook ? 'pointer' : 'auto',
                transform: this.state.enableFacebook ? 'scale(1.1}' : 'scale(1)',
                opacity: this.state.enableFacebook ? '1' : '0.5'
              }}
            ></img>
            <img src={Github} alt="Logo Github"
              onClick={this.formHandlerGithub}
              style={{
                cursor: this.state.enableGithub ? 'pointer' : 'auto',
                transform: this.state.enableGithub ? 'scale(1.1}' : 'scale(1)',
                opacity: this.state.enableGithub ? '1' : '0.5'
              }}>
            </img>
            <img src={Gmail} alt="Logo Gmail"
              onClick={this.formHandlerGmail}
              style={{
                cursor: this.state.enableGmail ? 'pointer' : 'auto',
                transform: this.state.enableGmail ? 'scale(1.1}' : 'scale(1)',
                opacity: this.state.enableGmail ? '1' : '0.5'
              }}>
            </img>
          </div>
          <div className="newAccount-content-form">
            <div style={{ display: this.state.showForm ? 'block' : 'none' }}>
              <FormApp showSocialIcons={this.state.showSocialIcons} mediaSelected={this.state.mediaSelected}></FormApp>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewAccount;
