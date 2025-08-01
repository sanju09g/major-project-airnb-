const mongoose = require("mongoose");
const { cleanupExpiredBookings } = require("./controllers/listing");
const cron = require("node-cron");
require("dotenv").config();

// Connect to DB (reuse same URL as app)
mongoose.connect(process.env.ATLASDB_URL)
  .then(() => console.log("Cron connected to DB"))
  .catch(err => console.log("DB connection failed", err));

cron.schedule("0 0 * * *", async () => {
  console.log("⏰ Running auto-cleanup of expired bookings...");
  try {
    await cleanupExpiredBookings();
    console.log("✅ Cleanup complete.");
  } catch (error) {
    console.error("❌ Cleanup failed:", error);
  }
});
