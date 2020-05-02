import { h, customElement, useEffect, useRef, useProp, useHost } from "atomico";
import style from "./run-perf.css";
import "../run-perf-range/run-perf-range";

function RunPerf({ src, autorun }) {
  let ref = useRef();
  let [state, setState] = useProp("state");
  let [results, setResults] = useProp("results");
  useEffect(() => autorun && run(), [autorun]);
  useMethod("run", run);

  function run() {
    let {
      current: { contentDocument, contentWindow },
    } = ref;

    let setStep = (step) => (fn) => (steps[step] = fn);

    let steps = { test: [] };
    let states = [];

    contentWindow.before = setStep("before");

    contentWindow.test = (name, test, before) =>
      states.push({ name, test, before });

    contentWindow.after = setStep("after");

    contentWindow.ready = async () => {
      setResults(states);
      setState("running");

      let globalScope = await (steps.before && steps.before());

      let prepare = () =>
        new Promise((resolve) => contentWindow.requestIdleCallback(resolve));

      await states.reduce(
        (currentPromise, { test, before }) =>
          currentPromise.then(async () => {
            await prepare();

            let localScope = before ? await before() : globalScope;

            let operations = loop(test, 1000, localScope);

            setResults(
              (states = states.map((state) =>
                state.test == test ? { ...state, operations } : state
              ))
            );
          }),
        prepare()
      );

      setState("done");

      steps.after && steps.after(states);
    };

    if (!ref[src]) {
      ref[src] = true;

      let script = document.createElement("script");

      script.async = true;

      script.textContent = `import("./${src}").then(ready);`;

      contentDocument.body.appendChild(script);
    } else {
      state == "done" && ready();
    }
  }

  let listOperation = results.map((result) => result.operations || 0);
  let maxOperation = Math.max(0, ...listOperation);
  let minOperation = Math.min(...listOperation);
  let rangeOperation = maxOperation - minOperation;
  let rangeOperation30 = rangeOperation * 0.3 + minOperation;
  let rangeOperation60 = rangeOperation * 0.6 + minOperation;

  return (
    <host shadowDom>
      <style>{style}</style>
      <div class="tests">
        {results.map(({ name, operations = 0, duration = 0 }) => {
          return (
            <div class="test -item">
              <div class="test -header">
                <div class="test -title">{name}</div>
                <div class="test -time">
                  {operations
                    ? operations.toLocaleString("en") + " opts/s"
                    : "await..."}
                </div>
              </div>
              <run-perf-range
                color={
                  operations > rangeOperation60
                    ? "#00FFD4"
                    : operations > rangeOperation30
                    ? "#ffbe46"
                    : "#ff1a84"
                }
                percent={operations / maxOperation || 0}
              ></run-perf-range>
            </div>
          );
        })}
      </div>
      <iframe
        class="iframe"
        ref={ref}
        width="0"
        height="0"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation"
        frameborder="0"
      ></iframe>
    </host>
  );
}

function useMethod(name, callback) {
  let { current } = useHost();
  if (!current[name]) {
    let method = (...args) => method._(...args);
  }
  current._ = callback;
  return current[name];
}

function loop(callback, ms, scope) {
  let start = performance.now();
  let count = 0;
  while (performance.now() - start < ms) {
    count++;
    callback(scope);
  }
  return count;
}

RunPerf.props = {
  src: { type: String },
  autorun: { type: Boolean },
  results: { type: Array, value: () => [] },
  state: {
    type: String,
    reflect: true,
    value: "",
    event: { type: "UpdateState" },
  },
};

customElement("run-perf", RunPerf);
