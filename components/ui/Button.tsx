import React from "react";
import styles from "./Carousel.module.scss";
type DotButtonPropType = {
  selected: boolean;
  onClick: () => void;
};
export const LineButton: React.FC<DotButtonPropType> = (props) => {
  const { selected, onClick } = props;
  return (
    <div className={styles.line__wrapper} onClick={onClick}>
      <div
        className={selected ? styles.line__selected : styles.line}
      />
    </div>
  );
}

export const DotButton: React.FC<DotButtonPropType> = (props) => {
  const { selected, onClick } = props;

  return (
    <button
      className={selected ? styles.dot_selected : styles.dot}
      type="button"
      onClick={onClick}
    />
  );
};

type PrevNextButtonPropType = {
  enabled: boolean;
  onClick: () => void;
};

export const PrevButton: React.FC<PrevNextButtonPropType> = (props) => {
  const { enabled, onClick } = props;

  return (
    <button
      className={`${styles.button} ${styles.buttonPrev}`}
      onClick={onClick}
      disabled={!enabled}
    >
      <svg className={styles.buttonSVG} viewBox="0 0 511.641 511.641">
        <path d="M148.32,255.76L386.08,18c4.053-4.267,3.947-10.987-0.213-15.04c-4.16-3.947-10.667-3.947-14.827,0L125.707,248.293    c-4.16,4.16-4.16,10.88,0,15.04L371.04,508.667c4.267,4.053,10.987,3.947,15.04-0.213c3.947-4.16,3.947-10.667,0-14.827    L148.32,255.76z" />
      </svg>
    </button>
  );
};

export const NextButton: React.FC<PrevNextButtonPropType> = (props) => {
  const { enabled, onClick } = props;

  return (
    <button
      className={`${styles.button} ${styles.buttonNext}`}
      onClick={onClick}
      disabled={!enabled}
    >
      <svg className={styles.buttonSVG} viewBox="0 0 511.949 511.949">
        <path d="M386.235,248.308L140.902,2.975c-4.267-4.053-10.987-3.947-15.04,0.213c-3.947,4.16-3.947,10.667,0,14.827l237.76,237.76    l-237.76,237.867c-4.267,4.053-4.373,10.88-0.213,15.04c4.053,4.267,10.88,4.373,15.04,0.213c0.107-0.107,0.213-0.213,0.213-0.213    l245.333-245.333C390.395,259.188,390.395,252.468,386.235,248.308z" />
      </svg>
    </button>
  );
};
