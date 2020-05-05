const e = {};

function t(e, t) {
  e[0] && (e[1] = e[0](e[1], t));
}

function n(e, n) {
  for (let r in e) t(e[r], n);
}

function r(t, n) {
  if (e.ref.hook) return e.ref.hook.use(t, n)[1];
}

function i(e, t) {
  let n = e.length;
  if (n !== t.length) return !1;

  for (let r = 0; r < n; r++) if (e[r] !== t[r]) return !1;

  return !0;
}

const l = e => "function" == typeof e,
      u = Symbol(""),
      s = Symbol(""),
      c = {
  id: 1,
  className: 1,
  checked: 1,
  value: 1,
  selected: 1
},
      a = {},
      f = [],
      h = document;

function p(e, t, ...n) {
  return (n = function e(t, n = []) {
    for (let r = 0; r < t.length; r++) {
      let o = t[r];

      if (o) {
        if (Array.isArray(o)) {
          e(o, n);
          continue;
        }

        null != o.key && (n._ || (n._ = {}), n._[o.key] = 1);
      }

      let i = typeof o;
      o = null == o || "boolean" == i || "function" == i ? "" : o, n.push(o);
    }

    return n;
  }((t = t || a).children || n)).length || (n = f), {
    type: e,
    props: t,
    children: n,
    key: t.key,
    shadow: t.shadowDom,
    raw: 1 == e.nodeType
  };
}

function d(e, t, n = s) {
  y(n, t, e);
}

function y(e, t, n, r) {
  let o;

  if ((null != n || !t) && (r = r || "svg" == n.type, o = "host" != n.type && (n.raw ? t != n.type : t ? t.localName != n.type : !t), o)) {
    let e;
    if (null == n.type) return h.createTextNode(n + "");
    if (n.type.nodeType) return n.type;
    e = r ? h.createElementNS("http://www.w3.org/2000/svg", n.type) : h.createElement(n.type, n.is ? {
      is: n.is
    } : null), t = e;
  }

  if (3 == t.nodeType) return n += "", t.data != n && (t.data = n || ""), t;
  let i = t[e] ? t[e].vnode : a,
      l = i.props || a,
      s = i.children || f,
      c = o || !t[e] ? {} : t[e].handlers;

  if (n.shadow && (t.shadowRoot || t.attachShadow({
    mode: "open"
  })), n.props != l && m(t, l, n.props, c, r), n.children != s) {
    !function (e, t, n, r) {
      let o = n._,
          i = n.length,
          l = t.childNodes,
          s = {},
          c = l.length,
          a = o ? 0 : c > i ? i : c;

      for (; a < c; a++) {
        let e = l[a];

        if (o) {
          let t = e[u];

          if (o[t]) {
            s[t] = e;
            continue;
          }
        }

        a--, c--, e.remove();
      }

      for (let u = 0; u < i; u++) {
        let i = n[u],
            c = l[u],
            a = o ? i.key : u,
            f = o ? s[a] : c;
        if (o && f && f != c && t.insertBefore(f, c), o && !i.key) continue;
        let h = y(e, f, i, r);
        f ? h != f && t.replaceChild(h, f) : l[u] ? t.insertBefore(h, l[u]) : t.appendChild(h);
      }
    }(e, n.shadow ? t.shadowRoot : t, n.children, r);
  }

  return t[e] = {
    vnode: n,
    handlers: c
  }, t;
}

function m(e, t, n, r, o) {
  for (let i in t) i in n || b(e, i, t[i], null, o, r);

  for (let i in n) b(e, i, t[i], n[i], o, r);
}

function b(e, t, n, r, o, i) {
  if (n = null == n ? null : n, r = null == r ? null : r, (t = "class" != t || o ? t : "className") in e && c[t] && (n = e[t]), r !== n) if ("o" == t[0] && "n" == t[1] && (l(r) || l(n))) v(e, t, r, i);else if ("key" == t) e[u] = r;else if ("ref" == t) r && (r.current = e);else if ("style" == t) {
    let t,
        o = e.style;

    if ("object" == typeof (n = n || "")) {
      t = !0;

      for (let e in n) e in r || _(o, e, null);
    }

    if ("object" == typeof r) for (let e in r) {
      let i = r[e];
      t && n[e] === i || _(o, e, i);
    } else o.cssText = r || "";
  } else !o && "list" != t && t in e ? e[t] = null == r ? "" : r : null == r ? e.removeAttribute(t) : e.setAttribute(t, "object" == typeof r ? JSON.stringify(r) : r);
}

function v(e, t, n, r) {
  t = t.slice("-" == t[2] ? 3 : 2), r.handleEvent || (r.handleEvent = t => r[t.type].call(e, t)), n ? (r[t] || e.addEventListener(t, r), r[t] = n) : r[t] && (e.removeEventListener(t, r), delete r[t]);
}

