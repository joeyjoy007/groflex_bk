"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allRoutes = void 0;
const user_routes = require('./user_routes');
const state_routes = require('./state_routes');
const country_routes = require('./country_route');
exports.allRoutes = [
    {
        path: '/user',
        route: user_routes
    },
    {
        path: '/state',
        route: state_routes
    },
    {
        path: '/country',
        route: country_routes
    }
];
