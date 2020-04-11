import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
import * as serviceWorker from "./serviceWorker";

  // Подключение библиотеки отрисовки диаграмм по тестовому файлу
  // или переданному в ссылке с параметром path
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
  () => {
    const script = document.createElement("script");
    script.innerHTML = `
    function getParameterByName(name) {
      var url = window.location.href;
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return "";
      return decodeURIComponent(results[2]);
    }

    var loader = document.getElementById("loader");
    var preview = document.getElementById("preview");
    var resultText = document.getElementById("resultText");
    var container = document.getElementById("graphContainer");
    var title = document.getElementById("title");
    var visualizer = new Visualizer(
      loader,
      resultText,
      container,
      preview,
      title
    );
    var fileEl = document.getElementById("file");
    if(fileEl) {
      fileEl.addEventListener(
        "change",
        {
          handleEvent: function (event) {
            window.history.replaceState(null, null, window.location.pathname);
            visualizer.showDiagramFromEvent(event);
          },
        },
        false
      );
    }
    var path = getParameterByName("path");
    if (path != null) {
      visualizer.showDiagramFromPath(path);
    } else {
      visualizer.showDiagramFromPath('/oop-stat/test.json');
    }`;
    document.body.appendChild(script);
  }
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
