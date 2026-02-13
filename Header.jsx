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

  // ================= INDICATOR SIGNAL CALCULATOR =================
  const calculateSignal = (option, indicator) => {
    const { ltp, ema20, ema50, ema200, optionType } = option;

    let value;
    if (indicator === "ema20") value = ema20;
    else if (indicator === "ema50") value = ema50;
    else value = ema200;

    if (value == null) return null;

    if (optionType === "CE") {
      // CALLS → BULL if price above indicator
      return ltp > value ? "BULL" : "BEAR";
    } else {
      // PUTS → BULL if price below indicator
      return ltp < value ? "BULL" : "BEAR";
    }
  };

  // ================= RENDER SIGNAL TABLE =================
  const renderIndexSignals = (indexName) => {
    const indexOptions = Object.values(options).filter(
      (opt) => opt.name === indexName
    );

    // ---------- EMA20 ----------
    const ema20Counts = {
      BULL: indexOptions.filter(
        (opt) => calculateSignal(opt, "ema20") === "BULL"
      ).length,
      BEAR: indexOptions.filter(
        (opt) => calculateSignal(opt, "ema20") === "BEAR"
      ).length,
    };

    // ---------- EMA50 ----------
    const ema50Counts = {
      BULL: indexOptions.filter(
        (opt) => calculateSignal(opt, "ema50") === "BULL"
      ).length,
      BEAR: indexOptions.filter(
        (opt) => calculateSignal(opt, "ema50") === "BEAR"
      ).length,
    };

    // ---------- EMA200 ----------
    const ema200Counts = {
      BULL: indexOptions.filter(
        (opt) => calculateSignal(opt, "ema200") === "BULL"
      ).length,
      BEAR: indexOptions.filter(
        (opt) => calculateSignal(opt, "ema200") === "BEAR"
      ).length,
    };

    return (
      <div className="signal-table-container">
        <div className="signal-table-header">
          <h3>{indexName} - OPTIONS Direction</h3>
        </div>

        <table className="signal-count-table">
          <thead>
            <tr>
              <th>Indicator</th>
              <th>BULL</th>
              <th>BEAR</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="indicator-name">EMA20</td>
              <td className="count-bull">{ema20Counts.BULL}</td>
              <td className="count-bear">{ema20Counts.BEAR}</td>
            </tr>
            <tr>
              <td className="indicator-name">EMA50</td>
              <td className="count-bull">{ema50Counts.BULL}</td>
              <td className="count-bear">{ema50Counts.BEAR}</td>
            </tr>
            <tr>
              <td className="indicator-name">EMA200</td>
              <td className="count-bull">{ema200Counts.BULL}</td>
              <td className="count-bear">{ema200Counts.BEAR}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  // ================= UI =================
  return (
    <div className="header">
      <div className="header-content">
        {/* Top Row */}
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

        {/* Signals Tables Grid */}
        <div className="signals-tables-grid">
          {renderIndexSignals("NIFTY")}
          {renderIndexSignals("BANKNIFTY")}
          {renderIndexSignals("SENSEX")}
        </div>
      </div>
    </div>
  );
};

export default Header;
