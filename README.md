# TODO LIST (Nov 28 - Dec 4)

## JASON TODOs (Priority/Difficult Level: (0- Low, 5- High))

### `Overall`

- Simple Design Additions or Changes
- Background

### `Customer Pizza`

- Simple Counter of Number of Items (4/1)
  - This counter will require more logic than topping
  - FIRST DO Checkout Page Task.
- Auto Selecting no sauce (2/2)
- Topping Description (3/2)
  - Update when page is launched and when button is clicked
  - when page is launched. simple script if item is cheacked then append, then load description, update mapping
  - when butt is clicked, do same, update mapping
  - map the list

### `APIs`

- google maps API (5/4)

### `Checkout Page`

- Have Table Show Pizza and it's Description (3/4)
  - Current Implementation: As Pizza is being added to order, each item on pizza is beging append to selectedItems
  - New Idea Implementation:
    - Implement Funtionally to remove an item such as a pizza or a drink
    - How to do this?? IDK. Require more thinking, Base Requirements:
      - Cannot change selectedItems' basic outline and must be properly prep before clicking "confirm"
        - This list is either a pizza or drink
        - Each item contains its type(pizza or drink) and it's descrpition
        - descrption of pizza will contain all item on pizza
        - Make a new list of items. Make a new global context?
      - We can easily remove an item on this new list
      - Use this list to display the items
      - display needs button to delete item
      - seleectedItems should be made when clicking "confirm" using the new list
        - can simply iterate through new list

### `Special/Drinks`

- images for drinks (1/2)
- images for special pizza (1/2)
