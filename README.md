# AutoSnap 🚗

AutoSnap is a full-stack application that helps car enthusiasts track and manage their favorite vehicles. Users can create an account, log in, add vehicles to their personal garage, and view them in a sleek, card-based layout.

## 🚀 Features

- **User Authentication**: Sign up and log in securely
- **Add a Car**: Submit new vehicles using a simple form
- **Car Feed**: Browse all added vehicles
- **My Garage**: View and manage your saved cars
- **GraphQL API**: Efficient querying and mutations
- **Responsive UI**: Built with Bootstrap 5 for clean styling

## 🛠️ Tech Stack

- **Frontend**: React, Apollo Client, Bootstrap
- **Backend**: Node.js, Express, Apollo Server
- **Database**: MongoDB Atlas
- **Authentication**: JWT
- **Deployment**: Render

## 📂 Folder Structure

```
client/
  └── src/
      ├── components/
      ├── pages/
      └── utils/
server/
  ├── models/
  ├── schemas/
  └── routes/
```

## 📡 GraphQL

Implemented queries and mutations for:

- User registration and login
- Adding and removing cars
- Fetching user and vehicle data

## 🚧 Future Improvements

- Image upload for each vehicle
- Filtering and sorting options
- Admin dashboard for moderation

## 🔗 Links

- [Live App on Render](autosnap.onrender.com)
- [GitHub Repository](https://github.com/johnwgomez/AutoSnap)

## 📸 Screenshots

> _Screenshots coming soon!_ (You can replace this with actual image links later)

## 💻 Getting Started

1. Clone the repo:
   ```
   git clone https://github.com/johnwgomez/AutoSnap.git
   ```

2. Install dependencies:
   ```
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Create a `.env` file in `/server` with your MongoDB URI and JWT secret:
   ```
   MONGODB_URI=your-mongo-uri
   JWT_SECRET=your-jwt-secret
   ```

4. Run the app:
   ```
   npm run start
   ```

## 🔍 Sample GraphQL Queries

### Get All Cars
```graphql
query {
  getAllCars {
    make
    model
    year
  }
}
```

### Delete Car
```graphql
mutation {
  deleteCar(carId: "your_car_id")
}
```

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 👥 Team

- **Mauro Mariscal** – Frontend Lead • UI/UX Design & React Implementation  
- **ONeal Shockley** – Backend Lead • API Development & Styling Integration  
- **John Gomez** – Project Manager • GitHub Coordination & Deployment Oversight  

## 📜 License

MIT