import React from "react";

export default function Documentation() {
  return (
    <div className="h-screen w-full flex flex-col items-center">
      <div className="my-[.5%] px-[20%]">
        <h1 className="text-[#4FC3F7] text-8xl font-semibold ml-[20%] mb-[1%]">
          Documentation
        </h1>
        <p className="text-gray-400 text-xl border rounded-lg border-2 p-[1%]">
          Note: We tried our best to find a way to auto-generate documentation
          for our project, but it doesn't seem that React has any good libraries
          for doing so in the manner the deliverable called for; we experimented
          with several seemingly viable libraries and were unable to achieve
          favorable results. Due to this unfortunate situation, we created this
          page to house our documentation for our project's most important
          aspects.
        </p>
      </div>

      <div className="px-[10%] py-[1%]">
        <h1 className="my-[2%] text-[#4FC3F7] text-6xl font-semibold">
          Functions
        </h1>
        <div className="border border-2 rounded-lg p-[1%]">
          <h3 className="text-gray-600 font-semibold text-3xl mb-[1%]">
            handleAddItem
          </h3>
          <p className="text-gray-500 text-lg font-semibold mb-[3%]">
            Adds a new item to the system based on details (name, price, count,
            type) provided by the user. It handles accounting for the new item
            all throughout the UI/UX and adds the new item's details to the
            'item' table in the app's database.
          </p>

          <h3 className="text-gray-600 font-semibold text-3xl mb-[1%]">
            handleUpdateItem
          </h3>
          <p className="text-gray-500 text-lg font-semibold mb-[3%]">
            Updates an existing item in the system based on details (name,
            price, count, type) provided by the user. It handles accounting for
            the updated item all throughout the UI/UX and updates the item's
            details in the 'item' table in the app's database.
          </p>

          <h3 className="text-gray-600 font-semibold text-3xl mb-[1%]">
            handleRestockReport
          </h3>
          <p className="text-gray-500 text-lg font-semibold mb-[3%]">
            Filters inventory data table such that only items with 'count'
            values below the user provided threshold remain.
          </p>

          <h3 className="text-gray-600 font-semibold text-3xl mb-[1%]">
            handleExcessReport
          </h3>
          <p className="text-gray-500 text-lg font-semibold mb-[3%]">
            Determines the inventory counts of all items on a previous date
            specified by the user, then uses this knowledge to generate a table
            describing what percentage of each item has been sold from the user
            specified date up until the current date.
          </p>

          <h3 className="text-gray-600 font-semibold text-3xl mb-[1%]">
            handleSalesReport
          </h3>
          <p className="text-gray-500 text-lg font-semibold mb-[3%]">
            Filters sales data table such that only orders whose date falls
            between a user provided start and end date are included in the
            table.
          </p>

          <h3 className="text-gray-600 font-semibold text-3xl mb-[1%]">
            handleComboReport
          </h3>
          <p className="text-gray-500 text-lg font-semibold mb-[3%]">
            Determines how many times each combination of items in a
            predetermined list has been bought together in the same order since
            a date specified by the user. Gives user a sense of which
            combinations are most/least popular.
          </p>

          <h3 className="text-gray-600 font-semibold text-3xl mb-[1%]">
            handleSubmission
          </h3>
          <p className="text-gray-500 text-lg font-semibold">
            Computes total associated with all items selected by user to be part
            of a new order, then accounts for this new order all throughout the
            system. In the UI/UX and database, the selected items' quantities
            are all reduced to account for the use of inventory and the order is
            accounted for in the restaurant's sales data.
          </p>
        </div>

        <h1 className="my-[2%] text-[#4FC3F7] text-6xl font-semibold mt-[4%]">
          Components & Pages
        </h1>

        <div className="border border-2 rounded-lg p-[1%]">
          <h3 className="text-gray-600 font-semibold text-3xl mb-[1%]">
            ItemAdder
          </h3>
          <p className="text-gray-500 text-lg font-semibold mb-[3%]">
            Adds a new item to the system based on details (name, price, count,
            type) provided by the user. It handles accounting for the new item
            all throughout the UI/UX and adds the new item's details to the
            'item' table in the app's database.
          </p>
          <h3 className="text-gray-600 font-semibold text-3xl mb-[1%]">
            ItemEditor
          </h3>
          <p className="text-gray-500 text-lg font-semibold mb-[3%]">
            Updates an existing item in the system based on details (name,
            price, count, type) provided by the user. It handles accounting for
            the updated item all throughout the UI/UX and updates the item's
            details in the 'item' table in the app's database.
          </p>
          <h3 className="text-gray-600 font-semibold text-3xl mb-[1%]">
            Login
          </h3>
          <p className="text-gray-500 text-lg font-semibold mb-[3%]">
            Landing page for our app; this is where user can login with Google
            (or go on as a guest). This is also where all relevant app data is
            brought over from database.
          </p>
          <h3 className="text-gray-600 font-semibold text-3xl mb-[1%]">Home</h3>
          <p className="text-gray-500 text-lg font-semibold mb-[3%]">
            Home page where user can select the mode (manager, server, or
            customer) they're looking to use the app in.
          </p>
          <h3 className="text-gray-600 font-semibold text-3xl mb-[1%]">
            Locations
          </h3>
          <p className="text-gray-500 text-lg font-semibold mb-[3%]">
            Page where Google Maps functionality is found.
          </p>
          <h3 className="text-gray-600 font-semibold text-3xl mb-[1%]">
            Server
          </h3>
          <p className="text-gray-500 text-lg font-semibold mb-[3%]">
            Page where server users can create orders for customers.
          </p>

          <h3 className="text-gray-600 font-semibold text-3xl mb-[1%]">
            Submission
          </h3>
          <p className="text-gray-500 text-lg font-semibold mb-[3%]">
            Page where server users can process orders for customers.
          </p>

          <h3 className="text-gray-600 font-semibold text-3xl mb-[1%]">
            Inventory
          </h3>
          <p className="text-gray-500 text-lg font-semibold mb-[3%]">
            Page where manager users can monitor their inventory levels,
            add/update items in their system, and access restock and excess
            reports.
          </p>

          <h3 className="text-gray-600 font-semibold text-3xl mb-[1%]">
            Sales
          </h3>
          <p className="text-gray-500 text-lg font-semibold mb-[3%]">
            Page where manager users can monitor their sales data and access
            sales and combo report.
          </p>

          <h3 className="text-gray-600 font-semibold text-3xl mb-[1%]">
            Customer
          </h3>
          <p className="text-gray-500 text-lg font-semibold mb-[3%]">
            Base page for customer mode of application; this is where customer
            users start creating their order.
          </p>

          <h3 className="text-gray-600 font-semibold text-3xl mb-[1%]">
            Drinks
          </h3>
          <p className="text-gray-500 text-lg font-semibold mb-[3%]">
            Page where customer users can select their order's drink(s).
          </p>

          <h3 className="text-gray-600 font-semibold text-3xl mb-[1%]">
            Toppings
          </h3>
          <p className="text-gray-500 text-lg font-semibold mb-[3%]">
            Page where customer users can start choosing their toppings.
          </p>

          <h3 className="text-gray-600 font-semibold text-3xl mb-[1%]">
            Sauces
          </h3>
          <p className="text-gray-500 text-lg font-semibold mb-[3%]">
            Page where customer users can select their order's sauce(s).
          </p>

          <h3 className="text-gray-600 font-semibold text-3xl mb-[1%]">
            Veggies
          </h3>
          <p className="text-gray-500 text-lg font-semibold mb-[3%]">
            Page where customer users can select their order's veggie(s).
          </p>

          <h3 className="text-gray-600 font-semibold text-3xl mb-[1%]">
            Drizzles
          </h3>
          <p className="text-gray-500 text-lg font-semibold">
            Page where customer users can select their order's drizzle(s).
          </p>
        </div>
      </div>
    </div>
  );
}
