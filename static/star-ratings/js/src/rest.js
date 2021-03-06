"use strict";
var djangoRemarkRest = {
    getCookie: function (name) {
        var cookieValue = null,
            cookies,
            i,
            cookie;
        if (document.cookie && document.cookie !== "") {
            cookies = document.cookie.split(";");
            for (i = 0; i < cookies.length; i += 1) {
                cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === name + "=") {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    },
    makeRequest: function (url, method, success, fail) {
        var req = new XMLHttpRequest();
        if (req.overrideMimeType !== undefined) {
            req.overrideMimeType("application/json");
        }
        req.open(method, url, true);
        req.setRequestHeader("Content-Type", "application/json");
        req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        req.onreadystatechange = function () {
            if (req.readyState !== 4) {
                return;
            }
            if (req.status >= 200 && req.status <= 299) {
                if (success) {
                    if (req.responseText) {
                        success(JSON.parse(req.responseText));
                    } else {
                        success();
                    }
                }
            } else {
                if (fail) {
                    fail(JSON.parse(req.responseText));
                }
            }
        };
        return req;
    },
    get: function (url, data, success, fail) {
        var req = this.makeRequest(url, "GET", success, fail);
        req.send(JSON.stringify(data));
    },
    post: function (url, data, success, fail) {
        var req = this.makeRequest(url, "POST", success, fail);
        req.setRequestHeader("X-CSRFToken", this.getCookie("csrftoken"));
        req.send(JSON.stringify(data));
    },
    put: function (url, data, success, fail) {
        var req = this.makeRequest(url, "PUT", success, fail);
        req.setRequestHeader("X-CSRFToken", this.getCookie("csrftoken"));
        req.send(JSON.stringify(data));
    },
    patch: function (url, data, success, fail) {
        var req = this.makeRequest(url, "PATCH", success, fail);
        req.setRequestHeader("X-CSRFToken", this.getCookie("csrftoken"));
        req.send(JSON.stringify(data));
    },
    delete: function (url, data, success, fail) {
        var req = this.makeRequest(url, "DELETE", success, fail);
        req.setRequestHeader("X-CSRFToken", this.getCookie("csrftoken"));
        req.send(JSON.stringify(data));
    },
};
module.exports = djangoRemarkRest;
