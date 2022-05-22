# digital-wallet-protected-api
Enables authentication to the wallet and exposes user specific wallet data. This repo fetches data from open api (http://localhost:3080)

## Getting Started
### Install node & npm
Visit [node website](https://nodejs.org/en/download/)

### Install typescript globally
```
npm install -g typescript
```

### Install dependecy modules
```
npm install
```

### Run application
Make sure Open Api is running (http://localhost:3080)
```
npm start
```

This must run the application at 3090 port (http://localhost:3090)

## Endpoints
### User login
Allows a user to login using valid credentials and returns a 'bearer token' on successful authentication. Only a bearer of this token is allowed to access protected endpoints.
```
POST - http://localhost:3090/user/login
```

### User information
Returns user information like user name and wallet balance. This is a protected endpoint needs to pass 'bearer token' in the header.
```
GET - http://localhost:3090/user
```

### Get users
Returns all the users, used to populate available users to transfer money. This is a protected endpoint needs to pass 'bearer token' in the header.
```
GET - http://localhost:3090/users
```

### Make transaction
Allows to transfer money. This is a protected endpoint needs to pass 'bearer token' in the header.
```
POST - http://localhost:3090/user/transaction
```

### Get user transactions list
Returns all the transactions made by the user. This is a protected endpoint needs to pass 'bearer token' in the header.
```
GET - http://localhost:3090/user/transactions
```