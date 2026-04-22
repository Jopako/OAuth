import { useCallback, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import "./App.css";

const GOOGLE_CLIENT_ID =
  "428747486037-ds0fffhn14c8fp4bbngj053168ai8oc2.apps.googleusercontent.com";

const GSI_INIT_KEY = "__oauth_gsi_initialized__";
const GSI_ON_CREDENTIAL_KEY = "__oauth_gsi_on_credential__";

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
  const signInDivRef = useRef(null);

  const handleCallbackResponse = useCallback((response) => {
    console.log("Encoded JWT ID Token" + response.credential);
    const userObject = jwtDecode(response.credential);
    console.log(userObject);
  }, []);

  useEffect(() => {
    setGsiOnCredential(handleCallbackResponse);

    if (!ensureGsiInitialized()) {
      console.warn(
        "Google Identity Services not loaded yet. Check the GSI script tag in index.html.",
      );
      return;
    }

    const google = window.google;
    const container = signInDivRef.current;
    if (!container) return;

    container.innerHTML = "";
    google.accounts.id.renderButton(container, {
      theme: "outline",
      size: "large",
    });

    return () => {
      setGsiOnCredential(null);
    };
  }, [handleCallbackResponse]);

  return <div id="signInDiv" ref={signInDivRef}></div>;
}

export default App;
