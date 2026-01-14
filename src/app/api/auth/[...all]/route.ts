import { auth } from "@/lib/auth"; // path to your auth file
import { toNextJsHandler } from "better-auth/next-js";
const authHandlers = toNextJsHandler(auth);
export const { GET } = authHandlers;
import arcjet, {
  BotOptions,
  detectBot,
  EmailOptions,
  protectSignup,
  shield,
  slidingWindow,
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
} satisfies EmailOptions;
export async function POST(req: Request) {
  const clonedRequest = req.clone()
  const decision = await checkArcjet(req);
  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return new Response(
        JSON.stringify({
          error: "Rate limit exceeded",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else if (decision.reason.isEmail()) {
      let message: string;

      if (decision.reason.emailTypes.includes("INVALID")) {
        message = "Please provide a valid email address.";
      } else if (decision.reason.emailTypes.includes("NO_MX_RECORDS")) {
        message = "Email domain is not valid.";
      } else if (decision.reason.emailTypes.includes("DISPOSABLE")) {
        message = "Disposable email addresses are not allowed.";
      } else {
        message = "Invalid email error.";
      }
      return Response.json({ message }, { status: 400 });
    } else {
      return new Response(null, {
        status: 403,
      });
    }
  }
  return authHandlers.POST(clonedRequest);
}

async function checkArcjet(req: Request) {
  const body = (await req.json()) as unknown;
  const session = await auth.api.getSession({ headers: req.headers });
  const userIdOrIp = session?.user.id || findIp(req) || "127.0.0.1";

  if (req.url.endsWith("/auth/sign-up")) {
    if (
      body &&
      typeof body === "object" &&
      "email" in body &&
      typeof body.email === "string"
    ) {
      aj.withRule(
        protectSignup({
          email: emailSettings,
          rateLimit: laxRateLimitSettings,
          bots: botSettings,
        })
      ).protect(req, {
        email: body.email,
        userIdOrIp,
      });
    } else {
      return aj
        .withRule(detectBot(botSettings))
        .withRule(slidingWindow(restrictiveRateLimitSettings))
        .protect(req, {
          userIdOrIp,
        });
    }
  }

  return aj
    .withRule(detectBot(botSettings))
    .withRule(slidingWindow(laxRateLimitSettings))
    .protect(req, {
      userIdOrIp,
    });
}
