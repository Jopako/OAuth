import { useState } from "react";
import "./HomePage.css";

const PRODUCTS = [
  {
    id: 1,
    name: "Spider-Man No Way Home",
    series: "Marvel",
    price: 89.9,
    tag: "Exclusivo",
    emoji: "🕷️",
    color: "#ef4444",
    bg: "#fef2f2",
  },
  {
    id: 2,
    name: "Naruto Uzumaki",
    series: "Anime",
    price: 74.9,
    tag: "Mais Vendido",
    emoji: "🍥",
    color: "#f97316",
    bg: "#fff7ed",
  },
  {
    id: 3,
    name: "Gandalf the Grey",
    series: "Fantasy",
    price: 99.9,
    tag: "Raro",
    emoji: "🧙",
    color: "#8b5cf6",
    bg: "#f5f3ff",
  },
  {
    id: 4,
    name: "Link — Breath of Wild",
    series: "Games",
    price: 119.9,
    tag: "Edição Limitada",
    emoji: "⚔️",
    color: "#22c55e",
    bg: "#f0fdf4",
  },
  {
    id: 5,
    name: "Batman Dark Knight",
    series: "DC",
    price: 84.9,
    tag: null,
    emoji: "🦇",
    color: "#1d4ed8",
    bg: "#eff6ff",
  },
  {
    id: 6,
    name: "Luffy Gear 5",
    series: "Anime",
    price: 94.9,
    tag: "Novo",
    emoji: "👒",
    color: "#eab308",
    bg: "#fefce8",
  },
  {
    id: 7,
    name: "Darth Vader",
    series: "Star Wars",
    price: 109.9,
    tag: "Clássico",
    emoji: "⚙️",
    color: "#64748b",
    bg: "#f8fafc",
  },
  {
    id: 8,
    name: "Wonder Woman",
    series: "DC",
    price: 79.9,
    tag: null,
    emoji: "⚡",
    color: "#ec4899",
    bg: "#fdf2f8",
  },
];

const CATEGORIES = [
  "Todos",
  "Marvel",
  "DC",
  "Anime",
  "Fantasy",
  "Games",
  "Star Wars",
];

export default function HomePage({ user, onLogout }) {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchCat = activeCategory === "Todos" || p.series === activeCategory;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.series.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists)
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        );
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((i) => i.id !== id));

  const cartTotal = cart.reduce((acc, i) => acc + i.price * i.qty, 0);
  const cartCount = cart.reduce((acc, i) => acc + i.qty, 0);

  return (
    <div className="home-root">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-brand">
          <span className="nav-logo">⊡</span>
          <span className="nav-name">FunkoVault</span>
        </div>

        <div className="nav-search">
          <span className="search-icon">⌕</span>
          <input
            type="text"
            placeholder="Buscar figuras..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="nav-actions">
          <button className="cart-btn" onClick={() => setCartOpen(true)}>
            <span className="cart-icon">◻</span>
            <span className="cart-label">Carrinho</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          <div className="user-menu">
            <img
              src={user.picture}
              alt={user.name}
              className="user-avatar"
              referrerPolicy="no-referrer"
            />
            <div className="user-info">
              <span className="user-name">{user.name.split(" ")[0]}</span>
            </div>
            <button
              className="logout-btn"
              onClick={() => onLogout(user)}
              title="Sair"
            >
              ✕
            </button>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <div className="hero-tag">✦ Lançamentos 2026</div>
          <h1 className="hero-title">
            Colecione o que
            <br />
            <span className="hero-accent">você ama.</span>
          </h1>
          <p className="hero-sub">
            Olá, <strong>{user.name.split(" ")[0]}</strong>! Sua coleção está
            esperando. Mais de 12.000 figuras disponíveis com entrega para todo
            o Brasil.
          </p>
          <div className="hero-btns">
            <button
              className="btn-primary"
              onClick={() =>
                document
                  .getElementById("products")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Ver catálogo
            </button>
            <button className="btn-ghost">Minha coleção</button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-orb" />
          <div className="hero-funko-grid">
            {["🕷️", "🍥", "🧙", "⚔️", "🦇", "👒"].map((e, i) => (
              <div
                key={i}
                className="hero-funko-item"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span>{e}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <div className="categories" id="products">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`cat-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      <section className="products-section">
        <div className="products-header">
          <h2 className="section-title">
            {activeCategory === "Todos" ? "Todos os Funkos" : activeCategory}
            <span className="products-count"> ({filteredProducts.length})</span>
          </h2>
        </div>

        <div className="products-grid">
          {filteredProducts.map((p) => (
            <div key={p.id} className="product-card">
              {p.tag && (
                <span
                  className="product-tag"
                  style={{ background: p.color + "20", color: p.color }}
                >
                  {p.tag}
                </span>
              )}
              <div className="product-figure" style={{ background: p.bg }}>
                <span className="product-emoji">{p.emoji}</span>
                <div
                  className="product-shadow"
                  style={{ background: p.color + "30" }}
                />
              </div>
              <div className="product-info">
                <span className="product-series" style={{ color: p.color }}>
                  {p.series}
                </span>
                <h3 className="product-name">{p.name}</h3>
                <div className="product-footer">
                  <span className="product-price">
                    R$ {p.price.toFixed(2).replace(".", ",")}
                  </span>
                  <button
                    className="add-btn"
                    onClick={() => addToCart(p)}
                    style={{ background: p.color }}
                  >
                    + Adicionar
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <div className="empty-state">
              <span>🔍</span>
              <p>Nenhuma figura encontrada.</p>
            </div>
          )}
        </div>
      </section>

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="cart-overlay" onClick={() => setCartOpen(false)}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h2>Carrinho</h2>
              <button className="cart-close" onClick={() => setCartOpen(false)}>
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="cart-empty">
                <span>◻</span>
                <p>Seu carrinho está vazio.</p>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div
                        className="cart-item-fig"
                        style={{ background: item.bg }}
                      >
                        <span>{item.emoji}</span>
                      </div>
                      <div className="cart-item-info">
                        <p className="cart-item-name">{item.name}</p>
                        <p className="cart-item-series">{item.series}</p>
                        <p className="cart-item-price">
                          {item.qty}× R${" "}
                          {item.price.toFixed(2).replace(".", ",")}
                        </p>
                      </div>
                      <button
                        className="cart-item-remove"
                        onClick={() => removeFromCart(item.id)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-footer">
                  <div className="cart-total">
                    <span>Total</span>
                    <span className="cart-total-value">
                      R$ {cartTotal.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                  <button className="checkout-btn">Finalizar compra →</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
