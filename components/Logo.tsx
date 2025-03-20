"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Logo = () => {
  const { data: session } = useSession();
  const isAuthenticated = !!session;
  return <Link href={`${isAuthenticated ? "/home" : "/"}`}>Logo</Link>;
};

export default Logo;
