import React, { ReactNode } from "react";
import { Button as MaBtn, ButtonStylesNames } from "@mantine/core";
import type { MantineRadius, MantineSize } from "@mantine/core";

export const Button = ({
  children,
  onClick,
  className,
  variant = "default",
  color,
  styles,
  size,
  radius,
}: {
  children: string | ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: string;
  color?: string;
  styles?: Partial<Record<ButtonStylesNames, React.CSSProperties>>;
  size?: MantineSize;
  radius?: MantineRadius | number;
}) => {
  return (
    <MaBtn
      onClick={onClick}
      className={className}
      variant={variant}
      color={color}
      styles={styles}
      size={size}
      radius={radius}
    >
      {children}
    </MaBtn>
  );
};
