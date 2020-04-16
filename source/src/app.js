import React from "react";
import "./app.css";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import About from "./components/about";
import JSONUpload from "./components/json-upload";
import Diagram from "./components/diagram";
import Stats from "./components/stats";
import { Button, ButtonGroup } from "@material-ui/core";
import Info from "./components/info";

function App() {
  return (
    <div className="app">
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {/* Информация о проекте */}
            <About />
          </Grid>
          <Grid item xs={12}>
            {/* Подробная информация о проекте */}
            <Info />
          </Grid>
          <Grid item xs={12}>
            {/* Блок загрузки файла модели */}
            <JSONUpload />
          </Grid>
          <Grid item xs={12}>
            {/* Блок отображения диаграммы */}
            <Diagram />
          </Grid>
          <Grid item xs={12}>
            {/* Расчет стоимости ресурсов */}
            <Stats />
          </Grid>
          <Grid item xs={12} className="bottom-btns">
            <ButtonGroup variant="text" aria-label="text primary button group">
              <a href="/oop-stat/test.json" download>
                <Button>Скачать тестовый json</Button>
              </a>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
