import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css";

export default {
  install(app, options) {
    app.use(FloatingVue); //todo : change default style later. remove all default style and give manual style in all.
  },
};
