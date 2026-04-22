import "./LoginPage.css";

export default function LoginPage({ signInDivRef }) {
  return (
    <div className="login-root">
      <div className="login-bg">
        <div className="login-blob b1" />
        <div className="login-blob b2" />
        <div className="login-blob b3" />
        <div className="login-dots" />
      </div>

      <div className="login-left">
        <div className="login-brand">
          <span className="brand-icon">⊡</span>
          <span className="brand-name">FunkoVault</span>
        </div>

        <div className="login-hero">
          <h1 className="login-headline">
            Sua coleção,
            <br />
            <span className="headline-accent">organizada.</span>
          </h1>
          <p className="login-desc">
            Descubra, gerencie e compre os melhores Funko Pops do mercado. Mais
            de 12.000 figuras disponíveis.
          </p>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <div className="login-card-logo">
            <span>⊡</span>
          </div>
          <h2 className="login-card-title">Entrar no FunkoVault</h2>
          <p className="login-card-sub">
            Use sua conta Google para acessar sua coleção
          </p>

          <div className="login-btn-wrapper">
            <div ref={signInDivRef} id="signInDiv" />
          </div>

          <div className="login-card-footer">
            <p className="footer-terms">
              Ao entrar, você concorda com nossos <a href="#">Termos de Uso</a>{" "}
              e <a href="#">Política de Privacidade</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
