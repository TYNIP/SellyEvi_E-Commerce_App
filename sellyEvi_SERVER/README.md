# SERVER - SellyEvi | E-commerce APP

## Endpoint | Paths
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