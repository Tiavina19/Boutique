import React, { useState } from "react";
import "../styles/ArticleForm.css";

function ArticleForm({ onAdd, onClose, initialValues = {}, isEdit = false }) {
  const [title, setTitle] = useState(initialValues.title || "");
  const [price, setPrice] = useState(initialValues.price || "");
  const [category, setCategory] = useState(initialValues.category || "");
  const [image, setImage] = useState(initialValues.image || "");
  const [description, setDescription] = useState(
    initialValues.description || ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const newArticle = {
      id: initialValues.id || Date.now(),
      title,
      price: parseFloat(price),
      category,
      image,
      description,
    };
    onAdd(newArticle);
    setTitle("");
    setPrice("");
    setCategory("");
    setImage("");
    setDescription("");
    onClose();
  };

  return (
    <form className="article-form" onSubmit={handleSubmit}>
      <h2>{isEdit ? "Modifier l'article" : "Ajouter un article"}</h2>
      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Prix"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        min="0"
        step="0.01"
      />
      <input
        type="text"
        placeholder="Catégorie"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="URL de l'image"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <div className="article-form-buttons">
        <button type="submit">{isEdit ? "Modifier" : "Ajouter"}</button>
        <button type="button" onClick={onClose}>
          Annuler
        </button>
      </div>
    </form>
  );
}

export default ArticleForm;
