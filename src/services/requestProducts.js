export async function getProdutos() {
        const response = await fetch('../data/json/products.json');
        return await response.json();
}