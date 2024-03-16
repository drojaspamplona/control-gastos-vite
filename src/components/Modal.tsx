import { useEffect, useState } from 'react'
import IconoCerrarModal from '../img/cerrar.svg' 
import Mensaje from './Mensaje';

type Props = {
    setModal:any
    animarModal:any
    setAnimarModal:any
    guardarGasto:any
    gastoEditar:any
    setGastoEditar:any
}


const Modal = ({setModal,animarModal,setAnimarModal,guardarGasto,gastoEditar,setGastoEditar}: Props) => {

    const [mensaje, setMensaje] = useState("");
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState(0);
    const [categoria, setCategoria] = useState("");
    const [id, setId] = useState('');
    const [fecha, setFecha] = useState('');


    const optionsCategory = [
        {"id": "" , "value":"-- Seleccione --" },
        {"id": "ahorro" , "value":"Ahorro" },
        {"id": "comida" , "value":"Comida" },
        {"id": "casa" , "value":"Casa" },
        {"id": "gastos" , "value":"Gastos varios" },
        {"id": "ocio" , "value":"Ocio" },
        {"id": "salud" , "value":"Salud" },
        {"id": "suscripciones" , "value":"Suscripciones" },
    ];

    useEffect(()=> {
        if(Object.keys(gastoEditar).length > 0 ){
            const {nombre, cantidad, categoria, id, fecha} = gastoEditar;
            setNombre(nombre);
            setCantidad(cantidad);
            setCategoria(categoria);
            setId(id);
            setFecha(fecha)
        }
    },[] )

    const ocultarmodal = () =>{
        setAnimarModal(false);
        setGastoEditar({});
        setTimeout(() => {
            setModal(false);
        }, 500);
    } 

    const handleSubmit = (e:any) => {
        e.preventDefault();
        if([nombre,cantidad ,categoria].includes('')){
            setMensaje("Todos los campos son obligatorios.");
            setTimeout(()=>{
                setMensaje("");
            },500 )
            return;
        }
        guardarGasto({nombre,cantidad ,categoria, id, fecha});
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img src={IconoCerrarModal} alt="cerrar modal" onClick={ocultarmodal}/>
            </div>

            <form onSubmit={handleSubmit} 
                className={`formulario ${animarModal ? "animar" : "cerrar"}`}
            >
                <legend>{Object.keys(gastoEditar).length > 0 ? 'Editar Gasto' : 'Nuevo Gasto' }</legend>
                {
                    mensaje && <Mensaje message={mensaje} tipo="error"/>
                }
                <div className='campo'>
                    <label htmlFor="nombre">Nombre gasto</label>
                    <input 
                        type="text" 
                        placeholder='Añade el nombre del gasto' 
                        id='nombre'
                        value={nombre}
                        onChange={(e:any)=> setNombre(e.target.value)}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor="nombre">Cantidad</label>
                    <input 
                        type="number" 
                        placeholder='Añade la cantidad del gasto: ej. 100' 
                        id='cantidad'
                        value={cantidad}
                        onChange={(e:any)=> setCantidad(e.target.value)}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor="categoria">Categoría</label>
                    <select 
                        id="categoria"
                        value={categoria}
                        onChange={(e:any)=> setCategoria(e.target.value)}
                    >
                        {
                            optionsCategory.map((n:any) =>
                                <option key={n.id} value={n.id}>
                                    {n.value}
                                </option>
                            )
                        }
                    </select>
                </div>

                <div className='campo'>
                    <input type="submit" value={Object.keys(gastoEditar).length > 0 ? 'Guardar Cambios' : 'Añadir Gasto' }/>
                </div>

            </form>
        </div>
    )
}

export default Modal
