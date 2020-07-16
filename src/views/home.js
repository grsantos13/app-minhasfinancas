import React from 'react';
import UsuarioService from '../app/service/usuarioService';
import currencyFormatter from 'currency-formatter';
import { AuthContext } from '../main/AuthProvider';
import { showErrorMessage } from '../components/toastr';

class Home extends React.Component{
    constructor(){
        super();
        this.usuarioService = new UsuarioService();
    }

    state = {
        saldo: 0
    };

    componentDidMount(){
        const idUsuario = this.context.authenticatedUser.id;


        this.usuarioService.obterSaldoPorUsuario(idUsuario)
                .then(response => {
                    const saldo = currencyFormatter.format(response.data, {locale: 'pt-BR'})
                    this.setState({saldo});    
                }).catch(erro =>{
                    showErrorMessage(erro.response.data);    
                });
    };

    render(){
        return(
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                <p className="lead">Esse é seu sistema de finanças.</p>
                <p className="lead">Seu saldo para o mês atual é de {this.state.saldo}</p>
                <hr className="my-4" />
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg" 
                       href="#/cadastrar-usuario" 
                       role="button"><i className="pi pi-users" style={{fontSize: '18px'}}></i>  Cadastrar Usuário</a>
                    <a className="btn btn-danger btn-lg" 
                       href="#/cadastrar-lancamento" 
                       role="button"><i className="pi pi-plus" style={{fontSize: '16px'}}></i>  Cadastrar Lançamento</a>
                </p>
            </div>
        );
    }
}

Home.contextType = AuthContext;

export default Home;