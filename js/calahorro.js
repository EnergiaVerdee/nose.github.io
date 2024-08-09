function calculateSavings() {
    // Obtener los valores de los campos de entrada
    const currentUsage = parseFloat(document.getElementById('currentUsage').value);
    const newUsage = parseFloat(document.getElementById('newUsage').value);

    // Validar los valores de entrada
    if (isNaN(currentUsage) || isNaN(newUsage) || currentUsage <= 0 || newUsage <= 0) {
        alert('Por favor, ingresa valores válidos para el consumo.');
        return;
    }

    // Determinar la tarifa según el consumo
    const getRate = (usage) => {
        if (usage <= 30) {
            return 0.49;
        } else if (usage <= 140) {
            return 0.67;
        } else {
            return 0.73;
        }
    };

    const currentRate = getRate(currentUsage);
    const newRate = getRate(newUsage);

    // Calcular el ahorro
    const savings = (currentUsage * currentRate) - (newUsage * newRate);
    const annualSavings = savings * 12;

    // Mostrar el resultado
    const resultElement = document.getElementById('savings-result');
    resultElement.innerHTML = `
        <h2>Resultado del Ahorro</h2>
        <p>Ahorro mensual: S/ ${savings.toFixed(2)}</p>
        <p>Ahorro anual: S/ ${annualSavings.toFixed(2)}</p>
    `;
}
