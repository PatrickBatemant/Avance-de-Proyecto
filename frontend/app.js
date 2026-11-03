const API_URL = 'http://localhost:3000/api';

// Lógica para la página de Login (index.html)
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            
            if (res.ok) {
                localStorage.setItem('token', data.token);
                window.location.href = 'dashborad.html';
            } else {
                alert(data.msg);
            }
        } catch (error) { console.error(error); }
    });
}

// Lógica para el Dashboard (dashboard.html)
if (document.getElementById('taskList')) {
    const token = localStorage.getItem('token');
    if (!token) window.location.href = 'index.html'; // Si no hay token, al login

    const taskList = document.getElementById('taskList');
    const taskForm = document.getElementById('taskForm');

    // Cerrar sesión
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = 'index.html';
    });

    // Cargar tareas (READ)
    const loadTasks = async () => {
        const res = await fetch(`${API_URL}/tasks`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const tasks = await res.json();
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <strong>${task.title}</strong><br>
                    <small>${task.description || ''}</small>
                </div>
                <button onclick="deleteTask('${task._id}')">Eliminar</button>
            `;
            taskList.appendChild(li);
        });
    };

    // Agregar tarea (CREATE)
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDesc').value;

        await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, description })
        });
        
        taskForm.reset();
        loadTasks();
    });

    // Eliminar tarea (DELETE) - Función global
    window.deleteTask = async (id) => {
        await fetch(`${API_URL}/tasks/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        loadTasks();
    };

    loadTasks();
}