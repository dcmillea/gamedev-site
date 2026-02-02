import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function UnlockTerminalDialog({
  open,
  onOpenChange,
  codenameDefault = "nambesh",
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  codenameDefault?: string;
}) {
  const router = useRouter();
  const [codename, setCodeName] = React.useState(codenameDefault);
  const [password, setPassword] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "error">(
    "idle",
  );
  const [msg, setMsg] = React.useState("");

  React.useEffect(() => {
    if (open) {
      setCodeName(codenameDefault);
      setPassword("");
      setStatus("idle");
      setMsg("");
    }
  }, [open, codenameDefault]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMsg("");

    const res = await fetch("/api/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ codename, password }),
    });

    const data = await res.json().catch(() => ({}));

    if (!data?.ok) {
      setStatus("error");
      setMsg(data?.error || "Access denied.");
      return;
    }

    setStatus("idle");
    onOpenChange(false);
    router.push(data.redirect || "/youfigureditout");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-border bg-background">
        <DialogHeader>
          <DialogTitle className="text-foreground">Access Terminal</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <p className="mb-2 text-xs text-muted-foreground">Codename</p>
            <Input
              value={codename}
              onChange={(e) => setCodeName(e.target.value)}
            />
          </div>

          <div>
            <p className="mb-2 text-xs text-foreground">Passcode</p>

            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              type="password"
            />
          </div>

          {msg && (
            <div className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
              {msg}
            </div>
          )}

          <Button
            variant={"outline"}
            className="w-full text-blue hover:text-red transition duration-200"
            type="submit"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Verifying..." : "Unlock"}
          </Button>

          <p className="text-xs text-muted-foreground">
            Hint: decode the signal on the games page.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
