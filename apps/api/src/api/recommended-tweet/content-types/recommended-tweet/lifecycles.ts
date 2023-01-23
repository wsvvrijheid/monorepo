export default {
  async afterCreate({ result }) {
    console.log('afterCreate', result)
  },
  async beforeCreate(...args) {
    console.log('before', args)
  },
}
