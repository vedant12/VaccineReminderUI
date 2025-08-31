import { useOktaAuth } from "@okta/okta-react";

export default function AuthButtons() {
  const { authState, oktaAuth } = useOktaAuth();

  if (!authState) return null;

  const login = async () => oktaAuth.signInWithRedirect();
  const logout = async () => oktaAuth.signOut();

  return authState.isAuthenticated ? (
    <button
      onClick={logout}
      className="ml-max px-4 py-2 bg-red-500 text-white rounded cursor-pointer hover:bg-blue-700"
    >
      Logout
    </button>
  ) : (
    <button
      onClick={login}
      className="ml-max px-4 py-2 bg-green-500 text-white rounded cursor-pointer hover:bg-blue-700"
    >
      Login
    </button>
  );
}
