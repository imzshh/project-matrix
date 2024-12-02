let env: Record<string, any> = {};

declare const window: Window & {
  ENV: Record<string, any>;
};

if (typeof window !== "undefined") {
  env = window.ENV || {};
} else {
  env = process.env;
}

export default {
  apiBase: env.RAPID_API_URL || "http://localhost:3000/api",
};
