import React from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import image from "./../how.jpg";

export default function Info() {
  return (
    <ExpansionPanel elevation={0}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h6">Как это работает?</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div className="info">
          <div>
            <ol>
              <li>
                Загрузите модель IDEF0, по аналогии с тестовой, в формате json.
              </li>
              <li>Из модели загрузятся все элементы "actors".</li>
              <li>
                Далее вам будет доступна возможность заполнить три поля
                "Категория", "Цена за час", "Кол-во часов" или же оставить их
                пустыми.
              </li>
              <li>Скачайте дополненную модель IDEF0 в формате json.</li>
            </ol>
          </div>
          <div className="info-img__container">
            <img className="info-image" src={image} alt="Пример работы" />
          </div>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
