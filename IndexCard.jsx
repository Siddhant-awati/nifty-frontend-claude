const getSignalColor = (signal) => {
  switch (signal) {
    case "BULL":
      return "#10b981";
    case "BEAR":
      return "#ef4444";
    case "PAUSED":
      return "#f59e0b";
    default:
      return "#64748b";
  }
};

const getSignalBg = (signal) => {
  switch (signal) {
    case "BULL":
      return "rgba(16, 185, 129, 0.15)";
    case "BEAR":
      return "rgba(239, 68, 68, 0.15)";
    case "PAUSED":
      return "rgba(245, 158, 11, 0.15)";
    default:
      return "rgba(100, 116, 139, 0.15)";
  }
};

const IndexCard = ({ data }) => {
  if (!data) return null;

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        border: "2px solid #3b82f6",
        borderRadius: "16px",
        padding: "24px",
        boxShadow:
          "0 10px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(59, 130, 246, 0.1)",
        transition: "transform 0.2s",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            fontSize: "26px",
            fontWeight: "bold",
            background: "linear-gradient(to right, #60a5fa, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {data.symbol}
        </h2>
        <div
          style={{
            padding: "8px 20px",
            borderRadius: "8px",
            background: getSignalBg(data.signal),
            border: `2px solid ${getSignalColor(data.signal)}`,
            color: getSignalColor(data.signal),
            fontWeight: "bold",
            fontSize: "14px",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            boxShadow: `0 0 15px ${getSignalColor(data.signal)}40`,
          }}
        >
          {data.signal}
        </div>
      </div>

      <div style={{ display: "flex", gap: "24px", alignItems: "baseline" }}>
        <div>
          <div
            style={{
              fontSize: "11px",
              color: "#94a3b8",
              marginBottom: "6px",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            LTP
          </div>
          <div
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#e2e8f0",
              textShadow: "0 2px 10px rgba(226, 232, 240, 0.1)",
            }}
          >
            {data.ltp?.toFixed(2)}
          </div>
        </div>

        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
            gap: "16px",
            fontSize: "12px",
          }}
        >
          <div
            style={{
              background: "rgba(59, 130, 246, 0.05)",
              padding: "10px 12px",
              borderRadius: "8px",
              border: "1px solid rgba(59, 130, 246, 0.2)",
            }}
          >
            <div style={{ color: "#94a3b8", marginBottom: "4px" }}>
              EMA High
            </div>
            <div
              style={{ color: "#60a5fa", fontWeight: "700", fontSize: "14px" }}
            >
              {data.ema?.high?.toFixed(2)}
            </div>
          </div>
          <div
            style={{
              background: "rgba(139, 92, 246, 0.05)",
              padding: "10px 12px",
              borderRadius: "8px",
              border: "1px solid rgba(139, 92, 246, 0.2)",
            }}
          >
            <div style={{ color: "#94a3b8", marginBottom: "4px" }}>EMA Low</div>
            <div
              style={{ color: "#a78bfa", fontWeight: "700", fontSize: "14px" }}
            >
              {data.ema?.low?.toFixed(2)}
            </div>
          </div>
          <div
            style={{
              background: "rgba(16, 185, 129, 0.05)",
              padding: "10px 12px",
              borderRadius: "8px",
              border: "1px solid rgba(16, 185, 129, 0.2)",
            }}
          >
            <div style={{ color: "#94a3b8", marginBottom: "4px" }}>
              Supertrend
            </div>
            <div
              style={{ color: "#10b981", fontWeight: "700", fontSize: "14px" }}
            >
              {data.supertrend?.toFixed(2)}
            </div>
          </div>
          <div
            style={{
              background: "rgba(100, 116, 139, 0.05)",
              padding: "10px 12px",
              borderRadius: "8px",
              border: "1px solid rgba(100, 116, 139, 0.2)",
            }}
          >
            <div style={{ color: "#94a3b8", marginBottom: "4px" }}>ATR</div>
            <div
              style={{ color: "#cbd5e1", fontWeight: "700", fontSize: "14px" }}
            >
              {data.atr?.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexCard;
