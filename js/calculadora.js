const appliances = {
    fridge: {
        models: [
            { name: 'Modelo A', power: 150 },
            { name: 'Modelo B', power: 200 }
        ]
    },
    washing_machine: {
        models: [
            { name: 'Modelo X', power: 500 },
            { name: 'Modelo Y', power: 600 }
        ]
    },
    microwave: {
        models: [
            { name: 'Modelo M1', power: 800 },
            { name: 'Modelo M2', power: 1000 }
        ]
    },
    tv: {
        models: [
            { name: 'Modelo TV1', power: 100 },
            { name: 'Modelo TV2', power: 150 }
        ]
    }
};

let totalConsumption = 0;
let appliancesList = [];

function updateModels() {
    const applianceSelect = document.getElementById('appliance');
    const modelSelect = document.getElementById('model');
    const selectedAppliance = applianceSelect.value;

    // Clear previous options
    modelSelect.innerHTML = '<option value="" disabled selected>Selecciona un modelo</option>';

    if (selectedAppliance) {
        const models = appliances[selectedAppliance].models;
        models.forEach(model => {
            const option = document.createElement('option');
            option.value = model.name;
            option.textContent = model.name;
            option.dataset.power = model.power;
            modelSelect.appendChild(option);
        });
    }

    document.getElementById('power').value = '';
}

function updatePower() {
    const modelSelect = document.getElementById('model');
    const selectedModel = modelSelect.options[modelSelect.selectedIndex];
    const power = selectedModel ? selectedModel.dataset.power : '';
    document.getElementById('power').value = power;
}

function addAppliance() {
    const power = parseFloat(document.getElementById('power').value);
    const hours = parseFloat(document.getElementById('hours').value);
    const days = parseFloat(document.getElementById('days').value);
    const appliance = document.getElementById('appliance').value;
    const model = document.getElementById('model').value;

    if (isNaN(power) || isNaN(hours) || isNaN(days)) {
        alert('Por favor, ingresa valores válidos.');
        return;
    }

    const consumption = (power * hours * days) / 1000;

    const applianceItem = {
        name: `${appliance} (${model})`,
        consumption: consumption
    };

    appliancesList.push(applianceItem);

    const applianceList = document.getElementById('applianceList');
    const listItem = document.createElement('li');
    listItem.textContent = `${applianceItem.name}: ${consumption.toFixed(2)} kWh`;
    applianceList.appendChild(listItem);

    totalConsumption += consumption;

    // Reset the form for the next input
    document.getElementById('consumptionForm').reset();
    document.getElementById('power').value = '';
}

function calculateTotal() {
    const cost = calculateCost(totalConsumption);
    const resultElement = document.getElementById('totalResult');
    resultElement.innerHTML = `Consumo total: ${totalConsumption.toFixed(2)} kWh al mes<br>Costo aproximado: S/ ${cost.toFixed(2)} al mes`;

    // Identificar el electrodoméstico con mayor consumo
    let maxConsumption = 0;
    let maxAppliance = '';
    appliancesList.forEach(item => {
        if (item.consumption > maxConsumption) {
            maxConsumption = item.consumption;
            maxAppliance = item.name;
        }
    });

    if (maxAppliance) {
        const recommendationElement = document.createElement('div');
        recommendationElement.className = 'recommendation';
        recommendationElement.innerHTML = `
            <h3>Electrodoméstico con mayor consumo:</h3>
            <p>${maxAppliance}: ${maxConsumption.toFixed(2)} kWh</p>
            <h3>Recomendaciones:</h3>
            <p>Para reducir el consumo de ${maxAppliance}, considera las siguientes recomendaciones:</p>
            <ul>
                <li>Asegúrate de utilizarlo solo cuando sea necesario.</li>
                <li>Opta por electrodomésticos de bajo consumo energético.</li>
                <li>Mantén el electrodoméstico en buen estado para asegurar su eficiencia.</li>
                <li>Desconéctalo cuando no esté en uso para evitar consumos en stand-by.</li>
            </ul>
        `;
        resultElement.appendChild(recommendationElement);
    }
}

function calculateCost(consumption) {
    let cost = 0;
    if (consumption <= 30) {
        cost = consumption * 0.49;
    } else if (consumption <= 140) {
        cost = (30 * 0.49) + ((consumption - 30) * 0.67);
    } else {
        cost = (30 * 0.49) + (110 * 0.67) + ((consumption - 140) * 0.73);
    }
    return cost;
}

// Inicializa el formulario
document.getElementById('appliance').addEventListener('change', updateModels);
document.getElementById('model').addEventListener('change', updatePower);
