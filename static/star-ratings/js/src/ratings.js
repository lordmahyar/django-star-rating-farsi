var rest = require("./rest.js");
var utils = require("./utils.js");
function Farsi(n) {
    const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return n.toString().replace(/d/g, (x) => farsiDigits[x]);
}
function init() {
    var ratingActions = document.querySelectorAll(".star-ratings-rate-action"),
        i;
    for (i = 0; i < ratingActions.length; i += 1) {
        bindRatings(ratingActions[i]);
    }
}
function bindRatings(el) {
    el.addEventListener("submit", ratingSubmit);
    el.onmouseenter = function () {
        var maxRating = getMaxRating(this);
        var score = this.querySelector("[name=score]").value;
        var parent = utils.findParent(this, "star-ratings");
        parent.querySelector(".star-ratings-rating-foreground").style.width = (100 / maxRating) * score + "%";
    };
    el.onmouseleave = function () {
        var avgRating = getAvgRating(this);
        var maxRating = getMaxRating(this);
        var score = this.querySelector("[name=score]").value;
        var parent = utils.findParent(this, "star-ratings");
        var percentage = (100 / maxRating) * avgRating + "%";
        parent.querySelector(".star-ratings-rating-foreground").style.width = percentage;
    };
}
function ratingSubmit(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    var form = ev.target;
    var data = [].reduce.call(
        form.elements,
        function (data, element) {
            data[element.name] = element.value;
            return data;
        },
        {}
    );
    rate(form.action, data, this);
}
function rate(url, data, sender) {
    rest.post(
        url,
        data,
        function (rating) {
            updateRating(rating, sender);
            dispatchRateSuccessEvent(rating, sender);
        },
        function (errors) {
            showError(errors, sender);
            dispatchRateFailEvent(errors, sender);
        }
    );
}
function _getEvent(name, detail) {
    if (typeof CustomEvent === "undefined") {
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(name, true, true, detail);
        return evt;
    } else {
        return new CustomEvent(name, { detail: detail, bubbles: true, cancelable: true });
    }
}
function dispatchRateSuccessEvent(rating, sender) {
    sender.dispatchEvent(_getEvent("rate-success", { sender: sender, rating: rating }));
}
function dispatchRateFailEvent(error, sender) {
    sender.dispatchEvent(_getEvent("rate-failed", { sender: sender, error: error }));
}
function getMaxRating(el) {
    var parent = utils.findParent(el, "star-ratings");
    if (parent) {
        return parseInt(parent.getAttribute("data-max-rating"));
    }
    return -1;
}
function getAvgRating(el) {
    var parent = utils.findParent(el, "star-ratings");
    if (parent) {
        return parseFloat(parent.getAttribute("data-avg-rating"));
    }
    return -1;
}
function updateRating(rating, sender) {
    var parent = utils.findParent(sender, "star-ratings"),
        valueElem;
    if (parent === undefined || parent === null) {
        return;
    }
    parent.setAttribute("data-avg-rating", rating.average);
    var avgElem = parent.getElementsByClassName("star-ratings-rating-average")[0];
    if (avgElem) {
        valueElem = avgElem.getElementsByClassName("star-ratings-rating-value")[0];
        if (valueElem) {
            valueElem.innerHTML = Farsi(rating.average.toFixed(2));
        }
    }
    var countElem = parent.getElementsByClassName("star-ratings-rating-count")[0];
    if (countElem) {
        valueElem = countElem.getElementsByClassName("star-ratings-rating-value")[0];
        if (valueElem) {
            valueElem.innerHTML = Farsi(rating.count);
        }
    }
    var userElem = parent.getElementsByClassName("star-ratings-rating-user")[0];
    if (userElem) {
        valueElem = userElem.getElementsByClassName("star-ratings-rating-value")[0];
        if (valueElem) {
            valueElem.innerHTML = Farsi(rating.user_rating);
        }
    }
    parent.querySelector(".star-ratings-rating-foreground").style.width = rating.percentage + "%";
}
function showError(errors, sender) {
    var parent = utils.findParent(sender, "star-ratings");
    if (parent === undefined || parent === null) {
        return;
    }
    parent.querySelector(".star-ratings-errors").innerHTML = errors.error;
    setTimeout(function () {
        parent.querySelector(".star-ratings-errors").innerHTML = "";
    }, 2500);
}
document.addEventListener("DOMContentLoaded", function (event) {
    if (document.querySelector(".star-ratings")) {
        init();
    }
});
module.exports = { bindRating: bindRatings };
