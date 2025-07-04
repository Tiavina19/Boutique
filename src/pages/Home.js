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
  const [editMode, setEditMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);
  const [notification, setNotification] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 8;

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

  if (loading)
    return (
      <div className="loader-container">
        <div className="pixar-loader">
          {"Yhanja".split("").map((letter, i) => (
            <span
              className="pixar-letter"
              style={{ animationDelay: `${i * 0.18}s` }}
              key={i}
            >
              {letter}
            </span>
          ))}
          <div className="pixar-shadow">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                className="pixar-shadow-ellipse"
                key={i}
                style={{ animationDelay: `${i * 0.18}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );

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
    showNotification("Article ajouté avec succès");
  };

  const handleEditArticle = (updatedArticle) => {
    setArticles(
      articles.map((a) => (a.id === updatedArticle.id ? updatedArticle : a))
    );
    setEditMode(false);
    setSelectedArticle(updatedArticle);
    showNotification("Article modifié");
  };
  const showNotification = (message, duration = 2500) => {
    setNotification(message);
    setTimeout(() => setNotification(null), duration);
  };
  const indexOfLast = currentPage * articlesPerPage;
  const indexOfFirst = indexOfLast - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirst, indexOfLast);
  return (
    <div className="home-container">
      {notification && <div className="notification-toast">{notification}</div>}
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
        <div className="search-input-wrapper">
          <span className="search-icon" aria-hidden="true">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" stroke="#da68a0" strokeWidth="2" />
              <path
                d="M20 20l-3.5-3.5"
                stroke="#da68a0"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Rechercher un article..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
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
        {currentArticles.length === 0 ? (
          <div className="no-articles">Aucun article trouvé.</div>
        ) : (
          currentArticles.map((article, idx) => (
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
        <div
          className="modal-overlay"
          onClick={() => {
            setSelectedArticle(null);
            setEditMode(false);
          }}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {editMode ? (
              <ArticleForm
                initialValues={selectedArticle}
                onAdd={handleEditArticle}
                onClose={() => setEditMode(false)}
                isEdit
              />
            ) : (
              <>
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
                <button
                  className="modal-edit"
                  onClick={() => setEditMode(true)}
                  style={{
                    background: "#77c593",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "10px 20px",
                    fontWeight: 700,
                    marginRight: "12px",
                    cursor: "pointer",
                  }}
                >
                  Modifier
                </button>
                <button
                  className="modal-delete"
                  onClick={() => {
                    setArticleToDelete(selectedArticle.id);
                    setShowDeleteConfirm(true);
                  }}
                  style={{
                    background: "#ed3572",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "10px 20px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Supprimer
                </button>
                <button
                  className="modal-close"
                  onClick={() => {
                    setSelectedArticle(null);
                    setEditMode(false);
                  }}
                >
                  Fermer
                </button>
              </>
            )}
          </div>
        </div>
      )}
      {showDeleteConfirm && (
        <div
          className="modal-overlay"
          onClick={() => setShowDeleteConfirm(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBottom: 24, color: "#ed3572" }}>
              Confirmer la suppression
            </h3>
            <p>Voulez-vous vraiment supprimer cet article ?</p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "16px",
                marginTop: 24,
              }}
            >
              <button
                style={{
                  background: "#ed3572",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 24px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
                onClick={() => {
                  setArticles(articles.filter((a) => a.id !== articleToDelete));
                  setShowDeleteConfirm(false);
                  setSelectedArticle(null);
                  setEditMode(false);
                  showNotification("Aritcle supprimé");
                }}
              >
                supprimer
              </button>
              <button
                style={{
                  background: "#e5e7eb",
                  color: "#222",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 24px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
                onClick={() => setShowDeleteConfirm(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Précédent
        </button>
        <span>
          Page {currentPage} /{" "}
          {Math.ceil(filteredArticles.length / articlesPerPage)}
        </span>
        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={indexOfLast >= filteredArticles.length}
        >
          Suivant
        </button>
      </div>
      <footer className="app-footer">
        <span>
          © {new Date().getFullYear()} Yhanj'Angel — All rights reserved.
        </span>
      </footer>
    </div>
  );
}

export default Home;
