## A small API for products and orders.

#### Products Endpoint

```
    /products
```
This end point allows two HTTP methods: ```GET``` and ```POST```.

```
    /products/{productID}
```
This end point allows three HTTP methods: ```GET```, ```PATCH```, and ```DELETE```.

#### Orders Endpoint

```
    /orders
```
This end point allows two HTTP methods: ```GET``` and ```POST```.

```
    /orders/{orderID}
```
This end point allows two HTTP methods: ```GET``` and ```DELETE```.

## Running The API

The main entry point of the application is the file ```www```.

### 1. Install the dependencies 

Run ```npm install``` to install the dependencies.

### 2. Starting the server

This program utilizes nodemon as a development dependency. 

To run the server:
```
npm start
```

The server will automatically restart anytime you save changes on any file.
