import { useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

function ListaPosts() {
  const { data: posts, loading, error } = useFetch("/api/posts");
  const [busqueda, setBusqueda] = useState("");

  if (loading) return <p>Cargando posts...</p>;
  if (error) return <p>Error cargando posts</p>;

  const postsFiltrados = posts.filter(post =>
    post.title.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <main>
      {/* 🔍 FILTRO DE USUARIO / KEYWORDS */}
      <input
        type="text"
        placeholder="Filtrar por título o usuario..."
        className="form-input"
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
      />

      <div className="posts-grid">
        {postsFiltrados.map(post => (
          <div key={post.id} className="post-card">
            <Link className="post-link" to={`/post/${post.id}`}>
              <h3>{post.title}</h3>
            </Link>
            <p>{post.body.substring(0, 100)}...</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default ListaPosts;
