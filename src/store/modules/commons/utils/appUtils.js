import Constants from '../constants/appConstants'

const {
  GOOGLE, MONGO, AMAZON,
  TESLA, FUND_MAX, FUND_MIN,
  RANDOM_MAX, RANDOM_MIN
} = Constants;

const getRandomStock = () => {
  return Math.random() * (FUND_MAX - FUND_MIN) + FUND_MIN;
};

const roundOff = (val) => {
  return Number(val).toFixed(3);
};

const findStockValueForStockName = (stockName, state) => {
  switch (stockName) {
    case GOOGLE:
      return state.googleStock;
    case MONGO:
      return state.mongoStock;
    case AMAZON:
      return state.amazonStock;
    case TESLA:
      return state.teslaStock;
  }
};

const getQuantity = (stockHolding, name) => {
  return stockHolding.find(({stockName}) => stockName === name);
};

const randomize = () => {
  return Number(roundOff(Math.random() * (RANDOM_MAX - RANDOM_MIN) + RANDOM_MIN));
};

const buildErrorMsg = (errorMsg) => {
  return 'Transaction failed: ' + errorMsg;
};

const validateTransaction = (transaction, dispatch) => {
  if (!transaction.status) {
    const errorMsg = buildErrorMsg(transaction.errorMsg);
    const alert = {msg: errorMsg, color: 'orange'};
    dispatch('snackbar/alert', alert, {root: true});
  }
}

const filterStockCxtById = (res, id) => {
  const data = res.data;
  if (data) {
    for (let key in data) {
      if (key === id) {
        return data[key];
      }
    }
  }
}

export default {
  getRandomStock,
  roundOff,
  findStockValueForStockName,
  getQuantity,
  randomize,
  buildErrorMsg,
  validateTransaction,
  filterStockCxtById
}