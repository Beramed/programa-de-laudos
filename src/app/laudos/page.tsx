import { redirect } from "next/navigation";

/** Compatibilidade: /laudos → hub de modalidades */
export default function LaudosRedirectPage() {
  redirect("/exames");
}
