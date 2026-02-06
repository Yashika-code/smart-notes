import { createLog } from "../data/store.js";

const LIMIT = Number(process.env.RATE_LIMIT || 5);
const TIME = Number(process.env.RATE_TIME || 60);

function allowCreate() {
  const now = Date.now();

  // Remove old timestamps
  for (let i = createLog.length - 1; i >= 0; i--) {
    if (now - createLog[i] > TIME * 1000) {
      createLog.splice(i, 1);
    }
  }

  if (createLog.length >= LIMIT) return false;

  createLog.push(now);
  return true;
}

export default function rateLimit(req, res, next) {
  if (!allowCreate()) {
    return res.status(429).json({
      success: false,
      message: `Rate limit exceeded: max ${LIMIT} note creations per ${TIME} seconds`,
    });
  }

  next();
}
