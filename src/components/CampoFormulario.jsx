// Campo de formulario con etiqueta y mensaje de error.
function CampoFormulario({ etiqueta, nombre, tipo = 'text', valor, alCambiar, error }) {
    const clases =
        'tw:w-full tw:rounded-lg tw:border tw:bg-white tw:px-3 tw:py-2 tw:text-tinta tw:outline-none tw:focus:border-fondo ' +
        (error ? 'tw:border-red-400' : 'tw:border-fondo-claro')

    return (
        <div className="tw:flex tw:flex-col tw:gap-1">
            <label htmlFor={nombre} className="tw:text-sm tw:font-semibold tw:text-fondo">
                {etiqueta}
            </label>

            {tipo === 'textarea' ? (
                <textarea id={nombre} name={nombre} rows={5} value={valor} onChange={alCambiar} className={clases} />
            ) : (
                <input id={nombre} name={nombre} type={tipo} value={valor} onChange={alCambiar} className={clases} />
            )}

            {error && (
                <span className="tw:text-sm tw:text-red-700">{error}</span>
            )}
        </div>
    )
}

export default CampoFormulario
