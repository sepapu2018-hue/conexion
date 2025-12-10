import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

function DetallePost() {
  const { id: postId } = useParams();
  const navigate = useNavigate();

  const { data: post, loading, error } = useFetch(`/api/posts/${postId}`);
  const { data: usuario } = useFetch(
    post ? `/api/users/${post.userId}` : null
  );

  const [eliminando, setEliminando] = useState(false);

  if (loading) {
    return (
      <div className="cargando">
        <div className="spinner"></div>
        <p>Cargando detalles...</p>
      </div>
    );
  }

  if (error || !post) {
    return <div className="error">Error al cargar el post</div>;
  }

  const handleEliminar = async () => {
    if (!window.confirm("¿Seguro de eliminar este post?")) return;

    try {
      setEliminando(true);
      const respuesta = await fetch(`/api/posts/${postId}`, { method: "DELETE" });

      if (!respuesta.ok) throw new Error("No se pudo eliminar");

      navigate("/");
    } catch (e) {
      alert("Error al eliminar: " + e.message);
    } finally {
      setEliminando(false);
    }
  };

  return (
    <div className="detalle-container">
      <Link to="/" className="boton-volver">← Volver</Link>

      <div className="detalle-post">
        <h2>{post.title}</h2>

        {usuario && (
          <div className="autor" style={{ color: '#000000' }}>
            <p><strong>Autor:</strong> {usuario.name}</p>

          </div>
        )}

        <div className="contenido">
          <p>{post.body}</p>
        </div>

        <div className="acciones">
          <Link to={`/editar/${postId}`} className="btn-editar">Editar</Link>
          <button
            className="btn-eliminar"
            onClick={handleEliminar}
            disabled={eliminando}
          >
            {eliminando ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetallePost;