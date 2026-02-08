import {
  Activity,
  Wifi,
  WifiOff,
  TrendingUp,
  TrendingDown,
  Pause,
  LogIn,
} from "lucide-react";

const Header = ({ connected, mode, messageCount, indices, options }) => {
  // Count index signals
  const indexStats = {
    bull: Object.values(indices).filter((i) => i.signal === "BULL").length,
    bear: Object.values(indices).filter((i) => i.signal === "BEAR").length,
    paused: Object.values(indices).filter((i) => i.signal === "PAUSED").length,
  };

  // Count option signals
  const optionStats = {
    bull: Object.values(options).filter((o) => o.signal === "BULL").length,
    bear: Object.values(options).filter((o) => o.signal === "BEAR").length,
    paused: Object.values(options).filter((o) => o.signal === "PAUSED").length,
  };

  // Total stats
  const stats = {
    bull: indexStats.bull + optionStats.bull,
    bear: indexStats.bear + optionStats.bear,
    paused: indexStats.paused + optionStats.paused,
  };

  const handleLogin = () => {
    window.open("https://nifty-backend-claude.onrender.com/login", "_blank");
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        borderBottom: "2px solid #334155",
        padding: "20px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "20px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div
          style={{
            background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
            padding: "12px",
            borderRadius: "12px",
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
          }}
        >
          <Activity size={28} color="#fff" />
        </div>
        <div>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "4px",
              background: "linear-gradient(to right, #60a5fa, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Trading Dashboard
          </h1>
          <div
            style={{
              fontSize: "13px",
              color: "#94a3b8",
              display: "flex",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <span>
              Mode:{" "}
              <strong
                style={{
                  color: mode === "LIVE" ? "#10b981" : "#f59e0b",
                  background:
                    mode === "LIVE"
                      ? "rgba(16, 185, 129, 0.1)"
                      : "rgba(245, 158, 11, 0.1)",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  fontSize: "11px",
                }}
              >
                {mode || "-"}
              </strong>
            </span>
            <span style={{ color: "#64748b" }}>•</span>
            <span>
              Messages:{" "}
              <strong style={{ color: "#e2e8f0" }}>{messageCount}</strong>
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        {/* Login Button */}
        <button
          onClick={handleLogin}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
            border: "none",
            borderRadius: "10px",
            color: "#fff",
            fontWeight: "600",
            fontSize: "14px",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 16px rgba(59, 130, 246, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.4)";
          }}
        >
          <LogIn size={18} />
          <span>Login</span>
        </button>

        {/* Signal Stats */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            background: "rgba(30, 41, 59, 0.5)",
            padding: "12px 20px",
            borderRadius: "12px",
            border: "1px solid #334155",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 12px",
              background: "rgba(16, 185, 129, 0.1)",
              borderRadius: "8px",
              border: "1px solid rgba(16, 185, 129, 0.2)",
            }}
          >
            <TrendingUp size={16} color="#10b981" />
            <div>
              <div
                style={{
                  fontSize: "10px",
                  color: "#6ee7b7",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Bull
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#10b981",
                }}
              >
                {stats.bull}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 12px",
              background: "rgba(239, 68, 68, 0.1)",
              borderRadius: "8px",
              border: "1px solid rgba(239, 68, 68, 0.2)",
            }}
          >
            <TrendingDown size={16} color="#ef4444" />
            <div>
              <div
                style={{
                  fontSize: "10px",
                  color: "#fca5a5",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Bear
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#ef4444",
                }}
              >
                {stats.bear}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 12px",
              background: "rgba(245, 158, 11, 0.1)",
              borderRadius: "8px",
              border: "1px solid rgba(245, 158, 11, 0.2)",
            }}
          >
            <Pause size={16} color="#f59e0b" />
            <div>
              <div
                style={{
                  fontSize: "10px",
                  color: "#fcd34d",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Paused
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#f59e0b",
                }}
              >
                {stats.paused}
              </div>
            </div>
          </div>
        </div>

        {/* Connection Status */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 16px",
            background: connected
              ? "rgba(16, 185, 129, 0.1)"
              : "rgba(239, 68, 68, 0.1)",
            borderRadius: "10px",
            border: `2px solid ${
              connected ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)"
            }`,
            boxShadow: connected
              ? "0 0 15px rgba(16, 185, 129, 0.2)"
              : "0 0 15px rgba(239, 68, 68, 0.2)",
          }}
        >
          {connected ? (
            <Wifi size={18} color="#10b981" />
          ) : (
            <WifiOff size={18} color="#ef4444" />
          )}
          <span
            style={{
              fontSize: "13px",
              color: connected ? "#10b981" : "#ef4444",
              fontWeight: "600",
            }}
          >
            {connected ? "Connected" : "Disconnected"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
