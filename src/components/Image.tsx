"use client";

import React from "react";

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
};

export default function Image({ fill, className, style, ...rest }: ImageProps) {
  const fillStyle: React.CSSProperties = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%" }
    : {};

  const combinedStyle = { ...fillStyle, ...((style as React.CSSProperties) || {}) };

  return <img className={className} style={combinedStyle} {...(rest as any)} />;
}
