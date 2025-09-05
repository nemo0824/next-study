import React, { ReactNode } from "react";
import { Button as MaBtn } from "@mantine/core";

export const Button = ({
  children,
  onClick,
  className,
  variant = "default",
}: {
  children: string | ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: string;
}) => {
  return (
    <MaBtn onClick={onClick} className={className} variant={variant}>
      {children}
    </MaBtn>
  );
};
