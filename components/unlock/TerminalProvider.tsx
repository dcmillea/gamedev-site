"use client";

import * as React from "react";
import { UnlockTerminalDialog } from "@/components/unlock/UnlockTerminalDialog";

type TerminalCtx = {
  open: () => void;
};

const TerminalContext = React.createContext<TerminalCtx | null>(null);

export function useTerminal() {
  const ctx = React.useContext(TerminalContext);
  if (!ctx)
    throw new Error(
      "useTerminal must be used within <TerminalProvider> component, because I said so.",
    );
  return ctx;
}

export function TerminalProvider({
  children,
  codenameDefault = "",
}: {
  children: React.ReactNode;
  codenameDefault?: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <TerminalContext.Provider value={{ open: () => setIsOpen(true) }}>
      {children}

      {/* Have Model live here (at root level) */}
      <UnlockTerminalDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        codenameDefault={codenameDefault}
      />
    </TerminalContext.Provider>
  );
}
