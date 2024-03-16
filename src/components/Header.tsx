import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto';
import ControlPresupuesto from './ControlPresupuesto';

type Props={
    presupuesto:number
    setPresupuesto:any,
    isValidatePresupuesto:boolean
    setIsValidatePresupuesto:any
    gastos:any
    setGastos:any
}

const Header = ({
    presupuesto, 
    setPresupuesto, 
    isValidatePresupuesto, 
    setIsValidatePresupuesto, 
    gastos, 
    setGastos
}:Props) => {
    return (
        <header>
            <h1>Planificador de Gastos</h1>
            {
                isValidatePresupuesto ? 
                <>
                    <ControlPresupuesto
                        presupuesto = {presupuesto}
                        gastos = {gastos}
                        setGastos={setGastos}
                        setPresupuesto={setPresupuesto}
                        setIsValidatePresupuesto={setIsValidatePresupuesto}
                    />
                </>
                :
                <>
                    <NuevoPresupuesto
                        presupuesto = {presupuesto}
                        setPresupuesto = {setPresupuesto}
                        setIsValidatePresupuesto = {setIsValidatePresupuesto}
                    />
                </>
            }
        </header>
    )
}

export default Header
