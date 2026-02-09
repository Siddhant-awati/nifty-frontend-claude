import { Activity, Wifi, WifiOff, LogIn } from "lucide-react";

const Header = ({ connected, mode, messageCount, indices, options }) => {
  const handleLogin = () => {
    window.open("https://nifty-backend-claude.onrender.com/login", "_blank");
  };

  const renderIndexSignals = (indexName) => {
    const index = indices[indexName];

    // Count options for this index
    const indexOptions = Object.values(options).filter(
      (opt) => opt.name === indexName
    );

    const counts = {
      BULL: indexOptions.filter((opt) => opt.signal === "BULL").length,
      BEAR: indexOptions.filter((opt) => opt.signal === "BEAR").length,
      PAUSED: indexOptions.filter((opt) => opt.signal === "PAUSED").length,
    };

    return (
      <div className="signal-card">
        <span className="signal-label">{indexName}:</span>
        <div className="signal-badges">
          {["BULL", "BEAR", "PAUSED"].map((type) => {
            const isActive = counts[type] > 0;
            const badgeClass = isActive
              ? `signal-badge active-${type.toLowerCase()}`
              : "signal-badge inactive";

            return (
              <div key={type} className={badgeClass}>
                <span>{type}</span>
                <span className="signal-count">({counts[type]})</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="header">
      <div className="header-content">
        {/* Top Row: Title and Connection */}
        <div className="header-top">
          <div className="header-brand">
            <div className="brand-icon">
              <Activity size={24} color="#fff" />
            </div>
            <div className="brand-info">
              <h1>Trading Dashboard</h1>
              <div className="brand-meta">
                <span>
                  Mode:{" "}
                  <strong
                    className={mode === "LIVE" ? "mode-live" : "mode-test"}
                  >
                    {mode || "-"}
                  </strong>
                </span>
                <span>•</span>
                <span>
                  Msg: <strong>{messageCount}</strong>
                </span>
              </div>
            </div>
          </div>

          <div className="header-actions">
            <button onClick={handleLogin} className="login-btn">
              <LogIn size={16} />
              <span>Login</span>
            </button>

            <div
              className={`connection-status ${
                connected ? "connected" : "disconnected"
              }`}
            >
              {connected ? <Wifi size={16} /> : <WifiOff size={16} />}
              <span>{connected ? "Connected" : "Disconnected"}</span>
            </div>
          </div>
        </div>

        {/* Signals Grid */}
        <div className="signals-grid">
          {renderIndexSignals("NIFTY")}
          {renderIndexSignals("BANKNIFTY")}
          {renderIndexSignals("SENSEX")}
        </div>
      </div>
    </div>
  );
};

export default Header;
