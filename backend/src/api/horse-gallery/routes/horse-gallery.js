'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;
const router = createCoreRouter('api::horse-gallery.horse-gallery');

module.exports = router;
module.exports.default = router;
