import React, { useEffect, useState } from "react";
import ArticleForm from "../components/ArticleForm";
import { fetchArticles } from "../api/articles";
import ArticleCard from "../components/ArticleCard";
import "../styles/Home.css";

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Toutes");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchArticles()
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Chargement...</div>;

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory === "Toutes" || article.category === selectedCategory)
  );
  const categories = [
    "Toutes",
    ...Array.from(new Set(articles.map((a) => a.category))),
  ];
  const handleAddArticle = (newArticle) => {
    setArticles([newArticle, ...articles]);
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Liste des articles</h1>

      {/* Bouton pour ouvrir le formulaire d'ajout */}
      <button
        onClick={() => setShowForm(true)}
        style={{
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          padding: "10px 20px",
          marginBottom: "20px",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        + Ajouter un article
      </button>

      {/* Modale du formulaire d'ajout */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <ArticleForm
              onAdd={handleAddArticle}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      {/* Barre de recherche et filtre */}
      <div className="home-search">
        <input
          type="text"
          placeholder="Rechercher un article..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          style={{
            marginLeft: "16px",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #e5e7eb",
          }}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Liste des articles */}
      <div className="articles-list">
        {filteredArticles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onClick={() => setSelectedArticle(article)}
          />
        ))}
      </div>

      {/* Modale de détails d'article */}
      {selectedArticle && (
        <div className="modal-overlay" onClick={() => setSelectedArticle(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedArticle(null)}
            >
              Fermer
            </button>
            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              style={{ width: "120px", marginBottom: "16px" }}
            />
            <h2>{selectedArticle.title}</h2>
            <p style={{ color: "#2563eb", fontWeight: "bold" }}>
              {selectedArticle.price} €
            </p>
            <p style={{ color: "#6b7280", marginBottom: "8px" }}>
              {selectedArticle.category}
            </p>
            <p>{selectedArticle.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
