CustomersServices = {
    getAllCustomers(knex) {
        return knex.select('*').from('customers')
    },
    insertCustomer(knex,newCustomer){
        return knex
        .insert(newCustomer)
        .into('customers')
        .returning('*')
        .then(rows=>{
            return rows[0]
        })
    },
}
module.exports = CustomersServices