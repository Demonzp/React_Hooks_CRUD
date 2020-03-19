import React from 'react';
import './alert.css';

import { Alert } from 'reactstrap';
//ну тут фаще проще быть не может, колобок и тот сложнее
const CompAlert = ({text,modal,onToggle})=>{

    if(!modal){
        return null;
    }else{
        return (
            <Alert color="success">
                {text}
                <button type="button" className="close" onClick={onToggle}>
                    <span>x</span>
                </button>
            </Alert>
        );
    }
    
}

export default CompAlert;