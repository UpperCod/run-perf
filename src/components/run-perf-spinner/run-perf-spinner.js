import { h, customElement } from "atomico";
import style from "./run-perf-spinner.css";

function RunPerfSpinner({ width, speed }) {
  return (
    <host
      shadowDom
      style={{
        "--run-perf-spinner-width": width,
        "--run-perf-spinner-speed": speed,
      }}
    >
      <style>{style}</style>
      <div class="dot -z1"></div>
      <div class="dot -z2"></div>
    </host>
  );
}

RunPerfSpinner.props = {
  width: { type: String, value: "30px" },
  speed: { type: String, value: "2s" },
};

customElement("run-perf-spinner", RunPerfSpinner);
