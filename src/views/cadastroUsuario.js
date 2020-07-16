import React from 'react';
import Card from '../components/card'
import FormGroup from '../components/form-group'
import UsuarioService from '../app/service/usuarioService';
import { showErrorMessage, showSuccessMessage } from '../components/toastr';
import { withRouter } from 'react-router-dom';

class CadastroUsuario extends React.Component{

    state = {
        nome: '',
        email: '',
        senha: '',
        confirmaSenha: ''
    }

    constructor(){
        super();
        this.usuarioService = new UsuarioService();
    }

    cadastrar = () => {
        let usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha,
            confirmaSenha: this.state.confirmaSenha
        }

        console.log(usuario);
        try{
            this.usuarioService.validar(usuario);
        }catch(erro){
            console.log(erro.mensagens);
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => showErrorMessage(msg));
            return false;
        }

        usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
        }

        this.usuarioService.cadastrarUsuario(usuario)
                .then(response => {
                    showSuccessMessage("Usuário cadastrado com sucesso!");
                    this.props.history.push('/login');
                }).catch(erro => {
                    showErrorMessage(erro.response.data);
                })
    }

    cancelSignUp = () => {
        this.props.history.push('/login')
    }

    render(){
        return(
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup inputName="nome" label="Nome: *">
                                <input type="text" 
                                    className="form-control" 
                                    value={this.state.nome}
                                    onChange={e => this.setState({nome: e.target.value})}
                                    id="nome" 
                                    name="nome"
                                />
                            </FormGroup>
                            <FormGroup inputName="email" label="E-mail: *">
                                <input type="email"
                                    className="form-control" 
                                    value={this.state.email}
                                    onChange={e => this.setState({email: e.target.value})}
                                    id="email" 
                                    name="email"
                                />
                            </FormGroup>
                            <FormGroup inputName="senha" label="Senha: *">
                                <input type="password" 
                                    className="form-control" 
                                    value={this.state.senha}
                                    onChange={e => this.setState({senha: e.target.value})}
                                    id="senha" 
                                    name="senha"
                                />
                            </FormGroup>
                            <FormGroup inputName="confirmaSenha" label="Confirmar Senha: *">
                                <input type="password" 
                                    className="form-control" 
                                    value={this.state.confirmaSenha}
                                    onChange={e => this.setState({confirmaSenha: e.target.value})}
                                    id="confirmaSenha" 
                                    name="confirmaSenha"
                                />
                            </FormGroup>
                            <button onClick={this.cadastrar} 
                                    type="button" 
                                    className="btn btn-success">
                                    <i className="pi pi-save" style={{fontSize: '15px'}}></i> Cadastrar
                            </button>
                            <button onClick={this.cancelSignUp} 
                                    type="button" 
                                    className="btn btn-danger ml-3">
                                    <i className="pi pi-times" style={{fontSize: '15px'}}></i> Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}

export default withRouter( CadastroUsuario )