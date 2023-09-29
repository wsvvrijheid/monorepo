export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  register(/* { strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async bootstrap() {
    const STRAPI_ADMIN_EMAIL = process.env.STRAPI_ADMIN_EMAIL as string
    const STRAPI_ADMIN_PASSWORD = process.env.STRAPI_ADMIN_PASSWORD as string

    if (!STRAPI_ADMIN_EMAIL || !STRAPI_ADMIN_PASSWORD) {
      strapi.log.warn(
        '🟡 STRAPI_ADMIN_EMAIL or STRAPI_ADMIN_PASSWORD environment variables not set',
      )

      return
    }

    try {
      const existingAdmin =
        await strapi.admin.services.user.findOneByEmail('dev@wsvvrijheid.nl')

      if (!existingAdmin) {
        const createdAdmin = await strapi.admin.services.user.create({
          password: 'Test?123',
          email: 'dev@wsvvrijheid.nl',
          roles: [1],
          isActive: true,
        })

        strapi.log.info(`✅ Admin ${createdAdmin.email.toUpperCase()} created`)
      } else {
        strapi.log.info(
          `🟡 Admin ${existingAdmin.email.toUpperCase()} already exists`,
        )
      }

      const roles =
        await strapi.plugins['users-permissions'].services.role.find()

      for (const role of roles) {
        const existingUser = await strapi.plugins[
          'users-permissions'
        ].services.user.fetchAll({ filters: { username: role.type } })

        if (existingUser) {
          strapi.log.info(`🟡 User ${role.type.toUpperCase()} already exists`)
          continue
        }

        const result = await strapi.plugins[
          'users-permissions'
        ].services.user.add({
          username: role.type,
          email: `${role.type}@wsvvrijheid.nl`,
          password: 'Test?123',
          confirmed: true,
          role: role.id,
        })

        strapi.log.info(`✅ User ${result.type.toUpperCase()} created`)
      }
    } catch (error) {
      strapi.log.error(`Bootstrap error: ${error.message}`)
    }
  },
}
