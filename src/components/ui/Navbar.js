import React from 'react'

export const Navbar = () => {
    return (
        <div className='navbar navbar-dark bg-dark mb-4'>
            <span className='navbar-brand mx-4'>
                Test
            </span>

            <button className='btn btn-danger mx-4'>
                <i className="fas fa-sign-out-alt mx-1"></i>
                <span>
                    Logout
                </span>
            </button>
        </div>
    )
}
