import { useState } from "react";
import FormPonto from "../components/FormPonto";
import { validarPonto } from "../utils/validacao";
import { criarPonto } from "../services/api";
import { useNavigate } from "react-router-dom";

function FormularioPonto() {
    const navegar = useNavigate();
    const [valores, setValores] = useState({
    nome: "",
    descricao: "",
    latitude: "",
    longitude: ""
});
    const [erros, setErros] = useState({});

    function aoMudar(event) {
        const { name, value } = event.target;
        setValores({
            ...valores,
            [name]: value
        });
    }

    async function aoEnviar(event) {
        event.preventDefault();
        const novosErros = validarPonto(valores);
        setErros(novosErros);
        if (Object.keys(novosErros).length > 0) {
           return;
        }

        const ponto = {
            ...valores,
            latitude: Number(valores.latitude),
            longitude: Number(valores.longitude)
        };

        try {
            await criarPonto(ponto);            
            navegar("/pontos");
        } catch (erro) {
            console.error("Erro ao cadastrar ponto:", erro);
        }
    }

    return (
    <div>
        <h1>Formulário de ponto</h1>

        <FormPonto
            valores={valores}
            erros={erros}
            aoMudar={aoMudar}
            aoEnviar={aoEnviar}

        />

    </div>

    
);

}

export default FormularioPonto;