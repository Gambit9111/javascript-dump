const tradesRouter = require("express").Router();
const Trade = require("../models/trade");
const User = require("../models/user");
const jwt = require('jsonwebtoken')

// GET /api/trades
tradesRouter.get("/", async (request, response) => {

  // if there are query parameters, we want to filter the trades
  // otherwise, we want to return all trades
  if (Object.keys(request.query).length > 0) {
    // filter trades
    const trades = await Trade.find(request.query).populate("user", { username: 1, name: 1 });
    response.status(200).json(trades);

  } else {
    // return all trades
    const trades = await Trade.find({}).populate("user", { username: 1, name: 1 });
    response.status(200).json(trades);
  }
});

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

// POST /api/trades
tradesRouter.post("/", async (request, response) => {
  const body = request.body;
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const trade = new Trade({
    asset: body.asset,
    type: body.type,
    pos_size_usd: body.pos_size_usd,
    leverage: body.leverage,
    entry_price: body.entry_price,
    entry_time: body.entry_time,
    exit_price: body.exit_price,
    exit_time: body.exit_time,
    pnl_usd: body.pnl_usd,
    pnl_pct: body.pnl_pct,
    status: body.status,
    user: user.id,
  });

  const savedTrade = await trade.save();
  user.trades = user.trades.concat(savedTrade.id)
  response.status(201).json(savedTrade);
});

// GET /api/trades/:id
tradesRouter.get("/:id", async (request, response) => {
  const trade = await Trade.findById(request.params.id);
  if (trade) {
    response.status(200).json(trade);
  } else {
    response.status(404).end();
  }
});

// DELETE /api/trades/:id
tradesRouter.delete("/:id", async (request, response) => {

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const trade = await Trade.findById(request.params.id);

  if (trade.user.toString() === user.id.toString()) {
    await Trade.findByIdAndRemove(request.params.id);
    response.status(204).end();}
  else {
    response.status(401).json({ error: 'unauthorized' })
  }
});

// PUT /api/trades/:id
tradesRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const trade = await Trade.findById(request.params.id);

  if (trade.user.toString() === user.id.toString()) {
    const trade = {
      asset: body.asset,
      type: body.type,
      pos_size_usd: body.pos_size_usd,
      leverage: body.leverage,
      entry_price: body.entry_price,
      entry_time: body.entry_time,
      exit_price: body.exit_price,
      exit_time: body.exit_time,
      pnl_usd: body.pnl_usd,
      pnl_pct: body.pnl_pct,
      status: body.status,
    };
    const updatedTrade = await Trade.findByIdAndUpdate(request.params.id, trade, {
      new: true,});
    response.status(201).json(updatedTrade);
  }
  else {
    response.status(401).json({ error: 'unauthorized' })
  }
});

module.exports = tradesRouter;