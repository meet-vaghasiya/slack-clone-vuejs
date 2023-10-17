import { App } from "vue";
import { showInputMaxLength } from "../directives";

export default {
  install: (app) => {
    app.directive("show-max-input-length", showInputMaxLength);
  },
};
