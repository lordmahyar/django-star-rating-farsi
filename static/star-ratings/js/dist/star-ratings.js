(function (e) {
    if (typeof exports == "object" && typeof module != "undefined") module.exports = e();
    else if (typeof define == "function" && define.amd) define([], e);
    else {
        var t;
        typeof window != "undefined" ? (t = window) : typeof global != "undefined" ? (t = global) : typeof self != "undefined" ? (t = self) : (t = this), (t.starRatings = e());
    }
})(function () {
    var e, t, n;
    return (function r(e, t, n) {
        function i(o, u) {
            if (!t[o]) {
                if (!e[o]) {
                    var a = typeof require == "function" && require;
                    if (!u && a) return a(o, !0);
                    if (s) return s(o, !0);
                    var f = new Error("Cannot find module '" + o + "'");
                    throw ((f.code = "MODULE_NOT_FOUND"), f);
                }
                var l = (t[o] = { exports: {} });
                e[o][0].call(
                    l.exports,
                    function (t) {
                        var n = e[o][1][t];
                        return i(n ? n : t);
                    },
                    l,
                    l.exports,
                    r,
                    e,
                    t,
                    n
                );
            }
            return t[o].exports;
        }
        var s = typeof require == "function" && require;
        for (var o = 0; o < n.length; o++) i(n[o]);
        return i;
    })(
        {
            1: [
                function (e, t, n) {
                    t.exports = e("./src/ratings.js");
                },
                { "./src/ratings.js": 2 },
            ],
            2: [
                function (e, t, n) {
                    function s() {
                        var e = document.querySelectorAll(".star-ratings-rate-action"),
                            t;
                        for (t = 0; t < e.length; t += 1) o(e[t]);
                    }
                    function o(e) {
                        e.addEventListener("submit", u),
                            (e.onmouseenter = function () {
                                var e = h(this),
                                    t = this.querySelector("[name=score]").value,
                                    n = i.findParent(this, "star-ratings");
                                n.querySelector(".star-ratings-rating-foreground").style.width = (100 / e) * t + "%";
                            }),
                            (e.onmouseleave = function () {
                                var e = p(this),
                                    t = h(this),
                                    n = this.querySelector("[name=score]").value,
                                    r = i.findParent(this, "star-ratings"),
                                    s = (100 / t) * e + "%";
                                r.querySelector(".star-ratings-rating-foreground").style.width = s;
                            });
                    }
                    function u(e) {
                        e.stopPropagation(), e.preventDefault();
                        var t = e.target,
                            n = [].reduce.call(
                                t.elements,
                                function (e, t) {
                                    return (e[t.name] = t.value), e;
                                },
                                {}
                            );
                        a(t.action, n, this);
                    }
                    function a(e, t, n) {
                        r.post(
                            e,
                            t,
                            function (e) {
                                d(e, n), l(e, n);
                            },
                            function (e) {
                                v(e, n), c(e, n);
                            }
                        );
                    }
                    function f(e, t) {
                        if (typeof CustomEvent == "undefined") {
                            var n = document.createEvent("CustomEvent");
                            return n.initCustomEvent(e, !0, !0, t), n;
                        }
                        return new CustomEvent(e, { detail: t, bubbles: !0, cancelable: !0 });
                    }
                    function l(e, t) {
                        t.dispatchEvent(f("rate-success", { sender: t, rating: e }));
                    }
                    function c(e, t) {
                        t.dispatchEvent(f("rate-failed", { sender: t, error: e }));
                    }
                    function h(e) {
                        var t = i.findParent(e, "star-ratings");
                        return t ? parseInt(t.getAttribute("data-max-rating")) : -1;
                    }
                    function p(e) {
                        var t = i.findParent(e, "star-ratings");
                        return t ? parseFloat(t.getAttribute("data-avg-rating")) : -1;
                    }
                    function d(e, t) {
                        var n = i.findParent(t, "star-ratings"),
                            r;
                        if (n === undefined || n === null) return;
                        n.setAttribute("data-avg-rating", e.average);
                        var s = n.getElementsByClassName("star-ratings-rating-average")[0];
                        function Farsi(n) {
                            const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
                            return n.toString().replace(/\d/g, (x) => farsiDigits[x]);
                        }
                        s && ((r = s.getElementsByClassName("star-ratings-rating-value")[0]), r && (r.innerHTML = Farsi(e.average.toFixed(2))));
                        var o = n.getElementsByClassName("star-ratings-rating-count")[0];
                        o && ((r = o.getElementsByClassName("star-ratings-rating-value")[0]), r && (r.innerHTML = Farsi(e.count)));
                        var u = n.getElementsByClassName("star-ratings-rating-user")[0];
                        u && ((r = u.getElementsByClassName("star-ratings-rating-value")[0]), r && (r.innerHTML = Farsi(e.user_rating))), (n.querySelector(".star-ratings-rating-foreground").style.width = e.percentage + "%");
                    }
                    function v(e, t) {
                        var n = i.findParent(t, "star-ratings");
                        if (n === undefined || n === null) return;
                        (n.querySelector(".star-ratings-errors").innerHTML = e.error),
                            setTimeout(function () {
                                n.querySelector(".star-ratings-errors").innerHTML = "";
                            }, 2500);
                    }
                    var r = e("./rest.js"),
                        i = e("./utils");
                    document.addEventListener("DOMContentLoaded", function (e) {
                        document.querySelector(".star-ratings") && s();
                    }),
                        (t.exports = { bindRating: o });
                },
                { "./rest.js": 3, "./utils": 4 },
            ],
            3: [
                function (e, t, n) {
                    "use strict";
                    var r = {
                        getCookie: function (e) {
                            var t = null,
                                n,
                                r,
                                i;
                            if (document.cookie && document.cookie !== "") {
                                n = document.cookie.split(";");
                                for (r = 0; r < n.length; r += 1) {
                                    i = n[r].trim();
                                    if (i.substring(0, e.length + 1) === e + "=") {
                                        t = decodeURIComponent(i.substring(e.length + 1));
                                        break;
                                    }
                                }
                            }
                            return t;
                        },
                        makeRequest: function (e, t, n, r) {
                            var i = new XMLHttpRequest();
                            return (
                                i.overrideMimeType !== undefined && i.overrideMimeType("application/json"),
                                i.open(t, e, !0),
                                i.setRequestHeader("Content-Type", "application/json"),
                                i.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
                                (i.onreadystatechange = function () {
                                    if (i.readyState !== 4) return;
                                    i.status >= 200 && i.status <= 299 ? n && (i.responseText ? n(JSON.parse(i.responseText)) : n()) : r && r(JSON.parse(i.responseText));
                                }),
                                i
                            );
                        },
                        get: function (e, t, n, r) {
                            var i = this.makeRequest(e, "GET", n, r);
                            i.send(JSON.stringify(t));
                        },
                        post: function (e, t, n, r) {
                            var i = this.makeRequest(e, "POST", n, r);
                            i.setRequestHeader("X-CSRFToken", this.getCookie("csrftoken")), i.send(JSON.stringify(t));
                        },
                        put: function (e, t, n, r) {
                            var i = this.makeRequest(e, "PUT", n, r);
                            i.setRequestHeader("X-CSRFToken", this.getCookie("csrftoken")), i.send(JSON.stringify(t));
                        },
                        patch: function (e, t, n, r) {
                            var i = this.makeRequest(e, "PATCH", n, r);
                            i.setRequestHeader("X-CSRFToken", this.getCookie("csrftoken")), i.send(JSON.stringify(t));
                        },
                        delete: function (e, t, n, r) {
                            var i = this.makeRequest(e, "DELETE", n, r);
                            i.setRequestHeader("X-CSRFToken", this.getCookie("csrftoken")), i.send(JSON.stringify(t));
                        },
                    };
                    t.exports = r;
                },
                {},
            ],
            4: [
                function (e, t, n) {
                    function r(e, t) {
                        return (" " + e.className + " ").indexOf(" " + t + " ") > -1;
                    }
                    function i(e, t) {
                        var n = e.parentNode;
                        while (r(n, t) === !1) {
                            if (n.parentNode === undefined) return null;
                            n = n.parentNode;
                        }
                        return n;
                    }
                    t.exports = { hasClass: r, findParent: i };
                },
                {},
            ],
        },
        {},
        [1]
    )(1);
});
