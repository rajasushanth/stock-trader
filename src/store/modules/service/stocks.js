import Constants from "../commons/constants/appConstants";
import AppUtils from "../commons/utils/appUtils";
import { getAllStocks, saveStock } from "../../../api/stocks.api";

const {
  GOOGLE,
  MONGO,
  AMAZON,
  TESLA,
  FUND_AMT_INIT,
  QTY_INIT,
  FUND_ERROR,
  STOCK_ERROR,
} = Constants;

const {
  getRandomStock,
  roundOff,
  findStockValueForStockName,
  getQuantity,
  randomize,
  validateTransaction,
  filterStockCxtById,
} = AppUtils;

const namespaced = true;

const state = {
  fund: FUND_AMT_INIT,
  googleStock: getRandomStock(),
  mongoStock: getRandomStock(),
  amazonStock: getRandomStock(),
  teslaStock: getRandomStock(),
  stockHolding: [
    { stockName: GOOGLE, qty: QTY_INIT },
    { stockName: MONGO, qty: QTY_INIT },
    { stockName: AMAZON, qty: QTY_INIT },
    { stockName: TESLA, qty: QTY_INIT },
  ],
  transaction: {
    status: false,
    errorMsg: "",
  },
  id: "",
};

const getters = {
  getFund: (state) => {
    return Number(roundOff(state.fund));
  },
  getGoogleStock: (state) => {
    return Number(roundOff(state.googleStock));
  },
  getMongoStock: (state) => {
    return Number(roundOff(state.mongoStock));
  },
  getAmazonStock: (state) => {
    return Number(roundOff(state.amazonStock));
  },
  getTeslaStock: (state) => {
    return Number(roundOff(state.teslaStock));
  },
  getStockHolding: (state) => {
    return state.stockHolding;
  },
  getTransaction: (state) => {
    return state.transaction;
  },
  getId: (state) => {
    return state.id;
  },
};

const mutations = {
  muBuySellStock: (state, payload) => {
    const stockName = payload.stockName,
      stockUnit = Number(payload.stockUnit),
      operation = payload.operation;
    let stockValue;
    stockValue = findStockValueForStockName(stockName, state);
    if (operation === "buy") {
      const fundResult = state.fund - stockValue * stockUnit;
      if (fundResult >= 0) {
        state.transaction.status = true;
        state.fund = fundResult;
        let sh = getQuantity(state.stockHolding, stockName);
        sh.qty += stockUnit;
      } else {
        state.transaction.status = false;
        state.transaction.errorMsg = FUND_ERROR;
      }
    } else {
      let sh = getQuantity(state.stockHolding, stockName);
      const stockResult = sh.qty - stockUnit;
      if (stockResult >= 0) {
        state.transaction.status = true;
        sh.qty = stockResult;
        state.fund = state.fund + stockValue * stockUnit;
      } else {
        state.transaction.status = false;
        state.transaction.errorMsg = STOCK_ERROR;
      }
    }
  },
  muEndDay: (state) => {
    state.googleStock += randomize();
    state.mongoStock += randomize();
    state.amazonStock += randomize();
    state.teslaStock += randomize();
  },
  muSaveId: (state, payload) => {
    state.id = payload;
  },
  muLoadSaved: (state, payload) => {
    state.fund = payload.fund;
    state.googleStock = payload.googleStock;
    state.mongoStock = payload.mongoStock;
    state.amazonStock = payload.amazonStock;
    state.teslaStock = payload.teslaStock;
    state.stockHolding = payload.stockHolding;
  },
};

const actions = {
  buySellStock: ({ commit, dispatch }, payload) => {
    commit("muBuySellStock", payload);
    validateTransaction(state.transaction, dispatch);
  },
  endDay: ({ commit }) => {
    commit("muEndDay");
  },
  saveId: async ({ commit, getters, dispatch }) => {
    const stockContext = {
      fund: getters.getFund,
      googleStock: getters.getGoogleStock,
      mongoStock: getters.getMongoStock,
      amazonStock: getters.getAmazonStock,
      teslaStock: getters.getTeslaStock,
      stockHolding: getters.getStockHolding,
    };
    let response;
    try {
      response = await saveStock(stockContext);
    } catch (e) {
      console.log("Error while saving data" + e);
    }
    const id = response.data.name;
    commit("muSaveId", id);
    const msg = "Successfully saved data with id " + id;
    const alert = { msg, color: "green" };
    dispatch("snackbar/alert", alert, { root: true });
  },
  loadSaved: async ({ commit, getters, dispatch }) => {
    let response;
    try {
      response = await getAllStocks();
    } catch (e) {
      console.log("Error while loading data" + e);
    }
    const stockContext = filterStockCxtById(response, getters.getId);
    const msg = "Successfully loaded the data";
    const alert = { msg, color: "green" };
    commit("muLoadSaved", stockContext);
    if (stockContext) dispatch("snackbar/alert", alert, { root: true });
  },
};

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions,
};
