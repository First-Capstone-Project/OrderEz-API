ItemsServices = {
    getAllitems(knex) {
        return knex
        .from('items')
        .select('*')
    },
    insertItem(knex,newitem){
        return knex
        .insert(newitem)
        .into('items')
        .returning('*')
        .then(rows=>{
            return rows[0]
        })
    },
    getById(knex,id){
        return knex
        .from('items')
        .select('*')
        .where('item_id',id)
        .first()
    },
    getTypeId(knex,id){
        return knex
        .from('item_types')
        .select('*')
        .where('type_id',id)
        .first()
    },
    getType(knex){
        return knex
        .select('*')
        .from('item_types')
    },
    insertItem(knex,newItem){
        return knex
        .insert(newItem)
        .into('items')
        .returning('*')
        .then(rows=>{
            return rows[0]
        })
    },
}


module.exports = ItemsServices