export default function Footer() {
  return (
    <footer className="bg-ebony bg-black text-white border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 justify-between">
          {/* Columna 1: Brand */}
          <div>
            <h3 className="text-xl font-semibold">
              <span className="text-gold">Delirio</span> de Banquetes
            </h3>
            <p className="mt-3 text-sm text-white/70 max-w-xs">
              Elegancia, sabor y servicio para que cada evento se sienta
              como un verdadero delirio.
            </p>
          </div>

          {/* Columna 2: Links */}
          <div className="text-sm">
            <p className="font-semibold mb-3 text-white/90">Explora</p>
            <ul className="space-y-2 text-white/70">
              <li><a href="/" className="hover:text-gold transition">Inicio</a></li>
              <li><a href="/menu" className="hover:text-gold transition">Menú</a></li>
              <li><a href="/paquetes" className="hover:text-gold transition">Paquetes</a></li>
              <li><a href="/contacto" className="hover:text-gold transition">Contacto</a></li>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div className="text-sm">
            <p className="font-semibold mb-3 text-white/90">Contacto</p>
            <p className="text-white/70">Tel. (999) 540 6380</p>
            <p className="text-white/70">eventos@deliriobanquetes.com</p>
            <p className="mt-2 text-white/60 text-xs">
              Atendemos bodas, XV años y eventos empresariales en la región.
            </p>
          </div>
        </div>

        {/* Línea final */}
        <div className="mt-8 pt-6 border-t border-white/10 text-xs text-white/50 flex flex-col sm:flex-row justify-between gap-2">
          <p>© {new Date().getFullYear()} Delirio de Banquetes. Todos los derechos reservados.</p>
          <p>Hecho con cuidado para tus eventos.</p>
        </div>
      </div>
    </footer>
  );
}
