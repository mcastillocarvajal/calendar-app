import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useDispatch, useSelector } from 'react-redux';

import { Navbar } from '../ui/Navbar';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

    const onDoubleClick = (e) => {

        dispatch( uiOpenModal() );
    }

    const onSelectEvent = (e) => {

        dispatch( eventSetActive( e ) );
    }

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem( 'lastView', e );
    }

    const onSelectSlot = (e) => {
        dispatch( eventClearActiveEvent() );
    }

    const eventStyleGetter = ( event, start, end, isSelected ) => {

        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        }
    };

    return (
        <div>
            <Navbar />

            <Calendar
                localizer={ localizer }
                events={ events }
                startAccessor="start"
                endAccessor="end"
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleClick }
                onSelectSlot={ onSelectSlot }
                selectable={ true }
                onView={ onViewChange }
                view={ lastView }
                onSelectEvent={ onSelectEvent }
                components={{
                    event: CalendarEvent
                }}
            />

            <CalendarModal />

            {
                ( activeEvent ) && <DeleteEventFab />
            }

            <AddNewFab />
        </div>
    )
}
