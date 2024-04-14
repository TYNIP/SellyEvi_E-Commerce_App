const { Client } = require('pg');
const { DB } = require('./config');
const images = require('./setupImgDb');

(async () => {

  const usersTable = `
  CREATE TABLE IF NOT EXISTS public.users
  (
      id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
      password character varying(200) COLLATE pg_catalog."default" NOT NULL,
      email text COLLATE pg_catalog."default" NOT NULL,
      firstname character varying(100) COLLATE pg_catalog."default",
      lastname character varying(100) COLLATE pg_catalog."default",
      created timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
      modified timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
      last_log timestamp without time zone,
      CONSTRAINT users_pkey PRIMARY KEY (id),
      CONSTRAINT users_email_key UNIQUE (email)
  )
  `

  const productsTable = `
  CREATE TABLE IF NOT EXISTS public.products
  (
      id integer NOT NULL DEFAULT nextval('products_id_seq'::regclass),
      name character varying(255) COLLATE pg_catalog."default" NOT NULL,
      description text COLLATE pg_catalog."default",
      images text[] COLLATE pg_catalog."default",
      available boolean DEFAULT true,
      created timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
      modified timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
      price integer DEFAULT 0,
      CONSTRAINT products_pkey PRIMARY KEY (id)
  );

    INSERT INTO products (name, price, description, images, available) VALUES (Cheeto Heart, 
        100, 
        An amazing cheeto with the form of a heart. This is a unique masterpiece you wont regret buying,
        ${images.img1}, 
        true);

    INSERT INTO products (name, price, description, images, available) VALUES (Tomato, 
        2, 
        An amazing tomato. This tomato does nothing but is kinda chill... Yeahhhh,
        ${images.img2}, 
        false);

    INSERT INTO products (name, price, description, images, available) VALUES (Chill Papitas, 
        12, 
        This amazing lemon papitas will become your best friend, only if you buy them! What are you waiting for?,
        ${images.img3}, 
        true);

    INSERT INTO products (name, price, description, images, available) VALUES (the Amazing Apple, 
        23, 
        Only one apple is real, the rest are huge cheetos. Can you guess which one is real?,
        ${images.img4}, 
        true);
    INSERT INTO products (name, price, description, images, available) VALUES (Cookies, 
        8, 
        Do you want some cookies? Me too! This is a collection of real cookies. ,
        ${images.img5}, 
        true);

    INSERT INTO products (name, price, description, images, available) VALUES (Friendship, 
        1000, 
        No one has enemies, just people who are not your friends yet,
        ${images.img6}, 
        true);
    
    INSERT INTO products (name, price, description, images, available) VALUES (Guitar, 
        50, 
        Legend says that Julio Jaramillo played this guitar.,
        ${images.img7}, 
        true);
    
    INSERT INTO products (name, price, description, images, available) VALUES (Pan, 
        5, 
        Pan, and not the mexican political party. Just Pan!,
        ${images.img8}, 
        true);
    
    INSERT INTO products (name, price, description, images, available) VALUES (Pepsi, 
        2, 
        The favourite drink of the pepsi cat. "A mi me gusta la pepsi" -Pepsi Cat 2023,
        ${images.img9}, 
        true);
    INSERT INTO products (name, price, description, images, available) VALUES (Tennis Ball, 
        0, 
        A tennis ball. The hand comes apart. ,
        ${images.img10}, 
        false);
  `

  const ordersTable = `
  CREATE TABLE IF NOT EXISTS public.orders
  (
      id integer NOT NULL DEFAULT nextval('orders_id_seq'::regclass),
      created timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
      modified timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
      total integer NOT NULL,
      status character varying(50) COLLATE pg_catalog."default" NOT NULL,
      user_id integer,
      CONSTRAINT orders_pkey PRIMARY KEY (id),
      CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id)
          REFERENCES public.users (id) MATCH SIMPLE
          ON UPDATE NO ACTION
          ON DELETE NO ACTION
  )
  `

  const orderItemsTable = `
  CREATE TABLE IF NOT EXISTS public.order_items
  (
      id integer NOT NULL DEFAULT nextval('order_items_id_seq'::regclass),
      quantity integer NOT NULL,
      created timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
      modified timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
      order_id integer,
      product_id integer,
      price integer DEFAULT 0,
      CONSTRAINT order_items_pkey PRIMARY KEY (id),
      CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id)
          REFERENCES public.orders (id) MATCH SIMPLE
          ON UPDATE NO ACTION
          ON DELETE NO ACTION,
      CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id)
          REFERENCES public.products (id) MATCH SIMPLE
          ON UPDATE NO ACTION
          ON DELETE NO ACTION
  )
  `

  const cartsTable = `
  CREATE TABLE IF NOT EXISTS public.carts
  (
      id integer NOT NULL DEFAULT nextval('carts_id_seq'::regclass),
      created timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
      modified timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
      user_id integer,
      CONSTRAINT carts_pkey PRIMARY KEY (id),
      CONSTRAINT carts_user_id_fkey FOREIGN KEY (user_id)
          REFERENCES public.users (id) MATCH SIMPLE
          ON UPDATE NO ACTION
          ON DELETE NO ACTION
  );
  `

  const cartItemsTable = `
  CREATE TABLE IF NOT EXISTS public.cart_items
  (
      id integer NOT NULL DEFAULT nextval('cart_items_id_seq'::regclass),
      created timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
      modified timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
      product_id integer,
      cart_id integer,
      quantity integer DEFAULT 1,
      price integer DEFAULT 0,
      total numeric GENERATED ALWAYS AS ((quantity * price)) STORED,
      CONSTRAINT cart_items_pkey PRIMARY KEY (id),
      CONSTRAINT cart_items_cart_id_fkey FOREIGN KEY (cart_id)
          REFERENCES public.carts (id) MATCH SIMPLE
          ON UPDATE NO ACTION
          ON DELETE NO ACTION,
      CONSTRAINT cart_items_product_id_fkey FOREIGN KEY (product_id)
          REFERENCES public.products (id) MATCH SIMPLE
          ON UPDATE NO ACTION
          ON DELETE NO ACTION
  )
  `

  try {
    const db = new Client({
      user: DB.PGUSER,
      host: DB.PGHOST,
      database: DB.PGDATABASE,
      password: DB.PGPASSWORD,
      port: DB.PGPORT
    });

    await db.connect();

    // Create tables on database
    await db.query(usersTable);
    await db.query(productsTable);
    await db.query(ordersTable);
    await db.query(orderItemsTable);
    await db.query(cartsTable);
    await db.query(cartItemsTable);

    await db.end();

  } catch(err) {
    console.log("ERROR CREATING ONE OR MORE TABLES: ", err);
  }

})();