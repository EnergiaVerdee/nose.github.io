const applianceData = {
    refrigerator: [
        { model: 'Model A', voltage: 1.2 },
        { model: 'Model B', voltage: 1.5 }
    ],
    washing_machine: [
        { model: 'Model X', voltage: 0.8 },
        { model: 'Model Y', voltage: 1.0 }
    ],
    air_conditioner: [
        { model: 'Model M', voltage: 2.5 },
        { model: 'Model N', voltage: 3.0 }
    ]
};

let appliances = [];

function updateModels() {
    const applianceSelect = document.getElementById('appliance');
    const modelSelect = document.getElementById('model');
    const modelGroup = document.getElementById('model-group');
    
    const selectedAppliance = applianceSelect.value;
    if (selectedAppliance) {
        modelSelect.innerHTML = '<option value="">Selecciona un modelo</option>';
        applianceData[selectedAppliance].forEach(model => {
            const option = document.createElement('option');
            option.value = model.model;
            option.text = `${model.model} - ${model.voltage} kWh`;
            modelSelect.appendChild(option);
        });
        modelGroup.style.display = 'block';
    } else {
        modelGroup.style.display = 'none';
    }
}

function addAppliance() {
    const appliance = document.getElementById('appliance').value;
    const modelSelect = document.getElementById('model');
    const model = modelSelect.value;
    const usageTime = document.getElementById('usageTime').value;
    const duration = parseFloat(document.getElementById('duration').value);

    if (!appliance || !model || !usageTime || isNaN(duration) || duration <= 0) {
        alert('Por favor, ingresa valores válidos para todos los campos.');
        return;
    }

    const voltage = applianceData[appliance].find(item => item.model === model).voltage;
    
    appliances.push({ appliance, model, usageTime, duration, voltage });
    updateApplianceList();
}

function updateApplianceList() {
    const applianceList = document.getElementById('appliance-list');
    applianceList.innerHTML = '';
    appliances.forEach((appliance, index) => {
        applianceList.innerHTML += `
            <div class="appliance-item">
                <p>${appliance.appliance} - ${appliance.model} - ${appliance.usageTime} - ${appliance.duration}h - ${appliance.voltage} kWh</p>
                <button onclick="removeAppliance(${index})">Eliminar</button>
            </div>
        `;
    });
}

function removeAppliance(index) {
    appliances.splice(index, 1);
    updateApplianceList();
}

function calculateTotalSavings() {
    let totalSavings = 0;

    appliances.forEach(appliance => {
        let rate;
        if (appliance.voltage * appliance.duration <= 30) {
            rate = 0.49;
        } else if (appliance.voltage * appliance.duration <= 140) {
            rate = 0.67;
        } else {
            rate = 0.73;
        }
        
        const usageCost = appliance.voltage * appliance.duration * rate;
        totalSavings += usageCost;
    });

    const resultElement = document.getElementById('scheduler-result');
    resultElement.innerHTML = `
        <h2>Resultado del Ahorro</h2>
        <p>El costo total estimado para el uso programado es de S/ ${totalSavings.toFixed(2)}.</p>
    `;
}
