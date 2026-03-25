const tutorial1212 = () => ({
     "Reset de cilindro": "x3R-t4_XNIk?si=IJY9w0_5Tukq0gko" 
    });
const tutorial1617 = () => ({
     "Reset do Toner": "xjr-k1qrDfg?si=uGfcfphporeRG8LD",
     "Troca de suprimentos": "XLO32Hbwtlc?si=AIgETtpt6M637ZA7"
    });
const tutorial2540 = () => ({
    "Imprimir configuração de rede": "mVowccKhGMU?si=xPstGU8-uSBJHlaC",
    "Contador de páginas": "yy-Ffu0yDps?si=aUn4d93waCAlryie",
    "Número de série": "Z8YWI9urIyk?si=G8YNz2Si4I5qQbT6",
    "Como conectar na rede wifi ": "q4_XiqbiCiw?si=8ZLgwhcJQDTi0ya5",
    "Reset de cilindro": "NlppUmYf9wA?si=LOv0hRW4yhNKcuj8",
    "Erro de cilindro": "NlppUmYf9wA?si=LOv0hRW4yhNKcuj8",
    "Trocar de suprimentos (Toner e Cilindro)": "OUZPBRv8gVw?si=YZv5Q_hwWmgD-bN7" });
const tutorial5652 = () => ({
    "Resetar o cilindro": "6GkvMVpgjDg?si=p0Erohf90HeqBUJK",
    "Erro de cilindro": "6GkvMVpgjDg?si=p0Erohf90HeqBUJK",
    "Resetar o Toner": "Zwleny5Fh2k?si=C6lG--L7U643Z2r3" });
const tutorial7065 = () => ({
    "Pouco toner": "o745FjgCzI0?si=Lu_AEy5Zr4qvJogV",
    "Troca de cartucho de toner": "wf884_XWfqo?si=OBELXfxci9ktJTiI",
    "Reset de cilindro": "7LU_7OcF_IQ?si=XR2W8fH927fV1zM0" });
const tutorial8157 = () => ({
    "Erro de cilindro": "fYDQFff76zw?si=U9x10DxX6XV6_LBh",
    "Reset de cilindro": "fYDQFff76zw?si=U9x10DxX6XV6_LBh" });

const mapearImps = (lista, tutorialFn) => 
    Object.fromEntries(lista.map(nome => [nome, tutorialFn()]));

export const dadosImpressoras = {
    Brother: {
        ...mapearImps(["DCP-1212", "DCP-1222", "DCP-1202"], tutorial1212),
        ...mapearImps(["DCP-L2540", "DCP-L2520", "MFC-L2700"], tutorial2540),
        ...mapearImps(["DCP-L5652", "DCP-L5602"], tutorial5652),
        ...mapearImps(["DCP-8157", "DCP-8112", "DCP-8912"], tutorial8157),
        
        "DCP-1617": tutorial1617(),
        "DCP-7065": tutorial7065(),
    },
};
