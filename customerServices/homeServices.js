import { requestServices } from "./index";

const list = (params) =>
  requestServices.customAxios
    .post(`api/food/list`, params)
    .then((res) => res.data);
const listFavorite = (params) =>
  requestServices.customAxios
    .post(`api/food/list-favorite`, params)
    .then((res) => res.data);
const listRecently = (params) =>
  requestServices.customAxios
    .post(`api/food/list-recently`, params)
    .then((res) => res.data);
const listTopOrder = (params) =>
  requestServices.customAxios
    .post(`api/food/list-top-order`, params)
    .then((res) => res.data);
const createNotification = (params) =>
  requestServices.customAxios
    .post(`api/notification/create`, params)
    .then((res) => res.data);

const updateLikedFood = (params) =>
  requestServices.customAxios
    .post(`/api/account/like-food`, params)
    .then((res) => res.data);

export default {
  list,
  listFavorite,
  listRecently,
  listTopOrder,
  createNotification,
  updateLikedFood,
};
