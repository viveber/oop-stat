import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

export default function About() {
  return (
    <Paper className="paper" elevation={0}>
      <Typography variant="h4" gutterBottom>
        ABC Project
      </Typography>
      <Typography variant="body1" gutterBottom>
        Данный проект предоставляет полные данные для расчета по методике ABC на
        основе модели IDEF0 и UML CASE (в JSON формате).
      </Typography>
      <Typography variant="body1" gutterBottom>
        Модель должна быть дополнена для построения ABC таблицы.
      </Typography>
    </Paper>
  );
}
