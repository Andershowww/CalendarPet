import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { Link } from 'react-router-dom';

function Auth(props) {
  const [mensagemErro, setMensagemErro] = useState('');

  function handleLoginSubmit(e) {
    e.preventDefault();
    const usuario = e.target.elements.usuario.value;
    const senha = e.target.elements.senha.value;

    if (validarUsuario(usuario, senha)) {
      // Validação bem-sucedida, redirecione para a área logada
      props.history.push('/LoggedArea');
    } else {
      // Validação falhou, exiba uma mensagem de erro
      setMensagemErro('Usuário ou senha incorretos');
    }
  }

  function validarUsuario(usuario, senha) {
    // Substitua isso com a lógica real de validação, como consultar um banco de dados
    const usuarioValido = '045.262.930-67';
    const senhaValida = 'senha';

    return usuario === usuarioValido && senha === senhaValida;
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleLoginSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Calendar Pet</h3>
          <div className="form-group mt-3">
            <label>CPF</label>
            <InputMask
              mask="999.999.999-99"
              maskChar="_"
              className="form-control mt-1"
              placeholder="Insira seu CPF"
              name="usuario"
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Senha</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Informe sua senha"
              name="senha"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Entrar
            </button>
          </div>
          {mensagemErro && <p className="text-danger">{mensagemErro}</p>}
          <p className="forgot-password text-right mt-2">
            Ainda não é cadastrado? <a href="#">Cadastre-se</a>
          </p>
          <p className="forgot-password text-right mt-2">
            Esqueceu sua senha? <a href="#">Recuperar senha</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Auth;
