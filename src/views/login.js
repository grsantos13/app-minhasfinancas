import React from 'react';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import UsuarioService from '../app/service/usuarioService';
import { showErrorMessage, showSuccessMessage } from '../components/toastr'
import { withRouter } from 'react-router-dom';
import { AuthContext } from '../main/AuthProvider';

class Login extends React.Component{

    constructor(){
        super();
        this.service = new UsuarioService();
    }

    state = {
        email: '',
        senha: '',
        mensagemErro: null
    }

    entrar = () => {
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then(response => {
            showSuccessMessage("Login efetuado com sucesso!")
            this.context.iniciarSessao(response.data);
            this.props.history.push('/home');
        }).catch(erro =>{
            showErrorMessage(erro.response.data);
        });
    };

    prepareSignUpForm = () => {
        this.props.history.push('/cadastrar-usuario')
    }

    render(){
        return(
            <div className="row">
                <div className="col-md-6" style={ {position: 'relative', left: '300px' } }>
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <span>{this.state.mensagemErro}</span>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup inputName="email" label="Email: *">
                                                <input type="email" 
                                                    className="form-control" 
                                                    value={this.state.email}
                                                    onChange={e => this.setState({email: e.target.value})}
                                                    id="email" 
                                                    aria-describedby="email" 
                                                    placeholder="Digite o Email..." 
                                                />
                                            </FormGroup>
                                            <FormGroup inputName="senha" label="Senha: *">
                                                <input type="password" 
                                                    className="form-control" 
                                                    value={this.state.senha}
                                                    onChange={e => this.setState({senha: e.target.value})}
                                                    id="password" 
                                                    placeholder="Password..." 
                                                />
                                            </FormGroup>
                                            <button onClick={this.entrar} 
                                                    className="btn btn-success mr-3">
                                                    Entrar <i className="pi pi-sign-in" style={{fontSize: '13px'}}></i>
                                            </button>
                                            <button onClick={this.prepareSignUpForm}  
                                                    className="btn btn-danger">
                                                        Cadastrar <i className="pi pi-plus" style={{fontSize: '13px'}}></i>
                                            </button>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

Login.contextType = AuthContext;

export default withRouter( Login )