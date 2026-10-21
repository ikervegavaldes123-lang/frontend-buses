import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { authRepository } from "../repositories/authRepository";
import type { UserRole } from "../types/auth";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const [carnet, setCarnet] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("ADMIN");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const user = authRepository.login({ carnet: carnet.trim(), password, role });

    if (!user) {
      setError("Los datos no coinciden con el rol seleccionado.");
      return;
    }

    navigate(user.role === "ADMIN" ? "/" : "/chofer", { replace: true });
  };

  return (
    <main className="login-page">
      <section className="login-visual">
        <div className="login-brand"><span className="login-brand-icon">🚌</span><div><strong>TRANSIT</strong><small>SISTEMA DE GESTIÓN</small></div></div>
        <div className="login-visual-copy">
          <span className="login-kicker">TRANSPORTE INTELIGENTE</span>
          <h1>Todo tu transporte,<br /><em>en un solo lugar.</em></h1>
          <p>Organiza rutas, administra tu equipo y mantén cada viaje bajo control.</p>
        </div>
        <div className="login-visual-footer"><span>● Plataforma de gestión</span><span>Seguro · Simple · Eficiente</span></div>
      </section>
      <section className="login-form-side">
        <form className="login-form" onSubmit={handleSubmit}>
          <span className="login-form-eyebrow">BIENVENIDO DE NUEVO</span>
          <h2>Iniciar sesión</h2>
          <p className="login-subtitle">Ingresa tus datos para acceder al sistema.</p>

          <label htmlFor="login-role">¿Cómo deseas ingresar?</label>
          <div className="login-role-options">
            <button type="button" className={role === "ADMIN" ? "login-role selected" : "login-role"} onClick={() => setRole("ADMIN")} aria-pressed={role === "ADMIN"}>
              <span>🛡️</span><strong>Administrador</strong><small>Gestionar el sistema</small>
            </button>
            <button type="button" className={role === "CHOFER" ? "login-role selected" : "login-role"} onClick={() => setRole("CHOFER")} aria-pressed={role === "CHOFER"}>
              <span>🚍</span><strong>Chofer</strong><small>Ver mis viajes</small>
            </button>
          </div>

          <label htmlFor="login-carnet">Carnet de identidad</label>
          <input id="login-carnet" value={carnet} onChange={(event) => setCarnet(event.target.value)} placeholder="Ingresa tu número de carnet" autoComplete="username" required />
          <label htmlFor="login-password">Contraseña</label>
          <input id="login-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Ingresa tu contraseña" autoComplete="current-password" required />
          {error && <p className="login-error" role="alert">{error}</p>}
          <button className="login-submit" type="submit">Ingresar al sistema <span>→</span></button>
          <p className="login-help">Selecciona el rol que corresponde a tu cuenta.</p>
        </form>
        <footer className="login-copyright">© 2026 Sistema de Gestión de Transporte</footer>
      </section>
    </main>
  );
}

export default LoginPage;
