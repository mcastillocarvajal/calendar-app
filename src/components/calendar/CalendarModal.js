import React, { useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add( 1, 'hours' );
const nowPlus1 = now.clone().add(1, 'hours');

export const CalendarModal = () => {

    const [dateStart, setDateStart] = useState( now.toDate() );
    const [dateEnd, setDateEnd] = useState( nowPlus1.toDate() );
    const [validTitle, setValidTitle] = useState( true );
    const [validNotes, setValidNotes] = useState( true );

    const [formValues, setFormValues] = useState({
        title: 'Event',
        notes: '',
        start: now.toDate(),
        end: nowPlus1.toDate()
    });

    const { notes, title, start, end } = formValues;

    const handleInputChange = ({ target }) => {

        setFormValues({
            ...formValues,
            [ target.name ]: target.value
        })
    }

    const closeModal = () => {

    }


    const handleStartDateChange = (e) => {
        setDateStart(e);
        setFormValues({
            ...formValues,
            start: e
        })
    }

    const handleEndDateChange = (e) => {
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();

        const momentStart = moment( start );
        const momentEnd = moment( end );

        if ( momentStart.isSameOrAfter( momentEnd ) ) {
            return Swal.fire('Error', 'The end date should be after the start date', 'error')
        }

        if ( title.trim().length < 2 ) {
            return setValidTitle( false );
        }

        if ( notes.trim().length < 2 ) {
            return setValidNotes( false );
        }

        setValidTitle( true );
        setValidNotes( true );
        closeModal();
    }

    return (
        <Modal
            isOpen={ true }
            // onAfterOpen={afterOpenModal}
            onRequestClose={ closeModal }
            style={customStyles}
            closeTimeoutMS={ 200 }
            className="modal"
            overlayClassName="modal-bg"
        >


            <h1> New Event </h1>
            <hr />

            <form 
                className="container"
                onSubmit={ handleSubmitForm }
            >

                <div className="form-group">
                    <label>Start date and time</label>
                    <DateTimePicker
                        onChange={ handleStartDateChange }
                        value={ dateStart }
                        className="form-control"
                    />
                </div>

                <div className="form-group my-2">
                    <label>End date and time</label>
                    <DateTimePicker
                        onChange={ handleEndDateChange }
                        value={ dateEnd }
                        minDate={ dateStart }
                        className="form-control"
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Title and notes</label>
                    <input 
                        type="text" 
                        className={ `form-control ${ !validTitle && 'is-invalid'}`}
                        placeholder="Event title"
                        name="title"
                        value={ title }
                        onChange={ handleInputChange }
                        autoComplete="off"
                    />
                    <small className='invalid-feedback'>Please enter a title</small>
                </div>

                <div className="form-group my-2">
                    <textarea 
                        type="text" 
                        className={`form-control ${ !validNotes && 'is-invalid'}`}
                        placeholder="Notes"
                        rows="5"
                        name="notes"
                        value={ notes }
                        onChange={ handleInputChange }
                    ></textarea>
                    <small className='invalid-feedback'>Please enter your notes</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary w-100 mt-3"
                >
                    <i className="far fa-save"></i>
                    <span> Save</span>
                </button>

            </form>

        </ Modal>

    )
}
