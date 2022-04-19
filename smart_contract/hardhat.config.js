// https://eth-ropsten.alchemyapi.io/v2/M_8whCYnp2Sc6W-Cqhqd3MvZFsdmDZTw

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/M_8whCYnp2Sc6W-Cqhqd3MvZFsdmDZTw',
      accounts: ['d658712767fc01c43be065edb410f9b22aeff1ce4c4e92f533cffba05ce94589']
    }
  }
};