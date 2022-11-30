CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    first_name text,
    last_name text,
    username text,
    password text,
    is_manager boolean
);

CREATE TABLE item (
    id SERIAL PRIMARY KEY,
    "name" text,
    count int, 
    price float,
    "type" text
);

CREATE TABLE "order" (
    id SERIAL PRIMARY KEY,
    customer_name text,
    total_cost float,
    num_toppings int,
    time_stamp date,
    server_id int, 
    FOREIGN KEY (server_id) REFERENCES "user"(id)
);


CREATE TABLE order_item (
    order_id int, 
    item_id int,
    recorded boolean,
    FOREIGN KEY (order_id) REFERENCES "order"(id),
    FOREIGN KEY (item_id) REFERENCES item(id)
);

CREATE TABLE vendor_item (
    "name" text,
    item_id int,
    cost float,
    FOREIGN KEY (item_id) REFERENCES item(id)
);

CREATE TABLE purchase(
    vendor_name text,
    item_id int,
    quantity int,
    time_stamp date,
    FOREIGN KEY (item_id) REFERENCES item(id)
);


DROP TABLE order_item, vendor_item, purchase, item, "order", "user";  

GRANT ALL PRIVILEGES ON item TO csce315_909_evans;
GRANT ALL PRIVILEGES ON item TO csce315_909_narwekar;
GRANT ALL PRIVILEGES ON item TO csce315_909_oliai;
GRANT ALL PRIVILEGES ON item TO csce315_909_ordonez;
GRANT ALL PRIVILEGES ON item TO csce315_909_tran;


GRANT ALL PRIVILEGES ON "order" TO csce315_909_evans;
GRANT ALL PRIVILEGES ON "order" TO csce315_909_narwekar;
GRANT ALL PRIVILEGES ON "order" TO csce315_909_oliai;
GRANT ALL PRIVILEGES ON "order" TO csce315_909_ordonez;
GRANT ALL PRIVILEGES ON "order" TO csce315_909_tran;

GRANT ALL PRIVILEGES ON order_item TO csce315_909_evans;
GRANT ALL PRIVILEGES ON order_item TO csce315_909_narwekar;
GRANT ALL PRIVILEGES ON order_item TO csce315_909_oliai;
GRANT ALL PRIVILEGES ON order_item TO csce315_909_ordonez;
GRANT ALL PRIVILEGES ON order_item TO csce315_909_tran;


GRANT ALL PRIVILEGES ON vendor_item TO csce315_909_evans;
GRANT ALL PRIVILEGES ON vendor_item TO csce315_909_narwekar;
GRANT ALL PRIVILEGES ON vendor_item TO csce315_909_oliai;
GRANT ALL PRIVILEGES ON vendor_item TO csce315_909_ordonez;
GRANT ALL PRIVILEGES ON vendor_item csce315_909_tran;

GRANT ALL PRIVILEGES ON "user" TO csce315_909_evans;
GRANT ALL PRIVILEGES ON "user" TO csce315_909_narwekar;
GRANT ALL PRIVILEGES ON "user" TO csce315_909_oliai;
GRANT ALL PRIVILEGES ON "user" TO csce315_909_ordonez;
GRANT ALL PRIVILEGES ON "user" TO csce315_909_tran;

GRANT ALL PRIVILEGES ON purchase TO csce315_909_evans;
GRANT ALL PRIVILEGES ON purchase TO csce315_909_narwekar;
GRANT ALL PRIVILEGES ON purchase TO csce315_909_oliai;
GRANT ALL PRIVILEGES ON purchase TO csce315_909_ordonez;
GRANT ALL PRIVILEGES ON purchase TO csce315_909_tran;

GRANT USAGE, SELECT ON SEQUENCE item_id_seq TO csce315_909_evans;
GRANT USAGE, SELECT ON SEQUENCE item_id_seq TO csce315_909_narwekar;
GRANT USAGE, SELECT ON SEQUENCE item_id_seq TO csce315_909_oliai;
GRANT USAGE, SELECT ON SEQUENCE item_id_seq TO csce315_909_ordonez;
GRANT USAGE, SELECT ON SEQUENCE item_id_seq TO csce315_909_tran;
