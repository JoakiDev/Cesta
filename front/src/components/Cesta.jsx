import { useContext, useEffect, useState } from "react"
import { ethers } from "ethers"
import { Context } from "../main"
import { Link } from "react-router-dom"

export function Cesta() {
    const [estado, setEstado] = useContext(Context)
    const [cuenta, setCuenta] = useState(null)
    const [txOK, setTxOK] = useState(null)
    const [txKO, setTxKO] = useState(null)
    const total = estado.cesta.reduce((acc, item) => acc + item.total, 0)
    useEffect(()=>{
        window.ethereum && window.ethereum.request({
            method: 'eth_requestAccounts'
        }).then(cuentas => {
            setCuenta(cuentas[0])
            ethereum.on("accountsChanged", (cuentas) => {
                setCuenta(cuentas[0])
            })
        })
    }, [])

    async function pagar() {
        const txParams = {
            to:"0xf430aed04da67D48079521c2Eb8dA1a8B0FB1FF7",
            from: cuenta,
            value: ethers.toQuantity(ethers.parseEther(total.toString()))
        }
        try { 
            const tx = await ethereum.request({
                method: "eth_sendTransaction",
                params: [txParams]
            })
            setTxOK(tx)
        } catch (error){
            setTxKO(error)
        }
    }

    return <div>
        <table className="table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {estado.cesta.map(i => (
                    <tr key={i.producto.ProductID}>
                        <td>
                            <Link to={`/productos/${i.producto.ProductID}`}>{i.producto.ProductID}</Link>
                        </td>
                        <td>{i.producto.ProductName}</td>
                        <td>{i.cantidad}</td>
                        <td>{i.producto.UnitPrice}</td>
                        <td>{i.total}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <h3>Total: {total}</h3>
        <h4>{cuenta}</h4>
        <button className="btn btn-primary" onClick={()=>pagar()}>Pagar</button>
        {txOK && <p className="alert alert-success">{txOK}</p>}
        {txKO && <p className="alert alert-error">{txKO}</p>}
    </div>
}