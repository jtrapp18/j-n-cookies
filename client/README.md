# Rental Management Tool

## About this project

The **Cookie Store** is an online cookie store that allows users to view the cookie menu and search and filter cookies. Users can also create and log into accounts using secure authorization, which will allow them to access additional features, such as managing their carts and account information.

## Contributors

**Jacqueline Trapp**  
GitHub: [JTrapp18](https://github.com/jtrapp18)

**Nem Stankovic**  
GitHub: [Nemswirls](https://github.com/nemswirls)

## Features

- **View Menu**: View cookie menu, search for cookies by name, filter on one or more cookie attributes (maximum price, minimum rating, gluten-free, nut-free, frosted, favorited).
- **Create User Account**: Log in or sign up to access full features of the cookie store. 
- **Manage Account Information**: View and edit user information.
- **Manage Cart**: Add/remove cookies to/from cart, and update number of cookies.
- **Order Cookies**: Place mock orders for cookies and view past orders.

## Technical

- **Hierarchical Menu System**: Implements a tree structure using `Node` instances to provide dynamic, multi-level menu navigation with parent-child relationships.
- **Customizable Actions**: Each `Node` can trigger user-defined procedures, allowing for dynamic operations like filtering tenants or viewing payment details.
- **Dynamic Menu Navigation**: Built with `MenuTree` and `Node` classes, enabling an expandable, user-friendly navigation structure.
- **CLI Interface with Custom ASCII Art**: A command-line interface enhanced with rich text formatting and custom ASCII art for improved user experience.
- **Modular and Extendable**: Easily extend the menu system to support future features and operations like tenant or payment management.
- **Procedural Chaining**: Seamlessly chain multiple actions (e.g., saving data and generating receipts) for greater flexibility in workflows.
- **Database Integration & CRUD Operations**: Manages database interactions for creating, reading, updating, and deleting records, with SQL (SQLite or chosen database).
- **Data Binding**: Menu `Node` instances bind dynamically to data, such as tenants or payments, enabling users to view and edit records interactively.
- **Input Validation**: Ensures that only valid data is entered into the system with custom validation functions for all key attributes (e.g., description, payment amounts).
- **SQL Helper Functions**: SQL functions abstracted for simplified database interactions, making it easier to execute CRUD operations.
- **Well-Organized Codebase**: The project is structured with clear separation of concerns, including dedicated modules for database models, helpers, and menu navigation.

## Demo

See this gif for an example of how the app works.

![demo](https://github.com/jtrapp18/rental_management_tool/blob/main/img/rental_management_tool.gif?raw=true)

## Setup

1. Fork and clone this repo to your local machine.
2. Run `pipenv install` to install dependencies.
3. Run `pipenv shell` to activate the virtual environment.
4. Run `pipenv run start` to launch the application in the CLI.

## Description of Key Directories and Files

- **`src/lib/database/`**: Contains models and CRUD operations for `Expense`, `Payment`, `Tenant`, and `Unit` data.
  
- **`src/lib/helper/`**: Utility files for:
  - **`ascii.py`**: Functions for displaying ASCII art and formatted text.
  - **`report.py`**: Functions for generating PDF income reports based on stored data.
  - **`sql_helper.py`**: Helper functions that simplify database queries and operations.
  - **`validation.py`**: Custom validation functions to ensure data integrity (e.g., valid payment amounts, description lengths).

- **`src/lib/tree/`**: Menu and navigation components:
  - **`menu_tree.py`**: Defines the menu structure, with options and navigation.
  - **`populate_menu.py`**: Manages the population of menu options and linking actions to user interactions.

- **`_1_seeds.py`**: Used for seeding the database with initial test data.
- **`_2_cli.py`**: The entry point for the CLI interface, where users interact with the application.

- **`img/`**: Contains image assets used in the application.
- **`Pipfile`**: Defines project dependencies and virtual environment setup.
- **`rental_management_db`**: Database which stores relevant data.