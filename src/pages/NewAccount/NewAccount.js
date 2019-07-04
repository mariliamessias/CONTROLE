import React, { Component } from 'react';
import ButtonDefault from '../../components/Button/ButtonDefault';
import InputText from '../../components/InputText/InputTex';
import Button from 'react-bootstrap/Button';
import SimpleText from '../../components/SimpleText/SimpleText';
import './NewAccount.css';

class NewAccount extends Component {
  constructor(props){
    super(props)
  }

  
  render() {

    return (
      <div className="newAccount">
          <div className="newAccount-content">

          <SimpleText className="newAccount-content-title">Criar Nova Conta</SimpleText>
          <SimpleText className="newAccount-content-subtitle">Para você ter acesso ao sistema, precisamos de alguns dados seus para um simples cadastro. Para isso, preencha os campos abaixo conforme solicitado:</SimpleText>

            <div className="newAccount-form">
              <div className="newAccount-form-item">
                <p className="newAccount-form-item-text">Um nome tão lindo assim, só pode ser inserido em locais assim:</p>
                <input className="newAccount-form-item-input"/>
              </div>
              <div className="newAccount-form-item"> 
                <p className="newAccount-form-item-text">Coloque o email que você mais utiliza:</p>
                <input className="newAccount-form-item-input"/>
              </div>
              <div className="newAccount-form-item">
                <p className="newAccount-form-item-text">Acreditamos em você, mas seria legal se você repetisse ele aqui:</p>
                <input className="newAccount-form-item-input"/>
              </div>
              <div className="newAccount-form-item">
                <p className="newAccount-form-item-text">Não vamos te ligar cobrando cartões, por isso, pode colocar o número do seu telefone aqui:</p>
                <input className="newAccount-form-item-input"/>
              </div>
              <div className="newAccount-form-item">
                <p className="newAccount-form-item-text">Indicamos utilizar uma senha forte, assim como você:</p>
                <input className="newAccount-form-item-input"/>
              </div>
              <div className="newAccount-form-item">
                <p className="newAccount-form-item-text">Só pra confirmar, repita ela aqui, por favor:</p>
                <input className="newAccount-form-item-input"/>   
              </div>         
            </div>
            <div className="newAccount-form-buttons">
              <Button className="button-newAccount">Confirmar</Button>
              <Button className="button-newAccount">Cancelar</Button>
            </div>
          </div>
         
      </div>
    );
  }
}

export default NewAccount;
