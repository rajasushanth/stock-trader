import httpClient from "./httpClient";

const END_POINT='';

const getAllStocks = () => httpClient.get(END_POINT);

const saveStock = (stockContext) => httpClient.post(END_POINT, stockContext);

export {
  getAllStocks,
  saveStock
}