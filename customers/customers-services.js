CustomersServices = {
    getAllCustomers(knex) {
        return knex.select('*').from('customers')
    }
}
module.exports = CustomersServices