import { useWebSocket } from "./useWebSocket";
import Header from "./Header";
import IndexCard from "./IndexCard";
import OptionChainTable from "./OptionChainTable";

const App = () => {
  const {
    connected,
    mode,
    messageCount,
    indices,
    options,
    connectionError,
    getIndexData,
    getOptionChainData,
  } = useWebSocket("wss://nifty-backend-claude.onrender.com");

  const niftyData = getIndexData("NIFTY");
  const bankniftyData = getIndexData("BANKNIFTY");
  const sensexData = getIndexData("SENSEX");

  const niftyChain = getOptionChainData("NIFTY");
  const bankniftyChain = getOptionChainData("BANKNIFTY");
  const sensexChain = getOptionChainData("SENSEX");

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <Header
        connected={connected}
        mode={mode}
        messageCount={messageCount}
        indices={indices}
        options={options}
      />

      {/* Connection Error Banner */}
      {!connected && connectionError && (
        <div
          style={{
            background: "#fef2f2",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            borderBottom: "2px solid #fecaca",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                background: "#fee2e2",
                padding: "8px",
                borderRadius: "8px",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#dc2626"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  color: "#dc2626",
                  marginBottom: "2px",
                }}
              >
                Connection Failed
              </div>
              <div style={{ fontSize: "13px", color: "#991b1b" }}>
                {connectionError}
              </div>
            </div>
          </div>
          <button
            onClick={() =>
              window.open(
                "https://nifty-backend-claude.onrender.com/login",
                "_blank"
              )
            }
            style={{
              padding: "10px 20px",
              background: "#dc2626",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              fontSize: "14px",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(220, 38, 38, 0.3)",
              whiteSpace: "nowrap",
            }}
          >
            Login to Backend
          </button>
        </div>
      )}

      <div
        style={{
          padding: "20px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* Indices Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <IndexCard data={niftyData} />
          <IndexCard data={bankniftyData} />
          <IndexCard data={sensexData} />
        </div>

        {/* Option Chains Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <OptionChainTable
            indexName="NIFTY"
            chainData={niftyChain}
            indexData={niftyData}
          />

          <OptionChainTable
            indexName="BANKNIFTY"
            chainData={bankniftyChain}
            indexData={bankniftyData}
          />

          <OptionChainTable
            indexName="SENSEX"
            chainData={sensexChain}
            indexData={sensexData}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
