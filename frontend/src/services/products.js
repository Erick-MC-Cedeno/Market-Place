import { get, post, createProductApi, getProductsApi } from '../api/http';


export default class Products {
    static async createProduct(body) {
        return await post(createProductApi, body);
    }

    static async getProducts() {
        return await get(getProductsApi, {});
    }
}