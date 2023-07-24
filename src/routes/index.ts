const user_routes = require('./user_routes');
const state_routes = require('./state_routes');
const country_routes = require('./country_route');


export const allRoutes = [
   {
   path:'/user',
   route:user_routes
   },
   {
   path:'/state',
   route:state_routes
   },
   {
   path:'/country',
   route:country_routes
   }
]

