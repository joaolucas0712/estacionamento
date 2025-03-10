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
                <button onclick="editCarro(${carro.id})"> Editar </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}


document.getElementById("carrosForm").addEventListener('submit', async(e) =>{
    e.preventDefault()

    const placa = document.getElementById('placa').value
    const modelo = document.getElementById('modelo').value
  
    await fetch('http://localhost:3030/carros'),{
        method: 'POST',
        headers: {'content-Type': 'application/json'},
        body: JSON.stringify({placa, modelo})
    }

    document.getElementById('carrosForm')
    
})