import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './LoggedArea.css';
import axios from 'axios';

function LoggedArea() {
  const services = [
    {
      category: 'Estética',
      name: 'Tosa',
      price: 50,
      availableTimes: ['09:00 AM', '10:00 AM', '02:00 PM'],
    },
    {
      category: 'Estética',
      name: 'Banho',
      price: 30,
      availableTimes: ['11:00 AM', '01:00 PM', '03:00 PM'],
    },
    // Adicione mais serviços aqui
  ];

  const [clickedButton, setClickedButton] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const [cardOpen, setCardOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const handleShowTimes = (index) => {
    if (clickedButton === index && cardOpen) {
      setCardOpen(false);
    } else {
      setClickedButton(index);
      setCardOpen(true);
    }

    setSelectedTime(null);
    setSelectedButton(null);
    setShowConfirmation(false);
  };

  const handleSubmenuToggle = () => {
    setSubmenuOpen(!submenuOpen);
  };

  const handleMyProfileClick = () => {
    alert('Navegar para a página de perfil do usuário');
  };

  const handleLogoutClick = () => {
    alert('Usuário deslogado');
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    setShowConfirmation(true);
    setSelectedButton(time);
  };

  const handleConfirmation = () => {
    const Agenda = {
      AgendaID: 0,
      IDAnimal: selectedAnimal, // Use o animal selecionado
      IDHorario: 1,
      AtualizadoSistema: false,
      IDEmpresa: 1,
      IDServicoCategoria: 1,
    };

    axios
      .post('https://localhost:44358/api/v1/Agenda/cadagenda', Agenda)
      .then((response) => {
        console.log('Resposta da API:', response.data);
        alert(`Agendamento confirmado para ${selectedTime}`);
      })
      .catch((error) => {
        console.error('Erro ao confirmar agendamento:', error);
        alert('Erro ao confirmar agendamento. Por favor, tente novamente.');
      });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setSelectedButton(null);
    setShowConfirmation(false);
  };

  const handleAnimalSelect = (animalId) => {
    setSelectedAnimal(animalId);
  };

  const renderServiceCards = () => {
    return services.map((service, index) => (
      <div key={index} className={`col-lg-4 col-md-6 mb-4`}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{service.name}</h5>
            <p className="card-text">Categoria: {service.category}</p>
            <p className="card-text">Preço: R${service.price}</p>

            <div className="form-group">
              <label htmlFor={`animalSelect-${index}`}>Selecionar Animal:</label>
              <select
                id={`animalSelect-${index}`}
                className="form-control"
                onChange={(e) => handleAnimalSelect(e.target.value)}
              >
                <option value="" disabled selected>
                  Escolha um animal
                </option>
                {/* Adicione as opções de animais aqui */}
                <option value="1">Animal 1</option>
                <option value="2">Animal 2</option>
                {/* Adicione mais opções conforme necessário */}
              </select>
            </div>
          </div>

          <div className="card-footer">
            <button
              className="btn btn-primary btn-sm float-right"
              onClick={() => handleShowTimes(index)}
            >
              Ver Horários Disponíveis
            </button>
          </div>

          {clickedButton === index && cardOpen && (
            <div className="card-footer">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Data:</span>
                </div>
                <input
                  type="date"
                  className="form-control"
                  value={selectedDate.toISOString().split('T')[0]}
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
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">
            PetShop
          </a>

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
                  <button className="btn btn-outline-success" type="submit">
                    Pesquisar
                  </button>
                </div>
              </div>
            </form>
          </div>

          <NavDropdown title="Opcões" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1" onClick={handleMyProfileClick}>
              Meus Dados
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2" onClick={handleLogoutClick}>
              Sair
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </nav>

      <div className="container my-5">
        <h1>Serviços Disponíveis</h1>
        <div className="row">{renderServiceCards()}</div>
      </div>
    </div>
  );
}

export default LoggedArea;
