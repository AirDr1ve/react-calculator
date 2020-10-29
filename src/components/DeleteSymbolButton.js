import React from 'react';
import './DeleteSymbolButton.css';

 export const DeleteSymbolButton = (props) => (

            <div className='delete-btn' onClick={props.handleClick}>
                {props.children} 
            </div>
    
 )

