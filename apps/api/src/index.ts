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
        await strapi.admin.services.user.findOneByEmail(STRAPI_ADMIN_EMAIL)

      if (!existingAdmin) {
        const createdAdmin = await strapi.admin.services.user.create({
          password: STRAPI_ADMIN_PASSWORD,
          email: STRAPI_ADMIN_EMAIL,
          roles: [1],
          isActive: true,
        })

        strapi.log.info(`✅ Admin ${createdAdmin.email?.toUpperCase()} created`)
      } else {
        strapi.log.info(
          `🟡 Admin ${existingAdmin.email?.toUpperCase()} already exists`,
        )
      }

      const roles =
        await strapi.plugins['users-permissions'].services.role.find()

      for (const role of roles) {
        const userResponse = await strapi.plugins[
          'users-permissions'
        ].services.user.fetchAll({ filters: { username: role.type } })

        const existingUser = userResponse?.[0]

        if (existingUser) {
          strapi.log.info(
            `🟡 User ${existingUser.username?.toUpperCase()} already exists`,
          )

          const profileResponse = await strapi.entityService.findMany(
            'api::profile.profile',
            {
              filters: { email: { $eq: existingUser.email } },
            },
          )

          const existingProfile = profileResponse?.[0]

          if (!existingProfile) {
            await strapi.entityService.create('api::profile.profile', {
              data: {
                name: role.name,
                email: existingUser.email,
                availableHours: 1,
                user: existingUser.id,
              },
            })

            strapi.log.info(`✅ Profile ${role.name?.toUpperCase()} created`)
          } else {
            strapi.log.info(
              `🟡 Profile ${existingProfile.name?.toUpperCase()} already exists`,
            )
          }

          continue
        }

        const email = `${role.type}@wsvvrijheid.nl`

        const result = await strapi.plugins[
          'users-permissions'
        ].services.user.add({
          username: role.type,
          email,
          password: STRAPI_ADMIN_PASSWORD,
          confirmed: true,
          role: role.id,
        })

        const profileResponse = await strapi.entityService.findMany(
          'api::profile.profile',
          {
            filters: { email: { $eq: result.email } },
          },
        )

        const existingProfile = profileResponse?.[0]

        if (!existingProfile) {
          await strapi.entityService.create('api::profile.profile', {
            data: {
              name: role.name,
              email: email,
              availableHours: 1,
              user: result.id,
            },
          })
        }

        strapi.log.info(`✅ User ${result.email?.toUpperCase()} created`)
      }
    } catch (error) {
      console.error('Bootstrap error', JSON.stringify(error, null, 2))
    }
  },
}
