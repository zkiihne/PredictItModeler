This application is intended to assist trading on predictit.org. It uses past tweet data to model and predict future behavior. Everything is for my personal use and should not be taken as financial advice. The site is broken down into two pieces, a Python Graphql backend where all of the modelling happens, and a React front end that serves primarily as a skin for the backend. 

The basic model uses past data to create a KDE distribution and use that distribution to price options.

Due to predictit's discontinuation of these markets, the site has been taken down. The backend code no longer works, as it relied on the market data from the predictit api. 
