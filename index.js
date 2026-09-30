"use strict";

const bedrock = require("bedrock-protocol");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('<h1>Bedrock AFK Bot Online 24/7</h1>');
});

function createBot() {
  console.log("جاري الاتصال المباشر بسيرفر البيدروك osososoos32.aternos.me...");

  try {
    const client = bedrock.createClient({
      host: "osososoos32.aternos.me",
      port: 19132,
      username: "osos_bot",
      offline: true,
      skipPing: true, // السطر ده هيخلي البوت يتخطى خطأ الـ Discovery ويدخل علطول
      realms: false
    });

    client.on('spawn', () => {
      console.log("مبروك! البوت دخل جوه سيرفر البيدروك بنجاح!");
    });

    client.on('close', () => {
      console.log("البوت فصل، جاري إعادة المحاولة خلال 10 ثوانٍ...");
      setTimeout(createBot, 10000);
    });

    client.on('error', (err) => {
      console.log("حصل خطأ أثناء الاتصال: " + err.message);
    });

  } catch (e) {
    console.log("فشل في بدء اتصال البوت: " + e.message);
    setTimeout(createBot, 10000);
  }
}

app.listen(PORT, () => {
  console.log("لوحة التحكم تعمل بنجاح.");
  createBot();
});
