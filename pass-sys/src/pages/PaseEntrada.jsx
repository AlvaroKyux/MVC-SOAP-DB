import { useEffect, useState } from 'react';

function PaseEntrada() {
  const [estado, setEstado] = useState(null);

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem('estadoSensor'));
    setEstado(datos);
  }, []);

  if (!estado) return <p>Cargando...</p>;

  // Si es morado (espera) → fondo morado, si detecta pase → verde
  const esPase = estado.estado === 'pase';
  const color = esPase ? 'green' : 'purple';
  const texto = esPase ? 'Pase' : 'Esperando...';

  return (
    <div style={{
      backgroundColor: color,
      color: 'white',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '3rem'
    }}>
      {texto}
    </div>
  );
}

export default PaseEntrada;
