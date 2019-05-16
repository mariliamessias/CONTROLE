import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import check from '../../images/check.png';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputText from '../InputText/InputTex';
import Table from 'react-bootstrap/Table';
import './Menu.css';
import CurrencyInput from 'react-currency-input';
import SimpleText from '../SimpleText/SimpleText';
import excluir from '../../images/delete.png';
import editar from '../../images/change.png';

class Menu extends Component{   
    constructor(props, context){
        super(props, context);
  
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShowModal = this.handleShowModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleShowPagar = this.handleShowPagar.bind(this);
        this.handleShowSair = this.handleShowSair.bind(this);
        this.handleClosePagar = this.handleClosePagar.bind(this);
        this.handleCloseSair = this.handleCloseSair.bind(this);

        this.state = {
          show: false,
          showModal: false,
          showSair: false,
          showPagar: false,
          disabled : false,
          cadastrar: false,
          despesas: [],
          description:'', 
          dateVencto:'', 
          _id: '',
          status: '',
          value:'',
          item : '',
          usuario:'',
          errors:[],
        };

        this.save = this.save.bind(this);
        this.pagarDespesa = this.pagarDespesa.bind(this);
        this.setDescription =  this.setDescription.bind(this);
        this.setDateVencto = this.setDateVencto.bind(this);
        this.setUsuario = this.setUsuario.bind(this);
        this.setValue = this.setValue.bind(this);
        this.editarDespesa = this.editarDespesa.bind(this);
        this.showValidationError = this.showValidationError.bind(this);
      }
      
      pagarDespesa(){
        $.ajax({
          url:'https://api-despesas.herokuapp.com/despesas/'+this.state.item._id,
          contentType: 'application/json',
          type: 'PUT',
          data: JSON.stringify({
            description:this.state.item.description, 
            usuario: this.state.item.usuario,
            dateVencto:this.state.item.dateVencto, 
            value: this.state.item.value, 
            status: 'paga'
          }),
          success: function(resposta){
            $.ajax({
              url: "https://api-despesas.herokuapp.com/despesas",
              dataType: "json",
              success:function(resposta){
                const result = resposta.map(item => 
                  {
                    if (item.status === 'cadastrada'){
                      return item;
                    }
                });
                
                result.sort(function(a,b) { 
                  return new Date(a.dateVencto).getTime() - new Date(b.dateVencto).getTime() 
                });

                this.setState({despesas:result});
                this.handleCloseModal();
              }.bind(this)
            })
            this.handleClosePagar();
            
          }.bind(this),
          
          error: function (resposta) {
            console.log(`Mensagem: ${resposta}`);
          }
        })
      }

      excluirDespesa(){
        $.ajax({
          url:'https://api-despesas.herokuapp.com/despesas/'+this.state.item._id,
          type: 'DELETE',
          success : function(response){
            $.ajax({
              url: "https://api-despesas.herokuapp.com/despesas",
              dataType: "json",
              success:function(resposta){
                const result = resposta.map(item => 
                  {
                    if (item.status === 'cadastrada'){
                      return item;
                    }
                });
                result.sort(function(a,b) { 
                  return new Date(a.dateVencto).getTime() - new Date(b.dateVencto).getTime() 
                });
                this.setState({despesas:result});
                this.handleCloseModal();
              }.bind(this)
            })
          }.bind(this),
          error: function (resposta) {
            console.log(`Mensagem: ${resposta}`);
          }
        })
      }

      editarDespesa(){
        $.ajax({
          url:'https://api-despesas.herokuapp.com/despesas/'+this.state._id,
          contentType: 'application/json',
          type: 'PUT',
          data: JSON.stringify({
            description:this.state.description, 
            usuario: this.state.usuario,
            dateVencto:this.state.dateVencto, 
            value: this.state.value, 
            status: 'cadastrada'
          }),
          success: function(resposta){
            $.ajax({
              url: "https://api-despesas.herokuapp.com/despesas",
              dataType: "json",
              success:function(resposta){
                const result = resposta.map(item => 
                  {
                    if (item.status === 'cadastrada'){
                      return item;
                    }
                });
                result.sort(function(a,b) { 
                  return new Date(a.dateVencto).getTime() - new Date(b.dateVencto).getTime() 
                });
                this.setState({despesas:result});
                this.handleClose();
              }.bind(this)
            })
          }.bind(this),
          
          error: function (resposta) {
            console.log(`Mensagem: ${resposta}`);
          }
        })
      }

      handleClose() {
        this.setState({ show: false });
      }
        
      handleShow(item) {
        let date = new Date(item.dateVencto);
        let dateConv = '';
          if(item.description || item.value || item.dateVencto || item.status || item.usuario){
            if (item.dateVencto) {
              this.setState({cadastrar: false});
              dateConv = date.getFullYear() + '-' + ('0'+ (date.getMonth() + 1)).slice(-2) + '-' + ('0'+ date.getUTCDate()).slice(-2);
            }
          this.setState({
            _id: item._id,
            description: item.description,
            value: item.value,
            dateVencto: dateConv,
            status: item.status,
            usuario: item.usuario
          })
          }else {
            this.setState({
            description: '',
            value: '',
            dateVencto: '',
            status: '',
            usuario: '',
            cadastrar: true
            })
          };
        this.setState({ show: true });
      }

