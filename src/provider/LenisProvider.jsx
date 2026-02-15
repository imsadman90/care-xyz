"use client";
import useLenis from "@/lib/useLenis";

export default function LenisProvider({ children }) {
  useLenis();
  return children;
}
