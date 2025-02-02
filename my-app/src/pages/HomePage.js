"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const HomePage = ({ onLogout }) => {
    return (<div>
            <h1>Welcome to the Home Page!</h1>
            <button onClick={onLogout}>Logout</button>
            <react_router_dom_1.Link to="/restaurants">Go to Restaurants</react_router_dom_1.Link>
        </div>);
};
exports.default = HomePage;
