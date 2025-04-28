import style from "./Contact.module.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { Menu } from "./components/menu";
import { Loading } from "./components/spinner";
import { useState, useEffect } from "react";



function Contact() {
  const [cep, setCep] = useState("805110-070")
  const [lat, setLat] = useState("-25.4248289")
  const [lng, setLng] = useState("-49.3548061")

  const [loading, setLoading] = useState(false)
  const [bairro, setBairro] = useState("")
  const [rua, setRua] = useState("")
  const [estado, setEstado] = useState("")
  const [localidade, setLocalidade] = useState("")

  const position = [lat,lng];

  function handleCep(e){
    setCep(e.target.value)
  }
  function ChangeView({center}){
    const map = useMap();
    map.setView(center, 15);
    return null
  }

  useEffect(() => {
      const sanitizedCep = cep.replace(/\D/g, "")

      if(sanitizedCep.length !== 8) return;

      setLoading(true)

      fetch(`https://viacep.com.br/ws/${sanitizedCep}/json/`)
        .then((res) => res.json())
        .then((data) => {
          
          if(data.erro){
            console.warn("CEP não encontrado")
            setLoading(false)
            return;
          }
          const { logradouro ,localidade, uf, bairro, estado } = data
          setBairro(bairro)
          setRua(logradouro)
          setEstado(estado)
          setLocalidade(localidade)
          const address = `${logradouro ? logradouro + ', ' : ''}${localidade}, ${uf}`
          
          fetch(`https://nominatim.openstretmap.org/search?format=json&q=${encodeURIComponent(address)}`)
          .then((response) => response.json())
          .then((LocationData) => {

            if(LocationData.length > 0){
                const {lat, lng} = LocationData =[0]
                setLat(parseFloat(lat))
                setLng(parseFloat(lng))
            }else{
              console.warn("cordenadas nao encontradas")
              
            }
            setLoading(false)

          }).catch(error => {
              console.error("erro ao buscar coordenadas", error)
              setLoading(false)
          }, [cep])

          
            
        }).catch(error => {
          console.error("erro ao buscar CEP:",error)
          setLoading(false)
        })
  },[cep])

  return (
    <>
    <Menu option01='Voltar a página principal'/>
    
      <h2 className={style.tt}>Mapa</h2>
      <br />
      <input type="text" placeholder="Insira o Cep" onChange={handleCep}/>
      {bairro} - {rua} - {estado} - {localidade}
      <br />
      <br />
      {loading ? <Loading/> : 
      <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{width: "100%", height: "500px"}}>
        <ChangeView center={position}/>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <a 
            target="_blanck"
            rel="noopener noreferrer"
            href={`https://ww.google.com/maps/search/?api=1$query=${lat},${lng}`}>
                ABRIR NO GOOGLE MAPS
            </a>
          </Popup>
        </Marker>
      </MapContainer>
      }
      
      
    </>
  );
}

export default Contact;
