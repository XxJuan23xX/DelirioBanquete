import { useEffect, useRef, useState } from "react";

// RUTAS DESDE /public
const boda = "/boda.jpg";
const XV = "/XV.jpeg";
const catering = "/catering.jpg";
const inspiracion = "/home2.png"; 
const ctaImage = "/action.png"; // cámbiale el nombre al tuyo

const slides = [
  { src: boda, alt: "Montaje elegante de boda" },
  { src: XV, alt: "Mesa de XV años con flores" },
  { src: catering, alt: "Evento empresarial con catering" },
];

const eventTypes = [
  {
    title: "Bodas elegantes",
    img: "/boda2.jpeg",
    desc:
      "Ceremonias y recepciones con montajes románticos, iluminación cálida y detalles personalizados.",
  },
  {
    title: "XV Años inolvidables",
    img: "/XV2.jpg",
    desc:
      "Fiestas de XV con pista de baile, mesa principal y decoración que refleja la personalidad de la quinceañera.",
  },
  {
    title: "Eventos empresariales",
    img: "/catering2.webp",
    desc:
      "Coffee breaks, cocteles y cenas ejecutivas con presentación impecable para tus clientes y colaboradores.",
  },
  {
    title: "Eventos sociales",
    img: "/eventos-sociales2.jpg",
    desc:
      "Bautizos, aniversarios y reuniones familiares con menús versátiles y montajes acogedores.",
  },
];

const processSteps = [
  {
    title: "Cotiza",
    desc: "Cuéntanos el tipo de evento, número de invitados y ubicación para recibir una propuesta a tu medida.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
        <line x1="8" y1="9" x2="16" y2="9" />
        <line x1="8" y1="13" x2="14" y2="13" />
        <line x1="8" y1="17" x2="12" y2="17" />
      </svg>
    ),
  },
  {
    title: "Planea",
    desc: "Definimos contigo el menú, el estilo de montaje, horarios y todos los detalles logísticos.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <circle cx="8.5" cy="15.5" r="1.2" />
        <circle cx="12" cy="15.5" r="1.2" />
        <circle cx="15.5" cy="15.5" r="1.2" />
      </svg>
    ),
  },
  {
    title: "Decora",
    desc: "Nos encargamos del montaje, la decoración, la iluminación y los toques finales del espacio.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3l2.5 5.1 5.6.8-4.1 4 1 5.8L12 16.8 6.9 18.7l1-5.8-4.1-4 5.6-.8L12 3z" />
      </svg>
    ),
  },
  {
    title: "Disfruta",
    desc: "El día del evento, tú solo brindas y disfrutas. Nuestro equipo coordina todo detrás de escena.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 3l2 9c.3 1.3-.5 2.7-1.8 3.1L5 16" />
        <path d="M17 3l-2 9c-.3 1.3.5 2.7 1.8 3.1L19 16" />
        <path d="M5 21h4" />
        <path d="M15 21h4" />
      </svg>
    ),
  },
];


function ImageCarousel({ interval = 2000 }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setCurrent((prev) => (prev + 1) % slides.length),
      interval
    );
    return () => clearInterval(id);
  }, [interval]);

  return (
    <div className="relative w-full h-64 overflow-hidden">
      {slides.map((slide, index) => (
        <img
          key={slide.alt}
          src={slide.src}
          alt={slide.alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [showText, setShowText] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);
  const [showInspireImage, setShowInspireImage] = useState(false);
  const [showInspireText, setShowInspireText] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showProcess, setShowProcess] = useState(false);
  const [showCta, setShowCta] = useState(false);
   const inspireSectionRef = useRef(null);
   const eventsSectionRef = useRef(null);
   const processSectionRef = useRef(null);
   const ctaSectionRef = useRef(null);


  useEffect(() => {
    const t1 = setTimeout(() => setShowText(true), 200);
    const t2 = setTimeout(() => setShowCarousel(true), 800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

    useEffect(() => {
    const sectionEl = inspireSectionRef.current;
    if (!sectionEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowInspireImage(true);
          setTimeout(() => setShowInspireText(true), 300); // aparece un poco después
          observer.unobserve(entry.target); // solo una vez
        }
      },
      { threshold: 0.3 } // se activa cuando ~30% de la sección es visible
    );

    observer.observe(sectionEl);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
  const sectionEl = eventsSectionRef.current;
  if (!sectionEl) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setShowEvents(true);
        observer.unobserve(entry.target); // solo una vez
      }
    },
    { threshold: 0.3 }
  );

  observer.observe(sectionEl);
  return () => observer.disconnect();
}, []);

useEffect(() => {
  const sectionEl = processSectionRef.current;
  if (!sectionEl) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setShowProcess(true);
        observer.unobserve(entry.target); // solo una vez
      }
    },
    { threshold: 0.3 }
  );

  observer.observe(sectionEl);

  return () => observer.disconnect();
}, []);

