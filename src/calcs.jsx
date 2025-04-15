import style from './calcs.module.css';
import { useEffect, useState } from 'react';

export default function Calcs() {
    const [n1, setN1] = useState(0);
    const [n2, setN2] = useState(0);
    const [resSoma, setResSoma] = useState(0);
    const [resSub, setResSub] = useState(0);
    const [resMult, setResMult] = useState(0);
    const [resDiv, setResDiv] = useState(0);

    const somar = () => setResSoma(parseFloat(n1) + parseFloat(n2));
    const subtrair = () => setResSub(parseFloat(n1) - parseFloat(n2));
    const multiplicar = () => setResMult(parseFloat(n1) * parseFloat(n2));
    const dividir = () => setResDiv(parseFloat(n1) / parseFloat(n2));


const handleAll = (a,b) => { 
    setResSoma(parseFloat(a) + parseFloat(b));
    setResSub(parseFloat(a) - parseFloat(b));
    setResMult(parseFloat(a) * parseFloat(b));
    setResDiv(parseFloat(a) / parseFloat(b));
}


    useEffect(() => {
        setResSoma(parseFloat(n1) + parseFloat(n2));
        setResSub(parseFloat(n1) - parseFloat(n2));
        setResMult(parseFloat(n1) * parseFloat(n2));
        setResDiv(parseFloat(n1) / parseFloat(n2));
    
    }, [n1,n2])
    

    return (
        <>
            <a href="/" className={style.backbtn}>Voltar</a>
            <h1>Calculadora</h1>
            <div>
                <h4>Digite os números para calcular</h4>
                <input type="number" value={n1} onChange={(e) => setN1(e.target.value)} placeholder="Primeiro Número" />
                <input type="number" value={n2} onChange={(e) => setN2(e.target.value)} placeholder="Segundo Número" />
            </div>
            <div>
                <h4>Respostas</h4>
                <p>
                    <button onClick={somar}>Somar</button>
                    Resultado: {!isNaN(resSoma) ? resSoma : "digite numeros validos"}
                </p>
                <p>
                    <button onClick={subtrair}>Subtrair</button>
                    Resultado: {!isNaN(resSub) ? resSub : "digite numeros validos"}
                </p>
                <p>
                    <button onClick={multiplicar}>Multiplicar</button>
                    Resultado: {!isNaN(resMult) ? resMult : "digite numeros validos"}
                </p>
                <p>
                <button onClick={dividir}>Dividir</button>
                Resultado: {
                                 n2 === "0" ? "Erro ao dividir por 0"
                                 : isNaN(resDiv) ? "Digite números válidos"
                                 : resDiv
                            }   
                </p>


                <button onClick={handleAll}>Calcular tudo</button>

            </div>
        </>
    );
}
