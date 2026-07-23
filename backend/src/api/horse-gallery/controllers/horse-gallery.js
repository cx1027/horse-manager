'use strict';

const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreController('api::horse-gallery.horse-gallery', ({ strapi }) => ({
  async generateShareLink(ctx) {
    const { id } = ctx.params;
    
    try {
      const entry = await strapi.db.query('api::horse-gallery.horse-gallery').findOne({
        where: { id },
      });

      if (!entry) {
        return ctx.notFound('Photo not found');
      }

      const shareToken = require('crypto').randomBytes(16).toString('hex');
      
      await strapi.db.query('api::horse-gallery.horse-gallery').update({
        where: { id },
        data: { shareToken, isPublic: true },
      });

      const shareUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/shared/photo/${shareToken}`;
      
      ctx.created({ shareUrl, shareToken });
    } catch (e) {
      ctx.throw(500, e.message);
    }
  },

  async findByShareToken(ctx) {
    const { token } = ctx.params;
    
    try {
      const entry = await strapi.db.query('api::horse-gallery.horse-gallery').findOne({
        where: { shareToken: token },
        populate: ['horse', 'uploadedBy'],
      });

      if (!entry) {
        return ctx.notFound('Photo not found');
      }

      ctx.body = { data: entry };
    } catch (e) {
      ctx.throw(500, e.message);
    }
  },
}));
