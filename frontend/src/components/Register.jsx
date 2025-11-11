import { useState } from "react";
import { motion } from "framer-motion";

const logo = "/logo-db.png";
const banquet = "/register.jpg";

// Usa la URL del backend desde las envs de Astro
const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:4000";

export default function Register() {
  const [showPwd, setShowPwd] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.username,
          email: form.email,
          password: form.password,
          role: "cliente",
          phone: form.phone,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || "Error al registrarse");
      } else {
        // Registro exitoso → redirigir al login
        window.location.href = "/login";
        return;
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Imagen izquierda */}
      <section className="relative hidden lg:block">
        <img
          src={banquet}
          alt="Banquete"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </section>

      {/* Formulario derecha */}
      <section className="flex items-center justify-center p-6 lg:p-10">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-6">
            <img
              src={logo}
              alt="Delirio de Banquetes"
              className="h-24 w-24 rounded-full ring-1 ring-[rgba(212,175,55,0.6)] object-cover"
            />
          </div>

          <h1 className="text-3xl font-semibold text-center mb-3">
            Crear cuenta
          </h1>

          {/* mensaje de error */}
          {errorMsg && (
            <p className="mb-3 text-sm text-red-600 text-center">
              {errorMsg}
            </p>
          )}

          <form onSubmit={onSubmit} className="space-y-5">
            {/* Usuario */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.3 }}
            >
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  {/* user icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-black/40"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-5 0-9 2.5-9 5.5A1.5 1.5 0 0 0 4.5 21h15A1.5 1.5 0 0 0 21 19.5C21 16.5 17 14 12 14Z" />
                  </svg>
                </span>
                <input
                  type="text"
                  name="username"
                  placeholder="Nombre de usuario"
                  value={form.username}
                  onChange={onChange}
                  required
                  className="w-full border border-black/15 bg-black/5 pl-11 pr-4 py-3 outline-none placeholder:text-black/50 focus:ring-2 focus:ring-[rgba(212,175,55,0.6)] rounded-none"
                />
              </div>
            </motion.div>

            {/* Correo */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  {/* mail icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-black/40"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 4H4a2 2 0 0 0-2 2v1.2l10 5.6 10-5.6V6a2 2 0 0 0-2-2Zm0 5.4-8.84 4.96a1 1 0 0 1-.96 0L2 9.4V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9.4Z" />
                  </svg>
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  value={form.email}
                  onChange={onChange}
                  required
                  className="w-full border border-black/15 bg-black/5 pl-11 pr-4 py-3 outline-none placeholder:text-black/50 focus:ring-2 focus:ring-[rgba(212,175,55,0.6)] rounded-none"
                />
              </div>
            </motion.div>

            {/* Contraseña */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
            >
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  {/* lock icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-black/40"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17 9h-1V7a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2Zm-6 7.73V16a1 1 0 0 1 2 0v.73a1 1 0 1 1-2 0ZM9 7a3 3 0 0 1 6 0v2H9Z" />
                  </svg>
                </span>
                <input
                  type={showPwd ? "text" : "password"}
                  name="password"
                  placeholder="Contraseña"
                  value={form.password}
                  onChange={onChange}
                  required
                  minLength={6}
                  className="w-full border border-black/15 bg-black/5 pl-11 pr-11 py-3 outline-none placeholder:text-black/50 focus:ring-2 focus:ring-[rgba(212,175,55,0.6)] rounded-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute inset-y-0 right-0 px-4 flex items-center text-black/50 hover:text-black/80"
                  aria-label={
                    showPwd ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPwd ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M2.1 3.51 20.49 21.9l1.41-1.41L3.51 2.1 2.1 3.51zM9.9 11.31A2.1 2.1 0 0 0 12 14.4a2.1 2.1 0 0 0 2.09-1.81l-4.2-4.2a2.1 2.1 0 0 0 0 2.92zM12 6c4.79 0 8.88 3.06 10.5 7.5a12.2 12.2 0 0 1-3.28 4.7l-1.42-1.42A10.2 10.2 0 0 0 21 13.5C19.64 10 16.15 8 12 8c-.73 0-1.44.07-2.12.2L7.3 5.62A12.4 12.4 0 0 1 12 6z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 6c-4.79 0-8.88 3.06-10.5 7.5C3.12 17.94 7.21 21 12 21s8.88-3.06 10.5-7.5C20.88 9.06 16.79 6 12 6zm0 12a4.5 4.5 0 1 1 4.5-4.5A4.5 4.5 0 0 1 12 18z" />
                    </svg>
                  )}
                </button>
              </div>
            </motion.div>

            {/* Teléfono */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  {/* phone icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-black/40"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M6.6 2h10.8A1.6 1.6 0 0 1 19 3.6v16.8A1.6 1.6 0 0 1 17.4 22H6.6A1.6 1.6 0 0 1 5 20.4V3.6A1.6 1.6 0 0 1 6.6 2Zm4.4 17h1.9a1.1 1.1 0 1 1 0 2h-1.9a1.1 1.1 0 1 1 0-2Z" />
                  </svg>
                </span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Teléfono"
                  value={form.phone}
                  onChange={onChange}
                  className="w-full border border-black/15 bg-black/5 pl-11 pr-4 py-3 outline-none placeholder:text-black/50 focus:ring-2 focus:ring-[rgba(212,175,55,0.6)] rounded-none"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.3 }}
            >
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 font-medium hover:opacity-90 border border-[rgba(212,175,55,0.5)] disabled:opacity-60"
              >
                {loading ? "Registrando..." : "Registrarme"}
              </button>
            </motion.div>
          </form>

          <motion.p
            className="mt-6 text-center text-lg text-black/70"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.25 }}
          >
            ¿Ya tienes una cuenta?{" "}
            <a href="/login" className="text-[#D4AF37] hover:underline">
              Inicia sesión aquí.
            </a>
          </motion.p>
        </div>
      </section>
    </div>
  );
}
