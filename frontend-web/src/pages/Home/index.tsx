import React from 'react';
import './styles.scss';
import { ReactComponent as AuthImage } from 'core/assets/images/auth.svg';
import Login from './components/Login';
import './styles.scss';


const Home = () => (
     <div className="home-container">
          <div className="home-info">
               <h1 className="home-info-title">Avalie Filmes</h1>
               <p className="home-info-subtitle">
                    Diga o que você achou do seu filme favorito
               </p>
               <AuthImage className="home-image" />
          </div>
          <div className="home-content">
               <Login />
          </div>
     </div>
)

export default Home;