# Stock Management App

This is a simple stock management app built with Next.js, MongoDB, Firebase, and Express. Users can sign in using Firebase authentication, add and manage their stocks, and access financial market data, stock screening sites, and stock news.

## Features

- User authentication with Firebase
- Add and manage stocks in your portfolio
- View financial market data
- Access stock screening sites
- Read news on stocks

**User Sign In/Sign Out Option**
![image](https://github.com/Kashaf22/ManageStocks/assets/89542741/6d08fac4-8ee1-481f-97c8-f9f245dba0ad)

**UI to Search**
![image](https://github.com/Kashaf22/ManageStocks/assets/89542741/86ddb939-1179-4679-bc84-88b34751faa9)

**Search for existing stocks in your database**
![image](https://github.com/Kashaf22/ManageStocks/assets/89542741/5f40a7bd-ac9b-4f34-9eda-770978b0ec36)

**UI displays the stocks with their ticker, price, quantity, current price, and profit/loss in a table**
![image](https://github.com/Kashaf22/ManageStocks/assets/89542741/07738c58-df04-47dd-8b74-ee49aa1d32b6)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/stock-management-app.git
   cd stock-management-app
Install the dependencies:

bash
Copy code
npm install
Create a .env.local file in the project root and add your Firebase config:

env
Copy code
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
Start the development server:

bash
Copy code
npm run dev
Open your browser and navigate to http://localhost:3000.

**Usage**
Sign in using your Google account to access the stock management dashboard.
Add stocks to your portfolio by providing the stock ticker, quantity, and price.
View your stocks in the dashboard and access financial market data, stock screening sites, and stock news.
Technologies Used
Next.js
Firebase Authentication
MongoDB
Express
Axios
JWT (JSON Web Tokens)

**Acknowledgements**
This app was inspired by the need for a simple stock management solution.
Financial market data is fetched from Yahoo Finance.
Stock screening sites include Google Finance and Stock Analysis.
Stock news is retrieved from MSN Money.
License
This project is licensed under the MIT License - see the LICENSE file for details.
The app features an intuitive and clean interface for easy navigation and interaction.

**Contact**
For inquiries or feedback, please contact us kashaf.mujeeb22@gmail.com



