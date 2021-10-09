export const VerboseLogger = (a: string, b: string, c?: number) => {
  console.log(c, a, `\r\t\t\t\t\t`, `\x1b[36m [${b}] \x1b[0m`);
}

export const getName = (name: string) => name.startsWith("index.") ? name.replace("index", "") : name === "index" ? "" : name
const regBackets = /\[([^}]*)\]/gi;
export const setBrackets = (x: string) => regBackets.test(x) ? x.replace(regBackets, (_, s) => `:${s}`) : x;
export const getHandlers = (handler: any) => (!Array.isArray(handler)) ? [handler] : handler
export const getMethodKey = (m: string) => {
  let method = m.toLowerCase();
  return (method === "del") ? "delete" : method
}
