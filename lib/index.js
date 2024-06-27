var Yu = Object.defineProperty;
var qu = (u, D, e) => D in u ? Yu(u, D, { enumerable: !0, configurable: !0, writable: !0, value: e }) : u[D] = e;
var pu = (u, D, e) => (qu(u, typeof D != "symbol" ? D + "" : D, e), e), su = (u, D, e) => {
  if (!D.has(u))
    throw TypeError("Cannot " + e);
};
var F = (u, D, e) => (su(u, D, "read from private field"), e ? e.call(u) : D.get(u)), l = (u, D, e) => {
  if (D.has(u))
    throw TypeError("Cannot add the same private member more than once");
  D instanceof WeakSet ? D.add(u) : D.set(u, e);
}, s = (u, D, e, t) => (su(u, D, "write to private field"), t ? t.call(u, e) : D.set(u, e), e);
var Z = (u, D, e, t) => ({
  set _(r) {
    s(u, D, r, e);
  },
  get _() {
    return F(u, D, t);
  }
}), _ = (u, D, e) => (su(u, D, "access private method"), e);
const i = {}, Uu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: i
}, Symbol.toStringTag, { value: "Module" })), iu = 10, gu = (u = 0) => (D) => `\x1B[${D + u}m`, vu = (u = 0) => (D) => `\x1B[${38 + u};5;${D}m`, bu = (u = 0) => (D, e, t) => `\x1B[${38 + u};2;${D};${e};${t}m`, a = {
  modifier: {
    reset: [0, 0],
    // 21 isn't widely supported and 22 does the same thing
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    overline: [53, 55],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29]
  },
  color: {
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    // Bright color
    blackBright: [90, 39],
    gray: [90, 39],
    // Alias of `blackBright`
    grey: [90, 39],
    // Alias of `blackBright`
    redBright: [91, 39],
    greenBright: [92, 39],
    yellowBright: [93, 39],
    blueBright: [94, 39],
    magentaBright: [95, 39],
    cyanBright: [96, 39],
    whiteBright: [97, 39]
  },
  bgColor: {
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
    // Bright color
    bgBlackBright: [100, 49],
    bgGray: [100, 49],
    // Alias of `bgBlackBright`
    bgGrey: [100, 49],
    // Alias of `bgBlackBright`
    bgRedBright: [101, 49],
    bgGreenBright: [102, 49],
    bgYellowBright: [103, 49],
    bgBlueBright: [104, 49],
    bgMagentaBright: [105, 49],
    bgCyanBright: [106, 49],
    bgWhiteBright: [107, 49]
  }
};
Object.keys(a.modifier);
const Hu = Object.keys(a.color), Vu = Object.keys(a.bgColor);
[...Hu, ...Vu];
function zu() {
  const u = /* @__PURE__ */ new Map();
  for (const [D, e] of Object.entries(a)) {
    for (const [t, r] of Object.entries(e))
      a[t] = {
        open: `\x1B[${r[0]}m`,
        close: `\x1B[${r[1]}m`
      }, e[t] = a[t], u.set(r[0], r[1]);
    Object.defineProperty(a, D, {
      value: e,
      enumerable: !1
    });
  }
  return Object.defineProperty(a, "codes", {
    value: u,
    enumerable: !1
  }), a.color.close = "\x1B[39m", a.bgColor.close = "\x1B[49m", a.color.ansi = gu(), a.color.ansi256 = vu(), a.color.ansi16m = bu(), a.bgColor.ansi = gu(iu), a.bgColor.ansi256 = vu(iu), a.bgColor.ansi16m = bu(iu), Object.defineProperties(a, {
    rgbToAnsi256: {
      value(D, e, t) {
        return D === e && e === t ? D < 8 ? 16 : D > 248 ? 231 : Math.round((D - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(D / 255 * 5) + 6 * Math.round(e / 255 * 5) + Math.round(t / 255 * 5);
      },
      enumerable: !1
    },
    hexToRgb: {
      value(D) {
        const e = /[a-f\d]{6}|[a-f\d]{3}/i.exec(D.toString(16));
        if (!e)
          return [0, 0, 0];
        let [t] = e;
        t.length === 3 && (t = [...t].map((n) => n + n).join(""));
        const r = Number.parseInt(t, 16);
        return [
          /* eslint-disable no-bitwise */
          r >> 16 & 255,
          r >> 8 & 255,
          r & 255
          /* eslint-enable no-bitwise */
        ];
      },
      enumerable: !1
    },
    hexToAnsi256: {
      value: (D) => a.rgbToAnsi256(...a.hexToRgb(D)),
      enumerable: !1
    },
    ansi256ToAnsi: {
      value(D) {
        if (D < 8)
          return 30 + D;
        if (D < 16)
          return 90 + (D - 8);
        let e, t, r;
        if (D >= 232)
          e = ((D - 232) * 10 + 8) / 255, t = e, r = e;
        else {
          D -= 16;
          const B = D % 36;
          e = Math.floor(D / 36) / 5, t = Math.floor(B / 6) / 5, r = B % 6 / 5;
        }
        const n = Math.max(e, t, r) * 2;
        if (n === 0)
          return 30;
        let C = 30 + (Math.round(r) << 2 | Math.round(t) << 1 | Math.round(e));
        return n === 2 && (C += 60), C;
      },
      enumerable: !1
    },
    rgbToAnsi: {
      value: (D, e, t) => a.ansi256ToAnsi(a.rgbToAnsi256(D, e, t)),
      enumerable: !1
    },
    hexToAnsi: {
      value: (D) => a.ansi256ToAnsi(a.hexToAnsi256(D)),
      enumerable: !1
    }
  }), a;
}
const Zu = zu(), d = Zu, K = (() => {
  if (navigator.userAgentData) {
    const u = navigator.userAgentData.brands.find(({ brand: D }) => D === "Chromium");
    if (u && u.version > 93)
      return 3;
  }
  return /\b(Chrome|Chromium)\//.test(navigator.userAgent) ? 1 : 0;
})(), xu = K !== 0 && {
  level: K,
  hasBasic: !0,
  has256: K >= 2,
  has16m: K >= 3
}, Ku = {
  stdout: xu,
  stderr: xu
}, Qu = Ku;
function Xu(u, D, e) {
  let t = u.indexOf(D);
  if (t === -1)
    return u;
  const r = D.length;
  let n = 0, C = "";
  do
    C += u.slice(n, t) + D + e, n = t + r, t = u.indexOf(D, n);
  while (t !== -1);
  return C += u.slice(n), C;
}
function Ju(u, D, e, t) {
  let r = 0, n = "";
  do {
    const C = u[t - 1] === "\r";
    n += u.slice(r, C ? t - 1 : t) + D + (C ? `\r
` : `
`) + e, r = t + 1, t = u.indexOf(`
`, r);
  } while (t !== -1);
  return n += u.slice(r), n;
}
const { stdout: yu, stderr: Tu } = Qu, cu = Symbol("GENERATOR"), k = Symbol("STYLER"), q = Symbol("IS_EMPTY"), wu = [
  "ansi",
  "ansi",
  "ansi256",
  "ansi16m"
], N = /* @__PURE__ */ Object.create(null), uD = (u, D = {}) => {
  if (D.level && !(Number.isInteger(D.level) && D.level >= 0 && D.level <= 3))
    throw new Error("The `level` option should be an integer from 0 to 3");
  const e = yu ? yu.level : 0;
  u.level = D.level === void 0 ? e : D.level;
}, DD = (u) => {
  const D = (...e) => e.join(" ");
  return uD(D, u), Object.setPrototypeOf(D, z.prototype), D;
};
function z(u) {
  return DD(u);
}
Object.setPrototypeOf(z.prototype, Function.prototype);
for (const [u, D] of Object.entries(d))
  N[u] = {
    get() {
      const e = uu(this, Bu(D.open, D.close, this[k]), this[q]);
      return Object.defineProperty(this, u, { value: e }), e;
    }
  };
N.visible = {
  get() {
    const u = uu(this, this[k], !0);
    return Object.defineProperty(this, "visible", { value: u }), u;
  }
};
const fu = (u, D, e, ...t) => u === "rgb" ? D === "ansi16m" ? d[e].ansi16m(...t) : D === "ansi256" ? d[e].ansi256(d.rgbToAnsi256(...t)) : d[e].ansi(d.rgbToAnsi(...t)) : u === "hex" ? fu("rgb", D, e, ...d.hexToRgb(...t)) : d[e][u](...t), eD = ["rgb", "hex", "ansi256"];
for (const u of eD) {
  N[u] = {
    get() {
      const { level: e } = this;
      return function(...t) {
        const r = Bu(fu(u, wu[e], "color", ...t), d.color.close, this[k]);
        return uu(this, r, this[q]);
      };
    }
  };
  const D = "bg" + u[0].toUpperCase() + u.slice(1);
  N[D] = {
    get() {
      const { level: e } = this;
      return function(...t) {
        const r = Bu(fu(u, wu[e], "bgColor", ...t), d.bgColor.close, this[k]);
        return uu(this, r, this[q]);
      };
    }
  };
}
const tD = Object.defineProperties(() => {
}, {
  ...N,
  level: {
    enumerable: !0,
    get() {
      return this[cu].level;
    },
    set(u) {
      this[cu].level = u;
    }
  }
}), Bu = (u, D, e) => {
  let t, r;
  return e === void 0 ? (t = u, r = D) : (t = e.openAll + u, r = D + e.closeAll), {
    open: u,
    close: D,
    openAll: t,
    closeAll: r,
    parent: e
  };
}, uu = (u, D, e) => {
  const t = (...r) => FD(t, r.length === 1 ? "" + r[0] : r.join(" "));
  return Object.setPrototypeOf(t, tD), t[cu] = u, t[k] = D, t[q] = e, t;
}, FD = (u, D) => {
  if (u.level <= 0 || !D)
    return u[q] ? "" : D;
  let e = u[k];
  if (e === void 0)
    return D;
  const { openAll: t, closeAll: r } = e;
  if (D.includes("\x1B"))
    for (; e !== void 0; )
      D = Xu(D, e.close, e.open), e = e.parent;
  const n = D.indexOf(`
`);
  return n !== -1 && (D = Ju(D, r, t, n)), t + D + r;
};
Object.defineProperties(z.prototype, N);
const rD = z();
z({ level: Tu ? Tu.level : 0 });
const nD = rD;
var w = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function du(u) {
  return u && u.__esModule && Object.prototype.hasOwnProperty.call(u, "default") ? u.default : u;
}
function sD(u) {
  if (u.__esModule)
    return u;
  var D = u.default;
  if (typeof D == "function") {
    var e = function t() {
      return this instanceof t ? Reflect.construct(D, arguments, this.constructor) : D.apply(this, arguments);
    };
    e.prototype = D.prototype;
  } else
    e = {};
  return Object.defineProperty(e, "__esModule", { value: !0 }), Object.keys(u).forEach(function(t) {
    var r = Object.getOwnPropertyDescriptor(u, t);
    Object.defineProperty(e, t, r.get ? r : {
      enumerable: !0,
      get: function() {
        return u[t];
      }
    });
  }), e;
}
var nu = { exports: {} }, mu = { exports: {} };
const Pu = (u, D) => {
  for (const e of Reflect.ownKeys(D))
    Object.defineProperty(u, e, Object.getOwnPropertyDescriptor(D, e));
  return u;
};
mu.exports = Pu;
mu.exports.default = Pu;
var iD = mu.exports;
const oD = iD, Du = /* @__PURE__ */ new WeakMap(), $u = (u, D = {}) => {
  if (typeof u != "function")
    throw new TypeError("Expected a function");
  let e, t = 0;
  const r = u.displayName || u.name || "<anonymous>", n = function(...C) {
    if (Du.set(n, ++t), t === 1)
      e = u.apply(this, C), u = null;
    else if (D.throw === !0)
      throw new Error(`Function \`${r}\` can only be called once`);
    return e;
  };
  return oD(n, u), Du.set(n, t), n;
};
nu.exports = $u;
nu.exports.default = $u;
nu.exports.callCount = (u) => {
  if (!Du.has(u))
    throw new Error(`The given function \`${u.name}\` is not wrapped by the \`onetime\` package`);
  return Du.get(u);
};
var aD = nu.exports;
const lD = /* @__PURE__ */ du(aD);
var j = { exports: {} };
const Su = /* @__PURE__ */ sD(Uu);
var ou = { exports: {} }, Ou;
function ED() {
  return Ou || (Ou = 1, function(u) {
    u.exports = [
      "SIGABRT",
      "SIGALRM",
      "SIGHUP",
      "SIGINT",
      "SIGTERM"
    ], process.platform !== "win32" && u.exports.push(
      "SIGVTALRM",
      "SIGXCPU",
      "SIGXFSZ",
      "SIGUSR2",
      "SIGTRAP",
      "SIGSYS",
      "SIGQUIT",
      "SIGIOT"
      // should detect profiler and enable/disable accordingly.
      // see #21
      // 'SIGPROF'
    ), process.platform === "linux" && u.exports.push(
      "SIGIO",
      "SIGPOLL",
      "SIGPWR",
      "SIGSTKFLT",
      "SIGUNUSED"
    );
  }(ou)), ou.exports;
}
var o = w.process;
const T = function(u) {
  return u && typeof u == "object" && typeof u.removeListener == "function" && typeof u.emit == "function" && typeof u.reallyExit == "function" && typeof u.listeners == "function" && typeof u.kill == "function" && typeof u.pid == "number" && typeof u.on == "function";
};
if (!T(o))
  j.exports = function() {
    return function() {
    };
  };
else {
  var CD = Su, L = ED(), cD = /^win/i.test(o.platform), Q = Su;
  typeof Q != "function" && (Q = Q.EventEmitter);
  var c;
  o.__signal_exit_emitter__ ? c = o.__signal_exit_emitter__ : (c = o.__signal_exit_emitter__ = new Q(), c.count = 0, c.emitted = {}), c.infinite || (c.setMaxListeners(1 / 0), c.infinite = !0), j.exports = function(u, D) {
    if (!T(w.process))
      return function() {
      };
    CD.equal(typeof u, "function", "a callback must be provided for exit handler"), W === !1 && Iu();
    var e = "exit";
    D && D.alwaysLast && (e = "afterexit");
    var t = function() {
      c.removeListener(e, u), c.listeners("exit").length === 0 && c.listeners("afterexit").length === 0 && au();
    };
    return c.on(e, u), t;
  };
  var au = function() {
    !W || !T(w.process) || (W = !1, L.forEach(function(D) {
      try {
        o.removeListener(D, lu[D]);
      } catch {
      }
    }), o.emit = Eu, o.reallyExit = Mu, c.count -= 1);
  };
  j.exports.unload = au;
  var R = function(D, e, t) {
    c.emitted[D] || (c.emitted[D] = !0, c.emit(D, e, t));
  }, lu = {};
  L.forEach(function(u) {
    lu[u] = function() {
      if (T(w.process)) {
        var e = o.listeners(u);
        e.length === c.count && (au(), R("exit", null, u), R("afterexit", null, u), cD && u === "SIGHUP" && (u = "SIGINT"), o.kill(o.pid, u));
      }
    };
  }), j.exports.signals = function() {
    return L;
  };
  var W = !1, Iu = function() {
    W || !T(w.process) || (W = !0, c.count += 1, L = L.filter(function(D) {
      try {
        return o.on(D, lu[D]), !0;
      } catch {
        return !1;
      }
    }), o.emit = BD, o.reallyExit = fD);
  };
  j.exports.load = Iu;
  var Mu = o.reallyExit, fD = function(D) {
    T(w.process) && (o.exitCode = D || /* istanbul ignore next */
    0, R("exit", o.exitCode, null), R("afterexit", o.exitCode, null), Mu.call(o, o.exitCode));
  }, Eu = o.emit, BD = function(D, e) {
    if (D === "exit" && T(w.process)) {
      e !== void 0 && (o.exitCode = e);
      var t = Eu.apply(this, arguments);
      return R("exit", o.exitCode, null), R("afterexit", o.exitCode, null), t;
    } else
      return Eu.apply(this, arguments);
  };
}
var _D = j.exports;
const hD = /* @__PURE__ */ du(_D), AD = lD(() => {
  hD(() => {
    i.stderr.write("\x1B[?25h");
  }, { alwaysLast: !0 });
});
let eu = !1;
const M = {};
M.show = (u = i.stderr) => {
  u.isTTY && (eu = !1, u.write("\x1B[?25h"));
};
M.hide = (u = i.stderr) => {
  u.isTTY && (AD(), eu = !0, u.write("\x1B[?25l"));
};
M.toggle = (u, D) => {
  u !== void 0 && (eu = u), eu ? M.show(D) : M.hide(D);
};
const dD = {
  interval: 80,
  frames: [
    "⠋",
    "⠙",
    "⠹",
    "⠸",
    "⠼",
    "⠴",
    "⠦",
    "⠧",
    "⠇",
    "⠏"
  ]
}, mD = {
  interval: 80,
  frames: [
    "⣾",
    "⣽",
    "⣻",
    "⢿",
    "⡿",
    "⣟",
    "⣯",
    "⣷"
  ]
}, pD = {
  interval: 80,
  frames: [
    "⠋",
    "⠙",
    "⠚",
    "⠞",
    "⠖",
    "⠦",
    "⠴",
    "⠲",
    "⠳",
    "⠓"
  ]
}, gD = {
  interval: 80,
  frames: [
    "⠄",
    "⠆",
    "⠇",
    "⠋",
    "⠙",
    "⠸",
    "⠰",
    "⠠",
    "⠰",
    "⠸",
    "⠙",
    "⠋",
    "⠇",
    "⠆"
  ]
}, vD = {
  interval: 80,
  frames: [
    "⠋",
    "⠙",
    "⠚",
    "⠒",
    "⠂",
    "⠂",
    "⠒",
    "⠲",
    "⠴",
    "⠦",
    "⠖",
    "⠒",
    "⠐",
    "⠐",
    "⠒",
    "⠓",
    "⠋"
  ]
}, bD = {
  interval: 80,
  frames: [
    "⠁",
    "⠉",
    "⠙",
    "⠚",
    "⠒",
    "⠂",
    "⠂",
    "⠒",
    "⠲",
    "⠴",
    "⠤",
    "⠄",
    "⠄",
    "⠤",
    "⠴",
    "⠲",
    "⠒",
    "⠂",
    "⠂",
    "⠒",
    "⠚",
    "⠙",
    "⠉",
    "⠁"
  ]
}, xD = {
  interval: 80,
  frames: [
    "⠈",
    "⠉",
    "⠋",
    "⠓",
    "⠒",
    "⠐",
    "⠐",
    "⠒",
    "⠖",
    "⠦",
    "⠤",
    "⠠",
    "⠠",
    "⠤",
    "⠦",
    "⠖",
    "⠒",
    "⠐",
    "⠐",
    "⠒",
    "⠓",
    "⠋",
    "⠉",
    "⠈"
  ]
}, yD = {
  interval: 80,
  frames: [
    "⠁",
    "⠁",
    "⠉",
    "⠙",
    "⠚",
    "⠒",
    "⠂",
    "⠂",
    "⠒",
    "⠲",
    "⠴",
    "⠤",
    "⠄",
    "⠄",
    "⠤",
    "⠠",
    "⠠",
    "⠤",
    "⠦",
    "⠖",
    "⠒",
    "⠐",
    "⠐",
    "⠒",
    "⠓",
    "⠋",
    "⠉",
    "⠈",
    "⠈"
  ]
}, TD = {
  interval: 80,
  frames: [
    "⢹",
    "⢺",
    "⢼",
    "⣸",
    "⣇",
    "⡧",
    "⡗",
    "⡏"
  ]
}, wD = {
  interval: 80,
  frames: [
    "⢄",
    "⢂",
    "⢁",
    "⡁",
    "⡈",
    "⡐",
    "⡠"
  ]
}, SD = {
  interval: 100,
  frames: [
    "⠁",
    "⠂",
    "⠄",
    "⡀",
    "⢀",
    "⠠",
    "⠐",
    "⠈"
  ]
}, OD = {
  interval: 80,
  frames: [
    "⢀⠀",
    "⡀⠀",
    "⠄⠀",
    "⢂⠀",
    "⡂⠀",
    "⠅⠀",
    "⢃⠀",
    "⡃⠀",
    "⠍⠀",
    "⢋⠀",
    "⡋⠀",
    "⠍⠁",
    "⢋⠁",
    "⡋⠁",
    "⠍⠉",
    "⠋⠉",
    "⠋⠉",
    "⠉⠙",
    "⠉⠙",
    "⠉⠩",
    "⠈⢙",
    "⠈⡙",
    "⢈⠩",
    "⡀⢙",
    "⠄⡙",
    "⢂⠩",
    "⡂⢘",
    "⠅⡘",
    "⢃⠨",
    "⡃⢐",
    "⠍⡐",
    "⢋⠠",
    "⡋⢀",
    "⠍⡁",
    "⢋⠁",
    "⡋⠁",
    "⠍⠉",
    "⠋⠉",
    "⠋⠉",
    "⠉⠙",
    "⠉⠙",
    "⠉⠩",
    "⠈⢙",
    "⠈⡙",
    "⠈⠩",
    "⠀⢙",
    "⠀⡙",
    "⠀⠩",
    "⠀⢘",
    "⠀⡘",
    "⠀⠨",
    "⠀⢐",
    "⠀⡐",
    "⠀⠠",
    "⠀⢀",
    "⠀⡀"
  ]
}, ID = {
  interval: 80,
  frames: [
    "⣼",
    "⣹",
    "⢻",
    "⠿",
    "⡟",
    "⣏",
    "⣧",
    "⣶"
  ]
}, MD = {
  interval: 80,
  frames: [
    "⠀",
    "⠁",
    "⠂",
    "⠃",
    "⠄",
    "⠅",
    "⠆",
    "⠇",
    "⡀",
    "⡁",
    "⡂",
    "⡃",
    "⡄",
    "⡅",
    "⡆",
    "⡇",
    "⠈",
    "⠉",
    "⠊",
    "⠋",
    "⠌",
    "⠍",
    "⠎",
    "⠏",
    "⡈",
    "⡉",
    "⡊",
    "⡋",
    "⡌",
    "⡍",
    "⡎",
    "⡏",
    "⠐",
    "⠑",
    "⠒",
    "⠓",
    "⠔",
    "⠕",
    "⠖",
    "⠗",
    "⡐",
    "⡑",
    "⡒",
    "⡓",
    "⡔",
    "⡕",
    "⡖",
    "⡗",
    "⠘",
    "⠙",
    "⠚",
    "⠛",
    "⠜",
    "⠝",
    "⠞",
    "⠟",
    "⡘",
    "⡙",
    "⡚",
    "⡛",
    "⡜",
    "⡝",
    "⡞",
    "⡟",
    "⠠",
    "⠡",
    "⠢",
    "⠣",
    "⠤",
    "⠥",
    "⠦",
    "⠧",
    "⡠",
    "⡡",
    "⡢",
    "⡣",
    "⡤",
    "⡥",
    "⡦",
    "⡧",
    "⠨",
    "⠩",
    "⠪",
    "⠫",
    "⠬",
    "⠭",
    "⠮",
    "⠯",
    "⡨",
    "⡩",
    "⡪",
    "⡫",
    "⡬",
    "⡭",
    "⡮",
    "⡯",
    "⠰",
    "⠱",
    "⠲",
    "⠳",
    "⠴",
    "⠵",
    "⠶",
    "⠷",
    "⡰",
    "⡱",
    "⡲",
    "⡳",
    "⡴",
    "⡵",
    "⡶",
    "⡷",
    "⠸",
    "⠹",
    "⠺",
    "⠻",
    "⠼",
    "⠽",
    "⠾",
    "⠿",
    "⡸",
    "⡹",
    "⡺",
    "⡻",
    "⡼",
    "⡽",
    "⡾",
    "⡿",
    "⢀",
    "⢁",
    "⢂",
    "⢃",
    "⢄",
    "⢅",
    "⢆",
    "⢇",
    "⣀",
    "⣁",
    "⣂",
    "⣃",
    "⣄",
    "⣅",
    "⣆",
    "⣇",
    "⢈",
    "⢉",
    "⢊",
    "⢋",
    "⢌",
    "⢍",
    "⢎",
    "⢏",
    "⣈",
    "⣉",
    "⣊",
    "⣋",
    "⣌",
    "⣍",
    "⣎",
    "⣏",
    "⢐",
    "⢑",
    "⢒",
    "⢓",
    "⢔",
    "⢕",
    "⢖",
    "⢗",
    "⣐",
    "⣑",
    "⣒",
    "⣓",
    "⣔",
    "⣕",
    "⣖",
    "⣗",
    "⢘",
    "⢙",
    "⢚",
    "⢛",
    "⢜",
    "⢝",
    "⢞",
    "⢟",
    "⣘",
    "⣙",
    "⣚",
    "⣛",
    "⣜",
    "⣝",
    "⣞",
    "⣟",
    "⢠",
    "⢡",
    "⢢",
    "⢣",
    "⢤",
    "⢥",
    "⢦",
    "⢧",
    "⣠",
    "⣡",
    "⣢",
    "⣣",
    "⣤",
    "⣥",
    "⣦",
    "⣧",
    "⢨",
    "⢩",
    "⢪",
    "⢫",
    "⢬",
    "⢭",
    "⢮",
    "⢯",
    "⣨",
    "⣩",
    "⣪",
    "⣫",
    "⣬",
    "⣭",
    "⣮",
    "⣯",
    "⢰",
    "⢱",
    "⢲",
    "⢳",
    "⢴",
    "⢵",
    "⢶",
    "⢷",
    "⣰",
    "⣱",
    "⣲",
    "⣳",
    "⣴",
    "⣵",
    "⣶",
    "⣷",
    "⢸",
    "⢹",
    "⢺",
    "⢻",
    "⢼",
    "⢽",
    "⢾",
    "⢿",
    "⣸",
    "⣹",
    "⣺",
    "⣻",
    "⣼",
    "⣽",
    "⣾",
    "⣿"
  ]
}, RD = {
  interval: 80,
  frames: [
    "⠁",
    "⠂",
    "⠄",
    "⡀",
    "⡈",
    "⡐",
    "⡠",
    "⣀",
    "⣁",
    "⣂",
    "⣄",
    "⣌",
    "⣔",
    "⣤",
    "⣥",
    "⣦",
    "⣮",
    "⣶",
    "⣷",
    "⣿",
    "⡿",
    "⠿",
    "⢟",
    "⠟",
    "⡛",
    "⠛",
    "⠫",
    "⢋",
    "⠋",
    "⠍",
    "⡉",
    "⠉",
    "⠑",
    "⠡",
    "⢁"
  ]
}, jD = {
  interval: 130,
  frames: [
    "-",
    "\\",
    "|",
    "/"
  ]
}, PD = {
  interval: 100,
  frames: [
    "⠂",
    "-",
    "–",
    "—",
    "–",
    "-"
  ]
}, $D = {
  interval: 100,
  frames: [
    "┤",
    "┘",
    "┴",
    "└",
    "├",
    "┌",
    "┬",
    "┐"
  ]
}, GD = {
  interval: 400,
  frames: [
    ".  ",
    ".. ",
    "...",
    "   "
  ]
}, kD = {
  interval: 200,
  frames: [
    ".  ",
    ".. ",
    "...",
    " ..",
    "  .",
    "   "
  ]
}, ND = {
  interval: 70,
  frames: [
    "✶",
    "✸",
    "✹",
    "✺",
    "✹",
    "✷"
  ]
}, LD = {
  interval: 80,
  frames: [
    "+",
    "x",
    "*"
  ]
}, WD = {
  interval: 70,
  frames: [
    "_",
    "_",
    "_",
    "-",
    "`",
    "`",
    "'",
    "´",
    "-",
    "_",
    "_",
    "_"
  ]
}, YD = {
  interval: 100,
  frames: [
    "☱",
    "☲",
    "☴"
  ]
}, qD = {
  interval: 120,
  frames: [
    "▁",
    "▃",
    "▄",
    "▅",
    "▆",
    "▇",
    "▆",
    "▅",
    "▄",
    "▃"
  ]
}, UD = {
  interval: 120,
  frames: [
    "▏",
    "▎",
    "▍",
    "▌",
    "▋",
    "▊",
    "▉",
    "▊",
    "▋",
    "▌",
    "▍",
    "▎"
  ]
}, HD = {
  interval: 140,
  frames: [
    " ",
    ".",
    "o",
    "O",
    "@",
    "*",
    " "
  ]
}, VD = {
  interval: 120,
  frames: [
    ".",
    "o",
    "O",
    "°",
    "O",
    "o",
    "."
  ]
}, zD = {
  interval: 100,
  frames: [
    "▓",
    "▒",
    "░"
  ]
}, ZD = {
  interval: 120,
  frames: [
    "⠁",
    "⠂",
    "⠄",
    "⠂"
  ]
}, KD = {
  interval: 120,
  frames: [
    "▖",
    "▘",
    "▝",
    "▗"
  ]
}, QD = {
  interval: 100,
  frames: [
    "▌",
    "▀",
    "▐",
    "▄"
  ]
}, XD = {
  interval: 50,
  frames: [
    "◢",
    "◣",
    "◤",
    "◥"
  ]
}, JD = {
  interval: 80,
  frames: [
    "010010",
    "001100",
    "100101",
    "111010",
    "111101",
    "010111",
    "101011",
    "111000",
    "110011",
    "110101"
  ]
}, u0 = {
  interval: 100,
  frames: [
    "◜",
    "◠",
    "◝",
    "◞",
    "◡",
    "◟"
  ]
}, D0 = {
  interval: 120,
  frames: [
    "◡",
    "⊙",
    "◠"
  ]
}, e0 = {
  interval: 180,
  frames: [
    "◰",
    "◳",
    "◲",
    "◱"
  ]
}, t0 = {
  interval: 120,
  frames: [
    "◴",
    "◷",
    "◶",
    "◵"
  ]
}, F0 = {
  interval: 50,
  frames: [
    "◐",
    "◓",
    "◑",
    "◒"
  ]
}, r0 = {
  interval: 100,
  frames: [
    "╫",
    "╪"
  ]
}, n0 = {
  interval: 250,
  frames: [
    "⊶",
    "⊷"
  ]
}, s0 = {
  interval: 80,
  frames: [
    "▫",
    "▪"
  ]
}, i0 = {
  interval: 120,
  frames: [
    "□",
    "■"
  ]
}, o0 = {
  interval: 100,
  frames: [
    "■",
    "□",
    "▪",
    "▫"
  ]
}, a0 = {
  interval: 100,
  frames: [
    "▮",
    "▯"
  ]
}, l0 = {
  interval: 300,
  frames: [
    "ဝ",
    "၀"
  ]
}, E0 = {
  interval: 80,
  frames: [
    "⦾",
    "⦿"
  ]
}, C0 = {
  interval: 100,
  frames: [
    "◍",
    "◌"
  ]
}, c0 = {
  interval: 100,
  frames: [
    "◉",
    "◎"
  ]
}, f0 = {
  interval: 100,
  frames: [
    "㊂",
    "㊀",
    "㊁"
  ]
}, B0 = {
  interval: 50,
  frames: [
    "⧇",
    "⧆"
  ]
}, _0 = {
  interval: 120,
  frames: [
    "☗",
    "☖"
  ]
}, h0 = {
  interval: 80,
  frames: [
    "=",
    "*",
    "-"
  ]
}, A0 = {
  interval: 100,
  frames: [
    "←",
    "↖",
    "↑",
    "↗",
    "→",
    "↘",
    "↓",
    "↙"
  ]
}, d0 = {
  interval: 80,
  frames: [
    "⬆️ ",
    "↗️ ",
    "➡️ ",
    "↘️ ",
    "⬇️ ",
    "↙️ ",
    "⬅️ ",
    "↖️ "
  ]
}, m0 = {
  interval: 120,
  frames: [
    "▹▹▹▹▹",
    "▸▹▹▹▹",
    "▹▸▹▹▹",
    "▹▹▸▹▹",
    "▹▹▹▸▹",
    "▹▹▹▹▸"
  ]
}, p0 = {
  interval: 80,
  frames: [
    "[    ]",
    "[=   ]",
    "[==  ]",
    "[=== ]",
    "[====]",
    "[ ===]",
    "[  ==]",
    "[   =]",
    "[    ]",
    "[   =]",
    "[  ==]",
    "[ ===]",
    "[====]",
    "[=== ]",
    "[==  ]",
    "[=   ]"
  ]
}, g0 = {
  interval: 80,
  frames: [
    "( ●    )",
    "(  ●   )",
    "(   ●  )",
    "(    ● )",
    "(     ●)",
    "(    ● )",
    "(   ●  )",
    "(  ●   )",
    "( ●    )",
    "(●     )"
  ]
}, v0 = {
  interval: 200,
  frames: [
    "😄 ",
    "😝 "
  ]
}, b0 = {
  interval: 300,
  frames: [
    "🙈 ",
    "🙈 ",
    "🙉 ",
    "🙊 "
  ]
}, x0 = {
  interval: 100,
  frames: [
    "💛 ",
    "💙 ",
    "💜 ",
    "💚 ",
    "❤️ "
  ]
}, y0 = {
  interval: 100,
  frames: [
    "🕛 ",
    "🕐 ",
    "🕑 ",
    "🕒 ",
    "🕓 ",
    "🕔 ",
    "🕕 ",
    "🕖 ",
    "🕗 ",
    "🕘 ",
    "🕙 ",
    "🕚 "
  ]
}, T0 = {
  interval: 180,
  frames: [
    "🌍 ",
    "🌎 ",
    "🌏 "
  ]
}, w0 = {
  interval: 17,
  frames: [
    "█▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁",
    "██▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁",
    "███▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁",
    "████▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁",
    "██████▁▁▁▁▁▁▁▁▁▁▁▁▁▁",
    "██████▁▁▁▁▁▁▁▁▁▁▁▁▁▁",
    "███████▁▁▁▁▁▁▁▁▁▁▁▁▁",
    "████████▁▁▁▁▁▁▁▁▁▁▁▁",
    "█████████▁▁▁▁▁▁▁▁▁▁▁",
    "█████████▁▁▁▁▁▁▁▁▁▁▁",
    "██████████▁▁▁▁▁▁▁▁▁▁",
    "███████████▁▁▁▁▁▁▁▁▁",
    "█████████████▁▁▁▁▁▁▁",
    "██████████████▁▁▁▁▁▁",
    "██████████████▁▁▁▁▁▁",
    "▁██████████████▁▁▁▁▁",
    "▁██████████████▁▁▁▁▁",
    "▁██████████████▁▁▁▁▁",
    "▁▁██████████████▁▁▁▁",
    "▁▁▁██████████████▁▁▁",
    "▁▁▁▁█████████████▁▁▁",
    "▁▁▁▁██████████████▁▁",
    "▁▁▁▁██████████████▁▁",
    "▁▁▁▁▁██████████████▁",
    "▁▁▁▁▁██████████████▁",
    "▁▁▁▁▁██████████████▁",
    "▁▁▁▁▁▁██████████████",
    "▁▁▁▁▁▁██████████████",
    "▁▁▁▁▁▁▁█████████████",
    "▁▁▁▁▁▁▁█████████████",
    "▁▁▁▁▁▁▁▁████████████",
    "▁▁▁▁▁▁▁▁████████████",
    "▁▁▁▁▁▁▁▁▁███████████",
    "▁▁▁▁▁▁▁▁▁███████████",
    "▁▁▁▁▁▁▁▁▁▁██████████",
    "▁▁▁▁▁▁▁▁▁▁██████████",
    "▁▁▁▁▁▁▁▁▁▁▁▁████████",
    "▁▁▁▁▁▁▁▁▁▁▁▁▁███████",
    "▁▁▁▁▁▁▁▁▁▁▁▁▁▁██████",
    "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█████",
    "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█████",
    "█▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁████",
    "██▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁███",
    "██▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁███",
    "███▁▁▁▁▁▁▁▁▁▁▁▁▁▁███",
    "████▁▁▁▁▁▁▁▁▁▁▁▁▁▁██",
    "█████▁▁▁▁▁▁▁▁▁▁▁▁▁▁█",
    "█████▁▁▁▁▁▁▁▁▁▁▁▁▁▁█",
    "██████▁▁▁▁▁▁▁▁▁▁▁▁▁█",
    "████████▁▁▁▁▁▁▁▁▁▁▁▁",
    "█████████▁▁▁▁▁▁▁▁▁▁▁",
    "█████████▁▁▁▁▁▁▁▁▁▁▁",
    "█████████▁▁▁▁▁▁▁▁▁▁▁",
    "█████████▁▁▁▁▁▁▁▁▁▁▁",
    "███████████▁▁▁▁▁▁▁▁▁",
    "████████████▁▁▁▁▁▁▁▁",
    "████████████▁▁▁▁▁▁▁▁",
    "██████████████▁▁▁▁▁▁",
    "██████████████▁▁▁▁▁▁",
    "▁██████████████▁▁▁▁▁",
    "▁██████████████▁▁▁▁▁",
    "▁▁▁█████████████▁▁▁▁",
    "▁▁▁▁▁████████████▁▁▁",
    "▁▁▁▁▁████████████▁▁▁",
    "▁▁▁▁▁▁███████████▁▁▁",
    "▁▁▁▁▁▁▁▁█████████▁▁▁",
    "▁▁▁▁▁▁▁▁█████████▁▁▁",
    "▁▁▁▁▁▁▁▁▁█████████▁▁",
    "▁▁▁▁▁▁▁▁▁█████████▁▁",
    "▁▁▁▁▁▁▁▁▁▁█████████▁",
    "▁▁▁▁▁▁▁▁▁▁▁████████▁",
    "▁▁▁▁▁▁▁▁▁▁▁████████▁",
    "▁▁▁▁▁▁▁▁▁▁▁▁███████▁",
    "▁▁▁▁▁▁▁▁▁▁▁▁███████▁",
    "▁▁▁▁▁▁▁▁▁▁▁▁▁███████",
    "▁▁▁▁▁▁▁▁▁▁▁▁▁███████",
    "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█████",
    "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁████",
    "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁████",
    "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁████",
    "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁███",
    "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁███",
    "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁██",
    "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁██",
    "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁██",
    "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█",
    "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█",
    "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█",
    "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁",
    "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁",
    "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁",
    "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁"
  ]
}, S0 = {
  interval: 80,
  frames: [
    "🌑 ",
    "🌒 ",
    "🌓 ",
    "🌔 ",
    "🌕 ",
    "🌖 ",
    "🌗 ",
    "🌘 "
  ]
}, O0 = {
  interval: 140,
  frames: [
    "🚶 ",
    "🏃 "
  ]
}, I0 = {
  interval: 80,
  frames: [
    "▐⠂       ▌",
    "▐⠈       ▌",
    "▐ ⠂      ▌",
    "▐ ⠠      ▌",
    "▐  ⡀     ▌",
    "▐  ⠠     ▌",
    "▐   ⠂    ▌",
    "▐   ⠈    ▌",
    "▐    ⠂   ▌",
    "▐    ⠠   ▌",
    "▐     ⡀  ▌",
    "▐     ⠠  ▌",
    "▐      ⠂ ▌",
    "▐      ⠈ ▌",
    "▐       ⠂▌",
    "▐       ⠠▌",
    "▐       ⡀▌",
    "▐      ⠠ ▌",
    "▐      ⠂ ▌",
    "▐     ⠈  ▌",
    "▐     ⠂  ▌",
    "▐    ⠠   ▌",
    "▐    ⡀   ▌",
    "▐   ⠠    ▌",
    "▐   ⠂    ▌",
    "▐  ⠈     ▌",
    "▐  ⠂     ▌",
    "▐ ⠠      ▌",
    "▐ ⡀      ▌",
    "▐⠠       ▌"
  ]
}, M0 = {
  interval: 120,
  frames: [
    "▐|\\____________▌",
    "▐_|\\___________▌",
    "▐__|\\__________▌",
    "▐___|\\_________▌",
    "▐____|\\________▌",
    "▐_____|\\_______▌",
    "▐______|\\______▌",
    "▐_______|\\_____▌",
    "▐________|\\____▌",
    "▐_________|\\___▌",
    "▐__________|\\__▌",
    "▐___________|\\_▌",
    "▐____________|\\▌",
    "▐____________/|▌",
    "▐___________/|_▌",
    "▐__________/|__▌",
    "▐_________/|___▌",
    "▐________/|____▌",
    "▐_______/|_____▌",
    "▐______/|______▌",
    "▐_____/|_______▌",
    "▐____/|________▌",
    "▐___/|_________▌",
    "▐__/|__________▌",
    "▐_/|___________▌",
    "▐/|____________▌"
  ]
}, R0 = {
  interval: 100,
  frames: [
    "d",
    "q",
    "p",
    "b"
  ]
}, j0 = {
  interval: 100,
  frames: [
    "☀️ ",
    "☀️ ",
    "☀️ ",
    "🌤 ",
    "⛅️ ",
    "🌥 ",
    "☁️ ",
    "🌧 ",
    "🌨 ",
    "🌧 ",
    "🌨 ",
    "🌧 ",
    "🌨 ",
    "⛈ ",
    "🌨 ",
    "🌧 ",
    "🌨 ",
    "☁️ ",
    "🌥 ",
    "⛅️ ",
    "🌤 ",
    "☀️ ",
    "☀️ "
  ]
}, P0 = {
  interval: 400,
  frames: [
    "🌲",
    "🎄"
  ]
}, $0 = {
  interval: 80,
  frames: [
    "،  ",
    "′  ",
    " ´ ",
    " ‾ ",
    "  ⸌",
    "  ⸊",
    "  |",
    "  ⁎",
    "  ⁕",
    " ෴ ",
    "  ⁓",
    "   ",
    "   ",
    "   "
  ]
}, G0 = {
  interval: 125,
  frames: [
    "∙∙∙",
    "●∙∙",
    "∙●∙",
    "∙∙●",
    "∙∙∙"
  ]
}, k0 = {
  interval: 150,
  frames: [
    "-",
    "=",
    "≡"
  ]
}, N0 = {
  interval: 80,
  frames: [
    "ρββββββ",
    "βρβββββ",
    "ββρββββ",
    "βββρβββ",
    "ββββρββ",
    "βββββρβ",
    "ββββββρ"
  ]
}, L0 = {
  interval: 160,
  frames: [
    "🤘 ",
    "🤟 ",
    "🖖 ",
    "✋ ",
    "🤚 ",
    "👆 "
  ]
}, W0 = {
  interval: 80,
  frames: [
    "🤜　　　　🤛 ",
    "🤜　　　　🤛 ",
    "🤜　　　　🤛 ",
    "　🤜　　🤛　 ",
    "　　🤜🤛　　 ",
    "　🤜✨🤛　　 ",
    "🤜　✨　🤛　 "
  ]
}, Y0 = {
  interval: 80,
  frames: [
    " 🧑⚽️       🧑 ",
    "🧑  ⚽️      🧑 ",
    "🧑   ⚽️     🧑 ",
    "🧑    ⚽️    🧑 ",
    "🧑     ⚽️   🧑 ",
    "🧑      ⚽️  🧑 ",
    "🧑       ⚽️🧑  ",
    "🧑      ⚽️  🧑 ",
    "🧑     ⚽️   🧑 ",
    "🧑    ⚽️    🧑 ",
    "🧑   ⚽️     🧑 ",
    "🧑  ⚽️      🧑 "
  ]
}, q0 = {
  interval: 160,
  frames: [
    "😐 ",
    "😐 ",
    "😮 ",
    "😮 ",
    "😦 ",
    "😦 ",
    "😧 ",
    "😧 ",
    "🤯 ",
    "💥 ",
    "✨ ",
    "　 ",
    "　 ",
    "　 "
  ]
}, U0 = {
  interval: 160,
  frames: [
    "🔈 ",
    "🔉 ",
    "🔊 ",
    "🔉 "
  ]
}, H0 = {
  interval: 100,
  frames: [
    "🔸 ",
    "🔶 ",
    "🟠 ",
    "🟠 ",
    "🔶 "
  ]
}, V0 = {
  interval: 100,
  frames: [
    "🔹 ",
    "🔷 ",
    "🔵 ",
    "🔵 ",
    "🔷 "
  ]
}, z0 = {
  interval: 100,
  frames: [
    "🔸 ",
    "🔶 ",
    "🟠 ",
    "🟠 ",
    "🔶 ",
    "🔹 ",
    "🔷 ",
    "🔵 ",
    "🔵 ",
    "🔷 "
  ]
}, Z0 = {
  interval: 100,
  frames: [
    "🕛 ",
    "🕚 ",
    "🕙 ",
    "🕘 ",
    "🕗 ",
    "🕖 ",
    "🕕 ",
    "🕔 ",
    "🕓 ",
    "🕒 ",
    "🕑 ",
    "🕐 "
  ]
}, K0 = {
  interval: 80,
  frames: [
    "▰▱▱▱▱▱▱",
    "▰▰▱▱▱▱▱",
    "▰▰▰▱▱▱▱",
    "▰▰▰▰▱▱▱",
    "▰▰▰▰▰▱▱",
    "▰▰▰▰▰▰▱",
    "▰▰▰▰▰▰▰",
    "▰▱▱▱▱▱▱"
  ]
}, Q0 = {
  interval: 80,
  frames: [
    " ██████£££  ",
    "☺██████£££  ",
    "☺██████£££  ",
    "☺▓█████£££  ",
    "☺▓█████£££  ",
    "☺▒█████£££  ",
    "☺▒█████£££  ",
    "☺░█████£££  ",
    "☺░█████£££  ",
    "☺ █████£££  ",
    " ☺█████£££  ",
    " ☺█████£££  ",
    " ☺▓████£££  ",
    " ☺▓████£££  ",
    " ☺▒████£££  ",
    " ☺▒████£££  ",
    " ☺░████£££  ",
    " ☺░████£££  ",
    " ☺ ████£££  ",
    "  ☺████£££  ",
    "  ☺████£££  ",
    "  ☺▓███£££  ",
    "  ☺▓███£££  ",
    "  ☺▒███£££  ",
    "  ☺▒███£££  ",
    "  ☺░███£££  ",
    "  ☺░███£££  ",
    "  ☺ ███£££  ",
    "   ☺███£££  ",
    "   ☺███£££  ",
    "   ☺▓██£££  ",
    "   ☺▓██£££  ",
    "   ☺▒██£££  ",
    "   ☺▒██£££  ",
    "   ☺░██£££  ",
    "   ☺░██£££  ",
    "   ☺ ██£££  ",
    "    ☺██£££  ",
    "    ☺██£££  ",
    "    ☺▓█£££  ",
    "    ☺▓█£££  ",
    "    ☺▒█£££  ",
    "    ☺▒█£££  ",
    "    ☺░█£££  ",
    "    ☺░█£££  ",
    "    ☺ █£££  ",
    "     ☺█£££  ",
    "     ☺█£££  ",
    "     ☺▓£££  ",
    "     ☺▓£££  ",
    "     ☺▒£££  ",
    "     ☺▒£££  ",
    "     ☺░£££  ",
    "     ☺░£££  ",
    "     ☺ £££  ",
    "      ☺£££  ",
    "      ☺£££  ",
    "      ☺▓££  ",
    "      ☺▓££  ",
    "      ☺▒££  ",
    "      ☺▒££  ",
    "      ☺░££  ",
    "      ☺░££  ",
    "      ☺ ££  ",
    "       ☺££  ",
    "       ☺££  ",
    "       ☺▓£  ",
    "       ☺▓£  ",
    "       ☺▒£  ",
    "       ☺▒£  ",
    "       ☺░£  ",
    "       ☺░£  ",
    "       ☺ £  ",
    "        ☺£  ",
    "        ☺£  ",
    "        ☺▓  ",
    "        ☺▓  ",
    "        ☺▒  ",
    "        ☺▒  ",
    "        ☺░  ",
    "        ☺░  ",
    "        ☺   ",
    "        ☺  &",
    "        ☺ ☼&",
    "       ☺ ☼ &",
    "       ☺☼  &",
    "      ☺☼  & ",
    "      ‼   & ",
    "     ☺   &  ",
    "    ‼    &  ",
    "   ☺    &   ",
    "  ‼     &   ",
    " ☺     &    ",
    "‼      &    ",
    "      &     ",
    "      &     ",
    "     &   ░  ",
    "     &   ▒  ",
    "    &    ▓  ",
    "    &    £  ",
    "   &    ░£  ",
    "   &    ▒£  ",
    "  &     ▓£  ",
    "  &     ££  ",
    " &     ░££  ",
    " &     ▒££  ",
    "&      ▓££  ",
    "&      £££  ",
    "      ░£££  ",
    "      ▒£££  ",
    "      ▓£££  ",
    "      █£££  ",
    "     ░█£££  ",
    "     ▒█£££  ",
    "     ▓█£££  ",
    "     ██£££  ",
    "    ░██£££  ",
    "    ▒██£££  ",
    "    ▓██£££  ",
    "    ███£££  ",
    "   ░███£££  ",
    "   ▒███£££  ",
    "   ▓███£££  ",
    "   ████£££  ",
    "  ░████£££  ",
    "  ▒████£££  ",
    "  ▓████£££  ",
    "  █████£££  ",
    " ░█████£££  ",
    " ▒█████£££  ",
    " ▓█████£££  ",
    " ██████£££  ",
    " ██████£££  "
  ]
}, X0 = {
  dots: dD,
  dots2: mD,
  dots3: pD,
  dots4: gD,
  dots5: vD,
  dots6: bD,
  dots7: xD,
  dots8: yD,
  dots9: TD,
  dots10: wD,
  dots11: SD,
  dots12: OD,
  dots13: ID,
  dots8Bit: MD,
  sand: RD,
  line: jD,
  line2: PD,
  pipe: $D,
  simpleDots: GD,
  simpleDotsScrolling: kD,
  star: ND,
  star2: LD,
  flip: WD,
  hamburger: YD,
  growVertical: qD,
  growHorizontal: UD,
  balloon: HD,
  balloon2: VD,
  noise: zD,
  bounce: ZD,
  boxBounce: KD,
  boxBounce2: QD,
  triangle: XD,
  binary: JD,
  arc: u0,
  circle: D0,
  squareCorners: e0,
  circleQuarters: t0,
  circleHalves: F0,
  squish: r0,
  toggle: n0,
  toggle2: s0,
  toggle3: i0,
  toggle4: o0,
  toggle5: a0,
  toggle6: l0,
  toggle7: E0,
  toggle8: C0,
  toggle9: c0,
  toggle10: f0,
  toggle11: B0,
  toggle12: _0,
  toggle13: h0,
  arrow: A0,
  arrow2: d0,
  arrow3: m0,
  bouncingBar: p0,
  bouncingBall: g0,
  smiley: v0,
  monkey: b0,
  hearts: x0,
  clock: y0,
  earth: T0,
  material: w0,
  moon: S0,
  runner: O0,
  pong: I0,
  shark: M0,
  dqpb: R0,
  weather: j0,
  christmas: P0,
  grenade: $0,
  point: G0,
  layer: k0,
  betaWave: N0,
  fingerDance: L0,
  fistBump: W0,
  soccerHeader: Y0,
  mindblown: q0,
  speaker: U0,
  orangePulse: H0,
  bluePulse: V0,
  orangeBluePulse: z0,
  timeTravel: Z0,
  aesthetic: K0,
  dwarfFortress: Q0
}, tu = Object.assign({}, X0), Ru = Object.keys(tu);
Object.defineProperty(tu, "random", {
  get() {
    const u = Math.floor(Math.random() * Ru.length), D = Ru[u];
    return tu[D];
  }
});
var J0 = tu;
const X = /* @__PURE__ */ du(J0), J = {
  info: "ℹ️",
  success: "✅",
  warning: "⚠️",
  error: "❌️"
};
function ue({ onlyFirst: u = !1 } = {}) {
  const D = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
  ].join("|");
  return new RegExp(D, u ? void 0 : "g");
}
const De = ue();
function Gu(u) {
  if (typeof u != "string")
    throw new TypeError(`Expected a \`string\`, got \`${typeof u}\``);
  return u.replace(De, "");
}
function ee(u) {
  return u === 161 || u === 164 || u === 167 || u === 168 || u === 170 || u === 173 || u === 174 || u >= 176 && u <= 180 || u >= 182 && u <= 186 || u >= 188 && u <= 191 || u === 198 || u === 208 || u === 215 || u === 216 || u >= 222 && u <= 225 || u === 230 || u >= 232 && u <= 234 || u === 236 || u === 237 || u === 240 || u === 242 || u === 243 || u >= 247 && u <= 250 || u === 252 || u === 254 || u === 257 || u === 273 || u === 275 || u === 283 || u === 294 || u === 295 || u === 299 || u >= 305 && u <= 307 || u === 312 || u >= 319 && u <= 322 || u === 324 || u >= 328 && u <= 331 || u === 333 || u === 338 || u === 339 || u === 358 || u === 359 || u === 363 || u === 462 || u === 464 || u === 466 || u === 468 || u === 470 || u === 472 || u === 474 || u === 476 || u === 593 || u === 609 || u === 708 || u === 711 || u >= 713 && u <= 715 || u === 717 || u === 720 || u >= 728 && u <= 731 || u === 733 || u === 735 || u >= 768 && u <= 879 || u >= 913 && u <= 929 || u >= 931 && u <= 937 || u >= 945 && u <= 961 || u >= 963 && u <= 969 || u === 1025 || u >= 1040 && u <= 1103 || u === 1105 || u === 8208 || u >= 8211 && u <= 8214 || u === 8216 || u === 8217 || u === 8220 || u === 8221 || u >= 8224 && u <= 8226 || u >= 8228 && u <= 8231 || u === 8240 || u === 8242 || u === 8243 || u === 8245 || u === 8251 || u === 8254 || u === 8308 || u === 8319 || u >= 8321 && u <= 8324 || u === 8364 || u === 8451 || u === 8453 || u === 8457 || u === 8467 || u === 8470 || u === 8481 || u === 8482 || u === 8486 || u === 8491 || u === 8531 || u === 8532 || u >= 8539 && u <= 8542 || u >= 8544 && u <= 8555 || u >= 8560 && u <= 8569 || u === 8585 || u >= 8592 && u <= 8601 || u === 8632 || u === 8633 || u === 8658 || u === 8660 || u === 8679 || u === 8704 || u === 8706 || u === 8707 || u === 8711 || u === 8712 || u === 8715 || u === 8719 || u === 8721 || u === 8725 || u === 8730 || u >= 8733 && u <= 8736 || u === 8739 || u === 8741 || u >= 8743 && u <= 8748 || u === 8750 || u >= 8756 && u <= 8759 || u === 8764 || u === 8765 || u === 8776 || u === 8780 || u === 8786 || u === 8800 || u === 8801 || u >= 8804 && u <= 8807 || u === 8810 || u === 8811 || u === 8814 || u === 8815 || u === 8834 || u === 8835 || u === 8838 || u === 8839 || u === 8853 || u === 8857 || u === 8869 || u === 8895 || u === 8978 || u >= 9312 && u <= 9449 || u >= 9451 && u <= 9547 || u >= 9552 && u <= 9587 || u >= 9600 && u <= 9615 || u >= 9618 && u <= 9621 || u === 9632 || u === 9633 || u >= 9635 && u <= 9641 || u === 9650 || u === 9651 || u === 9654 || u === 9655 || u === 9660 || u === 9661 || u === 9664 || u === 9665 || u >= 9670 && u <= 9672 || u === 9675 || u >= 9678 && u <= 9681 || u >= 9698 && u <= 9701 || u === 9711 || u === 9733 || u === 9734 || u === 9737 || u === 9742 || u === 9743 || u === 9756 || u === 9758 || u === 9792 || u === 9794 || u === 9824 || u === 9825 || u >= 9827 && u <= 9829 || u >= 9831 && u <= 9834 || u === 9836 || u === 9837 || u === 9839 || u === 9886 || u === 9887 || u === 9919 || u >= 9926 && u <= 9933 || u >= 9935 && u <= 9939 || u >= 9941 && u <= 9953 || u === 9955 || u === 9960 || u === 9961 || u >= 9963 && u <= 9969 || u === 9972 || u >= 9974 && u <= 9977 || u === 9979 || u === 9980 || u === 9982 || u === 9983 || u === 10045 || u >= 10102 && u <= 10111 || u >= 11094 && u <= 11097 || u >= 12872 && u <= 12879 || u >= 57344 && u <= 63743 || u >= 65024 && u <= 65039 || u === 65533 || u >= 127232 && u <= 127242 || u >= 127248 && u <= 127277 || u >= 127280 && u <= 127337 || u >= 127344 && u <= 127373 || u === 127375 || u === 127376 || u >= 127387 && u <= 127404 || u >= 917760 && u <= 917999 || u >= 983040 && u <= 1048573 || u >= 1048576 && u <= 1114109;
}
function te(u) {
  return u === 12288 || u >= 65281 && u <= 65376 || u >= 65504 && u <= 65510;
}
function Fe(u) {
  return u >= 4352 && u <= 4447 || u === 8986 || u === 8987 || u === 9001 || u === 9002 || u >= 9193 && u <= 9196 || u === 9200 || u === 9203 || u === 9725 || u === 9726 || u === 9748 || u === 9749 || u >= 9800 && u <= 9811 || u === 9855 || u === 9875 || u === 9889 || u === 9898 || u === 9899 || u === 9917 || u === 9918 || u === 9924 || u === 9925 || u === 9934 || u === 9940 || u === 9962 || u === 9970 || u === 9971 || u === 9973 || u === 9978 || u === 9981 || u === 9989 || u === 9994 || u === 9995 || u === 10024 || u === 10060 || u === 10062 || u >= 10067 && u <= 10069 || u === 10071 || u >= 10133 && u <= 10135 || u === 10160 || u === 10175 || u === 11035 || u === 11036 || u === 11088 || u === 11093 || u >= 11904 && u <= 11929 || u >= 11931 && u <= 12019 || u >= 12032 && u <= 12245 || u >= 12272 && u <= 12287 || u >= 12289 && u <= 12350 || u >= 12353 && u <= 12438 || u >= 12441 && u <= 12543 || u >= 12549 && u <= 12591 || u >= 12593 && u <= 12686 || u >= 12688 && u <= 12771 || u >= 12783 && u <= 12830 || u >= 12832 && u <= 12871 || u >= 12880 && u <= 19903 || u >= 19968 && u <= 42124 || u >= 42128 && u <= 42182 || u >= 43360 && u <= 43388 || u >= 44032 && u <= 55203 || u >= 63744 && u <= 64255 || u >= 65040 && u <= 65049 || u >= 65072 && u <= 65106 || u >= 65108 && u <= 65126 || u >= 65128 && u <= 65131 || u >= 94176 && u <= 94180 || u === 94192 || u === 94193 || u >= 94208 && u <= 100343 || u >= 100352 && u <= 101589 || u >= 101632 && u <= 101640 || u >= 110576 && u <= 110579 || u >= 110581 && u <= 110587 || u === 110589 || u === 110590 || u >= 110592 && u <= 110882 || u === 110898 || u >= 110928 && u <= 110930 || u === 110933 || u >= 110948 && u <= 110951 || u >= 110960 && u <= 111355 || u === 126980 || u === 127183 || u === 127374 || u >= 127377 && u <= 127386 || u >= 127488 && u <= 127490 || u >= 127504 && u <= 127547 || u >= 127552 && u <= 127560 || u === 127568 || u === 127569 || u >= 127584 && u <= 127589 || u >= 127744 && u <= 127776 || u >= 127789 && u <= 127797 || u >= 127799 && u <= 127868 || u >= 127870 && u <= 127891 || u >= 127904 && u <= 127946 || u >= 127951 && u <= 127955 || u >= 127968 && u <= 127984 || u === 127988 || u >= 127992 && u <= 128062 || u === 128064 || u >= 128066 && u <= 128252 || u >= 128255 && u <= 128317 || u >= 128331 && u <= 128334 || u >= 128336 && u <= 128359 || u === 128378 || u === 128405 || u === 128406 || u === 128420 || u >= 128507 && u <= 128591 || u >= 128640 && u <= 128709 || u === 128716 || u >= 128720 && u <= 128722 || u >= 128725 && u <= 128727 || u >= 128732 && u <= 128735 || u === 128747 || u === 128748 || u >= 128756 && u <= 128764 || u >= 128992 && u <= 129003 || u === 129008 || u >= 129292 && u <= 129338 || u >= 129340 && u <= 129349 || u >= 129351 && u <= 129535 || u >= 129648 && u <= 129660 || u >= 129664 && u <= 129672 || u >= 129680 && u <= 129725 || u >= 129727 && u <= 129733 || u >= 129742 && u <= 129755 || u >= 129760 && u <= 129768 || u >= 129776 && u <= 129784 || u >= 131072 && u <= 196605 || u >= 196608 && u <= 262141;
}
function re(u) {
  if (!Number.isSafeInteger(u))
    throw new TypeError(`Expected a code point, got \`${typeof u}\`.`);
}
function ne(u, { ambiguousAsWide: D = !1 } = {}) {
  return re(u), te(u) || Fe(u) || D && ee(u) ? 2 : 1;
}
const se = () => /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC2\uDECE-\uDEDB\uDEE0-\uDEE8]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g, ie = new Intl.Segmenter();
function oe(u, D = {}) {
  if (typeof u != "string" || u.length === 0)
    return 0;
  const {
    ambiguousIsNarrow: e = !0,
    countAnsiEscapeCodes: t = !1
  } = D;
  if (t || (u = Gu(u)), u.length === 0)
    return 0;
  let r = 0;
  const n = { ambiguousAsWide: !e };
  for (const { segment: C } of ie.segment(u)) {
    const B = C.codePointAt(0);
    if (!(B <= 31 || B >= 127 && B <= 159) && !(B >= 768 && B <= 879)) {
      if (se().test(C)) {
        r += 2;
        continue;
      }
      r += ne(B, n);
    }
  }
  return r;
}
function ae({ stream: u = process.stdout } = {}) {
  return !!(u && u.isTTY && process.env.TERM !== "dumb" && !("CI" in process.env));
}
function le() {
  return i.platform !== "win32" ? i.env.TERM !== "linux" : !!i.env.WT_SESSION || !!i.env.TERMINUS_SUBLIME || i.env.ConEmuTask === "{cmd::Cmder}" || i.env.TERM_PROGRAM === "Terminus-Sublime" || i.env.TERM_PROGRAM === "vscode" || i.env.TERM === "xterm-256color" || i.env.TERM === "alacritty" || i.env.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}
