-- DataBase Tables

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    password TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    firstname varchar(100) NOT NULL,
    lastname varchar(100) NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_log TIMESTAMP
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name varchar(250) NOT NULL,
    description TEXT,
    images TEXT[],
    available BOOLEAN,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    price INTEGER NOT NULL
);

CREATE TABLE carts (
    id SERIAL PRIMARY KEY,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER REFERENCES users(id)
);

CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    product_id INTEGER REFERENCES products(id),
    cart_id INTEGER REFERENCES carts(id),
    quantity INTEGER NOT NULL,
    price INTEGER NOT NULL,
    total INTEGER GENERATED ALWAYS AS (quantity * price) STORED
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total INTEGER NOT NULL,
    status varchar(50) NOT NULL,
    user_id INTEGER REFERENCES users(id)
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    quantity INTEGER NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    price INTEGER NOT NULL
);