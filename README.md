# mern-ecommerce

> Frontend-> Vite JS (React JS)

> Backend-> Node JS & Express JS

> Database-> MongoDB

## Installation process

1. #### clone the repo using this command
   ```bash
   git clone https://github.com/ashraf-kabir/mern-ecommerce.git
   ```
2. #### install npm packages
   1. install backend packages
   ```bash
   cd mern-ecommerce
   npm install
   ```
   2. install frontend packages
   ```bash
   cd frontend
   npm install
   ```
3. go to the parent folder of mern-ecommerce & create .env for connection, JWT_SECRET, BRAINTREE_MERCHANT_ID, BRAINTREE_PUBLIC_KEY and BRAINTREE_PRIVATE_KEY.

   ```bash
   cd mern-ecommerce
   sudo nano .env
   ```

   (ctrl+x to save & nano follow instruction there)

   ##### sample code for backend .env

   ```env
   MONGODB_URI=YOUR_MONGODB_URI
   JWT_SECRET=YOUR_JWT_SECRET
   BRAINTREE_MERCHANT_ID=YOUR_BRAINTREE_MERCHANT_ID
   BRAINTREE_PUBLIC_KEY=YOUR_BRAINTREE_PUBLIC_KEY
   BRAINTREE_PRIVATE_KEY=YOUR_BRAINTREE_PRIVATE_KEY
   ```

4. Frontend config.js

   ```bash
   cd mern-ecommerce/frontend
   sudo nano config.js
   ```

   ##### sample code for frontend config.js

   ```javascript
   export const API = 'http://localhost:5000/api';
   ```

   ##### Instructions:

   1. for mongodb atlas database creation follow this tutorial->https://www.youtube.com/watch?v=KKyag6t98g8
   2. you can use any random string as JWTSECRET
   3. if your backend server is on a different port or domain, update the API URL in config.js accordingly
   4. #### note: add .env on .gitignore
   5. for server deployment use secrets directly

5. <b>deploy this project</b> on your local server by using this command

   ```bash
   cd mern-ecommerce
   npm run dev
   ```

   #### note: both backend & frontend server will start at once with the above command.

6. #### Database Structure: (Schema)
   1. categories: \_id, name, createdAt, updatedAt;
   2. orders: \_id, status, products (Array), transaction_id, amount, address, user (Object), createdAt, updatedAt
   3. products: \_id, photo (Object), sold, name, description, price, category, shipping, quantity, createdAt, updatedAt
   4. users: \_id, role, history (Array), name, email, salt, hashed_password, createdAt, updatedAt

### App Description:

    1. user can view all products
    2. user can view single product
    3. user can search products and view products by category and price range
    4. user can add to cart checkout products using credit card info
    5. user can register & sign in
    6. admin can create, edit, update & delete products
    7. admin can create categories
    8. admin can view ordered products
    9. admin can change the status of a product (processing, shipped, delivered, etc.)
    10. FRONTEND URL: http://localhost:5173/
    11. Project demo will be added soon...


1. <b>Deployed on: (No longer available due to heroku free dyno plan has deprecated)</br> https://ecommerce-ak.herokuapp.com/
2. raise a star to support me
