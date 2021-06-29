import React from 'react'
import { useDispatch } from 'react-redux'
import { eventDeleted } from '../../actions/events';

export const DeleteEventFab = () => {

    const dispatch = useDispatch();

    const handleClickDeleteEvent = () => {
        dispatch( eventDeleted() );
    }
    return (
        <button
            className='btn btn-danger fab-danger'
            onClick={ handleClickDeleteEvent }
        >
            <i className='fas fa-trash'/>
            <span> Delete event</span>
        </button>
    )
}
