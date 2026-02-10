import { Activity, Wifi, WifiOff, LogIn, RefreshCw } from "lucide-react";

const Header = ({
  connected,
  mode,
  messageCount,
  indices,
  options,
  lastUpdate,
  onRefresh,
}) => {
  const handleLogin = () => {
    window.open("https://nifty-backend-claude.onrender.com/login", "_blank");
  };

  const calculateSignal = (option, indicator) => {
    const { ltp, ema50, supertrend, optionType } = option;
    const value = indicator === "ema50" ? ema50 : supertrend;

    if (optionType === "CE") {
      // For CALLS: BULL if LTP > indicator
      return ltp > value ? "BULL" : "BEAR";
    } else {
      // For PUTS: BULL if LTP < indicator
      return ltp < value ? "BULL" : "BEAR";
    }
  };

  const renderIndexSignals = (indexName) => {
    // Get all options for this index
    const indexOptions = Object.values(options).filter(
      (opt) => opt.name === indexName
    );

    // Calculate counts for Supertrend (ignore backend signal, calculate based on indicators)
    const supertrendCounts = {
      BULL: indexOptions.filter(
        (opt) => calculateSignal(opt, "supertrend") === "BULL"
      ).length,
      BEAR: indexOptions.filter(
        (opt) => calculateSignal(opt, "supertrend") === "BEAR"
      ).length,
      PAUSED: indexOptions.filter((opt) => opt.signal === "PAUSED").length,
    };

    // Calculate counts for EMA50 (ignore backend signal, calculate based on indicators)
    const ema50Counts = {
      BULL: indexOptions.filter(
        (opt) => calculateSignal(opt, "ema50") === "BULL"
      ).length,
      BEAR: indexOptions.filter(
        (opt) => calculateSignal(opt, "ema50") === "BEAR"
      ).length,
      PAUSED: indexOptions.filter((opt) => opt.signal === "PAUSED").length,
    };

    return (
      <div className="signal-card">
        <span className="signal-label">{indexName}</span>

        {/* Supertrend Row */}
        <div className="signal-row">
          <span className="signal-indicator">SUPERTREND:</span>
          <div className="signal-badges">
            {["BULL", "BEAR", "PAUSED"].map((type) => {
              const count = supertrendCounts[type];
              const isActive = count > 0;
              const badgeClass = isActive
                ? `signal-badge active-${type.toLowerCase()}`
                : "signal-badge inactive";

              return (
                <div key={`st-${type}`} className={badgeClass}>
                  <span>{type}</span>
                  <span className="signal-count">({count})</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* EMA50 Row */}
        <div className="signal-row">
          <span className="signal-indicator">EMA50:</span>
          <div className="signal-badges">
            {["BULL", "BEAR", "PAUSED"].map((type) => {
              const count = ema50Counts[type];
              const isActive = count > 0;
              const badgeClass = isActive
                ? `signal-badge active-${type.toLowerCase()}`
                : "signal-badge inactive";

              return (
                <div key={`ema-${type}`} className={badgeClass}>
                  <span>{type}</span>
                  <span className="signal-count">({count})</span>
                </div>
              );
            })}
          </div>
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
                  Updates: <strong>{messageCount}</strong>
                </span>
                {lastUpdate && (
                  <>
                    <span>•</span>
                    <span>
                      Last: <strong>{lastUpdate.toLocaleTimeString()}</strong>
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="header-actions">
            <button
              onClick={onRefresh}
              className="refresh-btn login-btn"
              title="Refresh data now"
            >
              <RefreshCw size={16} />
              <span>Refresh</span>
            </button>

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