const Ee = 3;
var x, Fu, ku, ru, Nu, U, _u;
class Ce {
  constructor() {
    l(this, Fu);
    l(this, ru);
    l(this, U);
    l(this, x, 0);
  }
  start() {
    Z(this, x)._++, F(this, x) === 1 && _(this, Fu, ku).call(this);
  }
  stop() {
    if (F(this, x) <= 0)
      throw new Error("`stop` called more times than `start`");
    Z(this, x)._--, F(this, x) === 0 && _(this, ru, Nu).call(this);
  }
}
x = new WeakMap(), Fu = new WeakSet(), ku = function() {
  i.platform === "win32" || !i.stdin.isTTY || (i.stdin.setRawMode(!0), i.stdin.on("data", _(this, U, _u)), i.stdin.resume());
}, ru = new WeakSet(), Nu = function() {
  i.stdin.isTTY && (i.stdin.off("data", _(this, U, _u)), i.stdin.pause(), i.stdin.setRawMode(!1));
}, U = new WeakSet(), _u = function(D) {
  D[0] === Ee && i.emit("SIGINT");
};
const ce = new Ce(), ju = ce;
var y, P, S, b, E, m, f, O, $, p, g, v, G, h, A, H, hu, V, Au, I, Y;
class fe {
  constructor(D) {
    l(this, H);
    l(this, V);
    l(this, I);
    l(this, y, 0);
    l(this, P, !1);
    l(this, S, 0);
    l(this, b, 0);
    l(this, E, void 0);
    l(this, m, void 0);
    l(this, f, void 0);
    l(this, O, void 0);
    l(this, $, void 0);
    l(this, p, void 0);
    l(this, g, void 0);
    l(this, v, void 0);
    l(this, G, void 0);
    l(this, h, void 0);
    l(this, A, void 0);
    pu(this, "color");
    typeof D == "string" && (D = {
      text: D
    }), s(this, E, {
      color: "cyan",
      stream: i.stderr,
      discardStdin: !0,
      hideCursor: !0,
      ...D
    }), this.color = F(this, E).color, this.spinner = F(this, E).spinner, s(this, $, F(this, E).interval), s(this, f, F(this, E).stream), s(this, p, typeof F(this, E).isEnabled == "boolean" ? F(this, E).isEnabled : ae({ stream: F(this, f) })), s(this, g, typeof F(this, E).isSilent == "boolean" ? F(this, E).isSilent : !1), this.text = F(this, E).text, this.prefixText = F(this, E).prefixText, this.suffixText = F(this, E).suffixText, this.indent = F(this, E).indent, i.env.NODE_ENV === "test" && (this._stream = F(this, f), this._isEnabled = F(this, p), Object.defineProperty(this, "_linesToClear", {
      get() {
        return F(this, y);
      },
      set(e) {
        s(this, y, e);
      }
    }), Object.defineProperty(this, "_frameIndex", {
      get() {
        return F(this, b);
      }
    }), Object.defineProperty(this, "_lineCount", {
      get() {
        return F(this, S);
      }
    }));
  }
  get indent() {
    return F(this, v);
  }
  set indent(D = 0) {
    if (!(D >= 0 && Number.isInteger(D)))
      throw new Error("The `indent` option must be an integer from 0 and up");
    s(this, v, D), _(this, I, Y).call(this);
  }
  get interval() {
    return F(this, $) ?? F(this, m).interval ?? 100;
  }
  get spinner() {
    return F(this, m);
  }
  set spinner(D) {
    if (s(this, b, 0), s(this, $, void 0), typeof D == "object") {
      if (D.frames === void 0)
        throw new Error("The given spinner must have a `frames` property");
      s(this, m, D);
    } else if (!le())
      s(this, m, X.line);
    else if (D === void 0)
      s(this, m, X.dots);
    else if (D !== "default" && X[D])
      s(this, m, X[D]);
    else
      throw new Error(`There is no built-in spinner named '${D}'. See https://github.com/sindresorhus/cli-spinners/blob/main/spinners.json for a full list.`);
  }
  get text() {
    return F(this, G);
  }
  set text(D = "") {
    s(this, G, D), _(this, I, Y).call(this);
  }
  get prefixText() {
    return F(this, h);
  }
  set prefixText(D = "") {
    s(this, h, D), _(this, I, Y).call(this);
  }
  get suffixText() {
    return F(this, A);
  }
  set suffixText(D = "") {
    s(this, A, D), _(this, I, Y).call(this);
  }
  get isSpinning() {
    return F(this, O) !== void 0;
  }
  get isEnabled() {
    return F(this, p) && !F(this, g);
  }
  set isEnabled(D) {
    if (typeof D != "boolean")
      throw new TypeError("The `isEnabled` option must be a boolean");
    s(this, p, D);
  }
  get isSilent() {
    return F(this, g);
  }
  set isSilent(D) {
    if (typeof D != "boolean")
      throw new TypeError("The `isSilent` option must be a boolean");
    s(this, g, D);
  }
  frame() {
    const { frames: D } = F(this, m);
    let e = D[F(this, b)];
    this.color && (e = nD[this.color](e)), s(this, b, ++Z(this, b)._ % D.length);
    const t = typeof F(this, h) == "string" && F(this, h) !== "" ? F(this, h) + " " : "", r = typeof this.text == "string" ? " " + this.text : "", n = typeof F(this, A) == "string" && F(this, A) !== "" ? " " + F(this, A) : "";
    return t + e + r + n;
  }
  clear() {
    if (!F(this, p) || !F(this, f).isTTY)
      return this;
    F(this, f).cursorTo(0);
    for (let D = 0; D < F(this, y); D++)
      D > 0 && F(this, f).moveCursor(0, -1), F(this, f).clearLine(1);
    return (F(this, v) || this.lastIndent !== F(this, v)) && F(this, f).cursorTo(F(this, v)), this.lastIndent = F(this, v), s(this, y, 0), this;
  }
  render() {
    return F(this, g) ? this : (this.clear(), F(this, f).write(this.frame()), s(this, y, F(this, S)), this);
  }
  start(D) {
    return D && (this.text = D), F(this, g) ? this : F(this, p) ? this.isSpinning ? this : (F(this, E).hideCursor && M.hide(F(this, f)), F(this, E).discardStdin && i.stdin.isTTY && (s(this, P, !0), ju.start()), this.render(), s(this, O, setInterval(this.render.bind(this), this.interval)), this) : (this.text && F(this, f).write(`- ${this.text}
`), this);
  }
  stop() {
    return F(this, p) ? (clearInterval(F(this, O)), s(this, O, void 0), s(this, b, 0), this.clear(), F(this, E).hideCursor && M.show(F(this, f)), F(this, E).discardStdin && i.stdin.isTTY && F(this, P) && (ju.stop(), s(this, P, !1)), this) : this;
  }
  succeed(D) {
    return this.stopAndPersist({ symbol: J.success, text: D });
  }
  fail(D) {
    return this.stopAndPersist({ symbol: J.error, text: D });
  }
  warn(D) {
    return this.stopAndPersist({ symbol: J.warning, text: D });
  }
  info(D) {
    return this.stopAndPersist({ symbol: J.info, text: D });
  }
  stopAndPersist(D = {}) {
    if (F(this, g))
      return this;
    const e = D.prefixText ?? F(this, h), t = _(this, H, hu).call(this, e, " "), r = D.symbol ?? " ", n = D.text ?? this.text, C = typeof n == "string" ? " " + n : "", B = D.suffixText ?? F(this, A), Lu = _(this, V, Au).call(this, B, " "), Wu = t + r + C + Lu + `
`;
    return this.stop(), F(this, f).write(Wu), this;
  }
}
y = new WeakMap(), P = new WeakMap(), S = new WeakMap(), b = new WeakMap(), E = new WeakMap(), m = new WeakMap(), f = new WeakMap(), O = new WeakMap(), $ = new WeakMap(), p = new WeakMap(), g = new WeakMap(), v = new WeakMap(), G = new WeakMap(), h = new WeakMap(), A = new WeakMap(), H = new WeakSet(), hu = function(D = F(this, h), e = " ") {
  return typeof D == "string" && D !== "" ? D + e : typeof D == "function" ? D() + e : "";
}, V = new WeakSet(), Au = function(D = F(this, A), e = " ") {
  return typeof D == "string" && D !== "" ? e + D : typeof D == "function" ? e + D() : "";
}, I = new WeakSet(), Y = function() {
  const D = F(this, f).columns ?? 80, e = _(this, H, hu).call(this, F(this, h), "-"), t = _(this, V, Au).call(this, F(this, A), "-"), r = " ".repeat(F(this, v)) + e + "--" + F(this, G) + "--" + t;
  s(this, S, 0);
  for (const n of Gu(r).split(`
`))
    s(this, S, F(this, S) + Math.max(1, Math.ceil(oe(n, { countAnsiEscapeCodes: !0 }) / D)));
};
function Be(u) {
  return new fe(u);
}
const Cu = {};
function he(u) {
  const { name: D, current: e, total: t } = u;
  let r = Cu[D];
  r || (r = Be(D).start(), Cu[D] = r);
  const n = e ? Math.floor(e / t * 100) : 0, C = "[" + "=".repeat(Math.ceil(n / 2)) + ">".repeat(n === 100 ? 0 : 1) + " ".repeat(50 - Math.ceil(n / 2)) + "]", B = `${D}: ${e}/${t} | ${n}% ${C}`;
  r.text = B, n === 100 && (r.succeed(B), Cu[D] = null);
}
export {
  he as progress
};
