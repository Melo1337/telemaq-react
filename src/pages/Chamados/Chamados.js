import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { fetchApi } from "../../services/requestProducts";


const Chamados = () => {

    const [repositoryChamados , setRepositoryChamados] = useState([])

    useEffect(() => {
        const getApiChamados = async () => {
            const data = await fetchApi('chamados')
            setRepositoryChamados(data)
        }
        getApiChamados()
    }, [])

    return (
        <>
        <Header/>
        <section className="">
            {console.log(Object.values(repositoryChamados))}
        </section>
        <Footer/>
        </>
    }
}

export default Chamados;