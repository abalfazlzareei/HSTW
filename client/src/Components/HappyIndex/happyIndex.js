"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const requests_1 = require("../../Util/requests");
require("./happyIndex.css");
function HappyIndex() {
    const [idx, setIdx] = (0, react_1.useState)(0);
    const [yIdx, setYIdx] = (0, react_1.useState)(0);
    function parseDate(date) {
        const d = String(date.getDate()).padStart(2, '0');
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const y = String(date.getFullYear()).slice(-2);
        return `${d}-${m}-${y}`;
    }
    // Calling the API for Happiness index at initialization
    (0, react_1.useEffect)(() => {
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        (0, requests_1.getDateSpecificIndividualIdx)('world', parseDate(today), setIdx);
        (0, requests_1.getDateSpecificIndividualIdx)('world', parseDate(yesterday), setYIdx);
    }, []);
    return (React.createElement("div", { id: "index-container" }, idx
        ?
            React.createElement(React.Fragment, null,
                React.createElement("div", { id: 'today-index-container', className: 'index-containers' },
                    React.createElement("span", { id: "index" }, "World Happiness"),
                    React.createElement("span", null, parseInt(idx.global * 10))),
                React.createElement("div", { id: 'yestarday-index-container', className: 'index-containers' },
                    React.createElement("span", { id: "yesterday-comparison" }, "Yesterday "),
                    React.createElement("span", null, parseInt(yIdx.global * 10))))
        :
            React.createElement("span", { id: "index" },
                "Index : ",
                `${parseInt(yIdx.global * 10)} / 100`)));
}
exports.default = HappyIndex;
