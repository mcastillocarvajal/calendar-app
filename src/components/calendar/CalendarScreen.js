import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useDispatch } from 'react-redux';

import { Navbar } from '../ui/Navbar';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';

const localizer = momentLocalizer(moment);

const events = [{
    title:`Mom's Bithday`,
    start: moment().toDate(),
    end: moment().add( 2, 'hour' ).toDate(),
    bgcolor: '#fafafa',
    user: {
        _id: '1234',
        name: 'Moises'
    }
}]

export const CalendarScreen = () => {

    const dispatch = useDispatch();

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

    const onDoubleClick = (e) => {

        dispatch( uiOpenModal() );
    }

    const onSelectEvent = (e) => {

        dispatch( eventSetActive( e ) );
        dispatch( uiOpenModal() );
    }

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem( 'lastView', e );
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
                onView={ onViewChange }
                view={ lastView }
                onSelectEvent={ onSelectEvent }
                components={{
                    event: CalendarEvent
                }}
            />

            <CalendarModal />

            <AddNewFab />
        </div>
    )
}
