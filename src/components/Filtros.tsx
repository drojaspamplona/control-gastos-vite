import {useState} from 'react'

type Props={
    filtro: string
    setFiltro: any

}

const Filtros = ({filtro, setFiltro}: Props) => {

    const optionsCategory = [
        {"id": "" , "value":"-- Todas las categorias --" },
        {"id": "ahorro" , "value":"Ahorro" },
        {"id": "comida" , "value":"Comida" },
        {"id": "casa" , "value":"Casa" },
        {"id": "gastos" , "value":"Gastos varios" },
        {"id": "ocio" , "value":"Ocio" },
        {"id": "salud" , "value":"Salud" },
        {"id": "suscripciones" , "value":"Suscripciones" },
    ];

    return (
        <div className='filtros sombra contenedor'>
            <form>
                <div className='campo'>
                    <label htmlFor="">Filtrar Categoria Gastos</label>
                    <select value={filtro} onChange={e => setFiltro(e.target.value)}>
                        {
                            optionsCategory.map((n:any) =>
                                <option key={n.id} value={n.id}>
                                    {n.value}
                                </option>
                            )
                        }
                    </select>
                </div>

            </form>
        
        </div>
    )
}

export default Filtros
