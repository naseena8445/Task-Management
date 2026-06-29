function Layout({ children, user, onLogout, theme, setTheme }) {
  return (
    <>
      <div className="background-shapes" />
      <div className="app-shell">
        <header className="topbar">
          <div>
            <div className="brand">Task Manager</div>
            <div className="brand-subtitle">Smart task tracking for your day</div>
          </div>
          <div className="header-actions">
            {user && <div className="user-badge">Hello, {user.name}</div>}
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
              {theme === 'light' ? 'Dark' : 'Light'} Mode
            </button>
            {user && (
              <button className="secondary" onClick={onLogout}>
                Logout
              </button>
            )}
          </div>
        </header>
        <main>{children}</main>
      </div>
    </>
  );
}

export default Layout;
