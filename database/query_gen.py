import random

sauces = {"'alfredo'": 2.50, "'traditional_red'": 1.25, "'zesty_red'": 1.75 }
doughs = {"'regular'": 1.50, "'cauliflower'": 2.50 }
meats = {"'diced_ham'": 1.25, "'pepperoni'": .75, "'salami'": 2.00, "'meatball'": 1.50}
veggies = {"'tomatoes'": .30, "'onions'": .30, "'mushrooms'": .50, "'pineapple'": .75, "'green_peppers'": .30}
drizzles = {"'bbq_sauce'": 1.50, "'ranch'": 1.00, "'siracha'": .50, "'olive_oil'": .50}
drinks = {"'gatorade'": 2.00, "'pepsi'": 2.50, "'mtn_dew'": 2.50, "'aquafina'": 1.50, "'ftn_drink'": 3.00}

customers = ["'anne'", "'bob'", "'carson'", "'david'"]

sql_file_order = open("order_content.sql", "w")
sql_file_item = open("item_content.sql", "w")

# users
sql_file_order.writelines(["INSERT INTO \"user\" (first_name, last_name, username, password, is_manager) VALUES ('James', 'Jackson', 'jj123', 'password123', TRUE);\n"])
sql_file_order.writelines(["INSERT INTO \"user\" (first_name, last_name, username, password, is_manager) VALUES ('Karanja', 'Evans', 'kke2024', 'pizzaIsGood', FALSE);\n"])
sql_file_order.writelines(["INSERT INTO \"user\" (first_name, last_name, username, password, is_manager) VALUES ('Martha', 'Smith', 'ms123', 'marthaIsAwesome', FALSE);\n"])
sql_file_order.writelines(["INSERT INTO \"user\" (first_name, last_name, username, password, is_manager) VALUES ('Guppy', 'NotHuman', 'gp123', 'iLikeTreats', TRUE);\n"])
sql_file_order.writelines(["INSERT INTO \"user\" (first_name, last_name, username, password, is_manager) VALUES ('Paul', 'Barnes', 'pbjelly', 'superSecret', FALSE);\n"])
sql_file_order.writelines(["INSERT INTO \"user\" (first_name, last_name, username, password, is_manager) VALUES ('Ben', 'Thompson', 'bt123', 'notYourPassword', TRUE);\n"])

# TODO: add above data to 'items' table
items, items_list = {}, [sauces, doughs, meats, veggies, drizzles, drinks]
for i in items_list:
    items.update(i)

all_items = list(items.keys())
item_queries = []
for i in all_items:
    name = i
    count = random.randint(30, 500)
    sell_price = items[i]
    type = items_list[random.randint(0, 5)]
    item_queries.append("INSERT INTO item (\"name\", count, price, \"type\") VALUES (" + name + ", " + str(count) + ", " + str(sell_price) + ", " + str(type) + ");\n")


order_id = 1
total_spent = 0
order_queries = []
order_item_queries = []

# normal times (part 1)
while (total_spent < 15000):
    customer_name = customers[random.randint(0, len(customers) - 1)]
    day_num = total_spent // 3000 + 1
    
    # items
    sauce = list(sauces.keys())[random.randint(0, len(sauces.keys()) - 1)]
    dough = list(doughs.keys())[random.randint(0, len(doughs.keys()) - 1)]
    meat = list(meats.keys())[random.randint(0, len(meats.keys()) - 1)]
    veggie = list(veggies.keys())[random.randint(0, len(veggies.keys()) - 1)]
    drizzle = list(drizzles.keys())[random.randint(0, len(drizzles.keys()) - 1)]
    drink = list(drinks.keys())[random.randint(0, len(drinks.keys()) - 1)]

    order_price = (sauces[sauce] + doughs[dough] + meats[meat] + veggies[veggie] + drizzles[drizzle] + drinks[drink])
    total_spent += order_price
    order_queries.append("INSERT INTO \"order\" (customer_name, total_cost, num_toppings, time_stamp, server_id) VALUES (" + customer_name + ", " + str(round(order_price, 2)) + ", " + str(3) + ", '2022-10-" + str(int(day_num)) + "', " + str(random.randint(1, 6)) + ");\n")

    # TODO: add entries to order_item
    curr_items = [sauce, dough, meat, veggie, drizzle, drink]
    for i in curr_items:
        item_id = all_items.index(i) + 1
        order_item_queries.append("INSERT INTO order_item (order_id, item_id, recorded) VALUES (" + str(order_id) + ", " + str(item_id) + ", FALSE); \n")

    order_id += 1


# # game day 1
# day_num = total_spent // 3000 + 1
# while (total_spent < 27000):
#     customer_name = customers[random.randint(0, len(customers) - 1)]
    
#     # items
#     sauce = list(sauces.keys())[random.randint(0, len(sauces.keys()) - 1)]
#     dough = list(doughs.keys())[random.randint(0, len(doughs.keys()) - 1)]
#     meat = list(meats.keys())[random.randint(0, len(meats.keys()) - 1)]
#     veggie = list(veggies.keys())[random.randint(0, len(veggies.keys()) - 1)]
#     drizzle = list(drizzles.keys())[random.randint(0, len(drizzles.keys()) - 1)]
#     drink = list(drinks.keys())[random.randint(0, len(drinks.keys()) - 1)]

#     order_price = (sauces[sauce] + doughs[dough] + meats[meat] + veggies[veggie] + drizzles[drizzle] + drinks[drink])
#     total_spent += order_price
#     order_queries.append("INSERT INTO \"order\" (customer_name, total_cost, num_toppings, time_stamp, server_id) VALUES (" + customer_name + ", " + str(round(order_price, 2)) + ", " + str(3) + ", '2022-10-" + str(int(day_num)) + "', " + str(random.randint(1, 6)) + ");\n")

