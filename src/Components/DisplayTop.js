import React from "react";

export default function DisplayTop({
  index,
  type,
  rank,
  name,
  score,
  profileImg
}) {
  return (
    <span className={`top-item ${type}`} key={index}>
      <span className="rank">{rank}</span>
      <span className="profile">
        {profileImg && (
          <span className="image">
            <img src={profileImg}></img>
          </span>
        )}
        <span className="name">{name}</span>
      </span>
      <span className="score">
        <span>{score}</span>
        <img src="https://img.icons8.com/wired/24/ffffff/heart-balloon.png" />
      </span>
    </span>
  );
}
