import { x, p } from './chunks/92f252a2.js';

var style = ":host {\n  width: var(--run-perf-spinner-width);\n  height: calc(var(--run-perf-spinner-width) / 2);\n  display: block;\n  position: relative;\n}\n\n.dot {\n  position: absolute;\n  top: 0px;\n  width: 50%;\n  height: 100%;\n  border-radius: 50%;\n  box-sizing: border-box\n}\n\n.dot.-z2 {\n    left: 0px;\n    background: currentColor;\n    animation: move-1 var(--run-perf-spinner-speed)\n      cubic-bezier(0, 0.34, 1, 0.64) infinite;\n  }\n\n.dot.-z1 {\n    right: 0px;\n    background: white;\n    border: calc(var(--run-perf-spinner-width) * 0.1) solid currentColor;\n    animation: move-2 var(--run-perf-spinner-speed)\n      cubic-bezier(0, 0.34, 1, 0.64) infinite;\n  }\n\n@keyframes move-1 {\n  0% {\n    transform: translateX(0%);\n    z-index: 1;\n  }\n  49.9% {\n    z-index: 1;\n  }\n  50% {\n    transform: translateX(100%);\n    z-index: 2;\n  }\n  100% {\n    transform: translateX(0%);\n    z-index: 2;\n  }\n}\n\n@keyframes move-2 {\n  0% {\n    transform: translateX(0%);\n    z-index: 2;\n  }\n  49.9% {\n    z-index: 2;\n  }\n  50% {\n    transform: translateX(-100%);\n    z-index: 1;\n  }\n  100% {\n    transform: translateX(0%);\n    z-index: 1;\n  }\n}\n";

function RunPerfSpinner({
  width,
  speed
}) {
  return p("host", {
    shadowDom: true,
    style: {
      "--run-perf-spinner-width": width,
      "--run-perf-spinner-speed": speed
    }
  }, p("style", null, style), p("div", {
    class: "dot -z1"
  }), p("div", {
    class: "dot -z2"
  }));
}

RunPerfSpinner.props = {
  width: {
    type: String,
    value: "30px"
  },
  speed: {
    type: String,
    value: "2s"
  }
};
x("run-perf-spinner", RunPerfSpinner);
//# sourceMappingURL=run-perf-spinner.js.map
