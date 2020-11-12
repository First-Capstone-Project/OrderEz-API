OrderService = {
    insertOrder(knex,newOrder){
        return knex
        .insert(newOrder)
        .into('order_customers')
        .returning('*')
        .then(rows=>{
            return rows[0]
        })
    },
    addItem(knex,item){
        return knex
        .insert(item)
        .into('orders_items')
        .returning('*')
        .then(rows=>{
            return rows[0]
        })
    }
}
module.exports = OrderService