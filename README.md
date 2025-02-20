# Project 13 - Poc Chat

## Front-end Preparation

1. Install Node.js: [Download Node.js](https://nodejs.org/en/download)

2. Install Angular CLI locally:

    ```sh
    npm install -g @angular/cli
    ```

3. Move to the project directory:

    ```sh
    cd chat-front
    ```

4. Install dependencies:

    ```sh
    npm install
    ```

5. Start the development server:

    ```sh
    ng serve
    ```

6. Open your browser and go to [http://localhost:4200/](http://localhost:4200/) to view the application.

## Back-end Preparation

1. Install SQL: [Download MySQL](https://dev.mysql.com/downloads/installer/)

2. Import the database found in `sql/script.sql`.

3. Create environment variables:

   ### On Linux/Mac:

    ```sh
    export spring.datasource.password=your_datasource_password
    export spring.datasource.username=your_datasource_username
    export jwt.secret.key=your_secret_key_jwt
    ```

   ### On Windows (PowerShell):

    ```sh
    setx spring.datasource.password "your_datasource_password"
    setx spring.datasource.username "your_datasource_username"
    setx jwt.secret.key "your_secret_key_jwt"
    ```

4. Move to the project directory:

    ```sh
    cd chat-back
    ```

5. Start the project:

    ```sh
    mvn spring-boot:run
    ```
## Login for test

1. User 1
```sh
   email : romain@gmail.com
   password : Pass@1234
```
2. User 2
```sh
   email : romain1@gmail.com
   password : Pass@1234
```
3. Support
```sh
   email : support@gmail.com
   password : Pass@1234
```