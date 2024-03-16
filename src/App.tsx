import { useEffect, useState } from 'react'
import Header from './components/Header';
import Modal from './components/Modal';
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import {generarId } from  './helpers/helpers'
import ListadoGastos from './components/ListadoGastos';
import Filtros from './components/Filtros';

function App() {

  const [presupuesto, setPresupuesto] = useState(localStorage.getItem('presupuesto') ?? 0);
  const [isValidatePresupuesto, setIsValidatePresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState<object[]>(localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')as any) : [] );
  const [gastoEditar, setGastoEditar] = useState({});
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState<object[]>([]);


  useEffect(()=>{
    if(Object.keys(gastoEditar).length > 0 ){
      setModal(true);
      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  },[gastoEditar]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto') ?? 0);
    if(presupuestoLS > 0) setIsValidatePresupuesto(true);
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos))
    
  }, [gastos]);

  useEffect(() => {
    if(filtro) {
      const gastosFiltrados =  gastos.filter((gasto:any) => gasto.categoria === filtro);
      setGastosFiltrados(gastosFiltrados);
    };
  }, [filtro]);


  const handleNuevoGasto = () =>{
      setModal(true);
      setGastoEditar({});
      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
  } 

  const guardarGasto = (gasto:any) => {

    if(gasto.id){
      //Actualizar
      const gastosActualizados = gastos.map((gastoState:any) => gastoState.id === gasto.id ? gasto : gastoState);
      setGastos(gastosActualizados);
    }else{
      //crear
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
      setGastoEditar({});
    }

    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  }

  const eliminarGasto = (id:string) => {
    const gastosActualizados = gastos.filter((gasto:any) => gasto.id !== id);
    setGastos(gastosActualizados);

  }


  return (
    <div className={modal ? 'fijar' : '' }>
      <Header 
        presupuesto = {Number(presupuesto)}
        setPresupuesto = {setPresupuesto}
        isValidatePresupuesto = {isValidatePresupuesto}
        setIsValidatePresupuesto = {setIsValidatePresupuesto}
        gastos={gastos}
        setGastos={setGastos}
      />

    {isValidatePresupuesto && 
      <>
        <main>
          <Filtros 
            filtro={filtro} 
            setFiltro={setFiltro}
          />
          <ListadoGastos 
            gastos={gastos} 
            setGastoEditar={setGastoEditar} 
            eliminarGasto={eliminarGasto}
            filtro={filtro}
            gastosFiltrados={gastosFiltrados}
          />
        </main>
        <div className='nuevo-gasto'>
          <img src={IconoNuevoGasto} alt="icono nuevo gasto" onClick={handleNuevoGasto}/>
        </div>
      </>
    }

    {modal && 
      <Modal 
        setModal={setModal} 
        setAnimarModal={setAnimarModal} 
        animarModal= {animarModal}
        guardarGasto={guardarGasto}
        gastoEditar = {gastoEditar}
        setGastoEditar = {setGastoEditar}
      />
    }

    </div>
  )
}

export default App