function _(e, t, n) {
  let r = "setProperty";
  null == n && (r = "removeProperty", n = null), ~t.indexOf("-") ? e[r](t, n) : e[t] = n;
}

class g extends HTMLElement {
  constructor() {
    super(), this._create();
  }

  async _update() {
    if (!this._prevent) {
      let e;
      this._prevent = !0, this.updated = new Promise(t => e = t), await this.mounted, this._prevent = !1, this.update(), e();
    }
  }

  static get observedAttributes() {
    let {
      props: e = {}
    } = this,
        t = [],
        n = [];

    for (let r in e) j(this.prototype, r, e[r], n, t);

    return this.prototype._create = function () {
      this._attrs = {}, this._props = {}, t.forEach(e => e(this)), this.mounted = new Promise(e => this.mount = e), this.unmounted = new Promise(e => this.unmount = e), this.create && this.create(), this._update();
    }, n;
  }

  attributeChangedCallback(e, t, n) {
    e !== this._ignoreAttr && t !== n && (this[this._attrs[e]] = n);
  }

  connectedCallback() {
    this.mount();
  }

  disconnectedCallback() {
    this.unmount();
  }

}

const k = (e, t, n) => e.dispatchEvent(new CustomEvent(t, "object" == typeof n ? n : null)),
      N = [!0, 1, "", "1", "true"],
      A = [Function, null],
      E = e => e.replace(/([A-Z])/g, "-$1").toLowerCase();

function j(e, t, n, r, o) {
  if (!(t in e)) {
    let {
      type: i,
      reflect: u,
      event: s,
      value: c,
      attr: a = E(t)
    } = "object" == typeof n && null != n ? n : {
      type: n
    },
        f = !A.includes(i);
    r.push(a), Object.defineProperty(e, t, {
      set: function (e) {
        let n = this[t],
            {
          error: r,
          value: o
        } = function (e, t) {
          if (null == e) return {
            value: t
          };

          try {
            if (e == Boolean ? t = N.includes(t) : "string" == typeof t && (t = e == Number ? Number(t) : e == Object || e == Array ? JSON.parse(t) : t), {}.toString.call(t) == `[object ${e.name}]`) return {
              value: t,
              error: e == Number && Number.isNaN(t)
            };
          } catch (e) {}

          return {
            value: t,
            error: !0
          };
        }(i, f && l(e) ? e(n) : e);

        if (r && null != o) throw `The value defined for prop '${t}' must be of type '${i.name}'`;
        n != o && (this._props[t] = o, this._update(), this.updated.then(() => {
          s && k(this, s), u && (this._ignoreAttr = a, ((e, t, n, r) => {
            null == r || t == Boolean && !r ? e.removeAttribute(n) : e.setAttribute(n, "object" == typeof r ? JSON.stringify(r) : t == Boolean ? "" : r);
          })(this, i, a, this[t]), this._ignoreAttr = null);
        }));
      },

      get() {
        return this._props[t];
      }

    }), o.push(e => {
      null != c && (e[t] = c), e._attrs[a] = t;
    });
  }
}

function S(r) {
  let o = class extends g {
    async create() {
      let o = Symbol();

      this.update = () => {
        d(i.load(r, { ...this._props
        }), this, o), i.updated();
      };

      let i = function (r, o) {
        let i,
            l = {},
            u = {
          use: function (n, r) {
            let o,
                i = e.index++;
            l[i] || (l[i] = [null, r], o = 1);
            return l[i][0] = n, t(l[i], o ? 1 : 3), l[i];
          },
          load: function (t, n) {
            e.index = 0, e.ref = s;
            let r = t(n);
            return e.ref = 0, r;
          },
          updated: function () {
            let e = i ? 4 : 2;
            i = 1, n(l, e);
          },
          unmount: function () {
            n(l, 5);
          }
        },
            s = {
          hook: u,
          host: o,
          render: r
        };
        return u;
      }(() => this._update(), this);

      await this.unmounted, i.unmount();
    }

  };
  return o.props = r.props, o;
}

const x = (e, t) => l(e) ? S(e) : customElements.define(e, S(t));

function C() {
  return r(0, {
    current: e.ref.host
  });
}

function O(e, t) {
  let n;
  r((r, o) => {
    switch (null == n && (n = !t || !r[0] || !i(t, r[0]), r[0] = t), o) {
      case 3:
      case 5:
        (n || 5 == o) && r[1] && (r[1](), r[1] = 0), 5 == o && (r[0] = null);
        break;

      case 2:
      case 4:
        (n || 2 == o) && (r[1] = e());
    }

    return r;
  }, []);
}

function P(e) {
  return r(0, {
    current: e
  });
}

function J(e) {
  let t = C();
  if (e in t.current) return t[e] || (t[e] = [null, n => t.current[e] = n]), t[e][0] = t.current[e], t[e];
}

export { C, J, O, P, p, x };
//# sourceMappingURL=92f252a2.js.map
