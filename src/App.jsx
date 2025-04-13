import style from './App.module.css'
import { cards } from './assets/mock/cards'
import { Menu } from './components/menu'
import { useState } from 'react'

function App() {
  const defaultPhoneNumber = "5541999999999"

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleZap = () => {
    const { name, email, message } = formData;

    const urlZAPZAP = `https://api.whatsapp.com/send?phone=${defaultPhoneNumber}&text=
    Nome:%20${name}%0D%0A
    Email:%20${email}%0D%0A
    Mensagem:%20${message}%0D%0A`;

    window.open(urlZAPZAP, "_blank");
  };

  return (
    <>
      <Menu option01='Sessão 01' option02='Sessão 02' option03='Mapa e contato' />
      <main>

       
        <section id='s1' className={style.s1}>
          <div className={style.perfil}>
            

            <div className={style.descricao}>
              <h2>Sobre Mim</h2>
              <p>
                Olá! Me chamo Matheus, sou desenvolvedor, designer e apaixonado por soluções criativas.
                Este é meu portfólio, onde compartilho meus projetos, experiências e ideias.
                Fique à vontade para explorar, conhecer meus trabalhos e entrar em contato!
              </p>
            </div>
          </div>

        
          <div className={style.cardsContainer}>
            {cards.map((item, index) => (
              <div key={index} className={style.crdzao}>
                <p>{item.maiscoisa}</p>
                <img src={item.img} alt={item.text} width={200} height={"auto"} />
              </div>
            ))}
          </div>
        </section>

     
        <section id="projetos" className={style.projetos}>
          <h2>Meus Projetos</h2>
          <div className={style.projetosContainer}>
            <div className={style.projetoCard}>
              <img src="/assets/images/projeto1.jpg" alt="Projeto 1" />
              <h3>trabalho-HTML3</h3>
              <p>Descrição breve do projeto, tecnologia usada ou objetivo.</p>
              <a href="https://github.com/MatheusBailo/trabalho-HTML3" target="_blank" rel="noreferrer">
                Ver no GitHub
              </a>
            </div>
          </div>
        </section>

        <section id='s2'>
          <h2>CONTATO</h2>
          <br />
          <input placeholder='Insira seu nome' type="text" id='name' name='name' value={formData.name} onChange={handleChange} required /><br /><br />
          <input placeholder='Insira seu email' type="email" id='email' name='email' value={formData.email} onChange={handleChange} required /><br /><br />
          <textarea placeholder='Insira mensagem' id='message' name='message' value={formData.message} onChange={handleChange} cols="30" rows="10" required></textarea>
          <button onClick={handleZap}>Enviar mensagem</button>
        </section>

      </main>
    </>
  )
}

export default App
