export function waitSeconds(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(void 0);
    }, ms);
  });
}