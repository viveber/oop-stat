import React from "react";
import { Paper, Typography } from "@material-ui/core";

export default function Diagram() {
  // Элементы разметки, в которые подключается библиотека
  // построения диаграмм
  return (
    <Paper className="paper" elevation={0}>
      <Typography variant="h6" gutterBottom>
        Диаграммы
      </Typography>
      <div id="loader"></div>
      {/* Информация об ошибке */}
      <div id="resultText"></div>
      <div id="preview">
        {/* Заголовок диаграммы */}
        <Typography variant="body1" id="title" gutterBottom>
          Загрузите файл, чтобы построить диаграмму
        </Typography>
        {/* Контейнер для построения */}
        <div id="graphContainer"></div>
      </div>
    </Paper>
  );
}
