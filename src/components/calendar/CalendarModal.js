import React, { useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';

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

    const closeModal = () => {

    }


    const handleStartDateChange = (e) => {
        setDateStart(e)
    }

    const handleEndDateChange = (e) => {
        setDateEnd(e)
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
            <form className="container">

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
                        className="form-control"
                        placeholder="Event title"
                        name="title"
                        autoComplete="off"
                    />
                </div>

                <div className="form-group my-2">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notes"
                        rows="5"
                        name="notes"
                    ></textarea>
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
