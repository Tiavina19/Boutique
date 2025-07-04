import React from "react";
import "../styles/ArticleCard.css";

function ArticleCard({ article, onClick, style }) {
  return (
    <div className="article-card" onClick={onClick} style={style}>
      <img className="article-image" src={article.image} alt={article.title} />
      <h2 className="article-title">{article.title}</h2>
      <p className="article-price">{article.price} €</p>
      <p className="article-category">{article.category}</p>
    </div>
  );
}

export default ArticleCard;
