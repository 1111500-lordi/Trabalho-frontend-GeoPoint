
export default function CampoDescricao(props) {
    return (
        <div className="campo-formulario">
            <label htmlFor={props.nome}>
                {props.rotulo}
            </label>

            {props.erro && (
                <p className="mensagem-erro">
                    {props.erro}
                </p>
            )}

            <textarea
                value={props.valor}
                onChange={props.aoMudar}
                name={props.nome}
                id={props.nome}
                maxLength={props.maximo}
                rows={props.rows || 4}
                placeholder={props.placeholder}
                aria-invalid={Boolean(props.erro)}
            />
        </div>
    );
}
