// src/components/Navbar.jsx
import { useEffect, useState } from "react";

const logo = "/logo-db.png";
const defaultAvatar = "/avatar-default.jpg"; // opcional, o déjalo sin usar

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  // detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      setIsScrolled(y > 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // leer sesión desde localStorage (token + user)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const token = localStorage.getItem("delirio:token");
      const rawUser = localStorage.getItem("delirio:user");
      if (token && rawUser) {
        const parsed = JSON.parse(rawUser);
        setUser(parsed); // { name, avatar, email, ... }
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  }, []);

  const logout = () => {
    try {
      localStorage.removeItem("delirio:token");
      localStorage.removeItem("delirio:user");
    } catch {}
    setUser(null);
    setOpenMenu(false);
    // opcional: recargar para limpiar estado global/rutas protegidas
    window.location.href = "/";
  };

  const getInitials = (name = "") => {
    const parts = name.trim().split(/\s+/).slice(0, 2);
    return parts.map(p => p[0]?.toUpperCase() || "").join("") || "DB";
  };

  const navBg = isScrolled ? "bg-black" : "bg-transparent";
  const linkColor = isScrolled ? "text-white" : "text-black";
  const brandColor = isScrolled ? "text-white" : "text-black";
  const baseLinkClasses =
    "text-xs md:text-sm font-medium tracking-[0.18em] uppercase transition-colors";
  const buttonClasses = isScrolled
    ? "bg-white text-black hover:bg-[#D4AF37] hover:text-black"
    : "bg-black text-white hover:bg-[#D4AF37] hover:text-black";

  return (
    <nav className={`sticky top-0 inset-x-0 z-50 ${navBg} text-white transition-colors duration-300`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="h-20 flex items-center justify-between">
          {/* IZQUIERDA: LOGO + MARCA */}
          <a href="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Delirio de Banquetes"
              className="h-10 w-10 rounded-full object-cover ring-1 ring-white/10"
            />
            <span className={`hidden sm:inline text-xs md:text-sm font-semibold tracking-[0.28em] uppercase ${brandColor}`}>
              Delirio de <span className="text-[#D4AF37]">Banquetes</span>
            </span>
          </a>

          {/* CENTRO: LINKS */}
          <div className="hidden md:flex items-center gap-10">
            <a href="/" className={`${baseLinkClasses} ${linkColor} hover:text-[#D4AF37]`}>Inicio</a>
            <a href="/#menu" className={`${baseLinkClasses} ${linkColor} hover:text-[#D4AF37]`}>Menú</a>
            <a href="/#about" className={`${baseLinkClasses} ${linkColor} hover:text-[#D4AF37]`}>Acerca de</a>
          </div>

          {/* DERECHA: LOGIN o AVATAR */}
          <div className="relative flex items-center">
            {!user ? (
              <a
                href="/login"
                className={`inline-flex items-center justify-center px-6 py-2.5 text-xs md:text-sm font-semibold tracking-[0.18em] uppercase rounded-none shadow-sm border border-[rgba(212,175,55,0.5)] transition-colors ${buttonClasses}`}
              >
                Iniciar sesión
              </a>
            ) : (
              <>
                <button
                  onClick={() => setOpenMenu(v => !v)}
                  className="flex items-center gap-3 focus:outline-none"
                  aria-label="Abrir menú de usuario"
                >
                  {/* Avatar (imagen o iniciales) */}
                  {user.avatar ? (
                    <img
                      src={user.avatar || defaultAvatar}
                      alt={user.name || "Usuario"}
                      className="h-10 w-10 rounded-full object-cover ring-1 ring-white/10 hover:ring-[#D4AF37] transition"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-white text-black grid place-items-center ring-1 ring-white/10 hover:ring-[#D4AF37] transition">
                      <span className="text-xs font-semibold">{getInitials(user.name)}</span>
                    </div>
                  )}
                </button>

                {/* Dropdown */}
                {openMenu && (
                  <div
                    className="absolute right-0 top-12 w-48 rounded-xl border border-white/10 bg-black/95 backdrop-blur shadow-xl overflow-hidden"
                    onMouseLeave={() => setOpenMenu(false)}
                  >
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-xs text-white/60">Sesión iniciada</p>
                      <p className="text-sm font-medium text-white truncate">{user.name || "Mi cuenta"}</p>
                    </div>
                    <a href="/perfil" className="block px-4 py-2.5 text-sm text-white hover:bg-white/5">Mi perfil</a>
                    <a href="/mis-eventos" className="block px-4 py-2.5 text-sm text-white hover:bg-white/5">Mis eventos</a>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2.5 text-sm text-[#D4AF37] hover:bg-white/5"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
