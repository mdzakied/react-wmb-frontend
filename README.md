<h1 align="center" id="title">react-wmb-fronted</h1>


<p align="center" id="description">Demo web app for managing data resto 'warung makan bahari'.</p>


<h2>🧐 Features</h2>

Here're some of the project's best features :

*  Login Page :
    * Login Superadmin and Admin
    
*  Menu Page :
    * Add Menu with Optional Upload Image
    * Get All Menu with Pagination
    * Get Menu with Filter :
        * Menu Name
        * Min Price
        * Max Price
    * Edit Menu with Optional Upload Image
    * Delete Menu
      
* Table Page :
    * Add Table
    * Get All Table with Pagination
    * Get Table with Filter :
        * Name
    * Edit Table
    * Delete Table

* User Page :
    * Add Customer 
    * Add Admin (Authorization Superadmin)
    * Get All User with Pagination
    * Get User with Filter :          
        * Name
    * Edit User
    * Delete User (soft delete)
 
* Order Page :
    * Get All Menu
    * Get Menu with Filter Name
    * Add to Cart
    * Add Order 
     
* Transaction Page :
    * Get All Transaction with Pagination
    * Get Transaction with Filter :          
        * User Name
        * Start Transaction Date
        * End Transaction Date
    * Get Transaction Detail      
    * Export Data Transaction to CSV with Filter Above
    * Export Data Transaction to PDF with Filter Above

  
<h2>🛠️ Installation Steps :</h2>

<p>1. Clone Repository</p>

```
git clone https://github.com/mdzakied/react-wmb-frontend.git
```

<br />
<p>2. Prepare backend </p>

[springboot-wmb-backend](https://github.com/mdzakied/springboot-wmb-backend)

<br />
<p>4. Run Project for Development</p>

* pnpm install
  
  ```
  pnpm install
  ```
  
* Run Project
  
  ```
  pnpm run dev
  ```
  
<h2>💻 Built with</h2>

Technologies used in the project :

*   Vite
*   Javascript
*   React.js
*   react-dom
*   react-hook-form
*   react-router-dom
*   prop-types
*   zod
*   @hookform/resolvers
*   axios
*   @tanstack/react-query
*   saas
*   postcss
*   tailwindcss
*   rippleui
*   sweetalert2
*   sweetalert2/theme-dark
