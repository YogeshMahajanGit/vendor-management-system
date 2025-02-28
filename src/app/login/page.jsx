import { auth, signIn } from "../auth";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await auth();
  const user = session?.user;

  return user ? (
    redirect("/dashboard")
  ) : (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <div className="min-h-screen flex items-center justify-center ">
        <button
          className="py-2 px-4 rounded-xl border-2 border-gray-500 text-black text-xl shadow-lg cursor-pointer"
          type="submit"
        >
          Signin with Google
        </button>
      </div>
    </form>
  );
}
