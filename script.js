const taskList = document.getElementById('taskList');
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');

// Função para buscar e exibir a lista de tarefas do banco de dados
async function fetchTasks() {
    try {
        const response = await fetch('http://localhost:3000/tasks'); // Altere para incluir a porta correta do backend
        if (!response.ok) {
            throw new Error(`Erro: ${response.statusText}`);
        }
        
        const tasks = await response.json();
        const taskList = document.getElementById('taskList'); // Supondo que o ID do UL/OL seja 'taskList'
        taskList.innerHTML = ''; // Limpar a lista antes de renderizar as novas tarefas
        
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.taskName; // Acessando o nome da tarefa
            li.className = 'task'; // Classe para estilização se necessário
            taskList.appendChild(li);
        });

    } catch (error) {
        console.error('Erro ao buscar as tarefas:', error);
        alert('Não foi possível carregar a lista de tarefas.');
    }
}


// Evento para enviar o formulário e adicionar uma nova tarefa
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newTask = { name: taskInput.value }; // Captura o valor do input

    try {
        const response = await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        });

        if (!response.ok) {
            const errorMessage = await response.text(); 
            throw new Error(`Erro ao adicionar a tarefa: ${errorMessage}`);
        }

        taskInput.value = ''; // Limpa o campo de entrada
        fetchTasks(); // Atualiza a lista após adicionar a nova tarefa
    } catch (error) {
        console.error('Erro:', error);
        alert('Não foi possível adicionar a tarefa.'); // Mensagem de alerta em caso de erro
    }
});

// Inicializa a lista de tarefas ao carregar a página
fetchTasks();
