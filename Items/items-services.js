ItemsServices = {
    getAllitems(knex) {
        return knex
        .from('items as i')
        .select(
        'i.item_id',
        'i.item_name',
        'i.item_price',
        'it.type_name')
        .join('item_types as it','it.type_id','i.item_id')
        
    },
    insertitem(knex,newitem){
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
    }
}


module.exports = ItemsServices