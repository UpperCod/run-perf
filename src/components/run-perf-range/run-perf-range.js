import { h, customElement } from "atomico";
import style from "./run-perf-range.css";

function RunPerfRange({ percent, color }) {
  return (
    <host shadowDom>
      <style>{style}</style>
      <div class="layer -z1"></div>
      <div
        class="layer -z2"
        style={`width:${
          percent * 100
        }%;background: linear-gradient(to right, ${color}50, ${color});`}
      >
        <svg class="dot" height="300%" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="50" fill={color} />
        </svg>
      </div>
    </host>
  );
}

RunPerfRange.props = {
  percent: {
    type: Number,
    value: 50,
    reflect: true,
  },
  color: {
    type: String,
    value: "#000000",
  },
};

customElement("run-perf-range", RunPerfRange);
