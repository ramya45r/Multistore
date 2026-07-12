# Multi Store Stock Management - Design Document

## Data Model

The application uses MongoDB with four main collections:

### User
Stores authentication details and user roles.

### Product
Stores product information such as name, description, and price.

### Store
Stores store details including name and location.

### Stock
Maintains inventory quantity by connecting products and stores.

Each stock record contains:
- product reference
- store reference
- available quantity


## Preventing Negative Stock

Stock updates use validation before reducing inventory.

The system checks whether available quantity is greater than or equal to the requested quantity.

Atomic MongoDB updates using `$gte` and `$inc` prevent concurrent requests from reducing stock below zero.


## Atomic Stock Transfer

Stock transfers between stores are handled using MongoDB transactions.

A transfer contains two operations:

1. Deduct quantity from source store.
2. Add quantity to destination store.

Both operations are executed inside a transaction.

If any operation fails, the transaction is rolled back to maintain data consistency.