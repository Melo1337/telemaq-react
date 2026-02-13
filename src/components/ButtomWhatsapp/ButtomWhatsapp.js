import './ButtomWhatsapp.css'

function ButtomWhatsapp({texto, link, icon}) {

    return (
            <a href={`https://wa.me/5532984195001?text=${link}`}>
                <div className="btn whatsapp">
                    <i className={icon}></i>
                    <h4>{texto}</h4>
                </div>
            </a>
    );
}

export default ButtomWhatsapp;
