const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Trade = require("../models/trade");

beforeEach(async () => {
  await Trade.deleteMany({});
  console.log("cleared");

  for (let trade of helper.initialTrades) {
    let tradeObject = new Trade(trade)
    await tradeObject.save()
  }
})

// trades returned as JSON
test("trades are returned as json", async () => {
  await api
    .get("/api/trades")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

// all trades are returned
test("all trades are returned", async () => {
  const response = await api.get("/api/trades");

  expect(response.body).toHaveLength(helper.initialTrades.length);
});

// filtered trades are returned status: open
test("only trades with status open are returned", async () => {
  const response = await api.get("/api/trades?status=open");

  expect(response.body).toHaveLength(1);

  const trade = response.body[0];
  expect(trade.status).toBe("open");
});

// filtered trades are returned type: long
test("only trades with type long are returned", async () => {
  const response = await api.get("/api/trades?type=long");

  expect(response.body).toHaveLength(2);

  const trade = response.body[0];
  expect(trade.type).toBe("long");
});

// a specific trade is within the returned trades
test("a specific trade is within the returned trades", async () => {
  const response = await api.get("/api/trades");

  const contents = response.body.map((r) => r.asset);
  expect(contents).toContain("BTC/USDT");
});

// a valid trade can be added
test("a valid trade can be added", async () => {
  const newTrade = {
    asset: "ADA/USDT",
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
  };

  await api
    .post("/api/trades")
    .send(newTrade)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  
  const tradesAtEnd = await helper.tradesInDb();
  expect(tradesAtEnd).toHaveLength(helper.initialTrades.length + 1);

  const contents = tradesAtEnd.map((n) => n.asset);
  expect(contents).toContain("ADA/USDT");
});

// trade without asset is not added
test("trade without asset is not added", async () => {
  const newTrade = {
    type: "long",
    pos_size_usd: 1000,
    leverage: 10,
    entry_price: 10000,
    entry_time: "2021-01-01T00:00:00.000Z",
  };

  await api.post("/api/trades").send(newTrade).expect(400);
  const tradesAtEnd = await helper.tradesInDb();
  expect(tradesAtEnd).toHaveLength(helper.initialTrades.length);
});

// status can only be opened or closed
test("status can be only opened or closed", async () => {
  const newTrade = {
    asset: "ADA/USDT",
    type: "long",
    pos_size_usd: 1000,
    leverage: 10,
    entry_price: 10000,
    entry_time: "2021-01-01T00:00:00.000Z",
    exit_price: 11000,
    exit_time: "2021-01-02T00:00:00.000Z",
    pnl_usd: 1000,
    pnl_pct: 0.1,
    status: "zopa",
  }

  await api.post("/api/trades").send(newTrade).expect(400);
  const tradesAtEnd = await helper.tradesInDb();
  expect(tradesAtEnd).toHaveLength(helper.initialTrades.length);
});

// type can only be long or short
test("type can be only long or short", async () => {
  const newTrade = {
    asset: "ADA/USDT",
    type: "zopa",
    pos_size_usd: 1000,
    leverage: 10,
    entry_price: 10000,
    entry_time: "2021-01-01T00:00:00.000Z",
    exit_price: 11000,
    exit_time: "2021-01-02T00:00:00.000Z",
    pnl_usd: 1000,
    pnl_pct: 0.1,
    status: "closed",
  }

  await api.post("/api/trades").send(newTrade).expect(400);
  const tradesAtEnd = await helper.tradesInDb();
  expect(tradesAtEnd).toHaveLength(helper.initialTrades.length);
});

// a specific trade can be viewed
test("a specific trade can be viewed", async () => {
  const tradesAtStart = await helper.tradesInDb();

  const tradeToView = tradesAtStart[0];

  const resultTrade = await api
    .get(`/api/trades/${tradeToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const processedTradeToView = JSON.parse(JSON.stringify(tradeToView));

  expect(resultTrade.body).toEqual(processedTradeToView);
});

// a trade can be deleted
test("a trade can be deleted", async () => {
  const tradesAtStart = await helper.tradesInDb();
  const tradeToDelete = tradesAtStart[0];

  await api.delete(`/api/trades/${tradeToDelete.id}`).expect(204);

  const tradesAtEnd = await helper.tradesInDb();

  expect(tradesAtEnd).toHaveLength(helper.initialTrades.length - 1);

  const contents = tradesAtEnd.map((r) => r.asset);

  expect(contents).not.toContain(tradeToDelete.asset);
});

// a trade can be updated
test("a trade can be updated", async () => {
  const tradesAtStart = await helper.tradesInDb();
  const tradeToUpdate = tradesAtStart[0];

  const updatedTrade = {
    asset: "ADA/USDT",
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
  };

  await api
    .put(`/api/trades/${tradeToUpdate.id}`)
    .send(updatedTrade)
    .expect(201);

  const tradesAtEnd = await helper.tradesInDb();

  expect(tradesAtEnd).toHaveLength(helper.initialTrades.length);

  const contents = tradesAtEnd.map((r) => r.asset);

  expect(contents).toContain("ADA/USDT");
});




afterAll(() => {
  mongoose.connection.close();
});