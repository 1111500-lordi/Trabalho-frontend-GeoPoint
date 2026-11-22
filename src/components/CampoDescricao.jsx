export default function CampoDescricao(props) {
    return (
        <div>
            <label htmlFor={props.nome}>{props.rotulo}</label>
            {props.erro && <p className="erro">{props.erro}</p>}
            <textarea 
            value = {props.valor}
            onChange = {props.aoMudar}
            name = {props.nome}
            id = {props.nome}
            maxLength = {props.maximo}
            rows={props.rows}
            placeholder={props.placeholder}
            />

        </div>
    );
}