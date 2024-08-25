import React from "react";
import { Link } from "react-router-dom"; //library that enables navigation between different pages in a React application. The Link component is used to create links that navigate to different routes.
import "./CatCard.scss";

function CatCard({ card }) {
  return (
    <Link to="/gigs?cat=design">
      <div className="catCard">
        <img src={card.img} alt="" />
        <span className="desc">{card.desc}</span>
        <span className="title">{card.title}</span>
      </div>
    </Link>
  );
}
export default CatCard;
