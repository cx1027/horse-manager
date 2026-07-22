'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/register',
      handler: 'register.registerWithRole',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
