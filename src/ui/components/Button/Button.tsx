import { ButtonType, ButtonVariant } from "@/types";
import React, { FunctionComponent } from "react";

import $ from "./Button.module.css";

interface ButtonProps {
  onClick?: () => void;
  type?: ButtonType;
  variant?: ButtonVariant;
  loading?: boolean;
  children: React.ReactNode;
}

const Button: FunctionComponent<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  loading = false,
}) => {
  return (
    <button
      /* zh: 按变体设置样式类；en: apply classes based on variant */
      className={[$.button, variant === 'primary' ? $.primary : $.secondary, loading ? $.loading : ''].filter(Boolean).join(' ')}
      type={type}
      onClick={onClick}
    >
      {children}
      {/* zh: 加载时显示微型转圈；en: show mini spinner when loading */}
      {loading && <span data-testid="loading-spinner" className={$.spinner} />}
    </button>
  );
};

export default Button;
