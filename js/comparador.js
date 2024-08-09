const appliances = {
    refrigerador: [
        { model: 'Modelo A', power: 150 },
        { model: 'Modelo B', power: 200 },
        { model: 'Modelo C', power: 180 }
    ],
    lavadora: [
        { model: 'Modelo D', power: 500 },
        { model: 'Modelo E', power: 550 },
        { model: 'Modelo F', power: 600 }
    ],
    microondas: [
        { model: 'Modelo G', power: 800 },
        { model: 'Modelo H', power: 900 },
        { model: 'Modelo I', power: 1000 }
    ]
};

const recommendations = {
    refrigerador: 'Modelo A',
    lavadora: 'Modelo D',
    microondas: 'Modelo G'
};

function updateModels(applianceSelectId) {
    const appliance = document.getElementById(applianceSelectId).value;
    const modelSelect = document.getElementById(applianceSelectId.replace('appliance', 'model'));

    modelSelect.innerHTML = '<option value="">Selecciona un modelo</option>';
    
    if (appliances[appliance]) {
        appliances[appliance].forEach(({ model }) => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
        });
    }

    const powerInputId = applianceSelectId.replace('appliance', 'power');
    document.getElementById(powerInputId).value = '';
}

function updatePower(applianceSelectId, modelSelectId, powerInputId) {
    const appliance = document.getElementById(applianceSelectId).value;
    const model = document.getElementById(modelSelectId).value;
    const powerInput = document.getElementById(powerInputId);

    const selectedAppliance = appliances[appliance]?.find(item => item.model === model);

    if (selectedAppliance) {
        powerInput.value = selectedAppliance.power;
    } else {
        powerInput.value = '';
    }
}

function showRecommendation(applianceSelectId, recommendationId) {
    const appliance = document.getElementById(applianceSelectId).value;
    const recommendationElement = document.getElementById(recommendationId);

    if (recommendations[appliance]) {
        recommendationElement.textContent = `Recomendamos el ${recommendations[appliance]} para el electrodoméstico seleccionado.`;
    } else {
        recommendationElement.textContent = 'Por favor, selecciona un electrodoméstico para ver la recomendación.';
    }
}

function compareAppliances() {
    // Obtener los valores de los campos de entrada
    const appliance1 = document.getElementById('appliance1').value;
    const model1 = document.getElementById('model1').value;
    const power1 = parseFloat(document.getElementById('power1').value);
    const efficiency1 = document.getElementById('efficiency1').value;

    const appliance2 = document.getElementById('appliance2').value;
    const model2 = document.getElementById('model2').value;
    const power2 = parseFloat(document.getElementById('power2').value);
    const efficiency2 = document.getElementById('efficiency2').value;

    // Validar los valores de entrada
    if (!appliance1 || !model1 || isNaN(power1) || !efficiency1 || !appliance2 || !model2 || isNaN(power2) || !efficiency2) {
        alert('Por favor, completa todos los campos con valores válidos.');
        return;
    }

    // Crear un resultado comparativo
    const resultElement = document.getElementById('comparison-result');
    resultElement.innerHTML = `
        <h2>Comparación de Electrodomésticos</h2>
        <table>
            <tr>
                <th>Característica</th>
                <th>${appliance1} - ${model1}</th>
                <th>${appliance2} - ${model2}</th>
            </tr>
            <tr>
                <td>Potencia (W)</td>
                <td>${power1}</td>
                <td>${power2}</td>
            </tr>
            <tr>
                <td>Eficiencia Energética</td>
                <td>${efficiency1}</td>
                <td>${efficiency2}</td>
            </tr>
        </table>
        <p>${appliance1} - ${model1} consume ${power1 > power2 ? 'más' : 'menos'} energía que ${appliance2} - ${model2}.</p>
    `;
}
