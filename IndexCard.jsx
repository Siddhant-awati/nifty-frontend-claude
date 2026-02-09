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

const IndexCard = ({ data }) => {
  if (!data) return null;

  const signalColor = getSignalColor(data.signal);

  return (
    <div
      style={{
        background: "#fff",
        border: "2px solid #e2e8f0",
        borderRadius: "10px",
        padding: "12px 16px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s, box-shadow 0.2s",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
      }}
    >
      <h2
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          color: "#0f172a",
          minWidth: "120px",
        }}
      >
        {data.symbol}
      </h2>

      <div
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#0f172a",
          flex: 1,
          textAlign: "center",
        }}
      >
        {data.ltp?.toFixed(2)}
      </div>

      <div
        style={{
          padding: "5px 14px",
          borderRadius: "6px",
          background: `${signalColor}15`,
          border: `2px solid ${signalColor}`,
          color: signalColor,
          fontWeight: "bold",
          fontSize: "12px",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          minWidth: "85px",
          textAlign: "center",
        }}
      >
        {data.signal}
      </div>
    </div>
  );
};

export default IndexCard;
