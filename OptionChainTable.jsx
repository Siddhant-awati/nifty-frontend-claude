// ================= OPTION CELL =================
const OptionCell = ({ data, type }) => {
  if (!data) {
    return <td className="cell-empty">-</td>;
  }

  // ---------- ACTION COLOR ----------
  const getActionClass = (action) => {
    switch (action) {
      case "TRADE/HOLD":
        return "action-trade";
      case "AVOID":
        return "action-avoid";
      case "RISKY/CHOPPY":
        return "action-risky";
      default:
        return "action-wait";
    }
  };

  // ---------- STRENGTH COLOR ----------
  const getStrengthClass = (strength = 0) => {
    if (strength >= 75) return "strength-high";
    if (strength >= 50) return "strength-medium";
    return "strength-low";
  };

  // ---------- MARKET COLOR ----------
  const getMarketClass = (state) =>
    state === "TRENDING" ? "market-trending" : "market-sideways";

  return (
    <td className={`option-cell ${type === "call" ? "cell-call" : "cell-put"}`}>
      <div className="option-grid">
        {/* PRICE */}
        <div className="option-field">
          <div className="option-field-label">Price</div>
          <div className="option-field-value option-ltp">
            ₹{data.ltp?.toFixed(2)}
          </div>
        </div>

        {/* ACTION */}
        <div className="option-field">
          <div className="option-field-label">Trade Decision</div>
          <div
            className={`option-field-value option-action ${getActionClass(
              data.action
            )}`}
          >
            {data.action || "WAIT"}
          </div>
        </div>

        {/* STRENGTH */}
        <div className="option-field">
          <div className="option-field-label">Strength</div>
          <div
            className={`option-field-value option-strength ${getStrengthClass(
              data.signalStrength
            )}`}
          >
            {data.signalStrength || 0}%
          </div>
        </div>

        {/* MARKET STATE */}
        <div className="option-field">
          <div className="option-field-label">Market</div>
          <div
            className={`option-field-value option-market ${getMarketClass(
              data.marketState
            )}`}
          >
            {data.marketState || "-"}
          </div>
        </div>
      </div>
    </td>
  );
};

// ================= OPTION CHAIN TABLE =================
const OptionChainTable = ({ indexName, chainData, indexData }) => {
  if (!chainData || chainData.length === 0) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-title">Loading {indexName} options...</div>
        <div className="loading-subtitle">Waiting for data...</div>
      </div>
    );
  }

  const atmStrike = indexData?.ltp
    ? Math.round(indexData.ltp / (indexName === "NIFTY" ? 50 : 100)) *
      (indexName === "NIFTY" ? 50 : 100)
    : null;

  return (
    <div className="option-chain-container">
      <div className="option-chain-header">
        <h3 className="option-chain-title">
          {indexName} Options : {indexData.ltp}
        </h3>
      </div>

      <div className="option-chain-table-wrapper">
        <table className="option-chain-table">
          <thead>
            <tr>
              <th className="th-call">CALL</th>
              <th className="th-strike">STRIKE</th>
              <th className="th-put">PUT</th>
            </tr>
          </thead>

          <tbody>
            {chainData.map((row) => {
              const isATM = row.strike === atmStrike;
              const rowClass = isATM ? "row-atm" : "";

              return (
                <tr key={row.strike} className={rowClass}>
                  <OptionCell data={row.call} type="call" />

                  <td
                    className={isATM ? "strike-cell strike-atm" : "strike-cell"}
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
