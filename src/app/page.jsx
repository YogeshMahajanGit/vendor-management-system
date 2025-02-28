import { auth, signIn, signOut } from "./auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  const user = session?.user;
  return user ? redirect("/dashboard") : redirect("/login");
}
