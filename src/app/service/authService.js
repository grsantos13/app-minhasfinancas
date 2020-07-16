import LocalStorageService from './localStorageService';

export const USUARIO_LOGADO = "_usuario_logado";

export default class AuthService{
    
    static isAuthenticated(){
        const usuario = LocalStorageService.getItem(USUARIO_LOGADO);
        return usuario && usuario.id;
    }

    static removeAuthentication(){
        LocalStorageService.deleteItem(USUARIO_LOGADO);
    }

    static authenticate(usuario){
        LocalStorageService.addItem(USUARIO_LOGADO, usuario);
    }

    static getAuthenticatedUser(){
        return LocalStorageService.getItem(USUARIO_LOGADO);
    }
}