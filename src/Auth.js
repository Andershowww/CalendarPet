
import React from "react"
import InputMask from 'react-input-mask';
import { Link } from 'react-router-dom';

function Auth (props) {
    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Calendar Pet</h3>
                    <div className="form-group mt-3">
                        <label>CPF</label>
                        <InputMask
                            mask="999.999.999-99" // Define a máscara do CPF
                            maskChar="_" // Caractere de espaço em branco na máscara
                            className="form-control mt-1"
                            placeholder="Insira seu CPF"
                            required="true"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Senha</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Informe sua senha"
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                    <Link to="/logged" className="btn btn-primary">Entrar</Link>


                    </div>
                    <p className="forgot-password text-right mt-2">
                        Ainda não é cadastrado?  <a href="#">Cadastre-se</a>
                    </p>
                    <p className="forgot-password text-right mt-2">
                        Esqueceu sua senha?  <a href="#">Recuperar senha</a>
                    </p>
                </div>
            </form>
        </div>
    )
}
export default Auth;