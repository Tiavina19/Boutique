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
      <div className="background-decor">
        <svg
          className="decor-circle decor-circle-1"
          width="320"
          height="320"
          viewBox="0 0 320 320"
          fill="none"
        >
          <circle cx="160" cy="160" r="160" fill="#da68a0" fillOpacity="0.08" />
        </svg>
        <svg
          className="decor-circle decor-circle-2"
          width="220"
          height="220"
          viewBox="0 0 220 220"
          fill="none"
        >
          <circle cx="110" cy="110" r="110" fill="#77c593" fillOpacity="0.09" />
        </svg>
        <svg
          className="decor-circle decor-circle-3"
          width="180"
          height="180"
          viewBox="0 0 180 180"
          fill="none"
        >
          <circle cx="90" cy="90" r="90" fill="#ed3572" fillOpacity="0.07" />
        </svg>
      </div>
      <h1 className="home-title">
        <span className="yhanj">Yhanj</span>
        <span
          style={{
            color: "#ed3572",
            fontSize: "2.2rem",
            fontWeight: 700,
            margin: "0 8px",
          }}
        >
          '
        </span>
        <span className="angel">
          {"ANGEL".split("").map((letter, i) => (
            <span
              className="angel-letter"
              style={{ animationDelay: `${i * 0.13}s` }}
              key={i}
            >
              {letter}
            </span>
          ))}
        </span>
      </h1>

      {/* Bouton pour ouvrir le formulaire d'ajout */}
      <button onClick={() => setShowForm(true)} className="add-article-btn">
        <span className="plus-icon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="11" fill="#da68a0" opacity="0.12" />
            <path
              d="M11 6v10M6 11h10"
              stroke="#da68a0"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </span>
        Ajouter un article
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
        {filteredArticles.length === 0 ? (
          <div className="no-articles">Aucun article trouvé.</div>
        ) : (
          filteredArticles.map((article, idx) => (
            <ArticleCard
              key={article.id}
              article={article}
              onClick={() => setSelectedArticle(article)}
              style={{ animationDelay: `${idx * 80}ms` }}
            />
          ))
        )}
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
