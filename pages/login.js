import Layout from "@/components/Layout"
import Github from "next-auth/providers/github";
import { getProviders, signIn } from 'next-auth/react';

export default function Login() {
  return (
    <>
      <div className="flex flex-col justify-center">

        <form
          method="post"
          onSubmit={(e) => signIn("Credentials", {
            name: e.target.name.value,
            password: e.target.password.value
          }, { callbackUrl: '/' })}
          className="mt-4"
        >
          <div className="grid justify-items-center gap-x-2 mt-1 mb-10">
            <label type="name" className="block w-full">
              <span className="text-2xl self-auto text-black">Añadir una ciudad/pueblo</span>
            </label>
          </div>
          <div className="flex gap-x-2 mt-1">
            <label type="name" className="block w-full">
              <span className="text-sm self-auto text-black">username:</span>
              <input
                type="username"
                id="username"
                name="username"
                autoComplete="username"
                className="block w-full px-3 py-2 mt-1 text-black border rounded-md form-input focus:border-blue-600 bg-transparent"
                required
              />
            </label>
          </div>
          <div className="flex gap-x-2 mt-1">
            <label type="password" className="block w-full">
              <span className="text-sm self-auto text-black">password</span>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="password"
                className="block w-full px-3 py-2 mt-1 text-black border rounded-md form-input focus:border-blue-600 bg-transparent"
                required
              />
            </label>
          </div>


          <button
            type="submit"
            className="capitalize mt-4 w-full tracking-normal px-4 py-3 text-xs font-bold text-center text-black bg-gray-300 rounded-md hover:bg-blue-200"
          >
            Loguear
          </button>
        </form>
        <div>
          <button onClick={() => signIn("github", { callbackUrl: '/' })}>
            Sign in with github
          </button>
        </div>
      </div>
    </>
  );
}


Login.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}