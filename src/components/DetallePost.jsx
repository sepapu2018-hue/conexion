import { Link, useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

function DetallePost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: post, loading, error } = useFetch(`/api/posts/${id}`);

  const eliminar = async () => {
    if (!window.confirm("¿Deseas eliminar este post?")) return;

    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    navigate("/");
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error</p>;
  if (!post) return <p>No encontrado</p>;

  return (
    <div className="detalle-container">
      <Link to="/" className="boton-volver">← Volver</Link>

      <div className="detalle-post">
        <h2>{post.title}</h2>

        <p style={{ fontWeight: "bold", fontSize: "18px", marginTop: "10px" }}>
          Autor: {post.author || "Desconocido"}
        </p>

        <div className="contenido">
          <p>{post.body}</p>
        </div>

        <div className="acciones">
          <Link to={`/editar/${id}`} className="btn-editar">Editar</Link>
          <button className="btn-eliminar" onClick={eliminar}>Eliminar</button>
        </div>
      </div>
    </div>
  );
}

export default DetallePost;
