function evaluateEfficiency() {
    // Obtener los valores de los campos de entrada
    const lighting = parseFloat(document.getElementById('lighting').value);
    const heating = parseFloat(document.getElementById('heating').value);
    const cooling = parseFloat(document.getElementById('cooling').value);
    const appliances = parseFloat(document.getElementById('appliances').value);
    const insulation = document.getElementById('insulation').value;
    const renewable = document.getElementById('renewable').value;
    const windows = parseFloat(document.getElementById('windows').value);
    const smartThermostat = document.getElementById('smart_thermostat').value;

    // Validar los valores de entrada
    if (isNaN(lighting) || isNaN(heating) || isNaN(cooling) || isNaN(appliances) || isNaN(windows) ||
        lighting < 0 || heating < 0 || cooling < 0 || appliances < 0 || windows < 0) {
        alert('Por favor, ingresa valores válidos para todas las preguntas.');
        return;
    }

    // Evaluar la eficiencia energética con un puntaje simple
    let score = 0;
    score += lighting <= 5 ? 2 : 1;
    score += heating <= 2 ? 2 : 1;
    score += cooling <= 2 ? 2 : 1;
    score += appliances <= 10 ? 2 : 1;
    score += insulation === 'yes' ? 2 : (insulation === 'partial' ? 1 : 0);
    score += renewable === 'yes' ? 2 : 0;
    score += windows >= 4 ? 2 : 1;
    score += smartThermostat === 'yes' ? 2 : 0;

    // Generar recomendaciones basadas en el puntaje
    let recommendations = '';
    if (score >= 14) {
        recommendations = '¡Tu hogar es muy eficiente! Sigue así y considera mejorar los pequeños detalles.';
    } else if (score >= 10) {
        recommendations = 'Tu hogar tiene una buena eficiencia, pero hay áreas de mejora. Considera reducir el uso de calefacción y aire acondicionado, e incrementar el uso de fuentes de energía renovable.';
    } else {
        recommendations = 'Tu hogar podría ser más eficiente. Revisa el aislamiento térmico, optimiza el uso de electrodomésticos y considera instalar ventanas de doble acristalamiento y un termostato inteligente.';
    }

    // Mostrar el resultado
    const resultElement = document.getElementById('test-result');
    resultElement.innerHTML = `
        <h2>Resultado del Test</h2>
        <p>Puntaje de Eficiencia: ${score}/16</p>
        <p>${recommendations}</p>
    `;
}
