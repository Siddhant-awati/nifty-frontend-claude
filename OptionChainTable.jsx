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

const OptionCell = ({ data, type }) => {
  if (!data) {
    return (
      <td
        style={{
          padding: "12px",
          textAlign: "center",
          color: "#475569",
        }}
      >
        -
      </td>
    );
  }

  const signalColor = getSignalColor(data.signal);

  return (
    <td
      style={{
        padding: "14px",
        borderLeft: type === "call" ? "2px solid #334155" : "none",
        borderRight: type === "put" ? "2px solid #334155" : "none",
        background:
          type === "call"
            ? "rgba(16, 185, 129, 0.03)"
            : "rgba(239, 68, 68, 0.03)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{ fontSize: "17px", fontWeight: "bold", color: "#e2e8f0" }}
          >
            {data.ltp?.toFixed(2)}
          </span>
          <span
            style={{
              fontSize: "11px",
              fontWeight: "bold",
              color: signalColor,
              padding: "3px 10px",
              borderRadius: "6px",
              background: `${signalColor}20`,
              border: `1px solid ${signalColor}40`,
              textTransform: "uppercase",
              letterSpacing: "0.3px",
            }}
          >
            {data.signal}
          </span>
        </div>
        <div
          style={{
            fontSize: "10px",
            color: "#64748b",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6px",
            paddingTop: "4px",
            borderTop: "1px solid #1e293b",
          }}
        >
          <div
            style={{
              padding: "4px",
              background: "rgba(59, 130, 246, 0.05)",
              borderRadius: "4px",
            }}
          >
            <span style={{ color: "#94a3b8" }}>EMA:</span>{" "}
            <span style={{ color: "#60a5fa", fontWeight: "600" }}>
              {data.ema?.close?.toFixed(2)}
            </span>
          </div>
          <div
            style={{
              padding: "4px",
              background: "rgba(139, 92, 246, 0.05)",
              borderRadius: "4px",
            }}
          >
            <span style={{ color: "#94a3b8" }}>ST:</span>{" "}
            <span style={{ color: "#a78bfa", fontWeight: "600" }}>
              {data.supertrend?.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </td>
  );
};

const OptionChainTable = ({ indexName, chainData, indexData }) => {
  if (!chainData || chainData.length === 0) {
    return (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          borderRadius: "16px",
          padding: "50px",
          textAlign: "center",
          color: "#64748b",
          border: "2px solid #334155",
        }}
      >
        <div style={{ fontSize: "16px", marginBottom: "8px" }}>
          Loading {indexName} options...
        </div>
        <div style={{ fontSize: "12px", color: "#475569" }}>
          Waiting for data...
        </div>
      </div>
    );
  }

  const atmStrike = indexData?.ltp
    ? Math.round(indexData.ltp / (indexName === "NIFTY" ? 50 : 100)) *
      (indexName === "NIFTY" ? 50 : 100)
    : null;

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        borderRadius: "16px",
        overflow: "hidden",
        border: "2px solid #334155",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
          padding: "20px 24px",
          borderBottom: "2px solid #334155",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "#fff" }}>
          {indexName} Options
          {indexData && (
            <span
              style={{ fontSize: "15px", marginLeft: "16px", opacity: 0.9 }}
            >
              Spot: {indexData.ltp?.toFixed(2)}
            </span>
          )}
        </h3>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px",
          }}
        >
          <thead>
            <tr style={{ background: "#1e293b" }}>
              <th
                style={{
                  padding: "16px",
                  textAlign: "center",
                  fontWeight: "700",
                  color: "#10b981",
                  borderRight: "2px solid #334155",
                  fontSize: "15px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                CALL
              </th>
              <th
                style={{
                  padding: "16px",
                  textAlign: "center",
                  fontWeight: "700",
                  color: "#60a5fa",
                  background: "#0f172a",
                  fontSize: "15px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                STRIKE
              </th>
              <th
                style={{
                  padding: "16px",
                  textAlign: "center",
                  fontWeight: "700",
                  color: "#ef4444",
                  borderLeft: "2px solid #334155",
                  fontSize: "15px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                PUT
              </th>
            </tr>
          </thead>
          <tbody>
            {chainData.map((row, idx) => {
              const isATM = row.strike === atmStrike;
              return (
                <tr
                  key={row.strike}
                  style={{
                    borderBottom: "1px solid #1e293b",
                    background: isATM
                      ? "rgba(59, 130, 246, 0.1)"
                      : idx % 2 === 0
                      ? "#0f172a"
                      : "#0a0f1a",
                  }}
                >
                  <OptionCell data={row.call} type="call" />
                  <td
                    style={{
                      padding: "16px",
                      textAlign: "center",
                      fontWeight: isATM ? "bold" : "600",
                      fontSize: isATM ? "18px" : "16px",
                      color: isATM ? "#60a5fa" : "#cbd5e1",
                      background: isATM ? "rgba(59, 130, 246, 0.2)" : "#0f172a",
                      border: isATM
                        ? "2px solid rgba(59, 130, 246, 0.4)"
                        : "none",
                      boxShadow: isATM
                        ? "0 0 20px rgba(59, 130, 246, 0.2)"
                        : "none",
                    }}
                  >
                    {row.strike}
                  </td>
                  <OptionCell data={row.put} type="put" />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OptionChainTable;
