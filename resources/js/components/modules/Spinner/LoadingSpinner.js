import React from 'react'
import { Spinner } from 'react-bootstrap'
import './LoadingSpinner.css'

export default class LoadingSpinner extends React.Component {
    render() {
        return (
            <div className="loading">
                <Spinner animation="border" role="status" className="loading-spinner">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        )
    }
}