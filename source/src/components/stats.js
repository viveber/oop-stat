import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import {
  Paper,
  Typography,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
} from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";

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
    const table = [];
    if (jsonState) {
      Object.keys(jsonState).forEach((key) => {
        if (jsonState[key].actors) {
          jsonState[key].actors.forEach(({ value, id }) => {
            table.push({
              name: value,
              parent: key,
              id,
              category: "",
              price: "",
              count: "",
            });
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
          <TableBody>
            {tableData.map(({ name, parent, id, category, price, count }) => {
              return (
                <TableRow key={`${parent}-${id}`}>
                  <TableCell component="th" scope="row">
                    {name}
                  </TableCell>
                  <TableCell>
                    <TextField
                      label="Категория"
                      value={category}
                      onChange={(e) => {
                        let val = e.target && e.target.value;

                        setTableData(
                          tableData.map((item) => {
                            return item.id === id && item.parent === parent
                              ? {
                                  ...item,
                                  category: val,
                                }
                              : item;
                          })
                        );
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      min={0}
                      label="Цена за час"
                      value={price}
                      onChange={(e) => {
                        let val = e.target && e.target.value;
                        let regExpr = new RegExp("^[0-9]+$");
                        if (val !== "" && !regExpr.test(val)) return;

                        setTableData(
                          tableData.map((item) => {
                            return item.id === id && item.parent === parent
                              ? {
                                  ...item,
                                  price: val,
                                }
                              : item;
                          })
                        );
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      label="Кол-во часов"
                      value={count}
                      onChange={(e) => {
                        let val = e.target && e.target.value;
                        let regExpr = new RegExp("^[0-9]+$");
                        if (val !== "" && !regExpr.test(val)) return;
                        setTableData(
                          tableData.map((item) => {
                            return item.id === id && item.parent === parent
                              ? {
                                  ...item,
                                  count: val,
                                }
                              : item;
                          })
                        );
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell component="th" scope="row">
                Итого
              </TableCell>
              <TableCell align="right">
                {tableData.reduce((sum, { price, count }) => {
                  return sum + +price * +count;
                }, 0)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : (
        "Для расчета затрат, прикрепите файл модели"
      )}
      <div className="stats-download">
        <Button
          variant="contained"
          color="default"
          startIcon={<GetAppIcon />}
          // Скачать дополненный json
          onClick={() => {
            var file = new File(
              [JSON.stringify(prepareFile(tableData))],
              "abc.json",
              {
                type: ".json;charset=utf-8",
              }
            );
            saveAs(file);
          }}
        >
          Скачать дополненный json
        </Button>
      </div>
    </Paper>
  );
}

// Дополнение json
function prepareFile(tableData) {
  let json = window.json;
  const parents = [];
  tableData.forEach(({ parent }) => {
    if (!parents.includes(parent)) parents.push(parent);
  });
  parents.forEach((parent) => {
    json = {
      ...json,
      [parent]: {
        ...json[parent],
        actors: json[parent].actors.map((actor) => {
          const res = {
            ...actor,
            ...tableData.find(
              ({ id, parent: curParent }) =>
                id === actor.id && curParent === parent
            ),
          };
          delete res.parent;
          delete res.name;
          return res;
        }),
      },
    };
  });
  return json;
}
