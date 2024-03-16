
import { useEffect, useState } from 'react';
import { formatNumber } from '../utils/format-number';
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

type Props={
    presupuesto:number
    gastos:any
    setGastos:any
    setPresupuesto:any
    setIsValidatePresupuesto:any
}

const ControlPresupuesto = ({presupuesto, gastos, setGastos, setPresupuesto, setIsValidatePresupuesto}:Props) => {

    const [disponible, setDisponible] = useState<number>(0);
    const [gastado, setGastado] = useState<number>(0);
    const [porcentaje, setPorcentaje] = useState<any>(0);

    useEffect(() =>{
        const totalGastado = gastos.reduce((total:number, gasto:any) => Number(gasto.cantidad) + total, 0);
        const totalDisponible = presupuesto - totalGastado;
        //porcentaje gastado
        const nuevoPorcentaje = (((presupuesto-totalDisponible)/ presupuesto) * 100).toFixed(2);
        setGastado(totalGastado);
        setDisponible(totalDisponible);
        setTimeout(()=> {
            setPorcentaje(nuevoPorcentaje);
        }, 1000);
    },[gastos]);

    useEffect(() => {
        localStorage.setItem('presupuesto', JSON.stringify(presupuesto) ?? 0)
    },[presupuesto]);

    const handleResetApp = () => {
        const resultado = confirm("¿Deseas reiniciar presupuesto y gastos?");

        if(resultado){
            setGastos([]);
            setPresupuesto(0);
            setIsValidatePresupuesto(false);
        }
    }

    
    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar
                    value={porcentaje}
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                    })}
                    text={`${porcentaje} Gastado`}
                />
            </div>
            <div className='contenido-presupuesto'> 
                <button 
                    className='reset-app' 
                    type='button'
                    onClick={handleResetApp}
                    >
                    Resetear App
                </button>
                
                <p>
                    <span>Presupuesto: </span>{formatNumber(presupuesto)}
                </p>
                <p className={`${disponible < 0 ? 'negativo': ''}`}>
                    <span>Disponible: </span>{formatNumber(disponible)}
                </p>
                <p>
                    <span>Gastado: </span>{formatNumber(gastado)}
                </p>
            </div>
        
        </div>
    )
}

export default ControlPresupuesto
