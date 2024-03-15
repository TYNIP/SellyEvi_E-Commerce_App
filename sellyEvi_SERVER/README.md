# SERVER - SellyEvi | E-commerce APP
API that serves the backend and function for the Selly Evi e-commerce application.

[CLIENT - SellyEvi](../sellyEvi_CLIENT/README.md)

## API Structure

The API follows a modular structure, with each component responsible for a specific aspect of the application:

- **index.js**: Entry point of the application, starts the server.
- **loader folder**: Manages middleware, authentication using Passport, and sets up Swagger documentation.
- **routes folder**: Defines all API endpoints and connects them to corresponding service functions.
- **services folder**: Handles business logic and calls functions from the model folder.
- **models folder**: Interacts with the PostgreSQL database and performs CRUD operations.

## Data Base ERD
![DB ERD](./resources/ERD_SELLY_EVI.png)

## Endpoint | Paths

**DOCUMENTATION AT '/docs' path**

#### /auth/____
| Paths                 | HTTP Verb | Purpose                        |
|-----------------------|-----------|--------------------------------|
| /register             | GET       | Sign up user                   |
| /login                | GET       | Log in user                    |

#### /carts/____
| Paths                   | HTTP Verb | Purpose                        |
|-------------------------|-----------|--------------------------------|
| /cart                   | GET       | Get user cart                  |
| /cart                   | PUT       | Update user cart               |
| /cart                   | POST      | Create user cart               |
| /cart/items             | POST      | Add item to user cart          |
| /cart/items/:cartItemId | PUT       | Update item from user cart     |
| /cart/items/:cartItemId | DELETE    | Delete item from user cart     |
| /cart/checkout          | POST      | Checkout user cart             |

#### /orders____
| Paths                 | HTTP Verb | Purpose                        |
|-----------------------|-----------|--------------------------------|
| /                     | GET       | Get user orders                |
| /:orderId             | GET       | Find user order                |

#### /products____
| Paths                 | HTTP Verb | Purpose                        |
|-----------------------|-----------|--------------------------------|
| /                     | GET       | Get user products              |
| /:productId           | GET       | Find user product              |

#### /users____
| Paths                 | HTTP Verb | Purpose                        |
|-----------------------|-----------|--------------------------------|
| /:userId              | GET       | Get user                       |
| /:userId              | PUT       | Update user info               |

## Features

- **User Authentication**: Users can sign up for an account and log in securely.
- **User Management**: Users can view their profile information and update it as needed.
- **Cart Management**: Users can view, add items to, update, and delete items from their shopping cart.
- **Order Management**: Users can view their order history and details of individual orders.
- **Product Management**: Users can view the list of available products and product details.

## API Security

- **Authentication**: Users can sign up or log in using username and password authentication.
- **Authorization**: Access to certain endpoints is restricted based on user roles and permissions.
- **Data Encryption**: Passwords and sensitive information are stored securely using encryption techniques.
- **CORS**: Cross-Origin Resource Sharing is enabled to control which domains can access the API resources.

## Technologies Used
- Node.js
- Express.js
- PostgreSQL
- Passport.js (for authentication)
- Stripe (for payment processing)
- Swagger (for API documentation)
- js-yaml (for YAML file generation)
- luxon.js (for date/time manipulation)
- cors: Middleware for enabling CORS (Cross-Origin Resource Sharing).
- dotenv: Loads environment variables from a .env file.
- express-session: Middleware for managing session data.
- http-errors: Creates HTTP error objects.
- passport-local: Passport strategy for authenticating with a username and password.
