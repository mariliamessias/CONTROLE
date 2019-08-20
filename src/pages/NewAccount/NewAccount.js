import React, { Component } from 'react';
import FormApp from '../../components/Form/Form';
import SimpleText from '../../components/SimpleText/SimpleText';
import Facebook from '../../images/facebook.png';
import Github from '../../images/github.png';
import './NewAccount.css';

class NewAccount extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div className="newAccount">
        <div className="newAccount-content">
          <div className="newAccount-content-icons">
            <img src={Facebook}></img>
            <img src={Github}></img>
          </div>
          <div>
            is simply dummy text of the printing and typesetting industry. 
            specimen book. It has survived not only five centuries, 
            but also the leap into electronic typesetting, remaining essentially 
            unchanged. It was popularised in the 1960s with the release of Letraset sheets 
            like Aldus PageMaker including versions of Lorem Ipsum
          </div>

          {/* <SimpleText className="newAccount-content-title">Crie sua conta!</SimpleText>
          <SimpleText className="newAccount-content-subtitle">Para você ter acesso ao sistema, precisamos de alguns dados seus para um simples cadastro. Para isso, preencha os campos abaixo conforme solicitado:</SimpleText>
          <FormApp></FormApp> */}
        </div>

      </div>
    );
  }
}

export default NewAccount;
