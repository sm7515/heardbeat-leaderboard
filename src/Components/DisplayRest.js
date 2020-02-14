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
    <span className={`rest-item ${type}`} key={index}>
      <span className="rank">{rank}</span>
      <span className="profile">
        {profileImg && (
          <span className="image">
            <img alt="group profile" src={profileImg}></img>
          </span>
        )}
        <span className="name">{name}</span>
      </span>
      <span className="score">
        <span>{score}</span>
        <img
          alt="bullon"
          src="https://img.icons8.com/wired/24/A9A9A9/heart-balloon.png"
        />
      </span>
    </span>
  );
}
