ItemsServices = {
    getAllitems(knex) {
        return knex
        .raw(`select i.item_id,i.item_name,i.item_price,it.type_name from items i
        join item_types it on it.type_id = i.type_id_fk`)
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
    delete(knex,item_id){
        return knex('items')
        .where({item_id})
        .delete()
    },
    update(knex,item_id,newItem){
        return knex('items')
        .where({item_id})
        .update(newItem)
    }

}


module.exports = ItemsServices