#     # TODO: add entries to order_item
#     curr_items = [sauce, dough, meat, veggie, drizzle, drink]
#     for i in curr_items:
#         item_id = all_items.index(i) + 1
#         order_item_queries.append("INSERT INTO order_item (order_id, item_id, recorded) VALUES (" + str(order_id) + ", " + str(item_id) + ", FALSE); \n")

#     order_id += 1



# # normal times (part 2)
# while (total_spent < 48000):
#     customer_name = customers[random.randint(0, len(customers) - 1)]
#     day_num = total_spent // 3000 - 2
    
#     # items
#     sauce = list(sauces.keys())[random.randint(0, len(sauces.keys()) - 1)]
#     dough = list(doughs.keys())[random.randint(0, len(doughs.keys()) - 1)]
#     meat = list(meats.keys())[random.randint(0, len(meats.keys()) - 1)]
#     veggie = list(veggies.keys())[random.randint(0, len(veggies.keys()) - 1)]
#     drizzle = list(drizzles.keys())[random.randint(0, len(drizzles.keys()) - 1)]
#     drink = list(drinks.keys())[random.randint(0, len(drinks.keys()) - 1)]

#     order_price = (sauces[sauce] + doughs[dough] + meats[meat] + veggies[veggie] + drizzles[drizzle] + drinks[drink])
#     total_spent += order_price
#     order_queries.append("INSERT INTO \"order\" (customer_name, total_cost, num_toppings, time_stamp, server_id) VALUES (" + customer_name + ", " + str(round(order_price, 2)) + ", " + str(3) + ", '2022-10-" + str(int(day_num)) + "', " + str(random.randint(1, 6)) + ");\n")

#     # TODO: add entries to order_item
#     curr_items = [sauce, dough, meat, veggie, drizzle, drink]
#     for i in curr_items:
#         item_id = all_items.index(i) + 1
#         order_item_queries.append("INSERT INTO order_item (order_id, item_id, recorded) VALUES (" + str(order_id) + ", " + str(item_id) + ", FALSE); \n")

#     order_id += 1


# # game day 2
# day_num = total_spent // 3000 - 2
# while (total_spent < 60000):
#     customer_name = customers[random.randint(0, len(customers) - 1)]
    
#     # items
#     sauce = list(sauces.keys())[random.randint(0, len(sauces.keys()) - 1)]
#     dough = list(doughs.keys())[random.randint(0, len(doughs.keys()) - 1)]
#     meat = list(meats.keys())[random.randint(0, len(meats.keys()) - 1)]
#     veggie = list(veggies.keys())[random.randint(0, len(veggies.keys()) - 1)]
#     drizzle = list(drizzles.keys())[random.randint(0, len(drizzles.keys()) - 1)]
#     drink = list(drinks.keys())[random.randint(0, len(drinks.keys()) - 1)]

#     order_price = (sauces[sauce] + doughs[dough] + meats[meat] + veggies[veggie] + drizzles[drizzle] + drinks[drink])
#     total_spent += order_price
#     order_queries.append("INSERT INTO \"order\" (customer_name, total_cost, num_toppings, time_stamp, server_id) VALUES (" + customer_name + ", " + str(round(order_price, 2)) + ", " + str(3) + ", '2022-10-" + str(int(day_num)) + "', " + str(random.randint(1, 6)) + ");\n")

#     # TODO: add entries to order_item
#     curr_items = [sauce, dough, meat, veggie, drizzle, drink]
#     for i in curr_items:
#         item_id = all_items.index(i) + 1
#         order_item_queries.append("INSERT INTO order_item (order_id, item_id, recorded) VALUES (" + str(order_id) + ", " + str(item_id) + ", FALSE); \n")

#     order_id += 1



# # normal times (part 3)
# while (total_spent < 84000):
#     customer_name = customers[random.randint(0, len(customers) - 1)]
#     day_num = total_spent // 3000 - 5
    
#     # items
#     sauce = list(sauces.keys())[random.randint(0, len(sauces.keys()) - 1)]
#     dough = list(doughs.keys())[random.randint(0, len(doughs.keys()) - 1)]
#     meat = list(meats.keys())[random.randint(0, len(meats.keys()) - 1)]
#     veggie = list(veggies.keys())[random.randint(0, len(veggies.keys()) - 1)]
#     drizzle = list(drizzles.keys())[random.randint(0, len(drizzles.keys()) - 1)]
#     drink = list(drinks.keys())[random.randint(0, len(drinks.keys()) - 1)]

#     order_price = (sauces[sauce] + doughs[dough] + meats[meat] + veggies[veggie] + drizzles[drizzle] + drinks[drink])
#     total_spent += order_price
#     order_queries.append("INSERT INTO \"order\" (customer_name, total_cost, num_toppings, time_stamp, server_id) VALUES (" + customer_name + ", " + str(round(order_price, 2)) + ", " + str(3) + ", '2022-10-" + str(int(day_num)) + "', " + str(random.randint(1, 6)) + ");\n")

#     # TODO: add entries to order_item
#     curr_items = [sauce, dough, meat, veggie, drizzle, drink]
#     for i in curr_items:
#         item_id = all_items.index(i) + 1
#         order_item_queries.append("INSERT INTO order_item (order_id, item_id, recorded) VALUES (" + str(order_id) + ", " + str(item_id) + ", FALSE); \n")

#     order_id += 1



sql_file_order.writelines(order_queries)

sql_file_item.writelines(item_queries)
sql_file_item.writelines("\n")
sql_file_item.writelines(order_item_queries)


print("go check out the files!")