export const ADD = (item) => {
    return {
        type : "ADD_CART",
        payload : item
    }
};

export const DELETE = (id) => {
    return {
        type : "REMOVE_CART",
        payload : id
    }
};

export const REMOVE = (iteam) => {
    return {
        type: "RMV_ONE",
        payload: iteam
    }
};


