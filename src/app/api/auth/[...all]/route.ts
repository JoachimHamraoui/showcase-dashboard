import { auth } from "@/lib/auth"; // path to your auth file
import { toNextJsHandler } from "better-auth/next-js";
const authHandlers = toNextJsHandler(auth);
export const { GET } = authHandlers;
import arcjet, {
  BotOptions,
  shield,
  SlidingWindowRateLimitOptions,
} from "@arcjet/next";

import { findIp } from "@arcjet/ip";

const aj = arcjet({
  key: process.env.ARCJET_API_KEY as string,
  characteristics: ["userIdOrIp"],
  rules: [shield({ mode: "LIVE" })],
});

const botSettings = { mode: "LIVE", allow: [] } satisfies BotOptions;
const restrictiveRateLimitSettings = {
  mode: "LIVE",
  max: 10,
  interval: "10m",
} as SlidingWindowRateLimitOptions<[]>;
const laxRateLimitSettings = {
  mode: "LIVE",
  max: 60,
  interval: "1m",
} as SlidingWindowRateLimitOptions<[]>;

const emailSettings = {
  mode: "LIVE",
  block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
};
export async function POST(req: Request) {
  return authHandlers.POST(req);
}

async function checkArcjet(req: Request) {
  const body = (await req.json()) as unknown;
  const session = await auth.api.getSession({ headers: req.headers });
  const userIdOrIp = session?.user.id || findIp(req) || "127.0.0.1";
}


