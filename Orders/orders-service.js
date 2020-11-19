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
    },
    getReciept(knex,id){
        return knex
        .raw(`select i.item_name,it.type_name,i.item_price,oi.order_quantity from orders_items oi
        join items i on i.item_id = oi.item_id_fk
        join item_types it on i.type_id_fk = it.type_id
        where customer_id_fk = ${id};`)
    },
    getCustomer(knex,id){
        return knex
        .raw(`select oc.order_date, c.customer_name,c.customer_adress,c.customer_phone from order_customers oc
        join customers c on oc.customer_id_fk = c.customer_id
        where order_customer_id = ${id}`)
    },
    getAll(knex,name){
        if(name==='all'){
            return knex
            .raw(`select oi.customer_id_fk,oc.order_date,c.customer_name, c.customer_adress, array_agg(i.item_name), sum(i.item_price) from customers c
            join order_customers oc on c.customer_id = oc.customer_id_fk
            join orders_items oi on oc.order_customer_id = oi.customer_id_fk
            join items i on oi.item_id_fk = i.item_id
            where c.customer_name ilike '%%'
            group by oc.order_date ,oi.customer_id_fk ,c.customer_id;`)
        }
        return knex
        .raw(`select oi.customer_id_fk,oc.order_date,c.customer_name, c.customer_adress, array_agg(i.item_name), sum(i.item_price) from customers c
        join order_customers oc on c.customer_id = oc.customer_id_fk
        join orders_items oi on oc.order_customer_id = oi.customer_id_fk
        join items i on oi.item_id_fk = i.item_id
        where c.customer_name ilike '%${name}%'
        group by oc.order_date ,oi.customer_id_fk ,c.customer_id;`)
        

    }
}
module.exports = OrderService