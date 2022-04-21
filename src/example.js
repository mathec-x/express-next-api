const pt = require('path');
const fs = require('fs');
const Router = require('express').Router();

const isProduction = process.env.NODE_ENV === 'production';

const regBackets = /\[([^]*)\]/gi;
const setBrackets = (x) => regBackets.test(x) ? x.replace(regBackets, (_, s) => `:${s}`) : x;

const readdirRecursive = (path, rel = [""]) => {
    const res = [];
    for (const file of fs.readdirSync(path)) {
        const fspath = pt.join(path, file);
        if (fs.statSync(fspath).isDirectory()) {
            res.push(...readdirRecursive(fspath, [...rel, file]));
        }
        else {
            res.push({
                name: file,
                path: path,
                relative: `${rel.join("/")}/${file}`
            });
        }
    }
    return res;
}

const defaultOptions = {
    main: require.main.filename
};

const fsRoutes = function (options = defaultOptions) {
    const base = pt.join(pt.dirname(options.main), "routes");

    const logger = {};
    const files = readdirRecursive(base); // função recussiva para ler diretório

    const routes = [];
    // for
    for (let i = 0; i < files.length; ++i) {
        const file = files[i];
        const parse = pt.parse(file.relative);

        if ([".js", ".ts"].includes(parse.ext.toLocaleLowerCase())
            && !parse.name.startsWith('_')
            && !parse.name.endsWith('.d')
            && !parse.dir.startsWith('/_')) {

            const dir = parse.dir === "/" ? "" : parse.dir.substring(1);
            const name = parse.name.startsWith("index.")
                ? parse.name.replace("index", "")
                : parse.name === "index"
                    ? ""
                    : "/" + parse.name;

            const url = setBrackets(dir) + setBrackets(name);
            const exported = require(pt.join(file.path, file.name));
            routes.push({ url, exported });
        }
    }

    // for of
    for (const route of routes) {
        const baseUrl = "/" + route.url;

        for (const [m, handler] of Object.entries(route.exported)) {
            const methodkey = m.toLowerCase();
            const method = (methodkey === "del") ? "delete" : methodkey;
            if (!["get", "put", "post", "delete", "all"].includes(method)) continue;

            if (!isProduction)
                logger[baseUrl] = logger[baseUrl] ? logger[baseUrl].concat(method) : [method];

            Router[method](baseUrl, ...Array.isArray(handler) ? handler : [handler]);

        }
    }

    // for in
    if (!isProduction) {
        console.log("\n", "\x1b[32m");
        console.log("METHODS", `----------------`, "ROUTE", "---------------", '\x1b[0m');
        for (const key in logger) {
            console.log(`\x1b[36m[${logger[key].join(',')}]`, '\x1b[0m', `\r\t\t\t`, key);
        }
        console.log("\n");
    }

    return Router;
}

module.exports = fsRoutes;