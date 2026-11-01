import { useState, useEffect } from 'react'
import './App.css'
import { misProductos } from './datosLocales'

function App() {
  const [reflexion, setReflexion] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Estados para el formulario de contacto del Punto C
  const [nombreContacto, setNombreContacto] = useState('');
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    // API pública con frases y reflexiones en español
    fetch('https://api.quotable.io/random?tags=inspirational|wisdom')
      .then(res => res.json())
      .then(data => {
        setReflexion({
          frase: data.content,
          autor: data.author
        });
        setCargando(false);
      })
      .catch(error => {
        // Por si falla la red, ponemos una frase predeterminada en español
        setReflexion({
          frase: "El único modo de hacer un gran trabajo es amar lo que hacés.",
          autor: "Reflexión del día"
        });
        setCargando(false);
      });
  }, []);

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombreContacto.trim() !== '') {
      setEnviado(true);
    }
  };

  if (cargando) {
    return <div style={{ padding: '20px', textAlign: 'center' }}><h2>Cargando espacio de reflexión...</h2></div>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '0 auto', color: '#333' }}>
      
      {/* ENCABEZADO PERSONALIZADO */}
      <header style={{ textAlign: 'center', marginBottom: '40px', paddingBottom: '20px', borderBottom: '2px solid #eaeaea' }}>
        <h1 style={{ color: '#2c3e50', fontSize: '2.2rem', marginBottom: '10px' }}>Espacio de Reflexión y Comunidad</h1>
        <p style={{ color: '#7f8c8d', fontSize: '1.1rem', margin: '0' }}>Conduce: Micaela Arancibia</p>
      </header>

      {/* PUNTO A: API PUBLICA DE REFLEXIÓN EN ESPAÑOL */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#34495e', borderLeft: '4px solid #3498db', paddingLeft: '10px' }}>Reflexión del Día</h2>
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', background: '#fafafa', marginTop: '15px' }}>
          <p style={{ fontSize: '1.15rem', fontStyle: 'italic', color: '#2c3e50', margin: '0 0 10px 0' }}>
            "{reflexion ? reflexion.frase : 'Cargando mensaje...'}"
          </p>
          <span style={{ fontSize: '0.9rem', color: '#7f8c8d', fontWeight: 'bold' }}>— {reflexion ? reflexion.autor : 'Comunidad'}</span>
        </div>
      </section>

      <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '30px 0' }} />

      {/* PUNTO B: ARRAY LOCAL */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#34495e', borderLeft: '4px solid #3498db', paddingLeft: '10px', marginBottom: '20px' }}>Secciones del Programa</h2>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {misProductos.map((item) => (
            <div key={item.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', width: '250px', background: '#fafafa' }}>
              <img src={item.imagen} alt={item.nombre} style={{ width: '100%', borderRadius: '5px', height: '140px', objectFit: 'cover' }} />
              <h3 style={{ fontSize: '1.1rem', margin: '10px 0 5px 0' }}>{item.nombre}</h3>
              <p style={{ fontSize: '0.9rem', color: '#666', margin: '0' }}>{item.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '30px 0' }} />

      {/* PUNTO C: FORMULARIO Y MAPA */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#34495e', borderLeft: '4px solid #3498db', paddingLeft: '10px', marginBottom: '20px' }}>Contacto y Comunidad</h2>
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          
          {/* Formulario */}
          <div style={{ flex: '1', minWidth: '280px', border: '1px solid #ddd', padding: '20px', borderRadius: '8px', background: '#fafafa' }}>
            <h3 style={{ marginTop: '0' }}>Dejanos tu mensaje</h3>
            {enviado ? (
              <p style={{ color: '#27ae60', fontWeight: 'bold' }}>¡Muchas gracias {nombreContacto}, tu mensaje fue recibido con éxito para el programa!</p>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                  Nombre:
                  <input 
                    type="text" 
                    value={nombreContacto} 
                    onChange={(e) => setNombreContacto(e.target.value)} 
                    placeholder="Tu nombre o seudónimo..."
                    required
                    style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
                  />
                </label>
                <label style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                  Mensaje o Reflexión:
                  <textarea 
                    rows="3" 
                    placeholder="Escribí tu mensaje..."
                    required
                    style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
                  ></textarea>
                </label>
                <button type="submit" style={{ padding: '10px', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Enviar Mensaje
                </button>
              </form>
            )}
          </div>

          {/* Mapa Embebido */}
          <div style={{ flex: '1', minWidth: '280px', border: '1px solid #ddd', padding: '20px', borderRadius: '8px', background: '#fafafa' }}>
            <h3 style={{ marginTop: '0' }}>Estudio / Ubicación</h3>
            <div style={{ width: '100%', height: '200px', marginTop: '5px' }}>
              <iframe 
                title="Mapa Salta"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58257.653495475395!2d-65.44197711484373!3d-24.789178699999996!2m3!1f0!2f150!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x941bc32d7f46337f%3A0x443bd7b3c2e680a6!2sSalta!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar" 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '5px' }} 
                allowFullScreen="" 
                loading="lazy">
              </iframe>
            </div>
          </div>

        </div>
      </section>

    </div>
  )
}

export default App