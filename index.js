"use strict";

const mineflayer = require("mineflayer");
const express = require("express");

// إعدادات Express عشان يفضل السيرفر شغال 24 ساعة ومينامش
const app = express();
const PORT = process.env.PORT || 5000;

let botState = {
  connected: false,
  startTime: Date.now()
};

app.get('/', (req, res) => {
  res.send(`<h1>AFK Bot Dashboard</h1><p>Status: ${botState.connected ? 'Online' : 'Offline'}</p>`);
});

app.get('/health', (req, res) => {
  res.json({ status: botState.connected ? 'connected' : 'offline' });
});

// ============================================================
// الجزء الخاص بإنشاء البوت ودعم سيرفرات البيدروك
// ============================================================
function createBotInstance() {
  console.log("يتم الآن الاتصال بسيرفر البيدروك osososoos32.aternos.me...");
  
  const bot = mineflayer.createBot({
    host: "osososoos32.aternos.me",
    port: 19132,
    username: "osos_bot",
    version: "1.26.51",
    type: "bedrock" // السطر ده اللي بيخليه يدخل سيرفر بيدروك للجوال
  });

  bot.on('spawn', () => {
    botState.connected = true;
    console.log("تم دخول البوت بنجاح جوه السيرفر!");
    
    // حركة القفز التلقائي كل 15 ثانية عشان السيرفر ميطردوش (Anti-AFK)
    setInterval(() => {
      if (botState.connected) {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500);
      }
    }, 15000);
  });

  bot.on('disconnect', (packet) => {
    botState.connected = false;
    console.log("البوت فصل، بيحاول يرجع يدخل تاني دلوقتي...");
    setTimeout(createBotInstance, 5000); 
  });

  bot.on('error', (err) => {
    console.log("حصل خطأ: " + err.message);
  });
}

app.listen(PORT, () => {
  console.log("لوحة التحكم تعمل على بورت " + PORT);
  createBotInstance();
});
