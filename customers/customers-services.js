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
    getById(knex,id){
        return knex
        .from('customers')
        .select('*')
        .where('customer_id',id)
        .first()
    },
    update(knex,customer_id,newCustomer){
        return knex('customers')
        .where({customer_id})
        .update(newCustomer)
    },
    delete(knex,customer_id){
        return knex('customers')
        .where({customer_id})
        .delete()
    },

}
module.exports = CustomersServices