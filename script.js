const taskList = document.getElementById('taskList');
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');

// Função para buscar e exibir a lista de tarefas do banco de dados
async function fetchTasks() {
    try {
        const response = await fetch('http://localhost:3000/tasks');        
        if (!response.ok) {
            throw new Error(`Erro: ${response.statusText}`);
        }
        
        const tasks = await response.json();
        taskList.innerHTML = ''; // Limpar a lista antes de renderizar as novas tarefas
        
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.taskName; // Acessando o nome da tarefa
            li.className = 'task';

            // Botão de edição
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.addEventListener('click', () => {
                editTask(task.id, task.taskName); // Chama a função de edição passando o ID e o nome da tarefa
            });

            li.appendChild(editButton); // Adiciona o botão ao elemento da tarefa
            taskList.appendChild(li);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.addEventListener('click', () => {
                deleteTask(task.id);
            });
            
            li.appendChild(deleteButton); // Adiciona o botão primeiro
            taskList.appendChild(li); // Adiciona o li completo ao taskList
        });

    } catch (error) {
        console.error('Erro ao buscar as tarefas:', error);
        alert('Não foi possível carregar a lista de tarefas.');
    }
}

async function editTask(id, currentName) {
    const newName = prompt("Edite o nome da tarefa:", currentName); // Exibe o nome atual como valor padrão

    if (!newName) {
        alert("O nome da tarefa não pode estar vazio!");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ taskName: newName }),
        });

        if (!response.ok) {
            throw new Error(`Erro ao editar a tarefa: ${response.statusText}`);
        }

        fetchTasks(); // Atualiza a lista para mostrar a tarefa editada
    } catch (error) {
        console.error('Erro ao editar a tarefa:', error);
        alert('Não foi possível editar a tarefa.');
    }
}

async function deleteTask(id) {
    try {
        console.log('Tentando excluir a tarefa com ID:', id); // Log para depuração

        const response = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log('Tarefa excluída com sucesso');
            fetchTasks();
        } 
    } catch (error) {
        console.error('Erro ao excluir a tarefa:', error);
        alert('Não foi possível excluir a tarefa.');
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
