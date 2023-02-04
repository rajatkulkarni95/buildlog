import { useRouter } from "next/router";
import { useState } from "react";
import { API_ENDPOINTS } from "~/constants/API";
import fetcher from "~/helpers/fetcher";
import UpdateIcon from "~/svg/update.svg";

const TokenRegistration = () => {
  const [token, setToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    localStorage.setItem("token", token);
    try {
      await fetcher(API_ENDPOINTS.user);
      router.push("/dashboard");
    } catch (error) {
      setError("Invalid token");
      localStorage.removeItem("token");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex flex-col w-full p-4">
      <p className="text-sm font-normal text-zinc-500 dark:text-zinc-400">
        Getting Started
      </p>

      <form className="flex flex-col w-full mt-5" onSubmit={handleSubmit}>
        <label
          htmlFor="token"
          className="text-sm font-normal text-zinc-900 dark:text-zinc-50"
        >
          Vercel Personal Access Token
        </label>
        <input
          type="text"
          id="token"
          name="token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className={`w-full mt-1 px-3 py-2 border font-normal border-zinc-200 dark:border-zinc-700 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 focus-visible:border-transparent ${
            isSubmitting
              ? "opacity-40 cursor-not-allowed"
              : "opacity-100 cursor-auto"
          }`}
          placeholder="personal-access-token"
          disabled={isSubmitting}
        />
        <button
          type="submit"
          className={`w-full mt-2 py-2 px-3 border border-zinc-200 dark:border-zinc-700 rounded-md bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-medium text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 dark:focus-visible:ring-zinc-400 focus-visible:border-transparent ${
            isSubmitting
              ? "cursor-not-allowed"
              : "cursor-default hover:bg-blue-500 hover:text-zinc-50 hover:dark:bg-blue-600 hover:dark:text-zinc-50"
          }  duration-75`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <UpdateIcon className="animate-spin text-zinc-400 dark:text-zinc-500 mx-auto" />
          ) : (
            "Get Started"
          )}
        </button>
        {error && (
          <p className="text-sm font-normal text-red-500 mt-2">{error}</p>
        )}
      </form>
    </section>
  );
};

export default TokenRegistration;
