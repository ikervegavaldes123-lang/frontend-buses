import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authRepository } from "../repositories/authRepository";
import "./ChoferDashboardPage.css";

function ChoferDashboardPage() {
  const navigate = useNavigate();
  const user = authRepository.getCurrentUser();
  const [section, setSection] = useState<"inicio" | "viajes" | "perfil">("inicio");

  const handleLogout = () => {
    authRepository.logout();
    navigate("/login", { replace: true });
  };

  return (
    <main className="driver-portal">
      <aside className="driver-portal-sidebar">
        <div className="driver-portal-brand"><span>🚌</span><div><strong>TRANSIT</strong><small>PORTAL DEL CHOFER</small></div></div>
        <p className="driver-menu-label">MI ESPACIO</p>
        <nav className="driver-portal-nav">
          <button className={section === "inicio" ? "current" : ""} onClick={() => setSection("inicio")}><span>⌂</span> Inicio</button>
          <button className={section === "viajes" ? "current" : ""} onClick={() => setSection("viajes")}><span>◷</span> Mis viajes</button>
          <button className={section === "perfil" ? "current" : ""} onClick={() => setSection("perfil")}><span>♙</span> Mi perfil</button>
        </nav>
        <div className="driver-portal-user"><div className="driver-portal-avatar">{user?.name?.charAt(0).toUpperCase() ?? "C"}</div><div><strong>{user?.name ?? "Chofer"}</strong><small>Chofer</small></div></div>
      </aside>

      <section className="driver-portal-main">
        <header className="driver-portal-header">
          <div><span className="driver-portal-eyebrow">PORTAL DEL CONDUCTOR</span><h1>{section === "inicio" ? "¡Hola, " + (user?.name ?? "chofer") + "!" : section === "viajes" ? "Mis viajes" : "Mi perfil"}</h1><p>Consulta tu información y mantente al día con tus actividades.</p></div>
          <button className="driver-logout" onClick={handleLogout}>Cerrar sesión <span>↗</span></button>
        </header>

        {section === "inicio" && <>
          <div className="driver-welcome-card"><div><span className="driver-welcome-tag">PANEL PERSONAL</span><h2>Tu jornada, organizada.</h2><p>Aquí encontrarás tus viajes asignados y los datos de tu cuenta.</p><button onClick={() => setSection("viajes")}>Consultar mis viajes <span>→</span></button></div><div className="driver-welcome-illustration">🚌</div></div>
          <div className="driver-quick-grid">
            <button className="driver-quick-card" onClick={() => setSection("viajes")}><span className="driver-quick-icon blue">◷</span><strong>Mis viajes</strong><small>Consulta tus turnos y asignaciones</small><span className="driver-card-arrow">→</span></button>
            <button className="driver-quick-card" onClick={() => setSection("perfil")}><span className="driver-quick-icon violet">♙</span><strong>Mi perfil</strong><small>Revisa tus datos registrados</small><span className="driver-card-arrow">→</span></button>
          </div>
          <section className="driver-information-panel"><div className="driver-section-heading"><div><h2>Información de la cuenta</h2><p>Datos asociados a tu sesión actual</p></div><span className="driver-account-badge">● Cuenta activa</span></div><div className="driver-info-row"><span>Nombre completo</span><strong>{user?.name ?? "No disponible"}</strong></div><div className="driver-info-row"><span>Carnet de identidad</span><strong>{user?.carnet ?? "No disponible"}</strong></div><div className="driver-info-row"><span>Tipo de acceso</span><strong>Chofer</strong></div></section>
        </>}

        {section === "viajes" && <section className="driver-information-panel driver-trips-panel"><div className="driver-section-heading"><div><h2>Mis viajes asignados</h2><p>Consulta aquí tus próximos turnos y rutas.</p></div><span className="driver-trip-icon">🗓️</span></div><div className="driver-empty-trips"><span>🚌</span><strong>No hay viajes para mostrar todavía</strong><p>Cuando el administrador registre y asigne un turno a tu cuenta, aparecerá en esta sección.</p></div></section>}

        {section === "perfil" && <section className="driver-information-panel"><div className="driver-section-heading"><div><h2>Mi perfil</h2><p>Información básica de tu cuenta de chofer.</p></div><span className="driver-profile-icon">♙</span></div><div className="driver-profile-summary"><div className="driver-profile-avatar">{user?.name?.charAt(0).toUpperCase() ?? "C"}</div><div><strong>{user?.name ?? "Chofer"}</strong><span>Usuario de transporte</span></div></div><div className="driver-info-row"><span>Carnet de identidad</span><strong>{user?.carnet ?? "No disponible"}</strong></div><div className="driver-info-row"><span>Rol de usuario</span><strong>Chofer</strong></div><div className="driver-info-row"><span>Estado de sesión</span><strong className="driver-session-active">Activa</strong></div></section>}
        <footer className="driver-portal-footer">Sistema de Gestión de Transporte <span>•</span> Área exclusiva para choferes</footer>
      </section>
    </main>
  );
}

export default ChoferDashboardPage;
