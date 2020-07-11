import React from 'react';
import Card from '../components/card'
import FormGroup from '../components/form-group'

class Login extends React.Component{

    state = {
        email: '',
        senha: ''
    }

    entrar = () => {
        console.log(this.state.email)
        console.log(this.state.senha)
        
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6" style={ {position: 'relative', left: '300px' } }>
                        <div className="bs-docs-section">
                            <Card title="Login">
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
                                                <button onClick={this.entrar} className="btn btn-success">Entrar</button>
                                                <button className="btn btn-danger">Cadastrar</button>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login