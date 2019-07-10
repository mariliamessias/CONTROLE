import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ButtonDefault from '../../components/Button/ButtonDefault';
import InputText from '../../components/InputText/InputTex';
import Button from 'react-bootstrap/Button';
import SimpleText from '../../components/SimpleText/SimpleText';
import './NewAccount.css';

class NewAccount extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div className="newAccount">
        <div className="newAccount-content">

          <SimpleText className="newAccount-content-title">Criar Nova Conta</SimpleText>
          <SimpleText className="newAccount-content-subtitle">Para você ter acesso ao sistema, precisamos de alguns dados seus para um simples cadastro. Para isso, preencha os campos abaixo conforme solicitado:</SimpleText>

          <div className="newAccount-form">
            <div className="newAccount-form-column-one">
              <div className="newAccount-form-item">
                <p className="newAccount-form-item-text">Gostaríamos muito de saber seu nome, informe para nós:</p>
                <input className="form-control newAccount-form-item-input" />
              </div>
              <div className="newAccount-form-item">
                <p className="newAccount-form-item-text">Coloque o email que você mais utiliza:</p>
                <input type="email" className="form-control newAccount-form-item-input" />
              </div>
              <div className="newAccount-form-item">
                <p className="newAccount-form-item-text">Acreditamos em você, mas seria legal se você repetisse ele aqui:</p>
                <input type="email" className="form-control newAccount-form-item-input" />
              </div>
            </div>
            <div className="newAccount-form-column-two">
            </div>
            <div className="newAccount-form-column-three">
              <div className="newAccount-form-item">
                <p className="newAccount-form-item-text">Para te notificar e te ajudar a controlar suas despesas, informe para nós seu telefone celular:</p>
                <input className="form-control newAccount-form-item-input" />
              </div>
              <div className="newAccount-form-item">
                <p className="newAccount-form-item-text">Indicamos utilizar uma senha forte, assim como você:</p>
                <input type="password" className="form-control newAccount-form-item-input" />
              </div>
              <div className="newAccount-form-item">
                <p className="newAccount-form-item-text">Só pra confirmar, repita ela aqui, por favor:</p>
                <input type="password" className="form-control newAccount-form-item-input" />
              </div>
            </div>
          </div>
          <div className="newAccount-form-buttons">
            <Link className="button-newAccount" to="/">Cancelar</Link>
            <Button className="button-newAccount">Confirmar</Button>
          </div>
        </div>

      </div>
    );
  }
}

export default NewAccount;
