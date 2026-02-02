"use client";

import dynamic from "next/dynamic";

const PuzzleClient = dynamic(
  () => import("./puzzle-client").then((m) => m.PuzzleClient),
  { ssr: false },
);

export default function PuzzleShell() {
  return <PuzzleClient />;
}
