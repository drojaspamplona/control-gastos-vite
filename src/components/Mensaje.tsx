import React from 'react'

type Props ={
    message:string
    tipo:string
}

const Mensaje = ({message,tipo}:Props) => {
    return (
        <div className={`alerta ${tipo}`}>{message}</div>
    )
    }

export default Mensaje
