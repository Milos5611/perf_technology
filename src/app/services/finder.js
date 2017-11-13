import { TYPE_KEY } from "../common/constant";
import rest from "../common/rest";

const DATA_LOADED = "DATA_LOADED";

export const DATA = "data";
export const initialState = {
    [DATA]: null
};

export default function reducer( state = initialState, action ) {
    let newState;
    switch ( action[ TYPE_KEY ] ) {

        case DATA_LOADED:
            newState = {
                ...state,
                [DATA]: action[ DATA ]
            };
            break;
        default:
            newState = {
                ...state
            };
            break;
    }
    return newState;
}


// async func, return product list
export function findDataFromQuery( query ) {
    const parameter = `{"requests":[{"indexName":"ikea","params":"query=${query}&hitsPerPage=16"}]}`;
    return async ( dispatch ) => {
        try {
            const search_value = await rest.doPost(`${window.com.perf_tech.BASE_URL}`, parameter);
            // When list is ready update state
            dispatch(dataLoadedSuccessful(search_value));
        } catch ( error ) {
            throw new Error(error);
        }
    };
}

function dataLoadedSuccessful( search_value ) {
    return {
        [TYPE_KEY]: DATA_LOADED,
        [DATA]: search_value.results
    };
}
