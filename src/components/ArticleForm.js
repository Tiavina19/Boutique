import React, { useState } from "react";

function ArticleForm({ onAdd, onClose }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newArticle = {
      id: Date.now(),
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
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: 12 }}
    >
      <h2>Ajouter un article</h2>
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
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button
          type="submit"
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "8px 16px",
          }}
        >
          Ajouter
        </button>
        <button
          type="button"
          onClick={onClose}
          style={{
            background: "#e5e7eb",
            color: "#222",
            border: "none",
            borderRadius: 6,
            padding: "8px 16px",
          }}
        >
          Annuler
        </button>
      </div>
    </form>
  );
}

export default ArticleForm;
