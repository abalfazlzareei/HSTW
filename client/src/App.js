"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const Navbar_1 = __importDefault(require("./Components/Navbar/Navbar"));
const Menu_1 = __importDefault(require("./Components/Menu/Menu"));
const Footer_1 = __importDefault(require("./Components/Footer/Footer"));
const requests_1 = require("./Util/requests");
//@ts-ignore
const Utility_1 = require("./Util/Utility");
const react_1 = require("react");
//@ts-ignore 
const Home_1 = __importDefault(require("./Pages/Home"));
//@ts-ignore 
const About_1 = __importDefault(require("./Pages/About"));
//@ts-ignore 
const Transparency_1 = __importDefault(require("./Pages/Transparency"));
const react_2 = __importDefault(require("react"));
function App() {
    const [innerWidth, setInnerWidth] = (0, react_1.useState)(); //change this!
    const [clicked, setClicked] = (0, react_1.useState)({ name: 'world', 'Alpha-2': 'world' });
    const [mobile, setMobile] = (0, react_1.useState)(false);
    const [menu, setMenu] = (0, react_1.useState)(false);
    const [userCountry, setUserCountry] = (0, react_1.useState)(undefined);
    const [idx, setIdx] = (0, react_1.useState)('');
    // eslint-disable-next-line no-restricted-globals
    // screen.orientation.lock('portrait')
    function handleWindowSizeChange() {
        window.innerWidth <= 500 ? setMobile(true) : setMobile(false);
        setInnerWidth(window.innerWidth);
    }
    (0, react_1.useEffect)(() => {
        window.innerWidth <= 500 ? setMobile(true) : setMobile(false);
        window.addEventListener('resize', handleWindowSizeChange);
        const date = (0, Utility_1.parseDate)(new Date());
        (0, requests_1.getUserCountry)(setUserCountry);
        (0, requests_1.getDateSpecificGlobalIdx)(date, setIdx);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);
    return (react_2.default.createElement("div", { id: "global-container" },
        react_2.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_2.default.createElement(Navbar_1.default, { setMenu: setMenu, mobile: mobile }),
            menu
                ?
                    react_2.default.createElement(Menu_1.default, { idx: idx, setMenu: setMenu, userCountry: userCountry, setClicked: setClicked })
                :
                    '',
            react_2.default.createElement("div", { id: 'sub-container', className: mobile ? 'mobile-padding' : '' },
                react_2.default.createElement(react_router_dom_1.Routes, null,
                    react_2.default.createElement(react_router_dom_1.Route, { path: "/", element: react_2.default.createElement(Home_1.default, { idx: idx, mobile: mobile, innerWidth: innerWidth, setClicked: setClicked, clicked: clicked }) }),
                    react_2.default.createElement(react_router_dom_1.Route, { path: "/about", element: react_2.default.createElement(About_1.default, null) }),
                    react_2.default.createElement(react_router_dom_1.Route, { path: "/transparency", element: react_2.default.createElement(Transparency_1.default, null) })),
                react_2.default.createElement(Footer_1.default, null)))));
}
exports.default = App;
