import CampoCadastrar from "./CampoCadastrar";
import CampoDescricao from "./CampoDescricao";
export default function FormPonto(props) {
    
    return (
        <form onSubmit={props.aoEnviar}>
            <CampoCadastrar
                rotulo = "Nome"
                nome = "nome"
                valor = {props.valores.nome}
                aoMudar = {props.aoMudar}
                erro = {props.erros.nome}
                tipo = "text"
                obrigatorio = {true}
                maximo = {100}
            />

            <CampoDescricao
                rotulo = "Descrição"
                nome = "descricao"
                valor = {props.valores.descricao}
                aoMudar = {props.aoMudar}
                erro = {props.erros.descricao}
                maximo = {255}
            />

            <CampoCadastrar
                rotulo = "Latitude"
                nome = "latitude"
                valor = {props.valores.latitude}
                aoMudar = {props.aoMudar}
                erro = {props.erros.latitude}
                tipo = "number"
                obrigatorio = {true}
                step = "any"
            />

            <CampoCadastrar
                rotulo = "Longitude"
                nome = "longitude"
                valor = {props.valores.longitude}
                aoMudar = {props.aoMudar}
                erro = {props.erros.longitude}
                tipo = "number"
                obrigatorio = {true}
                step = "any"
            />

            <button type="submit">Salvar</button>

        </form>
    );
}