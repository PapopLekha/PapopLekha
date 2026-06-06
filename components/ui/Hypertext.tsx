"use client";
import { useEffect } from "react";
import { useState } from "react";
import React from "react";
import { roboto_mono } from "../../lib/fonts";
type Prototype = {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
};

const Hypertext:React.FC<Prototype> = (props) => {
  const { text, delay, duration, className, style } = props;

  const [letters, setLetter] = useState<string>("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  const [currentText, setCurrentText] = useState<string>(text);
  const [originalText, setOriginalText] = useState<string>(text);

  function randomLetter() {
    return letters[Math.floor(Math.random() * letters.length)];
  }

  function changeLetter(to: string, iteration: number) {
    let result: string[] = [];
    to.split("").forEach((letter, index) => {
      if (index < iteration) {
        result.push(to[index]);
      } else {
        result.push(randomLetter());
      }
    });
    return result.join("");
  }

  function changeLetterRevert(to: string, iteration: number) {
    let result: string[] = [];
    to.split("").forEach((letter, index) => {
      if (index < to.length - iteration) {
        result.push(randomLetter());
      } else {
        result.push(to[index]);
      }
    });
    console.log(result.join(""));
    return result.join("");
  }

  function changeTo(to: string, revert: boolean = false) {
    let iteration = 0;
    const interval = setInterval(() => {
      setCurrentText(
        revert ? changeLetterRevert(to, iteration) : changeLetter(to, iteration)
      );
      if (iteration >= to.length) {
        clearInterval(interval);
      }
      iteration += 1;
    }, duration? Math.round(duration/originalText.length):30);
  }

  return (
    <div
      className={`${roboto_mono.className}${className ? ` ${className}` : ""}`}
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        margin: "0 1em 0 1em",
        ...style,
      }}
      onMouseEnter={() => changeTo(originalText)}
    >
      {currentText}
    </div>
  );
}

export default Hypertext;
