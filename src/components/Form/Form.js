import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Icon from '../../images/lontraIcon.png';
import Button from 'react-bootstrap/Button';
import './Form.css';

class Form extends React.Component{
  constructor(props){
    super(props);
 }

  render(){    

    return (
      <form className="Form" onSubmit={this.handleSubmit}>
         <div className="newAccount-form-content">
            <div className="newAccount-form-group-one">
              <div className="newAccount-form-icon">
                <img className="newAccount-form-image" src={Icon} />
              </div>
              <div className="newAccount-form">
              <div className="newAccount-form-item">
              <p className="newAccount-form-item-text">Para te notificar e te ajudar a controlar suas despesas, informe para nós seu telefone celular:</p>
                  <input className="form-control newAccount-form-item-input" type="text" placeholder="Exemplo: 11988887777" onChange={this.handleTelefoneChange}/>
                </div>
                <div className="newAccount-form-item">
                  <p className="newAccount-form-item-text">Coloque o email que você mais utiliza:</p>
                  <input type="email" className="form-control newAccount-form-item-input" type="text" placeholder="Ex.: email.maravilhoso@provedor.com" />
                </div>
                <div className="newAccount-form-item">
                  <p className="newAccount-form-item-text">Acreditamos em você, mas seria legal se você repetisse ele aqui:</p>
                  <input type="email" className="form-control newAccount-form-item-input" type="text" placeholder="Ex.: email.maravilhoso@provedor.com"  />
                </div>
            </div>
             
            </div> 
            </div>
            <div className="newAccount-form-group-two">
            <div className="newAccount-form">
                  <div className="newAccount-form-item">
                  <p className="newAccount-form-item-text">Gostaríamos muito de saber seu nome, informe para nós:</p>
                    <input className="form-control newAccount-form-item-input" type="text" placeholder="Nome mais lindo do mundo" />
                  </div>
                  <div className="newAccount-form-item">
                    <p className="newAccount-form-item-text">Indicamos utilizar uma senha forte, assim como você:</p>
                    <input type="password" className="form-control newAccount-form-item-input" type="password" />
                  </div>
                  <div className="newAccount-form-item">
                    <p className="newAccount-form-item-text">Só pra confirmar, repita ela aqui, por favor:</p>
                    <input type="password" className="form-control newAccount-form-item-input" type="password" />
                  </div>
          </div>
          </div>
    
          <div className="newAccount-form-buttons">
            <Link className="button-newAccount" to="/">Cancelar</Link>
            <Button className="button-newAccount" type="submit">Confirmar</Button>
          </div>
      </form>
    )
  }

  handleSubmit = event => {
    event.preventDefault();
}

}



export default Form;


