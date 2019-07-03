import { DataTypes } from './Types';

const protocol = "https";
const hostname = "tiorico.herokuapp.com";

export const RestUrls = {
    [DataTypes.TRANSACTIONS]: `${protocol}://${hostname}/api/v1/transactions`
}