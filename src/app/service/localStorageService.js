class LocalStorageService{
    static addItem(chave, valor){
        localStorage.setItem(chave, JSON.stringify(valor));
    }

    static getItem(chave){
        return JSON.parse(localStorage.getItem(chave));
    }

    static deleteItem(chave){
        localStorage.removeItem(chave);
    }
}

export default LocalStorageService;