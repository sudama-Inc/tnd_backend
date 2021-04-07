"use strict";

import axios from "axios";

export default class Axios {
    public static async post(url: string, body, options = {}) {
        const response = await axios.post(url, body, options);
        return response.data;
    }
}
