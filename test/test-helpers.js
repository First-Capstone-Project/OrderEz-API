function makeCustomersArray() {
    return [
        {
            customer_id : '1',
            customer_name : 'Customer-1',
            customer_adress: 'Test-Adress',
            customer_phone: '223305',
            customer_email: 'test@email.com',
        },
        {
            customer_id : '2',
            customer_name : 'Customer-2',
            customer_adress: 'Test2-Adress',
            customer_phone: '2233052',
            customer_email: 'test2@email.com',
        }
    ]
}
function makeItemsArray() {
    return [
        {
            item_id : '1',
            item_name : 'Item-1',
            item_price: '1',
            type_id_fk: '1',
            
        },
        {
            item_id : '2',
            item_name : 'Item-2',
            item_price: '2',
            type_id_fk: '2',
        }
    ]
}
function makeTypesArray() {
    return [
        {
            type_id : '1',
            type_name : 'type-1',
        },
        {
            type_id : '2',
            type_name : 'type-2',
        }
    ]
}
function makeOrderArray(){
    return [
        {
            order_customer_id: '1',
            customer_id_fk: '1',
        }
    ]
}


function makeFixtures () {
    const testcustomers = makeCustomersArray()
    const testitems = makeItemsArray()
    const testtypes = makeTypesArray()
    const testorders = makeOrderArray()
    return {testcustomers,testitems,testtypes,testorders}
}

function seedOrdersTables(db, order) {
    return db
      .into('order_customers')
      .insert(order)
}
function seedItemsTables(db, items) {
    return db
      .into('items')
      .insert(items)
}
function seedTypesTables(db, types) {
    return db
      .into('item_types')
      .insert(types)
}

function seedCustomersTables(db, customers) {
    return db
      .into('customers')
      .insert(customers)
}

function cleanTables(db) {
    return db.raw(
      `TRUNCATE
        customers,
        item_types,
        items,
        order_customers,
        orders_items
        RESTART IDENTITY CASCADE`
    )
  }

  module.exports = {
      cleanTables,
      makeCustomersArray,
      seedCustomersTables,
      makeFixtures,
      makeItemsArray,
      seedItemsTables,
      seedTypesTables,
      makeTypesArray,
      makeOrderArray,
      seedOrdersTables
  }

