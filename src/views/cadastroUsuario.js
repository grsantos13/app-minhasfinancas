import React from 'react';
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom';

class CadastroUsuario extends React.Component{

    state = {
        nome: '',
        email: '',
        senha: '',
        confirmaSenha: ''
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
                                    onChange={e => this.setState({email: e.target.value})}
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
                                    onChange={e => this.setState({email: e.target.value})}
                                    id="senha" 
                                    name="senha"
                                />
                            </FormGroup>
                            <FormGroup inputName="confirmaSenha" label="Confirmar Senha: *">
                                <input type="password" 
                                    className="form-control" 
                                    value={this.state.confirmaSenha}
                                    onChange={e => this.setState({email: e.target.value})}
                                    id="confirmaSenha" 
                                    name="confirmaSenha"
                                />
                            </FormGroup>
                            <button type="button" className="btn btn-success">Cadastrar</button>
                            <button onClick={this.cancelSignUp} type="button" className="btn btn-danger">Cancelar</button>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}

export default withRouter( CadastroUsuario )