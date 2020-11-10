--Create customers Table
DROP TABLE IF EXISTS customers;
create table customers (
customer_id bigserial primary key,
customer_name text not null,
customer_adress text not null,
customer_phone text not null,
customer_email text
);

--Create TypeFood table
drop table if exists item_types;
create table item_types(
type_id bigserial primary key,
type_name text not null
);

--Create ItemFood table
DROP TABLE IF EXISTS items;
create table items (
item_id bigserial primary key,
item_name text not null,
item_price float not null,
type_id_fk bigint references item_types(type_id)
);

--Create Active Order for customers table
drop table if exists order_customers;
create table order_customers(
order_customer_id bigserial primary key,
customer_id_fk bigint references customers(customer_id),
order_date timestamp default now() not null
);

--Create Active Order for items table
drop table if exists order_items;
create table orders_items(
order_item_id bigserial primary key,
item_id_fk bigint references items(item_id),
order_quantity integer not null default 1,
customer_id_fk bigint references order_customers(order_customer_id)
);
