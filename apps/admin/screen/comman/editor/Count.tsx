import React from "react";

interface Editor {
  storage: {
    characterCount: {
      characters: () => number;
      words: () => number;
    };
  };
}

interface CountProps {
  editor: Editor;
  limit: number;
}

const Count: React.FC<CountProps> = ({ editor, limit }) => {
  const characterLimit = 100; // Define the limit variable
  const percentage =
    (editor.storage.characterCount.characters() / characterLimit) * 100;

  return (
    <div
      className={`character-count ${
        editor.storage.characterCount.characters() === characterLimit
          ? "character-count--warning"
          : ""
      }`}
    >
      <svg height="20" width="20" viewBox="0 0 20 20">
        <circle r="10" cx="10" cy="10" fill="#e9ecef" />
        <circle
          r="5"
          cx="10"
          cy="10"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="10"
          strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
          transform="rotate(-90) translate(-20)"
        />
        <circle r="6" cx="10" cy="10" fill="white" />
      </svg>
      {editor.storage.characterCount.characters()} / {characterLimit} characters
      <br />
      {editor.storage.characterCount.words()} words
    </div>
  );
};

export default Count;
