DROP TABLE IF EXISTS customers;
create table customers (
customer_id bigserial primary key,
customer_name text not null,
customer_adress text not null,
customer_phone text not null
)

insert into customers (
customer_name,customer_adress,customer_phone
)
values
('stefan','123 vanco kitanov','7025952344'),
('david','123 kocani kitanov','078756855');
