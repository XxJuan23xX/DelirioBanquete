// src/components/Navbar.jsx
import { useEffect, useState } from "react";

const logo = "/logo-db.png";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      setIsScrolled(y > 0);
    };

    handleScroll(); // estado inicial
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navBg = isScrolled ? "bg-black" : "bg-transparent";
  const linkColor = isScrolled ? "text-white" : "text-black";
  const brandColor = isScrolled ? "text-white" : "text-black";

  const baseLinkClasses =
    "text-xs md:text-sm font-medium tracking-[0.18em] uppercase transition-colors";

      const buttonClasses = isScrolled
    ? "bg-white text-black hover:bg-[#D4AF37] hover:text-black"
    : "bg-black text-white hover:bg-[#D4AF37] hover:text-black";

  return (
    <nav
      className={`sticky top-0 inset-x-0 z-50 ${navBg} text-white transition-colors duration-300`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="h-20 flex items-center justify-between">
          {/* IZQUIERDA: LOGO + MARCA */}
          <a href="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Delirio de Banquetes"
              className="h-10 w-10 rounded-full object-cover ring-1 ring-white/10"
            />
            <span
              className={`hidden sm:inline text-xs md:text-sm font-semibold tracking-[0.28em] uppercase ${brandColor}`}
            >
              Delirio de{" "}
              <span className="text-[#D4AF37]">Banquetes</span>
            </span>
          </a>

          {/* CENTRO: LINKS */}
          <div className="hidden md:flex items-center gap-10">
            <a
              href="/"
              className={`${baseLinkClasses} ${linkColor} hover:text-[#D4AF37]`}
            >
              Inicio
            </a>
            <a
              href="/#menu"
              className={`${baseLinkClasses} ${linkColor} hover:text-[#D4AF37]`}
            >
              Menú
            </a>
            <a
              href="/#about"
              className={`${baseLinkClasses} ${linkColor} hover:text-[#D4AF37]`}
            >
              Acerca de
            </a>
          </div>

          {/* DERECHA: CTA LOGIN (botón blanco grande) */}
          <div className="flex items-center">
            <a
              href="/login"
              className={`inline-flex items-center justify-center px-6 py-2.5 text-xs md:text-sm font-semibold tracking-[0.18em] uppercase rounded-none shadow-sm border border-[rgba(212,175,55,0.5)] transition-colors ${buttonClasses}`}
            >
              Iniciar sesión
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
