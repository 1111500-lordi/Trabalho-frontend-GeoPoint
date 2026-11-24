import { useState, useEffect } from "react";
import FormPonto from "../components/FormPonto";
import { validarPonto } from "../utils/validacao";
import { criarPonto, buscarPonto, atualizarPonto } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

function FormularioPonto() {
    const { id } = useParams();
    const modoEdicao = Boolean(id);
    const navegar = useNavigate();
    const [valores, setValores] = useState({
    nome: "",
    descricao: "",
    latitude: "",
    longitude: ""
});
    const [erros, setErros] = useState({});
    useEffect(() => {
    if (modoEdicao) {
        buscarPonto(id)
            .then((ponto) => {
                setValores({
                    nome: ponto.name,
                    descricao: ponto.description || "",
                    latitude: String(ponto.latitude),
                    longitude: String(ponto.longitude)
                });
            })
            .catch((erro) => {
                console.error("Erro ao buscar ponto:", erro.message);
            });
    }
}, [id, modoEdicao]);

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
        name: valores.nome,
        description: valores.descricao,
        latitude: Number(valores.latitude),
        longitude: Number(valores.longitude)
    };

        try {
    if (modoEdicao) {
        await atualizarPonto(id, ponto);
    } else {
        await criarPonto(ponto);
    }

    navegar("/pontos");
} catch (erro) {
    console.error("Erro ao salvar ponto:", erro);
}
    }

    return (
    <div>
        <h1>{modoEdicao ? "Editar ponto" : "Cadastrar ponto"}</h1>

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