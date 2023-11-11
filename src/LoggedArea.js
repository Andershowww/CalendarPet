import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importe o CSS do Bootstrap
import NavDropdown from 'react-bootstrap/NavDropdown';
import './LoggedArea.css'; // Você pode criar seu próprio arquivo CSS para personalização

function LoggedArea() {
  // Dados de exemplo para os serviços
  const services = [
    {
      category: 'Estética',
      name: 'Tosa',
      price: 50,
      availableTimes: ['09:00 AM', '10:00 AM', '02:00 PM'], // Exemplo de horários disponíveis
    },
    {
      category: 'Estética',
      name: 'Banho',
      price: 30,
      availableTimes: ['11:00 AM', '01:00 PM', '03:00 PM'], // Exemplo de horários disponíveis
    },
    // Adicione mais serviços aqui
  ];

  // Estado para controlar qual botão "Ver Horários Disponíveis" foi clicado, qual horário foi selecionado, a data selecionada e se o botão de confirmação deve ser exibido
  const [clickedButton, setClickedButton] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Estado para rastrear o botão de hora selecionado
  const [selectedButton, setSelectedButton] = useState(null);

  // Estado para controlar se o card está aberto ou fechado
  const [cardOpen, setCardOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  // Função para lidar com o clique no botão "Ver Horários Disponíveis"
  const handleShowTimes = (index) => {
    // Se o mesmo botão for clicado novamente, feche o card
    if (clickedButton === index && cardOpen) {
      setCardOpen(false);
    } else {
      // Caso contrário, defina o botão clicado e abra o card
      setClickedButton(index);
      setCardOpen(true);
    }

    // Limpa o horário selecionado quando um novo botão "Ver Horários Disponíveis" é clicado
    setSelectedTime(null);
    setSelectedButton(null);
    setShowConfirmation(false);
  };
  // Função para lidar com o clique no botão do submenu
  const handleSubmenuToggle = () => {
    setSubmenuOpen(!submenuOpen);
  };

  // Função para lidar com o clique em "Meu Cadastro"
  const handleMyProfileClick = () => {
    // Implemente a navegação para a página de perfil do usuário
    alert('Navegar para a página de perfil do usuário');
  };
   // Função para lidar com o clique em "Sair"
  const handleLogoutClick = () => {
    // Implemente a lógica de logout aqui
    alert('Usuário deslogado');
  };
  // Função para lidar com o clique em um horário disponível
  const handleTimeClick = (time) => {
    setSelectedTime(time);
    setShowConfirmation(true); // Mostra o botão de confirmação quando um horário é selecionado

    // Define o botão de hora selecionado
    setSelectedButton(time);
  };

  // Função para lidar com o clique no botão de confirmação
  const handleConfirmation = () => {
    // Implemente a lógica de confirmação do agendamento aqui
    alert(`Agendamento confirmado para ${selectedTime}`);
  };

  // Função para lidar com a mudança de data
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Limpa o horário selecionado quando a data muda
    setSelectedButton(null); // Limpa o botão de hora selecionado quando a data muda
    setShowConfirmation(false);
  };

  // Função para renderizar os cards dos serviços
  const renderServiceCards = () => {
    return services.map((service, index) => (
      <div
        key={index}
        className={`col-lg-4 col-md-6 mb-4`}
      >
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{service.name}</h5>
            <p className="card-text">Categoria: {service.category}</p>
            <p className="card-text">Preço: R${service.price}</p>
          </div>
          {/* Exibir o botão "Ver Horários Disponíveis" */}
          <div className="card-footer">
            <button
              className="btn btn-primary btn-sm float-right"
              onClick={() => handleShowTimes(index)}
            >
              Ver Horários Disponíveis
            </button>
          </div>
          {/* Exibir os botões de horários disponíveis apenas se o card estiver aberto */}
          {clickedButton === index && cardOpen && (
            <div className="card-footer">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Data:</span>
                </div>
                <input
                  type="date"
                  className="form-control"
                  value={selectedDate.toISOString().split('T')[0]} // Formate a data para o formato 'YYYY-MM-DD'
                  onChange={(e) => handleDateChange(new Date(e.target.value))}
                />
              </div>
              <div className="btn-group">
                {service.availableTimes.map((time, timeIndex) => (
                  <button
                    key={timeIndex}
                    className={`btn btn-outline-primary btn-time ${
                      selectedButton === time ? 'btn-selected' : ''
                    }`}
                    onClick={() => handleTimeClick(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
              {/* Exibir o botão de confirmação apenas se um horário for selecionado */}
              {showConfirmation && (
                <div className="card-footer">
                  <button className="btn btn-primary mt-2" onClick={handleConfirmation}>
                    Confirmar Agendamento
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div className="LoggedArea">
    {/* Navbar */}
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="#">
          PetShop
        </a>
      
        {/* Centralize a barra de pesquisa */}
        <div className="mx-auto">
          <form className="form-inline my-2 my-lg-0">
            <div className="input-group">
              <input
                className="form-control"
                type="search"
                placeholder="Pesquisar"
                aria-label="Pesquisar"
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-success"
                  type="submit"
                >
                  Pesquisar
                </button>
              </div>
            </div>
          </form>
        </div>
        <NavDropdown title="Opcões" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Meus Dados</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
               Sair
              </NavDropdown.Item>
              {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
      </div>
    </nav>

    {/* Conteúdo principal */}
    <div className="container my-5">
      <h1>Serviços Disponíveis</h1>
      <div className="row">{renderServiceCards()}</div>
    </div>
  </div>
  );
}

export default LoggedArea;
