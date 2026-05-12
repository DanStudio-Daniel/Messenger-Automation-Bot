import { ConduitClient } from "@theophilusdev/conduit";
import fs from "fs";
import express from "express";

// Initialize Express
const app = express();
const PORT = 3000;

// Initialize Bot
const appstate = fs.readFileSync("./appstate.json", "utf-8");
const client = new ConduitClient({ listenEvents: true });

// Login bot
await client.login({ appstate });

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

// Start Express server
app.listen(PORT, () => {
  console.log(`✅ Bot running & Web available at http://localhost:${PORT}`);
});
  
