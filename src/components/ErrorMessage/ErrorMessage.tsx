import css from "./ErrorMessage.module.css";
import type { ErrorMessageProps } from "../../types/note";

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return <div className={css.error}>{message}</div>;
}
