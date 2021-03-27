import ButtonIcon from 'core/components/ButtonIcon';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AuthCard from '../Card';
import './styles.scss';
import { makeLogin } from 'core/utils/request';
import { saveSessionData } from "core/utils/auth";

type FormState = {
     username: string;
     password: string;
}

type LocationState = {
     from: string;
}

const Login = () => {
     const { register, handleSubmit, errors } = useForm<FormState>();
     const [hasError, setHasError] = useState(false);
     const history = useHistory();
     let location = useLocation<LocationState>();

     const { from } = location.state || { from: { pathname: "/admin" } };

     const onSubmit = (data: FormState) => {
          makeLogin(data)
               .then(response => {
                    setHasError(false);
                    saveSessionData(response.data);
                    history.replace(from);
                    window.location.reload();
               })
               .catch(() => { setHasError(true); });
     }

     return (
          <AuthCard title="Login">
               {hasError && (
                    <div className="alert alert-danger mt-5">
                         Usuário ou senha inválidos.
                    </div>
               )}
               <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="margin-bottom-30">
                         <input type="email" placeholder="Email"
                              name="username"
                              ref={register({
                                   required: "Campo Obrigatório.",
                                   pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Email inválido."
                                   }
                              })}
                              className={`form-control input-base ${errors.username ? 'is-invalid' : ''}`} />
                         {errors.username && (<div className="invalid-feedback d-block">
                              {errors.username.message}
                         </div>)}
                    </div>
                    <div className="margin-bottom-30">
                         <input type="password" placeholder="Senha"
                              name="password" ref={register({ required: "Campo Obrigatório." })}
                              className={`form-control input-base ${errors.password ? 'is-invalid' : ''}`} />
                         {errors.password && (<div className="invalid-feedback d-block">
                              {errors.password.message}
                         </div>)}
                    </div>
                    <div className="login-submit">
                         <ButtonIcon text="Logar" />
                    </div>
               </form>
          </AuthCard>
     )
}

export default Login;