      handleShowModal(item){
        this.setState({item:item, showModal: true});
      }

      handleShowPagar(item){
        this.setState({item:item, showPagar: true })
      }

      handleClosePagar(item){
        this.setState({showPagar: false})
      }

      handleCloseSair(){
        this.setState({showSair: false})
      }

      handleShowSair(){
        this.setState({showSair: true })
      }
      
      handleCloseModal(){
        this.setState({showModal: false})
      }
      componentDidMount(){

        $.ajax({
          url: "https://api-despesas.herokuapp.com/despesas",
          dataType: "json",
          success:function(resposta){
            const result = resposta.map(item => 
            {
              if (item.status === 'cadastrada'){
                return item;
              }
            });

            result.sort(function(a,b) { 
              return new Date(a.dateVencto).getTime() - new Date(b.dateVencto).getTime() 
            });

            this.setState({despesas:result});
          }.bind(this)
        })
      }    

      save(cadastrar){
        if (cadastrar) {
          if (this.state.description != "" && this.state.dateVencto != "" && this.state.value != "" && this.state.usuario != "") {
            $.ajax({
                  url:'https://api-despesas.herokuapp.com/despesas',
                  contentType: 'application/json',
                  dataType: 'json',
                  type: 'post',
                  data: JSON.stringify({
                    description:this.state.description, 
                    usuario: this.state.usuario,
                    dateVencto:this.state.dateVencto, 
                    value: this.state.value, 
                    status: 'cadastrada'
                  }),
                  success: function(resposta){
                    var teste = this.state.despesas;
                    teste.push(resposta);

                    teste.sort(function(a,b) { 
                      return new Date(a.dateVencto).getTime() - new Date(b.dateVencto).getTime() 
                    });

                    this.setState({despesas:teste});
                    this.handleClose();
                    this.state.description = "";
                    this.state.dateVencto = "";
                    this.state.usuario = "";
                    this.state.value = "";
                    this.state.status = "";
                  }.bind(this),
                  error: function(resposta){
                  }
                })
          }else{
              if(this.state.description === ""){
                return this.showValidationError('desc', 'Preencha a descrição.');
              }
              if(this.state.dateVencto === ""){
                return this.showValidationError('data', 'Preencha o valor.');
              }
              if(this.state.value === ""){
                return this.showValidationError('valor', 'Preencha o valor.');
              }
              if(this.state.usuario === ""){
                return this.showValidationError('usuario', 'Selecione uma lontra.');
              }
              
          }  
        }else{
          if (this.state.description != "" && this.state.dateVencto != "" && this.state.value != "" && this.state.usuario != "")
          {
            this.editarDespesa();
          }else
          {
            if(this.state.description === ""){
              return this.showValidationError('desc', 'A descrição precisa ser preenchida.');
            }
            if(this.state.dateVencto === ""){
              return this.showValidationError('data', 'A data de vencimento precisa ser preenchida.');
            }
            if(this.state.value === ""){
              return this.showValidationError('valor', 'O valor precisa ser preenchido.');
            }
            if(this.state.usuario === ""){
              return this.showValidationError('usuario', 'Selecione uma lontra.');
            }
          }
        }
      }

      clearValidationError(elm, msg){
        this.setState((prevState) =>{
          let newArr = [];
          for(let err of prevState.errors){
            if(elm != err.elm){
              newArr.push(err);
            }
          }
          return {errors: newArr};;
        });
      }

      setDescription(evento){
        this.setState({description :evento.target.value});
        this.clearValidationError("desc");
      }

      setDateVencto(evento){
        this.setState({dateVencto :evento.target.value});
        this.clearValidationError("data");
      }

      setUsuario(evento){
        this.setState({usuario :evento.target.value});
        this.clearValidationError("usuario");
      }

      setValue(evento, value, maskedVaklue){
        this.setState({value :value});
        this.clearValidationError("valor");
      }

      showValidationError(elm, msg){
        this.setState((prevState) =>({
          errors: [...prevState.errors, {elm, msg}]
        }));
      }

