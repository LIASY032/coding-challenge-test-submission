import React, { FunctionComponent } from "react";

import styles from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: FunctionComponent<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  return (
    <div className={styles.error} role="alert">
      {/* zh: 错误消息；en: error message */}
      {message}
    </div>
  );
};

export default ErrorMessage;


