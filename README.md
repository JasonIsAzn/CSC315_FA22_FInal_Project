# TODO LIST (Nov 28 - Dec 4)

## JASON TODOs (Priority/Difficult Level: (0- Low, 5- High))

### `BUGS TO FIX`

### `Overall`

- Simple Design Additions or Changes
- Background

### `Customer Pizza`

- Simple Counter of Number of Items (4/1)
  - This counter will require more logic than topping
  - FIRST DO Checkout Page Task.

### `APIs`

- google maps API (5/4)

### `Checkout Page`

- Finish Create Order button (For all pages)
- Have Table Show Pizza and it's Description (3/4)
  - Current Implementation: As Pizza is being added to order, each item on pizza is beging append to selectedItems
  - New Idea Implementation:
    - Implement Funtionally to remove an item such as a pizza or a drink (UI only, will not effect database)
    - How to do this?? IDK. Require more thinking, Base Requirements:
      - Cannot change selectedItems' basic outline and must be properly prep before clicking "confirm"
        - This list is either a pizza or drink
        - Each item contains its type(pizza or drink) and it's descrpition
        - descrption of pizza will contain all item on pizza
        - Make a new list of items. Make a new localStorage
      - We can easily remove an item on this new list
        - make a delete button for each item
        - if clicked then get this button's index, then remove the item from list
        - update text
      - Use this list to display the items
      - display needs button to delete item
      - seleectedItems should be made when clicking "confirm" using the new list
        - can simply iterate through new list
      

### `Special/Drinks`

- images for drinks (1/2)
- images for special pizza (1/2)
