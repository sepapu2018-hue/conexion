import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

function ListaPosts() {
  const { data: posts, loading, error } = useFetch("/api/posts");

  const eliminar = async (id) => {
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    window.location.reload();
  };

  if (loading) return <p>Cargando posts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Lista de Posts</h2>

      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            
            {/* TITULO */}
            <Link to={`/post/${post.id}`} className="post-link">
              <h3>{post.title}</h3>
            </Link>

            {/* CONTENIDO (AQUÍ ESTABA TU PROBLEMA) */}
            <p>{post.body}</p>

            {/* AUTOR */}
            <p style={{ fontWeight: "bold" }}>Autor: {post.author}</p>

            {/* ÍCONO ELIMINAR */}
            <button
              onClick={() => eliminar(post.id)}
              className="btn-eliminar"
              style={{ width: "40px", fontSize: "1.2rem" }}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaPosts;
