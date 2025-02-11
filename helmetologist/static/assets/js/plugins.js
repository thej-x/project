/*********************************************************************************
    Template Name: Optimal Multipurpose eCommerce Bootstrap 5 Html Template
    Description: A perfect template to build beautiful and unique Fashion websites. It comes with nice and clean design.
    Version: 1.0
**********************************************************************************/

/*------------------------------------------
 * 1. Bootstrap v5.0.2
-------------------------------------------*/
/*! Bootstrap v5.0.2 (https://getbootstrap.com/)
 * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE) */
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : ((t =
        "undefined" != typeof globalThis ? globalThis : t || self).bootstrap =
        e());
})(this, function () {
  "use strict";
  const t = {
      find: (t, e = document.documentElement) =>
        [].concat(...Element.prototype.querySelectorAll.call(e, t)),
      findOne: (t, e = document.documentElement) =>
        Element.prototype.querySelector.call(e, t),
      children: (t, e) => [].concat(...t.children).filter((t) => t.matches(e)),
      parents(t, e) {
        const i = [];
        let n = t.parentNode;
        for (; n && n.nodeType === Node.ELEMENT_NODE && 3 !== n.nodeType; )
          n.matches(e) && i.push(n), (n = n.parentNode);
        return i;
      },
      prev(t, e) {
        let i = t.previousElementSibling;
        for (; i; ) {
          if (i.matches(e)) return [i];
          i = i.previousElementSibling;
        }
        return [];
      },
      next(t, e) {
        let i = t.nextElementSibling;
        for (; i; ) {
          if (i.matches(e)) return [i];
          i = i.nextElementSibling;
        }
        return [];
      },
    },
    e = (t) => {
      do {
        t += Math.floor(1e6 * Math.random());
      } while (document.getElementById(t));
      return t;
    },
    i = (t) => {
      let e = t.getAttribute("data-bs-target");
      if (!e || "#" === e) {
        let i = t.getAttribute("href");
        if (!i || (!i.includes("#") && !i.startsWith("."))) return null;
        i.includes("#") && !i.startsWith("#") && (i = "#" + i.split("#")[1]),
          (e = i && "#" !== i ? i.trim() : null);
      }
      return e;
    },
    n = (t) => {
      const e = i(t);
      return e && document.querySelector(e) ? e : null;
    },
    s = (t) => {
      const e = i(t);
      return e ? document.querySelector(e) : null;
    },
    o = (t) => {
      t.dispatchEvent(new Event("transitionend"));
    },
    r = (t) =>
      !(!t || "object" != typeof t) &&
      (void 0 !== t.jquery && (t = t[0]), void 0 !== t.nodeType),
    a = (e) =>
      r(e)
        ? e.jquery
          ? e[0]
          : e
        : "string" == typeof e && e.length > 0
        ? t.findOne(e)
        : null,
    l = (t, e, i) => {
      Object.keys(i).forEach((n) => {
        const s = i[n],
          o = e[n],
          a =
            o && r(o)
              ? "element"
              : null == (l = o)
              ? "" + l
              : {}.toString
                  .call(l)
                  .match(/\s([a-z]+)/i)[1]
                  .toLowerCase();
        var l;
        if (!new RegExp(s).test(a))
          throw new TypeError(
            `${t.toUpperCase()}: Option "${n}" provided type "${a}" but expected type "${s}".`
          );
      });
    },
    c = (t) =>
      !(!r(t) || 0 === t.getClientRects().length) &&
      "visible" === getComputedStyle(t).getPropertyValue("visibility"),
    h = (t) =>
      !t ||
      t.nodeType !== Node.ELEMENT_NODE ||
      !!t.classList.contains("disabled") ||
      (void 0 !== t.disabled
        ? t.disabled
        : t.hasAttribute("disabled") && "false" !== t.getAttribute("disabled")),
    d = (t) => {
      if (!document.documentElement.attachShadow) return null;
      if ("function" == typeof t.getRootNode) {
        const e = t.getRootNode();
        return e instanceof ShadowRoot ? e : null;
      }
      return t instanceof ShadowRoot
        ? t
        : t.parentNode
        ? d(t.parentNode)
        : null;
    },
    u = () => {},
    f = (t) => t.offsetHeight,
    p = () => {
      const { jQuery: t } = window;
      return t && !document.body.hasAttribute("data-bs-no-jquery") ? t : null;
    },
    m = [],
    g = () => "rtl" === document.documentElement.dir,
    _ = (t) => {
      var e;
      (e = () => {
        const e = p();
        if (e) {
          const i = t.NAME,
            n = e.fn[i];
          (e.fn[i] = t.jQueryInterface),
            (e.fn[i].Constructor = t),
            (e.fn[i].noConflict = () => ((e.fn[i] = n), t.jQueryInterface));
        }
      }),
        "loading" === document.readyState
          ? (m.length ||
              document.addEventListener("DOMContentLoaded", () => {
                m.forEach((t) => t());
              }),
            m.push(e))
          : e();
    },
    b = (t) => {
      "function" == typeof t && t();
    },
    v = (t, e, i = !0) => {
      if (!i) return void b(t);
      const n =
        ((t) => {
          if (!t) return 0;
          let { transitionDuration: e, transitionDelay: i } =
            window.getComputedStyle(t);
          const n = Number.parseFloat(e),
            s = Number.parseFloat(i);
          return n || s
            ? ((e = e.split(",")[0]),
              (i = i.split(",")[0]),
              1e3 * (Number.parseFloat(e) + Number.parseFloat(i)))
            : 0;
        })(e) + 5;
      let s = !1;
      const r = ({ target: i }) => {
        i === e && ((s = !0), e.removeEventListener("transitionend", r), b(t));
      };
      e.addEventListener("transitionend", r),
        setTimeout(() => {
          s || o(e);
        }, n);
    },
    y = (t, e, i, n) => {
      let s = t.indexOf(e);
      if (-1 === s) return t[!i && n ? t.length - 1 : 0];
      const o = t.length;
      return (
        (s += i ? 1 : -1),
        n && (s = (s + o) % o),
        t[Math.max(0, Math.min(s, o - 1))]
      );
    },
    w = /[^.]*(?=\..*)\.|.*/,
    E = /\..*/,
    A = /::\d+$/,
    T = {};
  let O = 1;
  const C = { mouseenter: "mouseover", mouseleave: "mouseout" },
    k = /^(mouseenter|mouseleave)/i,
    L = new Set([
      "click",
      "dblclick",
      "mouseup",
      "mousedown",
      "contextmenu",
      "mousewheel",
      "DOMMouseScroll",
      "mouseover",
      "mouseout",
      "mousemove",
      "selectstart",
      "selectend",
      "keydown",
      "keypress",
      "keyup",
      "orientationchange",
      "touchstart",
      "touchmove",
      "touchend",
      "touchcancel",
      "pointerdown",
      "pointermove",
      "pointerup",
      "pointerleave",
      "pointercancel",
      "gesturestart",
      "gesturechange",
      "gestureend",
      "focus",
      "blur",
      "change",
      "reset",
      "select",
      "submit",
      "focusin",
      "focusout",
      "load",
      "unload",
      "beforeunload",
      "resize",
      "move",
      "DOMContentLoaded",
      "readystatechange",
      "error",
      "abort",
      "scroll",
    ]);
  function x(t, e) {
    return (e && `${e}::${O++}`) || t.uidEvent || O++;
  }
  function D(t) {
    const e = x(t);
    return (t.uidEvent = e), (T[e] = T[e] || {}), T[e];
  }
  function S(t, e, i = null) {
    const n = Object.keys(t);
    for (let s = 0, o = n.length; s < o; s++) {
      const o = t[n[s]];
      if (o.originalHandler === e && o.delegationSelector === i) return o;
    }
    return null;
  }
  function I(t, e, i) {
    const n = "string" == typeof e,
      s = n ? i : e;
    let o = M(t);
    return L.has(o) || (o = t), [n, s, o];
  }
  function N(t, e, i, n, s) {
    if ("string" != typeof e || !t) return;
    if ((i || ((i = n), (n = null)), k.test(e))) {
      const t = (t) =>
        function (e) {
          if (
            !e.relatedTarget ||
            (e.relatedTarget !== e.delegateTarget &&
              !e.delegateTarget.contains(e.relatedTarget))
          )
            return t.call(this, e);
        };
      n ? (n = t(n)) : (i = t(i));
    }
    const [o, r, a] = I(e, i, n),
      l = D(t),
      c = l[a] || (l[a] = {}),
      h = S(c, r, o ? i : null);
    if (h) return void (h.oneOff = h.oneOff && s);
    const d = x(r, e.replace(w, "")),
      u = o
        ? (function (t, e, i) {
            return function n(s) {
              const o = t.querySelectorAll(e);
              for (let { target: r } = s; r && r !== this; r = r.parentNode)
                for (let a = o.length; a--; )
                  if (o[a] === r)
                    return (
                      (s.delegateTarget = r),
                      n.oneOff && P.off(t, s.type, e, i),
                      i.apply(r, [s])
                    );
              return null;
            };
          })(t, i, n)
        : (function (t, e) {
            return function i(n) {
              return (
                (n.delegateTarget = t),
                i.oneOff && P.off(t, n.type, e),
                e.apply(t, [n])
              );
            };
          })(t, i);
    (u.delegationSelector = o ? i : null),
      (u.originalHandler = r),
      (u.oneOff = s),
      (u.uidEvent = d),
      (c[d] = u),
      t.addEventListener(a, u, o);
  }
  function j(t, e, i, n, s) {
    const o = S(e[i], n, s);
    o && (t.removeEventListener(i, o, Boolean(s)), delete e[i][o.uidEvent]);
  }
  function M(t) {
    return (t = t.replace(E, "")), C[t] || t;
  }
  const P = {
      on(t, e, i, n) {
        N(t, e, i, n, !1);
      },
      one(t, e, i, n) {
        N(t, e, i, n, !0);
      },
      off(t, e, i, n) {
        if ("string" != typeof e || !t) return;
        const [s, o, r] = I(e, i, n),
          a = r !== e,
          l = D(t),
          c = e.startsWith(".");
        if (void 0 !== o) {
          if (!l || !l[r]) return;
          return void j(t, l, r, o, s ? i : null);
        }
        c &&
          Object.keys(l).forEach((i) => {
            !(function (t, e, i, n) {
              const s = e[i] || {};
              Object.keys(s).forEach((o) => {
                if (o.includes(n)) {
                  const n = s[o];
                  j(t, e, i, n.originalHandler, n.delegationSelector);
                }
              });
            })(t, l, i, e.slice(1));
          });
        const h = l[r] || {};
        Object.keys(h).forEach((i) => {
          const n = i.replace(A, "");
          if (!a || e.includes(n)) {
            const e = h[i];
            j(t, l, r, e.originalHandler, e.delegationSelector);
          }
        });
      },
      trigger(t, e, i) {
        if ("string" != typeof e || !t) return null;
        const n = p(),
          s = M(e),
          o = e !== s,
          r = L.has(s);
        let a,
          l = !0,
          c = !0,
          h = !1,
          d = null;
        return (
          o &&
            n &&
            ((a = n.Event(e, i)),
            n(t).trigger(a),
            (l = !a.isPropagationStopped()),
            (c = !a.isImmediatePropagationStopped()),
            (h = a.isDefaultPrevented())),
          r
            ? ((d = document.createEvent("HTMLEvents")), d.initEvent(s, l, !0))
            : (d = new CustomEvent(e, { bubbles: l, cancelable: !0 })),
          void 0 !== i &&
            Object.keys(i).forEach((t) => {
              Object.defineProperty(d, t, { get: () => i[t] });
            }),
          h && d.preventDefault(),
          c && t.dispatchEvent(d),
          d.defaultPrevented && void 0 !== a && a.preventDefault(),
          d
        );
      },
    },
    H = new Map();
  var R = {
    set(t, e, i) {
      H.has(t) || H.set(t, new Map());
      const n = H.get(t);
      n.has(e) || 0 === n.size
        ? n.set(e, i)
        : console.error(
            `Bootstrap doesn't allow more than one instance per element. Bound instance: ${
              Array.from(n.keys())[0]
            }.`
          );
    },
    get: (t, e) => (H.has(t) && H.get(t).get(e)) || null,
    remove(t, e) {
      if (!H.has(t)) return;
      const i = H.get(t);
      i.delete(e), 0 === i.size && H.delete(t);
    },
  };
  class B {
    constructor(t) {
      (t = a(t)) &&
        ((this._element = t),
        R.set(this._element, this.constructor.DATA_KEY, this));
    }
    dispose() {
      R.remove(this._element, this.constructor.DATA_KEY),
        P.off(this._element, this.constructor.EVENT_KEY),
        Object.getOwnPropertyNames(this).forEach((t) => {
          this[t] = null;
        });
    }
    _queueCallback(t, e, i = !0) {
      v(t, e, i);
    }
    static getInstance(t) {
      return R.get(t, this.DATA_KEY);
    }
    static getOrCreateInstance(t, e = {}) {
      return (
        this.getInstance(t) || new this(t, "object" == typeof e ? e : null)
      );
    }
    static get VERSION() {
      return "5.0.2";
    }
    static get NAME() {
      throw new Error(
        'You have to implement the static method "NAME", for each component!'
      );
    }
    static get DATA_KEY() {
      return "bs." + this.NAME;
    }
    static get EVENT_KEY() {
      return "." + this.DATA_KEY;
    }
  }
  class W extends B {
    static get NAME() {
      return "alert";
    }
    close(t) {
      const e = t ? this._getRootElement(t) : this._element,
        i = this._triggerCloseEvent(e);
      null === i || i.defaultPrevented || this._removeElement(e);
    }
    _getRootElement(t) {
      return s(t) || t.closest(".alert");
    }
    _triggerCloseEvent(t) {
      return P.trigger(t, "close.bs.alert");
    }
    _removeElement(t) {
      t.classList.remove("show");
      const e = t.classList.contains("fade");
      this._queueCallback(() => this._destroyElement(t), t, e);
    }
    _destroyElement(t) {
      t.remove(), P.trigger(t, "closed.bs.alert");
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = W.getOrCreateInstance(this);
        "close" === t && e[t](this);
      });
    }
    static handleDismiss(t) {
      return function (e) {
        e && e.preventDefault(), t.close(this);
      };
    }
  }
  P.on(
    document,
    "click.bs.alert.data-api",
    '[data-bs-dismiss="alert"]',
    W.handleDismiss(new W())
  ),
    _(W);
  class q extends B {
    static get NAME() {
      return "button";
    }
    toggle() {
      this._element.setAttribute(
        "aria-pressed",
        this._element.classList.toggle("active")
      );
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = q.getOrCreateInstance(this);
        "toggle" === t && e[t]();
      });
    }
  }
  function z(t) {
    return (
      "true" === t ||
      ("false" !== t &&
        (t === Number(t).toString()
          ? Number(t)
          : "" === t || "null" === t
          ? null
          : t))
    );
  }
  function $(t) {
    return t.replace(/[A-Z]/g, (t) => "-" + t.toLowerCase());
  }
  P.on(
    document,
    "click.bs.button.data-api",
    '[data-bs-toggle="button"]',
    (t) => {
      t.preventDefault();
      const e = t.target.closest('[data-bs-toggle="button"]');
      q.getOrCreateInstance(e).toggle();
    }
  ),
    _(q);
  const U = {
      setDataAttribute(t, e, i) {
        t.setAttribute("data-bs-" + $(e), i);
      },
      removeDataAttribute(t, e) {
        t.removeAttribute("data-bs-" + $(e));
      },
      getDataAttributes(t) {
        if (!t) return {};
        const e = {};
        return (
          Object.keys(t.dataset)
            .filter((t) => t.startsWith("bs"))
            .forEach((i) => {
              let n = i.replace(/^bs/, "");
              (n = n.charAt(0).toLowerCase() + n.slice(1, n.length)),
                (e[n] = z(t.dataset[i]));
            }),
          e
        );
      },
      getDataAttribute: (t, e) => z(t.getAttribute("data-bs-" + $(e))),
      offset(t) {
        const e = t.getBoundingClientRect();
        return {
          top: e.top + document.body.scrollTop,
          left: e.left + document.body.scrollLeft,
        };
      },
      position: (t) => ({ top: t.offsetTop, left: t.offsetLeft }),
    },
    F = {
      interval: 5e3,
      keyboard: !0,
      slide: !1,
      pause: "hover",
      wrap: !0,
      touch: !0,
    },
    V = {
      interval: "(number|boolean)",
      keyboard: "boolean",
      slide: "(boolean|string)",
      pause: "(string|boolean)",
      wrap: "boolean",
      touch: "boolean",
    },
    K = "next",
    X = "prev",
    Y = "left",
    Q = "right",
    G = { ArrowLeft: Q, ArrowRight: Y };
  class Z extends B {
    constructor(e, i) {
      super(e),
        (this._items = null),
        (this._interval = null),
        (this._activeElement = null),
        (this._isPaused = !1),
        (this._isSliding = !1),
        (this.touchTimeout = null),
        (this.touchStartX = 0),
        (this.touchDeltaX = 0),
        (this._config = this._getConfig(i)),
        (this._indicatorsElement = t.findOne(
          ".carousel-indicators",
          this._element
        )),
        (this._touchSupported =
          "ontouchstart" in document.documentElement ||
          navigator.maxTouchPoints > 0),
        (this._pointerEvent = Boolean(window.PointerEvent)),
        this._addEventListeners();
    }
    static get Default() {
      return F;
    }
    static get NAME() {
      return "carousel";
    }
    next() {
      this._slide(K);
    }
    nextWhenVisible() {
      !document.hidden && c(this._element) && this.next();
    }
    prev() {
      this._slide(X);
    }
    pause(e) {
      e || (this._isPaused = !0),
        t.findOne(".carousel-item-next, .carousel-item-prev", this._element) &&
          (o(this._element), this.cycle(!0)),
        clearInterval(this._interval),
        (this._interval = null);
    }
    cycle(t) {
      t || (this._isPaused = !1),
        this._interval &&
          (clearInterval(this._interval), (this._interval = null)),
        this._config &&
          this._config.interval &&
          !this._isPaused &&
          (this._updateInterval(),
          (this._interval = setInterval(
            (document.visibilityState ? this.nextWhenVisible : this.next).bind(
              this
            ),
            this._config.interval
          )));
    }
    to(e) {
      this._activeElement = t.findOne(".active.carousel-item", this._element);
      const i = this._getItemIndex(this._activeElement);
      if (e > this._items.length - 1 || e < 0) return;
      if (this._isSliding)
        return void P.one(this._element, "slid.bs.carousel", () => this.to(e));
      if (i === e) return this.pause(), void this.cycle();
      const n = e > i ? K : X;
      this._slide(n, this._items[e]);
    }
    _getConfig(t) {
      return (
        (t = {
          ...F,
          ...U.getDataAttributes(this._element),
          ...("object" == typeof t ? t : {}),
        }),
        l("carousel", t, V),
        t
      );
    }
    _handleSwipe() {
      const t = Math.abs(this.touchDeltaX);
      if (t <= 40) return;
      const e = t / this.touchDeltaX;
      (this.touchDeltaX = 0), e && this._slide(e > 0 ? Q : Y);
    }
    _addEventListeners() {
      this._config.keyboard &&
        P.on(this._element, "keydown.bs.carousel", (t) => this._keydown(t)),
        "hover" === this._config.pause &&
          (P.on(this._element, "mouseenter.bs.carousel", (t) => this.pause(t)),
          P.on(this._element, "mouseleave.bs.carousel", (t) => this.cycle(t))),
        this._config.touch &&
          this._touchSupported &&
          this._addTouchEventListeners();
    }
    _addTouchEventListeners() {
      const e = (t) => {
          !this._pointerEvent ||
          ("pen" !== t.pointerType && "touch" !== t.pointerType)
            ? this._pointerEvent || (this.touchStartX = t.touches[0].clientX)
            : (this.touchStartX = t.clientX);
        },
        i = (t) => {
          this.touchDeltaX =
            t.touches && t.touches.length > 1
              ? 0
              : t.touches[0].clientX - this.touchStartX;
        },
        n = (t) => {
          !this._pointerEvent ||
            ("pen" !== t.pointerType && "touch" !== t.pointerType) ||
            (this.touchDeltaX = t.clientX - this.touchStartX),
            this._handleSwipe(),
            "hover" === this._config.pause &&
              (this.pause(),
              this.touchTimeout && clearTimeout(this.touchTimeout),
              (this.touchTimeout = setTimeout(
                (t) => this.cycle(t),
                500 + this._config.interval
              )));
        };
      t.find(".carousel-item img", this._element).forEach((t) => {
        P.on(t, "dragstart.bs.carousel", (t) => t.preventDefault());
      }),
        this._pointerEvent
          ? (P.on(this._element, "pointerdown.bs.carousel", (t) => e(t)),
            P.on(this._element, "pointerup.bs.carousel", (t) => n(t)),
            this._element.classList.add("pointer-event"))
          : (P.on(this._element, "touchstart.bs.carousel", (t) => e(t)),
            P.on(this._element, "touchmove.bs.carousel", (t) => i(t)),
            P.on(this._element, "touchend.bs.carousel", (t) => n(t)));
    }
    _keydown(t) {
      if (/input|textarea/i.test(t.target.tagName)) return;
      const e = G[t.key];
      e && (t.preventDefault(), this._slide(e));
    }
    _getItemIndex(e) {
      return (
        (this._items =
          e && e.parentNode ? t.find(".carousel-item", e.parentNode) : []),
        this._items.indexOf(e)
      );
    }
    _getItemByOrder(t, e) {
      const i = t === K;
      return y(this._items, e, i, this._config.wrap);
    }
    _triggerSlideEvent(e, i) {
      const n = this._getItemIndex(e),
        s = this._getItemIndex(
          t.findOne(".active.carousel-item", this._element)
        );
      return P.trigger(this._element, "slide.bs.carousel", {
        relatedTarget: e,
        direction: i,
        from: s,
        to: n,
      });
    }
    _setActiveIndicatorElement(e) {
      if (this._indicatorsElement) {
        const i = t.findOne(".active", this._indicatorsElement);
        i.classList.remove("active"), i.removeAttribute("aria-current");
        const n = t.find("[data-bs-target]", this._indicatorsElement);
        for (let t = 0; t < n.length; t++)
          if (
            Number.parseInt(n[t].getAttribute("data-bs-slide-to"), 10) ===
            this._getItemIndex(e)
          ) {
            n[t].classList.add("active"),
              n[t].setAttribute("aria-current", "true");
            break;
          }
      }
    }
    _updateInterval() {
      const e =
        this._activeElement ||
        t.findOne(".active.carousel-item", this._element);
      if (!e) return;
      const i = Number.parseInt(e.getAttribute("data-bs-interval"), 10);
      i
        ? ((this._config.defaultInterval =
            this._config.defaultInterval || this._config.interval),
          (this._config.interval = i))
        : (this._config.interval =
            this._config.defaultInterval || this._config.interval);
    }
    _slide(e, i) {
      const n = this._directionToOrder(e),
        s = t.findOne(".active.carousel-item", this._element),
        o = this._getItemIndex(s),
        r = i || this._getItemByOrder(n, s),
        a = this._getItemIndex(r),
        l = Boolean(this._interval),
        c = n === K,
        h = c ? "carousel-item-start" : "carousel-item-end",
        d = c ? "carousel-item-next" : "carousel-item-prev",
        u = this._orderToDirection(n);
      if (r && r.classList.contains("active"))
        return void (this._isSliding = !1);
      if (this._isSliding) return;
      if (this._triggerSlideEvent(r, u).defaultPrevented) return;
      if (!s || !r) return;
      (this._isSliding = !0),
        l && this.pause(),
        this._setActiveIndicatorElement(r),
        (this._activeElement = r);
      const p = () => {
        P.trigger(this._element, "slid.bs.carousel", {
          relatedTarget: r,
          direction: u,
          from: o,
          to: a,
        });
      };
      if (this._element.classList.contains("slide")) {
        r.classList.add(d), f(r), s.classList.add(h), r.classList.add(h);
        const t = () => {
          r.classList.remove(h, d),
            r.classList.add("active"),
            s.classList.remove("active", d, h),
            (this._isSliding = !1),
            setTimeout(p, 0);
        };
        this._queueCallback(t, s, !0);
      } else s.classList.remove("active"), r.classList.add("active"), (this._isSliding = !1), p();
      l && this.cycle();
    }
    _directionToOrder(t) {
      return [Q, Y].includes(t)
        ? g()
          ? t === Y
            ? X
            : K
          : t === Y
          ? K
          : X
        : t;
    }
    _orderToDirection(t) {
      return [K, X].includes(t)
        ? g()
          ? t === X
            ? Y
            : Q
          : t === X
          ? Q
          : Y
        : t;
    }
    static carouselInterface(t, e) {
      const i = Z.getOrCreateInstance(t, e);
      let { _config: n } = i;
      "object" == typeof e && (n = { ...n, ...e });
      const s = "string" == typeof e ? e : n.slide;
      if ("number" == typeof e) i.to(e);
      else if ("string" == typeof s) {
        if (void 0 === i[s]) throw new TypeError(`No method named "${s}"`);
        i[s]();
      } else n.interval && n.ride && (i.pause(), i.cycle());
    }
    static jQueryInterface(t) {
      return this.each(function () {
        Z.carouselInterface(this, t);
      });
    }
    static dataApiClickHandler(t) {
      const e = s(this);
      if (!e || !e.classList.contains("carousel")) return;
      const i = { ...U.getDataAttributes(e), ...U.getDataAttributes(this) },
        n = this.getAttribute("data-bs-slide-to");
      n && (i.interval = !1),
        Z.carouselInterface(e, i),
        n && Z.getInstance(e).to(n),
        t.preventDefault();
    }
  }
  P.on(
    document,
    "click.bs.carousel.data-api",
    "[data-bs-slide], [data-bs-slide-to]",
    Z.dataApiClickHandler
  ),
    P.on(window, "load.bs.carousel.data-api", () => {
      const e = t.find('[data-bs-ride="carousel"]');
      for (let t = 0, i = e.length; t < i; t++)
        Z.carouselInterface(e[t], Z.getInstance(e[t]));
    }),
    _(Z);
  const J = { toggle: !0, parent: "" },
    tt = { toggle: "boolean", parent: "(string|element)" };
  class et extends B {
    constructor(e, i) {
      super(e),
        (this._isTransitioning = !1),
        (this._config = this._getConfig(i)),
        (this._triggerArray = t.find(
          `[data-bs-toggle="collapse"][href="#${this._element.id}"],[data-bs-toggle="collapse"][data-bs-target="#${this._element.id}"]`
        ));
      const s = t.find('[data-bs-toggle="collapse"]');
      for (let e = 0, i = s.length; e < i; e++) {
        const i = s[e],
          o = n(i),
          r = t.find(o).filter((t) => t === this._element);
        null !== o &&
          r.length &&
          ((this._selector = o), this._triggerArray.push(i));
      }
      (this._parent = this._config.parent ? this._getParent() : null),
        this._config.parent ||
          this._addAriaAndCollapsedClass(this._element, this._triggerArray),
        this._config.toggle && this.toggle();
    }
    static get Default() {
      return J;
    }
    static get NAME() {
      return "collapse";
    }
    toggle() {
      this._element.classList.contains("show") ? this.hide() : this.show();
    }
    show() {
      if (this._isTransitioning || this._element.classList.contains("show"))
        return;
      let e, i;
      this._parent &&
        ((e = t
          .find(".show, .collapsing", this._parent)
          .filter((t) =>
            "string" == typeof this._config.parent
              ? t.getAttribute("data-bs-parent") === this._config.parent
              : t.classList.contains("collapse")
          )),
        0 === e.length && (e = null));
      const n = t.findOne(this._selector);
      if (e) {
        const t = e.find((t) => n !== t);
        if (((i = t ? et.getInstance(t) : null), i && i._isTransitioning))
          return;
      }
      if (P.trigger(this._element, "show.bs.collapse").defaultPrevented) return;
      e &&
        e.forEach((t) => {
          n !== t && et.collapseInterface(t, "hide"),
            i || R.set(t, "bs.collapse", null);
        });
      const s = this._getDimension();
      this._element.classList.remove("collapse"),
        this._element.classList.add("collapsing"),
        (this._element.style[s] = 0),
        this._triggerArray.length &&
          this._triggerArray.forEach((t) => {
            t.classList.remove("collapsed"),
              t.setAttribute("aria-expanded", !0);
          }),
        this.setTransitioning(!0);
      const o = "scroll" + (s[0].toUpperCase() + s.slice(1));
      this._queueCallback(
        () => {
          this._element.classList.remove("collapsing"),
            this._element.classList.add("collapse", "show"),
            (this._element.style[s] = ""),
            this.setTransitioning(!1),
            P.trigger(this._element, "shown.bs.collapse");
        },
        this._element,
        !0
      ),
        (this._element.style[s] = this._element[o] + "px");
    }
    hide() {
      if (this._isTransitioning || !this._element.classList.contains("show"))
        return;
      if (P.trigger(this._element, "hide.bs.collapse").defaultPrevented) return;
      const t = this._getDimension();
      (this._element.style[t] =
        this._element.getBoundingClientRect()[t] + "px"),
        f(this._element),
        this._element.classList.add("collapsing"),
        this._element.classList.remove("collapse", "show");
      const e = this._triggerArray.length;
      if (e > 0)
        for (let t = 0; t < e; t++) {
          const e = this._triggerArray[t],
            i = s(e);
          i &&
            !i.classList.contains("show") &&
            (e.classList.add("collapsed"), e.setAttribute("aria-expanded", !1));
        }
      this.setTransitioning(!0),
        (this._element.style[t] = ""),
        this._queueCallback(
          () => {
            this.setTransitioning(!1),
              this._element.classList.remove("collapsing"),
              this._element.classList.add("collapse"),
              P.trigger(this._element, "hidden.bs.collapse");
          },
          this._element,
          !0
        );
    }
    setTransitioning(t) {
      this._isTransitioning = t;
    }
    _getConfig(t) {
      return (
        ((t = { ...J, ...t }).toggle = Boolean(t.toggle)),
        l("collapse", t, tt),
        t
      );
    }
    _getDimension() {
      return this._element.classList.contains("width") ? "width" : "height";
    }
    _getParent() {
      let { parent: e } = this._config;
      e = a(e);
      const i = `[data-bs-toggle="collapse"][data-bs-parent="${e}"]`;
      return (
        t.find(i, e).forEach((t) => {
          const e = s(t);
          this._addAriaAndCollapsedClass(e, [t]);
        }),
        e
      );
    }
    _addAriaAndCollapsedClass(t, e) {
      if (!t || !e.length) return;
      const i = t.classList.contains("show");
      e.forEach((t) => {
        i ? t.classList.remove("collapsed") : t.classList.add("collapsed"),
          t.setAttribute("aria-expanded", i);
      });
    }
    static collapseInterface(t, e) {
      let i = et.getInstance(t);
      const n = {
        ...J,
        ...U.getDataAttributes(t),
        ...("object" == typeof e && e ? e : {}),
      };
      if (
        (!i &&
          n.toggle &&
          "string" == typeof e &&
          /show|hide/.test(e) &&
          (n.toggle = !1),
        i || (i = new et(t, n)),
        "string" == typeof e)
      ) {
        if (void 0 === i[e]) throw new TypeError(`No method named "${e}"`);
        i[e]();
      }
    }
    static jQueryInterface(t) {
      return this.each(function () {
        et.collapseInterface(this, t);
      });
    }
  }
  P.on(
    document,
    "click.bs.collapse.data-api",
    '[data-bs-toggle="collapse"]',
    function (e) {
      ("A" === e.target.tagName ||
        (e.delegateTarget && "A" === e.delegateTarget.tagName)) &&
        e.preventDefault();
      const i = U.getDataAttributes(this),
        s = n(this);
      t.find(s).forEach((t) => {
        const e = et.getInstance(t);
        let n;
        e
          ? (null === e._parent &&
              "string" == typeof i.parent &&
              ((e._config.parent = i.parent), (e._parent = e._getParent())),
            (n = "toggle"))
          : (n = i),
          et.collapseInterface(t, n);
      });
    }
  ),
    _(et);
  var it = "top",
    nt = "bottom",
    st = "right",
    ot = "left",
    rt = [it, nt, st, ot],
    at = rt.reduce(function (t, e) {
      return t.concat([e + "-start", e + "-end"]);
    }, []),
    lt = [].concat(rt, ["auto"]).reduce(function (t, e) {
      return t.concat([e, e + "-start", e + "-end"]);
    }, []),
    ct = [
      "beforeRead",
      "read",
      "afterRead",
      "beforeMain",
      "main",
      "afterMain",
      "beforeWrite",
      "write",
      "afterWrite",
    ];
  function ht(t) {
    return t ? (t.nodeName || "").toLowerCase() : null;
  }
  function dt(t) {
    if (null == t) return window;
    if ("[object Window]" !== t.toString()) {
      var e = t.ownerDocument;
      return (e && e.defaultView) || window;
    }
    return t;
  }
  function ut(t) {
    return t instanceof dt(t).Element || t instanceof Element;
  }
  function ft(t) {
    return t instanceof dt(t).HTMLElement || t instanceof HTMLElement;
  }
  function pt(t) {
    return (
      "undefined" != typeof ShadowRoot &&
      (t instanceof dt(t).ShadowRoot || t instanceof ShadowRoot)
    );
  }
  var mt = {
    name: "applyStyles",
    enabled: !0,
    phase: "write",
    fn: function (t) {
      var e = t.state;
      Object.keys(e.elements).forEach(function (t) {
        var i = e.styles[t] || {},
          n = e.attributes[t] || {},
          s = e.elements[t];
        ft(s) &&
          ht(s) &&
          (Object.assign(s.style, i),
          Object.keys(n).forEach(function (t) {
            var e = n[t];
            !1 === e
              ? s.removeAttribute(t)
              : s.setAttribute(t, !0 === e ? "" : e);
          }));
      });
    },
    effect: function (t) {
      var e = t.state,
        i = {
          popper: {
            position: e.options.strategy,
            left: "0",
            top: "0",
            margin: "0",
          },
          arrow: { position: "absolute" },
          reference: {},
        };
      return (
        Object.assign(e.elements.popper.style, i.popper),
        (e.styles = i),
        e.elements.arrow && Object.assign(e.elements.arrow.style, i.arrow),
        function () {
          Object.keys(e.elements).forEach(function (t) {
            var n = e.elements[t],
              s = e.attributes[t] || {},
              o = Object.keys(
                e.styles.hasOwnProperty(t) ? e.styles[t] : i[t]
              ).reduce(function (t, e) {
                return (t[e] = ""), t;
              }, {});
            ft(n) &&
              ht(n) &&
              (Object.assign(n.style, o),
              Object.keys(s).forEach(function (t) {
                n.removeAttribute(t);
              }));
          });
        }
      );
    },
    requires: ["computeStyles"],
  };
  function gt(t) {
    return t.split("-")[0];
  }
  function _t(t) {
    var e = t.getBoundingClientRect();
    return {
      width: e.width,
      height: e.height,
      top: e.top,
      right: e.right,
      bottom: e.bottom,
      left: e.left,
      x: e.left,
      y: e.top,
    };
  }
  function bt(t) {
    var e = _t(t),
      i = t.offsetWidth,
      n = t.offsetHeight;
    return (
      Math.abs(e.width - i) <= 1 && (i = e.width),
      Math.abs(e.height - n) <= 1 && (n = e.height),
      { x: t.offsetLeft, y: t.offsetTop, width: i, height: n }
    );
  }
  function vt(t, e) {
    var i = e.getRootNode && e.getRootNode();
    if (t.contains(e)) return !0;
    if (i && pt(i)) {
      var n = e;
      do {
        if (n && t.isSameNode(n)) return !0;
        n = n.parentNode || n.host;
      } while (n);
    }
    return !1;
  }
  function yt(t) {
    return dt(t).getComputedStyle(t);
  }
  function wt(t) {
    return ["table", "td", "th"].indexOf(ht(t)) >= 0;
  }
  function Et(t) {
    return (
      (ut(t) ? t.ownerDocument : t.document) || window.document
    ).documentElement;
  }
  function At(t) {
    return "html" === ht(t)
      ? t
      : t.assignedSlot || t.parentNode || (pt(t) ? t.host : null) || Et(t);
  }
  function Tt(t) {
    return ft(t) && "fixed" !== yt(t).position ? t.offsetParent : null;
  }
  function Ot(t) {
    for (var e = dt(t), i = Tt(t); i && wt(i) && "static" === yt(i).position; )
      i = Tt(i);
    return i &&
      ("html" === ht(i) || ("body" === ht(i) && "static" === yt(i).position))
      ? e
      : i ||
          (function (t) {
            var e = -1 !== navigator.userAgent.toLowerCase().indexOf("firefox");
            if (
              -1 !== navigator.userAgent.indexOf("Trident") &&
              ft(t) &&
              "fixed" === yt(t).position
            )
              return null;
            for (
              var i = At(t);
              ft(i) && ["html", "body"].indexOf(ht(i)) < 0;

            ) {
              var n = yt(i);
              if (
                "none" !== n.transform ||
                "none" !== n.perspective ||
                "paint" === n.contain ||
                -1 !== ["transform", "perspective"].indexOf(n.willChange) ||
                (e && "filter" === n.willChange) ||
                (e && n.filter && "none" !== n.filter)
              )
                return i;
              i = i.parentNode;
            }
            return null;
          })(t) ||
          e;
  }
  function Ct(t) {
    return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
  }
  var kt = Math.max,
    Lt = Math.min,
    xt = Math.round;
  function Dt(t, e, i) {
    return kt(t, Lt(e, i));
  }
  function St(t) {
    return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, t);
  }
  function It(t, e) {
    return e.reduce(function (e, i) {
      return (e[i] = t), e;
    }, {});
  }
  var Nt = {
      name: "arrow",
      enabled: !0,
      phase: "main",
      fn: function (t) {
        var e,
          i = t.state,
          n = t.name,
          s = t.options,
          o = i.elements.arrow,
          r = i.modifiersData.popperOffsets,
          a = gt(i.placement),
          l = Ct(a),
          c = [ot, st].indexOf(a) >= 0 ? "height" : "width";
        if (o && r) {
          var h = (function (t, e) {
              return St(
                "number" !=
                  typeof (t =
                    "function" == typeof t
                      ? t(
                          Object.assign({}, e.rects, { placement: e.placement })
                        )
                      : t)
                  ? t
                  : It(t, rt)
              );
            })(s.padding, i),
            d = bt(o),
            u = "y" === l ? it : ot,
            f = "y" === l ? nt : st,
            p =
              i.rects.reference[c] +
              i.rects.reference[l] -
              r[l] -
              i.rects.popper[c],
            m = r[l] - i.rects.reference[l],
            g = Ot(o),
            _ = g ? ("y" === l ? g.clientHeight || 0 : g.clientWidth || 0) : 0,
            b = p / 2 - m / 2,
            v = h[u],
            y = _ - d[c] - h[f],
            w = _ / 2 - d[c] / 2 + b,
            E = Dt(v, w, y),
            A = l;
          i.modifiersData[n] = (((e = {})[A] = E), (e.centerOffset = E - w), e);
        }
      },
      effect: function (t) {
        var e = t.state,
          i = t.options.element,
          n = void 0 === i ? "[data-popper-arrow]" : i;
        null != n &&
          ("string" != typeof n || (n = e.elements.popper.querySelector(n))) &&
          vt(e.elements.popper, n) &&
          (e.elements.arrow = n);
      },
      requires: ["popperOffsets"],
      requiresIfExists: ["preventOverflow"],
    },
    jt = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
  function Mt(t) {
    var e,
      i = t.popper,
      n = t.popperRect,
      s = t.placement,
      o = t.offsets,
      r = t.position,
      a = t.gpuAcceleration,
      l = t.adaptive,
      c = t.roundOffsets,
      h =
        !0 === c
          ? (function (t) {
              var e = t.x,
                i = t.y,
                n = window.devicePixelRatio || 1;
              return { x: xt(xt(e * n) / n) || 0, y: xt(xt(i * n) / n) || 0 };
            })(o)
          : "function" == typeof c
          ? c(o)
          : o,
      d = h.x,
      u = void 0 === d ? 0 : d,
      f = h.y,
      p = void 0 === f ? 0 : f,
      m = o.hasOwnProperty("x"),
      g = o.hasOwnProperty("y"),
      _ = ot,
      b = it,
      v = window;
    if (l) {
      var y = Ot(i),
        w = "clientHeight",
        E = "clientWidth";
      y === dt(i) &&
        "static" !== yt((y = Et(i))).position &&
        ((w = "scrollHeight"), (E = "scrollWidth")),
        (y = y),
        s === it && ((b = nt), (p -= y[w] - n.height), (p *= a ? 1 : -1)),
        s === ot && ((_ = st), (u -= y[E] - n.width), (u *= a ? 1 : -1));
    }
    var A,
      T = Object.assign({ position: r }, l && jt);
    return a
      ? Object.assign(
          {},
          T,
          (((A = {})[b] = g ? "0" : ""),
          (A[_] = m ? "0" : ""),
          (A.transform =
            (v.devicePixelRatio || 1) < 2
              ? "translate(" + u + "px, " + p + "px)"
              : "translate3d(" + u + "px, " + p + "px, 0)"),
          A)
        )
      : Object.assign(
          {},
          T,
          (((e = {})[b] = g ? p + "px" : ""),
          (e[_] = m ? u + "px" : ""),
          (e.transform = ""),
          e)
        );
  }
  var Pt = {
      name: "computeStyles",
      enabled: !0,
      phase: "beforeWrite",
      fn: function (t) {
        var e = t.state,
          i = t.options,
          n = i.gpuAcceleration,
          s = void 0 === n || n,
          o = i.adaptive,
          r = void 0 === o || o,
          a = i.roundOffsets,
          l = void 0 === a || a,
          c = {
            placement: gt(e.placement),
            popper: e.elements.popper,
            popperRect: e.rects.popper,
            gpuAcceleration: s,
          };
        null != e.modifiersData.popperOffsets &&
          (e.styles.popper = Object.assign(
            {},
            e.styles.popper,
            Mt(
              Object.assign({}, c, {
                offsets: e.modifiersData.popperOffsets,
                position: e.options.strategy,
                adaptive: r,
                roundOffsets: l,
              })
            )
          )),
          null != e.modifiersData.arrow &&
            (e.styles.arrow = Object.assign(
              {},
              e.styles.arrow,
              Mt(
                Object.assign({}, c, {
                  offsets: e.modifiersData.arrow,
                  position: "absolute",
                  adaptive: !1,
                  roundOffsets: l,
                })
              )
            )),
          (e.attributes.popper = Object.assign({}, e.attributes.popper, {
            "data-popper-placement": e.placement,
          }));
      },
      data: {},
    },
    Ht = { passive: !0 },
    Rt = {
      name: "eventListeners",
      enabled: !0,
      phase: "write",
      fn: function () {},
      effect: function (t) {
        var e = t.state,
          i = t.instance,
          n = t.options,
          s = n.scroll,
          o = void 0 === s || s,
          r = n.resize,
          a = void 0 === r || r,
          l = dt(e.elements.popper),
          c = [].concat(e.scrollParents.reference, e.scrollParents.popper);
        return (
          o &&
            c.forEach(function (t) {
              t.addEventListener("scroll", i.update, Ht);
            }),
          a && l.addEventListener("resize", i.update, Ht),
          function () {
            o &&
              c.forEach(function (t) {
                t.removeEventListener("scroll", i.update, Ht);
              }),
              a && l.removeEventListener("resize", i.update, Ht);
          }
        );
      },
      data: {},
    },
    Bt = { left: "right", right: "left", bottom: "top", top: "bottom" };
  function Wt(t) {
    return t.replace(/left|right|bottom|top/g, function (t) {
      return Bt[t];
    });
  }
  var qt = { start: "end", end: "start" };
  function zt(t) {
    return t.replace(/start|end/g, function (t) {
      return qt[t];
    });
  }
  function $t(t) {
    var e = dt(t);
    return { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
  }
  function Ut(t) {
    return _t(Et(t)).left + $t(t).scrollLeft;
  }
  function Ft(t) {
    var e = yt(t),
      i = e.overflow,
      n = e.overflowX,
      s = e.overflowY;
    return /auto|scroll|overlay|hidden/.test(i + s + n);
  }
  function Vt(t, e) {
    var i;
    void 0 === e && (e = []);
    var n = (function t(e) {
        return ["html", "body", "#document"].indexOf(ht(e)) >= 0
          ? e.ownerDocument.body
          : ft(e) && Ft(e)
          ? e
          : t(At(e));
      })(t),
      s = n === (null == (i = t.ownerDocument) ? void 0 : i.body),
      o = dt(n),
      r = s ? [o].concat(o.visualViewport || [], Ft(n) ? n : []) : n,
      a = e.concat(r);
    return s ? a : a.concat(Vt(At(r)));
  }
  function Kt(t) {
    return Object.assign({}, t, {
      left: t.x,
      top: t.y,
      right: t.x + t.width,
      bottom: t.y + t.height,
    });
  }
  function Xt(t, e) {
    return "viewport" === e
      ? Kt(
          (function (t) {
            var e = dt(t),
              i = Et(t),
              n = e.visualViewport,
              s = i.clientWidth,
              o = i.clientHeight,
              r = 0,
              a = 0;
            return (
              n &&
                ((s = n.width),
                (o = n.height),
                /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
                  ((r = n.offsetLeft), (a = n.offsetTop))),
              { width: s, height: o, x: r + Ut(t), y: a }
            );
          })(t)
        )
      : ft(e)
      ? (function (t) {
          var e = _t(t);
          return (
            (e.top = e.top + t.clientTop),
            (e.left = e.left + t.clientLeft),
            (e.bottom = e.top + t.clientHeight),
            (e.right = e.left + t.clientWidth),
            (e.width = t.clientWidth),
            (e.height = t.clientHeight),
            (e.x = e.left),
            (e.y = e.top),
            e
          );
        })(e)
      : Kt(
          (function (t) {
            var e,
              i = Et(t),
              n = $t(t),
              s = null == (e = t.ownerDocument) ? void 0 : e.body,
              o = kt(
                i.scrollWidth,
                i.clientWidth,
                s ? s.scrollWidth : 0,
                s ? s.clientWidth : 0
              ),
              r = kt(
                i.scrollHeight,
                i.clientHeight,
                s ? s.scrollHeight : 0,
                s ? s.clientHeight : 0
              ),
              a = -n.scrollLeft + Ut(t),
              l = -n.scrollTop;
            return (
              "rtl" === yt(s || i).direction &&
                (a += kt(i.clientWidth, s ? s.clientWidth : 0) - o),
              { width: o, height: r, x: a, y: l }
            );
          })(Et(t))
        );
  }
  function Yt(t) {
    return t.split("-")[1];
  }
  function Qt(t) {
    var e,
      i = t.reference,
      n = t.element,
      s = t.placement,
      o = s ? gt(s) : null,
      r = s ? Yt(s) : null,
      a = i.x + i.width / 2 - n.width / 2,
      l = i.y + i.height / 2 - n.height / 2;
    switch (o) {
      case it:
        e = { x: a, y: i.y - n.height };
        break;
      case nt:
        e = { x: a, y: i.y + i.height };
        break;
      case st:
        e = { x: i.x + i.width, y: l };
        break;
      case ot:
        e = { x: i.x - n.width, y: l };
        break;
      default:
        e = { x: i.x, y: i.y };
    }
    var c = o ? Ct(o) : null;
    if (null != c) {
      var h = "y" === c ? "height" : "width";
      switch (r) {
        case "start":
          e[c] = e[c] - (i[h] / 2 - n[h] / 2);
          break;
        case "end":
          e[c] = e[c] + (i[h] / 2 - n[h] / 2);
      }
    }
    return e;
  }
  function Gt(t, e) {
    void 0 === e && (e = {});
    var i = e,
      n = i.placement,
      s = void 0 === n ? t.placement : n,
      o = i.boundary,
      r = void 0 === o ? "clippingParents" : o,
      a = i.rootBoundary,
      l = void 0 === a ? "viewport" : a,
      c = i.elementContext,
      h = void 0 === c ? "popper" : c,
      d = i.altBoundary,
      u = void 0 !== d && d,
      f = i.padding,
      p = void 0 === f ? 0 : f,
      m = St("number" != typeof p ? p : It(p, rt)),
      g = "popper" === h ? "reference" : "popper",
      _ = t.elements.reference,
      b = t.rects.popper,
      v = t.elements[u ? g : h],
      y = (function (t, e, i) {
        var n =
            "clippingParents" === e
              ? (function (t) {
                  var e = Vt(At(t)),
                    i =
                      ["absolute", "fixed"].indexOf(yt(t).position) >= 0 &&
                      ft(t)
                        ? Ot(t)
                        : t;
                  return ut(i)
                    ? e.filter(function (t) {
                        return ut(t) && vt(t, i) && "body" !== ht(t);
                      })
                    : [];
                })(t)
              : [].concat(e),
          s = [].concat(n, [i]),
          o = s[0],
          r = s.reduce(function (e, i) {
            var n = Xt(t, i);
            return (
              (e.top = kt(n.top, e.top)),
              (e.right = Lt(n.right, e.right)),
              (e.bottom = Lt(n.bottom, e.bottom)),
              (e.left = kt(n.left, e.left)),
              e
            );
          }, Xt(t, o));
        return (
          (r.width = r.right - r.left),
          (r.height = r.bottom - r.top),
          (r.x = r.left),
          (r.y = r.top),
          r
        );
      })(ut(v) ? v : v.contextElement || Et(t.elements.popper), r, l),
      w = _t(_),
      E = Qt({ reference: w, element: b, strategy: "absolute", placement: s }),
      A = Kt(Object.assign({}, b, E)),
      T = "popper" === h ? A : w,
      O = {
        top: y.top - T.top + m.top,
        bottom: T.bottom - y.bottom + m.bottom,
        left: y.left - T.left + m.left,
        right: T.right - y.right + m.right,
      },
      C = t.modifiersData.offset;
    if ("popper" === h && C) {
      var k = C[s];
      Object.keys(O).forEach(function (t) {
        var e = [st, nt].indexOf(t) >= 0 ? 1 : -1,
          i = [it, nt].indexOf(t) >= 0 ? "y" : "x";
        O[t] += k[i] * e;
      });
    }
    return O;
  }
  function Zt(t, e) {
    void 0 === e && (e = {});
    var i = e,
      n = i.placement,
      s = i.boundary,
      o = i.rootBoundary,
      r = i.padding,
      a = i.flipVariations,
      l = i.allowedAutoPlacements,
      c = void 0 === l ? lt : l,
      h = Yt(n),
      d = h
        ? a
          ? at
          : at.filter(function (t) {
              return Yt(t) === h;
            })
        : rt,
      u = d.filter(function (t) {
        return c.indexOf(t) >= 0;
      });
    0 === u.length && (u = d);
    var f = u.reduce(function (e, i) {
      return (
        (e[i] = Gt(t, {
          placement: i,
          boundary: s,
          rootBoundary: o,
          padding: r,
        })[gt(i)]),
        e
      );
    }, {});
    return Object.keys(f).sort(function (t, e) {
      return f[t] - f[e];
    });
  }
  var Jt = {
    name: "flip",
    enabled: !0,
    phase: "main",
    fn: function (t) {
      var e = t.state,
        i = t.options,
        n = t.name;
      if (!e.modifiersData[n]._skip) {
        for (
          var s = i.mainAxis,
            o = void 0 === s || s,
            r = i.altAxis,
            a = void 0 === r || r,
            l = i.fallbackPlacements,
            c = i.padding,
            h = i.boundary,
            d = i.rootBoundary,
            u = i.altBoundary,
            f = i.flipVariations,
            p = void 0 === f || f,
            m = i.allowedAutoPlacements,
            g = e.options.placement,
            _ = gt(g),
            b =
              l ||
              (_ !== g && p
                ? (function (t) {
                    if ("auto" === gt(t)) return [];
                    var e = Wt(t);
                    return [zt(t), e, zt(e)];
                  })(g)
                : [Wt(g)]),
            v = [g].concat(b).reduce(function (t, i) {
              return t.concat(
                "auto" === gt(i)
                  ? Zt(e, {
                      placement: i,
                      boundary: h,
                      rootBoundary: d,
                      padding: c,
                      flipVariations: p,
                      allowedAutoPlacements: m,
                    })
                  : i
              );
            }, []),
            y = e.rects.reference,
            w = e.rects.popper,
            E = new Map(),
            A = !0,
            T = v[0],
            O = 0;
          O < v.length;
          O++
        ) {
          var C = v[O],
            k = gt(C),
            L = "start" === Yt(C),
            x = [it, nt].indexOf(k) >= 0,
            D = x ? "width" : "height",
            S = Gt(e, {
              placement: C,
              boundary: h,
              rootBoundary: d,
              altBoundary: u,
              padding: c,
            }),
            I = x ? (L ? st : ot) : L ? nt : it;
          y[D] > w[D] && (I = Wt(I));
          var N = Wt(I),
            j = [];
          if (
            (o && j.push(S[k] <= 0),
            a && j.push(S[I] <= 0, S[N] <= 0),
            j.every(function (t) {
              return t;
            }))
          ) {
            (T = C), (A = !1);
            break;
          }
          E.set(C, j);
        }
        if (A)
          for (
            var M = function (t) {
                var e = v.find(function (e) {
                  var i = E.get(e);
                  if (i)
                    return i.slice(0, t).every(function (t) {
                      return t;
                    });
                });
                if (e) return (T = e), "break";
              },
              P = p ? 3 : 1;
            P > 0 && "break" !== M(P);
            P--
          );
        e.placement !== T &&
          ((e.modifiersData[n]._skip = !0), (e.placement = T), (e.reset = !0));
      }
    },
    requiresIfExists: ["offset"],
    data: { _skip: !1 },
  };
  function te(t, e, i) {
    return (
      void 0 === i && (i = { x: 0, y: 0 }),
      {
        top: t.top - e.height - i.y,
        right: t.right - e.width + i.x,
        bottom: t.bottom - e.height + i.y,
        left: t.left - e.width - i.x,
      }
    );
  }
  function ee(t) {
    return [it, st, nt, ot].some(function (e) {
      return t[e] >= 0;
    });
  }
  var ie = {
      name: "hide",
      enabled: !0,
      phase: "main",
      requiresIfExists: ["preventOverflow"],
      fn: function (t) {
        var e = t.state,
          i = t.name,
          n = e.rects.reference,
          s = e.rects.popper,
          o = e.modifiersData.preventOverflow,
          r = Gt(e, { elementContext: "reference" }),
          a = Gt(e, { altBoundary: !0 }),
          l = te(r, n),
          c = te(a, s, o),
          h = ee(l),
          d = ee(c);
        (e.modifiersData[i] = {
          referenceClippingOffsets: l,
          popperEscapeOffsets: c,
          isReferenceHidden: h,
          hasPopperEscaped: d,
        }),
          (e.attributes.popper = Object.assign({}, e.attributes.popper, {
            "data-popper-reference-hidden": h,
            "data-popper-escaped": d,
          }));
      },
    },
    ne = {
      name: "offset",
      enabled: !0,
      phase: "main",
      requires: ["popperOffsets"],
      fn: function (t) {
        var e = t.state,
          i = t.options,
          n = t.name,
          s = i.offset,
          o = void 0 === s ? [0, 0] : s,
          r = lt.reduce(function (t, i) {
            return (
              (t[i] = (function (t, e, i) {
                var n = gt(t),
                  s = [ot, it].indexOf(n) >= 0 ? -1 : 1,
                  o =
                    "function" == typeof i
                      ? i(Object.assign({}, e, { placement: t }))
                      : i,
                  r = o[0],
                  a = o[1];
                return (
                  (r = r || 0),
                  (a = (a || 0) * s),
                  [ot, st].indexOf(n) >= 0 ? { x: a, y: r } : { x: r, y: a }
                );
              })(i, e.rects, o)),
              t
            );
          }, {}),
          a = r[e.placement],
          l = a.x,
          c = a.y;
        null != e.modifiersData.popperOffsets &&
          ((e.modifiersData.popperOffsets.x += l),
          (e.modifiersData.popperOffsets.y += c)),
          (e.modifiersData[n] = r);
      },
    },
    se = {
      name: "popperOffsets",
      enabled: !0,
      phase: "read",
      fn: function (t) {
        var e = t.state,
          i = t.name;
        e.modifiersData[i] = Qt({
          reference: e.rects.reference,
          element: e.rects.popper,
          strategy: "absolute",
          placement: e.placement,
        });
      },
      data: {},
    },
    oe = {
      name: "preventOverflow",
      enabled: !0,
      phase: "main",
      fn: function (t) {
        var e = t.state,
          i = t.options,
          n = t.name,
          s = i.mainAxis,
          o = void 0 === s || s,
          r = i.altAxis,
          a = void 0 !== r && r,
          l = i.boundary,
          c = i.rootBoundary,
          h = i.altBoundary,
          d = i.padding,
          u = i.tether,
          f = void 0 === u || u,
          p = i.tetherOffset,
          m = void 0 === p ? 0 : p,
          g = Gt(e, {
            boundary: l,
            rootBoundary: c,
            padding: d,
            altBoundary: h,
          }),
          _ = gt(e.placement),
          b = Yt(e.placement),
          v = !b,
          y = Ct(_),
          w = "x" === y ? "y" : "x",
          E = e.modifiersData.popperOffsets,
          A = e.rects.reference,
          T = e.rects.popper,
          O =
            "function" == typeof m
              ? m(Object.assign({}, e.rects, { placement: e.placement }))
              : m,
          C = { x: 0, y: 0 };
        if (E) {
          if (o || a) {
            var k = "y" === y ? it : ot,
              L = "y" === y ? nt : st,
              x = "y" === y ? "height" : "width",
              D = E[y],
              S = E[y] + g[k],
              I = E[y] - g[L],
              N = f ? -T[x] / 2 : 0,
              j = "start" === b ? A[x] : T[x],
              M = "start" === b ? -T[x] : -A[x],
              P = e.elements.arrow,
              H = f && P ? bt(P) : { width: 0, height: 0 },
              R = e.modifiersData["arrow#persistent"]
                ? e.modifiersData["arrow#persistent"].padding
                : { top: 0, right: 0, bottom: 0, left: 0 },
              B = R[k],
              W = R[L],
              q = Dt(0, A[x], H[x]),
              z = v ? A[x] / 2 - N - q - B - O : j - q - B - O,
              $ = v ? -A[x] / 2 + N + q + W + O : M + q + W + O,
              U = e.elements.arrow && Ot(e.elements.arrow),
              F = U ? ("y" === y ? U.clientTop || 0 : U.clientLeft || 0) : 0,
              V = e.modifiersData.offset
                ? e.modifiersData.offset[e.placement][y]
                : 0,
              K = E[y] + z - V - F,
              X = E[y] + $ - V;
            if (o) {
              var Y = Dt(f ? Lt(S, K) : S, D, f ? kt(I, X) : I);
              (E[y] = Y), (C[y] = Y - D);
            }
            if (a) {
              var Q = "x" === y ? it : ot,
                G = "x" === y ? nt : st,
                Z = E[w],
                J = Z + g[Q],
                tt = Z - g[G],
                et = Dt(f ? Lt(J, K) : J, Z, f ? kt(tt, X) : tt);
              (E[w] = et), (C[w] = et - Z);
            }
          }
          e.modifiersData[n] = C;
        }
      },
      requiresIfExists: ["offset"],
    };
  function re(t, e, i) {
    void 0 === i && (i = !1);
    var n,
      s,
      o = Et(e),
      r = _t(t),
      a = ft(e),
      l = { scrollLeft: 0, scrollTop: 0 },
      c = { x: 0, y: 0 };
    return (
      (a || (!a && !i)) &&
        (("body" !== ht(e) || Ft(o)) &&
          (l =
            (n = e) !== dt(n) && ft(n)
              ? { scrollLeft: (s = n).scrollLeft, scrollTop: s.scrollTop }
              : $t(n)),
        ft(e)
          ? (((c = _t(e)).x += e.clientLeft), (c.y += e.clientTop))
          : o && (c.x = Ut(o))),
      {
        x: r.left + l.scrollLeft - c.x,
        y: r.top + l.scrollTop - c.y,
        width: r.width,
        height: r.height,
      }
    );
  }
  var ae = { placement: "bottom", modifiers: [], strategy: "absolute" };
  function le() {
    for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
      e[i] = arguments[i];
    return !e.some(function (t) {
      return !(t && "function" == typeof t.getBoundingClientRect);
    });
  }
  function ce(t) {
    void 0 === t && (t = {});
    var e = t,
      i = e.defaultModifiers,
      n = void 0 === i ? [] : i,
      s = e.defaultOptions,
      o = void 0 === s ? ae : s;
    return function (t, e, i) {
      void 0 === i && (i = o);
      var s,
        r,
        a = {
          placement: "bottom",
          orderedModifiers: [],
          options: Object.assign({}, ae, o),
          modifiersData: {},
          elements: { reference: t, popper: e },
          attributes: {},
          styles: {},
        },
        l = [],
        c = !1,
        h = {
          state: a,
          setOptions: function (i) {
            d(),
              (a.options = Object.assign({}, o, a.options, i)),
              (a.scrollParents = {
                reference: ut(t)
                  ? Vt(t)
                  : t.contextElement
                  ? Vt(t.contextElement)
                  : [],
                popper: Vt(e),
              });
            var s,
              r,
              c = (function (t) {
                var e = (function (t) {
                  var e = new Map(),
                    i = new Set(),
                    n = [];
                  return (
                    t.forEach(function (t) {
                      e.set(t.name, t);
                    }),
                    t.forEach(function (t) {
                      i.has(t.name) ||
                        (function t(s) {
                          i.add(s.name),
                            []
                              .concat(
                                s.requires || [],
                                s.requiresIfExists || []
                              )
                              .forEach(function (n) {
                                if (!i.has(n)) {
                                  var s = e.get(n);
                                  s && t(s);
                                }
                              }),
                            n.push(s);
                        })(t);
                    }),
                    n
                  );
                })(t);
                return ct.reduce(function (t, i) {
                  return t.concat(
                    e.filter(function (t) {
                      return t.phase === i;
                    })
                  );
                }, []);
              })(
                ((s = [].concat(n, a.options.modifiers)),
                (r = s.reduce(function (t, e) {
                  var i = t[e.name];
                  return (
                    (t[e.name] = i
                      ? Object.assign({}, i, e, {
                          options: Object.assign({}, i.options, e.options),
                          data: Object.assign({}, i.data, e.data),
                        })
                      : e),
                    t
                  );
                }, {})),
                Object.keys(r).map(function (t) {
                  return r[t];
                }))
              );
            return (
              (a.orderedModifiers = c.filter(function (t) {
                return t.enabled;
              })),
              a.orderedModifiers.forEach(function (t) {
                var e = t.name,
                  i = t.options,
                  n = void 0 === i ? {} : i,
                  s = t.effect;
                if ("function" == typeof s) {
                  var o = s({ state: a, name: e, instance: h, options: n });
                  l.push(o || function () {});
                }
              }),
              h.update()
            );
          },
          forceUpdate: function () {
            if (!c) {
              var t = a.elements,
                e = t.reference,
                i = t.popper;
              if (le(e, i)) {
                (a.rects = {
                  reference: re(e, Ot(i), "fixed" === a.options.strategy),
                  popper: bt(i),
                }),
                  (a.reset = !1),
                  (a.placement = a.options.placement),
                  a.orderedModifiers.forEach(function (t) {
                    return (a.modifiersData[t.name] = Object.assign(
                      {},
                      t.data
                    ));
                  });
                for (var n = 0; n < a.orderedModifiers.length; n++)
                  if (!0 !== a.reset) {
                    var s = a.orderedModifiers[n],
                      o = s.fn,
                      r = s.options,
                      l = void 0 === r ? {} : r,
                      d = s.name;
                    "function" == typeof o &&
                      (a =
                        o({ state: a, options: l, name: d, instance: h }) || a);
                  } else (a.reset = !1), (n = -1);
              }
            }
          },
          update:
            ((s = function () {
              return new Promise(function (t) {
                h.forceUpdate(), t(a);
              });
            }),
            function () {
              return (
                r ||
                  (r = new Promise(function (t) {
                    Promise.resolve().then(function () {
                      (r = void 0), t(s());
                    });
                  })),
                r
              );
            }),
          destroy: function () {
            d(), (c = !0);
          },
        };
      if (!le(t, e)) return h;
      function d() {
        l.forEach(function (t) {
          return t();
        }),
          (l = []);
      }
      return (
        h.setOptions(i).then(function (t) {
          !c && i.onFirstUpdate && i.onFirstUpdate(t);
        }),
        h
      );
    };
  }
  var he = ce(),
    de = ce({ defaultModifiers: [Rt, se, Pt, mt] }),
    ue = ce({ defaultModifiers: [Rt, se, Pt, mt, ne, Jt, oe, Nt, ie] }),
    fe = Object.freeze({
      __proto__: null,
      popperGenerator: ce,
      detectOverflow: Gt,
      createPopperBase: he,
      createPopper: ue,
      createPopperLite: de,
      top: it,
      bottom: nt,
      right: st,
      left: ot,
      auto: "auto",
      basePlacements: rt,
      start: "start",
      end: "end",
      clippingParents: "clippingParents",
      viewport: "viewport",
      popper: "popper",
      reference: "reference",
      variationPlacements: at,
      placements: lt,
      beforeRead: "beforeRead",
      read: "read",
      afterRead: "afterRead",
      beforeMain: "beforeMain",
      main: "main",
      afterMain: "afterMain",
      beforeWrite: "beforeWrite",
      write: "write",
      afterWrite: "afterWrite",
      modifierPhases: ct,
      applyStyles: mt,
      arrow: Nt,
      computeStyles: Pt,
      eventListeners: Rt,
      flip: Jt,
      hide: ie,
      offset: ne,
      popperOffsets: se,
      preventOverflow: oe,
    });
  const pe = new RegExp("ArrowUp|ArrowDown|Escape"),
    me = g() ? "top-end" : "top-start",
    ge = g() ? "top-start" : "top-end",
    _e = g() ? "bottom-end" : "bottom-start",
    be = g() ? "bottom-start" : "bottom-end",
    ve = g() ? "left-start" : "right-start",
    ye = g() ? "right-start" : "left-start",
    we = {
      offset: [0, 2],
      boundary: "clippingParents",
      reference: "toggle",
      display: "dynamic",
      popperConfig: null,
      autoClose: !0,
    },
    Ee = {
      offset: "(array|string|function)",
      boundary: "(string|element)",
      reference: "(string|element|object)",
      display: "string",
      popperConfig: "(null|object|function)",
      autoClose: "(boolean|string)",
    };
  class Ae extends B {
    constructor(t, e) {
      super(t),
        (this._popper = null),
        (this._config = this._getConfig(e)),
        (this._menu = this._getMenuElement()),
        (this._inNavbar = this._detectNavbar()),
        this._addEventListeners();
    }
    static get Default() {
      return we;
    }
    static get DefaultType() {
      return Ee;
    }
    static get NAME() {
      return "dropdown";
    }
    toggle() {
      h(this._element) ||
        (this._element.classList.contains("show") ? this.hide() : this.show());
    }
    show() {
      if (h(this._element) || this._menu.classList.contains("show")) return;
      const t = Ae.getParentFromElement(this._element),
        e = { relatedTarget: this._element };
      if (!P.trigger(this._element, "show.bs.dropdown", e).defaultPrevented) {
        if (this._inNavbar) U.setDataAttribute(this._menu, "popper", "none");
        else {
          if (void 0 === fe)
            throw new TypeError(
              "Bootstrap's dropdowns require Popper (https://popper.js.org)"
            );
          let e = this._element;
          "parent" === this._config.reference
            ? (e = t)
            : r(this._config.reference)
            ? (e = a(this._config.reference))
            : "object" == typeof this._config.reference &&
              (e = this._config.reference);
          const i = this._getPopperConfig(),
            n = i.modifiers.find(
              (t) => "applyStyles" === t.name && !1 === t.enabled
            );
          (this._popper = ue(e, this._menu, i)),
            n && U.setDataAttribute(this._menu, "popper", "static");
        }
        "ontouchstart" in document.documentElement &&
          !t.closest(".navbar-nav") &&
          []
            .concat(...document.body.children)
            .forEach((t) => P.on(t, "mouseover", u)),
          this._element.focus(),
          this._element.setAttribute("aria-expanded", !0),
          this._menu.classList.toggle("show"),
          this._element.classList.toggle("show"),
          P.trigger(this._element, "shown.bs.dropdown", e);
      }
    }
    hide() {
      if (h(this._element) || !this._menu.classList.contains("show")) return;
      const t = { relatedTarget: this._element };
      this._completeHide(t);
    }
    dispose() {
      this._popper && this._popper.destroy(), super.dispose();
    }
    update() {
      (this._inNavbar = this._detectNavbar()),
        this._popper && this._popper.update();
    }
    _addEventListeners() {
      P.on(this._element, "click.bs.dropdown", (t) => {
        t.preventDefault(), this.toggle();
      });
    }
    _completeHide(t) {
      P.trigger(this._element, "hide.bs.dropdown", t).defaultPrevented ||
        ("ontouchstart" in document.documentElement &&
          []
            .concat(...document.body.children)
            .forEach((t) => P.off(t, "mouseover", u)),
        this._popper && this._popper.destroy(),
        this._menu.classList.remove("show"),
        this._element.classList.remove("show"),
        this._element.setAttribute("aria-expanded", "false"),
        U.removeDataAttribute(this._menu, "popper"),
        P.trigger(this._element, "hidden.bs.dropdown", t));
    }
    _getConfig(t) {
      if (
        ((t = {
          ...this.constructor.Default,
          ...U.getDataAttributes(this._element),
          ...t,
        }),
        l("dropdown", t, this.constructor.DefaultType),
        "object" == typeof t.reference &&
          !r(t.reference) &&
          "function" != typeof t.reference.getBoundingClientRect)
      )
        throw new TypeError(
          "dropdown".toUpperCase() +
            ': Option "reference" provided type "object" without a required "getBoundingClientRect" method.'
        );
      return t;
    }
    _getMenuElement() {
      return t.next(this._element, ".dropdown-menu")[0];
    }
    _getPlacement() {
      const t = this._element.parentNode;
      if (t.classList.contains("dropend")) return ve;
      if (t.classList.contains("dropstart")) return ye;
      const e =
        "end" ===
        getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();
      return t.classList.contains("dropup") ? (e ? ge : me) : e ? be : _e;
    }
    _detectNavbar() {
      return null !== this._element.closest(".navbar");
    }
    _getOffset() {
      const { offset: t } = this._config;
      return "string" == typeof t
        ? t.split(",").map((t) => Number.parseInt(t, 10))
        : "function" == typeof t
        ? (e) => t(e, this._element)
        : t;
    }
    _getPopperConfig() {
      const t = {
        placement: this._getPlacement(),
        modifiers: [
          {
            name: "preventOverflow",
            options: { boundary: this._config.boundary },
          },
          { name: "offset", options: { offset: this._getOffset() } },
        ],
      };
      return (
        "static" === this._config.display &&
          (t.modifiers = [{ name: "applyStyles", enabled: !1 }]),
        {
          ...t,
          ...("function" == typeof this._config.popperConfig
            ? this._config.popperConfig(t)
            : this._config.popperConfig),
        }
      );
    }
    _selectMenuItem({ key: e, target: i }) {
      const n = t
        .find(
          ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
          this._menu
        )
        .filter(c);
      n.length && y(n, i, "ArrowDown" === e, !n.includes(i)).focus();
    }
    static dropdownInterface(t, e) {
      const i = Ae.getOrCreateInstance(t, e);
      if ("string" == typeof e) {
        if (void 0 === i[e]) throw new TypeError(`No method named "${e}"`);
        i[e]();
      }
    }
    static jQueryInterface(t) {
      return this.each(function () {
        Ae.dropdownInterface(this, t);
      });
    }
    static clearMenus(e) {
      if (e && (2 === e.button || ("keyup" === e.type && "Tab" !== e.key)))
        return;
      const i = t.find('[data-bs-toggle="dropdown"]');
      for (let t = 0, n = i.length; t < n; t++) {
        const n = Ae.getInstance(i[t]);
        if (!n || !1 === n._config.autoClose) continue;
        if (!n._element.classList.contains("show")) continue;
        const s = { relatedTarget: n._element };
        if (e) {
          const t = e.composedPath(),
            i = t.includes(n._menu);
          if (
            t.includes(n._element) ||
            ("inside" === n._config.autoClose && !i) ||
            ("outside" === n._config.autoClose && i)
          )
            continue;
          if (
            n._menu.contains(e.target) &&
            (("keyup" === e.type && "Tab" === e.key) ||
              /input|select|option|textarea|form/i.test(e.target.tagName))
          )
            continue;
          "click" === e.type && (s.clickEvent = e);
        }
        n._completeHide(s);
      }
    }
    static getParentFromElement(t) {
      return s(t) || t.parentNode;
    }
    static dataApiKeydownHandler(e) {
      if (
        /input|textarea/i.test(e.target.tagName)
          ? "Space" === e.key ||
            ("Escape" !== e.key &&
              (("ArrowDown" !== e.key && "ArrowUp" !== e.key) ||
                e.target.closest(".dropdown-menu")))
          : !pe.test(e.key)
      )
        return;
      const i = this.classList.contains("show");
      if (!i && "Escape" === e.key) return;
      if ((e.preventDefault(), e.stopPropagation(), h(this))) return;
      const n = () =>
        this.matches('[data-bs-toggle="dropdown"]')
          ? this
          : t.prev(this, '[data-bs-toggle="dropdown"]')[0];
      return "Escape" === e.key
        ? (n().focus(), void Ae.clearMenus())
        : "ArrowUp" === e.key || "ArrowDown" === e.key
        ? (i || n().click(), void Ae.getInstance(n())._selectMenuItem(e))
        : void ((i && "Space" !== e.key) || Ae.clearMenus());
    }
  }
  P.on(
    document,
    "keydown.bs.dropdown.data-api",
    '[data-bs-toggle="dropdown"]',
    Ae.dataApiKeydownHandler
  ),
    P.on(
      document,
      "keydown.bs.dropdown.data-api",
      ".dropdown-menu",
      Ae.dataApiKeydownHandler
    ),
    P.on(document, "click.bs.dropdown.data-api", Ae.clearMenus),
    P.on(document, "keyup.bs.dropdown.data-api", Ae.clearMenus),
    P.on(
      document,
      "click.bs.dropdown.data-api",
      '[data-bs-toggle="dropdown"]',
      function (t) {
        t.preventDefault(), Ae.dropdownInterface(this);
      }
    ),
    _(Ae);
  class Te {
    constructor() {
      this._element = document.body;
    }
    getWidth() {
      const t = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - t);
    }
    hide() {
      const t = this.getWidth();
      this._disableOverFlow(),
        this._setElementAttributes(this._element, "paddingRight", (e) => e + t),
        this._setElementAttributes(
          ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
          "paddingRight",
          (e) => e + t
        ),
        this._setElementAttributes(".sticky-top", "marginRight", (e) => e - t);
    }
    _disableOverFlow() {
      this._saveInitialAttribute(this._element, "overflow"),
        (this._element.style.overflow = "hidden");
    }
    _setElementAttributes(t, e, i) {
      const n = this.getWidth();
      this._applyManipulationCallback(t, (t) => {
        if (t !== this._element && window.innerWidth > t.clientWidth + n)
          return;
        this._saveInitialAttribute(t, e);
        const s = window.getComputedStyle(t)[e];
        t.style[e] = i(Number.parseFloat(s)) + "px";
      });
    }
    reset() {
      this._resetElementAttributes(this._element, "overflow"),
        this._resetElementAttributes(this._element, "paddingRight"),
        this._resetElementAttributes(
          ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
          "paddingRight"
        ),
        this._resetElementAttributes(".sticky-top", "marginRight");
    }
    _saveInitialAttribute(t, e) {
      const i = t.style[e];
      i && U.setDataAttribute(t, e, i);
    }
    _resetElementAttributes(t, e) {
      this._applyManipulationCallback(t, (t) => {
        const i = U.getDataAttribute(t, e);
        void 0 === i
          ? t.style.removeProperty(e)
          : (U.removeDataAttribute(t, e), (t.style[e] = i));
      });
    }
    _applyManipulationCallback(e, i) {
      r(e) ? i(e) : t.find(e, this._element).forEach(i);
    }
    isOverflowing() {
      return this.getWidth() > 0;
    }
  }
  const Oe = {
      isVisible: !0,
      isAnimated: !1,
      rootElement: "body",
      clickCallback: null,
    },
    Ce = {
      isVisible: "boolean",
      isAnimated: "boolean",
      rootElement: "(element|string)",
      clickCallback: "(function|null)",
    };
  class ke {
    constructor(t) {
      (this._config = this._getConfig(t)),
        (this._isAppended = !1),
        (this._element = null);
    }
    show(t) {
      this._config.isVisible
        ? (this._append(),
          this._config.isAnimated && f(this._getElement()),
          this._getElement().classList.add("show"),
          this._emulateAnimation(() => {
            b(t);
          }))
        : b(t);
    }
    hide(t) {
      this._config.isVisible
        ? (this._getElement().classList.remove("show"),
          this._emulateAnimation(() => {
            this.dispose(), b(t);
          }))
        : b(t);
    }
    _getElement() {
      if (!this._element) {
        const t = document.createElement("div");
        (t.className = "modal-backdrop"),
          this._config.isAnimated && t.classList.add("fade"),
          (this._element = t);
      }
      return this._element;
    }
    _getConfig(t) {
      return (
        ((t = { ...Oe, ...("object" == typeof t ? t : {}) }).rootElement = a(
          t.rootElement
        )),
        l("backdrop", t, Ce),
        t
      );
    }
    _append() {
      this._isAppended ||
        (this._config.rootElement.appendChild(this._getElement()),
        P.on(this._getElement(), "mousedown.bs.backdrop", () => {
          b(this._config.clickCallback);
        }),
        (this._isAppended = !0));
    }
    dispose() {
      this._isAppended &&
        (P.off(this._element, "mousedown.bs.backdrop"),
        this._element.remove(),
        (this._isAppended = !1));
    }
    _emulateAnimation(t) {
      v(t, this._getElement(), this._config.isAnimated);
    }
  }
  const Le = { backdrop: !0, keyboard: !0, focus: !0 },
    xe = {
      backdrop: "(boolean|string)",
      keyboard: "boolean",
      focus: "boolean",
    };
  class De extends B {
    constructor(e, i) {
      super(e),
        (this._config = this._getConfig(i)),
        (this._dialog = t.findOne(".modal-dialog", this._element)),
        (this._backdrop = this._initializeBackDrop()),
        (this._isShown = !1),
        (this._ignoreBackdropClick = !1),
        (this._isTransitioning = !1),
        (this._scrollBar = new Te());
    }
    static get Default() {
      return Le;
    }
    static get NAME() {
      return "modal";
    }
    toggle(t) {
      return this._isShown ? this.hide() : this.show(t);
    }
    show(t) {
      this._isShown ||
        this._isTransitioning ||
        P.trigger(this._element, "show.bs.modal", { relatedTarget: t })
          .defaultPrevented ||
        ((this._isShown = !0),
        this._isAnimated() && (this._isTransitioning = !0),
        this._scrollBar.hide(),
        document.body.classList.add("modal-open"),
        this._adjustDialog(),
        this._setEscapeEvent(),
        this._setResizeEvent(),
        P.on(
          this._element,
          "click.dismiss.bs.modal",
          '[data-bs-dismiss="modal"]',
          (t) => this.hide(t)
        ),
        P.on(this._dialog, "mousedown.dismiss.bs.modal", () => {
          P.one(this._element, "mouseup.dismiss.bs.modal", (t) => {
            t.target === this._element && (this._ignoreBackdropClick = !0);
          });
        }),
        this._showBackdrop(() => this._showElement(t)));
    }
    hide(t) {
      if (
        (t && ["A", "AREA"].includes(t.target.tagName) && t.preventDefault(),
        !this._isShown || this._isTransitioning)
      )
        return;
      if (P.trigger(this._element, "hide.bs.modal").defaultPrevented) return;
      this._isShown = !1;
      const e = this._isAnimated();
      e && (this._isTransitioning = !0),
        this._setEscapeEvent(),
        this._setResizeEvent(),
        P.off(document, "focusin.bs.modal"),
        this._element.classList.remove("show"),
        P.off(this._element, "click.dismiss.bs.modal"),
        P.off(this._dialog, "mousedown.dismiss.bs.modal"),
        this._queueCallback(() => this._hideModal(), this._element, e);
    }
    dispose() {
      [window, this._dialog].forEach((t) => P.off(t, ".bs.modal")),
        this._backdrop.dispose(),
        super.dispose(),
        P.off(document, "focusin.bs.modal");
    }
    handleUpdate() {
      this._adjustDialog();
    }
    _initializeBackDrop() {
      return new ke({
        isVisible: Boolean(this._config.backdrop),
        isAnimated: this._isAnimated(),
      });
    }
    _getConfig(t) {
      return (
        (t = {
          ...Le,
          ...U.getDataAttributes(this._element),
          ...("object" == typeof t ? t : {}),
        }),
        l("modal", t, xe),
        t
      );
    }
    _showElement(e) {
      const i = this._isAnimated(),
        n = t.findOne(".modal-body", this._dialog);
      (this._element.parentNode &&
        this._element.parentNode.nodeType === Node.ELEMENT_NODE) ||
        document.body.appendChild(this._element),
        (this._element.style.display = "block"),
        this._element.removeAttribute("aria-hidden"),
        this._element.setAttribute("aria-modal", !0),
        this._element.setAttribute("role", "dialog"),
        (this._element.scrollTop = 0),
        n && (n.scrollTop = 0),
        i && f(this._element),
        this._element.classList.add("show"),
        this._config.focus && this._enforceFocus(),
        this._queueCallback(
          () => {
            this._config.focus && this._element.focus(),
              (this._isTransitioning = !1),
              P.trigger(this._element, "shown.bs.modal", { relatedTarget: e });
          },
          this._dialog,
          i
        );
    }
    _enforceFocus() {
      P.off(document, "focusin.bs.modal"),
        P.on(document, "focusin.bs.modal", (t) => {
          document === t.target ||
            this._element === t.target ||
            this._element.contains(t.target) ||
            this._element.focus();
        });
    }
    _setEscapeEvent() {
      this._isShown
        ? P.on(this._element, "keydown.dismiss.bs.modal", (t) => {
            this._config.keyboard && "Escape" === t.key
              ? (t.preventDefault(), this.hide())
              : this._config.keyboard ||
                "Escape" !== t.key ||
                this._triggerBackdropTransition();
          })
        : P.off(this._element, "keydown.dismiss.bs.modal");
    }
    _setResizeEvent() {
      this._isShown
        ? P.on(window, "resize.bs.modal", () => this._adjustDialog())
        : P.off(window, "resize.bs.modal");
    }
    _hideModal() {
      (this._element.style.display = "none"),
        this._element.setAttribute("aria-hidden", !0),
        this._element.removeAttribute("aria-modal"),
        this._element.removeAttribute("role"),
        (this._isTransitioning = !1),
        this._backdrop.hide(() => {
          document.body.classList.remove("modal-open"),
            this._resetAdjustments(),
            this._scrollBar.reset(),
            P.trigger(this._element, "hidden.bs.modal");
        });
    }
    _showBackdrop(t) {
      P.on(this._element, "click.dismiss.bs.modal", (t) => {
        this._ignoreBackdropClick
          ? (this._ignoreBackdropClick = !1)
          : t.target === t.currentTarget &&
            (!0 === this._config.backdrop
              ? this.hide()
              : "static" === this._config.backdrop &&
                this._triggerBackdropTransition());
      }),
        this._backdrop.show(t);
    }
    _isAnimated() {
      return this._element.classList.contains("fade");
    }
    _triggerBackdropTransition() {
      if (P.trigger(this._element, "hidePrevented.bs.modal").defaultPrevented)
        return;
      const { classList: t, scrollHeight: e, style: i } = this._element,
        n = e > document.documentElement.clientHeight;
      (!n && "hidden" === i.overflowY) ||
        t.contains("modal-static") ||
        (n || (i.overflowY = "hidden"),
        t.add("modal-static"),
        this._queueCallback(() => {
          t.remove("modal-static"),
            n ||
              this._queueCallback(() => {
                i.overflowY = "";
              }, this._dialog);
        }, this._dialog),
        this._element.focus());
    }
    _adjustDialog() {
      const t =
          this._element.scrollHeight > document.documentElement.clientHeight,
        e = this._scrollBar.getWidth(),
        i = e > 0;
      ((!i && t && !g()) || (i && !t && g())) &&
        (this._element.style.paddingLeft = e + "px"),
        ((i && !t && !g()) || (!i && t && g())) &&
          (this._element.style.paddingRight = e + "px");
    }
    _resetAdjustments() {
      (this._element.style.paddingLeft = ""),
        (this._element.style.paddingRight = "");
    }
    static jQueryInterface(t, e) {
      return this.each(function () {
        const i = De.getOrCreateInstance(this, t);
        if ("string" == typeof t) {
          if (void 0 === i[t]) throw new TypeError(`No method named "${t}"`);
          i[t](e);
        }
      });
    }
  }
  P.on(
    document,
    "click.bs.modal.data-api",
    '[data-bs-toggle="modal"]',
    function (t) {
      const e = s(this);
      ["A", "AREA"].includes(this.tagName) && t.preventDefault(),
        P.one(e, "show.bs.modal", (t) => {
          t.defaultPrevented ||
            P.one(e, "hidden.bs.modal", () => {
              c(this) && this.focus();
            });
        }),
        De.getOrCreateInstance(e).toggle(this);
    }
  ),
    _(De);
  const Se = { backdrop: !0, keyboard: !0, scroll: !1 },
    Ie = { backdrop: "boolean", keyboard: "boolean", scroll: "boolean" };
  class Ne extends B {
    constructor(t, e) {
      super(t),
        (this._config = this._getConfig(e)),
        (this._isShown = !1),
        (this._backdrop = this._initializeBackDrop()),
        this._addEventListeners();
    }
    static get NAME() {
      return "offcanvas";
    }
    static get Default() {
      return Se;
    }
    toggle(t) {
      return this._isShown ? this.hide() : this.show(t);
    }
    show(t) {
      this._isShown ||
        P.trigger(this._element, "show.bs.offcanvas", { relatedTarget: t })
          .defaultPrevented ||
        ((this._isShown = !0),
        (this._element.style.visibility = "visible"),
        this._backdrop.show(),
        this._config.scroll ||
          (new Te().hide(), this._enforceFocusOnElement(this._element)),
        this._element.removeAttribute("aria-hidden"),
        this._element.setAttribute("aria-modal", !0),
        this._element.setAttribute("role", "dialog"),
        this._element.classList.add("show"),
        this._queueCallback(
          () => {
            P.trigger(this._element, "shown.bs.offcanvas", {
              relatedTarget: t,
            });
          },
          this._element,
          !0
        ));
    }
    hide() {
      this._isShown &&
        (P.trigger(this._element, "hide.bs.offcanvas").defaultPrevented ||
          (P.off(document, "focusin.bs.offcanvas"),
          this._element.blur(),
          (this._isShown = !1),
          this._element.classList.remove("show"),
          this._backdrop.hide(),
          this._queueCallback(
            () => {
              this._element.setAttribute("aria-hidden", !0),
                this._element.removeAttribute("aria-modal"),
                this._element.removeAttribute("role"),
                (this._element.style.visibility = "hidden"),
                this._config.scroll || new Te().reset(),
                P.trigger(this._element, "hidden.bs.offcanvas");
            },
            this._element,
            !0
          )));
    }
    dispose() {
      this._backdrop.dispose(),
        super.dispose(),
        P.off(document, "focusin.bs.offcanvas");
    }
    _getConfig(t) {
      return (
        (t = {
          ...Se,
          ...U.getDataAttributes(this._element),
          ...("object" == typeof t ? t : {}),
        }),
        l("offcanvas", t, Ie),
        t
      );
    }
    _initializeBackDrop() {
      return new ke({
        isVisible: this._config.backdrop,
        isAnimated: !0,
        rootElement: this._element.parentNode,
        clickCallback: () => this.hide(),
      });
    }
    _enforceFocusOnElement(t) {
      P.off(document, "focusin.bs.offcanvas"),
        P.on(document, "focusin.bs.offcanvas", (e) => {
          document === e.target ||
            t === e.target ||
            t.contains(e.target) ||
            t.focus();
        }),
        t.focus();
    }
    _addEventListeners() {
      P.on(
        this._element,
        "click.dismiss.bs.offcanvas",
        '[data-bs-dismiss="offcanvas"]',
        () => this.hide()
      ),
        P.on(this._element, "keydown.dismiss.bs.offcanvas", (t) => {
          this._config.keyboard && "Escape" === t.key && this.hide();
        });
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = Ne.getOrCreateInstance(this, t);
        if ("string" == typeof t) {
          if (void 0 === e[t] || t.startsWith("_") || "constructor" === t)
            throw new TypeError(`No method named "${t}"`);
          e[t](this);
        }
      });
    }
  }
  P.on(
    document,
    "click.bs.offcanvas.data-api",
    '[data-bs-toggle="offcanvas"]',
    function (e) {
      const i = s(this);
      if ((["A", "AREA"].includes(this.tagName) && e.preventDefault(), h(this)))
        return;
      P.one(i, "hidden.bs.offcanvas", () => {
        c(this) && this.focus();
      });
      const n = t.findOne(".offcanvas.show");
      n && n !== i && Ne.getInstance(n).hide(),
        Ne.getOrCreateInstance(i).toggle(this);
    }
  ),
    P.on(window, "load.bs.offcanvas.data-api", () =>
      t.find(".offcanvas.show").forEach((t) => Ne.getOrCreateInstance(t).show())
    ),
    _(Ne);
  const je = new Set([
      "background",
      "cite",
      "href",
      "itemtype",
      "longdesc",
      "poster",
      "src",
      "xlink:href",
    ]),
    Me = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/i,
    Pe =
      /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i,
    He = (t, e) => {
      const i = t.nodeName.toLowerCase();
      if (e.includes(i))
        return (
          !je.has(i) || Boolean(Me.test(t.nodeValue) || Pe.test(t.nodeValue))
        );
      const n = e.filter((t) => t instanceof RegExp);
      for (let t = 0, e = n.length; t < e; t++) if (n[t].test(i)) return !0;
      return !1;
    };
  function Re(t, e, i) {
    if (!t.length) return t;
    if (i && "function" == typeof i) return i(t);
    const n = new window.DOMParser().parseFromString(t, "text/html"),
      s = Object.keys(e),
      o = [].concat(...n.body.querySelectorAll("*"));
    for (let t = 0, i = o.length; t < i; t++) {
      const i = o[t],
        n = i.nodeName.toLowerCase();
      if (!s.includes(n)) {
        i.remove();
        continue;
      }
      const r = [].concat(...i.attributes),
        a = [].concat(e["*"] || [], e[n] || []);
      r.forEach((t) => {
        He(t, a) || i.removeAttribute(t.nodeName);
      });
    }
    return n.body.innerHTML;
  }
  const Be = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
    We = new Set(["sanitize", "allowList", "sanitizeFn"]),
    qe = {
      animation: "boolean",
      template: "string",
      title: "(string|element|function)",
      trigger: "string",
      delay: "(number|object)",
      html: "boolean",
      selector: "(string|boolean)",
      placement: "(string|function)",
      offset: "(array|string|function)",
      container: "(string|element|boolean)",
      fallbackPlacements: "array",
      boundary: "(string|element)",
      customClass: "(string|function)",
      sanitize: "boolean",
      sanitizeFn: "(null|function)",
      allowList: "object",
      popperConfig: "(null|object|function)",
    },
    ze = {
      AUTO: "auto",
      TOP: "top",
      RIGHT: g() ? "left" : "right",
      BOTTOM: "bottom",
      LEFT: g() ? "right" : "left",
    },
    $e = {
      animation: !0,
      template:
        '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
      trigger: "hover focus",
      title: "",
      delay: 0,
      html: !1,
      selector: !1,
      placement: "top",
      offset: [0, 0],
      container: !1,
      fallbackPlacements: ["top", "right", "bottom", "left"],
      boundary: "clippingParents",
      customClass: "",
      sanitize: !0,
      sanitizeFn: null,
      allowList: {
        "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
        a: ["target", "href", "title", "rel"],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        div: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: ["src", "srcset", "alt", "title", "width", "height"],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: [],
      },
      popperConfig: null,
    },
    Ue = {
      HIDE: "hide.bs.tooltip",
      HIDDEN: "hidden.bs.tooltip",
      SHOW: "show.bs.tooltip",
      SHOWN: "shown.bs.tooltip",
      INSERTED: "inserted.bs.tooltip",
      CLICK: "click.bs.tooltip",
      FOCUSIN: "focusin.bs.tooltip",
      FOCUSOUT: "focusout.bs.tooltip",
      MOUSEENTER: "mouseenter.bs.tooltip",
      MOUSELEAVE: "mouseleave.bs.tooltip",
    };
  class Fe extends B {
    constructor(t, e) {
      if (void 0 === fe)
        throw new TypeError(
          "Bootstrap's tooltips require Popper (https://popper.js.org)"
        );
      super(t),
        (this._isEnabled = !0),
        (this._timeout = 0),
        (this._hoverState = ""),
        (this._activeTrigger = {}),
        (this._popper = null),
        (this._config = this._getConfig(e)),
        (this.tip = null),
        this._setListeners();
    }
    static get Default() {
      return $e;
    }
    static get NAME() {
      return "tooltip";
    }
    static get Event() {
      return Ue;
    }
    static get DefaultType() {
      return qe;
    }
    enable() {
      this._isEnabled = !0;
    }
    disable() {
      this._isEnabled = !1;
    }
    toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    }
    toggle(t) {
      if (this._isEnabled)
        if (t) {
          const e = this._initializeOnDelegatedTarget(t);
          (e._activeTrigger.click = !e._activeTrigger.click),
            e._isWithActiveTrigger() ? e._enter(null, e) : e._leave(null, e);
        } else {
          if (this.getTipElement().classList.contains("show"))
            return void this._leave(null, this);
          this._enter(null, this);
        }
    }
    dispose() {
      clearTimeout(this._timeout),
        P.off(
          this._element.closest(".modal"),
          "hide.bs.modal",
          this._hideModalHandler
        ),
        this.tip && this.tip.remove(),
        this._popper && this._popper.destroy(),
        super.dispose();
    }
    show() {
      if ("none" === this._element.style.display)
        throw new Error("Please use show on visible elements");
      if (!this.isWithContent() || !this._isEnabled) return;
      const t = P.trigger(this._element, this.constructor.Event.SHOW),
        i = d(this._element),
        n =
          null === i
            ? this._element.ownerDocument.documentElement.contains(
                this._element
              )
            : i.contains(this._element);
      if (t.defaultPrevented || !n) return;
      const s = this.getTipElement(),
        o = e(this.constructor.NAME);
      s.setAttribute("id", o),
        this._element.setAttribute("aria-describedby", o),
        this.setContent(),
        this._config.animation && s.classList.add("fade");
      const r =
          "function" == typeof this._config.placement
            ? this._config.placement.call(this, s, this._element)
            : this._config.placement,
        a = this._getAttachment(r);
      this._addAttachmentClass(a);
      const { container: l } = this._config;
      R.set(s, this.constructor.DATA_KEY, this),
        this._element.ownerDocument.documentElement.contains(this.tip) ||
          (l.appendChild(s),
          P.trigger(this._element, this.constructor.Event.INSERTED)),
        this._popper
          ? this._popper.update()
          : (this._popper = ue(this._element, s, this._getPopperConfig(a))),
        s.classList.add("show");
      const c =
        "function" == typeof this._config.customClass
          ? this._config.customClass()
          : this._config.customClass;
      c && s.classList.add(...c.split(" ")),
        "ontouchstart" in document.documentElement &&
          [].concat(...document.body.children).forEach((t) => {
            P.on(t, "mouseover", u);
          });
      const h = this.tip.classList.contains("fade");
      this._queueCallback(
        () => {
          const t = this._hoverState;
          (this._hoverState = null),
            P.trigger(this._element, this.constructor.Event.SHOWN),
            "out" === t && this._leave(null, this);
        },
        this.tip,
        h
      );
    }
    hide() {
      if (!this._popper) return;
      const t = this.getTipElement();
      if (
        P.trigger(this._element, this.constructor.Event.HIDE).defaultPrevented
      )
        return;
      t.classList.remove("show"),
        "ontouchstart" in document.documentElement &&
          []
            .concat(...document.body.children)
            .forEach((t) => P.off(t, "mouseover", u)),
        (this._activeTrigger.click = !1),
        (this._activeTrigger.focus = !1),
        (this._activeTrigger.hover = !1);
      const e = this.tip.classList.contains("fade");
      this._queueCallback(
        () => {
          this._isWithActiveTrigger() ||
            ("show" !== this._hoverState && t.remove(),
            this._cleanTipClass(),
            this._element.removeAttribute("aria-describedby"),
            P.trigger(this._element, this.constructor.Event.HIDDEN),
            this._popper && (this._popper.destroy(), (this._popper = null)));
        },
        this.tip,
        e
      ),
        (this._hoverState = "");
    }
    update() {
      null !== this._popper && this._popper.update();
    }
    isWithContent() {
      return Boolean(this.getTitle());
    }
    getTipElement() {
      if (this.tip) return this.tip;
      const t = document.createElement("div");
      return (
        (t.innerHTML = this._config.template),
        (this.tip = t.children[0]),
        this.tip
      );
    }
    setContent() {
      const e = this.getTipElement();
      this.setElementContent(t.findOne(".tooltip-inner", e), this.getTitle()),
        e.classList.remove("fade", "show");
    }
    setElementContent(t, e) {
      if (null !== t)
        return r(e)
          ? ((e = a(e)),
            void (this._config.html
              ? e.parentNode !== t && ((t.innerHTML = ""), t.appendChild(e))
              : (t.textContent = e.textContent)))
          : void (this._config.html
              ? (this._config.sanitize &&
                  (e = Re(e, this._config.allowList, this._config.sanitizeFn)),
                (t.innerHTML = e))
              : (t.textContent = e));
    }
    getTitle() {
      let t = this._element.getAttribute("data-bs-original-title");
      return (
        t ||
          (t =
            "function" == typeof this._config.title
              ? this._config.title.call(this._element)
              : this._config.title),
        t
      );
    }
    updateAttachment(t) {
      return "right" === t ? "end" : "left" === t ? "start" : t;
    }
    _initializeOnDelegatedTarget(t, e) {
      const i = this.constructor.DATA_KEY;
      return (
        (e = e || R.get(t.delegateTarget, i)) ||
          ((e = new this.constructor(
            t.delegateTarget,
            this._getDelegateConfig()
          )),
          R.set(t.delegateTarget, i, e)),
        e
      );
    }
    _getOffset() {
      const { offset: t } = this._config;
      return "string" == typeof t
        ? t.split(",").map((t) => Number.parseInt(t, 10))
        : "function" == typeof t
        ? (e) => t(e, this._element)
        : t;
    }
    _getPopperConfig(t) {
      const e = {
        placement: t,
        modifiers: [
          {
            name: "flip",
            options: { fallbackPlacements: this._config.fallbackPlacements },
          },
          { name: "offset", options: { offset: this._getOffset() } },
          {
            name: "preventOverflow",
            options: { boundary: this._config.boundary },
          },
          {
            name: "arrow",
            options: { element: `.${this.constructor.NAME}-arrow` },
          },
          {
            name: "onChange",
            enabled: !0,
            phase: "afterWrite",
            fn: (t) => this._handlePopperPlacementChange(t),
          },
        ],
        onFirstUpdate: (t) => {
          t.options.placement !== t.placement &&
            this._handlePopperPlacementChange(t);
        },
      };
      return {
        ...e,
        ...("function" == typeof this._config.popperConfig
          ? this._config.popperConfig(e)
          : this._config.popperConfig),
      };
    }
    _addAttachmentClass(t) {
      this.getTipElement().classList.add(
        "bs-tooltip-" + this.updateAttachment(t)
      );
    }
    _getAttachment(t) {
      return ze[t.toUpperCase()];
    }
    _setListeners() {
      this._config.trigger.split(" ").forEach((t) => {
        if ("click" === t)
          P.on(
            this._element,
            this.constructor.Event.CLICK,
            this._config.selector,
            (t) => this.toggle(t)
          );
        else if ("manual" !== t) {
          const e =
              "hover" === t
                ? this.constructor.Event.MOUSEENTER
                : this.constructor.Event.FOCUSIN,
            i =
              "hover" === t
                ? this.constructor.Event.MOUSELEAVE
                : this.constructor.Event.FOCUSOUT;
          P.on(this._element, e, this._config.selector, (t) => this._enter(t)),
            P.on(this._element, i, this._config.selector, (t) =>
              this._leave(t)
            );
        }
      }),
        (this._hideModalHandler = () => {
          this._element && this.hide();
        }),
        P.on(
          this._element.closest(".modal"),
          "hide.bs.modal",
          this._hideModalHandler
        ),
        this._config.selector
          ? (this._config = {
              ...this._config,
              trigger: "manual",
              selector: "",
            })
          : this._fixTitle();
    }
    _fixTitle() {
      const t = this._element.getAttribute("title"),
        e = typeof this._element.getAttribute("data-bs-original-title");
      (t || "string" !== e) &&
        (this._element.setAttribute("data-bs-original-title", t || ""),
        !t ||
          this._element.getAttribute("aria-label") ||
          this._element.textContent ||
          this._element.setAttribute("aria-label", t),
        this._element.setAttribute("title", ""));
    }
    _enter(t, e) {
      (e = this._initializeOnDelegatedTarget(t, e)),
        t && (e._activeTrigger["focusin" === t.type ? "focus" : "hover"] = !0),
        e.getTipElement().classList.contains("show") || "show" === e._hoverState
          ? (e._hoverState = "show")
          : (clearTimeout(e._timeout),
            (e._hoverState = "show"),
            e._config.delay && e._config.delay.show
              ? (e._timeout = setTimeout(() => {
                  "show" === e._hoverState && e.show();
                }, e._config.delay.show))
              : e.show());
    }
    _leave(t, e) {
      (e = this._initializeOnDelegatedTarget(t, e)),
        t &&
          (e._activeTrigger["focusout" === t.type ? "focus" : "hover"] =
            e._element.contains(t.relatedTarget)),
        e._isWithActiveTrigger() ||
          (clearTimeout(e._timeout),
          (e._hoverState = "out"),
          e._config.delay && e._config.delay.hide
            ? (e._timeout = setTimeout(() => {
                "out" === e._hoverState && e.hide();
              }, e._config.delay.hide))
            : e.hide());
    }
    _isWithActiveTrigger() {
      for (const t in this._activeTrigger)
        if (this._activeTrigger[t]) return !0;
      return !1;
    }
    _getConfig(t) {
      const e = U.getDataAttributes(this._element);
      return (
        Object.keys(e).forEach((t) => {
          We.has(t) && delete e[t];
        }),
        ((t = {
          ...this.constructor.Default,
          ...e,
          ...("object" == typeof t && t ? t : {}),
        }).container = !1 === t.container ? document.body : a(t.container)),
        "number" == typeof t.delay &&
          (t.delay = { show: t.delay, hide: t.delay }),
        "number" == typeof t.title && (t.title = t.title.toString()),
        "number" == typeof t.content && (t.content = t.content.toString()),
        l("tooltip", t, this.constructor.DefaultType),
        t.sanitize && (t.template = Re(t.template, t.allowList, t.sanitizeFn)),
        t
      );
    }
    _getDelegateConfig() {
      const t = {};
      if (this._config)
        for (const e in this._config)
          this.constructor.Default[e] !== this._config[e] &&
            (t[e] = this._config[e]);
      return t;
    }
    _cleanTipClass() {
      const t = this.getTipElement(),
        e = t.getAttribute("class").match(Be);
      null !== e &&
        e.length > 0 &&
        e.map((t) => t.trim()).forEach((e) => t.classList.remove(e));
    }
    _handlePopperPlacementChange(t) {
      const { state: e } = t;
      e &&
        ((this.tip = e.elements.popper),
        this._cleanTipClass(),
        this._addAttachmentClass(this._getAttachment(e.placement)));
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = Fe.getOrCreateInstance(this, t);
        if ("string" == typeof t) {
          if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
          e[t]();
        }
      });
    }
  }
  _(Fe);
  const Ve = new RegExp("(^|\\s)bs-popover\\S+", "g"),
    Ke = {
      ...Fe.Default,
      placement: "right",
      offset: [0, 8],
      trigger: "click",
      content: "",
      template:
        '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
    },
    Xe = { ...Fe.DefaultType, content: "(string|element|function)" },
    Ye = {
      HIDE: "hide.bs.popover",
      HIDDEN: "hidden.bs.popover",
      SHOW: "show.bs.popover",
      SHOWN: "shown.bs.popover",
      INSERTED: "inserted.bs.popover",
      CLICK: "click.bs.popover",
      FOCUSIN: "focusin.bs.popover",
      FOCUSOUT: "focusout.bs.popover",
      MOUSEENTER: "mouseenter.bs.popover",
      MOUSELEAVE: "mouseleave.bs.popover",
    };
  class Qe extends Fe {
    static get Default() {
      return Ke;
    }
    static get NAME() {
      return "popover";
    }
    static get Event() {
      return Ye;
    }
    static get DefaultType() {
      return Xe;
    }
    isWithContent() {
      return this.getTitle() || this._getContent();
    }
    getTipElement() {
      return (
        this.tip ||
          ((this.tip = super.getTipElement()),
          this.getTitle() || t.findOne(".popover-header", this.tip).remove(),
          this._getContent() || t.findOne(".popover-body", this.tip).remove()),
        this.tip
      );
    }
    setContent() {
      const e = this.getTipElement();
      this.setElementContent(t.findOne(".popover-header", e), this.getTitle());
      let i = this._getContent();
      "function" == typeof i && (i = i.call(this._element)),
        this.setElementContent(t.findOne(".popover-body", e), i),
        e.classList.remove("fade", "show");
    }
    _addAttachmentClass(t) {
      this.getTipElement().classList.add(
        "bs-popover-" + this.updateAttachment(t)
      );
    }
    _getContent() {
      return (
        this._element.getAttribute("data-bs-content") || this._config.content
      );
    }
    _cleanTipClass() {
      const t = this.getTipElement(),
        e = t.getAttribute("class").match(Ve);
      null !== e &&
        e.length > 0 &&
        e.map((t) => t.trim()).forEach((e) => t.classList.remove(e));
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = Qe.getOrCreateInstance(this, t);
        if ("string" == typeof t) {
          if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
          e[t]();
        }
      });
    }
  }
  _(Qe);
  const Ge = { offset: 10, method: "auto", target: "" },
    Ze = { offset: "number", method: "string", target: "(string|element)" };
  class Je extends B {
    constructor(t, e) {
      super(t),
        (this._scrollElement =
          "BODY" === this._element.tagName ? window : this._element),
        (this._config = this._getConfig(e)),
        (this._selector = `${this._config.target} .nav-link, ${this._config.target} .list-group-item, ${this._config.target} .dropdown-item`),
        (this._offsets = []),
        (this._targets = []),
        (this._activeTarget = null),
        (this._scrollHeight = 0),
        P.on(this._scrollElement, "scroll.bs.scrollspy", () => this._process()),
        this.refresh(),
        this._process();
    }
    static get Default() {
      return Ge;
    }
    static get NAME() {
      return "scrollspy";
    }
    refresh() {
      const e =
          this._scrollElement === this._scrollElement.window
            ? "offset"
            : "position",
        i = "auto" === this._config.method ? e : this._config.method,
        s = "position" === i ? this._getScrollTop() : 0;
      (this._offsets = []),
        (this._targets = []),
        (this._scrollHeight = this._getScrollHeight()),
        t
          .find(this._selector)
          .map((e) => {
            const o = n(e),
              r = o ? t.findOne(o) : null;
            if (r) {
              const t = r.getBoundingClientRect();
              if (t.width || t.height) return [U[i](r).top + s, o];
            }
            return null;
          })
          .filter((t) => t)
          .sort((t, e) => t[0] - e[0])
          .forEach((t) => {
            this._offsets.push(t[0]), this._targets.push(t[1]);
          });
    }
    dispose() {
      P.off(this._scrollElement, ".bs.scrollspy"), super.dispose();
    }
    _getConfig(t) {
      if (
        "string" !=
          typeof (t = {
            ...Ge,
            ...U.getDataAttributes(this._element),
            ...("object" == typeof t && t ? t : {}),
          }).target &&
        r(t.target)
      ) {
        let { id: i } = t.target;
        i || ((i = e("scrollspy")), (t.target.id = i)), (t.target = "#" + i);
      }
      return l("scrollspy", t, Ze), t;
    }
    _getScrollTop() {
      return this._scrollElement === window
        ? this._scrollElement.pageYOffset
        : this._scrollElement.scrollTop;
    }
    _getScrollHeight() {
      return (
        this._scrollElement.scrollHeight ||
        Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight
        )
      );
    }
    _getOffsetHeight() {
      return this._scrollElement === window
        ? window.innerHeight
        : this._scrollElement.getBoundingClientRect().height;
    }
    _process() {
      const t = this._getScrollTop() + this._config.offset,
        e = this._getScrollHeight(),
        i = this._config.offset + e - this._getOffsetHeight();
      if ((this._scrollHeight !== e && this.refresh(), t >= i)) {
        const t = this._targets[this._targets.length - 1];
        this._activeTarget !== t && this._activate(t);
      } else {
        if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0)
          return (this._activeTarget = null), void this._clear();
        for (let e = this._offsets.length; e--; )
          this._activeTarget !== this._targets[e] &&
            t >= this._offsets[e] &&
            (void 0 === this._offsets[e + 1] || t < this._offsets[e + 1]) &&
            this._activate(this._targets[e]);
      }
    }
    _activate(e) {
      (this._activeTarget = e), this._clear();
      const i = this._selector
          .split(",")
          .map((t) => `${t}[data-bs-target="${e}"],${t}[href="${e}"]`),
        n = t.findOne(i.join(","));
      n.classList.contains("dropdown-item")
        ? (t
            .findOne(".dropdown-toggle", n.closest(".dropdown"))
            .classList.add("active"),
          n.classList.add("active"))
        : (n.classList.add("active"),
          t.parents(n, ".nav, .list-group").forEach((e) => {
            t
              .prev(e, ".nav-link, .list-group-item")
              .forEach((t) => t.classList.add("active")),
              t.prev(e, ".nav-item").forEach((e) => {
                t.children(e, ".nav-link").forEach((t) =>
                  t.classList.add("active")
                );
              });
          })),
        P.trigger(this._scrollElement, "activate.bs.scrollspy", {
          relatedTarget: e,
        });
    }
    _clear() {
      t.find(this._selector)
        .filter((t) => t.classList.contains("active"))
        .forEach((t) => t.classList.remove("active"));
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = Je.getOrCreateInstance(this, t);
        if ("string" == typeof t) {
          if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
          e[t]();
        }
      });
    }
  }
  P.on(window, "load.bs.scrollspy.data-api", () => {
    t.find('[data-bs-spy="scroll"]').forEach((t) => new Je(t));
  }),
    _(Je);
  class ti extends B {
    static get NAME() {
      return "tab";
    }
    show() {
      if (
        this._element.parentNode &&
        this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
        this._element.classList.contains("active")
      )
        return;
      let e;
      const i = s(this._element),
        n = this._element.closest(".nav, .list-group");
      if (n) {
        const i =
          "UL" === n.nodeName || "OL" === n.nodeName
            ? ":scope > li > .active"
            : ".active";
        (e = t.find(i, n)), (e = e[e.length - 1]);
      }
      const o = e
        ? P.trigger(e, "hide.bs.tab", { relatedTarget: this._element })
        : null;
      if (
        P.trigger(this._element, "show.bs.tab", { relatedTarget: e })
          .defaultPrevented ||
        (null !== o && o.defaultPrevented)
      )
        return;
      this._activate(this._element, n);
      const r = () => {
        P.trigger(e, "hidden.bs.tab", { relatedTarget: this._element }),
          P.trigger(this._element, "shown.bs.tab", { relatedTarget: e });
      };
      i ? this._activate(i, i.parentNode, r) : r();
    }
    _activate(e, i, n) {
      const s = (
          !i || ("UL" !== i.nodeName && "OL" !== i.nodeName)
            ? t.children(i, ".active")
            : t.find(":scope > li > .active", i)
        )[0],
        o = n && s && s.classList.contains("fade"),
        r = () => this._transitionComplete(e, s, n);
      s && o
        ? (s.classList.remove("show"), this._queueCallback(r, e, !0))
        : r();
    }
    _transitionComplete(e, i, n) {
      if (i) {
        i.classList.remove("active");
        const e = t.findOne(":scope > .dropdown-menu .active", i.parentNode);
        e && e.classList.remove("active"),
          "tab" === i.getAttribute("role") &&
            i.setAttribute("aria-selected", !1);
      }
      e.classList.add("active"),
        "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !0),
        f(e),
        e.classList.contains("fade") && e.classList.add("show");
      let s = e.parentNode;
      if (
        (s && "LI" === s.nodeName && (s = s.parentNode),
        s && s.classList.contains("dropdown-menu"))
      ) {
        const i = e.closest(".dropdown");
        i &&
          t
            .find(".dropdown-toggle", i)
            .forEach((t) => t.classList.add("active")),
          e.setAttribute("aria-expanded", !0);
      }
      n && n();
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = ti.getOrCreateInstance(this);
        if ("string" == typeof t) {
          if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
          e[t]();
        }
      });
    }
  }
  P.on(
    document,
    "click.bs.tab.data-api",
    '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
    function (t) {
      ["A", "AREA"].includes(this.tagName) && t.preventDefault(),
        h(this) || ti.getOrCreateInstance(this).show();
    }
  ),
    _(ti);
  const ei = { animation: "boolean", autohide: "boolean", delay: "number" },
    ii = { animation: !0, autohide: !0, delay: 5e3 };
  class ni extends B {
    constructor(t, e) {
      super(t),
        (this._config = this._getConfig(e)),
        (this._timeout = null),
        (this._hasMouseInteraction = !1),
        (this._hasKeyboardInteraction = !1),
        this._setListeners();
    }
    static get DefaultType() {
      return ei;
    }
    static get Default() {
      return ii;
    }
    static get NAME() {
      return "toast";
    }
    show() {
      P.trigger(this._element, "show.bs.toast").defaultPrevented ||
        (this._clearTimeout(),
        this._config.animation && this._element.classList.add("fade"),
        this._element.classList.remove("hide"),
        f(this._element),
        this._element.classList.add("showing"),
        this._queueCallback(
          () => {
            this._element.classList.remove("showing"),
              this._element.classList.add("show"),
              P.trigger(this._element, "shown.bs.toast"),
              this._maybeScheduleHide();
          },
          this._element,
          this._config.animation
        ));
    }
    hide() {
      this._element.classList.contains("show") &&
        (P.trigger(this._element, "hide.bs.toast").defaultPrevented ||
          (this._element.classList.remove("show"),
          this._queueCallback(
            () => {
              this._element.classList.add("hide"),
                P.trigger(this._element, "hidden.bs.toast");
            },
            this._element,
            this._config.animation
          )));
    }
    dispose() {
      this._clearTimeout(),
        this._element.classList.contains("show") &&
          this._element.classList.remove("show"),
        super.dispose();
    }
    _getConfig(t) {
      return (
        (t = {
          ...ii,
          ...U.getDataAttributes(this._element),
          ...("object" == typeof t && t ? t : {}),
        }),
        l("toast", t, this.constructor.DefaultType),
        t
      );
    }
    _maybeScheduleHide() {
      this._config.autohide &&
        (this._hasMouseInteraction ||
          this._hasKeyboardInteraction ||
          (this._timeout = setTimeout(() => {
            this.hide();
          }, this._config.delay)));
    }
    _onInteraction(t, e) {
      switch (t.type) {
        case "mouseover":
        case "mouseout":
          this._hasMouseInteraction = e;
          break;
        case "focusin":
        case "focusout":
          this._hasKeyboardInteraction = e;
      }
      if (e) return void this._clearTimeout();
      const i = t.relatedTarget;
      this._element === i ||
        this._element.contains(i) ||
        this._maybeScheduleHide();
    }
    _setListeners() {
      P.on(
        this._element,
        "click.dismiss.bs.toast",
        '[data-bs-dismiss="toast"]',
        () => this.hide()
      ),
        P.on(this._element, "mouseover.bs.toast", (t) =>
          this._onInteraction(t, !0)
        ),
        P.on(this._element, "mouseout.bs.toast", (t) =>
          this._onInteraction(t, !1)
        ),
        P.on(this._element, "focusin.bs.toast", (t) =>
          this._onInteraction(t, !0)
        ),
        P.on(this._element, "focusout.bs.toast", (t) =>
          this._onInteraction(t, !1)
        );
    }
    _clearTimeout() {
      clearTimeout(this._timeout), (this._timeout = null);
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = ni.getOrCreateInstance(this, t);
        if ("string" == typeof t) {
          if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
          e[t](this);
        }
      });
    }
  }
  return (
    _(ni),
    {
      Alert: W,
      Button: q,
      Carousel: Z,
      Collapse: et,
      Dropdown: Ae,
      Modal: De,
      Offcanvas: Ne,
      Popover: Qe,
      ScrollSpy: Je,
      Tab: ti,
      Toast: ni,
      Tooltip: Fe,
    }
  );
});

/*------------------------------------------
 * 2. Slick Slider
-------------------------------------------*/
/* Version: 1.9.0
 Author: Ken Wheeler
 Website: http://kenwheeler.github.io
 Docs: http://kenwheeler.github.io/slick
 Repo: http://github.com/kenwheeler/slick
 Issues: http://github.com/kenwheeler/slick/issues */
(function (a) {
  "function" == typeof define && define.amd
    ? define(["jquery"], a)
    : "undefined" != typeof exports
    ? (module.exports = a(require("jquery")))
    : a(jQuery);
})(function (a) {
  var b = window.Slick || {};
  (b = (function () {
    function d(g, h) {
      var f,
        i = this;
      (i.defaults = {
        accessibility: !0,
        adaptiveHeight: !1,
        appendArrows: a(g),
        appendDots: a(g),
        arrows: !0,
        asNavFor: null,
        prevArrow:
          '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
        nextArrow:
          '<button class="slick-next" aria-label="Next" type="button">Next</button>',
        autoplay: !1,
        autoplaySpeed: 3000,
        centerMode: !1,
        centerPadding: "50px",
        cssEase: "ease",
        customPaging: function (k, j) {
          return a('<button type="button" />').text(j + 1);
        },
        dots: !1,
        dotsClass: "slick-dots",
        draggable: !0,
        easing: "linear",
        edgeFriction: 0.35,
        fade: !1,
        focusOnSelect: !1,
        focusOnChange: !1,
        infinite: !0,
        initialSlide: 0,
        lazyLoad: "ondemand",
        mobileFirst: !1,
        pauseOnHover: !0,
        pauseOnFocus: !0,
        pauseOnDotsHover: !1,
        respondTo: "window",
        responsive: null,
        rows: 1,
        rtl: !1,
        slide: "",
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: !0,
        swipeToSlide: !1,
        touchMove: !0,
        touchThreshold: 5,
        useCSS: !0,
        useTransform: !0,
        variableWidth: !1,
        vertical: !1,
        verticalSwiping: !1,
        waitForAnimate: !0,
        zIndex: 1000,
      }),
        (i.initials = {
          animating: !1,
          dragging: !1,
          autoPlayTimer: null,
          currentDirection: 0,
          currentLeft: null,
          currentSlide: 0,
          direction: 1,
          $dots: null,
          listWidth: null,
          listHeight: null,
          loadIndex: 0,
          $nextArrow: null,
          $prevArrow: null,
          scrolling: !1,
          slideCount: null,
          slideWidth: null,
          $slideTrack: null,
          $slides: null,
          sliding: !1,
          slideOffset: 0,
          swipeLeft: null,
          swiping: !1,
          $list: null,
          touchObject: {},
          transformsEnabled: !1,
          unslicked: !1,
        }),
        a.extend(i, i.initials),
        (i.activeBreakpoint = null),
        (i.animType = null),
        (i.animProp = null),
        (i.breakpoints = []),
        (i.breakpointSettings = []),
        (i.cssTransitions = !1),
        (i.focussed = !1),
        (i.interrupted = !1),
        (i.hidden = "hidden"),
        (i.paused = !0),
        (i.positionProp = null),
        (i.respondTo = null),
        (i.rowCount = 1),
        (i.shouldClick = !0),
        (i.$slider = a(g)),
        (i.$slidesCache = null),
        (i.transformType = null),
        (i.transitionType = null),
        (i.visibilityChange = "visibilitychange"),
        (i.windowWidth = 0),
        (i.windowTimer = null),
        (f = a(g).data("slick") || {}),
        (i.options = a.extend({}, i.defaults, h, f)),
        (i.currentSlide = i.options.initialSlide),
        (i.originalSettings = i.options),
        "undefined" != typeof document.mozHidden
          ? ((i.hidden = "mozHidden"),
            (i.visibilityChange = "mozvisibilitychange"))
          : "undefined" != typeof document.webkitHidden &&
            ((i.hidden = "webkitHidden"),
            (i.visibilityChange = "webkitvisibilitychange")),
        (i.autoPlay = a.proxy(i.autoPlay, i)),
        (i.autoPlayClear = a.proxy(i.autoPlayClear, i)),
        (i.autoPlayIterator = a.proxy(i.autoPlayIterator, i)),
        (i.changeSlide = a.proxy(i.changeSlide, i)),
        (i.clickHandler = a.proxy(i.clickHandler, i)),
        (i.selectHandler = a.proxy(i.selectHandler, i)),
        (i.setPosition = a.proxy(i.setPosition, i)),
        (i.swipeHandler = a.proxy(i.swipeHandler, i)),
        (i.dragHandler = a.proxy(i.dragHandler, i)),
        (i.keyHandler = a.proxy(i.keyHandler, i)),
        (i.instanceUid = c++),
        (i.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
        i.registerBreakpoints(),
        i.init(!0);
    }
    var c = 0;
    return d;
  })()),
    (b.prototype.activateADA = function () {
      var c = this;
      c.$slideTrack
        .find(".slick-active")
        .attr({ "aria-hidden": "false" })
        .find("a, input, button, select")
        .attr({ tabindex: "0" });
    }),
    (b.prototype.addSlide = b.prototype.slickAdd =
      function (f, c, g) {
        var d = this;
        if ("boolean" == typeof c) {
          (g = c), (c = null);
        } else {
          if (c < 0 || c >= d.slideCount) {
            return !1;
          }
        }
        d.unload(),
          "number" == typeof c
            ? 0 === c && 0 === d.$slides.length
              ? a(f).appendTo(d.$slideTrack)
              : g
              ? a(f).insertBefore(d.$slides.eq(c))
              : a(f).insertAfter(d.$slides.eq(c))
            : g === !0
            ? a(f).prependTo(d.$slideTrack)
            : a(f).appendTo(d.$slideTrack),
          (d.$slides = d.$slideTrack.children(this.options.slide)),
          d.$slideTrack.children(this.options.slide).detach(),
          d.$slideTrack.append(d.$slides),
          d.$slides.each(function (i, h) {
            a(h).attr("data-slick-index", i);
          }),
          (d.$slidesCache = d.$slides),
          d.reinit();
      }),
    (b.prototype.animateHeight = function () {
      var c = this;
      if (
        1 === c.options.slidesToShow &&
        c.options.adaptiveHeight === !0 &&
        c.options.vertical === !1
      ) {
        var d = c.$slides.eq(c.currentSlide).outerHeight(!0);
        c.$list.animate({ height: d }, c.options.speed);
      }
    }),
    (b.prototype.animateSlide = function (f, c) {
      var g = {},
        d = this;
      d.animateHeight(),
        d.options.rtl === !0 && d.options.vertical === !1 && (f = -f),
        d.transformsEnabled === !1
          ? d.options.vertical === !1
            ? d.$slideTrack.animate(
                { left: f },
                d.options.speed,
                d.options.easing,
                c
              )
            : d.$slideTrack.animate(
                { top: f },
                d.options.speed,
                d.options.easing,
                c
              )
          : d.cssTransitions === !1
          ? (d.options.rtl === !0 && (d.currentLeft = -d.currentLeft),
            a({ animStart: d.currentLeft }).animate(
              { animStart: f },
              {
                duration: d.options.speed,
                easing: d.options.easing,
                step: function (e) {
                  (e = Math.ceil(e)),
                    d.options.vertical === !1
                      ? ((g[d.animType] = "translate(" + e + "px, 0px)"),
                        d.$slideTrack.css(g))
                      : ((g[d.animType] = "translate(0px," + e + "px)"),
                        d.$slideTrack.css(g));
                },
                complete: function () {
                  c && c.call();
                },
              }
            ))
          : (d.applyTransition(),
            (f = Math.ceil(f)),
            d.options.vertical === !1
              ? (g[d.animType] = "translate3d(" + f + "px, 0px, 0px)")
              : (g[d.animType] = "translate3d(0px," + f + "px, 0px)"),
            d.$slideTrack.css(g),
            c &&
              setTimeout(function () {
                d.disableTransition(), c.call();
              }, d.options.speed));
    }),
    (b.prototype.getNavTarget = function () {
      var d = this,
        c = d.options.asNavFor;
      return c && null !== c && (c = a(c).not(d.$slider)), c;
    }),
    (b.prototype.asNavFor = function (d) {
      var c = this,
        f = c.getNavTarget();
      null !== f &&
        "object" == typeof f &&
        f.each(function () {
          var e = a(this).slick("getSlick");
          e.unslicked || e.slideHandler(d, !0);
        });
    }),
    (b.prototype.applyTransition = function (d) {
      var f = this,
        c = {};
      f.options.fade === !1
        ? (c[f.transitionType] =
            f.transformType + " " + f.options.speed + "ms " + f.options.cssEase)
        : (c[f.transitionType] =
            "opacity " + f.options.speed + "ms " + f.options.cssEase),
        f.options.fade === !1 ? f.$slideTrack.css(c) : f.$slides.eq(d).css(c);
    }),
    (b.prototype.autoPlay = function () {
      var c = this;
      c.autoPlayClear(),
        c.slideCount > c.options.slidesToShow &&
          (c.autoPlayTimer = setInterval(
            c.autoPlayIterator,
            c.options.autoplaySpeed
          ));
    }),
    (b.prototype.autoPlayClear = function () {
      var c = this;
      c.autoPlayTimer && clearInterval(c.autoPlayTimer);
    }),
    (b.prototype.autoPlayIterator = function () {
      var c = this,
        d = c.currentSlide + c.options.slidesToScroll;
      c.paused ||
        c.interrupted ||
        c.focussed ||
        (c.options.infinite === !1 &&
          (1 === c.direction && c.currentSlide + 1 === c.slideCount - 1
            ? (c.direction = 0)
            : 0 === c.direction &&
              ((d = c.currentSlide - c.options.slidesToScroll),
              c.currentSlide - 1 === 0 && (c.direction = 1))),
        c.slideHandler(d));
    }),
    (b.prototype.buildArrows = function () {
      var c = this;
      c.options.arrows === !0 &&
        ((c.$prevArrow = a(c.options.prevArrow).addClass("slick-arrow")),
        (c.$nextArrow = a(c.options.nextArrow).addClass("slick-arrow")),
        c.slideCount > c.options.slidesToShow
          ? (c.$prevArrow
              .removeClass("slick-hidden")
              .removeAttr("aria-hidden tabindex"),
            c.$nextArrow
              .removeClass("slick-hidden")
              .removeAttr("aria-hidden tabindex"),
            c.htmlExpr.test(c.options.prevArrow) &&
              c.$prevArrow.prependTo(c.options.appendArrows),
            c.htmlExpr.test(c.options.nextArrow) &&
              c.$nextArrow.appendTo(c.options.appendArrows),
            c.options.infinite !== !0 &&
              c.$prevArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"))
          : c.$prevArrow
              .add(c.$nextArrow)
              .addClass("slick-hidden")
              .attr({ "aria-disabled": "true", tabindex: "-1" }));
    }),
    (b.prototype.buildDots = function () {
      var d,
        c,
        f = this;
      if (f.options.dots === !0 && f.slideCount > f.options.slidesToShow) {
        for (
          f.$slider.addClass("slick-dotted"),
            c = a("<ul />").addClass(f.options.dotsClass),
            d = 0;
          d <= f.getDotCount();
          d += 1
        ) {
          c.append(a("<li />").append(f.options.customPaging.call(this, f, d)));
        }
        (f.$dots = c.appendTo(f.options.appendDots)),
          f.$dots.find("li").first().addClass("slick-active");
      }
    }),
    (b.prototype.buildOut = function () {
      var c = this;
      (c.$slides = c.$slider
        .children(c.options.slide + ":not(.slick-cloned)")
        .addClass("slick-slide")),
        (c.slideCount = c.$slides.length),
        c.$slides.each(function (f, d) {
          a(d)
            .attr("data-slick-index", f)
            .data("originalStyling", a(d).attr("style") || "");
        }),
        c.$slider.addClass("slick-slider"),
        (c.$slideTrack =
          0 === c.slideCount
            ? a('<div class="slick-track"/>').appendTo(c.$slider)
            : c.$slides.wrapAll('<div class="slick-track"/>').parent()),
        (c.$list = c.$slideTrack.wrap('<div class="slick-list"/>').parent()),
        c.$slideTrack.css("opacity", 0),
        (c.options.centerMode !== !0 && c.options.swipeToSlide !== !0) ||
          (c.options.slidesToScroll = 1),
        a("img[data-lazy]", c.$slider).not("[src]").addClass("slick-loading"),
        c.setupInfinite(),
        c.buildArrows(),
        c.buildDots(),
        c.updateDots(),
        c.setSlideClasses(
          "number" == typeof c.currentSlide ? c.currentSlide : 0
        ),
        c.options.draggable === !0 && c.$list.addClass("draggable");
    }),
    (b.prototype.buildRows = function () {
      var k,
        m,
        v,
        g,
        w,
        h,
        f,
        j = this;
      if (
        ((g = document.createDocumentFragment()),
        (h = j.$slider.children()),
        j.options.rows > 0)
      ) {
        for (
          f = j.options.slidesPerRow * j.options.rows,
            w = Math.ceil(h.length / f),
            k = 0;
          k < w;
          k++
        ) {
          var p = document.createElement("div");
          for (m = 0; m < j.options.rows; m++) {
            var u = document.createElement("div");
            for (v = 0; v < j.options.slidesPerRow; v++) {
              var q = k * f + (m * j.options.slidesPerRow + v);
              h.get(q) && u.appendChild(h.get(q));
            }
            p.appendChild(u);
          }
          g.appendChild(p);
        }
        j.$slider.empty().append(g),
          j.$slider
            .children()
            .children()
            .children()
            .css({
              width: 100 / j.options.slidesPerRow + "%",
              display: "inline-block",
            });
      }
    }),
    (b.prototype.checkResponsive = function (i, m) {
      var f,
        p,
        g,
        c = this,
        h = !1,
        j = c.$slider.width(),
        k = window.innerWidth || a(window).width();
      if (
        ("window" === c.respondTo
          ? (g = k)
          : "slider" === c.respondTo
          ? (g = j)
          : "min" === c.respondTo && (g = Math.min(k, j)),
        c.options.responsive &&
          c.options.responsive.length &&
          null !== c.options.responsive)
      ) {
        p = null;
        for (f in c.breakpoints) {
          c.breakpoints.hasOwnProperty(f) &&
            (c.originalSettings.mobileFirst === !1
              ? g < c.breakpoints[f] && (p = c.breakpoints[f])
              : g > c.breakpoints[f] && (p = c.breakpoints[f]));
        }
        null !== p
          ? null !== c.activeBreakpoint
            ? (p !== c.activeBreakpoint || m) &&
              ((c.activeBreakpoint = p),
              "unslick" === c.breakpointSettings[p]
                ? c.unslick(p)
                : ((c.options = a.extend(
                    {},
                    c.originalSettings,
                    c.breakpointSettings[p]
                  )),
                  i === !0 && (c.currentSlide = c.options.initialSlide),
                  c.refresh(i)),
              (h = p))
            : ((c.activeBreakpoint = p),
              "unslick" === c.breakpointSettings[p]
                ? c.unslick(p)
                : ((c.options = a.extend(
                    {},
                    c.originalSettings,
                    c.breakpointSettings[p]
                  )),
                  i === !0 && (c.currentSlide = c.options.initialSlide),
                  c.refresh(i)),
              (h = p))
          : null !== c.activeBreakpoint &&
            ((c.activeBreakpoint = null),
            (c.options = c.originalSettings),
            i === !0 && (c.currentSlide = c.options.initialSlide),
            c.refresh(i),
            (h = p)),
          i || h === !1 || c.$slider.trigger("breakpoint", [c, h]);
      }
    }),
    (b.prototype.changeSlide = function (i, f) {
      var k,
        g,
        m,
        h = this,
        c = a(i.currentTarget);
      switch (
        (c.is("a") && i.preventDefault(),
        c.is("li") || (c = c.closest("li")),
        (m = h.slideCount % h.options.slidesToScroll !== 0),
        (k = m
          ? 0
          : (h.slideCount - h.currentSlide) % h.options.slidesToScroll),
        i.data.message)
      ) {
        case "previous":
          (g = 0 === k ? h.options.slidesToScroll : h.options.slidesToShow - k),
            h.slideCount > h.options.slidesToShow &&
              h.slideHandler(h.currentSlide - g, !1, f);
          break;
        case "next":
          (g = 0 === k ? h.options.slidesToScroll : k),
            h.slideCount > h.options.slidesToShow &&
              h.slideHandler(h.currentSlide + g, !1, f);
          break;
        case "index":
          var j =
            0 === i.data.index
              ? 0
              : i.data.index || c.index() * h.options.slidesToScroll;
          h.slideHandler(h.checkNavigable(j), !1, f),
            c.children().trigger("focus");
          break;
        default:
          return;
      }
    }),
    (b.prototype.checkNavigable = function (d) {
      var g,
        c,
        h = this;
      if (((g = h.getNavigableIndexes()), (c = 0), d > g[g.length - 1])) {
        d = g[g.length - 1];
      } else {
        for (var f in g) {
          if (d < g[f]) {
            d = c;
            break;
          }
          c = g[f];
        }
      }
      return d;
    }),
    (b.prototype.cleanUpEvents = function () {
      var c = this;
      c.options.dots &&
        null !== c.$dots &&
        (a("li", c.$dots)
          .off("click.slick", c.changeSlide)
          .off("mouseenter.slick", a.proxy(c.interrupt, c, !0))
          .off("mouseleave.slick", a.proxy(c.interrupt, c, !1)),
        c.options.accessibility === !0 &&
          c.$dots.off("keydown.slick", c.keyHandler)),
        c.$slider.off("focus.slick blur.slick"),
        c.options.arrows === !0 &&
          c.slideCount > c.options.slidesToShow &&
          (c.$prevArrow && c.$prevArrow.off("click.slick", c.changeSlide),
          c.$nextArrow && c.$nextArrow.off("click.slick", c.changeSlide),
          c.options.accessibility === !0 &&
            (c.$prevArrow && c.$prevArrow.off("keydown.slick", c.keyHandler),
            c.$nextArrow && c.$nextArrow.off("keydown.slick", c.keyHandler))),
        c.$list.off("touchstart.slick mousedown.slick", c.swipeHandler),
        c.$list.off("touchmove.slick mousemove.slick", c.swipeHandler),
        c.$list.off("touchend.slick mouseup.slick", c.swipeHandler),
        c.$list.off("touchcancel.slick mouseleave.slick", c.swipeHandler),
        c.$list.off("click.slick", c.clickHandler),
        a(document).off(c.visibilityChange, c.visibility),
        c.cleanUpSlideEvents(),
        c.options.accessibility === !0 &&
          c.$list.off("keydown.slick", c.keyHandler),
        c.options.focusOnSelect === !0 &&
          a(c.$slideTrack).children().off("click.slick", c.selectHandler),
        a(window).off(
          "orientationchange.slick.slick-" + c.instanceUid,
          c.orientationChange
        ),
        a(window).off("resize.slick.slick-" + c.instanceUid, c.resize),
        a("[draggable!=true]", c.$slideTrack).off(
          "dragstart",
          c.preventDefault
        ),
        a(window).off("load.slick.slick-" + c.instanceUid, c.setPosition);
    }),
    (b.prototype.cleanUpSlideEvents = function () {
      var c = this;
      c.$list.off("mouseenter.slick", a.proxy(c.interrupt, c, !0)),
        c.$list.off("mouseleave.slick", a.proxy(c.interrupt, c, !1));
    }),
    (b.prototype.cleanUpRows = function () {
      var c,
        d = this;
      d.options.rows > 0 &&
        ((c = d.$slides.children().children()),
        c.removeAttr("style"),
        d.$slider.empty().append(c));
    }),
    (b.prototype.clickHandler = function (c) {
      var d = this;
      d.shouldClick === !1 &&
        (c.stopImmediatePropagation(), c.stopPropagation(), c.preventDefault());
    }),
    (b.prototype.destroy = function (d) {
      var c = this;
      c.autoPlayClear(),
        (c.touchObject = {}),
        c.cleanUpEvents(),
        a(".slick-cloned", c.$slider).detach(),
        c.$dots && c.$dots.remove(),
        c.$prevArrow &&
          c.$prevArrow.length &&
          (c.$prevArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .removeAttr("aria-hidden aria-disabled tabindex")
            .css("display", ""),
          c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()),
        c.$nextArrow &&
          c.$nextArrow.length &&
          (c.$nextArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .removeAttr("aria-hidden aria-disabled tabindex")
            .css("display", ""),
          c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove()),
        c.$slides &&
          (c.$slides
            .removeClass(
              "slick-slide slick-active slick-center slick-visible slick-current"
            )
            .removeAttr("aria-hidden")
            .removeAttr("data-slick-index")
            .each(function () {
              a(this).attr("style", a(this).data("originalStyling"));
            }),
          c.$slideTrack.children(this.options.slide).detach(),
          c.$slideTrack.detach(),
          c.$list.detach(),
          c.$slider.append(c.$slides)),
        c.cleanUpRows(),
        c.$slider.removeClass("slick-slider"),
        c.$slider.removeClass("slick-initialized"),
        c.$slider.removeClass("slick-dotted"),
        (c.unslicked = !0),
        d || c.$slider.trigger("destroy", [c]);
    }),
    (b.prototype.disableTransition = function (d) {
      var f = this,
        c = {};
      (c[f.transitionType] = ""),
        f.options.fade === !1 ? f.$slideTrack.css(c) : f.$slides.eq(d).css(c);
    }),
    (b.prototype.fadeSlide = function (d, f) {
      var c = this;
      c.cssTransitions === !1
        ? (c.$slides.eq(d).css({ zIndex: c.options.zIndex }),
          c.$slides
            .eq(d)
            .animate({ opacity: 1 }, c.options.speed, c.options.easing, f))
        : (c.applyTransition(d),
          c.$slides.eq(d).css({ opacity: 1, zIndex: c.options.zIndex }),
          f &&
            setTimeout(function () {
              c.disableTransition(d), f.call();
            }, c.options.speed));
    }),
    (b.prototype.fadeSlideOut = function (c) {
      var d = this;
      d.cssTransitions === !1
        ? d.$slides
            .eq(c)
            .animate(
              { opacity: 0, zIndex: d.options.zIndex - 2 },
              d.options.speed,
              d.options.easing
            )
        : (d.applyTransition(c),
          d.$slides.eq(c).css({ opacity: 0, zIndex: d.options.zIndex - 2 }));
    }),
    (b.prototype.filterSlides = b.prototype.slickFilter =
      function (c) {
        var d = this;
        null !== c &&
          ((d.$slidesCache = d.$slides),
          d.unload(),
          d.$slideTrack.children(this.options.slide).detach(),
          d.$slidesCache.filter(c).appendTo(d.$slideTrack),
          d.reinit());
      }),
    (b.prototype.focusHandler = function () {
      var c = this;
      c.$slider
        .off("focus.slick blur.slick")
        .on("focus.slick", "*", function (d) {
          var e = a(this);
          setTimeout(function () {
            c.options.pauseOnFocus &&
              e.is(":focus") &&
              ((c.focussed = !0), c.autoPlay());
          }, 0);
        })
        .on("blur.slick", "*", function (d) {
          a(this);
          c.options.pauseOnFocus && ((c.focussed = !1), c.autoPlay());
        });
    }),
    (b.prototype.getCurrent = b.prototype.slickCurrentSlide =
      function () {
        var c = this;
        return c.currentSlide;
      }),
    (b.prototype.getDotCount = function () {
      var d = this,
        f = 0,
        c = 0,
        g = 0;
      if (d.options.infinite === !0) {
        if (d.slideCount <= d.options.slidesToShow) {
          ++g;
        } else {
          for (; f < d.slideCount; ) {
            ++g,
              (f = c + d.options.slidesToScroll),
              (c +=
                d.options.slidesToScroll <= d.options.slidesToShow
                  ? d.options.slidesToScroll
                  : d.options.slidesToShow);
          }
        }
      } else {
        if (d.options.centerMode === !0) {
          g = d.slideCount;
        } else {
          if (d.options.asNavFor) {
            for (; f < d.slideCount; ) {
              ++g,
                (f = c + d.options.slidesToScroll),
                (c +=
                  d.options.slidesToScroll <= d.options.slidesToShow
                    ? d.options.slidesToScroll
                    : d.options.slidesToShow);
            }
          } else {
            g =
              1 +
              Math.ceil(
                (d.slideCount - d.options.slidesToShow) /
                  d.options.slidesToScroll
              );
          }
        }
      }
      return g - 1;
    }),
    (b.prototype.getLeft = function (d) {
      var h,
        c,
        j,
        f,
        k = this,
        g = 0;
      return (
        (k.slideOffset = 0),
        (c = k.$slides.first().outerHeight(!0)),
        k.options.infinite === !0
          ? (k.slideCount > k.options.slidesToShow &&
              ((k.slideOffset = k.slideWidth * k.options.slidesToShow * -1),
              (f = -1),
              k.options.vertical === !0 &&
                k.options.centerMode === !0 &&
                (2 === k.options.slidesToShow
                  ? (f = -1.5)
                  : 1 === k.options.slidesToShow && (f = -2)),
              (g = c * k.options.slidesToShow * f)),
            k.slideCount % k.options.slidesToScroll !== 0 &&
              d + k.options.slidesToScroll > k.slideCount &&
              k.slideCount > k.options.slidesToShow &&
              (d > k.slideCount
                ? ((k.slideOffset =
                    (k.options.slidesToShow - (d - k.slideCount)) *
                    k.slideWidth *
                    -1),
                  (g = (k.options.slidesToShow - (d - k.slideCount)) * c * -1))
                : ((k.slideOffset =
                    (k.slideCount % k.options.slidesToScroll) *
                    k.slideWidth *
                    -1),
                  (g = (k.slideCount % k.options.slidesToScroll) * c * -1))))
          : d + k.options.slidesToShow > k.slideCount &&
            ((k.slideOffset =
              (d + k.options.slidesToShow - k.slideCount) * k.slideWidth),
            (g = (d + k.options.slidesToShow - k.slideCount) * c)),
        k.slideCount <= k.options.slidesToShow &&
          ((k.slideOffset = 0), (g = 0)),
        k.options.centerMode === !0 && k.slideCount <= k.options.slidesToShow
          ? (k.slideOffset =
              (k.slideWidth * Math.floor(k.options.slidesToShow)) / 2 -
              (k.slideWidth * k.slideCount) / 2)
          : k.options.centerMode === !0 && k.options.infinite === !0
          ? (k.slideOffset +=
              k.slideWidth * Math.floor(k.options.slidesToShow / 2) -
              k.slideWidth)
          : k.options.centerMode === !0 &&
            ((k.slideOffset = 0),
            (k.slideOffset +=
              k.slideWidth * Math.floor(k.options.slidesToShow / 2))),
        (h =
          k.options.vertical === !1
            ? d * k.slideWidth * -1 + k.slideOffset
            : d * c * -1 + g),
        k.options.variableWidth === !0 &&
          ((j =
            k.slideCount <= k.options.slidesToShow || k.options.infinite === !1
              ? k.$slideTrack.children(".slick-slide").eq(d)
              : k.$slideTrack
                  .children(".slick-slide")
                  .eq(d + k.options.slidesToShow)),
          (h =
            k.options.rtl === !0
              ? j[0]
                ? (k.$slideTrack.width() - j[0].offsetLeft - j.width()) * -1
                : 0
              : j[0]
              ? j[0].offsetLeft * -1
              : 0),
          k.options.centerMode === !0 &&
            ((j =
              k.slideCount <= k.options.slidesToShow ||
              k.options.infinite === !1
                ? k.$slideTrack.children(".slick-slide").eq(d)
                : k.$slideTrack
                    .children(".slick-slide")
                    .eq(d + k.options.slidesToShow + 1)),
            (h =
              k.options.rtl === !0
                ? j[0]
                  ? (k.$slideTrack.width() - j[0].offsetLeft - j.width()) * -1
                  : 0
                : j[0]
                ? j[0].offsetLeft * -1
                : 0),
            (h += (k.$list.width() - j.outerWidth()) / 2))),
        h
      );
    }),
    (b.prototype.getOption = b.prototype.slickGetOption =
      function (c) {
        var d = this;
        return d.options[c];
      }),
    (b.prototype.getNavigableIndexes = function () {
      var d,
        g = this,
        c = 0,
        h = 0,
        f = [];
      for (
        g.options.infinite === !1
          ? (d = g.slideCount)
          : ((c = g.options.slidesToScroll * -1),
            (h = g.options.slidesToScroll * -1),
            (d = 2 * g.slideCount));
        c < d;

      ) {
        f.push(c),
          (c = h + g.options.slidesToScroll),
          (h +=
            g.options.slidesToScroll <= g.options.slidesToShow
              ? g.options.slidesToScroll
              : g.options.slidesToShow);
      }
      return f;
    }),
    (b.prototype.getSlick = function () {
      return this;
    }),
    (b.prototype.getSlideCount = function () {
      var f,
        c,
        g,
        d,
        h = this;
      return (
        (d = h.options.centerMode === !0 ? Math.floor(h.$list.width() / 2) : 0),
        (g = h.swipeLeft * -1 + d),
        h.options.swipeToSlide === !0
          ? (h.$slideTrack.find(".slick-slide").each(function (m, j) {
              var k, i, n;
              if (
                ((k = a(j).outerWidth()),
                (i = j.offsetLeft),
                h.options.centerMode !== !0 && (i += k / 2),
                (n = i + k),
                g < n)
              ) {
                return (c = j), !1;
              }
            }),
            (f = Math.abs(a(c).attr("data-slick-index") - h.currentSlide) || 1))
          : h.options.slidesToScroll
      );
    }),
    (b.prototype.goTo = b.prototype.slickGoTo =
      function (d, f) {
        var c = this;
        c.changeSlide({ data: { message: "index", index: parseInt(d) } }, f);
      }),
    (b.prototype.init = function (d) {
      var c = this;
      a(c.$slider).hasClass("slick-initialized") ||
        (a(c.$slider).addClass("slick-initialized"),
        c.buildRows(),
        c.buildOut(),
        c.setProps(),
        c.startLoad(),
        c.loadSlider(),
        c.initializeEvents(),
        c.updateArrows(),
        c.updateDots(),
        c.checkResponsive(!0),
        c.focusHandler()),
        d && c.$slider.trigger("init", [c]),
        c.options.accessibility === !0 && c.initADA(),
        c.options.autoplay && ((c.paused = !1), c.autoPlay());
    }),
    (b.prototype.initADA = function () {
      var f = this,
        c = Math.ceil(f.slideCount / f.options.slidesToShow),
        g = f.getNavigableIndexes().filter(function (e) {
          return e >= 0 && e < f.slideCount;
        });
      f.$slides
        .add(f.$slideTrack.find(".slick-cloned"))
        .attr({ "aria-hidden": "true", tabindex: "-1" })
        .find("a, input, button, select")
        .attr({ tabindex: "-1" }),
        null !== f.$dots &&
          (f.$slides
            .not(f.$slideTrack.find(".slick-cloned"))
            .each(function (e) {
              var i = g.indexOf(e);
              if (
                (a(this).attr({
                  role: "tabpanel",
                  id: "slick-slide" + f.instanceUid + e,
                  tabindex: -1,
                }),
                i !== -1)
              ) {
                var j = "slick-slide-control" + f.instanceUid + i;
                a("#" + j).length && a(this).attr({ "aria-describedby": j });
              }
            }),
          f.$dots
            .attr("role", "tablist")
            .find("li")
            .each(function (e) {
              var i = g[e];
              a(this).attr({ role: "presentation" }),
                a(this)
                  .find("button")
                  .first()
                  .attr({
                    role: "tab",
                    id: "slick-slide-control" + f.instanceUid + e,
                    "aria-controls": "slick-slide" + f.instanceUid + i,
                    "aria-label": e + 1 + " of " + c,
                    "aria-selected": null,
                    tabindex: "-1",
                  });
            })
            .eq(f.currentSlide)
            .find("button")
            .attr({ "aria-selected": "true", tabindex: "0" })
            .end());
      for (var d = f.currentSlide, h = d + f.options.slidesToShow; d < h; d++) {
        f.options.focusOnChange
          ? f.$slides.eq(d).attr({ tabindex: "0" })
          : f.$slides.eq(d).removeAttr("tabindex");
      }
      f.activateADA();
    }),
    (b.prototype.initArrowEvents = function () {
      var c = this;
      c.options.arrows === !0 &&
        c.slideCount > c.options.slidesToShow &&
        (c.$prevArrow
          .off("click.slick")
          .on("click.slick", { message: "previous" }, c.changeSlide),
        c.$nextArrow
          .off("click.slick")
          .on("click.slick", { message: "next" }, c.changeSlide),
        c.options.accessibility === !0 &&
          (c.$prevArrow.on("keydown.slick", c.keyHandler),
          c.$nextArrow.on("keydown.slick", c.keyHandler)));
    }),
    (b.prototype.initDotEvents = function () {
      var c = this;
      c.options.dots === !0 &&
        c.slideCount > c.options.slidesToShow &&
        (a("li", c.$dots).on(
          "click.slick",
          { message: "index" },
          c.changeSlide
        ),
        c.options.accessibility === !0 &&
          c.$dots.on("keydown.slick", c.keyHandler)),
        c.options.dots === !0 &&
          c.options.pauseOnDotsHover === !0 &&
          c.slideCount > c.options.slidesToShow &&
          a("li", c.$dots)
            .on("mouseenter.slick", a.proxy(c.interrupt, c, !0))
            .on("mouseleave.slick", a.proxy(c.interrupt, c, !1));
    }),
    (b.prototype.initSlideEvents = function () {
      var c = this;
      c.options.pauseOnHover &&
        (c.$list.on("mouseenter.slick", a.proxy(c.interrupt, c, !0)),
        c.$list.on("mouseleave.slick", a.proxy(c.interrupt, c, !1)));
    }),
    (b.prototype.initializeEvents = function () {
      var c = this;
      c.initArrowEvents(),
        c.initDotEvents(),
        c.initSlideEvents(),
        c.$list.on(
          "touchstart.slick mousedown.slick",
          { action: "start" },
          c.swipeHandler
        ),
        c.$list.on(
          "touchmove.slick mousemove.slick",
          { action: "move" },
          c.swipeHandler
        ),
        c.$list.on(
          "touchend.slick mouseup.slick",
          { action: "end" },
          c.swipeHandler
        ),
        c.$list.on(
          "touchcancel.slick mouseleave.slick",
          { action: "end" },
          c.swipeHandler
        ),
        c.$list.on("click.slick", c.clickHandler),
        a(document).on(c.visibilityChange, a.proxy(c.visibility, c)),
        c.options.accessibility === !0 &&
          c.$list.on("keydown.slick", c.keyHandler),
        c.options.focusOnSelect === !0 &&
          a(c.$slideTrack).children().on("click.slick", c.selectHandler),
        a(window).on(
          "orientationchange.slick.slick-" + c.instanceUid,
          a.proxy(c.orientationChange, c)
        ),
        a(window).on(
          "resize.slick.slick-" + c.instanceUid,
          a.proxy(c.resize, c)
        ),
        a("[draggable!=true]", c.$slideTrack).on("dragstart", c.preventDefault),
        a(window).on("load.slick.slick-" + c.instanceUid, c.setPosition),
        a(c.setPosition);
    }),
    (b.prototype.initUI = function () {
      var c = this;
      c.options.arrows === !0 &&
        c.slideCount > c.options.slidesToShow &&
        (c.$prevArrow.show(), c.$nextArrow.show()),
        c.options.dots === !0 &&
          c.slideCount > c.options.slidesToShow &&
          c.$dots.show();
    }),
    (b.prototype.keyHandler = function (c) {
      var d = this;
      c.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
        (37 === c.keyCode && d.options.accessibility === !0
          ? d.changeSlide({
              data: { message: d.options.rtl === !0 ? "next" : "previous" },
            })
          : 39 === c.keyCode &&
            d.options.accessibility === !0 &&
            d.changeSlide({
              data: { message: d.options.rtl === !0 ? "previous" : "next" },
            }));
    }),
    (b.prototype.lazyLoad = function () {
      function j(c) {
        a("img[data-lazy]", c).each(function () {
          var r = a(this),
            d = a(this).attr("data-lazy"),
            v = a(this).attr("data-srcset"),
            l = a(this).attr("data-sizes") || f.$slider.attr("data-sizes"),
            w = document.createElement("img");
          (w.onload = function () {
            r.animate({ opacity: 0 }, 100, function () {
              v && (r.attr("srcset", v), l && r.attr("sizes", l)),
                r.attr("src", d).animate({ opacity: 1 }, 200, function () {
                  r.removeAttr("data-lazy data-srcset data-sizes").removeClass(
                    "slick-loading"
                  );
                }),
                f.$slider.trigger("lazyLoaded", [f, r, d]);
            });
          }),
            (w.onerror = function () {
              r
                .removeAttr("data-lazy")
                .removeClass("slick-loading")
                .addClass("slick-lazyload-error"),
                f.$slider.trigger("lazyLoadError", [f, r, d]);
            }),
            (w.src = d);
        });
      }
      var q,
        g,
        u,
        h,
        f = this;
      if (
        (f.options.centerMode === !0
          ? f.options.infinite === !0
            ? ((u = f.currentSlide + (f.options.slidesToShow / 2 + 1)),
              (h = u + f.options.slidesToShow + 2))
            : ((u = Math.max(
                0,
                f.currentSlide - (f.options.slidesToShow / 2 + 1)
              )),
              (h = 2 + (f.options.slidesToShow / 2 + 1) + f.currentSlide))
          : ((u = f.options.infinite
              ? f.options.slidesToShow + f.currentSlide
              : f.currentSlide),
            (h = Math.ceil(u + f.options.slidesToShow)),
            f.options.fade === !0 && (u > 0 && u--, h <= f.slideCount && h++)),
        (q = f.$slider.find(".slick-slide").slice(u, h)),
        "anticipated" === f.options.lazyLoad)
      ) {
        for (
          var i = u - 1, k = h, p = f.$slider.find(".slick-slide"), m = 0;
          m < f.options.slidesToScroll;
          m++
        ) {
          i < 0 && (i = f.slideCount - 1),
            (q = q.add(p.eq(i))),
            (q = q.add(p.eq(k))),
            i--,
            k++;
        }
      }
      j(q),
        f.slideCount <= f.options.slidesToShow
          ? ((g = f.$slider.find(".slick-slide")), j(g))
          : f.currentSlide >= f.slideCount - f.options.slidesToShow
          ? ((g = f.$slider
              .find(".slick-cloned")
              .slice(0, f.options.slidesToShow)),
            j(g))
          : 0 === f.currentSlide &&
            ((g = f.$slider
              .find(".slick-cloned")
              .slice(f.options.slidesToShow * -1)),
            j(g));
    }),
    (b.prototype.loadSlider = function () {
      var c = this;
      c.setPosition(),
        c.$slideTrack.css({ opacity: 1 }),
        c.$slider.removeClass("slick-loading"),
        c.initUI(),
        "progressive" === c.options.lazyLoad && c.progressiveLazyLoad();
    }),
    (b.prototype.next = b.prototype.slickNext =
      function () {
        var c = this;
        c.changeSlide({ data: { message: "next" } });
      }),
    (b.prototype.orientationChange = function () {
      var c = this;
      c.checkResponsive(), c.setPosition();
    }),
    (b.prototype.pause = b.prototype.slickPause =
      function () {
        var c = this;
        c.autoPlayClear(), (c.paused = !0);
      }),
    (b.prototype.play = b.prototype.slickPlay =
      function () {
        var c = this;
        c.autoPlay(),
          (c.options.autoplay = !0),
          (c.paused = !1),
          (c.focussed = !1),
          (c.interrupted = !1);
      }),
    (b.prototype.postSlide = function (d) {
      var c = this;
      if (
        !c.unslicked &&
        (c.$slider.trigger("afterChange", [c, d]),
        (c.animating = !1),
        c.slideCount > c.options.slidesToShow && c.setPosition(),
        (c.swipeLeft = null),
        c.options.autoplay && c.autoPlay(),
        c.options.accessibility === !0 &&
          (c.initADA(), c.options.focusOnChange))
      ) {
        var f = a(c.$slides.get(c.currentSlide));
        f.attr("tabindex", 0).focus();
      }
    }),
    (b.prototype.prev = b.prototype.slickPrev =
      function () {
        var c = this;
        c.changeSlide({ data: { message: "previous" } });
      }),
    (b.prototype.preventDefault = function (c) {
      c.preventDefault();
    }),
    (b.prototype.progressiveLazyLoad = function (i) {
      i = i || 1;
      var f,
        k,
        g,
        m,
        h,
        c = this,
        j = a("img[data-lazy]", c.$slider);
      j.length
        ? ((f = j.first()),
          (k = f.attr("data-lazy")),
          (g = f.attr("data-srcset")),
          (m = f.attr("data-sizes") || c.$slider.attr("data-sizes")),
          (h = document.createElement("img")),
          (h.onload = function () {
            g && (f.attr("srcset", g), m && f.attr("sizes", m)),
              f
                .attr("src", k)
                .removeAttr("data-lazy data-srcset data-sizes")
                .removeClass("slick-loading"),
              c.options.adaptiveHeight === !0 && c.setPosition(),
              c.$slider.trigger("lazyLoaded", [c, f, k]),
              c.progressiveLazyLoad();
          }),
          (h.onerror = function () {
            i < 3
              ? setTimeout(function () {
                  c.progressiveLazyLoad(i + 1);
                }, 500)
              : (f
                  .removeAttr("data-lazy")
                  .removeClass("slick-loading")
                  .addClass("slick-lazyload-error"),
                c.$slider.trigger("lazyLoadError", [c, f, k]),
                c.progressiveLazyLoad());
          }),
          (h.src = k))
        : c.$slider.trigger("allImagesLoaded", [c]);
    }),
    (b.prototype.refresh = function (f) {
      var c,
        g,
        d = this;
      (g = d.slideCount - d.options.slidesToShow),
        !d.options.infinite && d.currentSlide > g && (d.currentSlide = g),
        d.slideCount <= d.options.slidesToShow && (d.currentSlide = 0),
        (c = d.currentSlide),
        d.destroy(!0),
        a.extend(d, d.initials, { currentSlide: c }),
        d.init(),
        f || d.changeSlide({ data: { message: "index", index: c } }, !1);
    }),
    (b.prototype.registerBreakpoints = function () {
      var f,
        c,
        g,
        d = this,
        h = d.options.responsive || null;
      if ("array" === a.type(h) && h.length) {
        d.respondTo = d.options.respondTo || "window";
        for (f in h) {
          if (((g = d.breakpoints.length - 1), h.hasOwnProperty(f))) {
            for (c = h[f].breakpoint; g >= 0; ) {
              d.breakpoints[g] &&
                d.breakpoints[g] === c &&
                d.breakpoints.splice(g, 1),
                g--;
            }
            d.breakpoints.push(c), (d.breakpointSettings[c] = h[f].settings);
          }
        }
        d.breakpoints.sort(function (j, k) {
          return d.options.mobileFirst ? j - k : k - j;
        });
      }
    }),
    (b.prototype.reinit = function () {
      var c = this;
      (c.$slides = c.$slideTrack
        .children(c.options.slide)
        .addClass("slick-slide")),
        (c.slideCount = c.$slides.length),
        c.currentSlide >= c.slideCount &&
          0 !== c.currentSlide &&
          (c.currentSlide = c.currentSlide - c.options.slidesToScroll),
        c.slideCount <= c.options.slidesToShow && (c.currentSlide = 0),
        c.registerBreakpoints(),
        c.setProps(),
        c.setupInfinite(),
        c.buildArrows(),
        c.updateArrows(),
        c.initArrowEvents(),
        c.buildDots(),
        c.updateDots(),
        c.initDotEvents(),
        c.cleanUpSlideEvents(),
        c.initSlideEvents(),
        c.checkResponsive(!1, !0),
        c.options.focusOnSelect === !0 &&
          a(c.$slideTrack).children().on("click.slick", c.selectHandler),
        c.setSlideClasses(
          "number" == typeof c.currentSlide ? c.currentSlide : 0
        ),
        c.setPosition(),
        c.focusHandler(),
        (c.paused = !c.options.autoplay),
        c.autoPlay(),
        c.$slider.trigger("reInit", [c]);
    }),
    (b.prototype.resize = function () {
      var c = this;
      a(window).width() !== c.windowWidth &&
        (clearTimeout(c.windowDelay),
        (c.windowDelay = window.setTimeout(function () {
          (c.windowWidth = a(window).width()),
            c.checkResponsive(),
            c.unslicked || c.setPosition();
        }, 50)));
    }),
    (b.prototype.removeSlide = b.prototype.slickRemove =
      function (d, f, c) {
        var g = this;
        return (
          "boolean" == typeof d
            ? ((f = d), (d = f === !0 ? 0 : g.slideCount - 1))
            : (d = f === !0 ? --d : d),
          !(g.slideCount < 1 || d < 0 || d > g.slideCount - 1) &&
            (g.unload(),
            c === !0
              ? g.$slideTrack.children().remove()
              : g.$slideTrack.children(this.options.slide).eq(d).remove(),
            (g.$slides = g.$slideTrack.children(this.options.slide)),
            g.$slideTrack.children(this.options.slide).detach(),
            g.$slideTrack.append(g.$slides),
            (g.$slidesCache = g.$slides),
            void g.reinit())
        );
      }),
    (b.prototype.setCSS = function (d) {
      var g,
        c,
        h = this,
        f = {};
      h.options.rtl === !0 && (d = -d),
        (g = "left" == h.positionProp ? Math.ceil(d) + "px" : "0px"),
        (c = "top" == h.positionProp ? Math.ceil(d) + "px" : "0px"),
        (f[h.positionProp] = d),
        h.transformsEnabled === !1
          ? h.$slideTrack.css(f)
          : ((f = {}),
            h.cssTransitions === !1
              ? ((f[h.animType] = "translate(" + g + ", " + c + ")"),
                h.$slideTrack.css(f))
              : ((f[h.animType] = "translate3d(" + g + ", " + c + ", 0px)"),
                h.$slideTrack.css(f)));
    }),
    (b.prototype.setDimensions = function () {
      var c = this;
      c.options.vertical === !1
        ? c.options.centerMode === !0 &&
          c.$list.css({ padding: "0px " + c.options.centerPadding })
        : (c.$list.height(
            c.$slides.first().outerHeight(!0) * c.options.slidesToShow
          ),
          c.options.centerMode === !0 &&
            c.$list.css({ padding: c.options.centerPadding + " 0px" })),
        (c.listWidth = c.$list.width()),
        (c.listHeight = c.$list.height()),
        c.options.vertical === !1 && c.options.variableWidth === !1
          ? ((c.slideWidth = Math.ceil(c.listWidth / c.options.slidesToShow)),
            c.$slideTrack.width(
              Math.ceil(
                c.slideWidth * c.$slideTrack.children(".slick-slide").length
              )
            ))
          : c.options.variableWidth === !0
          ? c.$slideTrack.width(5000 * c.slideCount)
          : ((c.slideWidth = Math.ceil(c.listWidth)),
            c.$slideTrack.height(
              Math.ceil(
                c.$slides.first().outerHeight(!0) *
                  c.$slideTrack.children(".slick-slide").length
              )
            ));
      var d = c.$slides.first().outerWidth(!0) - c.$slides.first().width();
      c.options.variableWidth === !1 &&
        c.$slideTrack.children(".slick-slide").width(c.slideWidth - d);
    }),
    (b.prototype.setFade = function () {
      var d,
        c = this;
      c.$slides.each(function (f, e) {
        (d = c.slideWidth * f * -1),
          c.options.rtl === !0
            ? a(e).css({
                position: "relative",
                right: d,
                top: 0,
                zIndex: c.options.zIndex - 2,
                opacity: 0,
              })
            : a(e).css({
                position: "relative",
                left: d,
                top: 0,
                zIndex: c.options.zIndex - 2,
                opacity: 0,
              });
      }),
        c.$slides
          .eq(c.currentSlide)
          .css({ zIndex: c.options.zIndex - 1, opacity: 1 });
    }),
    (b.prototype.setHeight = function () {
      var c = this;
      if (
        1 === c.options.slidesToShow &&
        c.options.adaptiveHeight === !0 &&
        c.options.vertical === !1
      ) {
        var d = c.$slides.eq(c.currentSlide).outerHeight(!0);
        c.$list.css("height", d);
      }
    }),
    (b.prototype.setOption = b.prototype.slickSetOption =
      function () {
        var h,
          d,
          i,
          f,
          j,
          g = this,
          c = !1;
        if (
          ("object" === a.type(arguments[0])
            ? ((i = arguments[0]), (c = arguments[1]), (j = "multiple"))
            : "string" === a.type(arguments[0]) &&
              ((i = arguments[0]),
              (f = arguments[1]),
              (c = arguments[2]),
              "responsive" === arguments[0] && "array" === a.type(arguments[1])
                ? (j = "responsive")
                : "undefined" != typeof arguments[1] && (j = "single")),
          "single" === j)
        ) {
          g.options[i] = f;
        } else {
          if ("multiple" === j) {
            a.each(i, function (k, l) {
              g.options[k] = l;
            });
          } else {
            if ("responsive" === j) {
              for (d in f) {
                if ("array" !== a.type(g.options.responsive)) {
                  g.options.responsive = [f[d]];
                } else {
                  for (h = g.options.responsive.length - 1; h >= 0; ) {
                    g.options.responsive[h].breakpoint === f[d].breakpoint &&
                      g.options.responsive.splice(h, 1),
                      h--;
                  }
                  g.options.responsive.push(f[d]);
                }
              }
            }
          }
        }
        c && (g.unload(), g.reinit());
      }),
    (b.prototype.setPosition = function () {
      var c = this;
      c.setDimensions(),
        c.setHeight(),
        c.options.fade === !1
          ? c.setCSS(c.getLeft(c.currentSlide))
          : c.setFade(),
        c.$slider.trigger("setPosition", [c]);
    }),
    (b.prototype.setProps = function () {
      var c = this,
        d = document.body.style;
      (c.positionProp = c.options.vertical === !0 ? "top" : "left"),
        "top" === c.positionProp
          ? c.$slider.addClass("slick-vertical")
          : c.$slider.removeClass("slick-vertical"),
        (void 0 === d.WebkitTransition &&
          void 0 === d.MozTransition &&
          void 0 === d.msTransition) ||
          (c.options.useCSS === !0 && (c.cssTransitions = !0)),
        c.options.fade &&
          ("number" == typeof c.options.zIndex
            ? c.options.zIndex < 3 && (c.options.zIndex = 3)
            : (c.options.zIndex = c.defaults.zIndex)),
        void 0 !== d.OTransform &&
          ((c.animType = "OTransform"),
          (c.transformType = "-o-transform"),
          (c.transitionType = "OTransition"),
          void 0 === d.perspectiveProperty &&
            void 0 === d.webkitPerspective &&
            (c.animType = !1)),
        void 0 !== d.MozTransform &&
          ((c.animType = "MozTransform"),
          (c.transformType = "-moz-transform"),
          (c.transitionType = "MozTransition"),
          void 0 === d.perspectiveProperty &&
            void 0 === d.MozPerspective &&
            (c.animType = !1)),
        void 0 !== d.webkitTransform &&
          ((c.animType = "webkitTransform"),
          (c.transformType = "-webkit-transform"),
          (c.transitionType = "webkitTransition"),
          void 0 === d.perspectiveProperty &&
            void 0 === d.webkitPerspective &&
            (c.animType = !1)),
        void 0 !== d.msTransform &&
          ((c.animType = "msTransform"),
          (c.transformType = "-ms-transform"),
          (c.transitionType = "msTransition"),
          void 0 === d.msTransform && (c.animType = !1)),
        void 0 !== d.transform &&
          c.animType !== !1 &&
          ((c.animType = "transform"),
          (c.transformType = "transform"),
          (c.transitionType = "transition")),
        (c.transformsEnabled =
          c.options.useTransform && null !== c.animType && c.animType !== !1);
    }),
    (b.prototype.setSlideClasses = function (d) {
      var h,
        c,
        j,
        f,
        k = this;
      if (
        ((c = k.$slider
          .find(".slick-slide")
          .removeClass("slick-active slick-center slick-current")
          .attr("aria-hidden", "true")),
        k.$slides.eq(d).addClass("slick-current"),
        k.options.centerMode === !0)
      ) {
        var g = k.options.slidesToShow % 2 === 0 ? 1 : 0;
        (h = Math.floor(k.options.slidesToShow / 2)),
          k.options.infinite === !0 &&
            (d >= h && d <= k.slideCount - 1 - h
              ? k.$slides
                  .slice(d - h + g, d + h + 1)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")
              : ((j = k.options.slidesToShow + d),
                c
                  .slice(j - h + 1 + g, j + h + 2)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")),
            0 === d
              ? c
                  .eq(c.length - 1 - k.options.slidesToShow)
                  .addClass("slick-center")
              : d === k.slideCount - 1 &&
                c.eq(k.options.slidesToShow).addClass("slick-center")),
          k.$slides.eq(d).addClass("slick-center");
      } else {
        d >= 0 && d <= k.slideCount - k.options.slidesToShow
          ? k.$slides
              .slice(d, d + k.options.slidesToShow)
              .addClass("slick-active")
              .attr("aria-hidden", "false")
          : c.length <= k.options.slidesToShow
          ? c.addClass("slick-active").attr("aria-hidden", "false")
          : ((f = k.slideCount % k.options.slidesToShow),
            (j = k.options.infinite === !0 ? k.options.slidesToShow + d : d),
            k.options.slidesToShow == k.options.slidesToScroll &&
            k.slideCount - d < k.options.slidesToShow
              ? c
                  .slice(j - (k.options.slidesToShow - f), j + f)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")
              : c
                  .slice(j, j + k.options.slidesToShow)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false"));
      }
      ("ondemand" !== k.options.lazyLoad &&
        "anticipated" !== k.options.lazyLoad) ||
        k.lazyLoad();
    }),
    (b.prototype.setupInfinite = function () {
      var f,
        c,
        g,
        d = this;
      if (
        (d.options.fade === !0 && (d.options.centerMode = !1),
        d.options.infinite === !0 &&
          d.options.fade === !1 &&
          ((c = null), d.slideCount > d.options.slidesToShow))
      ) {
        for (
          g =
            d.options.centerMode === !0
              ? d.options.slidesToShow + 1
              : d.options.slidesToShow,
            f = d.slideCount;
          f > d.slideCount - g;
          f -= 1
        ) {
          (c = f - 1),
            a(d.$slides[c])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", c - d.slideCount)
              .prependTo(d.$slideTrack)
              .addClass("slick-cloned");
        }
        for (f = 0; f < g + d.slideCount; f += 1) {
          (c = f),
            a(d.$slides[c])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", c + d.slideCount)
              .appendTo(d.$slideTrack)
              .addClass("slick-cloned");
        }
        d.$slideTrack
          .find(".slick-cloned")
          .find("[id]")
          .each(function () {
            a(this).attr("id", "");
          });
      }
    }),
    (b.prototype.interrupt = function (c) {
      var d = this;
      c || d.autoPlay(), (d.interrupted = c);
    }),
    (b.prototype.selectHandler = function (f) {
      var c = this,
        g = a(f.target).is(".slick-slide")
          ? a(f.target)
          : a(f.target).parents(".slick-slide"),
        d = parseInt(g.attr("data-slick-index"));
      return (
        d || (d = 0),
        c.slideCount <= c.options.slidesToShow
          ? void c.slideHandler(d, !1, !0)
          : void c.slideHandler(d)
      );
    }),
    (b.prototype.slideHandler = function (j, k, q) {
      var f,
        u,
        g,
        c,
        h,
        m = null,
        p = this;
      if (
        ((k = k || !1),
        !(
          (p.animating === !0 && p.options.waitForAnimate === !0) ||
          (p.options.fade === !0 && p.currentSlide === j)
        ))
      ) {
        return (
          k === !1 && p.asNavFor(j),
          (f = j),
          (m = p.getLeft(f)),
          (c = p.getLeft(p.currentSlide)),
          (p.currentLeft = null === p.swipeLeft ? c : p.swipeLeft),
          p.options.infinite === !1 &&
          p.options.centerMode === !1 &&
          (j < 0 || j > p.getDotCount() * p.options.slidesToScroll)
            ? void (
                p.options.fade === !1 &&
                ((f = p.currentSlide),
                q !== !0 && p.slideCount > p.options.slidesToShow
                  ? p.animateSlide(c, function () {
                      p.postSlide(f);
                    })
                  : p.postSlide(f))
              )
            : p.options.infinite === !1 &&
              p.options.centerMode === !0 &&
              (j < 0 || j > p.slideCount - p.options.slidesToScroll)
            ? void (
                p.options.fade === !1 &&
                ((f = p.currentSlide),
                q !== !0 && p.slideCount > p.options.slidesToShow
                  ? p.animateSlide(c, function () {
                      p.postSlide(f);
                    })
                  : p.postSlide(f))
              )
            : (p.options.autoplay && clearInterval(p.autoPlayTimer),
              (u =
                f < 0
                  ? p.slideCount % p.options.slidesToScroll !== 0
                    ? p.slideCount - (p.slideCount % p.options.slidesToScroll)
                    : p.slideCount + f
                  : f >= p.slideCount
                  ? p.slideCount % p.options.slidesToScroll !== 0
                    ? 0
                    : f - p.slideCount
                  : f),
              (p.animating = !0),
              p.$slider.trigger("beforeChange", [p, p.currentSlide, u]),
              (g = p.currentSlide),
              (p.currentSlide = u),
              p.setSlideClasses(p.currentSlide),
              p.options.asNavFor &&
                ((h = p.getNavTarget()),
                (h = h.slick("getSlick")),
                h.slideCount <= h.options.slidesToShow &&
                  h.setSlideClasses(p.currentSlide)),
              p.updateDots(),
              p.updateArrows(),
              p.options.fade === !0
                ? (q !== !0
                    ? (p.fadeSlideOut(g),
                      p.fadeSlide(u, function () {
                        p.postSlide(u);
                      }))
                    : p.postSlide(u),
                  void p.animateHeight())
                : void (q !== !0 && p.slideCount > p.options.slidesToShow
                    ? p.animateSlide(m, function () {
                        p.postSlide(u);
                      })
                    : p.postSlide(u)))
        );
      }
    }),
    (b.prototype.startLoad = function () {
      var c = this;
      c.options.arrows === !0 &&
        c.slideCount > c.options.slidesToShow &&
        (c.$prevArrow.hide(), c.$nextArrow.hide()),
        c.options.dots === !0 &&
          c.slideCount > c.options.slidesToShow &&
          c.$dots.hide(),
        c.$slider.addClass("slick-loading");
    }),
    (b.prototype.swipeDirection = function () {
      var d,
        g,
        c,
        h,
        f = this;
      return (
        (d = f.touchObject.startX - f.touchObject.curX),
        (g = f.touchObject.startY - f.touchObject.curY),
        (c = Math.atan2(g, d)),
        (h = Math.round((180 * c) / Math.PI)),
        h < 0 && (h = 360 - Math.abs(h)),
        h <= 45 && h >= 0
          ? f.options.rtl === !1
            ? "left"
            : "right"
          : h <= 360 && h >= 315
          ? f.options.rtl === !1
            ? "left"
            : "right"
          : h >= 135 && h <= 225
          ? f.options.rtl === !1
            ? "right"
            : "left"
          : f.options.verticalSwiping === !0
          ? h >= 35 && h <= 135
            ? "down"
            : "up"
          : "vertical"
      );
    }),
    (b.prototype.swipeEnd = function (d) {
      var f,
        c,
        g = this;
      if (((g.dragging = !1), (g.swiping = !1), g.scrolling)) {
        return (g.scrolling = !1), !1;
      }
      if (
        ((g.interrupted = !1),
        (g.shouldClick = !(g.touchObject.swipeLength > 10)),
        void 0 === g.touchObject.curX)
      ) {
        return !1;
      }
      if (
        (g.touchObject.edgeHit === !0 &&
          g.$slider.trigger("edge", [g, g.swipeDirection()]),
        g.touchObject.swipeLength >= g.touchObject.minSwipe)
      ) {
        switch ((c = g.swipeDirection())) {
          case "left":
          case "down":
            (f = g.options.swipeToSlide
              ? g.checkNavigable(g.currentSlide + g.getSlideCount())
              : g.currentSlide + g.getSlideCount()),
              (g.currentDirection = 0);
            break;
          case "right":
          case "up":
            (f = g.options.swipeToSlide
              ? g.checkNavigable(g.currentSlide - g.getSlideCount())
              : g.currentSlide - g.getSlideCount()),
              (g.currentDirection = 1);
        }
        "vertical" != c &&
          (g.slideHandler(f),
          (g.touchObject = {}),
          g.$slider.trigger("swipe", [g, c]));
      } else {
        g.touchObject.startX !== g.touchObject.curX &&
          (g.slideHandler(g.currentSlide), (g.touchObject = {}));
      }
    }),
    (b.prototype.swipeHandler = function (c) {
      var d = this;
      if (
        !(
          d.options.swipe === !1 ||
          ("ontouchend" in document && d.options.swipe === !1) ||
          (d.options.draggable === !1 && c.type.indexOf("mouse") !== -1)
        )
      ) {
        switch (
          ((d.touchObject.fingerCount =
            c.originalEvent && void 0 !== c.originalEvent.touches
              ? c.originalEvent.touches.length
              : 1),
          (d.touchObject.minSwipe = d.listWidth / d.options.touchThreshold),
          d.options.verticalSwiping === !0 &&
            (d.touchObject.minSwipe = d.listHeight / d.options.touchThreshold),
          c.data.action)
        ) {
          case "start":
            d.swipeStart(c);
            break;
          case "move":
            d.swipeMove(c);
            break;
          case "end":
            d.swipeEnd(c);
        }
      }
    }),
    (b.prototype.swipeMove = function (f) {
      var j,
        d,
        k,
        g,
        m,
        h,
        c = this;
      return (
        (m = void 0 !== f.originalEvent ? f.originalEvent.touches : null),
        !(!c.dragging || c.scrolling || (m && 1 !== m.length)) &&
          ((j = c.getLeft(c.currentSlide)),
          (c.touchObject.curX = void 0 !== m ? m[0].pageX : f.clientX),
          (c.touchObject.curY = void 0 !== m ? m[0].pageY : f.clientY),
          (c.touchObject.swipeLength = Math.round(
            Math.sqrt(Math.pow(c.touchObject.curX - c.touchObject.startX, 2))
          )),
          (h = Math.round(
            Math.sqrt(Math.pow(c.touchObject.curY - c.touchObject.startY, 2))
          )),
          !c.options.verticalSwiping && !c.swiping && h > 4
            ? ((c.scrolling = !0), !1)
            : (c.options.verticalSwiping === !0 &&
                (c.touchObject.swipeLength = h),
              (d = c.swipeDirection()),
              void 0 !== f.originalEvent &&
                c.touchObject.swipeLength > 4 &&
                ((c.swiping = !0), f.preventDefault()),
              (g =
                (c.options.rtl === !1 ? 1 : -1) *
                (c.touchObject.curX > c.touchObject.startX ? 1 : -1)),
              c.options.verticalSwiping === !0 &&
                (g = c.touchObject.curY > c.touchObject.startY ? 1 : -1),
              (k = c.touchObject.swipeLength),
              (c.touchObject.edgeHit = !1),
              c.options.infinite === !1 &&
                ((0 === c.currentSlide && "right" === d) ||
                  (c.currentSlide >= c.getDotCount() && "left" === d)) &&
                ((k = c.touchObject.swipeLength * c.options.edgeFriction),
                (c.touchObject.edgeHit = !0)),
              c.options.vertical === !1
                ? (c.swipeLeft = j + k * g)
                : (c.swipeLeft = j + k * (c.$list.height() / c.listWidth) * g),
              c.options.verticalSwiping === !0 && (c.swipeLeft = j + k * g),
              c.options.fade !== !0 &&
                c.options.touchMove !== !1 &&
                (c.animating === !0
                  ? ((c.swipeLeft = null), !1)
                  : void c.setCSS(c.swipeLeft))))
      );
    }),
    (b.prototype.swipeStart = function (d) {
      var f,
        c = this;
      return (
        (c.interrupted = !0),
        1 !== c.touchObject.fingerCount ||
        c.slideCount <= c.options.slidesToShow
          ? ((c.touchObject = {}), !1)
          : (void 0 !== d.originalEvent &&
              void 0 !== d.originalEvent.touches &&
              (f = d.originalEvent.touches[0]),
            (c.touchObject.startX = c.touchObject.curX =
              void 0 !== f ? f.pageX : d.clientX),
            (c.touchObject.startY = c.touchObject.curY =
              void 0 !== f ? f.pageY : d.clientY),
            void (c.dragging = !0))
      );
    }),
    (b.prototype.unfilterSlides = b.prototype.slickUnfilter =
      function () {
        var c = this;
        null !== c.$slidesCache &&
          (c.unload(),
          c.$slideTrack.children(this.options.slide).detach(),
          c.$slidesCache.appendTo(c.$slideTrack),
          c.reinit());
      }),
    (b.prototype.unload = function () {
      var c = this;
      a(".slick-cloned", c.$slider).remove(),
        c.$dots && c.$dots.remove(),
        c.$prevArrow &&
          c.htmlExpr.test(c.options.prevArrow) &&
          c.$prevArrow.remove(),
        c.$nextArrow &&
          c.htmlExpr.test(c.options.nextArrow) &&
          c.$nextArrow.remove(),
        c.$slides
          .removeClass("slick-slide slick-active slick-visible slick-current")
          .attr("aria-hidden", "true")
          .css("width", "");
    }),
    (b.prototype.unslick = function (c) {
      var d = this;
      d.$slider.trigger("unslick", [d, c]), d.destroy();
    }),
    (b.prototype.updateArrows = function () {
      var c,
        d = this;
      (c = Math.floor(d.options.slidesToShow / 2)),
        d.options.arrows === !0 &&
          d.slideCount > d.options.slidesToShow &&
          !d.options.infinite &&
          (d.$prevArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          d.$nextArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          0 === d.currentSlide
            ? (d.$prevArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              d.$nextArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false"))
            : d.currentSlide >= d.slideCount - d.options.slidesToShow &&
              d.options.centerMode === !1
            ? (d.$nextArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              d.$prevArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false"))
            : d.currentSlide >= d.slideCount - 1 &&
              d.options.centerMode === !0 &&
              (d.$nextArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              d.$prevArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false")));
    }),
    (b.prototype.updateDots = function () {
      var c = this;
      null !== c.$dots &&
        (c.$dots.find("li").removeClass("slick-active").end(),
        c.$dots
          .find("li")
          .eq(Math.floor(c.currentSlide / c.options.slidesToScroll))
          .addClass("slick-active"));
    }),
    (b.prototype.visibility = function () {
      var c = this;
      c.options.autoplay &&
        (document[c.hidden] ? (c.interrupted = !0) : (c.interrupted = !1));
    }),
    (a.fn.slick = function () {
      var d,
        c,
        g = this,
        e = arguments[0],
        h = Array.prototype.slice.call(arguments, 1),
        f = g.length;
      for (d = 0; d < f; d++) {
        if (
          ("object" == typeof e || "undefined" == typeof e
            ? (g[d].slick = new b(g[d], e))
            : (c = g[d].slick[e].apply(g[d].slick, h)),
          "undefined" != typeof c)
        ) {
          return c;
        }
      }
      return g;
    });
});

/*------------------------------------------
 * 3. Magnific Popup
-------------------------------------------*/
/*! Magnific Popup - v1.1.0 - 2016-02-20
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2016 Dmitry Semenov; */
!(function (a) {
  "function" == typeof define && define.amd
    ? define(["jquery"], a)
    : a(
        "object" == typeof exports
          ? require("jquery")
          : window.jQuery || window.Zepto
      );
})(function (a) {
  var b,
    c,
    d,
    e,
    f,
    g,
    h = "Close",
    i = "BeforeClose",
    j = "AfterClose",
    k = "BeforeAppend",
    l = "MarkupParse",
    m = "Open",
    n = "Change",
    o = "mfp",
    p = "." + o,
    q = "mfp-ready",
    r = "mfp-removing",
    s = "mfp-prevent-close",
    t = function () {},
    u = !!window.jQuery,
    v = a(window),
    w = function (a, c) {
      b.ev.on(o + a + p, c);
    },
    x = function (b, c, d, e) {
      var f = document.createElement("div");
      return (
        (f.className = "mfp-" + b),
        d && (f.innerHTML = d),
        e ? c && c.appendChild(f) : ((f = a(f)), c && f.appendTo(c)),
        f
      );
    },
    y = function (c, d) {
      b.ev.triggerHandler(o + c, d),
        b.st.callbacks &&
          ((c = c.charAt(0).toLowerCase() + c.slice(1)),
          b.st.callbacks[c] &&
            b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]));
    },
    z = function (c) {
      return (
        (c === g && b.currTemplate.closeBtn) ||
          ((b.currTemplate.closeBtn = a(
            b.st.closeMarkup.replace("%title%", b.st.tClose)
          )),
          (g = c)),
        b.currTemplate.closeBtn
      );
    },
    A = function () {
      a.magnificPopup.instance ||
        ((b = new t()), b.init(), (a.magnificPopup.instance = b));
    },
    B = function () {
      var a = document.createElement("p").style,
        b = ["ms", "O", "Moz", "Webkit"];
      if (void 0 !== a.transition) return !0;
      for (; b.length; ) if (b.pop() + "Transition" in a) return !0;
      return !1;
    };
  (t.prototype = {
    constructor: t,
    init: function () {
      var c = navigator.appVersion;
      (b.isLowIE = b.isIE8 = document.all && !document.addEventListener),
        (b.isAndroid = /android/gi.test(c)),
        (b.isIOS = /iphone|ipad|ipod/gi.test(c)),
        (b.supportsTransition = B()),
        (b.probablyMobile =
          b.isAndroid ||
          b.isIOS ||
          /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(
            navigator.userAgent
          )),
        (d = a(document)),
        (b.popupsCache = {});
    },
    open: function (c) {
      var e;
      if (c.isObj === !1) {
        (b.items = c.items.toArray()), (b.index = 0);
        var g,
          h = c.items;
        for (e = 0; e < h.length; e++)
          if (((g = h[e]), g.parsed && (g = g.el[0]), g === c.el[0])) {
            b.index = e;
            break;
          }
      } else
        (b.items = a.isArray(c.items) ? c.items : [c.items]),
          (b.index = c.index || 0);
      if (b.isOpen) return void b.updateItemHTML();
      (b.types = []),
        (f = ""),
        c.mainEl && c.mainEl.length ? (b.ev = c.mainEl.eq(0)) : (b.ev = d),
        c.key
          ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}),
            (b.currTemplate = b.popupsCache[c.key]))
          : (b.currTemplate = {}),
        (b.st = a.extend(!0, {}, a.magnificPopup.defaults, c)),
        (b.fixedContentPos =
          "auto" === b.st.fixedContentPos
            ? !b.probablyMobile
            : b.st.fixedContentPos),
        b.st.modal &&
          ((b.st.closeOnContentClick = !1),
          (b.st.closeOnBgClick = !1),
          (b.st.showCloseBtn = !1),
          (b.st.enableEscapeKey = !1)),
        b.bgOverlay ||
          ((b.bgOverlay = x("bg").on("click" + p, function () {
            b.close();
          })),
          (b.wrap = x("wrap")
            .attr("tabindex", -1)
            .on("click" + p, function (a) {
              b._checkIfClose(a.target) && b.close();
            })),
          (b.container = x("container", b.wrap))),
        (b.contentContainer = x("content")),
        b.st.preloader &&
          (b.preloader = x("preloader", b.container, b.st.tLoading));
      var i = a.magnificPopup.modules;
      for (e = 0; e < i.length; e++) {
        var j = i[e];
        (j = j.charAt(0).toUpperCase() + j.slice(1)), b["init" + j].call(b);
      }
      y("BeforeOpen"),
        b.st.showCloseBtn &&
          (b.st.closeBtnInside
            ? (w(l, function (a, b, c, d) {
                c.close_replaceWith = z(d.type);
              }),
              (f += " mfp-close-btn-in"))
            : b.wrap.append(z())),
        b.st.alignTop && (f += " mfp-align-top"),
        b.fixedContentPos
          ? b.wrap.css({
              overflow: b.st.overflowY,
              overflowX: "hidden",
              overflowY: b.st.overflowY,
            })
          : b.wrap.css({ top: v.scrollTop(), position: "absolute" }),
        (b.st.fixedBgPos === !1 ||
          ("auto" === b.st.fixedBgPos && !b.fixedContentPos)) &&
          b.bgOverlay.css({ height: d.height(), position: "absolute" }),
        b.st.enableEscapeKey &&
          d.on("keyup" + p, function (a) {
            27 === a.keyCode && b.close();
          }),
        v.on("resize" + p, function () {
          b.updateSize();
        }),
        b.st.closeOnContentClick || (f += " mfp-auto-cursor"),
        f && b.wrap.addClass(f);
      var k = (b.wH = v.height()),
        n = {};
      if (b.fixedContentPos && b._hasScrollBar(k)) {
        var o = b._getScrollbarSize();
        o && (n.marginRight = o);
      }
      b.fixedContentPos &&
        (b.isIE7
          ? a("body, html").css("overflow", "hidden")
          : (n.overflow = "hidden"));
      var r = b.st.mainClass;
      return (
        b.isIE7 && (r += " mfp-ie7"),
        r && b._addClassToMFP(r),
        b.updateItemHTML(),
        y("BuildControls"),
        a("html").css(n),
        b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo || a(document.body)),
        (b._lastFocusedEl = document.activeElement),
        setTimeout(function () {
          b.content
            ? (b._addClassToMFP(q), b._setFocus())
            : b.bgOverlay.addClass(q),
            d.on("focusin" + p, b._onFocusIn);
        }, 16),
        (b.isOpen = !0),
        b.updateSize(k),
        y(m),
        c
      );
    },
    close: function () {
      b.isOpen &&
        (y(i),
        (b.isOpen = !1),
        b.st.removalDelay && !b.isLowIE && b.supportsTransition
          ? (b._addClassToMFP(r),
            setTimeout(function () {
              b._close();
            }, b.st.removalDelay))
          : b._close());
    },
    _close: function () {
      y(h);
      var c = r + " " + q + " ";
      if (
        (b.bgOverlay.detach(),
        b.wrap.detach(),
        b.container.empty(),
        b.st.mainClass && (c += b.st.mainClass + " "),
        b._removeClassFromMFP(c),
        b.fixedContentPos)
      ) {
        var e = { marginRight: "" };
        b.isIE7 ? a("body, html").css("overflow", "") : (e.overflow = ""),
          a("html").css(e);
      }
      d.off("keyup" + p + " focusin" + p),
        b.ev.off(p),
        b.wrap.attr("class", "mfp-wrap").removeAttr("style"),
        b.bgOverlay.attr("class", "mfp-bg"),
        b.container.attr("class", "mfp-container"),
        !b.st.showCloseBtn ||
          (b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0) ||
          (b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach()),
        b.st.autoFocusLast && b._lastFocusedEl && a(b._lastFocusedEl).focus(),
        (b.currItem = null),
        (b.content = null),
        (b.currTemplate = null),
        (b.prevHeight = 0),
        y(j);
    },
    updateSize: function (a) {
      if (b.isIOS) {
        var c = document.documentElement.clientWidth / window.innerWidth,
          d = window.innerHeight * c;
        b.wrap.css("height", d), (b.wH = d);
      } else b.wH = a || v.height();
      b.fixedContentPos || b.wrap.css("height", b.wH), y("Resize");
    },
    updateItemHTML: function () {
      var c = b.items[b.index];
      b.contentContainer.detach(),
        b.content && b.content.detach(),
        c.parsed || (c = b.parseEl(b.index));
      var d = c.type;
      if (
        (y("BeforeChange", [b.currItem ? b.currItem.type : "", d]),
        (b.currItem = c),
        !b.currTemplate[d])
      ) {
        var f = b.st[d] ? b.st[d].markup : !1;
        y("FirstMarkupParse", f),
          f ? (b.currTemplate[d] = a(f)) : (b.currTemplate[d] = !0);
      }
      e && e !== c.type && b.container.removeClass("mfp-" + e + "-holder");
      var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](
        c,
        b.currTemplate[d]
      );
      b.appendContent(g, d),
        (c.preloaded = !0),
        y(n, c),
        (e = c.type),
        b.container.prepend(b.contentContainer),
        y("AfterChange");
    },
    appendContent: function (a, c) {
      (b.content = a),
        a
          ? b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === !0
            ? b.content.find(".mfp-close").length || b.content.append(z())
            : (b.content = a)
          : (b.content = ""),
        y(k),
        b.container.addClass("mfp-" + c + "-holder"),
        b.contentContainer.append(b.content);
    },
    parseEl: function (c) {
      var d,
        e = b.items[c];
      if (
        (e.tagName
          ? (e = { el: a(e) })
          : ((d = e.type), (e = { data: e, src: e.src })),
        e.el)
      ) {
        for (var f = b.types, g = 0; g < f.length; g++)
          if (e.el.hasClass("mfp-" + f[g])) {
            d = f[g];
            break;
          }
        (e.src = e.el.attr("data-mfp-src")),
          e.src || (e.src = e.el.attr("href"));
      }
      return (
        (e.type = d || b.st.type || "inline"),
        (e.index = c),
        (e.parsed = !0),
        (b.items[c] = e),
        y("ElementParse", e),
        b.items[c]
      );
    },
    addGroup: function (a, c) {
      var d = function (d) {
        (d.mfpEl = this), b._openClick(d, a, c);
      };
      c || (c = {});
      var e = "click.magnificPopup";
      (c.mainEl = a),
        c.items
          ? ((c.isObj = !0), a.off(e).on(e, d))
          : ((c.isObj = !1),
            c.delegate
              ? a.off(e).on(e, c.delegate, d)
              : ((c.items = a), a.off(e).on(e, d)));
    },
    _openClick: function (c, d, e) {
      var f =
        void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;
      if (
        f ||
        !(2 === c.which || c.ctrlKey || c.metaKey || c.altKey || c.shiftKey)
      ) {
        var g =
          void 0 !== e.disableOn
            ? e.disableOn
            : a.magnificPopup.defaults.disableOn;
        if (g)
          if (a.isFunction(g)) {
            if (!g.call(b)) return !0;
          } else if (v.width() < g) return !0;
        c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()),
          (e.el = a(c.mfpEl)),
          e.delegate && (e.items = d.find(e.delegate)),
          b.open(e);
      }
    },
    updateStatus: function (a, d) {
      if (b.preloader) {
        c !== a && b.container.removeClass("mfp-s-" + c),
          d || "loading" !== a || (d = b.st.tLoading);
        var e = { status: a, text: d };
        y("UpdateStatus", e),
          (a = e.status),
          (d = e.text),
          b.preloader.html(d),
          b.preloader.find("a").on("click", function (a) {
            a.stopImmediatePropagation();
          }),
          b.container.addClass("mfp-s-" + a),
          (c = a);
      }
    },
    _checkIfClose: function (c) {
      if (!a(c).hasClass(s)) {
        var d = b.st.closeOnContentClick,
          e = b.st.closeOnBgClick;
        if (d && e) return !0;
        if (
          !b.content ||
          a(c).hasClass("mfp-close") ||
          (b.preloader && c === b.preloader[0])
        )
          return !0;
        if (c === b.content[0] || a.contains(b.content[0], c)) {
          if (d) return !0;
        } else if (e && a.contains(document, c)) return !0;
        return !1;
      }
    },
    _addClassToMFP: function (a) {
      b.bgOverlay.addClass(a), b.wrap.addClass(a);
    },
    _removeClassFromMFP: function (a) {
      this.bgOverlay.removeClass(a), b.wrap.removeClass(a);
    },
    _hasScrollBar: function (a) {
      return (
        (b.isIE7 ? d.height() : document.body.scrollHeight) > (a || v.height())
      );
    },
    _setFocus: function () {
      (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus();
    },
    _onFocusIn: function (c) {
      return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target)
        ? void 0
        : (b._setFocus(), !1);
    },
    _parseMarkup: function (b, c, d) {
      var e;
      d.data && (c = a.extend(d.data, c)),
        y(l, [b, c, d]),
        a.each(c, function (c, d) {
          if (void 0 === d || d === !1) return !0;
          if (((e = c.split("_")), e.length > 1)) {
            var f = b.find(p + "-" + e[0]);
            if (f.length > 0) {
              var g = e[1];
              "replaceWith" === g
                ? f[0] !== d[0] && f.replaceWith(d)
                : "img" === g
                ? f.is("img")
                  ? f.attr("src", d)
                  : f.replaceWith(
                      a("<img>").attr("src", d).attr("class", f.attr("class"))
                    )
                : f.attr(e[1], d);
            }
          } else b.find(p + "-" + c).html(d);
        });
    },
    _getScrollbarSize: function () {
      if (void 0 === b.scrollbarSize) {
        var a = document.createElement("div");
        (a.style.cssText =
          "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;"),
          document.body.appendChild(a),
          (b.scrollbarSize = a.offsetWidth - a.clientWidth),
          document.body.removeChild(a);
      }
      return b.scrollbarSize;
    },
  }),
    (a.magnificPopup = {
      instance: null,
      proto: t.prototype,
      modules: [],
      open: function (b, c) {
        return (
          A(),
          (b = b ? a.extend(!0, {}, b) : {}),
          (b.isObj = !0),
          (b.index = c || 0),
          this.instance.open(b)
        );
      },
      close: function () {
        return a.magnificPopup.instance && a.magnificPopup.instance.close();
      },
      registerModule: function (b, c) {
        c.options && (a.magnificPopup.defaults[b] = c.options),
          a.extend(this.proto, c.proto),
          this.modules.push(b);
      },
      defaults: {
        disableOn: 0,
        key: null,
        midClick: !1,
        mainClass: "",
        preloader: !0,
        focus: "",
        closeOnContentClick: !1,
        closeOnBgClick: !0,
        closeBtnInside: !0,
        showCloseBtn: !0,
        enableEscapeKey: !0,
        modal: !1,
        alignTop: !1,
        removalDelay: 0,
        prependTo: null,
        fixedContentPos: "auto",
        fixedBgPos: "auto",
        overflowY: "auto",
        closeMarkup:
          '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
        tClose: "Close (Esc)",
        tLoading: "Loading...",
        autoFocusLast: !0,
      },
    }),
    (a.fn.magnificPopup = function (c) {
      A();
      var d = a(this);
      if ("string" == typeof c)
        if ("open" === c) {
          var e,
            f = u ? d.data("magnificPopup") : d[0].magnificPopup,
            g = parseInt(arguments[1], 10) || 0;
          f.items
            ? (e = f.items[g])
            : ((e = d), f.delegate && (e = e.find(f.delegate)), (e = e.eq(g))),
            b._openClick({ mfpEl: e }, d, f);
        } else
          b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1));
      else
        (c = a.extend(!0, {}, c)),
          u ? d.data("magnificPopup", c) : (d[0].magnificPopup = c),
          b.addGroup(d, c);
      return d;
    });
  var C,
    D,
    E,
    F = "inline",
    G = function () {
      E && (D.after(E.addClass(C)).detach(), (E = null));
    };
  a.magnificPopup.registerModule(F, {
    options: {
      hiddenClass: "hide",
      markup: "",
      tNotFound: "Content not found",
    },
    proto: {
      initInline: function () {
        b.types.push(F),
          w(h + "." + F, function () {
            G();
          });
      },
      getInline: function (c, d) {
        if ((G(), c.src)) {
          var e = b.st.inline,
            f = a(c.src);
          if (f.length) {
            var g = f[0].parentNode;
            g &&
              g.tagName &&
              (D || ((C = e.hiddenClass), (D = x(C)), (C = "mfp-" + C)),
              (E = f.after(D).detach().removeClass(C))),
              b.updateStatus("ready");
          } else b.updateStatus("error", e.tNotFound), (f = a("<div>"));
          return (c.inlineElement = f), f;
        }
        return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d;
      },
    },
  });
  var H,
    I = "ajax",
    J = function () {
      H && a(document.body).removeClass(H);
    },
    K = function () {
      J(), b.req && b.req.abort();
    };
  a.magnificPopup.registerModule(I, {
    options: {
      settings: null,
      cursor: "mfp-ajax-cur",
      tError: '<a href="%url%">The content</a> could not be loaded.',
    },
    proto: {
      initAjax: function () {
        b.types.push(I),
          (H = b.st.ajax.cursor),
          w(h + "." + I, K),
          w("BeforeChange." + I, K);
      },
      getAjax: function (c) {
        H && a(document.body).addClass(H), b.updateStatus("loading");
        var d = a.extend(
          {
            url: c.src,
            success: function (d, e, f) {
              var g = { data: d, xhr: f };
              y("ParseAjax", g),
                b.appendContent(a(g.data), I),
                (c.finished = !0),
                J(),
                b._setFocus(),
                setTimeout(function () {
                  b.wrap.addClass(q);
                }, 16),
                b.updateStatus("ready"),
                y("AjaxContentAdded");
            },
            error: function () {
              J(),
                (c.finished = c.loadError = !0),
                b.updateStatus(
                  "error",
                  b.st.ajax.tError.replace("%url%", c.src)
                );
            },
          },
          b.st.ajax.settings
        );
        return (b.req = a.ajax(d)), "";
      },
    },
  });
  var L,
    M = function (c) {
      if (c.data && void 0 !== c.data.title) return c.data.title;
      var d = b.st.image.titleSrc;
      if (d) {
        if (a.isFunction(d)) return d.call(b, c);
        if (c.el) return c.el.attr(d) || "";
      }
      return "";
    };
  a.magnificPopup.registerModule("image", {
    options: {
      markup:
        '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
      cursor: "mfp-zoom-out-cur",
      titleSrc: "title",
      verticalFit: !0,
      tError: '<a href="%url%">The image</a> could not be loaded.',
    },
    proto: {
      initImage: function () {
        var c = b.st.image,
          d = ".image";
        b.types.push("image"),
          w(m + d, function () {
            "image" === b.currItem.type &&
              c.cursor &&
              a(document.body).addClass(c.cursor);
          }),
          w(h + d, function () {
            c.cursor && a(document.body).removeClass(c.cursor),
              v.off("resize" + p);
          }),
          w("Resize" + d, b.resizeImage),
          b.isLowIE && w("AfterChange", b.resizeImage);
      },
      resizeImage: function () {
        var a = b.currItem;
        if (a && a.img && b.st.image.verticalFit) {
          var c = 0;
          b.isLowIE &&
            (c =
              parseInt(a.img.css("padding-top"), 10) +
              parseInt(a.img.css("padding-bottom"), 10)),
            a.img.css("max-height", b.wH - c);
        }
      },
      _onImageHasSize: function (a) {
        a.img &&
          ((a.hasSize = !0),
          L && clearInterval(L),
          (a.isCheckingImgSize = !1),
          y("ImageHasSize", a),
          a.imgHidden &&
            (b.content && b.content.removeClass("mfp-loading"),
            (a.imgHidden = !1)));
      },
      findImageSize: function (a) {
        var c = 0,
          d = a.img[0],
          e = function (f) {
            L && clearInterval(L),
              (L = setInterval(function () {
                return d.naturalWidth > 0
                  ? void b._onImageHasSize(a)
                  : (c > 200 && clearInterval(L),
                    c++,
                    void (3 === c
                      ? e(10)
                      : 40 === c
                      ? e(50)
                      : 100 === c && e(500)));
              }, f));
          };
        e(1);
      },
      getImage: function (c, d) {
        var e = 0,
          f = function () {
            c &&
              (c.img[0].complete
                ? (c.img.off(".mfploader"),
                  c === b.currItem &&
                    (b._onImageHasSize(c), b.updateStatus("ready")),
                  (c.hasSize = !0),
                  (c.loaded = !0),
                  y("ImageLoadComplete"))
                : (e++, 200 > e ? setTimeout(f, 100) : g()));
          },
          g = function () {
            c &&
              (c.img.off(".mfploader"),
              c === b.currItem &&
                (b._onImageHasSize(c),
                b.updateStatus("error", h.tError.replace("%url%", c.src))),
              (c.hasSize = !0),
              (c.loaded = !0),
              (c.loadError = !0));
          },
          h = b.st.image,
          i = d.find(".mfp-img");
        if (i.length) {
          var j = document.createElement("img");
          (j.className = "mfp-img"),
            c.el &&
              c.el.find("img").length &&
              (j.alt = c.el.find("img").attr("alt")),
            (c.img = a(j).on("load.mfploader", f).on("error.mfploader", g)),
            (j.src = c.src),
            i.is("img") && (c.img = c.img.clone()),
            (j = c.img[0]),
            j.naturalWidth > 0 ? (c.hasSize = !0) : j.width || (c.hasSize = !1);
        }
        return (
          b._parseMarkup(d, { title: M(c), img_replaceWith: c.img }, c),
          b.resizeImage(),
          c.hasSize
            ? (L && clearInterval(L),
              c.loadError
                ? (d.addClass("mfp-loading"),
                  b.updateStatus("error", h.tError.replace("%url%", c.src)))
                : (d.removeClass("mfp-loading"), b.updateStatus("ready")),
              d)
            : (b.updateStatus("loading"),
              (c.loading = !0),
              c.hasSize ||
                ((c.imgHidden = !0),
                d.addClass("mfp-loading"),
                b.findImageSize(c)),
              d)
        );
      },
    },
  });
  var N,
    O = function () {
      return (
        void 0 === N &&
          (N = void 0 !== document.createElement("p").style.MozTransform),
        N
      );
    };
  a.magnificPopup.registerModule("zoom", {
    options: {
      enabled: !1,
      easing: "ease-in-out",
      duration: 300,
      opener: function (a) {
        return a.is("img") ? a : a.find("img");
      },
    },
    proto: {
      initZoom: function () {
        var a,
          c = b.st.zoom,
          d = ".zoom";
        if (c.enabled && b.supportsTransition) {
          var e,
            f,
            g = c.duration,
            j = function (a) {
              var b = a
                  .clone()
                  .removeAttr("style")
                  .removeAttr("class")
                  .addClass("mfp-animated-image"),
                d = "all " + c.duration / 1e3 + "s " + c.easing,
                e = {
                  position: "fixed",
                  zIndex: 9999,
                  left: 0,
                  top: 0,
                  "-webkit-backface-visibility": "hidden",
                },
                f = "transition";
              return (
                (e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d),
                b.css(e),
                b
              );
            },
            k = function () {
              b.content.css("visibility", "visible");
            };
          w("BuildControls" + d, function () {
            if (b._allowZoom()) {
              if (
                (clearTimeout(e),
                b.content.css("visibility", "hidden"),
                (a = b._getItemToZoom()),
                !a)
              )
                return void k();
              (f = j(a)),
                f.css(b._getOffset()),
                b.wrap.append(f),
                (e = setTimeout(function () {
                  f.css(b._getOffset(!0)),
                    (e = setTimeout(function () {
                      k(),
                        setTimeout(function () {
                          f.remove(), (a = f = null), y("ZoomAnimationEnded");
                        }, 16);
                    }, g));
                }, 16));
            }
          }),
            w(i + d, function () {
              if (b._allowZoom()) {
                if ((clearTimeout(e), (b.st.removalDelay = g), !a)) {
                  if (((a = b._getItemToZoom()), !a)) return;
                  f = j(a);
                }
                f.css(b._getOffset(!0)),
                  b.wrap.append(f),
                  b.content.css("visibility", "hidden"),
                  setTimeout(function () {
                    f.css(b._getOffset());
                  }, 16);
              }
            }),
            w(h + d, function () {
              b._allowZoom() && (k(), f && f.remove(), (a = null));
            });
        }
      },
      _allowZoom: function () {
        return "image" === b.currItem.type;
      },
      _getItemToZoom: function () {
        return b.currItem.hasSize ? b.currItem.img : !1;
      },
      _getOffset: function (c) {
        var d;
        d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem);
        var e = d.offset(),
          f = parseInt(d.css("padding-top"), 10),
          g = parseInt(d.css("padding-bottom"), 10);
        e.top -= a(window).scrollTop() - f;
        var h = {
          width: d.width(),
          height: (u ? d.innerHeight() : d[0].offsetHeight) - g - f,
        };
        return (
          O()
            ? (h["-moz-transform"] = h.transform =
                "translate(" + e.left + "px," + e.top + "px)")
            : ((h.left = e.left), (h.top = e.top)),
          h
        );
      },
    },
  });
  var P = "iframe",
    Q = "//about:blank",
    R = function (a) {
      if (b.currTemplate[P]) {
        var c = b.currTemplate[P].find("iframe");
        c.length &&
          (a || (c[0].src = Q),
          b.isIE8 && c.css("display", a ? "block" : "none"));
      }
    };
  a.magnificPopup.registerModule(P, {
    options: {
      markup:
        '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
      srcAction: "iframe_src",
      patterns: {
        youtube: {
          index: "youtube.com",
          id: "v=",
          src: "//www.youtube.com/embed/%id%?autoplay=1",
        },
        vimeo: {
          index: "vimeo.com/",
          id: "/",
          src: "//player.vimeo.com/video/%id%?autoplay=1",
        },
        gmaps: { index: "//maps.google.", src: "%id%&output=embed" },
      },
    },
    proto: {
      initIframe: function () {
        b.types.push(P),
          w("BeforeChange", function (a, b, c) {
            b !== c && (b === P ? R() : c === P && R(!0));
          }),
          w(h + "." + P, function () {
            R();
          });
      },
      getIframe: function (c, d) {
        var e = c.src,
          f = b.st.iframe;
        a.each(f.patterns, function () {
          return e.indexOf(this.index) > -1
            ? (this.id &&
                (e =
                  "string" == typeof this.id
                    ? e.substr(
                        e.lastIndexOf(this.id) + this.id.length,
                        e.length
                      )
                    : this.id.call(this, e)),
              (e = this.src.replace("%id%", e)),
              !1)
            : void 0;
        });
        var g = {};
        return (
          f.srcAction && (g[f.srcAction] = e),
          b._parseMarkup(d, g, c),
          b.updateStatus("ready"),
          d
        );
      },
    },
  });
  var S = function (a) {
      var c = b.items.length;
      return a > c - 1 ? a - c : 0 > a ? c + a : a;
    },
    T = function (a, b, c) {
      return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c);
    };
  a.magnificPopup.registerModule("gallery", {
    options: {
      enabled: !1,
      arrowMarkup:
        '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
      preload: [0, 2],
      navigateByImgClick: !0,
      arrows: !0,
      tPrev: "Previous (Left arrow key)",
      tNext: "Next (Right arrow key)",
      tCounter: "%curr% of %total%",
    },
    proto: {
      initGallery: function () {
        var c = b.st.gallery,
          e = ".mfp-gallery";
        return (
          (b.direction = !0),
          c && c.enabled
            ? ((f += " mfp-gallery"),
              w(m + e, function () {
                c.navigateByImgClick &&
                  b.wrap.on("click" + e, ".mfp-img", function () {
                    return b.items.length > 1 ? (b.next(), !1) : void 0;
                  }),
                  d.on("keydown" + e, function (a) {
                    37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next();
                  });
              }),
              w("UpdateStatus" + e, function (a, c) {
                c.text &&
                  (c.text = T(c.text, b.currItem.index, b.items.length));
              }),
              w(l + e, function (a, d, e, f) {
                var g = b.items.length;
                e.counter = g > 1 ? T(c.tCounter, f.index, g) : "";
              }),
              w("BuildControls" + e, function () {
                if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
                  var d = c.arrowMarkup,
                    e = (b.arrowLeft = a(
                      d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")
                    ).addClass(s)),
                    f = (b.arrowRight = a(
                      d
                        .replace(/%title%/gi, c.tNext)
                        .replace(/%dir%/gi, "right")
                    ).addClass(s));
                  e.click(function () {
                    b.prev();
                  }),
                    f.click(function () {
                      b.next();
                    }),
                    b.container.append(e.add(f));
                }
              }),
              w(n + e, function () {
                b._preloadTimeout && clearTimeout(b._preloadTimeout),
                  (b._preloadTimeout = setTimeout(function () {
                    b.preloadNearbyImages(), (b._preloadTimeout = null);
                  }, 16));
              }),
              void w(h + e, function () {
                d.off(e),
                  b.wrap.off("click" + e),
                  (b.arrowRight = b.arrowLeft = null);
              }))
            : !1
        );
      },
      next: function () {
        (b.direction = !0), (b.index = S(b.index + 1)), b.updateItemHTML();
      },
      prev: function () {
        (b.direction = !1), (b.index = S(b.index - 1)), b.updateItemHTML();
      },
      goTo: function (a) {
        (b.direction = a >= b.index), (b.index = a), b.updateItemHTML();
      },
      preloadNearbyImages: function () {
        var a,
          c = b.st.gallery.preload,
          d = Math.min(c[0], b.items.length),
          e = Math.min(c[1], b.items.length);
        for (a = 1; a <= (b.direction ? e : d); a++)
          b._preloadItem(b.index + a);
        for (a = 1; a <= (b.direction ? d : e); a++)
          b._preloadItem(b.index - a);
      },
      _preloadItem: function (c) {
        if (((c = S(c)), !b.items[c].preloaded)) {
          var d = b.items[c];
          d.parsed || (d = b.parseEl(c)),
            y("LazyLoad", d),
            "image" === d.type &&
              (d.img = a('<img class="mfp-img" />')
                .on("load.mfploader", function () {
                  d.hasSize = !0;
                })
                .on("error.mfploader", function () {
                  (d.hasSize = !0), (d.loadError = !0), y("LazyLoadError", d);
                })
                .attr("src", d.src)),
            (d.preloaded = !0);
        }
      },
    },
  });
  var U = "retina";
  a.magnificPopup.registerModule(U, {
    options: {
      replaceSrc: function (a) {
        return a.src.replace(/\.\w+$/, function (a) {
          return "@2x" + a;
        });
      },
      ratio: 1,
    },
    proto: {
      initRetina: function () {
        if (window.devicePixelRatio > 1) {
          var a = b.st.retina,
            c = a.ratio;
          (c = isNaN(c) ? c() : c),
            c > 1 &&
              (w("ImageHasSize." + U, function (a, b) {
                b.img.css({
                  "max-width": b.img[0].naturalWidth / c,
                  width: "100%",
                });
              }),
              w("ElementParse." + U, function (b, d) {
                d.src = a.replaceSrc(d, c);
              }));
        }
      },
    },
  }),
    A();
});

/*------------------------------------------
 * 4. jQuery elevateZoom 3.0.8
-------------------------------------------*/
/* jQuery elevateZoom 3.0.8 - Demo's and documentation: - www.elevateweb.co.uk/image-zoom -
 * Copyright (c) 2013 Andrew Eades - www.elevateweb.co.uk - Dual licensed under the LGPL licenses.
 * - http://en.wikipedia.org/wiki/MIT_License - http://en.wikipedia.org/wiki/GNU_General_Public_License */
"function" !== typeof Object.create &&
  (Object.create = function (b) {
    function a() {}
    a.prototype = b;
    return new a();
  });
(function (f, e, b, a) {
  var c = {
    init: function (d, g) {
      var h = this;
      h.elem = g;
      h.$elem = f(g);
      h.imageSrc = h.$elem.data("zoom-image")
        ? h.$elem.data("zoom-image")
        : h.$elem.attr("src");
      h.options = f.extend({}, f.fn.elevateZoom.options, d);
      h.options.tint &&
        ((h.options.lensColour = "none"), (h.options.lensOpacity = "1"));
      "inner" == h.options.zoomType && (h.options.showLens = !1);
      h.$elem.parent().removeAttr("title").removeAttr("alt");
      h.zoomImage = h.imageSrc;
      h.refresh(1);
      f("#" + h.options.gallery + " a").click(function (i) {
        h.options.galleryActiveClass &&
          (f("#" + h.options.gallery + " a").removeClass(
            h.options.galleryActiveClass
          ),
          f(this).addClass(h.options.galleryActiveClass));
        i.preventDefault();
        f(this).data("zoom-image")
          ? (h.zoomImagePre = f(this).data("zoom-image"))
          : (h.zoomImagePre = f(this).data("image"));
        h.swaptheimage(f(this).data("image"), h.zoomImagePre);
        return !1;
      });
    },
    refresh: function (d) {
      var g = this;
      setTimeout(function () {
        g.fetch(g.imageSrc);
      }, d || g.options.refresh);
    },
    fetch: function (d) {
      var g = this,
        h = new Image();
      h.onload = function () {
        g.largeWidth = h.width;
        g.largeHeight = h.height;
        g.startZoom();
        g.currentImage = g.imageSrc;
        g.options.onZoomedImageLoaded(g.$elem);
      };
      h.src = d;
    },
    startZoom: function () {
      var d = this;
      d.nzWidth = d.$elem.width();
      d.nzHeight = d.$elem.height();
      d.isWindowActive = !1;
      d.isLensActive = !1;
      d.isTintActive = !1;
      d.overWindow = !1;
      d.options.imageCrossfade &&
        ((d.zoomWrap = d.$elem.wrap(
          '<div style="height:' +
            d.nzHeight +
            "px;width:" +
            d.nzWidth +
            'px;" class="zoomWrapper" />'
        )),
        d.$elem.css("position", "absolute"));
      d.zoomLock = 1;
      d.scrollingLock = !1;
      d.changeBgSize = !1;
      d.currentZoomLevel = d.options.zoomLevel;
      d.nzOffset = d.$elem.offset();
      d.widthRatio = d.largeWidth / d.currentZoomLevel / d.nzWidth;
      d.heightRatio = d.largeHeight / d.currentZoomLevel / d.nzHeight;
      "window" == d.options.zoomType &&
        (d.zoomWindowStyle =
          "overflow: hidden;background-position: 0px 0px;text-align:center;background-color: " +
          String(d.options.zoomWindowBgColour) +
          ";width: " +
          String(d.options.zoomWindowWidth) +
          "px;height: " +
          String(d.options.zoomWindowHeight) +
          "px;float: left;background-size: " +
          d.largeWidth / d.currentZoomLevel +
          "px " +
          d.largeHeight / d.currentZoomLevel +
          "px;display: none;z-index:100;border: " +
          String(d.options.borderSize) +
          "px solid " +
          d.options.borderColour +
          ";background-repeat: no-repeat;position: absolute;");
      if ("inner" == d.options.zoomType) {
        var g = d.$elem.css("border-left-width");
        d.zoomWindowStyle =
          "overflow: hidden;margin-left: " +
          String(g) +
          ";margin-top: " +
          String(g) +
          ";background-position: 0px 0px;width: " +
          String(d.nzWidth) +
          "px;height: " +
          String(d.nzHeight) +
          "px;float: left;display: none;cursor:" +
          d.options.cursor +
          ";px solid " +
          d.options.borderColour +
          ";background-repeat: no-repeat;position: absolute;";
      }
      "window" == d.options.zoomType &&
        ((lensHeight =
          d.nzHeight < d.options.zoomWindowWidth / d.widthRatio
            ? d.nzHeight
            : String(d.options.zoomWindowHeight / d.heightRatio)),
        (lensWidth =
          d.largeWidth < d.options.zoomWindowWidth
            ? d.nzWidth
            : d.options.zoomWindowWidth / d.widthRatio),
        (d.lensStyle =
          "background-position: 0px 0px;width: " +
          String(d.options.zoomWindowWidth / d.widthRatio) +
          "px;height: " +
          String(d.options.zoomWindowHeight / d.heightRatio) +
          "px;float: right;display: none;overflow: hidden;z-index: 999;-webkit-transform: translateZ(0);opacity:" +
          d.options.lensOpacity +
          ";filter: alpha(opacity = " +
          100 * d.options.lensOpacity +
          "); zoom:1;width:" +
          lensWidth +
          "px;height:" +
          lensHeight +
          "px;background-color:" +
          d.options.lensColour +
          ";cursor:" +
          d.options.cursor +
          ";border: " +
          d.options.lensBorderSize +
          "px solid " +
          d.options.lensBorderColour +
          ";background-repeat: no-repeat;position: absolute;"));
      d.tintStyle =
        "display: block;position: absolute;background-color: " +
        d.options.tintColour +
        ";filter:alpha(opacity=0);opacity: 0;width: " +
        d.nzWidth +
        "px;height: " +
        d.nzHeight +
        "px;";
      d.lensRound = "";
      "lens" == d.options.zoomType &&
        (d.lensStyle =
          "background-position: 0px 0px;float: left;display: none;border: " +
          String(d.options.borderSize) +
          "px solid " +
          d.options.borderColour +
          ";width:" +
          String(d.options.lensSize) +
          "px;height:" +
          String(d.options.lensSize) +
          "px;background-repeat: no-repeat;position: absolute;");
      "round" == d.options.lensShape &&
        (d.lensRound =
          "border-top-left-radius: " +
          String(d.options.lensSize / 2 + d.options.borderSize) +
          "px;border-top-right-radius: " +
          String(d.options.lensSize / 2 + d.options.borderSize) +
          "px;border-bottom-left-radius: " +
          String(d.options.lensSize / 2 + d.options.borderSize) +
          "px;border-bottom-right-radius: " +
          String(d.options.lensSize / 2 + d.options.borderSize) +
          "px;");
      d.zoomContainer = f(
        '<div class="zoomContainer" style="-webkit-transform: translateZ(0);position:absolute;left:' +
          d.nzOffset.left +
          "px;top:" +
          d.nzOffset.top +
          "px;height:" +
          d.nzHeight +
          "px;width:" +
          d.nzWidth +
          'px;"></div>'
      );
      f("body").append(d.zoomContainer);
      d.options.containLensZoom &&
        "lens" == d.options.zoomType &&
        d.zoomContainer.css("overflow", "hidden");
      "inner" != d.options.zoomType &&
        ((d.zoomLens = f(
          "<div class='zoomLens' style='" +
            d.lensStyle +
            d.lensRound +
            "'> </div>"
        )
          .appendTo(d.zoomContainer)
          .click(function () {
            d.$elem.trigger("click");
          })),
        d.options.tint &&
          ((d.tintContainer = f("<div/>").addClass("tintContainer")),
          (d.zoomTint = f(
            "<div class='zoomTint' style='" + d.tintStyle + "'></div>"
          )),
          d.zoomLens.wrap(d.tintContainer),
          (d.zoomTintcss = d.zoomLens.after(d.zoomTint)),
          (d.zoomTintImage = f(
            '<img style="position: absolute; left: 0px; top: 0px; max-width: none; width: ' +
              d.nzWidth +
              "px; height: " +
              d.nzHeight +
              'px;" src="' +
              d.imageSrc +
              '">'
          )
            .appendTo(d.zoomLens)
            .click(function () {
              d.$elem.trigger("click");
            }))));
      isNaN(d.options.zoomWindowPosition)
        ? (d.zoomWindow = f(
            "<div style='z-index:999;left:" +
              d.windowOffsetLeft +
              "px;top:" +
              d.windowOffsetTop +
              "px;" +
              d.zoomWindowStyle +
              "' class='zoomWindow'> </div>"
          )
            .appendTo("body")
            .click(function () {
              d.$elem.trigger("click");
            }))
        : (d.zoomWindow = f(
            "<div style='z-index:999;left:" +
              d.windowOffsetLeft +
              "px;top:" +
              d.windowOffsetTop +
              "px;" +
              d.zoomWindowStyle +
              "' class='zoomWindow'> </div>"
          )
            .appendTo(d.zoomContainer)
            .click(function () {
              d.$elem.trigger("click");
            }));
      d.zoomWindowContainer = f("<div/>")
        .addClass("zoomWindowContainer")
        .css("width", d.options.zoomWindowWidth);
      d.zoomWindow.wrap(d.zoomWindowContainer);
      "lens" == d.options.zoomType &&
        d.zoomLens.css({ backgroundImage: "url('" + d.imageSrc + "')" });
      "window" == d.options.zoomType &&
        d.zoomWindow.css({ backgroundImage: "url('" + d.imageSrc + "')" });
      "inner" == d.options.zoomType &&
        d.zoomWindow.css({ backgroundImage: "url('" + d.imageSrc + "')" });
      d.$elem.bind("touchmove", function (h) {
        h.preventDefault();
        d.setPosition(
          h.originalEvent.touches[0] || h.originalEvent.changedTouches[0]
        );
      });
      d.zoomContainer.bind("touchmove", function (h) {
        "inner" == d.options.zoomType && d.showHideWindow("show");
        h.preventDefault();
        d.setPosition(
          h.originalEvent.touches[0] || h.originalEvent.changedTouches[0]
        );
      });
      d.zoomContainer.bind("touchend", function (h) {
        d.showHideWindow("hide");
        d.options.showLens && d.showHideLens("hide");
        d.options.tint &&
          "inner" != d.options.zoomType &&
          d.showHideTint("hide");
      });
      d.$elem.bind("touchend", function (h) {
        d.showHideWindow("hide");
        d.options.showLens && d.showHideLens("hide");
        d.options.tint &&
          "inner" != d.options.zoomType &&
          d.showHideTint("hide");
      });
      d.options.showLens &&
        (d.zoomLens.bind("touchmove", function (h) {
          h.preventDefault();
          d.setPosition(
            h.originalEvent.touches[0] || h.originalEvent.changedTouches[0]
          );
        }),
        d.zoomLens.bind("touchend", function (h) {
          d.showHideWindow("hide");
          d.options.showLens && d.showHideLens("hide");
          d.options.tint &&
            "inner" != d.options.zoomType &&
            d.showHideTint("hide");
        }));
      d.$elem.bind("mousemove", function (h) {
        !1 == d.overWindow && d.setElements("show");
        if (d.lastX !== h.clientX || d.lastY !== h.clientY) {
          d.setPosition(h), (d.currentLoc = h);
        }
        d.lastX = h.clientX;
        d.lastY = h.clientY;
      });
      d.zoomContainer.bind("mousemove", function (h) {
        !1 == d.overWindow && d.setElements("show");
        if (d.lastX !== h.clientX || d.lastY !== h.clientY) {
          d.setPosition(h), (d.currentLoc = h);
        }
        d.lastX = h.clientX;
        d.lastY = h.clientY;
      });
      "inner" != d.options.zoomType &&
        d.zoomLens.bind("mousemove", function (h) {
          if (d.lastX !== h.clientX || d.lastY !== h.clientY) {
            d.setPosition(h), (d.currentLoc = h);
          }
          d.lastX = h.clientX;
          d.lastY = h.clientY;
        });
      d.options.tint &&
        "inner" != d.options.zoomType &&
        d.zoomTint.bind("mousemove", function (h) {
          if (d.lastX !== h.clientX || d.lastY !== h.clientY) {
            d.setPosition(h), (d.currentLoc = h);
          }
          d.lastX = h.clientX;
          d.lastY = h.clientY;
        });
      "inner" == d.options.zoomType &&
        d.zoomWindow.bind("mousemove", function (h) {
          if (d.lastX !== h.clientX || d.lastY !== h.clientY) {
            d.setPosition(h), (d.currentLoc = h);
          }
          d.lastX = h.clientX;
          d.lastY = h.clientY;
        });
      d.zoomContainer
        .add(d.$elem)
        .mouseenter(function () {
          !1 == d.overWindow && d.setElements("show");
        })
        .mouseleave(function () {
          d.scrollLock || d.setElements("hide");
        });
      "inner" != d.options.zoomType &&
        d.zoomWindow
          .mouseenter(function () {
            d.overWindow = !0;
            d.setElements("hide");
          })
          .mouseleave(function () {
            d.overWindow = !1;
          });
      d.minZoomLevel = d.options.minZoomLevel
        ? d.options.minZoomLevel
        : 2 * d.options.scrollZoomIncrement;
      d.options.scrollZoom &&
        d.zoomContainer
          .add(d.$elem)
          .bind("mousewheel DOMMouseScroll MozMousePixelScroll", function (h) {
            d.scrollLock = !0;
            clearTimeout(f.data(this, "timer"));
            f.data(
              this,
              "timer",
              setTimeout(function () {
                d.scrollLock = !1;
              }, 250)
            );
            var i = h.originalEvent.wheelDelta || -1 * h.originalEvent.detail;
            h.stopImmediatePropagation();
            h.stopPropagation();
            h.preventDefault();
            0 < i / 120
              ? d.currentZoomLevel >= d.minZoomLevel &&
                d.changeZoomLevel(
                  d.currentZoomLevel - d.options.scrollZoomIncrement
                )
              : d.options.maxZoomLevel
              ? d.currentZoomLevel <= d.options.maxZoomLevel &&
                d.changeZoomLevel(
                  parseFloat(d.currentZoomLevel) + d.options.scrollZoomIncrement
                )
              : d.changeZoomLevel(
                  parseFloat(d.currentZoomLevel) + d.options.scrollZoomIncrement
                );
            return !1;
          });
    },
    setElements: function (d) {
      if (!this.options.zoomEnabled) {
        return !1;
      }
      "show" == d &&
        this.isWindowSet &&
        ("inner" == this.options.zoomType && this.showHideWindow("show"),
        "window" == this.options.zoomType && this.showHideWindow("show"),
        this.options.showLens && this.showHideLens("show"),
        this.options.tint &&
          "inner" != this.options.zoomType &&
          this.showHideTint("show"));
      "hide" == d &&
        ("window" == this.options.zoomType && this.showHideWindow("hide"),
        this.options.tint || this.showHideWindow("hide"),
        this.options.showLens && this.showHideLens("hide"),
        this.options.tint && this.showHideTint("hide"));
    },
    setPosition: function (d) {
      if (!this.options.zoomEnabled) {
        return !1;
      }
      this.nzHeight = this.$elem.height();
      this.nzWidth = this.$elem.width();
      this.nzOffset = this.$elem.offset();
      this.options.tint &&
        "inner" != this.options.zoomType &&
        (this.zoomTint.css({ top: 0 }), this.zoomTint.css({ left: 0 }));
      this.options.responsive &&
        !this.options.scrollZoom &&
        this.options.showLens &&
        ((lensHeight =
          this.nzHeight < this.options.zoomWindowWidth / this.widthRatio
            ? this.nzHeight
            : String(this.options.zoomWindowHeight / this.heightRatio)),
        (lensWidth =
          this.largeWidth < this.options.zoomWindowWidth
            ? this.nzWidth
            : this.options.zoomWindowWidth / this.widthRatio),
        (this.widthRatio = this.largeWidth / this.nzWidth),
        (this.heightRatio = this.largeHeight / this.nzHeight),
        "lens" != this.options.zoomType &&
          ((lensHeight =
            this.nzHeight < this.options.zoomWindowWidth / this.widthRatio
              ? this.nzHeight
              : String(this.options.zoomWindowHeight / this.heightRatio)),
          (lensWidth =
            this.options.zoomWindowWidth < this.options.zoomWindowWidth
              ? this.nzWidth
              : this.options.zoomWindowWidth / this.widthRatio),
          this.zoomLens.css("width", lensWidth),
          this.zoomLens.css("height", lensHeight),
          this.options.tint &&
            (this.zoomTintImage.css("width", this.nzWidth),
            this.zoomTintImage.css("height", this.nzHeight))),
        "lens" == this.options.zoomType &&
          this.zoomLens.css({
            width: String(this.options.lensSize) + "px",
            height: String(this.options.lensSize) + "px",
          }));
      this.zoomContainer.css({ top: this.nzOffset.top });
      this.zoomContainer.css({ left: this.nzOffset.left });
      this.mouseLeft = parseInt(d.pageX - this.nzOffset.left);
      this.mouseTop = parseInt(d.pageY - this.nzOffset.top);
      "window" == this.options.zoomType &&
        ((this.Etoppos = this.mouseTop < this.zoomLens.height() / 2),
        (this.Eboppos =
          this.mouseTop >
          this.nzHeight -
            this.zoomLens.height() / 2 -
            2 * this.options.lensBorderSize),
        (this.Eloppos = this.mouseLeft < 0 + this.zoomLens.width() / 2),
        (this.Eroppos =
          this.mouseLeft >
          this.nzWidth -
            this.zoomLens.width() / 2 -
            2 * this.options.lensBorderSize));
      "inner" == this.options.zoomType &&
        ((this.Etoppos = this.mouseTop < this.nzHeight / 2 / this.heightRatio),
        (this.Eboppos =
          this.mouseTop > this.nzHeight - this.nzHeight / 2 / this.heightRatio),
        (this.Eloppos =
          this.mouseLeft < 0 + this.nzWidth / 2 / this.widthRatio),
        (this.Eroppos =
          this.mouseLeft >
          this.nzWidth -
            this.nzWidth / 2 / this.widthRatio -
            2 * this.options.lensBorderSize));
      0 >= this.mouseLeft ||
      0 > this.mouseTop ||
      this.mouseLeft > this.nzWidth ||
      this.mouseTop > this.nzHeight
        ? this.setElements("hide")
        : (this.options.showLens &&
            ((this.lensLeftPos = String(
              this.mouseLeft - this.zoomLens.width() / 2
            )),
            (this.lensTopPos = String(
              this.mouseTop - this.zoomLens.height() / 2
            ))),
          this.Etoppos && (this.lensTopPos = 0),
          this.Eloppos &&
            (this.tintpos = this.lensLeftPos = this.windowLeftPos = 0),
          "window" == this.options.zoomType &&
            (this.Eboppos &&
              (this.lensTopPos = Math.max(
                this.nzHeight -
                  this.zoomLens.height() -
                  2 * this.options.lensBorderSize,
                0
              )),
            this.Eroppos &&
              (this.lensLeftPos =
                this.nzWidth -
                this.zoomLens.width() -
                2 * this.options.lensBorderSize)),
          "inner" == this.options.zoomType &&
            (this.Eboppos &&
              (this.lensTopPos = Math.max(
                this.nzHeight - 2 * this.options.lensBorderSize,
                0
              )),
            this.Eroppos &&
              (this.lensLeftPos =
                this.nzWidth - this.nzWidth - 2 * this.options.lensBorderSize)),
          "lens" == this.options.zoomType &&
            ((this.windowLeftPos = String(
              -1 *
                ((d.pageX - this.nzOffset.left) * this.widthRatio -
                  this.zoomLens.width() / 2)
            )),
            (this.windowTopPos = String(
              -1 *
                ((d.pageY - this.nzOffset.top) * this.heightRatio -
                  this.zoomLens.height() / 2)
            )),
            this.zoomLens.css({
              backgroundPosition:
                this.windowLeftPos + "px " + this.windowTopPos + "px",
            }),
            this.changeBgSize &&
              (this.nzHeight > this.nzWidth
                ? ("lens" == this.options.zoomType &&
                    this.zoomLens.css({
                      "background-size":
                        this.largeWidth / this.newvalueheight +
                        "px " +
                        this.largeHeight / this.newvalueheight +
                        "px",
                    }),
                  this.zoomWindow.css({
                    "background-size":
                      this.largeWidth / this.newvalueheight +
                      "px " +
                      this.largeHeight / this.newvalueheight +
                      "px",
                  }))
                : ("lens" == this.options.zoomType &&
                    this.zoomLens.css({
                      "background-size":
                        this.largeWidth / this.newvaluewidth +
                        "px " +
                        this.largeHeight / this.newvaluewidth +
                        "px",
                    }),
                  this.zoomWindow.css({
                    "background-size":
                      this.largeWidth / this.newvaluewidth +
                      "px " +
                      this.largeHeight / this.newvaluewidth +
                      "px",
                  })),
              (this.changeBgSize = !1)),
            this.setWindowPostition(d)),
          this.options.tint &&
            "inner" != this.options.zoomType &&
            this.setTintPosition(d),
          "window" == this.options.zoomType && this.setWindowPostition(d),
          "inner" == this.options.zoomType && this.setWindowPostition(d),
          this.options.showLens &&
            (this.fullwidth &&
              "lens" != this.options.zoomType &&
              (this.lensLeftPos = 0),
            this.zoomLens.css({
              left: this.lensLeftPos + "px",
              top: this.lensTopPos + "px",
            })));
    },
    showHideWindow: function (d) {
      "show" != d ||
        this.isWindowActive ||
        (this.options.zoomWindowFadeIn
          ? this.zoomWindow
              .stop(!0, !0, !1)
              .fadeIn(this.options.zoomWindowFadeIn)
          : this.zoomWindow.show(),
        (this.isWindowActive = !0));
      "hide" == d &&
        this.isWindowActive &&
        (this.options.zoomWindowFadeOut
          ? this.zoomWindow.stop(!0, !0).fadeOut(this.options.zoomWindowFadeOut)
          : this.zoomWindow.hide(),
        (this.isWindowActive = !1));
    },
    showHideLens: function (d) {
      "show" != d ||
        this.isLensActive ||
        (this.options.lensFadeIn
          ? this.zoomLens.stop(!0, !0, !1).fadeIn(this.options.lensFadeIn)
          : this.zoomLens.show(),
        (this.isLensActive = !0));
      "hide" == d &&
        this.isLensActive &&
        (this.options.lensFadeOut
          ? this.zoomLens.stop(!0, !0).fadeOut(this.options.lensFadeOut)
          : this.zoomLens.hide(),
        (this.isLensActive = !1));
    },
    showHideTint: function (d) {
      "show" != d ||
        this.isTintActive ||
        (this.options.zoomTintFadeIn
          ? this.zoomTint
              .css({ opacity: this.options.tintOpacity })
              .animate()
              .stop(!0, !0)
              .fadeIn("slow")
          : (this.zoomTint.css({ opacity: this.options.tintOpacity }).animate(),
            this.zoomTint.show()),
        (this.isTintActive = !0));
      "hide" == d &&
        this.isTintActive &&
        (this.options.zoomTintFadeOut
          ? this.zoomTint.stop(!0, !0).fadeOut(this.options.zoomTintFadeOut)
          : this.zoomTint.hide(),
        (this.isTintActive = !1));
    },
    setLensPostition: function (d) {},
    setWindowPostition: function (d) {
      var g = this;
      if (isNaN(g.options.zoomWindowPosition)) {
        (g.externalContainer = f("#" + g.options.zoomWindowPosition)),
          (g.externalContainerWidth = g.externalContainer.width()),
          (g.externalContainerHeight = g.externalContainer.height()),
          (g.externalContainerOffset = g.externalContainer.offset()),
          (g.windowOffsetTop = g.externalContainerOffset.top),
          (g.windowOffsetLeft = g.externalContainerOffset.left);
      } else {
        switch (g.options.zoomWindowPosition) {
          case 1:
            g.windowOffsetTop = g.options.zoomWindowOffety;
            g.windowOffsetLeft = +g.nzWidth;
            break;
          case 2:
            g.options.zoomWindowHeight > g.nzHeight &&
              ((g.windowOffsetTop =
                -1 * (g.options.zoomWindowHeight / 2 - g.nzHeight / 2)),
              (g.windowOffsetLeft = g.nzWidth));
            break;
          case 3:
            g.windowOffsetTop =
              g.nzHeight - g.zoomWindow.height() - 2 * g.options.borderSize;
            g.windowOffsetLeft = g.nzWidth;
            break;
          case 4:
            g.windowOffsetTop = g.nzHeight;
            g.windowOffsetLeft = g.nzWidth;
            break;
          case 5:
            g.windowOffsetTop = g.nzHeight;
            g.windowOffsetLeft =
              g.nzWidth - g.zoomWindow.width() - 2 * g.options.borderSize;
            break;
          case 6:
            g.options.zoomWindowHeight > g.nzHeight &&
              ((g.windowOffsetTop = g.nzHeight),
              (g.windowOffsetLeft =
                -1 *
                (g.options.zoomWindowWidth / 2 -
                  g.nzWidth / 2 +
                  2 * g.options.borderSize)));
            break;
          case 7:
            g.windowOffsetTop = g.nzHeight;
            g.windowOffsetLeft = 0;
            break;
          case 8:
            g.windowOffsetTop = g.nzHeight;
            g.windowOffsetLeft =
              -1 * (g.zoomWindow.width() + 2 * g.options.borderSize);
            break;
          case 9:
            g.windowOffsetTop =
              g.nzHeight - g.zoomWindow.height() - 2 * g.options.borderSize;
            g.windowOffsetLeft =
              -1 * (g.zoomWindow.width() + 2 * g.options.borderSize);
            break;
          case 10:
            g.options.zoomWindowHeight > g.nzHeight &&
              ((g.windowOffsetTop =
                -1 * (g.options.zoomWindowHeight / 2 - g.nzHeight / 2)),
              (g.windowOffsetLeft =
                -1 * (g.zoomWindow.width() + 2 * g.options.borderSize)));
            break;
          case 11:
            g.windowOffsetTop = g.options.zoomWindowOffety;
            g.windowOffsetLeft =
              -1 * (g.zoomWindow.width() + 2 * g.options.borderSize);
            break;
          case 12:
            g.windowOffsetTop =
              -1 * (g.zoomWindow.height() + 2 * g.options.borderSize);
            g.windowOffsetLeft =
              -1 * (g.zoomWindow.width() + 2 * g.options.borderSize);
            break;
          case 13:
            g.windowOffsetTop =
              -1 * (g.zoomWindow.height() + 2 * g.options.borderSize);
            g.windowOffsetLeft = 0;
            break;
          case 14:
            g.options.zoomWindowHeight > g.nzHeight &&
              ((g.windowOffsetTop =
                -1 * (g.zoomWindow.height() + 2 * g.options.borderSize)),
              (g.windowOffsetLeft =
                -1 *
                (g.options.zoomWindowWidth / 2 -
                  g.nzWidth / 2 +
                  2 * g.options.borderSize)));
            break;
          case 15:
            g.windowOffsetTop =
              -1 * (g.zoomWindow.height() + 2 * g.options.borderSize);
            g.windowOffsetLeft =
              g.nzWidth - g.zoomWindow.width() - 2 * g.options.borderSize;
            break;
          case 16:
            g.windowOffsetTop =
              -1 * (g.zoomWindow.height() + 2 * g.options.borderSize);
            g.windowOffsetLeft = g.nzWidth;
            break;
          default:
            (g.windowOffsetTop = g.options.zoomWindowOffety),
              (g.windowOffsetLeft = g.nzWidth);
        }
      }
      g.isWindowSet = !0;
      g.windowOffsetTop += g.options.zoomWindowOffety;
      g.windowOffsetLeft += g.options.zoomWindowOffetx;
      g.zoomWindow.css({ top: g.windowOffsetTop });
      g.zoomWindow.css({ left: g.windowOffsetLeft });
      "inner" == g.options.zoomType &&
        (g.zoomWindow.css({ top: 0 }), g.zoomWindow.css({ left: 0 }));
      g.windowLeftPos = String(
        -1 *
          ((d.pageX - g.nzOffset.left) * g.widthRatio -
            g.zoomWindow.width() / 2)
      );
      g.windowTopPos = String(
        -1 *
          ((d.pageY - g.nzOffset.top) * g.heightRatio -
            g.zoomWindow.height() / 2)
      );
      g.Etoppos && (g.windowTopPos = 0);
      g.Eloppos && (g.windowLeftPos = 0);
      g.Eboppos &&
        (g.windowTopPos =
          -1 * (g.largeHeight / g.currentZoomLevel - g.zoomWindow.height()));
      g.Eroppos &&
        (g.windowLeftPos =
          -1 * (g.largeWidth / g.currentZoomLevel - g.zoomWindow.width()));
      g.fullheight && (g.windowTopPos = 0);
      g.fullwidth && (g.windowLeftPos = 0);
      if ("window" == g.options.zoomType || "inner" == g.options.zoomType) {
        1 == g.zoomLock &&
          (1 >= g.widthRatio && (g.windowLeftPos = 0),
          1 >= g.heightRatio && (g.windowTopPos = 0)),
          g.largeHeight < g.options.zoomWindowHeight && (g.windowTopPos = 0),
          g.largeWidth < g.options.zoomWindowWidth && (g.windowLeftPos = 0),
          g.options.easing
            ? (g.xp || (g.xp = 0),
              g.yp || (g.yp = 0),
              g.loop ||
                (g.loop = setInterval(function () {
                  g.xp += (g.windowLeftPos - g.xp) / g.options.easingAmount;
                  g.yp += (g.windowTopPos - g.yp) / g.options.easingAmount;
                  g.scrollingLock
                    ? (clearInterval(g.loop),
                      (g.xp = g.windowLeftPos),
                      (g.yp = g.windowTopPos),
                      (g.xp =
                        -1 *
                        ((d.pageX - g.nzOffset.left) * g.widthRatio -
                          g.zoomWindow.width() / 2)),
                      (g.yp =
                        -1 *
                        ((d.pageY - g.nzOffset.top) * g.heightRatio -
                          g.zoomWindow.height() / 2)),
                      g.changeBgSize &&
                        (g.nzHeight > g.nzWidth
                          ? ("lens" == g.options.zoomType &&
                              g.zoomLens.css({
                                "background-size":
                                  g.largeWidth / g.newvalueheight +
                                  "px " +
                                  g.largeHeight / g.newvalueheight +
                                  "px",
                              }),
                            g.zoomWindow.css({
                              "background-size":
                                g.largeWidth / g.newvalueheight +
                                "px " +
                                g.largeHeight / g.newvalueheight +
                                "px",
                            }))
                          : ("lens" != g.options.zoomType &&
                              g.zoomLens.css({
                                "background-size":
                                  g.largeWidth / g.newvaluewidth +
                                  "px " +
                                  g.largeHeight / g.newvalueheight +
                                  "px",
                              }),
                            g.zoomWindow.css({
                              "background-size":
                                g.largeWidth / g.newvaluewidth +
                                "px " +
                                g.largeHeight / g.newvaluewidth +
                                "px",
                            })),
                        (g.changeBgSize = !1)),
                      g.zoomWindow.css({
                        backgroundPosition:
                          g.windowLeftPos + "px " + g.windowTopPos + "px",
                      }),
                      (g.scrollingLock = !1),
                      (g.loop = !1))
                    : (g.changeBgSize &&
                        (g.nzHeight > g.nzWidth
                          ? ("lens" == g.options.zoomType &&
                              g.zoomLens.css({
                                "background-size":
                                  g.largeWidth / g.newvalueheight +
                                  "px " +
                                  g.largeHeight / g.newvalueheight +
                                  "px",
                              }),
                            g.zoomWindow.css({
                              "background-size":
                                g.largeWidth / g.newvalueheight +
                                "px " +
                                g.largeHeight / g.newvalueheight +
                                "px",
                            }))
                          : ("lens" != g.options.zoomType &&
                              g.zoomLens.css({
                                "background-size":
                                  g.largeWidth / g.newvaluewidth +
                                  "px " +
                                  g.largeHeight / g.newvaluewidth +
                                  "px",
                              }),
                            g.zoomWindow.css({
                              "background-size":
                                g.largeWidth / g.newvaluewidth +
                                "px " +
                                g.largeHeight / g.newvaluewidth +
                                "px",
                            })),
                        (g.changeBgSize = !1)),
                      g.zoomWindow.css({
                        backgroundPosition: g.xp + "px " + g.yp + "px",
                      }));
                }, 16)))
            : (g.changeBgSize &&
                (g.nzHeight > g.nzWidth
                  ? ("lens" == g.options.zoomType &&
                      g.zoomLens.css({
                        "background-size":
                          g.largeWidth / g.newvalueheight +
                          "px " +
                          g.largeHeight / g.newvalueheight +
                          "px",
                      }),
                    g.zoomWindow.css({
                      "background-size":
                        g.largeWidth / g.newvalueheight +
                        "px " +
                        g.largeHeight / g.newvalueheight +
                        "px",
                    }))
                  : ("lens" == g.options.zoomType &&
                      g.zoomLens.css({
                        "background-size":
                          g.largeWidth / g.newvaluewidth +
                          "px " +
                          g.largeHeight / g.newvaluewidth +
                          "px",
                      }),
                    g.largeHeight / g.newvaluewidth < g.options.zoomWindowHeight
                      ? g.zoomWindow.css({
                          "background-size":
                            g.largeWidth / g.newvaluewidth +
                            "px " +
                            g.largeHeight / g.newvaluewidth +
                            "px",
                        })
                      : g.zoomWindow.css({
                          "background-size":
                            g.largeWidth / g.newvalueheight +
                            "px " +
                            g.largeHeight / g.newvalueheight +
                            "px",
                        })),
                (g.changeBgSize = !1)),
              g.zoomWindow.css({
                backgroundPosition:
                  g.windowLeftPos + "px " + g.windowTopPos + "px",
              }));
      }
    },
    setTintPosition: function (d) {
      this.nzOffset = this.$elem.offset();
      this.tintpos = String(
        -1 * (d.pageX - this.nzOffset.left - this.zoomLens.width() / 2)
      );
      this.tintposy = String(
        -1 * (d.pageY - this.nzOffset.top - this.zoomLens.height() / 2)
      );
      this.Etoppos && (this.tintposy = 0);
      this.Eloppos && (this.tintpos = 0);
      this.Eboppos &&
        (this.tintposy =
          -1 *
          (this.nzHeight -
            this.zoomLens.height() -
            2 * this.options.lensBorderSize));
      this.Eroppos &&
        (this.tintpos =
          -1 *
          (this.nzWidth -
            this.zoomLens.width() -
            2 * this.options.lensBorderSize));
      this.options.tint &&
        (this.fullheight && (this.tintposy = 0),
        this.fullwidth && (this.tintpos = 0),
        this.zoomTintImage.css({ left: this.tintpos + "px" }),
        this.zoomTintImage.css({ top: this.tintposy + "px" }));
    },
    swaptheimage: function (d, g) {
      var i = this,
        h = new Image();
      i.options.loadingIcon &&
        ((i.spinner = f(
          "<div style=\"background: url('" +
            i.options.loadingIcon +
            "') no-repeat center;height:" +
            i.nzHeight +
            "px;width:" +
            i.nzWidth +
            'px;z-index: 2000;position: absolute; background-position: center center;"></div>'
        )),
        i.$elem.after(i.spinner));
      i.options.onImageSwap(i.$elem);
      h.onload = function () {
        i.largeWidth = h.width;
        i.largeHeight = h.height;
        i.zoomImage = g;
        i.zoomWindow.css({
          "background-size": i.largeWidth + "px " + i.largeHeight + "px",
        });
        i.zoomWindow.css({
          "background-size": i.largeWidth + "px " + i.largeHeight + "px",
        });
        i.swapAction(d, g);
      };
      h.src = g;
    },
    swapAction: function (d, h) {
      var l = this,
        k = new Image();
      k.onload = function () {
        l.nzHeight = k.height;
        l.nzWidth = k.width;
        l.options.onImageSwapComplete(l.$elem);
        l.doneCallback();
      };
      k.src = d;
      l.currentZoomLevel = l.options.zoomLevel;
      l.options.maxZoomLevel = !1;
      "lens" == l.options.zoomType &&
        l.zoomLens.css({ backgroundImage: "url('" + h + "')" });
      "window" == l.options.zoomType &&
        l.zoomWindow.css({ backgroundImage: "url('" + h + "')" });
      "inner" == l.options.zoomType &&
        l.zoomWindow.css({ backgroundImage: "url('" + h + "')" });
      l.currentImage = h;
      if (l.options.imageCrossfade) {
        var j = l.$elem,
          i = j.clone();
        l.$elem.attr("src", d);
        l.$elem.after(i);
        i.stop(!0).fadeOut(l.options.imageCrossfade, function () {
          f(this).remove();
        });
        l.$elem.width("auto").removeAttr("width");
        l.$elem.height("auto").removeAttr("height");
        j.fadeIn(l.options.imageCrossfade);
        l.options.tint &&
          "inner" != l.options.zoomType &&
          ((j = l.zoomTintImage),
          (i = j.clone()),
          l.zoomTintImage.attr("src", h),
          l.zoomTintImage.after(i),
          i.stop(!0).fadeOut(l.options.imageCrossfade, function () {
            f(this).remove();
          }),
          j.fadeIn(l.options.imageCrossfade),
          l.zoomTint.css({ height: l.$elem.height() }),
          l.zoomTint.css({ width: l.$elem.width() }));
        l.zoomContainer.css("height", l.$elem.height());
        l.zoomContainer.css("width", l.$elem.width());
        "inner" != l.options.zoomType ||
          l.options.constrainType ||
          (l.zoomWrap.parent().css("height", l.$elem.height()),
          l.zoomWrap.parent().css("width", l.$elem.width()),
          l.zoomWindow.css("height", l.$elem.height()),
          l.zoomWindow.css("width", l.$elem.width()));
      } else {
        l.$elem.attr("src", d),
          l.options.tint &&
            (l.zoomTintImage.attr("src", h),
            l.zoomTintImage.attr("height", l.$elem.height()),
            l.zoomTintImage.css({ height: l.$elem.height() }),
            l.zoomTint.css({ height: l.$elem.height() })),
          l.zoomContainer.css("height", l.$elem.height()),
          l.zoomContainer.css("width", l.$elem.width());
      }
      l.options.imageCrossfade &&
        (l.zoomWrap.css("height", l.$elem.height()),
        l.zoomWrap.css("width", l.$elem.width()));
      l.options.constrainType &&
        ("height" == l.options.constrainType &&
          (l.zoomContainer.css("height", l.options.constrainSize),
          l.zoomContainer.css("width", "auto"),
          l.options.imageCrossfade
            ? (l.zoomWrap.css("height", l.options.constrainSize),
              l.zoomWrap.css("width", "auto"),
              (l.constwidth = l.zoomWrap.width()))
            : (l.$elem.css("height", l.options.constrainSize),
              l.$elem.css("width", "auto"),
              (l.constwidth = l.$elem.width())),
          "inner" == l.options.zoomType &&
            (l.zoomWrap.parent().css("height", l.options.constrainSize),
            l.zoomWrap.parent().css("width", l.constwidth),
            l.zoomWindow.css("height", l.options.constrainSize),
            l.zoomWindow.css("width", l.constwidth)),
          l.options.tint &&
            (l.tintContainer.css("height", l.options.constrainSize),
            l.tintContainer.css("width", l.constwidth),
            l.zoomTint.css("height", l.options.constrainSize),
            l.zoomTint.css("width", l.constwidth),
            l.zoomTintImage.css("height", l.options.constrainSize),
            l.zoomTintImage.css("width", l.constwidth))),
        "width" == l.options.constrainType &&
          (l.zoomContainer.css("height", "auto"),
          l.zoomContainer.css("width", l.options.constrainSize),
          l.options.imageCrossfade
            ? (l.zoomWrap.css("height", "auto"),
              l.zoomWrap.css("width", l.options.constrainSize),
              (l.constheight = l.zoomWrap.height()))
            : (l.$elem.css("height", "auto"),
              l.$elem.css("width", l.options.constrainSize),
              (l.constheight = l.$elem.height())),
          "inner" == l.options.zoomType &&
            (l.zoomWrap.parent().css("height", l.constheight),
            l.zoomWrap.parent().css("width", l.options.constrainSize),
            l.zoomWindow.css("height", l.constheight),
            l.zoomWindow.css("width", l.options.constrainSize)),
          l.options.tint &&
            (l.tintContainer.css("height", l.constheight),
            l.tintContainer.css("width", l.options.constrainSize),
            l.zoomTint.css("height", l.constheight),
            l.zoomTint.css("width", l.options.constrainSize),
            l.zoomTintImage.css("height", l.constheight),
            l.zoomTintImage.css("width", l.options.constrainSize))));
    },
    doneCallback: function () {
      this.options.loadingIcon && this.spinner.hide();
      this.nzOffset = this.$elem.offset();
      this.nzWidth = this.$elem.width();
      this.nzHeight = this.$elem.height();
      this.currentZoomLevel = this.options.zoomLevel;
      this.widthRatio = this.largeWidth / this.nzWidth;
      this.heightRatio = this.largeHeight / this.nzHeight;
      "window" == this.options.zoomType &&
        ((lensHeight =
          this.nzHeight < this.options.zoomWindowWidth / this.widthRatio
            ? this.nzHeight
            : String(this.options.zoomWindowHeight / this.heightRatio)),
        (lensWidth =
          this.options.zoomWindowWidth < this.options.zoomWindowWidth
            ? this.nzWidth
            : this.options.zoomWindowWidth / this.widthRatio),
        this.zoomLens &&
          (this.zoomLens.css("width", lensWidth),
          this.zoomLens.css("height", lensHeight)));
    },
    getCurrentImage: function () {
      return this.zoomImage;
    },
    getGalleryList: function () {
      var d = this;
      d.gallerylist = [];
      d.options.gallery
        ? f("#" + d.options.gallery + " a").each(function () {
            var g = "";
            f(this).data("zoom-image")
              ? (g = f(this).data("zoom-image"))
              : f(this).data("image") && (g = f(this).data("image"));
            g == d.zoomImage
              ? d.gallerylist.unshift({
                  href: "" + g + "",
                  title: f(this).find("img").attr("title"),
                })
              : d.gallerylist.push({
                  href: "" + g + "",
                  title: f(this).find("img").attr("title"),
                });
          })
        : d.gallerylist.push({
            href: "" + d.zoomImage + "",
            title: f(this).find("img").attr("title"),
          });
      return d.gallerylist;
    },
    changeZoomLevel: function (d) {
      this.scrollingLock = !0;
      this.newvalue = parseFloat(d).toFixed(2);
      newvalue = parseFloat(d).toFixed(2);
      maxheightnewvalue =
        this.largeHeight /
        ((this.options.zoomWindowHeight / this.nzHeight) * this.nzHeight);
      maxwidthtnewvalue =
        this.largeWidth /
        ((this.options.zoomWindowWidth / this.nzWidth) * this.nzWidth);
      "inner" != this.options.zoomType &&
        (maxheightnewvalue <= newvalue
          ? ((this.heightRatio =
              this.largeHeight / maxheightnewvalue / this.nzHeight),
            (this.newvalueheight = maxheightnewvalue),
            (this.fullheight = !0))
          : ((this.heightRatio = this.largeHeight / newvalue / this.nzHeight),
            (this.newvalueheight = newvalue),
            (this.fullheight = !1)),
        maxwidthtnewvalue <= newvalue
          ? ((this.widthRatio =
              this.largeWidth / maxwidthtnewvalue / this.nzWidth),
            (this.newvaluewidth = maxwidthtnewvalue),
            (this.fullwidth = !0))
          : ((this.widthRatio = this.largeWidth / newvalue / this.nzWidth),
            (this.newvaluewidth = newvalue),
            (this.fullwidth = !1)),
        "lens" == this.options.zoomType &&
          (maxheightnewvalue <= newvalue
            ? ((this.fullwidth = !0), (this.newvaluewidth = maxheightnewvalue))
            : ((this.widthRatio = this.largeWidth / newvalue / this.nzWidth),
              (this.newvaluewidth = newvalue),
              (this.fullwidth = !1))));
      "inner" == this.options.zoomType &&
        ((maxheightnewvalue = parseFloat(
          this.largeHeight / this.nzHeight
        ).toFixed(2)),
        (maxwidthtnewvalue = parseFloat(this.largeWidth / this.nzWidth).toFixed(
          2
        )),
        newvalue > maxheightnewvalue && (newvalue = maxheightnewvalue),
        newvalue > maxwidthtnewvalue && (newvalue = maxwidthtnewvalue),
        maxheightnewvalue <= newvalue
          ? ((this.heightRatio = this.largeHeight / newvalue / this.nzHeight),
            (this.newvalueheight =
              newvalue > maxheightnewvalue ? maxheightnewvalue : newvalue),
            (this.fullheight = !0))
          : ((this.heightRatio = this.largeHeight / newvalue / this.nzHeight),
            (this.newvalueheight =
              newvalue > maxheightnewvalue ? maxheightnewvalue : newvalue),
            (this.fullheight = !1)),
        maxwidthtnewvalue <= newvalue
          ? ((this.widthRatio = this.largeWidth / newvalue / this.nzWidth),
            (this.newvaluewidth =
              newvalue > maxwidthtnewvalue ? maxwidthtnewvalue : newvalue),
            (this.fullwidth = !0))
          : ((this.widthRatio = this.largeWidth / newvalue / this.nzWidth),
            (this.newvaluewidth = newvalue),
            (this.fullwidth = !1)));
      scrcontinue = !1;
      "inner" == this.options.zoomType &&
        (this.nzWidth > this.nzHeight &&
          (this.newvaluewidth <= maxwidthtnewvalue
            ? (scrcontinue = !0)
            : ((scrcontinue = !1), (this.fullwidth = this.fullheight = !0))),
        this.nzHeight > this.nzWidth &&
          (this.newvaluewidth <= maxwidthtnewvalue
            ? (scrcontinue = !0)
            : ((scrcontinue = !1), (this.fullwidth = this.fullheight = !0))));
      "inner" != this.options.zoomType && (scrcontinue = !0);
      scrcontinue &&
        ((this.zoomLock = 0),
        (this.changeZoom = !0),
        this.options.zoomWindowHeight / this.heightRatio <= this.nzHeight &&
          ((this.currentZoomLevel = this.newvalueheight),
          "lens" != this.options.zoomType &&
            "inner" != this.options.zoomType &&
            ((this.changeBgSize = !0),
            this.zoomLens.css({
              height:
                String(this.options.zoomWindowHeight / this.heightRatio) + "px",
            })),
          "lens" == this.options.zoomType ||
            "inner" == this.options.zoomType) &&
          (this.changeBgSize = !0),
        this.options.zoomWindowWidth / this.widthRatio <= this.nzWidth &&
          ("inner" != this.options.zoomType &&
            this.newvaluewidth > this.newvalueheight &&
            (this.currentZoomLevel = this.newvaluewidth),
          "lens" != this.options.zoomType &&
            "inner" != this.options.zoomType &&
            ((this.changeBgSize = !0),
            this.zoomLens.css({
              width:
                String(this.options.zoomWindowWidth / this.widthRatio) + "px",
            })),
          "lens" == this.options.zoomType ||
            "inner" == this.options.zoomType) &&
          (this.changeBgSize = !0),
        "inner" == this.options.zoomType &&
          ((this.changeBgSize = !0),
          this.nzWidth > this.nzHeight &&
            (this.currentZoomLevel = this.newvaluewidth),
          this.nzHeight > this.nzWidth &&
            (this.currentZoomLevel = this.newvaluewidth)));
      this.setPosition(this.currentLoc);
    },
    closeAll: function () {
      self.zoomWindow && self.zoomWindow.hide();
      self.zoomLens && self.zoomLens.hide();
      self.zoomTint && self.zoomTint.hide();
    },
    changeState: function (d) {
      "enable" == d && (this.options.zoomEnabled = !0);
      "disable" == d && (this.options.zoomEnabled = !1);
    },
  };
  f.fn.elevateZoom = function (d) {
    return this.each(function () {
      var g = Object.create(c);
      g.init(d, this);
      f.data(this, "elevateZoom", g);
    });
  };
  f.fn.elevateZoom.options = {
    zoomActivation: "hover",
    zoomEnabled: !0,
    preloading: 1,
    zoomLevel: 1,
    scrollZoom: !1,
    scrollZoomIncrement: 0.1,
    minZoomLevel: !1,
    maxZoomLevel: !1,
    easing: !1,
    easingAmount: 12,
    lensSize: 200,
    zoomWindowWidth: 400,
    zoomWindowHeight: 400,
    zoomWindowOffetx: 0,
    zoomWindowOffety: 0,
    zoomWindowPosition: 1,
    zoomWindowBgColour: "#fff",
    lensFadeIn: !1,
    lensFadeOut: !1,
    debug: !1,
    zoomWindowFadeIn: !1,
    zoomWindowFadeOut: !1,
    zoomWindowAlwaysShow: !1,
    zoomTintFadeIn: !1,
    zoomTintFadeOut: !1,
    borderSize: 4,
    showLens: !0,
    borderColour: "#888",
    lensBorderSize: 1,
    lensBorderColour: "#000",
    lensShape: "square",
    zoomType: "window",
    containLensZoom: !1,
    lensColour: "white",
    lensOpacity: 0.4,
    lenszoom: !1,
    tint: !1,
    tintColour: "#333",
    tintOpacity: 0.4,
    gallery: !1,
    galleryActiveClass: "zoomGalleryActive",
    imageCrossfade: !1,
    constrainType: !1,
    constrainSize: !1,
    loadingIcon: !1,
    cursor: "default",
    responsive: !0,
    onComplete: f.noop,
    onZoomedImageLoaded: function () {},
    onImageSwap: f.noop,
    onImageSwapComplete: f.noop,
  };
})(jQuery, window, document);

/*------------------------------------------
 * 5. Youtube Player 
-------------------------------------------*/
/*! YU2FVL - jQuery Youtube Url To FullScreen Video Lightbox - v0.1.0 - 2016-02-07
 * http://otakod.es/yu2fvl
 * Copyright (c) 2016 darkylmnx; Licensed MIT */
!(function (y, q, z) {
  function k(a) {
    return /youtu\.be/.test(a)
      ? a.split("youtu.be/")[1].split("?")[0].split("&")[0].split("#")[0]
      : /youtube\.com\/v\//.test(a)
      ? a.split("youtube.com/v/")[1].split("?")[0].split("&")[0].split("#")[0]
      : /youtube\.com\/embed\//.test(a)
      ? a
          .split("youtube.com/embed/")[1]
          .split("?")[0]
          .split("&")[0]
          .split("#")[0]
      : /youtube.com|youtuberepeater.com|listenonrepeat.com/.test(a)
      ? a.split("v=")[1].split("&")[0].split("#")[0]
      : !1;
  }
  function h(c, f, d) {
    var a = JSON.stringify({ event: "command", func: f, args: d || [] });
    -1 !== c.src.indexOf("youtube.com/embed") &&
      c.contentWindow.postMessage(a, "*");
  }
  function g(u, n, d) {
    function t() {
      var f = w.width() - u.minPaddingX,
        o = w.height() - u.minPaddingY,
        e = f / o,
        C = u.ratio;
      e > C ? (c.height(o), c.width(o * C)) : (c.width(f), c.height(f / C)),
        c.css("left", (w.width() - c.width()) / 2),
        c.css("top", (w.height() - c.height()) / 2);
    }
    function a() {
      h(D[0], "playVideo"), p();
    }
    function p() {
      A.stop().fadeIn("fast"), c.stop().fadeIn("fast");
    }
    function l() {
      A.stop().fadeOut("fast"),
        c.stop().fadeOut("fast", function () {
          null === n && u.open && (A.remove(), c.remove());
        });
    }
    function E(e) {
      e.on("click", function (f) {
        f.preventDefault(), a();
      });
    }
    function B(e) {
      e.on("click", function (f) {
        f.preventDefault(), h(D[0], "pauseVideo"), l();
      });
    }
    var c = y(z.createElement("DIV")).addClass(u.cssClass).css(v),
      A = y(z.createElement("DIV"))
        .addClass(u.cssClass + u.overlayCssClass)
        .css(b),
      s = y(z.createElement("BUTTON"))
        .addClass(u.cssClass + u.closeCssClass)
        .html(u.closeText),
      D = y(z.createElement("IFRAME"))
        .addClass(u.cssClass + u.iframeCssClass)
        .attr({ src: j + d + r })
        .css(x);
    c.append(D).append(s),
      y("body").append(A).append(c),
      u.open &&
        D.on("load", function () {
          a();
        }),
      null !== n && E(n),
      B(s.add(A)),
      w.on("resize", t).trigger("resize");
  }
  var w = y(q),
    j = "https://www.youtube.com/embed/",
    r = "?enablejsapi=1",
    v = { display: "none", position: "fixed" },
    x = { width: "100%", height: "100%" },
    b = {
      display: "none",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },
    m = {
      minPaddingX: 50,
      minPaddingY: 50,
      ratio: 16 / 9,
      cssClass: "yu2fvl",
      overlayCssClass: "-overlay",
      iframeCssClass: "-iframe",
      closeCssClass: "-close",
      closeText: "X",
      open: !1,
      vid: !1,
    };
  (y.yu2fvl = function (c) {
    var a = y.extend({}, m, c);
    if (a.vid === !1) {
      throw "YOU MUST SET THE 'vid' option";
    }
    g(a, null, a.vid);
  }),
    (y.fn.yu2fvl = function (c) {
      function a() {
        var i = y(this),
          f = k(i.attr("href"));
        g(d, i, f);
      }
      var d = y.extend({}, m, c);
      return d.vid !== !1 ? (g(d, this, d.vid), this) : this.each(a);
    });
})(jQuery, window, document);

/*------------------------------------------
 * 6. Odometer 0.4.6
-------------------------------------------*/
(function () {
  var an,
    am,
    al,
    ak,
    aj,
    ai,
    ah,
    ag,
    af,
    ae,
    ad,
    ac,
    ab,
    aa,
    Z,
    Y,
    W,
    U,
    S,
    Q,
    O,
    M,
    K,
    J,
    I,
    H,
    X,
    V,
    T,
    R,
    P,
    N,
    L = [].slice;
  (W = '<span class="odometer-value"></span>'),
    (aa =
      '<span class="odometer-ribbon"><span class="odometer-ribbon-inner">' +
      W +
      "</span></span>"),
    (ak =
      '<span class="odometer-digit"><span class="odometer-digit-spacer">8</span><span class="odometer-digit-inner">' +
      aa +
      "</span></span>"),
    (ah = '<span class="odometer-formatting-mark"></span>'),
    (al = "(,ddd).dd"),
    (ag = /^\(?([^)]*)\)?(?:(.)(d+))?$/),
    (af = 30),
    (ai = 2000),
    (an = 20),
    (ae = 2),
    (aj = 0.5),
    (ad = 1000 / af),
    (am = 1000 / an),
    (Z =
      "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd"),
    (I = document.createElement("div").style),
    (Y =
      null != I.transition ||
      null != I.webkitTransition ||
      null != I.mozTransition ||
      null != I.oTransition),
    (K =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame),
    (ac =
      window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver),
    (S = function (d) {
      var c;
      return (
        (c = document.createElement("div")), (c.innerHTML = d), c.children[0]
      );
    }),
    (M = function (d, c) {
      return (d.className = d.className.replace(
        new RegExp("(^| )" + c.split(" ").join("|") + "( |$)", "gi"),
        " "
      ));
    }),
    (U = function (d, c) {
      return M(d, c), (d.className += " " + c);
    }),
    (H = function (e, d) {
      var f;
      return null != document.createEvent
        ? ((f = document.createEvent("HTMLEvents")),
          f.initEvent(d, !0, !0),
          e.dispatchEvent(f))
        : void 0;
    }),
    (O = function () {
      var d, c;
      return null !=
        (d =
          null != (c = window.performance)
            ? "function" == typeof c.now
              ? c.now()
              : void 0
            : void 0)
        ? d
        : +new Date();
    }),
    (J = function (d, c) {
      return (
        null == c && (c = 0),
        c
          ? ((d *= Math.pow(10, c)),
            (d += 0.5),
            (d = Math.floor(d)),
            (d /= Math.pow(10, c)))
          : Math.round(d)
      );
    }),
    (X = function (b) {
      return 0 > b ? Math.ceil(b) : Math.floor(b);
    }),
    (Q = function (b) {
      return b - J(b);
    }),
    (T = !1),
    (V = function () {
      var g, f, j, i, h;
      if (!T && null != window.jQuery) {
        for (
          T = !0, i = ["html", "text"], h = [], f = 0, j = i.length;
          j > f;
          f++
        ) {
          (g = i[f]),
            h.push(
              (function (d) {
                var c;
                return (
                  (c = window.jQuery.fn[d]),
                  (window.jQuery.fn[d] = function (b) {
                    var e;
                    return null == b ||
                      null == (null != (e = this[0]) ? e.odometer : void 0)
                      ? c.apply(this, arguments)
                      : this[0].odometer.update(b);
                  })
                );
              })(g)
            );
        }
        return h;
      }
    })(),
    setTimeout(V, 0),
    (ab = (function () {
      function b(z) {
        var y,
          x,
          w,
          v,
          u,
          t,
          s,
          r,
          k,
          j,
          f = this;
        if (
          ((this.options = z),
          (this.el = this.options.el),
          null != this.el.odometer)
        ) {
          return this.el.odometer;
        }
        (this.el.odometer = this), (r = b.options);
        for (x in r) {
          (v = r[x]), null == this.options[x] && (this.options[x] = v);
        }
        null == (u = this.options).duration && (u.duration = ai),
          (this.MAX_VALUES = (this.options.duration / ad / ae) | 0),
          this.resetFormat(),
          (this.value = this.cleanValue(
            null != (k = this.options.value) ? k : ""
          )),
          this.renderInside(),
          this.render();
        try {
          for (
            j = ["innerHTML", "innerText", "textContent"], t = 0, s = j.length;
            s > t;
            t++
          ) {
            (w = j[t]),
              null != this.el[w] &&
                !(function (c) {
                  return Object.defineProperty(f.el, c, {
                    get: function () {
                      var d;
                      return "innerHTML" === c
                        ? f.inside.outerHTML
                        : null != (d = f.inside.innerText)
                        ? d
                        : f.inside.textContent;
                    },
                    set: function (d) {
                      return f.update(d);
                    },
                  });
                })(w);
          }
        } catch (a) {
          (y = a), this.watchForMutations();
        }
      }
      return (
        (b.prototype.renderInside = function () {
          return (
            (this.inside = document.createElement("div")),
            (this.inside.className = "odometer-inside"),
            (this.el.innerHTML = ""),
            this.el.appendChild(this.inside)
          );
        }),
        (b.prototype.watchForMutations = function () {
          var e,
            d = this;
          if (null != ac) {
            try {
              return (
                null == this.observer &&
                  (this.observer = new ac(function () {
                    var c;
                    return (
                      (c = d.el.innerText),
                      d.renderInside(),
                      d.render(d.value),
                      d.update(c)
                    );
                  })),
                (this.watchMutations = !0),
                this.startWatchingMutations()
              );
            } catch (f) {
              e = f;
            }
          }
        }),
        (b.prototype.startWatchingMutations = function () {
          return this.watchMutations
            ? this.observer.observe(this.el, { childList: !0 })
            : void 0;
        }),
        (b.prototype.stopWatchingMutations = function () {
          var c;
          return null != (c = this.observer) ? c.disconnect() : void 0;
        }),
        (b.prototype.cleanValue = function (d) {
          var c;
          return (
            "string" == typeof d &&
              ((d = d.replace(
                null != (c = this.format.radix) ? c : ".",
                "<radix>"
              )),
              (d = d.replace(/[.,]/g, "")),
              (d = d.replace("<radix>", ".")),
              (d = parseFloat(d, 10) || 0)),
            J(d, this.format.precision)
          );
        }),
        (b.prototype.bindTransitionEnd = function () {
          var i,
            h,
            n,
            m,
            l,
            k,
            j = this;
          if (!this.transitionEndBound) {
            for (
              this.transitionEndBound = !0,
                h = !1,
                l = Z.split(" "),
                k = [],
                n = 0,
                m = l.length;
              m > n;
              n++
            ) {
              (i = l[n]),
                k.push(
                  this.el.addEventListener(
                    i,
                    function () {
                      return h
                        ? !0
                        : ((h = !0),
                          setTimeout(function () {
                            return (
                              j.render(), (h = !1), H(j.el, "odometerdone")
                            );
                          }, 0),
                          !0);
                    },
                    !1
                  )
                );
            }
            return k;
          }
        }),
        (b.prototype.resetFormat = function () {
          var h, c, p, o, n, m, l, k;
          if (
            ((h = null != (l = this.options.format) ? l : al),
            h || (h = "d"),
            (p = ag.exec(h)),
            !p)
          ) {
            throw new Error("Odometer: Unparsable digit format");
          }
          return (
            (k = p.slice(1, 4)),
            (m = k[0]),
            (n = k[1]),
            (c = k[2]),
            (o = (null != c ? c.length : void 0) || 0),
            (this.format = { repeating: m, radix: n, precision: o })
          );
        }),
        (b.prototype.render = function (z) {
          var y, x, w, v, u, t, s, r, q, p, o, n;
          for (
            null == z && (z = this.value),
              this.stopWatchingMutations(),
              this.resetFormat(),
              this.inside.innerHTML = "",
              t = this.options.theme,
              y = this.el.className.split(" "),
              u = [],
              r = 0,
              p = y.length;
            p > r;
            r++
          ) {
            (x = y[r]),
              x.length &&
                ((v = /^odometer-theme-(.+)$/.exec(x))
                  ? (t = v[1])
                  : /^odometer(-|$)/.test(x) || u.push(x));
          }
          for (
            u.push("odometer"),
              Y || u.push("odometer-no-transitions"),
              u.push(t ? "odometer-theme-" + t : "odometer-auto-theme"),
              this.el.className = u.join(" "),
              this.ribbons = {},
              this.digits = [],
              s = !this.format.precision || !Q(z) || !1,
              n = z.toString().split("").reverse(),
              q = 0,
              o = n.length;
            o > q;
            q++
          ) {
            (w = n[q]), "." === w && (s = !0), this.addDigit(w, s);
          }
          return this.startWatchingMutations();
        }),
        (b.prototype.update = function (e) {
          var d,
            f = this;
          return (
            (e = this.cleanValue(e)),
            (d = e - this.value)
              ? (M(
                  this.el,
                  "odometer-animating-up odometer-animating-down odometer-animating"
                ),
                d > 0
                  ? U(this.el, "odometer-animating-up")
                  : U(this.el, "odometer-animating-down"),
                this.stopWatchingMutations(),
                this.animate(e),
                this.startWatchingMutations(),
                setTimeout(function () {
                  return f.el.offsetHeight, U(f.el, "odometer-animating");
                }, 0),
                (this.value = e))
              : void 0
          );
        }),
        (b.prototype.renderDigit = function () {
          return S(ak);
        }),
        (b.prototype.insertDigit = function (d, c) {
          return null != c
            ? this.inside.insertBefore(d, c)
            : this.inside.children.length
            ? this.inside.insertBefore(d, this.inside.children[0])
            : this.inside.appendChild(d);
        }),
        (b.prototype.addSpacer = function (f, e, h) {
          var g;
          return (
            (g = S(ah)), (g.innerHTML = f), h && U(g, h), this.insertDigit(g, e)
          );
        }),
        (b.prototype.addDigit = function (h, g) {
          var l, k, j, i;
          if ((null == g && (g = !0), "-" === h)) {
            return this.addSpacer(h, null, "odometer-negation-mark");
          }
          if ("." === h) {
            return this.addSpacer(
              null != (i = this.format.radix) ? i : ".",
              null,
              "odometer-radix-mark"
            );
          }
          if (g) {
            for (j = !1; ; ) {
              if (!this.format.repeating.length) {
                if (j) {
                  throw new Error("Bad odometer format without digits");
                }
                this.resetFormat(), (j = !0);
              }
              if (
                ((l = this.format.repeating[this.format.repeating.length - 1]),
                (this.format.repeating = this.format.repeating.substring(
                  0,
                  this.format.repeating.length - 1
                )),
                "d" === l)
              ) {
                break;
              }
              this.addSpacer(l);
            }
          }
          return (
            (k = this.renderDigit()),
            (k.querySelector(".odometer-value").innerHTML = h),
            this.digits.push(k),
            this.insertDigit(k)
          );
        }),
        (b.prototype.animate = function (c) {
          return Y && "count" !== this.options.animation
            ? this.animateSlide(c)
            : this.animateCount(c);
        }),
        (b.prototype.animateCount = function (i) {
          var o,
            n,
            m,
            l,
            k,
            j = this;
          if ((n = +i - this.value)) {
            return (
              (l = m = O()),
              (o = this.value),
              (k = function () {
                var d, c, a;
                return O() - l > j.options.duration
                  ? ((j.value = i), j.render(), void H(j.el, "odometerdone"))
                  : ((d = O() - m),
                    d > am &&
                      ((m = O()),
                      (a = d / j.options.duration),
                      (c = n * a),
                      (o += c),
                      j.render(Math.round(o))),
                    null != K ? K(k) : setTimeout(k, am));
              })()
            );
          }
        }),
        (b.prototype.getDigitCount = function () {
          var h, g, l, k, j, i;
          for (
            k = 1 <= arguments.length ? L.call(arguments, 0) : [],
              h = j = 0,
              i = k.length;
            i > j;
            h = ++j
          ) {
            (l = k[h]), (k[h] = Math.abs(l));
          }
          return (
            (g = Math.max.apply(Math, k)),
            Math.ceil(Math.log(g + 1) / Math.log(10))
          );
        }),
        (b.prototype.getFractionalDigitCount = function () {
          var i, h, n, m, l, k, j;
          for (
            l = 1 <= arguments.length ? L.call(arguments, 0) : [],
              h = /^\-?\d*\.(\d*?)0*$/,
              i = k = 0,
              j = l.length;
            j > k;
            i = ++k
          ) {
            (m = l[i]),
              (l[i] = m.toString()),
              (n = h.exec(l[i])),
              (l[i] = null == n ? 0 : n[1].length);
          }
          return Math.max.apply(Math, l);
        }),
        (b.prototype.resetDigits = function () {
          return (
            (this.digits = []),
            (this.ribbons = []),
            (this.inside.innerHTML = ""),
            this.resetFormat()
          );
        }),
        (b.prototype.animateSlide = function (aL) {
          var aK,
            aJ,
            aI,
            aH,
            aG,
            aF,
            aE,
            aD,
            aC,
            aB,
            aA,
            az,
            ay,
            ax,
            aw,
            at,
            aq,
            ao,
            G,
            F,
            A,
            r,
            e,
            av,
            au,
            ar,
            ap;
          if (
            ((at = this.value),
            (aD = this.getFractionalDigitCount(at, aL)),
            aD && ((aL *= Math.pow(10, aD)), (at *= Math.pow(10, aD))),
            (aI = aL - at))
          ) {
            for (
              this.bindTransitionEnd(),
                aH = this.getDigitCount(at, aL),
                aG = [],
                aK = 0,
                aA = G = 0;
              aH >= 0 ? aH > G : G > aH;
              aA = aH >= 0 ? ++G : --G
            ) {
              if (
                ((aq = X(at / Math.pow(10, aH - aA - 1))),
                (aE = X(aL / Math.pow(10, aH - aA - 1))),
                (aF = aE - aq),
                Math.abs(aF) > this.MAX_VALUES)
              ) {
                for (
                  aB = [],
                    az = aF / (this.MAX_VALUES + this.MAX_VALUES * aK * aj),
                    aJ = aq;
                  (aF > 0 && aE > aJ) || (0 > aF && aJ > aE);

                ) {
                  aB.push(Math.round(aJ)), (aJ += az);
                }
                aB[aB.length - 1] !== aE && aB.push(aE), aK++;
              } else {
                aB = function () {
                  ap = [];
                  for (
                    var c = aq;
                    aE >= aq ? aE >= c : c >= aE;
                    aE >= aq ? c++ : c--
                  ) {
                    ap.push(c);
                  }
                  return ap;
                }.apply(this);
              }
              for (aA = F = 0, r = aB.length; r > F; aA = ++F) {
                (aC = aB[aA]), (aB[aA] = Math.abs(aC % 10));
              }
              aG.push(aB);
            }
            for (
              this.resetDigits(), ar = aG.reverse(), aA = A = 0, e = ar.length;
              e > A;
              aA = ++A
            ) {
              for (
                aB = ar[aA],
                  this.digits[aA] || this.addDigit(" ", aA >= aD),
                  null == (ao = this.ribbons)[aA] &&
                    (ao[aA] = this.digits[aA].querySelector(
                      ".odometer-ribbon-inner"
                    )),
                  this.ribbons[aA].innerHTML = "",
                  0 > aI && (aB = aB.reverse()),
                  ay = au = 0,
                  av = aB.length;
                av > au;
                ay = ++au
              ) {
                (aC = aB[ay]),
                  (aw = document.createElement("div")),
                  (aw.className = "odometer-value"),
                  (aw.innerHTML = aC),
                  this.ribbons[aA].appendChild(aw),
                  ay === aB.length - 1 && U(aw, "odometer-last-value"),
                  0 === ay && U(aw, "odometer-first-value");
              }
            }
            return (
              0 > aq && this.addDigit("-"),
              (ax = this.inside.querySelector(".odometer-radix-mark")),
              null != ax && ax.parent.removeChild(ax),
              aD
                ? this.addSpacer(
                    this.format.radix,
                    this.digits[aD - 1],
                    "odometer-radix-mark"
                  )
                : void 0
            );
          }
        }),
        b
      );
    })()),
    (ab.options = null != (P = window.odometerOptions) ? P : {}),
    setTimeout(function () {
      var g, f, j, i, h;
      if (window.odometerOptions) {
        (i = window.odometerOptions), (h = []);
        for (g in i) {
          (f = i[g]),
            h.push(
              null != (j = ab.options)[g] ? (j = ab.options)[g] : (j[g] = f)
            );
        }
        return h;
      }
    }, 0),
    (ab.init = function () {
      var h, g, l, k, j, i;
      if (null != document.querySelectorAll) {
        for (
          g = document.querySelectorAll(ab.options.selector || ".odometer"),
            i = [],
            l = 0,
            k = g.length;
          k > l;
          l++
        ) {
          (h = g[l]),
            i.push(
              (h.odometer = new ab({
                el: h,
                value: null != (j = h.innerText) ? j : h.textContent,
              }))
            );
        }
        return i;
      }
    }),
    null != (null != (N = document.documentElement) ? N.doScroll : void 0) &&
    null != document.createEventObject
      ? ((R = document.onreadystatechange),
        (document.onreadystatechange = function () {
          return (
            "complete" === document.readyState &&
              ab.options.auto !== !1 &&
              ab.init(),
            null != R ? R.apply(this, arguments) : void 0
          );
        }))
      : document.addEventListener(
          "DOMContentLoaded",
          function () {
            return ab.options.auto !== !1 ? ab.init() : void 0;
          },
          !1
        ),
    "function" == typeof define && define.amd
      ? define(["jquery"], function () {
          return ab;
        })
      : typeof exports === !1
      ? (module.exports = ab)
      : (window.Odometer = ab);
}).call(this);

/*------------------------------------------
 * 7. ScrollUp v2.4.1
-------------------------------------------*/
/*! Url: http://markgoodyear.com/labs/scrollup/
 * Copyright (c) Mark Goodyear â€�? @markgdyr â€�? http://markgoodyear.com
 * License: MIT
 */
!(function (a, c, b) {
  (a.fn.scrollUp = function (d) {
    a.data(b.body, "scrollUp") ||
      (a.data(b.body, "scrollUp", !0), a.fn.scrollUp.init(d));
  }),
    (a.fn.scrollUp.init = function (e) {
      var u,
        q,
        m,
        j,
        h,
        o,
        l,
        g = (a.fn.scrollUp.settings = a.extend({}, a.fn.scrollUp.defaults, e)),
        k = !1;
      switch (
        ((l = g.scrollTrigger
          ? a(g.scrollTrigger)
          : a("<a/>", { id: g.scrollName, href: "#top" })),
        g.scrollTitle && l.attr("title", g.scrollTitle),
        l.appendTo("body"),
        g.scrollImg || g.scrollTrigger || l.html(g.scrollText),
        l.css({ display: "none", position: "fixed", zIndex: g.zIndex }),
        g.activeOverlay &&
          a("<div/>", { id: g.scrollName + "-active" })
            .css({
              position: "absolute",
              top: g.scrollDistance + "px",
              width: "100%",
              borderTop: "1px dotted" + g.activeOverlay,
              zIndex: g.zIndex,
            })
            .appendTo("body"),
        g.animation)
      ) {
        case "fade":
          (u = "fadeIn"), (q = "fadeOut"), (m = g.animationSpeed);
          break;
        case "slide":
          (u = "slideDown"), (q = "slideUp"), (m = g.animationSpeed);
          break;
        default:
          (u = "show"), (q = "hide"), (m = 0);
      }
      (j =
        "top" === g.scrollFrom
          ? g.scrollDistance
          : a(b).height() - a(c).height() - g.scrollDistance),
        (h = a(c).scroll(function () {
          a(c).scrollTop() > j
            ? k || (l[u](m), (k = !0))
            : k && (l[q](m), (k = !1));
        })),
        g.scrollTarget
          ? "number" == typeof g.scrollTarget
            ? (o = g.scrollTarget)
            : "string" == typeof g.scrollTarget &&
              (o = Math.floor(a(g.scrollTarget).offset().top))
          : (o = 0),
        l.click(function (d) {
          d.preventDefault(),
            a("html, body").animate(
              { scrollTop: o },
              g.scrollSpeed,
              g.easingType
            );
        });
    }),
    (a.fn.scrollUp.defaults = {
      scrollName: "scrollUp",
      scrollDistance: 300,
      scrollFrom: "top",
      scrollSpeed: 300,
      easingType: "linear",
      animation: "fade",
      animationSpeed: 200,
      scrollTrigger: !1,
      scrollTarget: !1,
      scrollText: "Scroll to top",
      scrollTitle: !1,
      scrollImg: !1,
      activeOverlay: !1,
      zIndex: 2147483647,
    }),
    (a.fn.scrollUp.destroy = function (d) {
      a.removeData(b.body, "scrollUp"),
        a("#" + a.fn.scrollUp.settings.scrollName).remove(),
        a("#" + a.fn.scrollUp.settings.scrollName + "-active").remove(),
        a.fn.jquery.split(".")[1] >= 7
          ? a(c).off("scroll", d)
          : a(c).unbind("scroll", d);
    }),
    (a.scrollUp = a.fn.scrollUp);
})(jQuery, window, document);

/*------------------------------------------
 * 8. Countdown Js
-------------------------------------------*/
/* AMD support (Thanks to @FagnerMartinsBrack) */
(function (a) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], a);
  } else {
    a(jQuery);
  }
})(function (g) {
  var b = [],
    e = [],
    f = { precision: 100, elapse: false };
  e.push(/^[0-9]*$/.source);
  e.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source);
  e.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source);
  e = new RegExp(e.join("|"));
  function d(k) {
    if (k instanceof Date) {
      return k;
    }
    if (String(k).match(e)) {
      if (String(k).match(/^[0-9]*$/)) {
        k = Number(k);
      }
      if (String(k).match(/\-/)) {
        k = String(k).replace(/\-/g, "/");
      }
      return new Date(k);
    } else {
      throw new Error("Couldn't cast `" + k + "` to a date object.");
    }
  }
  var c = {
    Y: "years",
    m: "months",
    n: "daysToMonth",
    w: "weeks",
    d: "daysToWeek",
    D: "totalDays",
    H: "hours",
    M: "minutes",
    S: "seconds",
  };
  function i(l) {
    var k = l.toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    return new RegExp(k);
  }
  function h(k) {
    return function (t) {
      var m = t.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
      if (m) {
        for (var n = 0, o = m.length; n < o; ++n) {
          var q = m[n].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),
            p = i(q[0]),
            l = q[1] || "",
            r = q[3] || "",
            s = null;
          q = q[2];
          if (c.hasOwnProperty(q)) {
            s = c[q];
            s = Number(k[s]);
          }
          if (s !== null) {
            if (l === "!") {
              s = j(r, s);
            }
            if (l === "") {
              if (s < 10) {
                s = "0" + s.toString();
              }
            }
            t = t.replace(p, s.toString());
          }
        }
      }
      t = t.replace(/%%/, "%");
      return t;
    };
  }
  function j(n, m) {
    var k = "s",
      l = "";
    if (n) {
      n = n.replace(/(:|;|\s)/gi, "").split(/\,/);
      if (n.length === 1) {
        k = n[0];
      } else {
        l = n[0];
        k = n[1];
      }
    }
    if (Math.abs(m) === 1) {
      return l;
    } else {
      return k;
    }
  }
  var a = function (l, m, k) {
    this.el = l;
    this.$el = g(l);
    this.interval = null;
    this.offset = {};
    this.options = g.extend({}, f);
    this.instanceNumber = b.length;
    b.push(this);
    this.$el.data("countdown-instance", this.instanceNumber);
    if (k) {
      if (typeof k === "function") {
        this.$el.on("update.countdown", k);
        this.$el.on("stoped.countdown", k);
        this.$el.on("finish.countdown", k);
      } else {
        this.options = g.extend({}, f, k);
      }
    }
    this.setFinalDate(m);
    this.start();
  };
  g.extend(a.prototype, {
    start: function () {
      if (this.interval !== null) {
        clearInterval(this.interval);
      }
      var k = this;
      this.update();
      this.interval = setInterval(function () {
        k.update.call(k);
      }, this.options.precision);
    },
    stop: function () {
      clearInterval(this.interval);
      this.interval = null;
      this.dispatchEvent("stoped");
    },
    toggle: function () {
      if (this.interval) {
        this.stop();
      } else {
        this.start();
      }
    },
    pause: function () {
      this.stop();
    },
    resume: function () {
      this.start();
    },
    remove: function () {
      this.stop.call(this);
      b[this.instanceNumber] = null;
      delete this.$el.data().countdownInstance;
    },
    setFinalDate: function (k) {
      this.finalDate = d(k);
    },
    update: function () {
      if (this.$el.closest("html").length === 0) {
        this.remove();
        return;
      }
      var l = g._data(this.el, "events") !== undefined,
        m = new Date(),
        k;
      k = this.finalDate.getTime() - m.getTime();
      k = Math.ceil(k / 1000);
      k = !this.options.elapse && k < 0 ? 0 : Math.abs(k);
      if (this.totalSecsLeft === k || !l) {
        return;
      } else {
        this.totalSecsLeft = k;
      }
      this.elapsed = m >= this.finalDate;
      this.offset = {
        seconds: this.totalSecsLeft % 60,
        minutes: Math.floor(this.totalSecsLeft / 60) % 60,
        hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
        days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
        daysToWeek: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
        daysToMonth: Math.floor((this.totalSecsLeft / 60 / 60 / 24) % 30.4368),
        totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
        weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
        months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30.4368),
        years: Math.abs(this.finalDate.getFullYear() - m.getFullYear()),
      };
      if (!this.options.elapse && this.totalSecsLeft === 0) {
        this.stop();
        this.dispatchEvent("finish");
      } else {
        this.dispatchEvent("update");
      }
    },
    dispatchEvent: function (k) {
      var l = g.Event(k + ".countdown");
      l.finalDate = this.finalDate;
      l.elapsed = this.elapsed;
      l.offset = g.extend({}, this.offset);
      l.strftime = h(this.offset);
      this.$el.trigger(l);
    },
  });
  g.fn.countdown = function () {
    var k = Array.prototype.slice.call(arguments, 0);
    return this.each(function () {
      var m = g(this).data("countdown-instance");
      if (m !== undefined) {
        var l = b[m],
          n = k[0];
        if (a.prototype.hasOwnProperty(n)) {
          l[n].apply(l, k.slice(1));
        } else {
          if (String(n).match(/^[$A-Z_][0-9A-Z_$]*$/i) === null) {
            l.setFinalDate.call(l, n);
            l.start();
          } else {
            g.error(
              "Method %s does not exist on jQuery.countdown".replace(/\%s/gi, n)
            );
          }
        }
      } else {
        new a(this, k[0], k[1]);
      }
    });
  };
});

/*------------------------------------------
  9. jQuery UI - v1.11.4 - 2015-12-02 
-------------------------------------------*/
(function (e) {
  "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery);
})(function (e) {
  function t(t, s) {
    var n,
      a,
      o,
      r = t.nodeName.toLowerCase();
    return "area" === r
      ? ((n = t.parentNode),
        (a = n.name),
        t.href && a && "map" === n.nodeName.toLowerCase()
          ? ((o = e("img[usemap='#" + a + "']")[0]), !!o && i(o))
          : !1)
      : (/^(input|select|textarea|button|object)$/.test(r)
          ? !t.disabled
          : "a" === r
          ? t.href || s
          : s) && i(t);
  }
  function i(t) {
    return (
      e.expr.filters.visible(t) &&
      !e(t)
        .parents()
        .addBack()
        .filter(function () {
          return "hidden" === e.css(this, "visibility");
        }).length
    );
  }
  (e.ui = e.ui || {}),
    e.extend(e.ui, {
      version: "1.11.4",
      keyCode: {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38,
      },
    }),
    e.fn.extend({
      scrollParent: function (t) {
        var i = this.css("position"),
          s = "absolute" === i,
          n = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
          a = this.parents()
            .filter(function () {
              var t = e(this);
              return s && "static" === t.css("position")
                ? !1
                : n.test(
                    t.css("overflow") +
                      t.css("overflow-y") +
                      t.css("overflow-x")
                  );
            })
            .eq(0);
        return "fixed" !== i && a.length
          ? a
          : e(this[0].ownerDocument || document);
      },
      uniqueId: (function () {
        var e = 0;
        return function () {
          return this.each(function () {
            this.id || (this.id = "ui-id-" + ++e);
          });
        };
      })(),
      removeUniqueId: function () {
        return this.each(function () {
          /^ui-id-\d+$/.test(this.id) && e(this).removeAttr("id");
        });
      },
    }),
    e.extend(e.expr[":"], {
      data: e.expr.createPseudo
        ? e.expr.createPseudo(function (t) {
            return function (i) {
              return !!e.data(i, t);
            };
          })
        : function (t, i, s) {
            return !!e.data(t, s[3]);
          },
      focusable: function (i) {
        return t(i, !isNaN(e.attr(i, "tabindex")));
      },
      tabbable: function (i) {
        var s = e.attr(i, "tabindex"),
          n = isNaN(s);
        return (n || s >= 0) && t(i, !n);
      },
    }),
    e("<a>").outerWidth(1).jquery ||
      e.each(["Width", "Height"], function (t, i) {
        function s(t, i, s, a) {
          return (
            e.each(n, function () {
              (i -= parseFloat(e.css(t, "padding" + this)) || 0),
                s &&
                  (i -= parseFloat(e.css(t, "border" + this + "Width")) || 0),
                a && (i -= parseFloat(e.css(t, "margin" + this)) || 0);
            }),
            i
          );
        }
        var n = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
          a = i.toLowerCase(),
          o = {
            innerWidth: e.fn.innerWidth,
            innerHeight: e.fn.innerHeight,
            outerWidth: e.fn.outerWidth,
            outerHeight: e.fn.outerHeight,
          };
        (e.fn["inner" + i] = function (t) {
          return void 0 === t
            ? o["inner" + i].call(this)
            : this.each(function () {
                e(this).css(a, s(this, t) + "px");
              });
        }),
          (e.fn["outer" + i] = function (t, n) {
            return "number" != typeof t
              ? o["outer" + i].call(this, t)
              : this.each(function () {
                  e(this).css(a, s(this, t, !0, n) + "px");
                });
          });
      }),
    e.fn.addBack ||
      (e.fn.addBack = function (e) {
        return this.add(
          null == e ? this.prevObject : this.prevObject.filter(e)
        );
      }),
    e("<a>").data("a-b", "a").removeData("a-b").data("a-b") &&
      (e.fn.removeData = (function (t) {
        return function (i) {
          return arguments.length ? t.call(this, e.camelCase(i)) : t.call(this);
        };
      })(e.fn.removeData)),
    (e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase())),
    e.fn.extend({
      focus: (function (t) {
        return function (i, s) {
          return "number" == typeof i
            ? this.each(function () {
                var t = this;
                setTimeout(function () {
                  e(t).focus(), s && s.call(t);
                }, i);
              })
            : t.apply(this, arguments);
        };
      })(e.fn.focus),
      disableSelection: (function () {
        var e =
          "onselectstart" in document.createElement("div")
            ? "selectstart"
            : "mousedown";
        return function () {
          return this.bind(e + ".ui-disableSelection", function (e) {
            e.preventDefault();
          });
        };
      })(),
      enableSelection: function () {
        return this.unbind(".ui-disableSelection");
      },
      zIndex: function (t) {
        if (void 0 !== t) return this.css("zIndex", t);
        if (this.length)
          for (var i, s, n = e(this[0]); n.length && n[0] !== document; ) {
            if (
              ((i = n.css("position")),
              ("absolute" === i || "relative" === i || "fixed" === i) &&
                ((s = parseInt(n.css("zIndex"), 10)), !isNaN(s) && 0 !== s))
            )
              return s;
            n = n.parent();
          }
        return 0;
      },
    }),
    (e.ui.plugin = {
      add: function (t, i, s) {
        var n,
          a = e.ui[t].prototype;
        for (n in s)
          (a.plugins[n] = a.plugins[n] || []), a.plugins[n].push([i, s[n]]);
      },
      call: function (e, t, i, s) {
        var n,
          a = e.plugins[t];
        if (
          a &&
          (s ||
            (e.element[0].parentNode &&
              11 !== e.element[0].parentNode.nodeType))
        )
          for (n = 0; a.length > n; n++)
            e.options[a[n][0]] && a[n][1].apply(e.element, i);
      },
    });
  var s = 0,
    n = Array.prototype.slice;
  (e.cleanData = (function (t) {
    return function (i) {
      var s, n, a;
      for (a = 0; null != (n = i[a]); a++)
        try {
          (s = e._data(n, "events")),
            s && s.remove && e(n).triggerHandler("remove");
        } catch (o) {}
      t(i);
    };
  })(e.cleanData)),
    (e.widget = function (t, i, s) {
      var n,
        a,
        o,
        r,
        h = {},
        l = t.split(".")[0];
      return (
        (t = t.split(".")[1]),
        (n = l + "-" + t),
        s || ((s = i), (i = e.Widget)),
        (e.expr[":"][n.toLowerCase()] = function (t) {
          return !!e.data(t, n);
        }),
        (e[l] = e[l] || {}),
        (a = e[l][t]),
        (o = e[l][t] =
          function (e, t) {
            return this._createWidget
              ? (arguments.length && this._createWidget(e, t), void 0)
              : new o(e, t);
          }),
        e.extend(o, a, {
          version: s.version,
          _proto: e.extend({}, s),
          _childConstructors: [],
        }),
        (r = new i()),
        (r.options = e.widget.extend({}, r.options)),
        e.each(s, function (t, s) {
          return e.isFunction(s)
            ? ((h[t] = (function () {
                var e = function () {
                    return i.prototype[t].apply(this, arguments);
                  },
                  n = function (e) {
                    return i.prototype[t].apply(this, e);
                  };
                return function () {
                  var t,
                    i = this._super,
                    a = this._superApply;
                  return (
                    (this._super = e),
                    (this._superApply = n),
                    (t = s.apply(this, arguments)),
                    (this._super = i),
                    (this._superApply = a),
                    t
                  );
                };
              })()),
              void 0)
            : ((h[t] = s), void 0);
        }),
        (o.prototype = e.widget.extend(
          r,
          { widgetEventPrefix: a ? r.widgetEventPrefix || t : t },
          h,
          { constructor: o, namespace: l, widgetName: t, widgetFullName: n }
        )),
        a
          ? (e.each(a._childConstructors, function (t, i) {
              var s = i.prototype;
              e.widget(s.namespace + "." + s.widgetName, o, i._proto);
            }),
            delete a._childConstructors)
          : i._childConstructors.push(o),
        e.widget.bridge(t, o),
        o
      );
    }),
    (e.widget.extend = function (t) {
      for (var i, s, a = n.call(arguments, 1), o = 0, r = a.length; r > o; o++)
        for (i in a[o])
          (s = a[o][i]),
            a[o].hasOwnProperty(i) &&
              void 0 !== s &&
              (t[i] = e.isPlainObject(s)
                ? e.isPlainObject(t[i])
                  ? e.widget.extend({}, t[i], s)
                  : e.widget.extend({}, s)
                : s);
      return t;
    }),
    (e.widget.bridge = function (t, i) {
      var s = i.prototype.widgetFullName || t;
      e.fn[t] = function (a) {
        var o = "string" == typeof a,
          r = n.call(arguments, 1),
          h = this;
        return (
          o
            ? this.each(function () {
                var i,
                  n = e.data(this, s);
                return "instance" === a
                  ? ((h = n), !1)
                  : n
                  ? e.isFunction(n[a]) && "_" !== a.charAt(0)
                    ? ((i = n[a].apply(n, r)),
                      i !== n && void 0 !== i
                        ? ((h = i && i.jquery ? h.pushStack(i.get()) : i), !1)
                        : void 0)
                    : e.error(
                        "no such method '" +
                          a +
                          "' for " +
                          t +
                          " widget instance"
                      )
                  : e.error(
                      "cannot call methods on " +
                        t +
                        " prior to initialization; " +
                        "attempted to call method '" +
                        a +
                        "'"
                    );
              })
            : (r.length && (a = e.widget.extend.apply(null, [a].concat(r))),
              this.each(function () {
                var t = e.data(this, s);
                t
                  ? (t.option(a || {}), t._init && t._init())
                  : e.data(this, s, new i(a, this));
              })),
          h
        );
      };
    }),
    (e.Widget = function () {}),
    (e.Widget._childConstructors = []),
    (e.Widget.prototype = {
      widgetName: "widget",
      widgetEventPrefix: "",
      defaultElement: "<div>",
      options: { disabled: !1, create: null },
      _createWidget: function (t, i) {
        (i = e(i || this.defaultElement || this)[0]),
          (this.element = e(i)),
          (this.uuid = s++),
          (this.eventNamespace = "." + this.widgetName + this.uuid),
          (this.bindings = e()),
          (this.hoverable = e()),
          (this.focusable = e()),
          i !== this &&
            (e.data(i, this.widgetFullName, this),
            this._on(!0, this.element, {
              remove: function (e) {
                e.target === i && this.destroy();
              },
            }),
            (this.document = e(i.style ? i.ownerDocument : i.document || i)),
            (this.window = e(
              this.document[0].defaultView || this.document[0].parentWindow
            ))),
          (this.options = e.widget.extend(
            {},
            this.options,
            this._getCreateOptions(),
            t
          )),
          this._create(),
          this._trigger("create", null, this._getCreateEventData()),
          this._init();
      },
      _getCreateOptions: e.noop,
      _getCreateEventData: e.noop,
      _create: e.noop,
      _init: e.noop,
      destroy: function () {
        this._destroy(),
          this.element
            .unbind(this.eventNamespace)
            .removeData(this.widgetFullName)
            .removeData(e.camelCase(this.widgetFullName)),
          this.widget()
            .unbind(this.eventNamespace)
            .removeAttr("aria-disabled")
            .removeClass(
              this.widgetFullName + "-disabled " + "ui-state-disabled"
            ),
          this.bindings.unbind(this.eventNamespace),
          this.hoverable.removeClass("ui-state-hover"),
          this.focusable.removeClass("ui-state-focus");
      },
      _destroy: e.noop,
      widget: function () {
        return this.element;
      },
      option: function (t, i) {
        var s,
          n,
          a,
          o = t;
        if (0 === arguments.length) return e.widget.extend({}, this.options);
        if ("string" == typeof t)
          if (((o = {}), (s = t.split(".")), (t = s.shift()), s.length)) {
            for (
              n = o[t] = e.widget.extend({}, this.options[t]), a = 0;
              s.length - 1 > a;
              a++
            )
              (n[s[a]] = n[s[a]] || {}), (n = n[s[a]]);
            if (((t = s.pop()), 1 === arguments.length))
              return void 0 === n[t] ? null : n[t];
            n[t] = i;
          } else {
            if (1 === arguments.length)
              return void 0 === this.options[t] ? null : this.options[t];
            o[t] = i;
          }
        return this._setOptions(o), this;
      },
      _setOptions: function (e) {
        var t;
        for (t in e) this._setOption(t, e[t]);
        return this;
      },
      _setOption: function (e, t) {
        return (
          (this.options[e] = t),
          "disabled" === e &&
            (this.widget().toggleClass(this.widgetFullName + "-disabled", !!t),
            t &&
              (this.hoverable.removeClass("ui-state-hover"),
              this.focusable.removeClass("ui-state-focus"))),
          this
        );
      },
      enable: function () {
        return this._setOptions({ disabled: !1 });
      },
      disable: function () {
        return this._setOptions({ disabled: !0 });
      },
      _on: function (t, i, s) {
        var n,
          a = this;
        "boolean" != typeof t && ((s = i), (i = t), (t = !1)),
          s
            ? ((i = n = e(i)), (this.bindings = this.bindings.add(i)))
            : ((s = i), (i = this.element), (n = this.widget())),
          e.each(s, function (s, o) {
            function r() {
              return t ||
                (a.options.disabled !== !0 &&
                  !e(this).hasClass("ui-state-disabled"))
                ? ("string" == typeof o ? a[o] : o).apply(a, arguments)
                : void 0;
            }
            "string" != typeof o &&
              (r.guid = o.guid = o.guid || r.guid || e.guid++);
            var h = s.match(/^([\w:-]*)\s*(.*)$/),
              l = h[1] + a.eventNamespace,
              u = h[2];
            u ? n.delegate(u, l, r) : i.bind(l, r);
          });
      },
      _off: function (t, i) {
        (i =
          (i || "").split(" ").join(this.eventNamespace + " ") +
          this.eventNamespace),
          t.unbind(i).undelegate(i),
          (this.bindings = e(this.bindings.not(t).get())),
          (this.focusable = e(this.focusable.not(t).get())),
          (this.hoverable = e(this.hoverable.not(t).get()));
      },
      _delay: function (e, t) {
        function i() {
          return ("string" == typeof e ? s[e] : e).apply(s, arguments);
        }
        var s = this;
        return setTimeout(i, t || 0);
      },
      _hoverable: function (t) {
        (this.hoverable = this.hoverable.add(t)),
          this._on(t, {
            mouseenter: function (t) {
              e(t.currentTarget).addClass("ui-state-hover");
            },
            mouseleave: function (t) {
              e(t.currentTarget).removeClass("ui-state-hover");
            },
          });
      },
      _focusable: function (t) {
        (this.focusable = this.focusable.add(t)),
          this._on(t, {
            focusin: function (t) {
              e(t.currentTarget).addClass("ui-state-focus");
            },
            focusout: function (t) {
              e(t.currentTarget).removeClass("ui-state-focus");
            },
          });
      },
      _trigger: function (t, i, s) {
        var n,
          a,
          o = this.options[t];
        if (
          ((s = s || {}),
          (i = e.Event(i)),
          (i.type = (
            t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t
          ).toLowerCase()),
          (i.target = this.element[0]),
          (a = i.originalEvent))
        )
          for (n in a) n in i || (i[n] = a[n]);
        return (
          this.element.trigger(i, s),
          !(
            (e.isFunction(o) &&
              o.apply(this.element[0], [i].concat(s)) === !1) ||
            i.isDefaultPrevented()
          )
        );
      },
    }),
    e.each({ show: "fadeIn", hide: "fadeOut" }, function (t, i) {
      e.Widget.prototype["_" + t] = function (s, n, a) {
        "string" == typeof n && (n = { effect: n });
        var o,
          r = n ? (n === !0 || "number" == typeof n ? i : n.effect || i) : t;
        (n = n || {}),
          "number" == typeof n && (n = { duration: n }),
          (o = !e.isEmptyObject(n)),
          (n.complete = a),
          n.delay && s.delay(n.delay),
          o && e.effects && e.effects.effect[r]
            ? s[t](n)
            : r !== t && s[r]
            ? s[r](n.duration, n.easing, a)
            : s.queue(function (i) {
                e(this)[t](), a && a.call(s[0]), i();
              });
      };
    }),
    e.widget;
  var a = !1;
  e(document).mouseup(function () {
    a = !1;
  }),
    e.widget("ui.mouse", {
      version: "1.11.4",
      options: {
        cancel: "input,textarea,button,select,option",
        distance: 1,
        delay: 0,
      },
      _mouseInit: function () {
        var t = this;
        this.element
          .bind("mousedown." + this.widgetName, function (e) {
            return t._mouseDown(e);
          })
          .bind("click." + this.widgetName, function (i) {
            return !0 === e.data(i.target, t.widgetName + ".preventClickEvent")
              ? (e.removeData(i.target, t.widgetName + ".preventClickEvent"),
                i.stopImmediatePropagation(),
                !1)
              : void 0;
          }),
          (this.started = !1);
      },
      _mouseDestroy: function () {
        this.element.unbind("." + this.widgetName),
          this._mouseMoveDelegate &&
            this.document
              .unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
              .unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
      },
      _mouseDown: function (t) {
        if (!a) {
          (this._mouseMoved = !1),
            this._mouseStarted && this._mouseUp(t),
            (this._mouseDownEvent = t);
          var i = this,
            s = 1 === t.which,
            n =
              "string" == typeof this.options.cancel && t.target.nodeName
                ? e(t.target).closest(this.options.cancel).length
                : !1;
          return s && !n && this._mouseCapture(t)
            ? ((this.mouseDelayMet = !this.options.delay),
              this.mouseDelayMet ||
                (this._mouseDelayTimer = setTimeout(function () {
                  i.mouseDelayMet = !0;
                }, this.options.delay)),
              this._mouseDistanceMet(t) &&
              this._mouseDelayMet(t) &&
              ((this._mouseStarted = this._mouseStart(t) !== !1),
              !this._mouseStarted)
                ? (t.preventDefault(), !0)
                : (!0 ===
                    e.data(t.target, this.widgetName + ".preventClickEvent") &&
                    e.removeData(
                      t.target,
                      this.widgetName + ".preventClickEvent"
                    ),
                  (this._mouseMoveDelegate = function (e) {
                    return i._mouseMove(e);
                  }),
                  (this._mouseUpDelegate = function (e) {
                    return i._mouseUp(e);
                  }),
                  this.document
                    .bind(
                      "mousemove." + this.widgetName,
                      this._mouseMoveDelegate
                    )
                    .bind("mouseup." + this.widgetName, this._mouseUpDelegate),
                  t.preventDefault(),
                  (a = !0),
                  !0))
            : !0;
        }
      },
      _mouseMove: function (t) {
        if (this._mouseMoved) {
          if (
            e.ui.ie &&
            (!document.documentMode || 9 > document.documentMode) &&
            !t.button
          )
            return this._mouseUp(t);
          if (!t.which) return this._mouseUp(t);
        }
        return (
          (t.which || t.button) && (this._mouseMoved = !0),
          this._mouseStarted
            ? (this._mouseDrag(t), t.preventDefault())
            : (this._mouseDistanceMet(t) &&
                this._mouseDelayMet(t) &&
                ((this._mouseStarted =
                  this._mouseStart(this._mouseDownEvent, t) !== !1),
                this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)),
              !this._mouseStarted)
        );
      },
      _mouseUp: function (t) {
        return (
          this.document
            .unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
            .unbind("mouseup." + this.widgetName, this._mouseUpDelegate),
          this._mouseStarted &&
            ((this._mouseStarted = !1),
            t.target === this._mouseDownEvent.target &&
              e.data(t.target, this.widgetName + ".preventClickEvent", !0),
            this._mouseStop(t)),
          (a = !1),
          !1
        );
      },
      _mouseDistanceMet: function (e) {
        return (
          Math.max(
            Math.abs(this._mouseDownEvent.pageX - e.pageX),
            Math.abs(this._mouseDownEvent.pageY - e.pageY)
          ) >= this.options.distance
        );
      },
      _mouseDelayMet: function () {
        return this.mouseDelayMet;
      },
      _mouseStart: function () {},
      _mouseDrag: function () {},
      _mouseStop: function () {},
      _mouseCapture: function () {
        return !0;
      },
    }),
    e.widget("ui.slider", e.ui.mouse, {
      version: "1.11.4",
      widgetEventPrefix: "slide",
      options: {
        animate: !1,
        distance: 0,
        max: 100,
        min: 0,
        orientation: "horizontal",
        range: !1,
        step: 1,
        value: 0,
        values: null,
        change: null,
        slide: null,
        start: null,
        stop: null,
      },
      numPages: 5,
      _create: function () {
        (this._keySliding = !1),
          (this._mouseSliding = !1),
          (this._animateOff = !0),
          (this._handleIndex = null),
          this._detectOrientation(),
          this._mouseInit(),
          this._calculateNewMax(),
          this.element.addClass(
            "ui-slider ui-slider-" +
              this.orientation +
              " ui-widget" +
              " ui-widget-content" +
              " ui-corner-all"
          ),
          this._refresh(),
          this._setOption("disabled", this.options.disabled),
          (this._animateOff = !1);
      },
      _refresh: function () {
        this._createRange(),
          this._createHandles(),
          this._setupEvents(),
          this._refreshValue();
      },
      _createHandles: function () {
        var t,
          i,
          s = this.options,
          n = this.element
            .find(".ui-slider-handle")
            .addClass("ui-state-default ui-corner-all"),
          a =
            "<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",
          o = [];
        for (
          i = (s.values && s.values.length) || 1,
            n.length > i && (n.slice(i).remove(), (n = n.slice(0, i))),
            t = n.length;
          i > t;
          t++
        )
          o.push(a);
        (this.handles = n.add(e(o.join("")).appendTo(this.element))),
          (this.handle = this.handles.eq(0)),
          this.handles.each(function (t) {
            e(this).data("ui-slider-handle-index", t);
          });
      },
      _createRange: function () {
        var t = this.options,
          i = "";
        t.range
          ? (t.range === !0 &&
              (t.values
                ? t.values.length && 2 !== t.values.length
                  ? (t.values = [t.values[0], t.values[0]])
                  : e.isArray(t.values) && (t.values = t.values.slice(0))
                : (t.values = [this._valueMin(), this._valueMin()])),
            this.range && this.range.length
              ? this.range
                  .removeClass("ui-slider-range-min ui-slider-range-max")
                  .css({ left: "", bottom: "" })
              : ((this.range = e("<div></div>").appendTo(this.element)),
                (i = "ui-slider-range ui-widget-header ui-corner-all")),
            this.range.addClass(
              i +
                ("min" === t.range || "max" === t.range
                  ? " ui-slider-range-" + t.range
                  : "")
            ))
          : (this.range && this.range.remove(), (this.range = null));
      },
      _setupEvents: function () {
        this._off(this.handles),
          this._on(this.handles, this._handleEvents),
          this._hoverable(this.handles),
          this._focusable(this.handles);
      },
      _destroy: function () {
        this.handles.remove(),
          this.range && this.range.remove(),
          this.element.removeClass(
            "ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"
          ),
          this._mouseDestroy();
      },
      _mouseCapture: function (t) {
        var i,
          s,
          n,
          a,
          o,
          r,
          h,
          l,
          u = this,
          d = this.options;
        return d.disabled
          ? !1
          : ((this.elementSize = {
              width: this.element.outerWidth(),
              height: this.element.outerHeight(),
            }),
            (this.elementOffset = this.element.offset()),
            (i = { x: t.pageX, y: t.pageY }),
            (s = this._normValueFromMouse(i)),
            (n = this._valueMax() - this._valueMin() + 1),
            this.handles.each(function (t) {
              var i = Math.abs(s - u.values(t));
              (n > i ||
                (n === i &&
                  (t === u._lastChangedValue || u.values(t) === d.min))) &&
                ((n = i), (a = e(this)), (o = t));
            }),
            (r = this._start(t, o)),
            r === !1
              ? !1
              : ((this._mouseSliding = !0),
                (this._handleIndex = o),
                a.addClass("ui-state-active").focus(),
                (h = a.offset()),
                (l = !e(t.target).parents().addBack().is(".ui-slider-handle")),
                (this._clickOffset = l
                  ? { left: 0, top: 0 }
                  : {
                      left: t.pageX - h.left - a.width() / 2,
                      top:
                        t.pageY -
                        h.top -
                        a.height() / 2 -
                        (parseInt(a.css("borderTopWidth"), 10) || 0) -
                        (parseInt(a.css("borderBottomWidth"), 10) || 0) +
                        (parseInt(a.css("marginTop"), 10) || 0),
                    }),
                this.handles.hasClass("ui-state-hover") || this._slide(t, o, s),
                (this._animateOff = !0),
                !0));
      },
      _mouseStart: function () {
        return !0;
      },
      _mouseDrag: function (e) {
        var t = { x: e.pageX, y: e.pageY },
          i = this._normValueFromMouse(t);
        return this._slide(e, this._handleIndex, i), !1;
      },
      _mouseStop: function (e) {
        return (
          this.handles.removeClass("ui-state-active"),
          (this._mouseSliding = !1),
          this._stop(e, this._handleIndex),
          this._change(e, this._handleIndex),
          (this._handleIndex = null),
          (this._clickOffset = null),
          (this._animateOff = !1),
          !1
        );
      },
      _detectOrientation: function () {
        this.orientation =
          "vertical" === this.options.orientation ? "vertical" : "horizontal";
      },
      _normValueFromMouse: function (e) {
        var t, i, s, n, a;
        return (
          "horizontal" === this.orientation
            ? ((t = this.elementSize.width),
              (i =
                e.x -
                this.elementOffset.left -
                (this._clickOffset ? this._clickOffset.left : 0)))
            : ((t = this.elementSize.height),
              (i =
                e.y -
                this.elementOffset.top -
                (this._clickOffset ? this._clickOffset.top : 0))),
          (s = i / t),
          s > 1 && (s = 1),
          0 > s && (s = 0),
          "vertical" === this.orientation && (s = 1 - s),
          (n = this._valueMax() - this._valueMin()),
          (a = this._valueMin() + s * n),
          this._trimAlignValue(a)
        );
      },
      _start: function (e, t) {
        var i = { handle: this.handles[t], value: this.value() };
        return (
          this.options.values &&
            this.options.values.length &&
            ((i.value = this.values(t)), (i.values = this.values())),
          this._trigger("start", e, i)
        );
      },
      _slide: function (e, t, i) {
        var s, n, a;
        this.options.values && this.options.values.length
          ? ((s = this.values(t ? 0 : 1)),
            2 === this.options.values.length &&
              this.options.range === !0 &&
              ((0 === t && i > s) || (1 === t && s > i)) &&
              (i = s),
            i !== this.values(t) &&
              ((n = this.values()),
              (n[t] = i),
              (a = this._trigger("slide", e, {
                handle: this.handles[t],
                value: i,
                values: n,
              })),
              (s = this.values(t ? 0 : 1)),
              a !== !1 && this.values(t, i)))
          : i !== this.value() &&
            ((a = this._trigger("slide", e, {
              handle: this.handles[t],
              value: i,
            })),
            a !== !1 && this.value(i));
      },
      _stop: function (e, t) {
        var i = { handle: this.handles[t], value: this.value() };
        this.options.values &&
          this.options.values.length &&
          ((i.value = this.values(t)), (i.values = this.values())),
          this._trigger("stop", e, i);
      },
      _change: function (e, t) {
        if (!this._keySliding && !this._mouseSliding) {
          var i = { handle: this.handles[t], value: this.value() };
          this.options.values &&
            this.options.values.length &&
            ((i.value = this.values(t)), (i.values = this.values())),
            (this._lastChangedValue = t),
            this._trigger("change", e, i);
        }
      },
      value: function (e) {
        return arguments.length
          ? ((this.options.value = this._trimAlignValue(e)),
            this._refreshValue(),
            this._change(null, 0),
            void 0)
          : this._value();
      },
      values: function (t, i) {
        var s, n, a;
        if (arguments.length > 1)
          return (
            (this.options.values[t] = this._trimAlignValue(i)),
            this._refreshValue(),
            this._change(null, t),
            void 0
          );
        if (!arguments.length) return this._values();
        if (!e.isArray(arguments[0]))
          return this.options.values && this.options.values.length
            ? this._values(t)
            : this.value();
        for (
          s = this.options.values, n = arguments[0], a = 0;
          s.length > a;
          a += 1
        )
          (s[a] = this._trimAlignValue(n[a])), this._change(null, a);
        this._refreshValue();
      },
      _setOption: function (t, i) {
        var s,
          n = 0;
        switch (
          ("range" === t &&
            this.options.range === !0 &&
            ("min" === i
              ? ((this.options.value = this._values(0)),
                (this.options.values = null))
              : "max" === i &&
                ((this.options.value = this._values(
                  this.options.values.length - 1
                )),
                (this.options.values = null))),
          e.isArray(this.options.values) && (n = this.options.values.length),
          "disabled" === t &&
            this.element.toggleClass("ui-state-disabled", !!i),
          this._super(t, i),
          t)
        ) {
          case "orientation":
            this._detectOrientation(),
              this.element
                .removeClass("ui-slider-horizontal ui-slider-vertical")
                .addClass("ui-slider-" + this.orientation),
              this._refreshValue(),
              this.handles.css("horizontal" === i ? "bottom" : "left", "");
            break;
          case "value":
            (this._animateOff = !0),
              this._refreshValue(),
              this._change(null, 0),
              (this._animateOff = !1);
            break;
          case "values":
            for (
              this._animateOff = !0, this._refreshValue(), s = 0;
              n > s;
              s += 1
            )
              this._change(null, s);
            this._animateOff = !1;
            break;
          case "step":
          case "min":
          case "max":
            (this._animateOff = !0),
              this._calculateNewMax(),
              this._refreshValue(),
              (this._animateOff = !1);
            break;
          case "range":
            (this._animateOff = !0), this._refresh(), (this._animateOff = !1);
        }
      },
      _value: function () {
        var e = this.options.value;
        return (e = this._trimAlignValue(e));
      },
      _values: function (e) {
        var t, i, s;
        if (arguments.length)
          return (t = this.options.values[e]), (t = this._trimAlignValue(t));
        if (this.options.values && this.options.values.length) {
          for (i = this.options.values.slice(), s = 0; i.length > s; s += 1)
            i[s] = this._trimAlignValue(i[s]);
          return i;
        }
        return [];
      },
      _trimAlignValue: function (e) {
        if (this._valueMin() >= e) return this._valueMin();
        if (e >= this._valueMax()) return this._valueMax();
        var t = this.options.step > 0 ? this.options.step : 1,
          i = (e - this._valueMin()) % t,
          s = e - i;
        return (
          2 * Math.abs(i) >= t && (s += i > 0 ? t : -t),
          parseFloat(s.toFixed(5))
        );
      },
      _calculateNewMax: function () {
        var e = this.options.max,
          t = this._valueMin(),
          i = this.options.step,
          s = Math.floor(+(e - t).toFixed(this._precision()) / i) * i;
        (e = s + t), (this.max = parseFloat(e.toFixed(this._precision())));
      },
      _precision: function () {
        var e = this._precisionOf(this.options.step);
        return (
          null !== this.options.min &&
            (e = Math.max(e, this._precisionOf(this.options.min))),
          e
        );
      },
      _precisionOf: function (e) {
        var t = "" + e,
          i = t.indexOf(".");
        return -1 === i ? 0 : t.length - i - 1;
      },
      _valueMin: function () {
        return this.options.min;
      },
      _valueMax: function () {
        return this.max;
      },
      _refreshValue: function () {
        var t,
          i,
          s,
          n,
          a,
          o = this.options.range,
          r = this.options,
          h = this,
          l = this._animateOff ? !1 : r.animate,
          u = {};
        this.options.values && this.options.values.length
          ? this.handles.each(function (s) {
              (i =
                100 *
                ((h.values(s) - h._valueMin()) /
                  (h._valueMax() - h._valueMin()))),
                (u["horizontal" === h.orientation ? "left" : "bottom"] =
                  i + "%"),
                e(this).stop(1, 1)[l ? "animate" : "css"](u, r.animate),
                h.options.range === !0 &&
                  ("horizontal" === h.orientation
                    ? (0 === s &&
                        h.range
                          .stop(1, 1)
                          [l ? "animate" : "css"]({ left: i + "%" }, r.animate),
                      1 === s &&
                        h.range[l ? "animate" : "css"](
                          { width: i - t + "%" },
                          { queue: !1, duration: r.animate }
                        ))
                    : (0 === s &&
                        h.range
                          .stop(1, 1)
                          [l ? "animate" : "css"](
                            { bottom: i + "%" },
                            r.animate
                          ),
                      1 === s &&
                        h.range[l ? "animate" : "css"](
                          { height: i - t + "%" },
                          { queue: !1, duration: r.animate }
                        ))),
                (t = i);
            })
          : ((s = this.value()),
            (n = this._valueMin()),
            (a = this._valueMax()),
            (i = a !== n ? 100 * ((s - n) / (a - n)) : 0),
            (u["horizontal" === this.orientation ? "left" : "bottom"] =
              i + "%"),
            this.handle.stop(1, 1)[l ? "animate" : "css"](u, r.animate),
            "min" === o &&
              "horizontal" === this.orientation &&
              this.range
                .stop(1, 1)
                [l ? "animate" : "css"]({ width: i + "%" }, r.animate),
            "max" === o &&
              "horizontal" === this.orientation &&
              this.range[l ? "animate" : "css"](
                { width: 100 - i + "%" },
                { queue: !1, duration: r.animate }
              ),
            "min" === o &&
              "vertical" === this.orientation &&
              this.range
                .stop(1, 1)
                [l ? "animate" : "css"]({ height: i + "%" }, r.animate),
            "max" === o &&
              "vertical" === this.orientation &&
              this.range[l ? "animate" : "css"](
                { height: 100 - i + "%" },
                { queue: !1, duration: r.animate }
              ));
      },
      _handleEvents: {
        keydown: function (t) {
          var i,
            s,
            n,
            a,
            o = e(t.target).data("ui-slider-handle-index");
          switch (t.keyCode) {
            case e.ui.keyCode.HOME:
            case e.ui.keyCode.END:
            case e.ui.keyCode.PAGE_UP:
            case e.ui.keyCode.PAGE_DOWN:
            case e.ui.keyCode.UP:
            case e.ui.keyCode.RIGHT:
            case e.ui.keyCode.DOWN:
            case e.ui.keyCode.LEFT:
              if (
                (t.preventDefault(),
                !this._keySliding &&
                  ((this._keySliding = !0),
                  e(t.target).addClass("ui-state-active"),
                  (i = this._start(t, o)),
                  i === !1))
              )
                return;
          }
          switch (
            ((a = this.options.step),
            (s = n =
              this.options.values && this.options.values.length
                ? this.values(o)
                : this.value()),
            t.keyCode)
          ) {
            case e.ui.keyCode.HOME:
              n = this._valueMin();
              break;
            case e.ui.keyCode.END:
              n = this._valueMax();
              break;
            case e.ui.keyCode.PAGE_UP:
              n = this._trimAlignValue(
                s + (this._valueMax() - this._valueMin()) / this.numPages
              );
              break;
            case e.ui.keyCode.PAGE_DOWN:
              n = this._trimAlignValue(
                s - (this._valueMax() - this._valueMin()) / this.numPages
              );
              break;
            case e.ui.keyCode.UP:
            case e.ui.keyCode.RIGHT:
              if (s === this._valueMax()) return;
              n = this._trimAlignValue(s + a);
              break;
            case e.ui.keyCode.DOWN:
            case e.ui.keyCode.LEFT:
              if (s === this._valueMin()) return;
              n = this._trimAlignValue(s - a);
          }
          this._slide(t, o, n);
        },
        keyup: function (t) {
          var i = e(t.target).data("ui-slider-handle-index");
          this._keySliding &&
            ((this._keySliding = !1),
            this._stop(t, i),
            this._change(t, i),
            e(t.target).removeClass("ui-state-active"));
        },
      },
    });
});

/*! jQuery UI Touch Punch 0.2.3
 * Copyright 2011â€"2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * Depends: jquery.ui.widget.js, jquery.ui.mouse.js */
!(function (a) {
  function f(a, b) {
    if (!(a.originalEvent.touches.length > 1)) {
      a.preventDefault();
      var c = a.originalEvent.changedTouches[0],
        d = document.createEvent("MouseEvents");
      d.initMouseEvent(
        b,
        !0,
        !0,
        window,
        1,
        c.screenX,
        c.screenY,
        c.clientX,
        c.clientY,
        !1,
        !1,
        !1,
        !1,
        0,
        null
      ),
        a.target.dispatchEvent(d);
    }
  }
  if (((a.support.touch = "ontouchend" in document), a.support.touch)) {
    var e,
      b = a.ui.mouse.prototype,
      c = b._mouseInit,
      d = b._mouseDestroy;
    (b._touchStart = function (a) {
      var b = this;
      !e &&
        b._mouseCapture(a.originalEvent.changedTouches[0]) &&
        ((e = !0),
        (b._touchMoved = !1),
        f(a, "mouseover"),
        f(a, "mousemove"),
        f(a, "mousedown"));
    }),
      (b._touchMove = function (a) {
        e && ((this._touchMoved = !0), f(a, "mousemove"));
      }),
      (b._touchEnd = function (a) {
        e &&
          (f(a, "mouseup"),
          f(a, "mouseout"),
          this._touchMoved || f(a, "click"),
          (e = !1));
      }),
      (b._mouseInit = function () {
        var b = this;
        b.element.bind({
          touchstart: a.proxy(b, "_touchStart"),
          touchmove: a.proxy(b, "_touchMove"),
          touchend: a.proxy(b, "_touchEnd"),
        }),
          c.call(b);
      }),
      (b._mouseDestroy = function () {
        var b = this;
        b.element.unbind({
          touchstart: a.proxy(b, "_touchStart"),
          touchmove: a.proxy(b, "_touchMove"),
          touchend: a.proxy(b, "_touchEnd"),
        }),
          d.call(b);
      });
  }
})(jQuery);

/*------------------------------------------
 * 10. lazysizes
-------------------------------------------*/
!(function () {
  function t(t, e) {
    return (e = { exports: {} }), t(e, e.exports), e.exports;
  }
  var e = t(function (t) {
      !(function (e, i) {
        var r = (function (t, e) {
          "use strict";
          if (e.getElementsByClassName) {
            var i,
              r,
              a = e.documentElement,
              n = t.Date,
              s = t.HTMLPictureElement,
              o = t.addEventListener,
              l = t.setTimeout,
              c = t.requestAnimationFrame || l,
              u = t.requestIdleCallback,
              d = /^picture$/i,
              f = ["load", "error", "lazyincluded", "_lazyloaded"],
              g = {},
              z = Array.prototype.forEach,
              y = function (t, e) {
                return (
                  g[e] || (g[e] = new RegExp("(\\s|^)" + e + "(\\s|$)")),
                  g[e].test(t.getAttribute("class") || "") && g[e]
                );
              },
              p = function (t, e) {
                y(t, e) ||
                  t.setAttribute(
                    "class",
                    (t.getAttribute("class") || "").trim() + " " + e
                  );
              },
              v = function (t, e) {
                var i;
                (i = y(t, e)) &&
                  t.setAttribute(
                    "class",
                    (t.getAttribute("class") || "").replace(i, " ")
                  );
              },
              m = function (t, e, i) {
                var r = i ? "addEventListener" : "removeEventListener";
                i && m(t, e),
                  f.forEach(function (i) {
                    t[r](i, e);
                  });
              },
              b = function (t, r, a, n, s) {
                var o = e.createEvent("CustomEvent");
                return (
                  a || (a = {}),
                  (a.instance = i),
                  o.initCustomEvent(r, !n, !s, a),
                  t.dispatchEvent(o),
                  o
                );
              },
              A = function (e, i) {
                var a;
                !s && (a = t.picturefill || r.pf)
                  ? a({ reevaluate: !0, elements: [e] })
                  : i && i.src && (e.src = i.src);
              },
              h = function (t, e) {
                return (getComputedStyle(t, null) || {})[e];
              },
              C = function (t, e, i) {
                for (
                  i = i || t.offsetWidth;
                  i < r.minSize && e && !t._lazysizesWidth;

                )
                  (i = e.offsetWidth), (e = e.parentNode);
                return i;
              },
              E = (function () {
                var t,
                  i,
                  r = [],
                  a = [],
                  n = r,
                  s = function () {
                    var e = n;
                    for (n = r.length ? a : r, t = !0, i = !1; e.length; )
                      e.shift()();
                    t = !1;
                  },
                  o = function (r, a) {
                    t && !a
                      ? r.apply(this, arguments)
                      : (n.push(r), i || ((i = !0), (e.hidden ? l : c)(s)));
                  };
                return (o._lsFlush = s), o;
              })(),
              w = function (t, e) {
                return e
                  ? function () {
                      E(t);
                    }
                  : function () {
                      var e = this,
                        i = arguments;
                      E(function () {
                        t.apply(e, i);
                      });
                    };
              },
              _ = function (t) {
                var e,
                  i = 0,
                  a = r.throttleDelay,
                  s = r.ricTimeout,
                  o = function () {
                    (e = !1), (i = n.now()), t();
                  },
                  c =
                    u && s > 49
                      ? function () {
                          u(o, { timeout: s }),
                            s !== r.ricTimeout && (s = r.ricTimeout);
                        }
                      : w(function () {
                          l(o);
                        }, !0);
                return function (t) {
                  var r;
                  (t = !0 === t) && (s = 33),
                    e ||
                      ((e = !0),
                      (r = a - (n.now() - i)),
                      r < 0 && (r = 0),
                      t || r < 9 ? c() : l(c, r));
                };
              },
              S = function (t) {
                var e,
                  i,
                  r = function () {
                    (e = null), t();
                  },
                  a = function () {
                    var t = n.now() - i;
                    t < 99 ? l(a, 99 - t) : (u || r)(r);
                  };
                return function () {
                  (i = n.now()), e || (e = l(a, 99));
                };
              };
            !(function () {
              var e,
                i = {
                  lazyClass: "lazyload",
                  loadedClass: "lazyloaded",
                  loadingClass: "lazyloading",
                  preloadClass: "lazypreload",
                  errorClass: "lazyerror",
                  autosizesClass: "lazyautosizes",
                  srcAttr: "data-src",
                  srcsetAttr: "data-srcset",
                  sizesAttr: "data-sizes",
                  minSize: 40,
                  customMedia: {},
                  init: !0,
                  expFactor: 1.5,
                  hFac: 0.8,
                  loadMode: 2,
                  loadHidden: !0,
                  ricTimeout: 0,
                  throttleDelay: 125,
                };
              r = t.lazySizesConfig || t.lazysizesConfig || {};
              for (e in i) e in r || (r[e] = i[e]);
              (t.lazySizesConfig = r),
                l(function () {
                  r.init && L();
                });
            })();
            var N = (function () {
                var s,
                  c,
                  u,
                  f,
                  g,
                  C,
                  N,
                  L,
                  M,
                  x,
                  F,
                  T,
                  j,
                  W,
                  I = /^img$/i,
                  O = /^iframe$/i,
                  k = "onscroll" in t && !/glebot/.test(navigator.userAgent),
                  B = 0,
                  R = 0,
                  $ = -1,
                  H = function (t) {
                    R--,
                      t && t.target && m(t.target, H),
                      (!t || R < 0 || !t.target) && (R = 0);
                  },
                  U = function (t, i) {
                    var r,
                      n = t,
                      s =
                        "hidden" == h(e.body, "visibility") ||
                        "hidden" != h(t, "visibility");
                    for (
                      L -= i, F += i, M -= i, x += i;
                      s && (n = n.offsetParent) && n != e.body && n != a;

                    )
                      (s = (h(n, "opacity") || 1) > 0) &&
                        "visible" != h(n, "overflow") &&
                        ((r = n.getBoundingClientRect()),
                        (s =
                          x > r.left &&
                          M < r.right &&
                          F > r.top - 1 &&
                          L < r.bottom + 1));
                    return s;
                  },
                  D = function () {
                    var t,
                      n,
                      o,
                      l,
                      u,
                      d,
                      g,
                      z,
                      y,
                      p = i.elements;
                    if ((f = r.loadMode) && R < 8 && (t = p.length)) {
                      (n = 0),
                        $++,
                        null == j &&
                          ("expand" in r ||
                            (r.expand =
                              a.clientHeight > 500 && a.clientWidth > 500
                                ? 500
                                : 370),
                          (T = r.expand),
                          (j = T * r.expFactor)),
                        B < j && R < 1 && $ > 2 && f > 2 && !e.hidden
                          ? ((B = j), ($ = 0))
                          : (B = f > 1 && $ > 1 && R < 6 ? T : 0);
                      for (; n < t; n++)
                        if (p[n] && !p[n]._lazyRace)
                          if (k)
                            if (
                              (((z = p[n].getAttribute("data-expand")) &&
                                (d = 1 * z)) ||
                                (d = B),
                              y !== d &&
                                ((C = innerWidth + d * W),
                                (N = innerHeight + d),
                                (g = -1 * d),
                                (y = d)),
                              (o = p[n].getBoundingClientRect()),
                              (F = o.bottom) >= g &&
                                (L = o.top) <= N &&
                                (x = o.right) >= g * W &&
                                (M = o.left) <= C &&
                                (F || x || M || L) &&
                                (r.loadHidden ||
                                  "hidden" != h(p[n], "visibility")) &&
                                ((c && R < 3 && !z && (f < 3 || $ < 4)) ||
                                  U(p[n], d)))
                            ) {
                              if ((Y(p[n]), (u = !0), R > 9)) break;
                            } else
                              !u &&
                                c &&
                                !l &&
                                R < 4 &&
                                $ < 4 &&
                                f > 2 &&
                                (s[0] || r.preloadAfterLoad) &&
                                (s[0] ||
                                  (!z &&
                                    (F ||
                                      x ||
                                      M ||
                                      L ||
                                      "auto" !=
                                        p[n].getAttribute(r.sizesAttr)))) &&
                                (l = s[0] || p[n]);
                          else Y(p[n]);
                      l && !u && Y(l);
                    }
                  },
                  q = _(D),
                  X = function (t) {
                    p(t.target, r.loadedClass),
                      v(t.target, r.loadingClass),
                      m(t.target, Q),
                      b(t.target, "lazyloaded");
                  },
                  J = w(X),
                  Q = function (t) {
                    J({ target: t.target });
                  },
                  V = function (t, e) {
                    try {
                      t.contentWindow.location.replace(e);
                    } catch (i) {
                      t.src = e;
                    }
                  },
                  G = function (t) {
                    var e,
                      i = t.getAttribute(r.srcsetAttr);
                    (e =
                      r.customMedia[
                        t.getAttribute("data-media") || t.getAttribute("media")
                      ]) && t.setAttribute("media", e),
                      i && t.setAttribute("srcset", i);
                  },
                  K = w(function (t, e, i, a, n) {
                    var s, o, c, f, g, y;
                    (g = b(t, "lazybeforeunveil", e)).defaultPrevented ||
                      (a &&
                        (i
                          ? p(t, r.autosizesClass)
                          : t.setAttribute("sizes", a)),
                      (o = t.getAttribute(r.srcsetAttr)),
                      (s = t.getAttribute(r.srcAttr)),
                      n &&
                        ((c = t.parentNode),
                        (f = c && d.test(c.nodeName || ""))),
                      (y = e.firesLoad || ("src" in t && (o || s || f))),
                      (g = { target: t }),
                      y &&
                        (m(t, H, !0),
                        clearTimeout(u),
                        (u = l(H, 2500)),
                        p(t, r.loadingClass),
                        m(t, Q, !0)),
                      f && z.call(c.getElementsByTagName("source"), G),
                      o
                        ? t.setAttribute("srcset", o)
                        : s &&
                          !f &&
                          (O.test(t.nodeName) ? V(t, s) : (t.src = s)),
                      n && (o || f) && A(t, { src: s })),
                      t._lazyRace && delete t._lazyRace,
                      v(t, r.lazyClass),
                      E(function () {
                        (!y || (t.complete && t.naturalWidth > 1)) &&
                          (y ? H(g) : R--, X(g));
                      }, !0);
                  }),
                  Y = function (t) {
                    var e,
                      i = I.test(t.nodeName),
                      a =
                        i &&
                        (t.getAttribute(r.sizesAttr) ||
                          t.getAttribute("sizes")),
                      n = "auto" == a;
                    ((!n && c) ||
                      !i ||
                      (!t.getAttribute("src") && !t.srcset) ||
                      t.complete ||
                      y(t, r.errorClass) ||
                      !y(t, r.lazyClass)) &&
                      ((e = b(t, "lazyunveilread").detail),
                      n && P.updateElem(t, !0, t.offsetWidth),
                      (t._lazyRace = !0),
                      R++,
                      K(t, e, n, a, i));
                  },
                  Z = function () {
                    if (!c) {
                      if (n.now() - g < 999) return void l(Z, 999);
                      var t = S(function () {
                        (r.loadMode = 3), q();
                      });
                      (c = !0),
                        (r.loadMode = 3),
                        q(),
                        o(
                          "scroll",
                          function () {
                            3 == r.loadMode && (r.loadMode = 2), t();
                          },
                          !0
                        );
                    }
                  };
                return {
                  _: function () {
                    (g = n.now()),
                      (i.elements = e.getElementsByClassName(r.lazyClass)),
                      (s = e.getElementsByClassName(
                        r.lazyClass + " " + r.preloadClass
                      )),
                      (W = r.hFac),
                      o("scroll", q, !0),
                      o("resize", q, !0),
                      t.MutationObserver
                        ? new MutationObserver(q).observe(a, {
                            childList: !0,
                            subtree: !0,
                            attributes: !0,
                          })
                        : (a.addEventListener("DOMNodeInserted", q, !0),
                          a.addEventListener("DOMAttrModified", q, !0),
                          setInterval(q, 999)),
                      o("hashchange", q, !0),
                      [
                        "focus",
                        "mouseover",
                        "click",
                        "load",
                        "transitionend",
                        "animationend",
                        "webkitAnimationEnd",
                      ].forEach(function (t) {
                        e.addEventListener(t, q, !0);
                      }),
                      /d$|^c/.test(e.readyState)
                        ? Z()
                        : (o("load", Z),
                          e.addEventListener("DOMContentLoaded", q),
                          l(Z, 2e4)),
                      i.elements.length ? (D(), E._lsFlush()) : q();
                  },
                  checkElems: q,
                  unveil: Y,
                };
              })(),
              P = (function () {
                var t,
                  i = w(function (t, e, i, r) {
                    var a, n, s;
                    if (
                      ((t._lazysizesWidth = r),
                      (r += "px"),
                      t.setAttribute("sizes", r),
                      d.test(e.nodeName || ""))
                    )
                      for (
                        a = e.getElementsByTagName("source"),
                          n = 0,
                          s = a.length;
                        n < s;
                        n++
                      )
                        a[n].setAttribute("sizes", r);
                    i.detail.dataAttr || A(t, i.detail);
                  }),
                  a = function (t, e, r) {
                    var a,
                      n = t.parentNode;
                    n &&
                      ((r = C(t, n, r)),
                      (a = b(t, "lazybeforesizes", {
                        width: r,
                        dataAttr: !!e,
                      })),
                      a.defaultPrevented ||
                        ((r = a.detail.width) &&
                          r !== t._lazysizesWidth &&
                          i(t, n, a, r)));
                  },
                  n = function () {
                    var e,
                      i = t.length;
                    if (i) for (e = 0; e < i; e++) a(t[e]);
                  },
                  s = S(n);
                return {
                  _: function () {
                    (t = e.getElementsByClassName(r.autosizesClass)),
                      o("resize", s);
                  },
                  checkElems: s,
                  updateElem: a,
                };
              })(),
              L = function () {
                L.i || ((L.i = !0), P._(), N._());
              };
            return (i = {
              cfg: r,
              autoSizer: P,
              loader: N,
              init: L,
              uP: A,
              aC: p,
              rC: v,
              hC: y,
              fire: b,
              gW: C,
              rAF: E,
            });
          }
        })(e, e.document);
        (e.lazySizes = r), "object" == typeof t && t.exports && (t.exports = r);
      })(window);
    }),
    i =
      (t(function (t) {
        !(function (i, r) {
          var a = function (t) {
            r(i.lazySizes, t), i.removeEventListener("lazyunveilread", a, !0);
          };
          (r = r.bind(null, i, i.document)),
            "object" == typeof t && t.exports
              ? r(e)
              : i.lazySizes
              ? a()
              : i.addEventListener("lazyunveilread", a, !0);
        })(window, function (t, e, i, r) {
          "use strict";
          function a(t) {
            var e = getComputedStyle(t, null) || {},
              i = e.fontFamily || "",
              r = i.match(c) || "",
              a = (r && i.match(u)) || "";
            return (
              a && (a = a[1]),
              { fit: (r && r[1]) || "", position: g[a] || a || "center" }
            );
          }
          function n(t, e) {
            var r,
              a,
              n = i.cfg,
              s = t.cloneNode(!1),
              o = s.style,
              l = function () {
                var e = t.currentSrc || t.src;
                e &&
                  a !== e &&
                  ((a = e),
                  (o.backgroundImage =
                    "url(" + (f.test(e) ? JSON.stringify(e) : e) + ")"),
                  r ||
                    ((r = !0),
                    i.rC(s, n.loadingClass),
                    i.aC(s, n.loadedClass)));
              },
              c = function () {
                i.rAF(l);
              };
            (t._lazysizesParentFit = e.fit),
              t.addEventListener("lazyloaded", c, !0),
              t.addEventListener("load", c, !0),
              s.addEventListener("load", function () {
                var t = s.currentSrc || s.src;
                t && t != d && ((s.src = d), (s.srcset = ""));
              }),
              i.rAF(function () {
                var r = t,
                  a = t.parentNode;
                "PICTURE" == a.nodeName.toUpperCase() &&
                  ((r = a), (a = a.parentNode)),
                  i.rC(s, n.loadedClass),
                  i.rC(s, n.lazyClass),
                  i.aC(s, n.loadingClass),
                  i.aC(s, n.objectFitClass || "lazysizes-display-clone"),
                  s.getAttribute(n.srcsetAttr) &&
                    s.setAttribute(n.srcsetAttr, ""),
                  s.getAttribute(n.srcAttr) && s.setAttribute(n.srcAttr, ""),
                  (s.src = d),
                  (s.srcset = ""),
                  (o.backgroundRepeat = "no-repeat"),
                  (o.backgroundPosition = e.position),
                  (o.backgroundSize = e.fit),
                  (r.style.display = "none"),
                  t.setAttribute("data-parent-fit", e.fit),
                  t.setAttribute("data-parent-container", "prev"),
                  a.insertBefore(s, r),
                  t._lazysizesParentFit && delete t._lazysizesParentFit,
                  t.complete && l();
              });
          }
          var s = e.createElement("a").style,
            o = "objectFit" in s,
            l = o && "objectPosition" in s,
            c = /object-fit["']*\s*:\s*["']*(contain|cover)/,
            u = /object-position["']*\s*:\s*["']*(.+?)(?=($|,|'|"|;))/,
            d =
              "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            f = /\(|\)|'/,
            g = { center: "center", "50% 50%": "center" };
          if (!o || !l) {
            var z = function (t) {
              if (t.detail.instance == i) {
                var e = t.target,
                  r = a(e);
                !r.fit || (o && "center" == r.position) || n(e, r);
              }
            };
            t.addEventListener("lazyunveilread", z, !0), r && r.detail && z(r);
          }
        });
      }),
      t(function (t) {
        !(function (i, r) {
          var a = function () {
            r(i.lazySizes), i.removeEventListener("lazyunveilread", a, !0);
          };
          (r = r.bind(null, i, i.document)),
            "object" == typeof t && t.exports
              ? r(e)
              : i.lazySizes
              ? a()
              : i.addEventListener("lazyunveilread", a, !0);
        })(window, function (t, e, i) {
          "use strict";
          if (t.addEventListener) {
            var r = /\s+(\d+)(w|h)\s+(\d+)(w|h)/,
              a = /parent-fit["']*\s*:\s*["']*(contain|cover|width)/,
              n = /parent-container["']*\s*:\s*["']*(.+?)(?=(\s|$|,|'|"|;))/,
              s = /^picture$/i,
              o = function (t) {
                return getComputedStyle(t, null) || {};
              },
              l = {
                getParent: function (e, i) {
                  var r = e,
                    a = e.parentNode;
                  return (
                    (i && "prev" != i) ||
                      !a ||
                      !s.test(a.nodeName || "") ||
                      (a = a.parentNode),
                    "self" != i &&
                      (r =
                        "prev" == i
                          ? e.previousElementSibling
                          : i && (a.closest || t.jQuery)
                          ? (a.closest
                              ? a.closest(i)
                              : jQuery(a).closest(i)[0]) || a
                          : a),
                    r
                  );
                },
                getFit: function (t) {
                  var e,
                    i,
                    r = o(t),
                    s = r.content || r.fontFamily,
                    c = {
                      fit:
                        t._lazysizesParentFit ||
                        t.getAttribute("data-parent-fit"),
                    };
                  return (
                    !c.fit && s && (e = s.match(a)) && (c.fit = e[1]),
                    c.fit
                      ? ((i =
                          t._lazysizesParentContainer ||
                          t.getAttribute("data-parent-container")),
                        !i && s && (e = s.match(n)) && (i = e[1]),
                        (c.parent = l.getParent(t, i)))
                      : (c.fit = r.objectFit),
                    c
                  );
                },
                getImageRatio: function (e) {
                  var i,
                    a,
                    n,
                    o,
                    l,
                    c = e.parentNode,
                    u =
                      c && s.test(c.nodeName || "")
                        ? c.querySelectorAll("source, img")
                        : [e];
                  for (i = 0; i < u.length; i++)
                    if (
                      ((e = u[i]),
                      (a =
                        e.getAttribute(lazySizesConfig.srcsetAttr) ||
                        e.getAttribute("srcset") ||
                        e.getAttribute("data-pfsrcset") ||
                        e.getAttribute("data-risrcset") ||
                        ""),
                      (n = e._lsMedia || e.getAttribute("media")),
                      (n =
                        lazySizesConfig.customMedia[
                          e.getAttribute("data-media") || n
                        ] || n),
                      a &&
                        (!n || ((t.matchMedia && matchMedia(n)) || {}).matches))
                    ) {
                      (o = parseFloat(e.getAttribute("data-aspectratio"))),
                        !o &&
                          (l = a.match(r)) &&
                          (o = "w" == l[2] ? l[1] / l[3] : l[3] / l[1]);
                      break;
                    }
                  return o;
                },
                calculateSize: function (t, e) {
                  var i,
                    r,
                    a,
                    n,
                    s = this.getFit(t),
                    o = s.fit,
                    l = s.parent;
                  return "width" == o ||
                    (("contain" == o || "cover" == o) &&
                      (a = this.getImageRatio(t)))
                    ? (l ? (e = l.clientWidth) : (l = t),
                      (n = e),
                      "width" == o
                        ? (n = e)
                        : (r = l.clientHeight) > 40 &&
                          (i = e / r) &&
                          (("cover" == o && i < a) ||
                            ("contain" == o && i > a)) &&
                          (n = e * (a / i)),
                      n)
                    : e;
                },
              };
            (i.parentFit = l),
              e.addEventListener("lazybeforesizes", function (t) {
                if (!t.defaultPrevented && t.detail.instance == i) {
                  var e = t.target;
                  t.detail.width = l.calculateSize(e, t.detail.width);
                }
              });
          }
        });
      }),
      t(function (t) {
        !(function (i, r) {
          var a = function () {
            r(i.lazySizes), i.removeEventListener("lazyunveilread", a, !0);
          };
          (r = r.bind(null, i, i.document)),
            "object" == typeof t && t.exports
              ? r(e)
              : i.lazySizes
              ? a()
              : i.addEventListener("lazyunveilread", a, !0);
        })(window, function (t, e, i) {
          "use strict";
          function r(e, i) {
            var r,
              a,
              n,
              s,
              o = t.getComputedStyle(e);
            (a = e.parentNode),
              (s = { isPicture: !(!a || !f.test(a.nodeName || "")) }),
              (n = function (t, i) {
                var r = e.getAttribute("data-" + t);
                if (!r) {
                  var a = o.getPropertyValue("--ls-" + t);
                  a && (r = a.trim());
                }
                if (r) {
                  if ("true" == r) r = !0;
                  else if ("false" == r) r = !1;
                  else if (d.test(r)) r = parseFloat(r);
                  else if ("function" == typeof c[t]) r = c[t](e, r);
                  else if (p.test(r))
                    try {
                      r = JSON.parse(r);
                    } catch (t) {}
                  s[t] = r;
                } else
                  t in c && "function" != typeof c[t]
                    ? (s[t] = c[t])
                    : i && "function" == typeof c[t] && (s[t] = c[t](e, r));
              });
            for (r in c) n(r);
            return (
              i.replace(y, function (t, e) {
                e in s || n(e, !0);
              }),
              s
            );
          }
          function a(t, e) {
            var i = [],
              r = function (t, i) {
                return u[typeof e[i]] ? e[i] : t;
              };
            return (
              (i.srcset = []),
              e.absUrl && (m.setAttribute("href", t), (t = m.href)),
              (t = ((e.prefix || "") + t + (e.postfix || "")).replace(y, r)),
              e.widths.forEach(function (r) {
                var a = e.widthmap[r] || r,
                  n = {
                    u: t
                      .replace(g, a)
                      .replace(z, e.ratio ? Math.round(r * e.ratio) : ""),
                    w: r,
                  };
                i.push(n), i.srcset.push((n.c = n.u + " " + r + "w"));
              }),
              i
            );
          }
          function n(t, i, r) {
            var n = 0,
              s = 0,
              o = r;
            if (t) {
              if ("container" === i.ratio) {
                for (
                  n = o.scrollWidth, s = o.scrollHeight;
                  !((n && s) || o === e);

                )
                  (o = o.parentNode), (n = o.scrollWidth), (s = o.scrollHeight);
                n && s && (i.ratio = s / n);
              }
              (t = a(t, i)),
                (t.isPicture = i.isPicture),
                A && "IMG" == r.nodeName.toUpperCase()
                  ? r.removeAttribute(l.srcsetAttr)
                  : r.setAttribute(l.srcsetAttr, t.srcset.join(", ")),
                Object.defineProperty(r, "_lazyrias", {
                  value: t,
                  writable: !0,
                });
            }
          }
          function s(t, e) {
            var a = r(t, e);
            return (
              c.modifyOptions.call(t, { target: t, details: a, detail: a }),
              i.fire(t, "lazyriasmodifyoptions", a),
              a
            );
          }
          function o(t) {
            return (
              t.getAttribute(t.getAttribute("data-srcattr") || c.srcAttr) ||
              t.getAttribute(l.srcsetAttr) ||
              t.getAttribute(l.srcAttr) ||
              t.getAttribute("data-pfsrcset") ||
              ""
            );
          }
          var l,
            c,
            u = { string: 1, number: 1 },
            d = /^\-*\+*\d+\.*\d*$/,
            f = /^picture$/i,
            g = /\s*\{\s*width\s*\}\s*/i,
            z = /\s*\{\s*height\s*\}\s*/i,
            y = /\s*\{\s*([a-z0-9]+)\s*\}\s*/gi,
            p = /^\[.*\]|\{.*\}$/,
            v = /^(?:auto|\d+(px)?)$/,
            m = e.createElement("a"),
            b = e.createElement("img"),
            A = "srcset" in b && !("sizes" in b),
            h = !!t.HTMLPictureElement && !A;
          !(function () {
            var e,
              r = function () {},
              a = {
                prefix: "",
                postfix: "",
                srcAttr: "data-src",
                absUrl: !1,
                modifyOptions: r,
                widthmap: {},
                ratio: !1,
              };
            (l = (i && i.cfg) || t.lazySizesConfig),
              l || ((l = {}), (t.lazySizesConfig = l)),
              l.supportsType ||
                (l.supportsType = function (t) {
                  return !t;
                }),
              l.rias || (l.rias = {}),
              "widths" in (c = l.rias) ||
                ((c.widths = []),
                (function (t) {
                  for (var e, i = 0; !e || e < 3e3; )
                    (i += 5), i > 30 && (i += 1), (e = 36 * i), t.push(e);
                })(c.widths));
            for (e in a) e in c || (c[e] = a[e]);
          })(),
            addEventListener(
              "lazybeforesizes",
              function (t) {
                if (t.detail.instance == i) {
                  var e, r, a, u, d, f, z, y, p, m, b, A, E;
                  if (
                    ((e = t.target),
                    t.detail.dataAttr &&
                      !t.defaultPrevented &&
                      !c.disabled &&
                      (p =
                        e.getAttribute(l.sizesAttr) ||
                        e.getAttribute("sizes")) &&
                      v.test(p))
                  ) {
                    if (
                      ((r = o(e)),
                      (a = s(e, r)),
                      (b = g.test(a.prefix) || g.test(a.postfix)),
                      a.isPicture && (u = e.parentNode))
                    )
                      for (
                        d = u.getElementsByTagName("source"),
                          f = 0,
                          z = d.length;
                        f < z;
                        f++
                      )
                        (b || g.test((y = o(d[f])))) &&
                          (n(y, a, d[f]), (A = !0));
                    b || g.test(r)
                      ? (n(r, a, e), (A = !0))
                      : A &&
                        ((E = []),
                        (E.srcset = []),
                        (E.isPicture = !0),
                        Object.defineProperty(e, "_lazyrias", {
                          value: E,
                          writable: !0,
                        })),
                      A &&
                        (h
                          ? e.removeAttribute(l.srcAttr)
                          : "auto" != p &&
                            ((m = { width: parseInt(p, 10) }),
                            C({ target: e, detail: m })));
                  }
                }
              },
              !0
            );
          var C = (function () {
            var r = function (t, e) {
                return t.w - e.w;
              },
              a = function (t) {
                var e,
                  i,
                  r = t.length,
                  a = t[r - 1],
                  n = 0;
                for (n; n < r; n++)
                  if (((a = t[n]), (a.d = a.w / t.w), a.d >= t.d)) {
                    !a.cached &&
                      (e = t[n - 1]) &&
                      e.d > t.d - 0.13 * Math.pow(t.d, 2.2) &&
                      ((i = Math.pow(e.d - 0.6, 1.6)),
                      e.cached && (e.d += 0.15 * i),
                      e.d + (a.d - t.d) * i > t.d && (a = e));
                    break;
                  }
                return a;
              },
              n = function (t, e) {
                var r;
                return (
                  !t._lazyrias &&
                    i.pWS &&
                    (r = i.pWS(t.getAttribute(l.srcsetAttr || ""))).length &&
                    (Object.defineProperty(t, "_lazyrias", {
                      value: r,
                      writable: !0,
                    }),
                    e &&
                      t.parentNode &&
                      (r.isPicture =
                        "PICTURE" == t.parentNode.nodeName.toUpperCase())),
                  t._lazyrias
                );
              },
              s = function (e) {
                var r = t.devicePixelRatio || 1,
                  a = i.getX && i.getX(e);
                return Math.min(a || r, 2.4, r);
              },
              o = function (e, i) {
                var o, l, c, u, d, f;
                if (((d = e._lazyrias), d.isPicture && t.matchMedia))
                  for (
                    l = 0,
                      o = e.parentNode.getElementsByTagName("source"),
                      c = o.length;
                    l < c;
                    l++
                  )
                    if (
                      n(o[l]) &&
                      !o[l].getAttribute("type") &&
                      (!(u = o[l].getAttribute("media")) ||
                        (matchMedia(u) || {}).matches)
                    ) {
                      d = o[l]._lazyrias;
                      break;
                    }
                return (
                  (!d.w || d.w < i) &&
                    ((d.w = i), (d.d = s(e)), (f = a(d.sort(r)))),
                  f
                );
              },
              c = function (r) {
                if (r.detail.instance == i) {
                  var a,
                    s = r.target;
                  if (
                    !A &&
                    (t.respimage || t.picturefill || lazySizesConfig.pf)
                  )
                    return void e.removeEventListener("lazybeforesizes", c);
                  ("_lazyrias" in s || (r.detail.dataAttr && n(s, !0))) &&
                    (a = o(s, r.detail.width)) &&
                    a.u &&
                    s._lazyrias.cur != a.u &&
                    ((s._lazyrias.cur = a.u),
                    (a.cached = !0),
                    i.rAF(function () {
                      s.setAttribute(l.srcAttr, a.u),
                        s.setAttribute("src", a.u);
                    }));
                }
              };
            return (
              h ? (c = function () {}) : addEventListener("lazybeforesizes", c),
              c
            );
          })();
        });
      }),
      t(function (t) {
        !(function (i, r) {
          var a = function () {
            r(i.lazySizes), i.removeEventListener("lazyunveilread", a, !0);
          };
          (r = r.bind(null, i, i.document)),
            "object" == typeof t && t.exports
              ? r(e)
              : i.lazySizes
              ? a()
              : i.addEventListener("lazyunveilread", a, !0);
        })(window, function (t, e, i) {
          "use strict";
          if (t.addEventListener) {
            var r = /\s+/g,
              a = /\s*\|\s+|\s+\|\s*/g,
              n = /^(.+?)(?:\s+\[\s*(.+?)\s*\])?$/,
              s = /\(|\)|'/,
              o = { contain: 1, cover: 1 },
              l = function (t) {
                var e = i.gW(t, t.parentNode);
                return (
                  (!t._lazysizesWidth || e > t._lazysizesWidth) &&
                    (t._lazysizesWidth = e),
                  t._lazysizesWidth
                );
              },
              c = function (t) {
                var e;
                return (
                  (e = (
                    getComputedStyle(t) || { getPropertyValue: function () {} }
                  ).getPropertyValue("background-size")),
                  !o[e] &&
                    o[t.style.backgroundSize] &&
                    (e = t.style.backgroundSize),
                  e
                );
              },
              u = function (t, i, s) {
                var o = e.createElement("picture"),
                  l = i.getAttribute(lazySizesConfig.sizesAttr),
                  c = i.getAttribute("data-ratio"),
                  u = i.getAttribute("data-optimumx");
                i._lazybgset &&
                  i._lazybgset.parentNode == i &&
                  i.removeChild(i._lazybgset),
                  Object.defineProperty(s, "_lazybgset", {
                    value: i,
                    writable: !0,
                  }),
                  Object.defineProperty(i, "_lazybgset", {
                    value: o,
                    writable: !0,
                  }),
                  (t = t.replace(r, " ").split(a)),
                  (o.style.display = "none"),
                  (s.className = lazySizesConfig.lazyClass),
                  1 != t.length || l || (l = "auto"),
                  t.forEach(function (t) {
                    var i,
                      r = e.createElement("source");
                    l && "auto" != l && r.setAttribute("sizes", l),
                      (i = t.match(n)) &&
                        (r.setAttribute(lazySizesConfig.srcsetAttr, i[1]),
                        i[2] &&
                          r.setAttribute(
                            "media",
                            lazySizesConfig.customMedia[i[2]] || i[2]
                          )),
                      o.appendChild(r);
                  }),
                  l &&
                    (s.setAttribute(lazySizesConfig.sizesAttr, l),
                    i.removeAttribute(lazySizesConfig.sizesAttr),
                    i.removeAttribute("sizes")),
                  u && s.setAttribute("data-optimumx", u),
                  c && s.setAttribute("data-ratio", c),
                  o.appendChild(s),
                  i.appendChild(o);
              },
              d = function (t) {
                if (t.target._lazybgset) {
                  var e = t.target,
                    r = e._lazybgset,
                    a = e.currentSrc || e.src;
                  a &&
                    (r.style.backgroundImage =
                      "url(" + (s.test(a) ? JSON.stringify(a) : a) + ")"),
                    e._lazybgsetLoading &&
                      (i.fire(r, "_lazyloaded", {}, !1, !0),
                      delete e._lazybgsetLoading);
                }
              };
            addEventListener("lazybeforeunveil", function (t) {
              var r, a, n;
              !t.defaultPrevented &&
                (r = t.target.getAttribute("data-bgset")) &&
                ((n = t.target),
                (a = e.createElement("img")),
                (a.alt = ""),
                (a._lazybgsetLoading = !0),
                (t.detail.firesLoad = !0),
                u(r, n, a),
                setTimeout(function () {
                  i.loader.unveil(a),
                    i.rAF(function () {
                      i.fire(a, "_lazyloaded", {}, !0, !0),
                        a.complete && d({ target: a });
                    });
                }));
            }),
              e.addEventListener("load", d, !0),
              t.addEventListener(
                "lazybeforesizes",
                function (t) {
                  if (
                    t.detail.instance == i &&
                    t.target._lazybgset &&
                    t.detail.dataAttr
                  ) {
                    var e = t.target._lazybgset,
                      r = c(e);
                    o[r] &&
                      ((t.target._lazysizesParentFit = r),
                      i.rAF(function () {
                        t.target.setAttribute("data-parent-fit", r),
                          t.target._lazysizesParentFit &&
                            delete t.target._lazysizesParentFit;
                      }));
                  }
                },
                !0
              ),
              e.documentElement.addEventListener(
                "lazybeforesizes",
                function (t) {
                  !t.defaultPrevented &&
                    t.target._lazybgset &&
                    t.detail.instance == i &&
                    (t.detail.width = l(t.target._lazybgset));
                }
              );
          }
        });
      }),
      t(function (t) {
        !(function (i, r) {
          var a = function () {
            r(i.lazySizes), i.removeEventListener("lazyunveilread", a, !0);
          };
          (r = r.bind(null, i, i.document)),
            "object" == typeof t && t.exports
              ? r(e)
              : i.lazySizes
              ? a()
              : i.addEventListener("lazyunveilread", a, !0);
        })(window, function (t, e, i) {
          "use strict";
          var r,
            a = e.createElement("img");
          !("srcset" in a) ||
            "sizes" in a ||
            t.HTMLPictureElement ||
            ((r = /^picture$/i),
            e.addEventListener("lazybeforeunveil", function (t) {
              if (t.detail.instance == i) {
                var a, n, s, o, l, c, u;
                !t.defaultPrevented &&
                  !lazySizesConfig.noIOSFix &&
                  (a = t.target) &&
                  (s = a.getAttribute(lazySizesConfig.srcsetAttr)) &&
                  (n = a.parentNode) &&
                  ((l = r.test(n.nodeName || "")) ||
                    (o =
                      a.getAttribute("sizes") ||
                      a.getAttribute(lazySizesConfig.sizesAttr))) &&
                  ((c = l ? n : e.createElement("picture")),
                  a._lazyImgSrc ||
                    Object.defineProperty(a, "_lazyImgSrc", {
                      value: e.createElement("source"),
                      writable: !0,
                    }),
                  (u = a._lazyImgSrc),
                  o && u.setAttribute("sizes", o),
                  u.setAttribute(lazySizesConfig.srcsetAttr, s),
                  a.setAttribute("data-pfsrcset", s),
                  a.removeAttribute(lazySizesConfig.srcsetAttr),
                  l || (n.insertBefore(c, a), c.appendChild(a)),
                  c.insertBefore(u, a));
              }
            }));
        });
      }));
  t(function (t) {
    !(function (r, a) {
      var n = function () {
        a(r.lazySizes), r.removeEventListener("lazyunveilread", n, !0);
      };
      (a = a.bind(null, r, r.document)),
        "object" == typeof t && t.exports
          ? a(e, i)
          : r.lazySizes
          ? n()
          : r.addEventListener("lazyunveilread", n, !0);
    })(window, function (t, e, i) {
      "use strict";
      var r,
        a = (i && i.cfg) || t.lazySizesConfig,
        n = e.createElement("img"),
        s = "sizes" in n && "srcset" in n,
        o = /\s+\d+h/g,
        l = (function () {
          var t = /\s+(\d+)(w|h)\s+(\d+)(w|h)/,
            i = Array.prototype.forEach;
          return function (r) {
            var a = e.createElement("img"),
              n = function (e) {
                var i,
                  r,
                  a = e.getAttribute(lazySizesConfig.srcsetAttr);
                a &&
                  ((r = a.match(t)) &&
                    (i = "w" == r[2] ? r[1] / r[3] : r[3] / r[1]) &&
                    e.setAttribute("data-aspectratio", i),
                  e.setAttribute(lazySizesConfig.srcsetAttr, a.replace(o, "")));
              },
              s = function (t) {
                var e = t.target.parentNode;
                e &&
                  "PICTURE" == e.nodeName &&
                  i.call(e.getElementsByTagName("source"), n),
                  n(t.target);
              },
              l = function () {
                a.currentSrc && e.removeEventListener("lazybeforeunveil", s);
              };
            r[1] &&
              (e.addEventListener("lazybeforeunveil", s),
              (a.onload = l),
              (a.onerror = l),
              (a.srcset = "data:,a 1w 1h"),
              a.complete && l());
          };
        })();
      if (
        (a || ((a = {}), (t.lazySizesConfig = a)),
        a.supportsType ||
          (a.supportsType = function (t) {
            return !t;
          }),
        !t.picturefill && !a.pf)
      ) {
        if (t.HTMLPictureElement && s)
          return (
            e.msElementsFromPoint &&
              l(navigator.userAgent.match(/Edge\/(\d+)/)),
            void (a.pf = function () {})
          );
        (a.pf = function (e) {
          var i, a;
          if (!t.picturefill)
            for (i = 0, a = e.elements.length; i < a; i++) r(e.elements[i]);
        }),
          (r = (function () {
            var n = function (t, e) {
                return t.w - e.w;
              },
              l = /^\s*\d+\.*\d*px\s*$/,
              c = function (t) {
                var e,
                  i,
                  r = t.length,
                  a = t[r - 1],
                  n = 0;
                for (n; n < r; n++)
                  if (((a = t[n]), (a.d = a.w / t.w), a.d >= t.d)) {
                    !a.cached &&
                      (e = t[n - 1]) &&
                      e.d > t.d - 0.13 * Math.pow(t.d, 2.2) &&
                      ((i = Math.pow(e.d - 0.6, 1.6)),
                      e.cached && (e.d += 0.15 * i),
                      e.d + (a.d - t.d) * i > t.d && (a = e));
                    break;
                  }
                return a;
              },
              u = (function () {
                var t,
                  e = /(([^,\s].[^\s]+)\s+(\d+)w)/g,
                  i = /\s/,
                  r = function (e, i, r, a) {
                    t.push({ c: i, u: r, w: 1 * a });
                  };
                return function (a) {
                  return (
                    (t = []),
                    (a = a.trim()),
                    a.replace(o, "").replace(e, r),
                    t.length ||
                      !a ||
                      i.test(a) ||
                      t.push({ c: a, u: a, w: 99 }),
                    t
                  );
                };
              })(),
              d = function () {
                d.init ||
                  ((d.init = !0),
                  addEventListener(
                    "resize",
                    (function () {
                      var t,
                        i = e.getElementsByClassName("lazymatchmedia"),
                        a = function () {
                          var t, e;
                          for (t = 0, e = i.length; t < e; t++) r(i[t]);
                        };
                      return function () {
                        clearTimeout(t), (t = setTimeout(a, 66));
                      };
                    })()
                  ));
              },
              f = function (e, r) {
                var n,
                  s = e.getAttribute("srcset") || e.getAttribute(a.srcsetAttr);
                !s &&
                  r &&
                  (s = e._lazypolyfill
                    ? e._lazypolyfill._set
                    : e.getAttribute(a.srcAttr) || e.getAttribute("src")),
                  (e._lazypolyfill && e._lazypolyfill._set == s) ||
                    ((n = u(s || "")),
                    r &&
                      e.parentNode &&
                      ((n.isPicture =
                        "PICTURE" == e.parentNode.nodeName.toUpperCase()),
                      n.isPicture &&
                        t.matchMedia &&
                        (i.aC(e, "lazymatchmedia"), d())),
                    (n._set = s),
                    Object.defineProperty(e, "_lazypolyfill", {
                      value: n,
                      writable: !0,
                    }));
              },
              g = function (e) {
                var r = t.devicePixelRatio || 1,
                  a = i.getX && i.getX(e);
                return Math.min(a || r, 2.5, r);
              },
              z = function (e) {
                return t.matchMedia
                  ? (z = function (t) {
                      return !t || (matchMedia(t) || {}).matches;
                    })(e)
                  : !e;
              },
              y = function (t) {
                var e, r, s, o, u, d, y;
                if (((o = t), f(o, !0), (u = o._lazypolyfill), u.isPicture))
                  for (
                    r = 0,
                      e = t.parentNode.getElementsByTagName("source"),
                      s = e.length;
                    r < s;
                    r++
                  )
                    if (
                      a.supportsType(e[r].getAttribute("type"), t) &&
                      z(e[r].getAttribute("media"))
                    ) {
                      (o = e[r]), f(o), (u = o._lazypolyfill);
                      break;
                    }
                return (
                  u.length > 1
                    ? ((y = o.getAttribute("sizes") || ""),
                      (y =
                        (l.test(y) && parseInt(y, 10)) ||
                        i.gW(t, t.parentNode)),
                      (u.d = g(t)),
                      !u.src || !u.w || u.w < y
                        ? ((u.w = y), (d = c(u.sort(n))), (u.src = d))
                        : (d = u.src))
                    : (d = u[0]),
                  d
                );
              },
              p = function (t) {
                if (
                  !s ||
                  !t.parentNode ||
                  "PICTURE" == t.parentNode.nodeName.toUpperCase()
                ) {
                  var e = y(t);
                  e &&
                    e.u &&
                    t._lazypolyfill.cur != e.u &&
                    ((t._lazypolyfill.cur = e.u),
                    (e.cached = !0),
                    t.setAttribute(a.srcAttr, e.u),
                    t.setAttribute("src", e.u));
                }
              };
            return (p.parse = u), p;
          })()),
          a.loadedClass &&
            a.loadingClass &&
            (function () {
              var t = [];
              [
                'img[sizes$="px"][srcset].',
                "picture > img:not([srcset]).",
              ].forEach(function (e) {
                t.push(e + a.loadedClass), t.push(e + a.loadingClass);
              }),
                a.pf({ elements: e.querySelectorAll(t.join(", ")) });
            })();
      }
    });
  });
})();

/*! imagesLoaded PACKAGED v4.1.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License */
("use strict");
!(function (t, e) {
  "function" == typeof define && define.amd
    ? define("ev-emitter/ev-emitter", e)
    : "object" == typeof module && module.exports
    ? (module.exports = e())
    : (t.EvEmitter = e());
})(this, function () {
  function t() {}
  var e = t.prototype;
  return (
    (e.on = function (t, e) {
      if (t && e) {
        var i = (this._events = this._events || {}),
          n = (i[t] = i[t] || []);
        return -1 == n.indexOf(e) && n.push(e), this;
      }
    }),
    (e.once = function (t, e) {
      if (t && e) {
        this.on(t, e);
        var i = (this._onceEvents = this._onceEvents || {}),
          n = (i[t] = i[t] || []);
        return (n[e] = !0), this;
      }
    }),
    (e.off = function (t, e) {
      var i = this._events && this._events[t];
      if (i && i.length) {
        var n = i.indexOf(e);
        return -1 != n && i.splice(n, 1), this;
      }
    }),
    (e.emitEvent = function (t, e) {
      var i = this._events && this._events[t];
      if (i && i.length) {
        var n = 0,
          o = i[n];
        e = e || [];
        for (var r = this._onceEvents && this._onceEvents[t]; o; ) {
          var s = r && r[o];
          s && (this.off(t, o), delete r[o]),
            o.apply(this, e),
            (n += s ? 0 : 1),
            (o = i[n]);
        }
        return this;
      }
    }),
    t
  );
}),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["ev-emitter/ev-emitter"], function (i) {
          return e(t, i);
        })
      : "object" == typeof module && module.exports
      ? (module.exports = e(t, require("ev-emitter")))
      : (t.imagesLoaded = e(t, t.EvEmitter));
  })(window, function (t, e) {
    function i(t, e) {
      for (var i in e) t[i] = e[i];
      return t;
    }
    function n(t) {
      var e = [];
      if (Array.isArray(t)) e = t;
      else if ("number" == typeof t.length)
        for (var i = 0; i < t.length; i++) e.push(t[i]);
      else e.push(t);
      return e;
    }
    function o(t, e, r) {
      return this instanceof o
        ? ("string" == typeof t && (t = document.querySelectorAll(t)),
          (this.elements = n(t)),
          (this.options = i({}, this.options)),
          "function" == typeof e ? (r = e) : i(this.options, e),
          r && this.on("always", r),
          this.getImages(),
          h && (this.jqDeferred = new h.Deferred()),
          void setTimeout(
            function () {
              this.check();
            }.bind(this)
          ))
        : new o(t, e, r);
    }
    function r(t) {
      this.img = t;
    }
    function s(t, e) {
      (this.url = t), (this.element = e), (this.img = new Image());
    }
    var h = t.jQuery,
      a = t.console;
    (o.prototype = Object.create(e.prototype)),
      (o.prototype.options = {}),
      (o.prototype.getImages = function () {
        (this.images = []), this.elements.forEach(this.addElementImages, this);
      }),
      (o.prototype.addElementImages = function (t) {
        "IMG" == t.nodeName && this.addImage(t),
          this.options.background === !0 && this.addElementBackgroundImages(t);
        var e = t.nodeType;
        if (e && d[e]) {
          for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
            var o = i[n];
            this.addImage(o);
          }
          if ("string" == typeof this.options.background) {
            var r = t.querySelectorAll(this.options.background);
            for (n = 0; n < r.length; n++) {
              var s = r[n];
              this.addElementBackgroundImages(s);
            }
          }
        }
      });
    var d = { 1: !0, 9: !0, 11: !0 };
    return (
      (o.prototype.addElementBackgroundImages = function (t) {
        var e = getComputedStyle(t);
        if (e)
          for (
            var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage);
            null !== n;

          ) {
            var o = n && n[2];
            o && this.addBackground(o, t), (n = i.exec(e.backgroundImage));
          }
      }),
      (o.prototype.addImage = function (t) {
        var e = new r(t);
        this.images.push(e);
      }),
      (o.prototype.addBackground = function (t, e) {
        var i = new s(t, e);
        this.images.push(i);
      }),
      (o.prototype.check = function () {
        function t(t, i, n) {
          setTimeout(function () {
            e.progress(t, i, n);
          });
        }
        var e = this;
        return (
          (this.progressedCount = 0),
          (this.hasAnyBroken = !1),
          this.images.length
            ? void this.images.forEach(function (e) {
                e.once("progress", t), e.check();
              })
            : void this.complete()
        );
      }),
      (o.prototype.progress = function (t, e, i) {
        this.progressedCount++,
          (this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded),
          this.emitEvent("progress", [this, t, e]),
          this.jqDeferred &&
            this.jqDeferred.notify &&
            this.jqDeferred.notify(this, t),
          this.progressedCount == this.images.length && this.complete(),
          this.options.debug && a && a.log("progress: " + i, t, e);
      }),
      (o.prototype.complete = function () {
        var t = this.hasAnyBroken ? "fail" : "done";
        if (
          ((this.isComplete = !0),
          this.emitEvent(t, [this]),
          this.emitEvent("always", [this]),
          this.jqDeferred)
        ) {
          var e = this.hasAnyBroken ? "reject" : "resolve";
          this.jqDeferred[e](this);
        }
      }),
      (r.prototype = Object.create(e.prototype)),
      (r.prototype.check = function () {
        var t = this.getIsImageComplete();
        return t
          ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth")
          : ((this.proxyImage = new Image()),
            this.proxyImage.addEventListener("load", this),
            this.proxyImage.addEventListener("error", this),
            this.img.addEventListener("load", this),
            this.img.addEventListener("error", this),
            void (this.proxyImage.src = this.img.src));
      }),
      (r.prototype.getIsImageComplete = function () {
        return this.img.complete && void 0 !== this.img.naturalWidth;
      }),
      (r.prototype.confirm = function (t, e) {
        (this.isLoaded = t), this.emitEvent("progress", [this, this.img, e]);
      }),
      (r.prototype.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (r.prototype.onload = function () {
        this.confirm(!0, "onload"), this.unbindEvents();
      }),
      (r.prototype.onerror = function () {
        this.confirm(!1, "onerror"), this.unbindEvents();
      }),
      (r.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener("load", this),
          this.proxyImage.removeEventListener("error", this),
          this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      (s.prototype = Object.create(r.prototype)),
      (s.prototype.check = function () {
        this.img.addEventListener("load", this),
          this.img.addEventListener("error", this),
          (this.img.src = this.url);
        var t = this.getIsImageComplete();
        t &&
          (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
          this.unbindEvents());
      }),
      (s.prototype.unbindEvents = function () {
        this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      (s.prototype.confirm = function (t, e) {
        (this.isLoaded = t),
          this.emitEvent("progress", [this, this.element, e]);
      }),
      (o.makeJQueryPlugin = function (e) {
        (e = e || t.jQuery),
          e &&
            ((h = e),
            (h.fn.imagesLoaded = function (t, e) {
              var i = new o(this, t, e);
              return i.jqDeferred.promise(h(this));
            }));
      }),
      o.makeJQueryPlugin(),
      o
    );
  });

/*! Masonry PACKAGED v4.1.1
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro */
("use strict");
!(function (t, e) {
  "function" == typeof define && define.amd
    ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
        return e(t, i);
      })
    : "object" == typeof module && module.exports
    ? (module.exports = e(t, require("jquery")))
    : (t.jQueryBridget = e(t, t.jQuery));
})(window, function (t, e) {
  "use strict";
  function i(i, r, a) {
    function h(t, e, n) {
      var o,
        r = "$()." + i + '("' + e + '")';
      return (
        t.each(function (t, h) {
          var u = a.data(h, i);
          if (!u)
            return void s(
              i + " not initialized. Cannot call methods, i.e. " + r
            );
          var d = u[e];
          if (!d || "_" == e.charAt(0))
            return void s(r + " is not a valid method");
          var l = d.apply(u, n);
          o = void 0 === o ? l : o;
        }),
        void 0 !== o ? o : t
      );
    }
    function u(t, e) {
      t.each(function (t, n) {
        var o = a.data(n, i);
        o ? (o.option(e), o._init()) : ((o = new r(n, e)), a.data(n, i, o));
      });
    }
    (a = a || e || t.jQuery),
      a &&
        (r.prototype.option ||
          (r.prototype.option = function (t) {
            a.isPlainObject(t) &&
              (this.options = a.extend(!0, this.options, t));
          }),
        (a.fn[i] = function (t) {
          if ("string" == typeof t) {
            var e = o.call(arguments, 1);
            return h(this, t, e);
          }
          return u(this, t), this;
        }),
        n(a));
  }
  function n(t) {
    !t || (t && t.bridget) || (t.bridget = i);
  }
  var o = Array.prototype.slice,
    r = t.console,
    s =
      "undefined" == typeof r
        ? function () {}
        : function (t) {
            r.error(t);
          };
  return n(e || t.jQuery), i;
}),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("ev-emitter/ev-emitter", e)
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.EvEmitter = e());
  })("undefined" != typeof window ? window : this, function () {
    function t() {}
    var e = t.prototype;
    return (
      (e.on = function (t, e) {
        if (t && e) {
          var i = (this._events = this._events || {}),
            n = (i[t] = i[t] || []);
          return -1 == n.indexOf(e) && n.push(e), this;
        }
      }),
      (e.once = function (t, e) {
        if (t && e) {
          this.on(t, e);
          var i = (this._onceEvents = this._onceEvents || {}),
            n = (i[t] = i[t] || {});
          return (n[e] = !0), this;
        }
      }),
      (e.off = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          var n = i.indexOf(e);
          return -1 != n && i.splice(n, 1), this;
        }
      }),
      (e.emitEvent = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          var n = 0,
            o = i[n];
          e = e || [];
          for (var r = this._onceEvents && this._onceEvents[t]; o; ) {
            var s = r && r[o];
            s && (this.off(t, o), delete r[o]),
              o.apply(this, e),
              (n += s ? 0 : 1),
              (o = i[n]);
          }
          return this;
        }
      }),
      t
    );
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define("get-size/get-size", [], function () {
          return e();
        })
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.getSize = e());
  })(window, function () {
    "use strict";
    function t(t) {
      var e = parseFloat(t),
        i = -1 == t.indexOf("%") && !isNaN(e);
      return i && e;
    }
    function e() {}
    function i() {
      for (
        var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0,
          },
          e = 0;
        u > e;
        e++
      ) {
        var i = h[e];
        t[i] = 0;
      }
      return t;
    }
    function n(t) {
      var e = getComputedStyle(t);
      return (
        e ||
          a(
            "Style returned " +
              e +
              ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"
          ),
        e
      );
    }
    function o() {
      if (!d) {
        d = !0;
        var e = document.createElement("div");
        (e.style.width = "200px"),
          (e.style.padding = "1px 2px 3px 4px"),
          (e.style.borderStyle = "solid"),
          (e.style.borderWidth = "1px 2px 3px 4px"),
          (e.style.boxSizing = "border-box");
        var i = document.body || document.documentElement;
        i.appendChild(e);
        var o = n(e);
        (r.isBoxSizeOuter = s = 200 == t(o.width)), i.removeChild(e);
      }
    }
    function r(e) {
      if (
        (o(),
        "string" == typeof e && (e = document.querySelector(e)),
        e && "object" == typeof e && e.nodeType)
      ) {
        var r = n(e);
        if ("none" == r.display) return i();
        var a = {};
        (a.width = e.offsetWidth), (a.height = e.offsetHeight);
        for (
          var d = (a.isBorderBox = "border-box" == r.boxSizing), l = 0;
          u > l;
          l++
        ) {
          var c = h[l],
            f = r[c],
            m = parseFloat(f);
          a[c] = isNaN(m) ? 0 : m;
        }
        var p = a.paddingLeft + a.paddingRight,
          g = a.paddingTop + a.paddingBottom,
          y = a.marginLeft + a.marginRight,
          v = a.marginTop + a.marginBottom,
          _ = a.borderLeftWidth + a.borderRightWidth,
          E = a.borderTopWidth + a.borderBottomWidth,
          z = d && s,
          b = t(r.width);
        b !== !1 && (a.width = b + (z ? 0 : p + _));
        var x = t(r.height);
        return (
          x !== !1 && (a.height = x + (z ? 0 : g + E)),
          (a.innerWidth = a.width - (p + _)),
          (a.innerHeight = a.height - (g + E)),
          (a.outerWidth = a.width + y),
          (a.outerHeight = a.height + v),
          a
        );
      }
    }
    var s,
      a =
        "undefined" == typeof console
          ? e
          : function (t) {
              console.error(t);
            },
      h = [
        "paddingLeft",
        "paddingRight",
        "paddingTop",
        "paddingBottom",
        "marginLeft",
        "marginRight",
        "marginTop",
        "marginBottom",
        "borderLeftWidth",
        "borderRightWidth",
        "borderTopWidth",
        "borderBottomWidth",
      ],
      u = h.length,
      d = !1;
    return r;
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define("desandro-matches-selector/matches-selector", e)
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.matchesSelector = e());
  })(window, function () {
    "use strict";
    var t = (function () {
      var t = Element.prototype;
      if (t.matches) return "matches";
      if (t.matchesSelector) return "matchesSelector";
      for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
        var n = e[i],
          o = n + "MatchesSelector";
        if (t[o]) return o;
      }
    })();
    return function (e, i) {
      return e[t](i);
    };
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "fizzy-ui-utils/utils",
          ["desandro-matches-selector/matches-selector"],
          function (i) {
            return e(t, i);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(t, require("desandro-matches-selector")))
      : (t.fizzyUIUtils = e(t, t.matchesSelector));
  })(window, function (t, e) {
    var i = {};
    (i.extend = function (t, e) {
      for (var i in e) t[i] = e[i];
      return t;
    }),
      (i.modulo = function (t, e) {
        return ((t % e) + e) % e;
      }),
      (i.makeArray = function (t) {
        var e = [];
        if (Array.isArray(t)) e = t;
        else if (t && "number" == typeof t.length)
          for (var i = 0; i < t.length; i++) e.push(t[i]);
        else e.push(t);
        return e;
      }),
      (i.removeFrom = function (t, e) {
        var i = t.indexOf(e);
        -1 != i && t.splice(i, 1);
      }),
      (i.getParent = function (t, i) {
        for (; t != document.body; )
          if (((t = t.parentNode), e(t, i))) return t;
      }),
      (i.getQueryElement = function (t) {
        return "string" == typeof t ? document.querySelector(t) : t;
      }),
      (i.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (i.filterFindElements = function (t, n) {
        t = i.makeArray(t);
        var o = [];
        return (
          t.forEach(function (t) {
            if (t instanceof HTMLElement) {
              if (!n) return void o.push(t);
              e(t, n) && o.push(t);
              for (var i = t.querySelectorAll(n), r = 0; r < i.length; r++)
                o.push(i[r]);
            }
          }),
          o
        );
      }),
      (i.debounceMethod = function (t, e, i) {
        var n = t.prototype[e],
          o = e + "Timeout";
        t.prototype[e] = function () {
          var t = this[o];
          t && clearTimeout(t);
          var e = arguments,
            r = this;
          this[o] = setTimeout(function () {
            n.apply(r, e), delete r[o];
          }, i || 100);
        };
      }),
      (i.docReady = function (t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e
          ? t()
          : document.addEventListener("DOMContentLoaded", t);
      }),
      (i.toDashed = function (t) {
        return t
          .replace(/(.)([A-Z])/g, function (t, e, i) {
            return e + "-" + i;
          })
          .toLowerCase();
      });
    var n = t.console;
    return (
      (i.htmlInit = function (e, o) {
        i.docReady(function () {
          var r = i.toDashed(o),
            s = "data-" + r,
            a = document.querySelectorAll("[" + s + "]"),
            h = document.querySelectorAll(".js-" + r),
            u = i.makeArray(a).concat(i.makeArray(h)),
            d = s + "-options",
            l = t.jQuery;
          u.forEach(function (t) {
            var i,
              r = t.getAttribute(s) || t.getAttribute(d);
            try {
              i = r && JSON.parse(r);
            } catch (a) {
              return void (
                n &&
                n.error("Error parsing " + s + " on " + t.className + ": " + a)
              );
            }
            var h = new e(t, i);
            l && l.data(t, o, h);
          });
        });
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "outlayer/item",
          ["ev-emitter/ev-emitter", "get-size/get-size"],
          e
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("ev-emitter"), require("get-size")))
      : ((t.Outlayer = {}), (t.Outlayer.Item = e(t.EvEmitter, t.getSize)));
  })(window, function (t, e) {
    "use strict";
    function i(t) {
      for (var e in t) return !1;
      return (e = null), !0;
    }
    function n(t, e) {
      t &&
        ((this.element = t),
        (this.layout = e),
        (this.position = { x: 0, y: 0 }),
        this._create());
    }
    function o(t) {
      return t.replace(/([A-Z])/g, function (t) {
        return "-" + t.toLowerCase();
      });
    }
    var r = document.documentElement.style,
      s = "string" == typeof r.transition ? "transition" : "WebkitTransition",
      a = "string" == typeof r.transform ? "transform" : "WebkitTransform",
      h = {
        WebkitTransition: "webkitTransitionEnd",
        transition: "transitionend",
      }[s],
      u = {
        transform: a,
        transition: s,
        transitionDuration: s + "Duration",
        transitionProperty: s + "Property",
        transitionDelay: s + "Delay",
      },
      d = (n.prototype = Object.create(t.prototype));
    (d.constructor = n),
      (d._create = function () {
        (this._transn = { ingProperties: {}, clean: {}, onEnd: {} }),
          this.css({ position: "absolute" });
      }),
      (d.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (d.getSize = function () {
        this.size = e(this.element);
      }),
      (d.css = function (t) {
        var e = this.element.style;
        for (var i in t) {
          var n = u[i] || i;
          e[n] = t[i];
        }
      }),
      (d.getPosition = function () {
        var t = getComputedStyle(this.element),
          e = this.layout._getOption("originLeft"),
          i = this.layout._getOption("originTop"),
          n = t[e ? "left" : "right"],
          o = t[i ? "top" : "bottom"],
          r = this.layout.size,
          s =
            -1 != n.indexOf("%")
              ? (parseFloat(n) / 100) * r.width
              : parseInt(n, 10),
          a =
            -1 != o.indexOf("%")
              ? (parseFloat(o) / 100) * r.height
              : parseInt(o, 10);
        (s = isNaN(s) ? 0 : s),
          (a = isNaN(a) ? 0 : a),
          (s -= e ? r.paddingLeft : r.paddingRight),
          (a -= i ? r.paddingTop : r.paddingBottom),
          (this.position.x = s),
          (this.position.y = a);
      }),
      (d.layoutPosition = function () {
        var t = this.layout.size,
          e = {},
          i = this.layout._getOption("originLeft"),
          n = this.layout._getOption("originTop"),
          o = i ? "paddingLeft" : "paddingRight",
          r = i ? "left" : "right",
          s = i ? "right" : "left",
          a = this.position.x + t[o];
        (e[r] = this.getXValue(a)), (e[s] = "");
        var h = n ? "paddingTop" : "paddingBottom",
          u = n ? "top" : "bottom",
          d = n ? "bottom" : "top",
          l = this.position.y + t[h];
        (e[u] = this.getYValue(l)),
          (e[d] = ""),
          this.css(e),
          this.emitEvent("layout", [this]);
      }),
      (d.getXValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !e
          ? (t / this.layout.size.width) * 100 + "%"
          : t + "px";
      }),
      (d.getYValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && e
          ? (t / this.layout.size.height) * 100 + "%"
          : t + "px";
      }),
      (d._transitionTo = function (t, e) {
        this.getPosition();
        var i = this.position.x,
          n = this.position.y,
          o = parseInt(t, 10),
          r = parseInt(e, 10),
          s = o === this.position.x && r === this.position.y;
        if ((this.setPosition(t, e), s && !this.isTransitioning))
          return void this.layoutPosition();
        var a = t - i,
          h = e - n,
          u = {};
        (u.transform = this.getTranslate(a, h)),
          this.transition({
            to: u,
            onTransitionEnd: { transform: this.layoutPosition },
            isCleaning: !0,
          });
      }),
      (d.getTranslate = function (t, e) {
        var i = this.layout._getOption("originLeft"),
          n = this.layout._getOption("originTop");
        return (
          (t = i ? t : -t),
          (e = n ? e : -e),
          "translate3d(" + t + "px, " + e + "px, 0)"
        );
      }),
      (d.goTo = function (t, e) {
        this.setPosition(t, e), this.layoutPosition();
      }),
      (d.moveTo = d._transitionTo),
      (d.setPosition = function (t, e) {
        (this.position.x = parseInt(t, 10)),
          (this.position.y = parseInt(e, 10));
      }),
      (d._nonTransition = function (t) {
        this.css(t.to), t.isCleaning && this._removeStyles(t.to);
        for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this);
      }),
      (d.transition = function (t) {
        if (!parseFloat(this.layout.options.transitionDuration))
          return void this._nonTransition(t);
        var e = this._transn;
        for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
        for (i in t.to)
          (e.ingProperties[i] = !0), t.isCleaning && (e.clean[i] = !0);
        if (t.from) {
          this.css(t.from);
          var n = this.element.offsetHeight;
          n = null;
        }
        this.enableTransition(t.to),
          this.css(t.to),
          (this.isTransitioning = !0);
      });
    var l = "opacity," + o(a);
    (d.enableTransition = function () {
      if (!this.isTransitioning) {
        var t = this.layout.options.transitionDuration;
        (t = "number" == typeof t ? t + "ms" : t),
          this.css({
            transitionProperty: l,
            transitionDuration: t,
            transitionDelay: this.staggerDelay || 0,
          }),
          this.element.addEventListener(h, this, !1);
      }
    }),
      (d.onwebkitTransitionEnd = function (t) {
        this.ontransitionend(t);
      }),
      (d.onotransitionend = function (t) {
        this.ontransitionend(t);
      });
    var c = { "-webkit-transform": "transform" };
    (d.ontransitionend = function (t) {
      if (t.target === this.element) {
        var e = this._transn,
          n = c[t.propertyName] || t.propertyName;
        if (
          (delete e.ingProperties[n],
          i(e.ingProperties) && this.disableTransition(),
          n in e.clean &&
            ((this.element.style[t.propertyName] = ""), delete e.clean[n]),
          n in e.onEnd)
        ) {
          var o = e.onEnd[n];
          o.call(this), delete e.onEnd[n];
        }
        this.emitEvent("transitionEnd", [this]);
      }
    }),
      (d.disableTransition = function () {
        this.removeTransitionStyles(),
          this.element.removeEventListener(h, this, !1),
          (this.isTransitioning = !1);
      }),
      (d._removeStyles = function (t) {
        var e = {};
        for (var i in t) e[i] = "";
        this.css(e);
      });
    var f = {
      transitionProperty: "",
      transitionDuration: "",
      transitionDelay: "",
    };
    return (
      (d.removeTransitionStyles = function () {
        this.css(f);
      }),
      (d.stagger = function (t) {
        (t = isNaN(t) ? 0 : t), (this.staggerDelay = t + "ms");
      }),
      (d.removeElem = function () {
        this.element.parentNode.removeChild(this.element),
          this.css({ display: "" }),
          this.emitEvent("remove", [this]);
      }),
      (d.remove = function () {
        return s && parseFloat(this.layout.options.transitionDuration)
          ? (this.once("transitionEnd", function () {
              this.removeElem();
            }),
            void this.hide())
          : void this.removeElem();
      }),
      (d.reveal = function () {
        delete this.isHidden, this.css({ display: "" });
        var t = this.layout.options,
          e = {},
          i = this.getHideRevealTransitionEndProperty("visibleStyle");
        (e[i] = this.onRevealTransitionEnd),
          this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          });
      }),
      (d.onRevealTransitionEnd = function () {
        this.isHidden || this.emitEvent("reveal");
      }),
      (d.getHideRevealTransitionEndProperty = function (t) {
        var e = this.layout.options[t];
        if (e.opacity) return "opacity";
        for (var i in e) return i;
      }),
      (d.hide = function () {
        (this.isHidden = !0), this.css({ display: "" });
        var t = this.layout.options,
          e = {},
          i = this.getHideRevealTransitionEndProperty("hiddenStyle");
        (e[i] = this.onHideTransitionEnd),
          this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          });
      }),
      (d.onHideTransitionEnd = function () {
        this.isHidden &&
          (this.css({ display: "none" }), this.emitEvent("hide"));
      }),
      (d.destroy = function () {
        this.css({
          position: "",
          left: "",
          right: "",
          top: "",
          bottom: "",
          transition: "",
          transform: "",
        });
      }),
      n
    );
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "outlayer/outlayer",
          [
            "ev-emitter/ev-emitter",
            "get-size/get-size",
            "fizzy-ui-utils/utils",
            "./item",
          ],
          function (i, n, o, r) {
            return e(t, i, n, o, r);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(
          t,
          require("ev-emitter"),
          require("get-size"),
          require("fizzy-ui-utils"),
          require("./item")
        ))
      : (t.Outlayer = e(
          t,
          t.EvEmitter,
          t.getSize,
          t.fizzyUIUtils,
          t.Outlayer.Item
        ));
  })(window, function (t, e, i, n, o) {
    "use strict";
    function r(t, e) {
      var i = n.getQueryElement(t);
      if (!i)
        return void (
          h &&
          h.error(
            "Bad element for " + this.constructor.namespace + ": " + (i || t)
          )
        );
      (this.element = i),
        u && (this.$element = u(this.element)),
        (this.options = n.extend({}, this.constructor.defaults)),
        this.option(e);
      var o = ++l;
      (this.element.outlayerGUID = o), (c[o] = this), this._create();
      var r = this._getOption("initLayout");
      r && this.layout();
    }
    function s(t) {
      function e() {
        t.apply(this, arguments);
      }
      return (
        (e.prototype = Object.create(t.prototype)),
        (e.prototype.constructor = e),
        e
      );
    }
    function a(t) {
      if ("number" == typeof t) return t;
      var e = t.match(/(^\d*\.?\d*)(\w*)/),
        i = e && e[1],
        n = e && e[2];
      if (!i.length) return 0;
      i = parseFloat(i);
      var o = m[n] || 1;
      return i * o;
    }
    var h = t.console,
      u = t.jQuery,
      d = function () {},
      l = 0,
      c = {};
    (r.namespace = "outlayer"),
      (r.Item = o),
      (r.defaults = {
        containerStyle: { position: "relative" },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: { opacity: 0, transform: "scale(0.001)" },
        visibleStyle: { opacity: 1, transform: "scale(1)" },
      });
    var f = r.prototype;
    n.extend(f, e.prototype),
      (f.option = function (t) {
        n.extend(this.options, t);
      }),
      (f._getOption = function (t) {
        var e = this.constructor.compatOptions[t];
        return e && void 0 !== this.options[e]
          ? this.options[e]
          : this.options[t];
      }),
      (r.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer",
      }),
      (f._create = function () {
        this.reloadItems(),
          (this.stamps = []),
          this.stamp(this.options.stamp),
          n.extend(this.element.style, this.options.containerStyle);
        var t = this._getOption("resize");
        t && this.bindResize();
      }),
      (f.reloadItems = function () {
        this.items = this._itemize(this.element.children);
      }),
      (f._itemize = function (t) {
        for (
          var e = this._filterFindItemElements(t),
            i = this.constructor.Item,
            n = [],
            o = 0;
          o < e.length;
          o++
        ) {
          var r = e[o],
            s = new i(r, this);
          n.push(s);
        }
        return n;
      }),
      (f._filterFindItemElements = function (t) {
        return n.filterFindElements(t, this.options.itemSelector);
      }),
      (f.getItemElements = function () {
        return this.items.map(function (t) {
          return t.element;
        });
      }),
      (f.layout = function () {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption("layoutInstant"),
          e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), (this._isLayoutInited = !0);
      }),
      (f._init = f.layout),
      (f._resetLayout = function () {
        this.getSize();
      }),
      (f.getSize = function () {
        this.size = i(this.element);
      }),
      (f._getMeasurement = function (t, e) {
        var n,
          o = this.options[t];
        o
          ? ("string" == typeof o
              ? (n = this.element.querySelector(o))
              : o instanceof HTMLElement && (n = o),
            (this[t] = n ? i(n)[e] : o))
          : (this[t] = 0);
      }),
      (f.layoutItems = function (t, e) {
        (t = this._getItemsForLayout(t)),
          this._layoutItems(t, e),
          this._postLayout();
      }),
      (f._getItemsForLayout = function (t) {
        return t.filter(function (t) {
          return !t.isIgnored;
        });
      }),
      (f._layoutItems = function (t, e) {
        if ((this._emitCompleteOnItems("layout", t), t && t.length)) {
          var i = [];
          t.forEach(function (t) {
            var n = this._getItemLayoutPosition(t);
            (n.item = t), (n.isInstant = e || t.isLayoutInstant), i.push(n);
          }, this),
            this._processLayoutQueue(i);
        }
      }),
      (f._getItemLayoutPosition = function () {
        return { x: 0, y: 0 };
      }),
      (f._processLayoutQueue = function (t) {
        this.updateStagger(),
          t.forEach(function (t, e) {
            this._positionItem(t.item, t.x, t.y, t.isInstant, e);
          }, this);
      }),
      (f.updateStagger = function () {
        var t = this.options.stagger;
        return null === t || void 0 === t
          ? void (this.stagger = 0)
          : ((this.stagger = a(t)), this.stagger);
      }),
      (f._positionItem = function (t, e, i, n, o) {
        n ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i));
      }),
      (f._postLayout = function () {
        this.resizeContainer();
      }),
      (f.resizeContainer = function () {
        var t = this._getOption("resizeContainer");
        if (t) {
          var e = this._getContainerSize();
          e &&
            (this._setContainerMeasure(e.width, !0),
            this._setContainerMeasure(e.height, !1));
        }
      }),
      (f._getContainerSize = d),
      (f._setContainerMeasure = function (t, e) {
        if (void 0 !== t) {
          var i = this.size;
          i.isBorderBox &&
            (t += e
              ? i.paddingLeft +
                i.paddingRight +
                i.borderLeftWidth +
                i.borderRightWidth
              : i.paddingBottom +
                i.paddingTop +
                i.borderTopWidth +
                i.borderBottomWidth),
            (t = Math.max(t, 0)),
            (this.element.style[e ? "width" : "height"] = t + "px");
        }
      }),
      (f._emitCompleteOnItems = function (t, e) {
        function i() {
          o.dispatchEvent(t + "Complete", null, [e]);
        }
        function n() {
          s++, s == r && i();
        }
        var o = this,
          r = e.length;
        if (!e || !r) return void i();
        var s = 0;
        e.forEach(function (e) {
          e.once(t, n);
        });
      }),
      (f.dispatchEvent = function (t, e, i) {
        var n = e ? [e].concat(i) : i;
        if ((this.emitEvent(t, n), u))
          if (((this.$element = this.$element || u(this.element)), e)) {
            var o = u.Event(e);
            (o.type = t), this.$element.trigger(o, i);
          } else this.$element.trigger(t, i);
      }),
      (f.ignore = function (t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0);
      }),
      (f.unignore = function (t) {
        var e = this.getItem(t);
        e && delete e.isIgnored;
      }),
      (f.stamp = function (t) {
        (t = this._find(t)),
          t &&
            ((this.stamps = this.stamps.concat(t)),
            t.forEach(this.ignore, this));
      }),
      (f.unstamp = function (t) {
        (t = this._find(t)),
          t &&
            t.forEach(function (t) {
              n.removeFrom(this.stamps, t), this.unignore(t);
            }, this);
      }),
      (f._find = function (t) {
        return t
          ? ("string" == typeof t && (t = this.element.querySelectorAll(t)),
            (t = n.makeArray(t)))
          : void 0;
      }),
      (f._manageStamps = function () {
        this.stamps &&
          this.stamps.length &&
          (this._getBoundingRect(),
          this.stamps.forEach(this._manageStamp, this));
      }),
      (f._getBoundingRect = function () {
        var t = this.element.getBoundingClientRect(),
          e = this.size;
        this._boundingRect = {
          left: t.left + e.paddingLeft + e.borderLeftWidth,
          top: t.top + e.paddingTop + e.borderTopWidth,
          right: t.right - (e.paddingRight + e.borderRightWidth),
          bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth),
        };
      }),
      (f._manageStamp = d),
      (f._getElementOffset = function (t) {
        var e = t.getBoundingClientRect(),
          n = this._boundingRect,
          o = i(t),
          r = {
            left: e.left - n.left - o.marginLeft,
            top: e.top - n.top - o.marginTop,
            right: n.right - e.right - o.marginRight,
            bottom: n.bottom - e.bottom - o.marginBottom,
          };
        return r;
      }),
      (f.handleEvent = n.handleEvent),
      (f.bindResize = function () {
        t.addEventListener("resize", this), (this.isResizeBound = !0);
      }),
      (f.unbindResize = function () {
        t.removeEventListener("resize", this), (this.isResizeBound = !1);
      }),
      (f.onresize = function () {
        this.resize();
      }),
      n.debounceMethod(r, "onresize", 100),
      (f.resize = function () {
        this.isResizeBound && this.needsResizeLayout() && this.layout();
      }),
      (f.needsResizeLayout = function () {
        var t = i(this.element),
          e = this.size && t;
        return e && t.innerWidth !== this.size.innerWidth;
      }),
      (f.addItems = function (t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e;
      }),
      (f.appended = function (t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e));
      }),
      (f.prepended = function (t) {
        var e = this._itemize(t);
        if (e.length) {
          var i = this.items.slice(0);
          (this.items = e.concat(i)),
            this._resetLayout(),
            this._manageStamps(),
            this.layoutItems(e, !0),
            this.reveal(e),
            this.layoutItems(i);
        }
      }),
      (f.reveal = function (t) {
        if ((this._emitCompleteOnItems("reveal", t), t && t.length)) {
          var e = this.updateStagger();
          t.forEach(function (t, i) {
            t.stagger(i * e), t.reveal();
          });
        }
      }),
      (f.hide = function (t) {
        if ((this._emitCompleteOnItems("hide", t), t && t.length)) {
          var e = this.updateStagger();
          t.forEach(function (t, i) {
            t.stagger(i * e), t.hide();
          });
        }
      }),
      (f.revealItemElements = function (t) {
        var e = this.getItems(t);
        this.reveal(e);
      }),
      (f.hideItemElements = function (t) {
        var e = this.getItems(t);
        this.hide(e);
      }),
      (f.getItem = function (t) {
        for (var e = 0; e < this.items.length; e++) {
          var i = this.items[e];
          if (i.element == t) return i;
        }
      }),
      (f.getItems = function (t) {
        t = n.makeArray(t);
        var e = [];
        return (
          t.forEach(function (t) {
            var i = this.getItem(t);
            i && e.push(i);
          }, this),
          e
        );
      }),
      (f.remove = function (t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e),
          e &&
            e.length &&
            e.forEach(function (t) {
              t.remove(), n.removeFrom(this.items, t);
            }, this);
      }),
      (f.destroy = function () {
        var t = this.element.style;
        (t.height = ""),
          (t.position = ""),
          (t.width = ""),
          this.items.forEach(function (t) {
            t.destroy();
          }),
          this.unbindResize();
        var e = this.element.outlayerGUID;
        delete c[e],
          delete this.element.outlayerGUID,
          u && u.removeData(this.element, this.constructor.namespace);
      }),
      (r.data = function (t) {
        t = n.getQueryElement(t);
        var e = t && t.outlayerGUID;
        return e && c[e];
      }),
      (r.create = function (t, e) {
        var i = s(r);
        return (
          (i.defaults = n.extend({}, r.defaults)),
          n.extend(i.defaults, e),
          (i.compatOptions = n.extend({}, r.compatOptions)),
          (i.namespace = t),
          (i.data = r.data),
          (i.Item = s(o)),
          n.htmlInit(i, t),
          u && u.bridget && u.bridget(t, i),
          i
        );
      });
    var m = { ms: 1, s: 1e3 };
    return (r.Item = o), r;
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(["outlayer/outlayer", "get-size/get-size"], e)
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("outlayer"), require("get-size")))
      : (t.Masonry = e(t.Outlayer, t.getSize));
  })(window, function (t, e) {
    var i = t.create("masonry");
    return (
      (i.compatOptions.fitWidth = "isFitWidth"),
      (i.prototype._resetLayout = function () {
        this.getSize(),
          this._getMeasurement("columnWidth", "outerWidth"),
          this._getMeasurement("gutter", "outerWidth"),
          this.measureColumns(),
          (this.colYs = []);
        for (var t = 0; t < this.cols; t++) this.colYs.push(0);
        this.maxY = 0;
      }),
      (i.prototype.measureColumns = function () {
        if ((this.getContainerWidth(), !this.columnWidth)) {
          var t = this.items[0],
            i = t && t.element;
          this.columnWidth = (i && e(i).outerWidth) || this.containerWidth;
        }
        var n = (this.columnWidth += this.gutter),
          o = this.containerWidth + this.gutter,
          r = o / n,
          s = n - (o % n),
          a = s && 1 > s ? "round" : "floor";
        (r = Math[a](r)), (this.cols = Math.max(r, 1));
      }),
      (i.prototype.getContainerWidth = function () {
        var t = this._getOption("fitWidth"),
          i = t ? this.element.parentNode : this.element,
          n = e(i);
        this.containerWidth = n && n.innerWidth;
      }),
      (i.prototype._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth,
          i = e && 1 > e ? "round" : "ceil",
          n = Math[i](t.size.outerWidth / this.columnWidth);
        n = Math.min(n, this.cols);
        for (
          var o = this._getColGroup(n),
            r = Math.min.apply(Math, o),
            s = o.indexOf(r),
            a = { x: this.columnWidth * s, y: r },
            h = r + t.size.outerHeight,
            u = this.cols + 1 - o.length,
            d = 0;
          u > d;
          d++
        )
          this.colYs[s + d] = h;
        return a;
      }),
      (i.prototype._getColGroup = function (t) {
        if (2 > t) return this.colYs;
        for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) {
          var o = this.colYs.slice(n, n + t);
          e[n] = Math.max.apply(Math, o);
        }
        return e;
      }),
      (i.prototype._manageStamp = function (t) {
        var i = e(t),
          n = this._getElementOffset(t),
          o = this._getOption("originLeft"),
          r = o ? n.left : n.right,
          s = r + i.outerWidth,
          a = Math.floor(r / this.columnWidth);
        a = Math.max(0, a);
        var h = Math.floor(s / this.columnWidth);
        (h -= s % this.columnWidth ? 0 : 1), (h = Math.min(this.cols - 1, h));
        for (
          var u = this._getOption("originTop"),
            d = (u ? n.top : n.bottom) + i.outerHeight,
            l = a;
          h >= l;
          l++
        )
          this.colYs[l] = Math.max(d, this.colYs[l]);
      }),
      (i.prototype._getContainerSize = function () {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = { height: this.maxY };
        return (
          this._getOption("fitWidth") &&
            (t.width = this._getContainerFitWidth()),
          t
        );
      }),
      (i.prototype._getContainerFitWidth = function () {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e]; ) t++;
        return (this.cols - t) * this.columnWidth - this.gutter;
      }),
      (i.prototype.needsResizeLayout = function () {
        var t = this.containerWidth;
        return this.getContainerWidth(), t != this.containerWidth;
      }),
      i
    );
  });
