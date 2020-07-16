import React from 'react';

import AuthService from '../app/service/authService';
export const AuthContext = React.createContext({

});
export const AuthConsumer = AuthContext.Consumer;
const AuthenticationProvider = AuthContext.Provider;

class AuthProvider extends React.Component{

    state = {
        authenticatedUser: null,
        isAuthenticated: false
    }

    iniciarSessao = (usuario) => {
        AuthService.authenticate(usuario);
        this.setState({isAuthenticated: true, authenticatedUser: usuario});
    }

    encerrarSessao = () => {
        AuthService.removeAuthentication();
        this.setState({isAuthenticated: false, authenticatedUser: null})
    }

    render(){
        const contexto = {
            authenticatedUser: this.state.authenticatedUser,
            isAuthenticated: this.state.isAuthenticated,
            iniciarSessao: this.iniciarSessao,
            encerrarSessao: this.encerrarSessao
        }

        return(
            <AuthenticationProvider value={contexto}>
                {this.props.children}
            </AuthenticationProvider>
        );
    }
}

export default AuthProvider;