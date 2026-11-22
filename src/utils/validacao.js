function validarCoordenada(valor, rotulo, minimo, maximo) {
    if (valor === null || valor === undefined || String(valor).trim() === ""){
        return `O campo ${rotulo} é obrigatório.`;    
    }

    if (!Number.isFinite(Number(valor))) {
        return "O valor precisa ser um número válido.";
    }

    if (Number(valor) < minimo || Number(valor) > maximo) {
        return `A ${rotulo} deve estar entre ${minimo} e ${maximo}.`;
    }
}

export function validarPonto(form) {
    const erros = {};
    const erroLatitude = validarCoordenada(form.latitude, "Latitude", -90, 90);
    const erroLongitude = validarCoordenada(form.longitude, "Longitude", -180, 180);


    if (form.nome.trim() === "") {
        erros.nome = "O campo Nome é obrigatório.";
    } else if (form.nome.length > 100) {
        erros.nome = "O campo Nome deve ter no máximo 100 caractéres.";
    }
    

    if (form.descricao && form.descricao.length > 255) {
        erros.descricao = "O campo Descrição deve ter no máximo 255 caractéres";
    }


    if (erroLatitude) {
        erros.latitude = erroLatitude;
    }
    

    if (erroLongitude) {
        erros.longitude = erroLongitude;
    }

    return erros;
}