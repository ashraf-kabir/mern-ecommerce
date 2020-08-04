# mern-ecommerce

> Frontend-> React JS

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
    cd client
    npm install
    ```
3. go to the config folder at mern-ecommerce/config & create default.json of mongoDB connection, JWT_SECRET, BRAINTREE_MERCHANT_ID, BRAINTREE_PUBLIC_KEY and BRAINTREE_PRIVATE_KEY.

    ```bash
    cd mern-ecommerce
    cd config
    cat >> default.json
    ```
    (Ctrl+c to exit previous command)
    
    ##### sample code for default.json
    ```json
    {
      "MONGODB_URI": "YOUR_MONGODB_URI",
      "JWT_SECRET": "YOUR_JWT_SECRET",
      "BRAINTREE_MERCHANT_ID": "YOUR_BRAINTREE_MERCHANT_ID",
      "BRAINTREE_PUBLIC_KEY": "YOUR_BRAINTREE_PUBLIC_KEY",
      "BRAINTREE_PRIVATE_KEY": "YOUR_BRAINTREE_PRIVATE_KEY"
    }

    ```
    ##### Instructions:
    1. for mongodb atlas database creation follow this tutorial->https://www.youtube.com/watch?v=KKyag6t98g8
    2. you can use any random string as jwtSecret
    3. for generating github token follow this link->https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token
    4. #### note: gitignore the default.json file

4. <b>deploy this project</b> on your local server by using this command
    ```bash
    mern-ecommerce
    npm run dev
    ```
    #### note: both backend & frontend server will start at once with the above command.

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

5. <b>Deployed on</br> https://ecommerce-ak.herokuapp.com/ 