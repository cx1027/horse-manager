'use strict';

const ACTIONS = [
  'api::register.register.registerWithRole',
  'api::horse.horse.find',
  'api::horse.horse.findOne',
  'api::horse.horse.create',
  'api::medical-record.medical-record.find',
  'api::medical-record.medical-record.findOne',
  'api::medical-record.medical-record.create',
  'api::health-record.health-record.find',
  'api::health-record.health-record.findOne',
  'api::health-record.health-record.create',
  'api::insurance.insurance.find',
  'api::insurance.insurance.findOne',
  'api::insurance.insurance.create',
  'api::feeding-record.feeding-record.find',
  'api::feeding-record.feeding-record.findOne',
  'api::feeding-record.feeding-record.create',
  'api::commercial-activity.commercial-activity.find',
  'api::commercial-activity.commercial-activity.findOne',
  'api::commercial-activity.commercial-activity.create',
  'api::notification-setting.notification-setting.find',
  'api::notification-setting.notification-setting.findOne',
  'api::notification-setting.notification-setting.create',
  'api::notification-setting.notification-setting.update',
];

module.exports = {
  register() {
    console.log('🚀 Horse Info API registered');
  },

  async bootstrap({ strapi }) {
    console.log('⚡ Bootstrapping API permissions...');

    const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
      where: { type: 'public' },
    });

    if (!publicRole) {
      console.error('⚠ Public role not found');
      return;
    }

    console.log(`Public role ID: ${publicRole.id}`);

    for (const action of ACTIONS) {
      try {
        const existing = await strapi.query('plugin::users-permissions.permission').findOne({
          where: { action },
        });

        if (!existing) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: { action, enabled: true, role: publicRole.id },
          });
          console.log(`  ✓ Created: ${action}`);
        } else {
          console.log(`  - Exists: ${action}`);
        }
      } catch (e) {
        console.error(`  ✗ Error: ${action} - ${e.message}`);
      }
    }

    console.log('✅ API permissions configured!');
  },
};
