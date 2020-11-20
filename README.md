
## Set up OrderEZ API

1. Clone this repository to your local machine `git clone https://github.com/First-Capstone-Project/OrderEz-API
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`
5. Move the example Environment file to `.env` that will be ignored by git and read by the express server `mv example.env .env`


## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## API Documentation

# Customers routes
-GET /customers : returns all customers
-POST /customers: create a new customer

-GET /customers/:customer_id : returns specific customer by ID
-PATCH /customers/:customer_id : edit specific customer by ID
-DELETE /customers/:customer_id : delete specific customer by ID

-GET /filter/:num : filter customers by phone number

# Items routes
-GET /items : returns all items
-POST /items : creates a new item

-GET /items/:item_id : returns specific item by ID
-PATCH /items/:item_id : edit specific item by ID
-DELETE /items/:item_id : delete specific item by ID

-GET /types : returns all types
-GET /type/:type_id : returns specific type by ID

# Orders routes
-POST /orders : create a new order
-POST /newitem : adds new item to an order

-GET /reciept/:c_id : returns specific reciept by ID
-GET /get/:id : returns specific order and the customer for that order by ID
-GET /active/:name : filters active orders by name
