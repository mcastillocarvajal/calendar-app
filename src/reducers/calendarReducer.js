import moment from "moment";
import { types } from "../types/types";


const initialState = {
    events: [{
        title:`Mom's Bithday`,
        start: moment().toDate(),
        end: moment().add( 2, 'hour' ).toDate(),
        bgcolor: '#fafafa',
        user: {
            _id: '1234',
            name: 'Moises'
        }
    }
    ],
    activeEvent: null
};

export const calendarReducer = ( state = initialState, action ) => {

    switch ( action.type ) {

        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }

        default:
            return state;
    }
};