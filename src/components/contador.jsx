import { useState } from "react";

function RenderizarContador() {
    const [form, setForm] = useState({
        CODIGO_CLIENTE: '',
        N_SERIE: "",
        DATA_CONTAGEM: "",
        CONTAGEM: "",
        N_COPIAS: "",
        COPIAS_ALEM: '',
        VALOR_ALEM: '',
        VALOR_PAGAR: '',
        PAGAMENTO: "",
        DATA_PAGAMENTO: "",
        CUSTO_FRANQUIA: '',
        CUSTO_ALEM: '',
        N_COPIAS_FRANQUIA: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const enviarDados = async (e) => {
        e.preventDefault(); // Agora funciona corretamente cortando o envio nativo

        // Tratando os tipos de dados (Garante null se o campo estiver vazio para não quebrar o Number)
        const payload = {
            CODIGO_CLIENTE: form.CODIGO_CLIENTE ? Number(form.CODIGO_CLIENTE) : null,
            N_SERIE: form.N_SERIE,
            DATA_CONTAGEM: form.DATA_CONTAGEM,
            CONTAGEM: form.CONTAGEM ? Number(form.CONTAGEM) : null,
            N_COPIAS: form.N_COPIAS ? Number(form.N_COPIAS) : null,
            COPIAS_ALEM: form.COPIAS_ALEM ? Number(form.COPIAS_ALEM) : null,
            VALOR_ALEM: form.VALOR_ALEM ? Number(form.VALOR_ALEM) : null,
            VALOR_PAGAR: form.VALOR_PAGAR ? Number(form.VALOR_PAGAR) : null,
            PAGAMENTO: form.PAGAMENTO || null,
            DATA_PAGAMENTO: form.DATA_PAGAMENTO || null,
            CUSTO_FRANQUIA: form.CUSTO_FRANQUIA ? Number(form.CUSTO_FRANQUIA) : null,
            CUSTO_ALEM: form.CUSTO_ALEM ? Number(form.CUSTO_ALEM) : null,
            N_COPIAS_FRANQUIA: form.N_COPIAS_FRANQUIA ? Number(form.N_COPIAS_FRANQUIA) : null
        };

        try {
            const response = await fetch('http://localhost:3000/api/historico', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.mensagem);
                // Reseta o formulário limpando os campos
                setForm({
                    CODIGO_CLIENTE: '',
                    N_SERIE: "",
                    DATA_CONTAGEM: "",
                    CONTAGEM: "",
                    N_COPIAS: "",
                    COPIAS_ALEM: '',
                    VALOR_ALEM: '',
                    VALOR_PAGAR: '',
                    PAGAMENTO: "",
                    DATA_PAGAMENTO: "",
                    CUSTO_FRANQUIA: '',
                    CUSTO_ALEM: '',
                    N_COPIAS_FRANQUIA: ''
                });
            } else {
                // Alinhado com o retorno do backend: data.error ou data.erro
                alert(`Erro: ${data.error || data.erro || 'Falha desconhecida'}`);
            }
        } catch (err) {
            console.error(err);
            alert('Não foi possível conectar ao servidor backend.');
        }
    };

    return (
        <>
            {/* CORREÇÃO: Passando apenas a referência da função sem colocar parênteses () */}
            <form onSubmit={enviarDados} className="flex-col" style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
                
                {/* CORREÇÃO EM TODOS OS INPUTS: Adicionado o atributo name correspondente ao estado */}
                <div>
                    <input type="number" name="CODIGO_CLIENTE" placeholder="Código do Cliente" value={form.CODIGO_CLIENTE} onChange={handleInputChange} required />
                </div>
                <div>
                    <input type="text" name="N_SERIE" placeholder="Número de Série" value={form.N_SERIE} onChange={handleInputChange} required />
                </div>
                <div>
                    <input type="date" name="DATA_CONTAGEM" placeholder="Data Contagem" value={form.DATA_CONTAGEM} onChange={handleInputChange} required />
                </div>
                <div>
                    <input type="number" name="CONTAGEM" placeholder="Contagem" value={form.CONTAGEM} onChange={handleInputChange} required />
                </div>
                <div>
                    <input type="number" name="N_COPIAS" placeholder="Nº de Cópias" value={form.N_COPIAS} onChange={handleInputChange} />
                </div>
                <div>
                    <input type="number" name="COPIAS_ALEM" placeholder="Cópias Além" value={form.COPIAS_ALEM} onChange={handleInputChange} />
                </div>
                <div>
                    <input type="number" step="0.01" name="VALOR_ALEM" placeholder="Valor Além" value={form.VALOR_ALEM} onChange={handleInputChange} />
                </div>
                <div>
                    <input type="number" step="0.01" name="VALOR_PAGAR" placeholder="Valor a Pagar" value={form.VALOR_PAGAR} onChange={handleInputChange} />
                </div>
                <div>
                    <input type="text" maxLength={1} name="PAGAMENTO" placeholder="Pagamento (S/N)" value={form.PAGAMENTO} onChange={handleInputChange} />
                </div>
                <div>
                    <input type="date" name="DATA_PAGAMENTO" placeholder="Data Pagamento" value={form.DATA_PAGAMENTO} onChange={handleInputChange} />
                </div>
                <div>
                    <input type="number" step="0.01" name="CUSTO_FRANQUIA" placeholder="Custo Franquia" value={form.CUSTO_FRANQUIA} onChange={handleInputChange} />
                </div>
                <div>
                    <input type="number" step="0.01" name="CUSTO_ALEM" placeholder="Custo Além" value={form.CUSTO_ALEM} onChange={handleInputChange} />
                </div>
                <div>
                    <input type="number" name="N_COPIAS_FRANQUIA" placeholder="Nº Cópias Franquia" value={form.N_COPIAS_FRANQUIA} onChange={handleInputChange} />
                </div>
                
                <button type="submit" style={{ cursor: 'pointer', padding: '8px' }}>
                    Cadastrar Registro
                </button>
            </form>
        </>
    );
}

export default RenderizarContador;
