before(() => [...Array(1000).keys()]);
test("find 100", data => {
  data.find(x => x == 100);
});
test("find 200", data => {
  data.find(x => x == 200);
});
test("find 400", data => {
  data.find(x => x == 400);
});
after(results => {
  console.log(results);
});
//# sourceMappingURL=example-test.js.map
