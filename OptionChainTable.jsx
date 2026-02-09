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
          color: "#94a3b8",
          background: "#fafafa",
        }}
      >
        -
      </td>
    );
  }

  const signalColor = getSignalColor(data.signal);

  // Background based on signal
  let cellBackground = "#fff";
  if (data.signal === "BULL") {
    cellBackground = "#f0fdf4"; // light green
  } else if (data.signal === "BEAR") {
    cellBackground = "#fef2f2"; // light red
  } else if (data.signal === "PAUSED") {
    cellBackground = "#fffbeb"; // light amber
  }

  return (
    <td
      style={{
        padding: "12px 16px",
        borderLeft: type === "call" ? "2px solid #e2e8f0" : "none",
        borderRight: type === "put" ? "2px solid #e2e8f0" : "none",
        background: cellBackground,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{ fontSize: "16px", fontWeight: "bold", color: "#0f172a" }}
          >
            {data.ltp?.toFixed(2)}
          </span>
          <span
            style={{
              fontSize: "10px",
              fontWeight: "bold",
              color: signalColor,
              padding: "3px 8px",
              borderRadius: "4px",
              background: `${signalColor}20`,
              border: `1px solid ${signalColor}`,
              textTransform: "uppercase",
              letterSpacing: "0.3px",
            }}
          >
            {data.signal}
          </span>
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
          background: "#fff",
          borderRadius: "12px",
          padding: "40px",
          textAlign: "center",
          color: "#64748b",
          border: "2px solid #e2e8f0",
        }}
      >
        <div
          style={{ fontSize: "15px", marginBottom: "6px", fontWeight: "600" }}
        >
          Loading {indexName} options...
        </div>
        <div style={{ fontSize: "12px", color: "#94a3b8" }}>
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
        background: "#fff",
        borderRadius: "12px",
        overflow: "hidden",
        border: "2px solid #e2e8f0",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
          padding: "16px 20px",
          borderBottom: "2px solid #e2e8f0",
        }}
      >
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <span>{indexName} Options</span>
          {indexData && (
            <span style={{ fontSize: "14px", opacity: 0.9 }}>
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
            <tr style={{ background: "#f8fafc" }}>
              <th
                style={{
                  padding: "14px",
                  textAlign: "center",
                  fontWeight: "700",
                  color: "#10b981",
                  borderRight: "2px solid #e2e8f0",
                  fontSize: "14px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                CALL
              </th>
              <th
                style={{
                  padding: "14px",
                  textAlign: "center",
                  fontWeight: "700",
                  color: "#3b82f6",
                  background: "#fff",
                  fontSize: "14px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                STRIKE
              </th>
              <th
                style={{
                  padding: "14px",
                  textAlign: "center",
                  fontWeight: "700",
                  color: "#ef4444",
                  borderLeft: "2px solid #e2e8f0",
                  fontSize: "14px",
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
                    borderBottom: "1px solid #f1f5f9",
                    background: isATM
                      ? "#dbeafe"
                      : idx % 2 === 0
                      ? "#fff"
                      : "#fafafa",
                  }}
                >
                  <OptionCell data={row.call} type="call" />
                  <td
                    style={{
                      padding: "14px",
                      textAlign: "center",
                      fontWeight: isATM ? "bold" : "600",
                      fontSize: isATM ? "17px" : "15px",
                      color: isATM ? "#3b82f6" : "#0f172a",
                      background: isATM ? "#bfdbfe" : "#fff",
                      border: isATM ? "2px solid #3b82f6" : "none",
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
