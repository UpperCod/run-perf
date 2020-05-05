import { x, p, P, J, O, C } from './chunks/92f252a2.js';

var style = ":host {\n  font-family: monospace;\n  display: block;\n  box-sizing: border-box;\n  position: relative;\n}\n\n.iframe {\n  position: absolute;\n}\n\n.test.-item {\n    padding-bottom: 10px;\n  }\n\n.test.-header {\n    display: flex;\n    padding-bottom: 10px;\n  }\n\n.test.-title {\n    font-weight: bold;\n  }\n\n.test.-time {\n    margin-left: 1rem;\n    opacity: 0.5;\n  }\n\n.loading {\n  width: 50px;\n  height: 50px;\n  background: black;\n  animation: move 1s ease alternate infinite;\n}\n\n@keyframes move {\n  0% {\n    transform: translateX(0px);\n  }\n  100% {\n    transform: translateX(100px);\n  }\n}\n";

var style$1 = ":host {\n  width: 100%;\n  height: 3px;\n  position: relative;\n  display: block;\n}\n\n.layer {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  border-radius: 5px\n}\n\n.layer.-z1 {\n    background: currentColor;\n    opacity: 0.33;\n  }\n\n.dot {\n  top: 50%;\n  right: 0px;\n  position: absolute;\n  transform: translate(50%, -50%);\n}\n";

function RunPerfRange({
  percent,
  color
}) {
  return p("host", {
    shadowDom: true
  }, p("style", null, style$1), p("div", {
    class: "layer -z1"
  }), p("div", {
    class: "layer -z2",
    style: `width:${percent * 100}%;background: linear-gradient(to right, ${color}50, ${color});`
  }, p("svg", {
    class: "dot",
    height: "300%",
    viewBox: "0 0 100 100"
  }, p("circle", {
    cx: "50",
    cy: "50",
    r: "50",
    fill: color
  }))));
}

RunPerfRange.props = {
  percent: {
    type: Number,
    value: 50,
    reflect: true
  },
  color: {
    type: String,
    value: "#000000"
  }
};
x("run-perf-range", RunPerfRange);

function RunPerf({
  src,
  autorun
}) {
  let ref = P();
  let [state, setState] = J("state");
  let [results, setResults] = J("results");
  O(() => autorun && run(), [autorun]);
  useMethod("run", run);

  function run() {
    let {
      current: {
        contentDocument,
        contentWindow
      }
    } = ref;

    let setStep = step => fn => steps[step] = fn;

    let steps = {
      test: []
    };
    let states = [];
    contentWindow.before = setStep("before");

    contentWindow.test = (name, test, before) => states.push({
      name,
      test,
      before
    });

    contentWindow.after = setStep("after");

    contentWindow.ready = async () => {
      setResults(states);
      setState("running");
      let globalScope = await (steps.before && steps.before());

      let prepare = () => new Promise(resolve => contentWindow.requestIdleCallback(resolve));

      await states.reduce((currentPromise, {
        test,
        before
      }) => currentPromise.then(async () => {
        await prepare();
        let localScope = before ? await before() : globalScope;
        let operations = loop(test, 1000, localScope);
        setResults(states = states.map(state => state.test == test ? { ...state,
          operations
        } : state));
      }), prepare());
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

  let listOperation = results.map(result => result.operations || 0);
  let maxOperation = Math.max(0, ...listOperation);
  let minOperation = Math.min(...listOperation);
  let rangeOperation = maxOperation - minOperation;
  let rangeOperation30 = rangeOperation * 0.3 + minOperation;
  let rangeOperation60 = rangeOperation * 0.6 + minOperation;
  return p("host", {
    shadowDom: true
  }, p("style", null, style), p("div", {
    class: "tests"
  }, results.map(({
    name,
    operations = 0,
    duration = 0
  }) => {
    return p("div", {
      class: "test -item"
    }, p("div", {
      class: "test -header"
    }, p("div", {
      class: "test -title"
    }, name), p("div", {
      class: "test -time"
    }, operations ? operations.toLocaleString("en") + " opts/s" : "await...")), p("run-perf-range", {
      color: operations > rangeOperation60 ? "#00FFD4" : operations > rangeOperation30 ? "#ffbe46" : "#ff1a84",
      percent: operations / maxOperation || 0
    }));
  })), p("iframe", {
    class: "iframe",
    ref: ref,
    width: "0",
    height: "0",
    sandbox: "allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation",
    frameborder: "0"
  }));
}

function useMethod(name, callback) {
  let {
    current
  } = C();

  if (!current[name]) ;

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
  src: {
    type: String
  },
  autorun: {
    type: Boolean
  },
  results: {
    type: Array,
    value: () => []
  },
  state: {
    type: String,
    reflect: true,
    value: "",
    event: {
      type: "UpdateState"
    }
  }
};
x("run-perf", RunPerf);
//# sourceMappingURL=run-perf.js.map
