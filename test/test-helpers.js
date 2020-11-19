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

function makeFixtures () {
    const testcustomers = makeCustomersArray()

    return {testcustomers}
}

function makeExpected(customers){

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
      makeExpected
  }