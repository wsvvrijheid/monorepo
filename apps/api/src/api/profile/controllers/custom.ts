// module.exports = {
//     async getProfile(ctx) {
//       if (!ctx.state.user) {
//         throw ctx.unauthorized('You are not authenticated');
//       }
  
//       const userId = ctx.state.user.id;
  
//       try {
//         // what should I use here? 
//         const profile = await strapi.entityService.getProfile('user', userId, {
//           populate: 'profile', 
//         });
  
//         if (!profile) {
//           return ctx.notFound('Profile not found');
//         }
  
//         return profile;
//       } catch (error) {
//         strapi.log.error(error);
//         throw error;
//       }
//     },
//   };