      render() {

        const { value } = this.state;

        let descErr = null,
            dataErr = null,
            valorErr = null,
            userErr = null;
        
        for(let err of this.state.errors){
          if (err.elm === "desc"){
            descErr = err.msg;
          }else if(err.elm === "data"){
            dataErr = err.msg;
          }else if(err.elm === "valor"){
            valorErr = err.msg;
          }else if(err.elm === "usuario"){
            userErr = err.msg;
          }
        }

        return (
          <div className="Menu">
            <ul className="Menu-items">
               <p className="Menu-items-userName">{this.props.state.nome}</p>
                <li>Consultar Despesas Pagas</li>
                <li onClick={this.handleShow}>Cadastrar Despesa</li>
                <li onClick={this.handleShowSair}>Sair</li>
            </ul>
                <Modal show={this.state.show} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                      <Modal.Title>Cadastro de nova despesa</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <SimpleText>Descrição da Despesa:</SimpleText>
                    <InputText type="text" placeholder="Ex. conta de luz" value={this.state.description} onChange={this.setDescription}></InputText>
                    <span className="Login-body-error">{descErr ? descErr : "" }</span>
                    <SimpleText>Data de vencimento:</SimpleText>
                    <InputText type="date" value={this.state.dateVencto} onChange={this.setDateVencto}></InputText>
                    <span className="Login-body-error">{dataErr ? dataErr : "" }</span>
                    <SimpleText>Valor da despesa:</SimpleText>
                    <div className="Menu-items-select">
                    <CurrencyInput className="form-control-lg" prefix="R$ " precision="2" decimalSeparator="." thousandSeparator="," value={value} onChange={this.setValue}/>
                    </div>
                    <span className="Login-body-error">{valorErr ? valorErr : "" }</span>
                    <SimpleText>De que lontra é a conta?</SimpleText>
                    <div className="Menu-items-select">
                      <select className="form-control-lg" type="text" value={this.state.usuario} onChange={this.setUsuario}>
                      <option value="" disabled>Selecione uma Lontra</option>
                      <option value="mol">Mol</option>
                      <option value="coita">Coita</option>
                    </select>
                    <span className="Login-body-error">{userErr ? userErr : "" }</span>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={this.handleClose}>
                        Cancelar
                      </Button>
                      <Button disabled={this.state.disabled}  variant="primary" onClick={(event) => {this.save(this.state.cadastrar)}}>
                        Salvar
                      </Button>
                  </Modal.Footer>
                </Modal>              
                
                <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
                  <Modal.Header closeButton>
                      <Modal.Title>Excluir Despesa</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <SimpleText>Tem certeza que deseja excluir essa despesa?</SimpleText>
                   </Modal.Body>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={this.handleCloseModal}>
                        Cancelar
                      </Button>
                      <Button variant="primary" onClick={(event) => {this.excluirDespesa()}}>
                        Confirmar
                      </Button>
                  </Modal.Footer>
                </Modal>  

                <Modal show={this.state.showPagar} onHide={this.handleClosePagar}>
                  <Modal.Header closeButton>
                      <Modal.Title>Pagar Despesa</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <SimpleText>Tem certeza que deseja confirmar o pagamento dessa despesa?</SimpleText>
                   </Modal.Body>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={this.handleClosePagar}>
                        Cancelar
                      </Button>
                      <Button variant="primary" onClick={(event) => {this.pagarDespesa()}}>
                        Confirmar
                      </Button>
                  </Modal.Footer>
                </Modal>                
                
                <Modal show={this.state.showSair} onHide={this.handleCloseSair}>
                  <Modal.Header closeButton>
                      <Modal.Title>Oh no!</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <SimpleText>Tem certeza que deseja sair?</SimpleText>
                   </Modal.Body>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={this.handleCloseSair}>
                        Cancelar
                      </Button>
                      <Button>
                        <Link to="/" className="Menu-items-btn-sair">Sair</Link>
                      </Button>
                  </Modal.Footer>
                </Modal>  

          <Table striped bordered hover className="tabela">
            <thead>
                <tr>
                <th>Despesa</th>
                <th>Lontroso</th>
                <th>Data de Vencimento</th>
                <th>Valor</th>
                <th>Operação</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.despesas.map((item) => {
                      if (item !== '' && item !== undefined){
                        
                        let dateTr = new Date(item.dateVencto);
                        dateTr.setUTCHours(5);
                        let dateCon= '';
                        
                        dateCon =  ('0'+ dateTr.getUTCDate()).slice(-2) + '/'+ ('0'+ (dateTr.getMonth() + 1)).slice(-2)+'/'+dateTr.getFullYear();
                        
                        return (
                          <tr key={item._id}>
                          <td>{item.description}</td>
                          <td>{item.usuario}</td>
                          <td>{dateCon}</td>
                          <td>{`R$ ${parseFloat(item.value).toFixed(2)}`}</td>
                          <td className="operacoes">
                            <div className="operacoes">
                              <button className="btn btn-success" onClick={()=> this.handleShowPagar(item)}><img className="iconOperations" src={check} /></button>
                              <button className="btn btn-danger" onClick={() => this.handleShowModal(item)}><img className="iconOperations" src={excluir} /></button>
                              <button className="btn btn-info" onClick={() => this.handleShow(item)}><img className="iconOperations" src={editar} /></button>
                            </div>
                          </td>
                          </tr> 
                      )
                      }

                    })
                }
            </tbody>
        </Table>;
        </div>
        );
      }
}

export default Menu;