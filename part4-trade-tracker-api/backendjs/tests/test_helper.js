const Trade = require("../models/trade");

const initialTrades = [
  // OPENED TRADE
  {
    asset: "BTC/USDT",
    type: "long",
    pos_size_usd: 1000,
    leverage: 10,
    entry_price: 10000,
    entry_time: "2021-01-01T00:00:00.000Z",
    exit_price: null,
    exit_time: null,
    pnl_usd: null,
    pnl_pct: null,
    status: "open",
  },
  // CLOSED TRADE
  {
    asset: "ETH/USDT",
    type: "long",
    pos_size_usd: 1000,
    leverage: 10,
    entry_price: 10000,
    entry_time: "2021-01-01T00:00:00.000Z",
    exit_price: 11000,
    exit_time: "2021-01-02T00:00:00.000Z",
    pnl_usd: 1000,
    pnl_pct: 0.1,
    status: "closed",
  },
  // SHORT TRADE
  {
    asset: "XRP/USDT",
    type: "short",
    pos_size_usd: 1000,
    leverage: 10,
    entry_price: 10000,
    entry_time: "2021-01-01T00:00:00.000Z",
    exit_price: 9000,
    exit_time: "2021-01-02T00:00:00.000Z",
    pnl_usd: -1000,
    pnl_pct: -0.1,
    status: "closed",
  },
];

const nonExistingId = async () => {
  const trade = new Trade({
    asset: "BTC/USDT",
    type: "short",
    pos_size_usd: 1000,
    leverage: 10,
    entry_price: 10000,
    entry_time: "2021-01-01T00:00:00.000Z",
    exit_price: 9000,
    exit_time: "2021-01-02T00:00:00.000Z",
    pnl_usd: -1000,
    pnl_pct: -0.1,
    status: "closed",
  });
  await trade.save();
  await trade.remove();

  return trade._id.toString();
};

const tradesInDb = async () => {
  const trades = await Trade.find({});
  return trades.map((trade) => trade.toJSON());
};

module.exports = {
  initialTrades,
  nonExistingId,
  tradesInDb,
};