useEffect(() => {
  const sectionEl = ctaSectionRef.current;
  if (!sectionEl) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setShowCta(true);
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.3 }
  );

  observer.observe(sectionEl);

  return () => observer.disconnect();
}, []);

  return (
    <div className="min-h-screen bg-ebony text-black">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 flex flex-col lg:flex-row gap-12 lg:items-center">
        {/* IZQUIERDA: TEXTO */}
        <div
          className={`flex-1 transition-all duration-700 ease-out ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.3em] text-gold/80 mb-4">
            Banquetes y eventos
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
            Todo lo que necesitas para un{" "}
            <span className="text-gold">evento inolvidable</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-black/80 max-w-xl">
            Delirio de Banquetes te acompaña en bodas, XV años y eventos
            empresariales con montajes elegantes, servicio profesional y un
            menú que tus invitados jamás olvidarán.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-black text-ebony text-white font-semibold text-sm tracking-wide hover:bg-[#D4AF37] transition">
              Ver paquetes
            </button>
            <button className="px-6 py-3 bg-[#e9c03a] border-white/20 text-sm tracking-wide hover:bg-[#b79731] transition">
              Explorar menú
            </button>
          </div>
        </div>

        {/* DERECHA: TARJETA + CARRUSEL */}
        <div
          className={`flex-1 max-w-xl lg:max-w-md xl:max-w-lg transition-all duration-700 ease-out ${
            showCarousel
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <div className="bg-black  overflow-hidden border border-black/5">
            {/* Header */}
            <div className="px-8 pt-8">
              <p className="text-[11px] uppercase tracking-[0.25em] text-white">
                Delirio de Banquetes
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-ebony text-white">
                Montajes que enamoran
              </h2>
              <p className="mt-2 text-sm text-white">
                Centros de mesa, iluminación, cristalería y decoración
                coordinados para darle a tu evento un ambiente elegante y
                sofisticado.
              </p>
            </div>

            {/* Carrusel custom */}
            <div className="mt-6">
              <ImageCarousel interval={2000} />
            </div>

            {/* Footer */}
            <div className="px-8 py-6 border-t border-black/5 flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-white">
                  Evento destacado
                </p>
                <p className="mt-1 font-medium text-ebony">
                  Boda Jardín Premium
                </p>
                <p className="text-xs text-white">
                  150 invitados · Menú 3 tiempos
                </p>
              </div>
              <button className=" bg-ebony px-4 py-2 text-xs font-semibold bg-white text-black hover:bg-gray-400 transition">
                Cotizar
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* SECCIÓN: Déjate inspirar por nuestros eventos */}
<section
  ref={inspireSectionRef}
  className="bg-white py-20"
>
  <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
    {/* Columna de imagen: UNA sola tarjeta */}
    <div
      className={`w-full lg:w-1/2 flex justify-center transition-all duration-700 ease-out
      ${showInspireImage ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <div className="relative w-full max-w-md h-72 sm:h-80 lg:h-96 overflow-hidden bg-white ">
        <img
          src={inspiracion}
          alt="Montaje de banquete elegante"
          className="w-full h-full object-cover"
        />
      </div>
    </div>

    {/* Columna de texto */}
    <div
      className={`w-full lg:w-1/2 transition-all duration-700 ease-out
      ${showInspireText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.3em] text-gold/80 mb-3">
        Inspiración visual
      </p>

      <h2 className="text-3xl sm:text-4xl font-semibold text-ebony leading-tight mb-4">
        Déjate inspirar por nuestros eventos
      </h2>

      <p className="text-base sm:text-lg text-slate-700 max-w-xl">
        Descubre cómo transformamos salones, jardines y espacios empresariales
        en escenarios únicos. Desde montajes íntimos hasta grandes celebraciones,
        cada detalle está pensado para reflejar la esencia de tu evento.
      </p>
    </div>
  </div>
</section>
{/* SECCIÓN: Tipos de eventos */}
<section
  ref={eventsSectionRef}
  className={`bg-white py-20 transition-all duration-700 ease-out ${
    showEvents ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
  }`}
>
  <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    {/* Título y descripción */}
    <div className="text-center max-w-2xl mx-auto mb-14">
      <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.3em] text-gold/80 mb-3">
        Tipos de eventos
      </p>
      <h2 className="text-3xl sm:text-4xl font-semibold text-ebony mb-4">
        Diseñamos cada evento a tu medida
      </h2>
      <p className="text-lg text-slate-700">
        Delirio de Banquetes te acompaña en todo tipo de celebraciones, adaptando el montaje,
        el menú y el servicio para que cada ocasión se sienta única.
      </p>
    </div>

    {/* Grid de 4 cards */}
    <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 xl:grid-cols-4">
      {eventTypes.map((event) => (
        <div key={event.title} className="flex flex-col group">
          {/* Tarjeta de imagen */}
          <div className="bg-[#f3f3f3] px-6 py-6 flex items-center justify-center">
            <div className="w-full h-40 overflow-hidden">
              <img
                src={event.img}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-115"
              />
            </div>
          </div>

          {/* Texto debajo */}
          <h3 className="mt-6 text-xl font-semibold text-ebony">
            {event.title}
          </h3>
          <p className="mt-2 text-base text-slate-700 leading-relaxed">
            {event.desc}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
{/* SECCIÓN: Proceso sencillo */}
<section
  ref={processSectionRef}
  className={`bg-white py-20 transition-all duration-700 ease-out ${
    showProcess ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
  }`}
>
  <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    {/* Título y descripción */}
    <div className="text-center max-w-2xl mx-auto mb-12">
      <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.3em] text-gold/80 mb-3">
        Proceso sencillo
      </p>
      <h2 className="text-3xl sm:text-4xl font-semibold text-ebony mb-4">
        Organizar tu evento nunca fue tan fácil
      </h2>
      <p className="text-lg text-slate-700">
        Te acompañamos en cada etapa para que la planeación sea clara, rápida y
        sin preocupaciones.
      </p>
    </div>

    {/* Pasos */}
    <div className="grid gap-y-10 gap-x-10 md:grid-cols-4">
      {processSteps.map((step) => (
        <div
          key={step.title}
          className="flex flex-col items-center text-center gap-4 transition-all duration-700 ease-out"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#998131] text-[#D4AF37] bg-white">
            {step.icon}
          </div>
          <h3 className="text-lg font-semibold text-ebony">{step.title}</h3>
          <p className="text-base text-slate-700 leading-relaxed">
            {step.desc}
          </p>
        </div>
      ))}
    </div>

    {/* Frase de cierre */}
    <p className="mt-12 text-center text-lg text-slate-700">
      En Delirio de Banquetes, cada paso está pensado para que tú solo te dediques a
      disfrutar de tu evento.
    </p>
  </div>
</section>
{/* SECCIÓN: Llamado a la acción final */}
<section
  ref={ctaSectionRef}
  className={`bg-ebony py-20 transition-all duration-700 ease-out ${
    showCta ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
  }`}
>
  <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <div className=" overflow-hidden bg-[#000000] flex flex-col lg:flex-row h-auto lg:h-[28rem]">
      {/* Imagen */}
<div className="w-full lg:w-1/2 h-full flex-1">
  <img
    src={ctaImage}
    alt="Montaje de banquete elegante listo para el evento"
    className="w-full h-full object-cover"
  />
</div>
      {/* Card de texto */}
      <div className="w-full lg:w-1/2 px-8 sm:px-10 lg:px-12 py-10 lg:py-14 flex flex-col justify-center">
        <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.3em] text-[#D4AF37] mb-4">
          ¿Listo para tu próximo evento?
        </p>

        <h2 className="text-3xl sm:text-4xl font-semibold text-ebony leading-tight mb-4 text-white">
          Es momento de darle sabor a tu celebración
        </h2>

        <p className="text-sm sm:text-base mb-8 max-w-md text-white">
          Explora nuestro menú y descubre las opciones ideales para tu boda, XV años
          o evento empresarial. Delirio de Banquetes se encarga de que cada plato
          y cada detalle sorprendan a tus invitados.
        </p>

        <div>
          <button
  href="/menu"
  className="inline-flex items-center justify-center gap-2 px-8 py-3 text-sm sm:text-base font-semibold bg-white text-black hover:text-ebony transition"
>
  Ver menú de banquetes
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
  </svg>
</button>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  );
}
