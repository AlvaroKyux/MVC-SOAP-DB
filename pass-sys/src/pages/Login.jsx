import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useState } from 'react';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Por favor, llena todos los campos');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        alert('Inicio de sesión exitoso');
        navigate('/registro');
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <Layout>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        ¿No tienes una cuenta? <Link to="/signup">Regístrate</Link>
      </p>
    </Layout>
  );
}

export default Login;
