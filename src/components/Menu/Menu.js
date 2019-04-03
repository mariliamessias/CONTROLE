import React, { Component } from 'react';
import $ from 'jquery';
import check from '../../images/check.png';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputText from '../InputText/InputTex';
import Table from 'react-bootstrap/Table';
import './Menu.css';
import SimpleText from '../SimpleText/SimpleText';
import excluir from '../../images/delete.png';
import editar from '../../images/change.png';

class Menu extends Component{   
    constructor(props, context){
        super(props, context)
  
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
  
        this.state = {
          show: false,
          disabled : true,
          despesas: [],
          description:'', 
          dateVencto:'', 
          value:''
        };

        this.save = this.save.bind(this);
        this.setDescription =  this.setDescription.bind(this);
        this.setDateVencto = this.setDateVencto.bind(this);
        this.setValue = this.setValue.bind(this);
        this.validaForm = this.validaForm.bind(this);
      }
        handleClose() {
          this.setState({ show: false });
        }
         handleShow() {
          this.setState({ show: true });
        }  
               
        componentDidMount(){
          $.ajax({
            url: "http://localhost:5000/despesas",
            dataType: "json",
            success:function(resposta){
              this.setState({despesas:resposta});
            }.bind(this)
          })
        } 

        save(){
            if (this.state.description != "" && this.state.dateVencto != "" && this.state.value != "") {
                $.ajax({
                    url:'http://localhost:5000/despesas',
                    contentType: 'application/json',
                    dataType: 'json',
                    type: 'post',
                    data: JSON.stringify({description:this.state.description, dateVencto:this.state.dateVencto, value:this.state.value}),
                    success: function(resposta){
                      var teste = this.state.despesas;
                      teste.push(resposta);
                      this.setState({despesas:teste});
                      this.handleClose();
                      this.state.description = "";
                      this.state.dateVencto = "";
                      this.state.value = "";
                    }.bind(this),
                    error: function(resposta){
                      console.log("erro");
                    }
                  })
            }else{
                alert("preencha todos os campos")
            }
         
        }

        validaForm(){
            if (this.state.description != "" && this.state.dateVencto != "" && this.state.value != "") {
                this.state.disabled = false;
            }else{
                this.state.disabled = true;
            } 
        }

        setDescription(evento){
          this.setState({description :evento.target.value});
          this.validaForm();
        }

        setDateVencto(evento){
          this.setState({dateVencto :evento.target.value});
          this.validaForm();
        }

        setValue(evento){
          this.setState({value :evento.target.value});
          this.validaForm();
        }

      render() {
        return (
          <div className="Menu">
            <ul className="Menu-items">
                <li>Consultar Despesas Pagas</li>
                <li onClick={this.handleShow}>Cadastrar Nova Despesa</li>
                <li>Sair</li>
            </ul>
                <Modal show={this.state.show} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                      <Modal.Title>Cadastro de nova despesa</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <SimpleText>Descrição da Despesa:</SimpleText>
                    <InputText type="text" placeholder="Ex. conta de luz" value={this.state.description} onChange={this.setDescription}></InputText>
                    <SimpleText>Data de vencimento:</SimpleText>
                    <InputText type="date" value={this.state.dateVencto} onChange={this.setDateVencto}></InputText>
                    <SimpleText>Valor da despesa:</SimpleText>
                    <InputText type="number" placeholder="R$ 0,00" value={this.state.value} onChange={this.setValue}></InputText>
                  </Modal.Body>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={this.handleClose}>
                        Cancelar
                      </Button>
                      <Button disabled={this.state.disabled}  variant="primary" onClick={(event) => {this.save()}}>
                        Salvar
                      </Button>
                  </Modal.Footer>
                </Modal>

          <Table striped bordered hover className="tabela">
            <thead>
                <tr>
                <th>Despesa</th>
                <th>Data de Vencimento</th>
                <th>Valor</th>
                <th>Operação</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.despesas.map(function(item){
                        return (
                            <tr key={item._id}>
                            <td>{item.description}</td>
                            <td>{item.dateVencto}</td>
                            <td>{item.value}</td>
                            <td className="operacoes">
                              <div className="operacoes">
                                <button className="btn btn-success"><img className="iconOperations" src={check} /></button>
                                <button className="btn btn-danger"><img className="iconOperations" src={excluir} /></button>
                                <button className="btn btn-info"><img className="iconOperations" src={editar} /></button>
                              </div>
                            </td>
                            </tr> 
                        )
                    })
                }
            </tbody>
        </Table>;
        </div>
        );
      }
}

export default Menu;