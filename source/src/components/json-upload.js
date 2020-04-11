import React from "react";
import { Paper, Button } from "@material-ui/core";
import DescriptionIcon from "@material-ui/icons/Description";

export default function JSONUpload() {
  return (
    <Paper className="paper json-upload" elevation={0}>
      <Button
        variant="contained"
        color="default"
        component="label"
        startIcon={<DescriptionIcon />}
      >
        <input
          accept=".json,application/json"
          style={{ display: "none" }}
          id="file"
          multiple
          type="file"
        />
        Загрузите модель в формате json
      </Button>
      <div id="test" className="json-upload__sep">
        или
      </div>{" "}
      <Button
        size="small"
        onClick={() => {
          window.location.search =
            "?path=/oop-stat/test.json";
        }}
      >
        используйте тестовый json
      </Button>
    </Paper>
  );
}
