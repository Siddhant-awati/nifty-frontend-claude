import { Activity, Wifi, WifiOff, LogIn } from "lucide-react";

const Header = ({ connected, mode, messageCount, indices, options }) => {
  const handleLogin = () => {
    window.open("https://nifty-backend-claude.onrender.com/login", "_blank");
  };

  const getSignalColor = (signal) => {
    switch (signal) {
      case "BULL":
        return "#10b981";
      case "BEAR":
        return "#ef4444";
      case "PAUSED":
        return "#f59e0b";
      default:
        return "#94a3b8";
    }
  };

  const renderIndexSignals = (indexName) => {
    const index = indices[indexName];
    const indexSignal = index?.signal || "-";
    const indexColor = getSignalColor(indexSignal);

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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 12px",
          background: "#f8fafc",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
        }}
      >
        <span
          style={{
            fontSize: "13px",
            fontWeight: "600",
            color: "#475569",
          }}
        >
          {indexName}:
        </span>
        <div style={{ display: "flex", gap: "4px" }}>
          {["BULL", "BEAR", "PAUSED"].map((type) => {
            const isActive = counts[type] > 0;
            const color = getSignalColor(type);
            return (
              <div
                key={type}
                style={{
                  padding: "3px 8px",
                  borderRadius: "4px",
                  fontSize: "11px",
                  fontWeight: "600",
                  background: isActive ? color : "#f1f5f9",
                  color: isActive ? "#fff" : "#cbd5e1",
                  border: `1.5px solid ${isActive ? color : "#e2e8f0"}`,
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span>{type}</span>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: "700",
                    opacity: isActive ? 1 : 0.6,
                  }}
                >
                  ({counts[type]})
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        background: "#fff",
        borderBottom: "2px solid #e2e8f0",
        padding: "16px 20px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Mobile Layout */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* Top Row: Title and Connection */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <Activity size={24} color="#fff" />
            </div>
            <div>
              <h1
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#0f172a",
                  marginBottom: "2px",
                }}
              >
                Trading Dashboard
              </h1>
              <div
                style={{
                  fontSize: "12px",
                  color: "#64748b",
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                }}
              >
                <span>
                  Mode:{" "}
                  <strong
                    style={{
                      color: mode === "LIVE" ? "#10b981" : "#f59e0b",
                    }}
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

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button
              onClick={handleLogin}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                fontWeight: "600",
                fontSize: "13px",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(59, 130, 246, 0.3)",
              }}
            >
              <LogIn size={16} />
              <span>Login</span>
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 12px",
                background: connected ? "#ecfdf5" : "#fef2f2",
                borderRadius: "8px",
                border: `2px solid ${connected ? "#10b981" : "#ef4444"}`,
              }}
            >
              {connected ? (
                <Wifi size={16} color="#10b981" />
              ) : (
                <WifiOff size={16} color="#ef4444" />
              )}
              <span
                style={{
                  fontSize: "12px",
                  color: connected ? "#10b981" : "#ef4444",
                  fontWeight: "600",
                }}
              >
                {connected ? "Connected" : "Disconnected"}
              </span>
            </div>
          </div>
        </div>

        {/* Signals Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "10px",
          }}
        >
          {renderIndexSignals("NIFTY")}
          {renderIndexSignals("SENSEX")}
          {renderIndexSignals("BANKNIFTY")}
        </div>
      </div>
    </div>
  );
};

export default Header;
