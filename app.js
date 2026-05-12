import { ConduitClient } from "@theophilusdev/conduit";
import fs from "fs";

const appstate = fs.readFileSync("./appstate.json", "utf-8");
const client = new ConduitClient({ listenEvents: true });

await client.login({ appstate });

client.on("message:create", async (ctx, next) => {
  if (ctx.body === "ping") {
    await ctx.reply("pong");
    return;
  }

  await next();
});
