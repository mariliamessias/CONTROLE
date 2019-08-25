import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link, Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Icon from '../../images/lontraIcon.png';
import * as Yup from 'yup';
import './Form.css';

class FormApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
    
    this.getInfoHandler = this.getInfoHandler.bind(this);
    
  }

  getInfoHandler(){
    alert('teste');
  }

  render() {
    return (
      <Formik
        initialValues={{
          senha: '',
          confSenha: '',
          telefone: '',
          email: '',
          confEmail: '',
          nome: ''
        }}
        validationSchema={Yup.object().shape({
          telefone: Yup.string()
            .required('Telefone é obrigatório.'),
          nome: Yup.string()
            .required('Nome é obrigatório.'),
          email: Yup.string()
            .email('Email inválido.')
            .required('Email é obrigatório.'),
          confEmail: Yup.string()
            .email('Email inválido.')
            .oneOf([Yup.ref('email'), null], 'Emails não são iguais.')
            .required('Confirmação do email é obrigatória.'),
          senha: Yup.string()
            .min(6, 'A senha precisa conter no mínimo 6 caracteres.')
            .required('Senha é obrigatória.'),
          confSenha: Yup.string()
            .oneOf([Yup.ref('senha'), null], 'Senhas não iguais.')
            .required('Confirmação de senha é obrigatória.')
        })}
        onSubmit={fields => {
          alert(this.props.showSocialIcons);
          alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
        }}
        render={({ errors, status, touched }) => (

          <Form className="Form">
            <div className="newAccount-form-content">
              <div className="newAccount-form-group-one">
                <div className="newAccount-form">
                  <div className="newAccount-form-item">
                    <label className="newAccount-form-item-text">{this.props.showSocialIcons ? "Informe o email que você utiliza na rede social selecionada:" : "Coloque o email que você mais utiliza:"}</label>
                    <Field name="email" type="email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} type="text" placeholder="Ex.: email.maravilhoso@provedor.com" />
                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                  </div>
                  <div className="newAccount-form-buttons" style={{ display: this.props.showSocialIcons ? 'flex' : 'none' }}>
                    <Link className="button-newAccount" to="/">Cancelar</Link>
                    <Button className="button-newAccount" onClick={this.getInfoHandler}>Consultar</Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="newAccount-form-group-two" style={{ display: this.props.showSocialIcons ? 'none' : 'block' }}>

              <div className="newAccount-form">
                <div className="newAccount-form-item">
                  <label className="newAccount-form-item-text">Acreditamos em você, mas seria legal se você repetisse ele aqui:</label>
                  <Field name="confEmail" type="email" className={'form-control' + (errors.confEmail && touched.confEmail ? ' is-invalid' : '')} type="text" placeholder="Ex.: email.maravilhoso@provedor.com" />
                  <ErrorMessage name="confEmail" component="div" className="invalid-feedback" />
                </div>
                <div className="newAccount-form-item" >
                  <label className="newAccount-form-item-text">Informe para nós seu telefone celular:</label>
                  <Field name="telefone" className={'form-control' + (errors.telefone && touched.telefone ? ' is-invalid' : '')} type="text" placeholder="Exemplo: 11988887777" />
                  <ErrorMessage name="telefone" component="div" className="invalid-feedback" />
                </div>
                <div className="newAccount-form-item">
                  <label className="newAccount-form-item-text">Gostaríamos muito de saber seu nome, informe para nós:</label>
                  <Field name="nome" className={'form-control' + (errors.nome && touched.nome ? ' is-invalid' : '')} type="text" placeholder="Nome mais lindo do mundo" />
                  <ErrorMessage name="nome" component="div" className="invalid-feedback" />
                </div>
                <div className="newAccount-form-item">
                  <label className="newAccount-form-item-text">Indicamos utilizar uma senha forte, assim como você:</label>
                  <Field name="senha" type="password" className={'form-control' + (errors.senha && touched.senha ? ' is-invalid' : '')} type="password" />
                  <ErrorMessage name="senha" component="div" className="invalid-feedback" />
                </div>
                <div className="newAccount-form-item">
                  <label className="newAccount-form-item-text">Só pra confirmar, repita ela aqui, por favor:</label>
                  <Field name="confSenha" type="password" className={'form-control' + (errors.confSenha && touched.confSenha ? ' is-invalid' : '')} type="password" />
                  <ErrorMessage name="confSenha" component="div" className="invalid-feedback" />
                </div>
                <div className="newAccount-form-buttons">
                  <Link className="button-newAccount" to="/">Cancelar</Link>
                  <Button className="button-newAccount" type="submit">Confirmar</Button>
                </div>
              </div>

            </div>

          </Form>
        )}
      />
    )
  }

  handleSubmit = event => {
    event.preventDefault();
  }

}



export default FormApp;


