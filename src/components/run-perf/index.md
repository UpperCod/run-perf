---
title: run-perf
description: This webcomponent measures performance by counting the number of executions a function achieves in 1 second
group: Components
showPages: true
---

# {{page.title}}

> {{page.description}}

## Instalation

```bash
npm install "{{pkg.name}}/run-perf-spinner"
```

## Usage

<run-perf src="./example-test.js" autorun></run-perf>

```html
<run-perf src="./example-test.js" autorun></run-perf>
```

### example-test.js

```js
before(() => [...Array(1000).keys()]);

test("find 100", (data) => {
  data.find((x) => x == 100);
});

test("find 200", (data) => {
  data.find((x) => x == 200);
});

test("find 400", (data) => {
  data.find((x) => x == 400);
});

after((results) => {
  console.log(results);
});
```

This component also allows the import of modules for the test execution, eg:

```js
import { foo } from "http://unpkg.com/foo";
import { baa } from "http://unpkg.com/baa";

test("foo", () => {
  foo();
});

test("baa", () => {
  baa();
});
```

<script type="module" src="./run-perf.js"></script>
