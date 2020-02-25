import {apiDelete, apiGet, apiGetPaginated, apiPost, apiUpdate} from "./WebService";
import {BASE_URL} from "../conf";

let url = `${BASE_URL}/sales/`

export const fetchSales = (token, page, cb) => {
    apiGetPaginated(url, token, page)
        .then(res => {
            if (res.status === 200) {
                let {pages, records} = res.headers
                cb({
                    data: res.data,
                    pages, records
                })
            } else
                throw Error("Failure response: " + res.status)
        })
        .catch(e => {
            console.error(e)
            cb(false)
        })
}

export const importSales = (token, body, cb) => {
    apiPost(url + "import", body, token, 'multipart/form-data')
        .then(cb)
        .catch(e => {
            console.error(e)
            cb(false)
        })
}

export const deleteSale = (token, id, cb) => {
    apiDelete(url + id, token)
        .then(cb)
        .catch(e => {
            console.error(e)
            cb(false)
        })
}

export const deleteSelectedSales = (token, ids, cb) => {
    apiPost(url + "deletes", ids, token)
        .then(cb)
        .catch(e => {
            console.error(e)
            cb(false)
        })
}