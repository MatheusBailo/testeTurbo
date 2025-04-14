import { useState } from 'react';
import style from './Contact.module.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

function Contact() {
  const position = [-25.4419386, -49.4632259];
  const defaultPhoneNumber = "5541999999999";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleZap = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    const urlZAPZAP = `https://api.whatsapp.com/send?phone=${defaultPhoneNumber}&text=` +
      `Nome:%20${encodeURIComponent(name)}%0D%0A` +
      `Email:%20${encodeURIComponent(email)}%0D%0A` +
      `Mensagem:%20${encodeURIComponent(message)}`;

    window.open(urlZAPZAP, "_blank");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link" href="/">Voltar</a>
            </div>
          </div>
        </div>
      </nav>

      <section id='s1'>
        <h2 className={style.Contact}>Mapa</h2>
        <br />
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ width: "100%", height: "500px", border: "2px solid black" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              Aqui está a localização.
            </Popup>
          </Marker>
        </MapContainer>
      </section>

      <section id='s2'>
        <h1 className={style.Contact}>Contato</h1>
        <form  onSubmit={handleZap}>
          <h3 className={style.Contact}>
          <input placeholder='Insira seu nome'type="text"id='name'name='name'value={formData.name} onChange={handleChange} required/><br /><br />
          <input placeholder='Insira seu email' type="email"id='email'name='email' value={formData.email}onChange={handleChange}required /><br /><br />
          <textarea placeholder='Insira mensagem'id='message'name='message'value={formData.message}onChange={handleChange}cols="30"rows="10" required></textarea><br /><br />
          <button type="submit">Enviar mensagem</button>
          </h3>
        </form>
      </section>
    </>
  );
}

export default Contact;