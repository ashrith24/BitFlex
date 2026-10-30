import { Link } from "react-router-dom";
import Brand from "../components/Brand.jsx";

/** Shared frontend-only login and sign-up preview. */
export default function Auth({ signup = false }) {
  function handleSubmit(event) {
    event.preventDefault();
    window.alert("Account service will be available soon.");
  }

  return (
    <main className="auth wrap">
      <div className="auth-card">
        <Brand />
        <h1>{signup ? "Create your account" : "Welcome back"}</h1>
        <p>
          {signup
            ? "Sign up to save your favorite tools."
            : "Log in to your FileConvert account."}
        </p>

        <form onSubmit={handleSubmit}>
          {signup && <input required name="name" placeholder="Your name" />}
          <input
            required
            type="email"
            name="email"
            placeholder="Email address"
          />
          <input
            required
            type="password"
            name="password"
            placeholder="Password"
          />
          <button className="button button-primary" type="submit">
            {signup ? "Sign Up" : "Login"}
          </button>
        </form>

        <small>
          Account access is a frontend preview.{" "}
          <Link to={signup ? "/login" : "/signup"}>
            {signup ? "Log in instead" : "Create an account"}
          </Link>
        </small>
      </div>
    </main>
  );
}
