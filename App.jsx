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
    connectionError,
    getIndexData,
    getOptionChainData,
    getAllOptions,
  } = useWebSocket("wss://nifty-backend-claude.onrender.com");

  const niftyData = getIndexData("NIFTY");
  const bankniftyData = getIndexData("BANKNIFTY");
  const sensexData = getIndexData("SENSEX");

  const niftyChain = getOptionChainData("NIFTY");
  const bankniftyChain = getOptionChainData("BANKNIFTY");
  const sensexChain = getOptionChainData("SENSEX");

  const allOptions = getAllOptions();

  // DEBUG: Log the actual data to console
  if (niftyData && messageCount % 10 === 1) {
    // Log every 10 messages to avoid spam
    console.log("=== NIFTY INDEX DATA ===");
    console.log("LTP:", niftyData.ltp);
    console.log("EMA High:", niftyData.ema?.high);
    console.log("EMA Low:", niftyData.ema?.low);
    console.log("Supertrend:", niftyData.supertrend);
    console.log("Signal:", niftyData.signal);
    console.log("Signal Logic Check:");
    console.log("  LTP > EMA High?", niftyData.ltp > niftyData.ema?.high);
    console.log("  LTP < EMA Low?", niftyData.ltp < niftyData.ema?.low);
    console.log("  LTP > Supertrend?", niftyData.ltp > niftyData.supertrend);
    console.log("  LTP < Supertrend?", niftyData.ltp < niftyData.supertrend);
    console.log("Full data:", niftyData);
  }

  // DEBUG: Log sample option data
  if (niftyChain.length > 0 && messageCount % 10 === 1) {
    const sampleCall = niftyChain[0]?.call;
    if (sampleCall) {
      console.log("=== SAMPLE CALL OPTION ===");
      console.log("Symbol:", sampleCall.symbol);
      console.log("LTP:", sampleCall.ltp);
      console.log("EMA Close:", sampleCall.ema?.close);
      console.log("Supertrend:", sampleCall.supertrend);
      console.log("Signal:", sampleCall.signal);
      console.log("Signal Logic Check:");
      console.log("  LTP > EMA?", sampleCall.ltp > sampleCall.ema?.close);
      console.log("  LTP < EMA?", sampleCall.ltp < sampleCall.ema?.close);
      console.log(
        "  LTP > Supertrend?",
        sampleCall.ltp > sampleCall.supertrend
      );
      console.log(
        "  LTP < Supertrend?",
        sampleCall.ltp < sampleCall.supertrend
      );
      console.log("Full data:", sampleCall);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#020617" }}>
      <Header
        connected={connected}
        mode={mode}
        messageCount={messageCount}
        indices={indices}
        options={allOptions}
      />

      {/* Connection Error Banner */}
      {!connected && connectionError && (
        <div
          style={{
            background: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
            padding: "16px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            borderBottom: "2px solid #7f1d1d",
            boxShadow: "0 4px 6px rgba(220, 38, 38, 0.3)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                padding: "8px",
                borderRadius: "8px",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
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
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#fff",
                  marginBottom: "2px",
                }}
              >
                Connection Failed
              </div>
              <div style={{ fontSize: "13px", color: "#fecaca" }}>
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
              padding: "10px 24px",
              background: "#fff",
              color: "#dc2626",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              fontSize: "14px",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
              whiteSpace: "nowrap",
            }}
          >
            Login to Backend
          </button>
        </div>
      )}

      <div style={{ padding: "24px", maxWidth: "1920px", margin: "0 auto" }}>
        {/* Indices Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px",
            marginBottom: "32px",
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
            gap: "24px",
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
