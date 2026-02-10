const OptionCell = ({ data, type }) => {
  if (!data) {
    return <td className="cell-empty">-</td>;
  }

  const getSignalClass = (signal) => {
    switch (signal) {
      case "BULL":
        return "option-signal-bull";
      case "BEAR":
        return "option-signal-bear";
      case "PAUSED":
        return "option-signal-paused";
      default:
        return "option-signal-default";
    }
  };

  const getCellBackgroundClass = (signal) => {
    switch (signal) {
      case "BULL":
        return "cell-bull";
      case "BEAR":
        return "cell-bear";
      case "PAUSED":
        return "cell-paused";
      default:
        return "";
    }
  };

  const signalClass = getSignalClass(data.signal);
  const cellClass = `option-cell ${
    type === "call" ? "cell-call" : "cell-put"
  } ${getCellBackgroundClass(data.signal)}`;

  return (
    <td className={cellClass}>
      <div className="option-content">
        <div className="option-row">
          <span className="option-ltp">{data.ltp?.toFixed(2)}</span>
          <span className={`option-signal-badge ${signalClass}`}>
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
          <span>
            {indexName} Options : {indexData.ltp}
          </span>
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
            {chainData.map((row, idx) => {
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
