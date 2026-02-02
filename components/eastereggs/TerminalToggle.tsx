"use client";

import { Button } from "@/components/ui/button";
import { Terminal } from "lucide-react";
import { useTerminal } from "@/components/unlock/TerminalProvider";

export function TerminalToggle() {
  const terminal = useTerminal();

  return (
    <Button
      className="text-blue hover:text-red"
      size="icon-lg"
      variant={"ghost"}
      onClick={terminal.open}
      aria-label="Toggle Terminal"
    >
      <Terminal className="h-4 w-4" />
    </Button>
  );
}
