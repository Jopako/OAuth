import { useState, useCallback, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import "./App.css";

const GOOGLE_CLIENT_ID =
  "428747486037-ds0fffhn14c8fp4bbngj053168ai8oc2.apps.googleusercontent.com";

const SESSION_KEY = "funko_session";
const SESSION_DURATION_MS = 60 * 60 * 1000; // 1 hora

const GSI_INIT_KEY = "__oauth_gsi_initialized__";
const GSI_ON_CREDENTIAL_KEY = "__oauth_gsi_on_credential__";


function saveSession(userData) {
  const session = {
    user: userData,
    expiresAt: Date.now() + SESSION_DURATION_MS,
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function loadSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;

    const session = JSON.parse(raw);
    const expired = Date.now() > session.expiresAt;

    if (expired) {
      clearSession();
      return null;
    }

    return session.user;
  } catch {
    clearSession();
    return null;
  }
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}


function setGsiOnCredential(fn) {
  window[GSI_ON_CREDENTIAL_KEY] = fn;
}

function ensureGsiInitialized() {
  const google = window.google;
  if (!google?.accounts?.id) return false;
  if (window[GSI_INIT_KEY]) return true;

  google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: (response) => window[GSI_ON_CREDENTIAL_KEY]?.(response),
  });
  window[GSI_INIT_KEY] = true;
  return true;
}


function App() {
  const [user, setUser] = useState(() => loadSession());
  const signInDivRef = useRef(null);

  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      const stillValid = loadSession();
      if (!stillValid) {
        setUser(null);
      }
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [user]);

  const handleCallbackResponse = useCallback((response) => {
    const userObject = jwtDecode(response.credential);
    const userData = {
      name: userObject.name,
      email: userObject.email,
      picture: userObject.picture,
      token: response.credential,
    };
    saveSession(userData);
    setUser(userData);
  }, []);

  const handleLogout = useCallback((userToLogout) => {
    const email = userToLogout?.email ?? user?.email;

    clearSession();

    if (window.google?.accounts?.id) {
      if (email) {
        window.google.accounts.id.revoke(email, () => {});
      }

      window.google.accounts.id.disableAutoSelect();
    }

    window[GSI_INIT_KEY] = false;

    setUser(null);
  }, [user]);

  useEffect(() => {
    if (user) return;

    setGsiOnCredential(handleCallbackResponse);

    const tryInit = () => {
      if (!ensureGsiInitialized()) return;

      const google = window.google;
      const container = signInDivRef.current;
      if (!container) return;

      container.innerHTML = "";
      google.accounts.id.renderButton(container, {
        theme: "outline",
        size: "large",
        width: 280,
      });
    };

    tryInit();
    const interval = setInterval(() => {
      if (window.google?.accounts?.id) {
        tryInit();
        clearInterval(interval);
      }
    }, 300);

    return () => {
      clearInterval(interval);
      setGsiOnCredential(null);
    };
  }, [user, handleCallbackResponse]);

  if (user) {
    return <HomePage user={user} onLogout={handleLogout} />;
  }

  return <LoginPage signInDivRef={signInDivRef} />;
}

export default App;
