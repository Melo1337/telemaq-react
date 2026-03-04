import listPrinters from "../../data/json/products.json";
import ButtomWhatsapp from "../ButtomWhatsapp/ButtomWhatsapp";
import { Link } from "react-router-dom";
import './Market.css'

function Market() {
    return (
        <>
            {Object.entries(listPrinters).map(([nomeDaCategoria, listaDeProdutos]) => {
                return (
                    <div key={nomeDaCategoria} className={nomeDaCategoria}>
                        <p>{nomeDaCategoria}</p>
                    </div>
                );
            })}
        </>
    );
}

export default Market;
