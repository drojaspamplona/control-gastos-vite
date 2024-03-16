import { useState } from "react";
import Mensaje from "./Mensaje";

type Props={
    presupuesto:number
    setPresupuesto:any
    setIsValidatePresupuesto:any
}

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidatePresupuesto}:Props) => {
    
    const [mensaje, setMensaje] = useState("");

    const handlePresupuesto = (e:any) => {
        e.preventDefault();
        if(!presupuesto || Number(presupuesto) < 0){
            setMensaje("No es un presupuesto válido.");
            return;
        }

        setMensaje("");
        setIsValidatePresupuesto(true);


    } 
    return (
        <div className='contenedor-presupuesto contenedor sombra'> 
            <form className='formulario' onSubmit={handlePresupuesto}>
                <div className='campo'>
                    <label htmlFor="">Definir presupuesto</label>
                    <input 
                        type="number" 
                        value={presupuesto}
                        placeholder='Añade tu presupuesto'  
                        className='nuevo-presupuesto'
                        onChange={(e) => setPresupuesto(Number(e.target.value))}
                    />
                </div>
                <input type="submit" value="Añadir"/>

                {mensaje && <Mensaje tipo='error' message={mensaje}/> }
            </form>
        
        </div>
    )
}

export default NuevoPresupuesto
