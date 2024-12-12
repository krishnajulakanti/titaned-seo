import express from "express";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "../src/App.js";
import morgan from "morgan";

const app = express();

// Serve static files
app.use(express.static(path.resolve(__dirname, "../build")));

// Log requests
app.use(morgan("dev"));

const renderOnServer = (req, res) => {
  const entryPoint = ["/main.js"];

  const { pipe, abort: _abort } = ReactDOMServer.renderToPipeableStream(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>,
    {
      bootstrapScripts: entryPoint,
      onShellReady() {
        res.statusCode = 200;
        res.setHeader("Content-type", "text/html");
        pipe(res);
      },
      onShellError() {
        res.statusCode = 500;
        res.send("<!doctype html><p>Server error occurred</p>");
      },
      onError(error) {
        console.error("Rendering error:", error);
      },
    }
  );
};

app.get(["/", "/about", "/users", "/delayusers"], (req, res) => {
  // Pre-render these routes on the server
  renderOnServer(req, res);
});

app.get("*", (req, res) => {
  res.status(200).set("Content-Type", "text/html").send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>React App</title>
      </head>
      <body>
        <div id="root"></div>
        <script src="/static/js/main.js"></script>
      </body>
    </html>
  `);
});

app.listen(3002, () => {
  console.log("App is running on http://localhost:3002");
});
