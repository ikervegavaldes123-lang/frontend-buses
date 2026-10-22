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
        <div className="login-brand">
          <span className="login-brand-icon" aria-hidden="true">✦</span>
          <div><strong>Andes Bus</strong><small>SUCRE · BOLIVIA</small></div>
        </div>

        <div className="login-visual-copy">
          <span className="login-kicker">TRANSPORTE · CONFIANZA · CALIDAD</span>
          <h1>Tu destino,<br /><em>nuestra ruta.</em></h1>
          <p>Gestiona choferes, autobuses, horarios y pasajes desde la plataforma de Andes Bus.</p>
          <div className="login-route-decoration" aria-hidden="true">
            <span className="route-dot" />
            <span className="route-line" />
            <span className="route-bus">✦</span>
            <span className="route-line route-line-short" />
            <span className="route-dot route-dot-end" />
          </div>
          <div className="login-location-chip"><span>📍</span> Sucre, Chuquisaca — Bolivia</div>
        </div>

        <div className="login-visual-footer">
          <span>ANDES BUS · SISTEMA DE GESTIÓN</span>
          <span>Seguridad · Puntualidad · Confianza</span>
        </div>
      </section>

      <section className="login-form-side">
        <form className="login-form" onSubmit={handleSubmit}>
          <span className="login-form-eyebrow">PORTAL DE ACCESO</span>
          <h2>¡Bienvenido!</h2>
          <p className="login-subtitle">Ingresa a la plataforma de gestión de Andes Bus.</p>

          <label htmlFor="login-role">Selecciona tu tipo de cuenta</label>
          <div className="login-role-options">
            <button type="button" className={role === "ADMIN" ? "login-role selected" : "login-role"} onClick={() => setRole("ADMIN")} aria-pressed={role === "ADMIN"}>
              <span>🛡️</span><strong>Administrador</strong><small>Gestionar el sistema</small>
            </button>
            <button type="button" className={role === "CHOFER" ? "login-role selected" : "login-role"} onClick={() => setRole("CHOFER")} aria-pressed={role === "CHOFER"}>
              <span>🚌</span><strong>Chofer</strong><small>Consultar mis viajes</small>
            </button>
          </div>

          <label htmlFor="login-carnet">Carnet de identidad</label>
          <input id="login-carnet" value={carnet} onChange={(event) => setCarnet(event.target.value)} placeholder="Ingresa tu número de carnet" autoComplete="username" required />
          <label htmlFor="login-password">Contraseña</label>
          <input id="login-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Ingresa tu contraseña" autoComplete="current-password" required />
          {error && <p className="login-error" role="alert">{error}</p>}
          <button className="login-submit" type="submit">Ingresar a mi cuenta <span>→</span></button>
          <p className="login-help">Usa los datos registrados por el administrador del sistema.</p>
        </form>
        <footer className="login-copyright">© 2026 Andes Bus · Sucre, Bolivia</footer>
      </section>
    </main>
  );
}

export default LoginPage;
