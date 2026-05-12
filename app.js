const { ConduitClient } = require("@theophilusdev/conduit");
const fs = require("fs");
const express = require("express");

// Initialize Express
const app = express();
const PORT = process.env.PORT || 10000;

// Initialize Bot
const appstate = fs.readFileSync("./appstate.json", "utf-8");
const client = new ConduitClient({ listenEvents: true });

// Login bot
client.login({ appstate });

// Message listener
client.on("message:create", async (ctx, next) => {
  if (ctx.body === "ping") {
    await ctx.reply("pong");
    return;
  }
  await next();
});

// Express route — shows bot status
app.get("/", (req, res) => {
  res.send("<h1>botonline</h1>");
});

// Start Express server — IMPORTANT: bind to 0.0.0.0
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Bot running & Web available on port ${PORT}`);
});
    
