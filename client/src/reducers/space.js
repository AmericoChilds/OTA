import { DELSPACE, NEWSPACE, UDTSPACE, GETSPACE, CURSPACE } from "../constants/actionTypes";

const authReducer = (state = {spaceData: null}, action) => {
    switch (action.type) {
        case DELSPACE:
            localStorage.setItem('spaces', JSON.stringify({ ...action?.data }));
            return { ... state, spaceData: action?.data };
        case NEWSPACE:
            localStorage.setItem('spaces', JSON.stringify({ ...action?.data }));
            return { ... state, spaceData: action?.data };
        case UDTSPACE:
            localStorage.setItem('spaces', JSON.stringify({ ...action?.data }));
            return { ... state, spaceData: action?.data };
        case GETSPACE:
            localStorage.setItem('spaces', JSON.stringify({ ...action?.data }));
            return { ... state, spaceData: action?.data };
        case CURSPACE:
            localStorage.setItem('cur_space', JSON.stringify({ ...action?.data }));
            return { ... state, spaceData: action?.data };
        default:
            return state;
    }
}

export default authReducer;