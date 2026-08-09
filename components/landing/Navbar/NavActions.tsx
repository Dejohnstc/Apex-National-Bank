import Link from "next/link";
import { Button } from "@/components/ui/button";

export function NavActions() {
  return (
    <div className="hidden items-center gap-3 lg:flex">
      <Link href="/login">
  <Button variant="ghost">Sign In</Button>
</Link>

      <Link href="/register">
  <Button>Open Account</Button>
</Link>
    </div>
  );
}