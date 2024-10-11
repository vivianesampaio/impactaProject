const taskList = document.getElementById('taskList');
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');

// Função para buscar e exibir a lista de tarefas
async function fetchTasks() {
    const response = await fetch('http://localhost:3000/tasks'); // Altere para incluir a porta
    const tasks = await response.json();
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.name; // Acessando o nome da tarefa
        li.className = 'task';

        // Cria o botão de excluir
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', () => deleteTask(task.id)); // Associa a função de excluir à tarefa

        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

// // Função para excluir uma tarefa
// async function deleteTask(taskId) {
//     try {
//         const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
//             method: 'DELETE',
//         });

//         if (!response.ok) {
//             const errorMessage = await response.text();
//             throw new Error(`Erro ao excluir a tarefa: ${errorMessage}`);
//         }

//         fetchTasks(); // Atualiza a lista de tarefas após a exclusão
//     } catch (error) {
//         console.error('Erro:', error);
//         alert('Não foi possível excluir a tarefa.'); // Mensagem de alerta em caso de erro
//     }
// }

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
