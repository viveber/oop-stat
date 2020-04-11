import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

export default function Stats() {
  // Данные для отображения
  const [tableData, setTableData] = useState();
  // Данные из прикрепленного файла
  const [jsonState, setJsonState] = useState(window.json);

  useEffect(() => {
    // Для рендеринга расчетной таблицы производится подписка 
    // на глобальную переменную, значение которой присваивается во время
    // чтения файла
    setInterval(() => {
      if (window.json !== jsonState) {
        setJsonState(window.json);
      }
    }, 300);
  }, []);

  useEffect(() => {
    // Обработка данных для отображения
    if (jsonState) {
      const table = { employee: 0, tools: 0 };
      Object.keys(jsonState).forEach((key) => {
        if (jsonState[key].actors) {
          jsonState[key].actors.forEach(({ count, price, category }) => {
            table[category] = table[category] + count * price;
          });
        }
      });

      setTableData(table);
    }
  }, [jsonState]);

  return (
    <Paper className="paper" elevation={0}>
      <Typography variant="h6" gutterBottom>
        Затраты
      </Typography>
      {tableData ? (
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Наименование</TableCell>
              <TableCell align="right">Затраты</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Работники
              </TableCell>
              <TableCell align="right">{tableData.employee} ₽</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Инструменты
              </TableCell>
              <TableCell align="right">{tableData.tools} ₽</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Итого
              </TableCell>
              <TableCell align="right">
                {tableData.employee + tableData.tools} ₽
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : (
        "Для расчета затрат, прикрепите файл модели"
      )}
    </Paper>
  );
}
