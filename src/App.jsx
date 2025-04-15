import style from './App.module.css'
import { cards } from './assets/mock/card'
import { Menu } from './components/menu'
// import img01 from './assets/images/img01.jpg'


function App() {

  return (
    <>
     <Menu option01='Sessão 01' option02='Sessão 02' option03='Mapa e contato' option04= 'Calculadora' option05='Calculadora de Medias' option06='Calculadora de IMC'/>
     <main>
      <section id='s1' className={style.s1}>
        {/* <img src={img01} alt="o amor esta no ar" width={200} height={"auto"}/> */}
        {cards.map((item, index) => {
          return(
            <div key={index} className={style.crdzao}>
              <h5>{item.text}</h5>
              <p>{item.maiscoisa}</p>
              <img src={item.img} alt={item.text} width={200} height={"auto"}/>
            </div>
          )
        })}
      </section>
  
     </main>
    </>
  )
}

export default App