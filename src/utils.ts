export const VerboseLogger = (a: string, b: string, c?: number) => {
  console.log(`[%s] \r\t %s \r\t\t\t\t\t\t \x1b[36m ${c}\x1b[0m`, a, b)
}

export const getName = (name: string) => name.startsWith("index.") ? name.replace("index", "") : name === "index" ? "" : name
const regBackets = /\[([^}]*)\]/gi;
export const setBrackets = (x: string) => regBackets.test(x) ? x.replace(regBackets, (_, s) => `:${s}`) : x;
export const getHandlers = (handler: any) => (!Array.isArray(handler)) ? [handler] : handler
export const getMethodKey = (m: string) => {
  let method = m.toLowerCase();
  return (method === "del") ? "delete" : method
}
