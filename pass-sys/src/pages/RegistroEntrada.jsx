import Layout from '../components/Layout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const meses = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

function RegistroEntrada() {
  const [mesActual, setMesActual] = useState(new Date().getMonth());
  const navigate = useNavigate();

  // Datos simulados (pueden venir de una API más adelante)
  const registros = [
    { fecha: '2025-08-01', hora: '08:30', nombre: 'Alan Pérez' },
    { fecha: '2025-08-02', hora: '09:00', nombre: 'Alan Pérez' },
    { fecha: '2025-07-29', hora: '07:45', nombre: 'Alan Pérez' },
  ];

  // Filtrar registros por mes seleccionado
  const registrosFiltrados = registros.filter(reg => {
    const fecha = new Date(reg.fecha);
    return fecha.getMonth() === mesActual;
  });

  const cambiarMes = (delta) => {
    setMesActual((prev) => {
      const nuevo = prev + delta;
      if (nuevo < 0) return 11;
      if (nuevo > 11) return 0;
      return nuevo;
    });
  };

  const solicitarPase = async () => {
    try {
      // Llama a tu backend que hace proxy al ESP32
      const res = await fetch('http://localhost:5000/status-sensor');
      const data = await res.json();
      // Guarda el último estado por si quieres mostrar algo inmediato en /pase
      localStorage.setItem('estadoSensor', JSON.stringify(data));
      // Redirige a la HU4
      navigate('/pase');
    } catch (err) {
      console.error('Error solicitando pase:', err);
      alert('No se pudo contactar al sensor. Verifica el backend/ESP32.');
    }
  };

  return (
    <Layout>
      <h2>Registro de Entradas</h2>

      <div style={{ marginBottom: '1rem', display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
        <button onClick={() => cambiarMes(-1)}>&lt;</button>
        <label style={{ fontWeight: 600 }}>{meses[mesActual]}</label>
        <button onClick={() => cambiarMes(1)}>&gt;</button>
      </div>

      <table style={{ width: '100%', maxWidth: '700px', margin: '0 auto', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#6a1b9a', color: 'white' }}>
            <th style={{ padding: '0.5rem' }}>Fecha</th>
            <th style={{ padding: '0.5rem' }}>Hora</th>
            <th style={{ padding: '0.5rem' }}>Mes</th>
            <th style={{ padding: '0.5rem' }}>Nombre</th>
            <th style={{ padding: '0.5rem' }}>Año</th>
          </tr>
        </thead>
        <tbody>
          {registrosFiltrados.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ padding: '1rem', textAlign: 'center', color: '#5A5A5A' }}>
                No hay registros para {meses[mesActual]}.
              </td>
            </tr>
          ) : (
            registrosFiltrados.map((reg, i) => {
              const fecha = new Date(reg.fecha);
              return (
                <tr key={i} style={{ borderBottom: '1px solid #ccc' }}>
                  <td style={{ padding: '0.5rem' }}>{fecha.toLocaleDateString()}</td>
                  <td style={{ padding: '0.5rem' }}>{reg.hora}</td>
                  <td style={{ padding: '0.5rem' }}>{meses[fecha.getMonth()]}</td>
                  <td style={{ padding: '0.5rem' }}>{reg.nombre}</td>
                  <td style={{ padding: '0.5rem' }}>{fecha.getFullYear()}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <button onClick={solicitarPase}>Solicitar pase</button>
      </div>
    </Layout>
  );
}

export default RegistroEntrada;
