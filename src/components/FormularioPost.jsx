import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function FormularioPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editando = Boolean(id);

  const [post, setPost] = useState({ title: "", body: "" });

  useEffect(() => {
    if (editando) {
      fetch(`/api/posts/${id}`)
        .then(res => res.json())
        .then(data => setPost(data));
    }
  }, [editando, id]);

  const guardar = async e => {
    e.preventDefault();

    const method = editando ? "PUT" : "POST";
    const url = editando ? `/api/posts/${id}` : "/api/posts";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });

    navigate("/");
  };

  return (
    <div className="formulario-container">
      <h2>{editando ? "Editar Post" : "Crear Post"}</h2>

      <form className="formulario-post" onSubmit={guardar}>
        <div className="form-group">
          <label>Título</label>
          <input
            className="form-input"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Contenido</label>
          <textarea
            className="form-textarea"
            value={post.body}
            onChange={(e) => setPost({ ...post, body: e.target.value })}
          ></textarea>
        </div>

        <div className="form-actions">
          <button className="btn-primary" type="submit">Guardar</button>
          <button
            className="btn-secondary"
            type="button"
            onClick={() => navigate("/")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioPost;
