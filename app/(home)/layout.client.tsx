"use client";
import Image from "next/image";

import Logo from "../icon.png";

export function TsukaryuIcon() {
  return <Image alt="tsuka-ryu" src={Logo} width={20} height={20} aria-label="tsuka-ryu" />;
}
