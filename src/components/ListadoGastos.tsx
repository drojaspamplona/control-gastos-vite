
import Gasto from './Gasto';

type Props = {
    gastos: any
    setGastoEditar: any
    eliminarGasto: any,
    filtro: any,
    gastosFiltrados: any
}

const ListadoGastos = ({
    gastos,
    setGastoEditar,
    eliminarGasto,
    filtro,
    gastosFiltrados
}: Props) => {
    return (
        <div className='listado-gastos contenedor'>
            {
            filtro ? 
                <>
                        <h2>{gastosFiltrados.length ? 'Gastos' : 'No Hay Gastos Aún'}</h2>
                        {gastosFiltrados.map((gasto: any) =>
                            <Gasto
                                key={gasto.id}
                                gasto={gasto}
                                setGastoEditar={setGastoEditar}
                                eliminarGasto={eliminarGasto}
                            />
                        )}
                    </>
            
                :
                <>
                    <h2>{gastos.length ? 'Gastos' : 'No Hay Gastos Aún'}</h2>
                    {gastos.map((gasto: any) =>
                        <Gasto
                            key={gasto.id}
                            gasto={gasto}
                            setGastoEditar={setGastoEditar}
                            eliminarGasto={eliminarGasto}
                        />
                    )}
                </>
            }
        </div>
    )
}

export default ListadoGastos
