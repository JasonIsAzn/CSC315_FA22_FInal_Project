SELECT COUNT(*) FROM order_item, item WHERE item.id = order_item.item_id and item.name = 'ftn_drink'; 

SELECT SUM(total_cost) FROM "order" WHERE time_stamp = '2022-10-5';

SELECT SUM(total_cost) FROM "order" WHERE time_stamp = '2022-10-7';

SELECT SUM(total_cost) FROM "order" WHERE time_stamp = '2022-10-22';

SELECT SUM(total_cost) FROM "order" WHERE time_stamp = '2022-10-14';

SELECT SUM(total_cost) FROM "order" WHERE time_stamp BETWEEN '2022-10-8' AND '2022-10-15';

SELECT MAX(total_cost) FROM "order";

SELECT count FROM item WHERE name = 'pepperoni';

SELECT name, count FROM item WHERE count = (SELECT MIN(count) FROM item);

SELECT first_name, last_name FROM "user" WHERE is_manager = FALSE;

SELECT COUNT(*) FROM order_item, item WHERE item.id = order_item.item_id and item.name = 'alfredo'; 

SELECT COUNT(DISTINCT time_stamp) FROM "order";

SELECT AVG(total_cost) FROM "order";

SELECT SUM(total_cost) FROM "order";

UPDATE item
SET type = 'topping-meat' 
WHERE id in (9, 6, 7, 8);

UPDATE item
SET type = 'topping-veggie' 
WHERE id in (10, 11, 13, 14, 12, 25);

INSERT INTO item ("name", count, price, "type") VALUES ('italian_sausage', 340, 1.0, 'topping-meat');
INSERT INTO item ("name", count, price, "type") VALUES ('smoked_chicken', 334, 1.5, 'topping-meat');
INSERT INTO item ("name", count, price, "type") VALUES ('banana_peppers', 334, 1.5, 'topping-veggie');
INSERT INTO item ("name", count, price, "type") VALUES ('black_olives', 334, 1.5, 'topping-veggie');
INSERT INTO item ("name", count, price, "type") VALUES ('jalapenos', 334, 1.5, 'topping-veggie');
INSERT INTO item ("name", count, price, "type") VALUES ('roasted_garlic', 334, 1.5, 'topping-veggie');
INSERT INTO item ("name", count, price, "type") VALUES ('spinach', 334, 1.5, 'topping-veggie');
INSERT INTO item ("name", count, price, "type") VALUES ('oregano', 300, 1.5, 'drizzle');