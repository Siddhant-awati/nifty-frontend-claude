const IndexCard = ({ data }) => {
  if (!data) return null;

  const getSignalClass = (signal) => {
    switch (signal) {
      case "BULL":
        return "signal-bull";
      case "BEAR":
        return "signal-bear";
      case "PAUSED":
        return "signal-paused";
      default:
        return "signal-default";
    }
  };

  const signalClass = getSignalClass(data.signal);

  return (
    <div className="index-card">
      <h2 className="index-symbol">{data.symbol}</h2>

      <div className="index-ltp">{data.ltp?.toFixed(2)}</div>

      <div className={`index-signal-badge ${signalClass}`}>{data.signal}</div>
    </div>
  );
};

export default IndexCard;
