import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import AllTools from "./pages/AllTools.jsx";
import Auth from "./pages/Auth.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import Home from "./pages/Home.jsx";
import SearchResults from "./pages/SearchResults.jsx";
import ToolDetail from "./pages/ToolDetail.jsx";

const themeStorageKey = "fileconvert-theme";

function readSavedTheme() {
  try {
    return window.localStorage.getItem(themeStorageKey) === "dark";
  } catch {
    // If storage is unavailable, the app still works with the light theme.
    return false;
  }
}

/** Main application shell. Routes share one header, footer, and theme state. */
export default function App() {
  const [dark, setDark] = useState(readSavedTheme);

  useEffect(() => {
    try {
      window.localStorage.setItem(themeStorageKey, dark ? "dark" : "light");
    } catch {
      // Theme switching continues to work for this session without storage.
    }
  }, [dark]);

  function toggleTheme() {
    setDark((currentTheme) => !currentTheme);
  }

  return (
    <div className={dark ? "app dark" : "app"}>
      <Header dark={dark} onThemeToggle={toggleTheme} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<AllTools />} />
        <Route
          path="/image-tools"
          element={<CategoryPage groupKey="image" />}
        />
        <Route path="/pdf-tools" element={<CategoryPage groupKey="pdf" />} />
        <Route
          path="/document-tools"
          element={<CategoryPage groupKey="document" />}
        />
        <Route
          path="/video-audio-tools"
          element={<CategoryPage groupKey="media" />}
        />
        <Route
          path="/other-tools"
          element={<CategoryPage groupKey="other" />}
        />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/tool/:slug" element={<ToolDetail />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth signup />} />
        <Route path="*" element={<AllTools />} />
      </Routes>

      <Footer />
    </div>
  );
}
