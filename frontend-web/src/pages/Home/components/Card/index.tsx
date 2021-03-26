import React from 'react';
import './styles.scss';

type Props = {
     title: string;
     children: React.ReactNode;
}

const AuthCard = ( {title , children} : Props) => {
     return (
          <div className="card-base auth-card border-radius-20">
               <h1 className="auth-card-title">{title}</h1>
               {children}
          </div>
     )
}

export default AuthCard;