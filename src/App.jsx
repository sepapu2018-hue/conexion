import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import ListaPosts from './components/ListaPosts'
import DetallePost from './components/DetallePost'
import FormularioPost from './components/FormularioPost'

function App() {
  return (
    <div className="container">
      <header>
        <h1>App de Posts</h1>
        <p>Aplicación para visualizar posts y sus detalles</p>

        <p><strong>Autor:</strong> José Narváez</p>
        <p><strong>Curso:</strong> 2</p>
      </header>

      {/* Aquí irá el contenido de la aplicación */}

      <nav>
        <Link to="/crear">Crear Nuevo Post</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ListaPosts />} />
        <Route path="/post/:id" element={<DetallePost />} />
        <Route path="/crear" element={<FormularioPost />} />
        <Route path="/editar/:id" element={<FormularioPost />} />
      </Routes>
    </div>
  )
}

export default App
