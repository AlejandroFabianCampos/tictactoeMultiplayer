import React, {Fragment} from 'react'

export default function index(props) {
    return (
        <div className="cell-text">
            {props.cellValue === 0 && ''}
            {props.cellValue === 1 && 'O'}
            {props.cellValue === 2 && 'X'}
        </div>
    )
}
