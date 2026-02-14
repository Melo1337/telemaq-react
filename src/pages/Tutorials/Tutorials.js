import Header from '../../components/Header/Header'; 
import Footer from '../../components/Footer/Footer'; 

function Tutorials() {

    return (
        <>
            <Header />
            <select id="marcas" name="marcas">
                <option value="1">Brother</option>
                <option value="2">HP</option>
            </select>
            <select id="modelo" name="modelo">
                <option value="1">2540</option>
                <option value="2">7065</option>
                <option value="3">8912</option>
                <option value="4">5652</option>
            </select>
            <Footer />
        </>
    );
}

export default Tutorials;