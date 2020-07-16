import ApiService from '../apiservice';
import ErroValidacao from '../exception/errorValidacao';

class UsuarioService extends ApiService{

    constructor(){
        super("/api/usuarios");
    }

    autenticar(credenciais){
        return this.post('/login', credenciais);
    }

    obterSaldoPorUsuario(id){
        return this.get(`/${id}/saldo`);
    }

    cadastrarUsuario(usuario){
        return this.post('/', usuario);
    }

    validar(usuario){
        const erros = [];
        
        for (let [key, value] of Object.entries(usuario)){
            if (key === "email"){
                if(!value.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
                    erros.push("Digite um e-mail válido");
                }
            }else if (key === "confirmaSenha"){
                if (value !== usuario.senha){
                    erros.push("A senha não confere com a sua confirmação.");
                }
            }
            if (value === ''){
                erros.push("O campo " + key + " é obrigatório");
            }
        }

        if (erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }

}

export default UsuarioService;