import React from 'react';
import { Route, Switch, HashRouter, Redirect } from 'react-router-dom';
import { AuthConsumer } from '../main/AuthProvider';

import Login from '../views/login';
import CadastroUsuario from  '../views/cadastroUsuario'
import Home from '../views/home'
import ConsultaLancamentos from '../views/consultaLancamentos';
import CadastroLancamentos from '../views/cadastroLancamentos';


function RotaAutenticada({ component: Component, isAuthenticated, ...props }){
    return (
        <Route {...props} render={(componentProps) => {
            if (isAuthenticated){
                return(
                    <Component {...componentProps} />
                );
            }else{
                return(
                    <Redirect to={{pathname: '/login', state: {from: componentProps.location }}} />
                );
            }
        }} />
    );
}

function RotaNaoAutenticada({ component: Component, isAuthenticated, ...props }){
    return (
        <Route {...props} render={(componentProps) => {
            if (!isAuthenticated){
                return(
                    <Component {...componentProps} />
                );
            }else{
                return(
                    <Redirect to={{pathname: '/home', state: {from: componentProps.location }}} />
                );
            }
        }} />
    );
}

function Rotas(props){
    return(
        <HashRouter>
            <Switch>
                <RotaNaoAutenticada isAuthenticated={props.isAuthenticated} path="/login" component={Login} />
                <RotaNaoAutenticada isAuthenticated={props.isAuthenticated} path="/cadastrar-usuario" component={CadastroUsuario} />

                <RotaAutenticada isAuthenticated={props.isAuthenticated} path="/home" component={Home} />
                <RotaAutenticada isAuthenticated={props.isAuthenticated} path="/lancamentos" component={ConsultaLancamentos} />
                <RotaAutenticada isAuthenticated={props.isAuthenticated} path="/cadastrar-lancamento" component={CadastroLancamentos} />
                <RotaAutenticada isAuthenticated={props.isAuthenticated} path="/cadastrar-lancamento/:id" component={CadastroLancamentos} />
            </Switch>
        </HashRouter>
    );
}

export default () => (
    <AuthConsumer>
        { (context) => (<Rotas isAuthenticated={context.isAuthenticated} />) }
    </AuthConsumer>
)