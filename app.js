
document.getElementById('LoginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const senha = document.getElementById('senha').value;

    const response = await fetch('http://localhost:3002/login', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, senha }) 
    });

    const results = await response.json();

    if (results.success) {
        alert('Login bem-sucedido');
        window.location.href = 'dashboard.html';
    } else {
        alert('Usuário ou senha incorretos');
    }
});


async function loadCarros() {
    const response = await fetch('http://localhost:3030/carros');
    const data = await response.json();
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    data.forEach(carro => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${carro.id}</td>
            <td>${carro.placa}</td>
            <td>${carro.modelo}</td>
            <td>
                <button onclick="editCarros(${carro.id})">Editar</button>
                <button onclick="deleteCarro(${carro.id})">Excluir</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}


document.getElementById("carrosForm").addEventListener('submit', async (e) => {
    e.preventDefault();

    const placa = document.getElementById('placa').value;
    const modelo = document.getElementById('modelo').value;

    await fetch('http://localhost:3030/carros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ placa, modelo })
    });

    loadCarros(); 
});


async function editCarros(id) {
    const placa = prompt("Nova placa:");
    const modelo = prompt("Novo modelo:");

    if (placa && modelo) {
        await fetch(`http://localhost:3030/carros/${id}`, { 
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ placa, modelo })
        });

        loadCarros(); 
    }
}

async function deleteCarro(id) {
    await fetch(`http://localhost:3030/carros/${id}`, {
        method: 'DELETE'
    });

    loadCarros();
}


loadCarros();
