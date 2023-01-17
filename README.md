# 



<!-- ABOUT THE PROJECT -->
## About The Project

https://assignments.reaktor.com/birdnest/?_gl=1*1w6n22b*_ga*MTA0Mzg1NTY5MC4xNjcwNjExNTMx*_ga_DX023XT0SX*MTY3MDYxMTUzMC4xLjEuMTY3MDYxMTU1MC40MC4wLjA.

This is the frontend implementation for https://github.com/tomppatomppa/birdnest-api.git



### Built With


* React
* Material Ui
* Graphql



<!-- GETTING STARTED -->
## Getting Started
Running the server locally

1. Clone the repo
   ```sh
   git clone https://github.com/tomppatomppa/birdnest-app.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
4. Change the urls in apolloClient.js to where to deployed your server
   ```js
    const httpLink = new HttpLink({
        uri: 'https://yourServer.com/',
    })
    const wsLink = new GraphQLWsLink(
      createClient({
        url: 'wss://yourServer.com/',
      })
  )
   const API_KEY = 'ENTER API KEY';
   ```
5. start
   ```
   npm start
   ```




<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

https://reactjs.org/
https://www.apollographql.com/docs/


