export default function CampoCadastrar(props) {
    return (
        <div>
            <label htmlFor={props.nome}>{props.rotulo}</label> 
            {props.erro && <p>{props.erro}</p>}           
            <input
            value = {props.valor} 
            onChange = {props.aoMudar}
            name = {props.nome}
            type = {props.tipo}
            placeholder = {props.placeholder}
            required = {props.obrigatorio}
            maxLength = {props.maximo}
            step = {props.step}
            id = {props.nome}
            />
        </div>
    );
}