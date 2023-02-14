import styles from "./card.module.scss";

function Card({ children, className }) {
  return (
    <div className={`card rounded shadow-sm ${className}`}>{children}</div>
  );
}

export default Card;
