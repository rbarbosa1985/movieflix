import React from 'react';
import { ReactComponent as ArrowIcon } from 'core/assets/images/arrow.svg';
import './styles.scss';
import { Props } from './type';

const ButtonIcon = ( { text } : Props) => (
     <div className="d-flex">
          <button className="btn btn-primary btn-icon">
               <h5>{text}</h5>
          </button>
          <div className="btn-icon-content">
               <ArrowIcon/>
          </div>
     </div>
);

export default ButtonIcon;