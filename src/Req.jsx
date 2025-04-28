import { useEffect, useState } from 'react'
import style from './Req.module.css'
import { apiRick } from './api/api'
import { Card } from './components/card'
import ModalInfo from './modalInfo'
import Tilt from 'react-parallax-tilt'


export default function Req(){
    const [data,setData] = useState([])
    const [page, setPage] = useState("")
    const [searchName, setSearchName] = useState("")
    const[erro,setErro] = useState(false)
    const[modal, setModal] = useState();

    useEffect(() =>{
        apiRick.get(`/character?page=${page}&name=${searchName}`).then((response) =>{
            setData(response.data.results)
        }).catch((error) => {
            if(error.response.status === 404){
                setErro(true)
            }
            
    })
    }, [page,searchName])
    console.log(data)

    return(
        <>
        {modal !== undefined &&<ModalInfo data={data[modal]}close ={() => setModal()}/>}
        <section className={style.wraPage}>
            <h1 className={style.titleName}>Rick and Morty Api</h1>
            <input type="text" placeholder="digite uma pagina de (1/42)" value={page} onChange={(e) => setPage(e.target.value)}/>
            {erro && <p>Pagina não encontrada</p>}

            <input 
            type="text" 
            placeholder='Digite um nome'
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
             />

            <div className={style.wrapCard}>
                {data.map((item,index)=> {
                return(
                    
                    <div key={index} style={{display: "flex", flexDirection: "column", gap: "10px", padding: "10px", border: "2px solid black"}}>
                        <Tilt>
                            <Card name={item.name} image={item.image} />
                        </Tilt>
                        
                        <button onClick={() => setModal(index)}>Info = {item.name}</button>
                    </div>
                    
                   
                    
                )
            })}
            </div>
            
        </section>
        </>
        
    )
}
