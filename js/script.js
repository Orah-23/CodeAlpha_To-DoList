/*
 * Author: Francois Oratile Kgatlhanye
 * Date: 2026-04-20
 * Description: Logic and interaction for the To-Do List web application.
 */

let tasks = [];
let currentFilter = 'all';
let editingId = null;

// ── Initialise ──
function init() {
    const saved = localStorage.getItem('todo-tasks');
    if (saved) tasks = JSON.parse(saved);
    renderTasks();
}

// ── Persist to localStorage ──
function save() {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
}

// ────────────────────────────────────────────
//  Panel helpers
// ────────────────────────────────────────────
function showAddPanel() {
    editingId = null;
    document.getElementById('panelTitle').textContent = 'New Task';
    document.getElementById('txtName').value = '';
    document.getElementById('txtDesc').value = '';
    document.getElementById('nameError').textContent = '';
    document.getElementById('descCount').textContent = '0 / 400';
    document.getElementById('taskPanel').classList.add('open');
    setTimeout(() => document.getElementById('taskName').focus(), 220);
}

function showEditPanel(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    editingId = id;
    document.getElementById('panelTitle').textContent = 'Edit Task';
    document.getElementById('txtName').value = task.text;
    document.getElementById('txtDesc').value = task.description || '';
    document.getElementById('nameError').textContent = '';
    updateCharCount();
    document.getElementById('taskPanel').classList.add('open');
    setTimeout(() => document.getElementById('txtName').focus(), 220);
}

function hidePanel() {
    document.getElementById('taskPanel').classList.remove('open');
    editingId = null;
}

function handleOverlayClick(e) {
    if (e.target === document.getElementById('taskPanel')) hidePanel();
}

function updateCharCount() {
    const len = document.getElementById('txtDesc').value.length;
    document.getElementById('descCount').textContent = `${len} / 400`;
}

// ── Save task (add or edit) ──
function saveTask() {
    const txtName = document.getElementById('txtName');
    const txtDesc = document.getElementById('txtDesc');
    const nameError = document.getElementById('nameError');

    const name = txtName.value.trim();
    const desc = txtDesc.value.trim();

    if (!name) {
        nameError.textContent = 'Task name is required.';
        txtName.focus();
        return;
    }

    nameError.textContent = '';

    if (editingId !== null) {
        tasks = tasks.map(t =>
            t.id === editingId? { 
                ...t, 
                text: name, 
                description: desc 
            } : t
        );
    } else {
        tasks.unshift({
            id: Date.now(),
            text: name,
            description: desc,
            completed: false,
            createdAt: new Date().toISOString()
        });
    }

    save();
    renderTasks();
    hidePanel();
}

// ── Toggle completion ──
function toggleTask(id) {
    tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    save();
    renderTasks();
}

// ── Delete ──
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    save();
    renderTasks();
}

// ── Clear completed ──
function clearCompleted() {
    tasks = tasks.filter(t => !t.completed);
    save();
    renderTasks();
}

// ── Filter ──
function setFilter(btn, filter) {
    currentFilter = filter;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderTasks();
}

function getFilteredTasks() {
    const query = (document.getElementById('txtTask')?.value || '').toLowerCase().trim();

    let result = tasks;

    if (currentFilter === 'active')    result = result.filter(t => !t.completed);
    if (currentFilter === 'completed') result = result.filter(t => t.completed);

    if (query) {
        result = result.filter(t =>
            t.text.toLowerCase().includes(query) ||
            (t.description || '').toLowerCase().includes(query)
        );
    }

    return result;
}

// ── Render ──
function renderTasks() {
    const list          = document.getElementById('liTasks');
    const empState    = document.getElementById('empState');
    const liFooter    = document.getElementById('liFooter');
    const taskCount     = document.getElementById('taskCount');
    const completedCount = document.getElementById('completedCount');

    const filtered  = getFilteredTasks();
    const remaining = tasks.filter(t => !t.completed).length;
    const completed = tasks.filter(t => t.completed).length;

    taskCount.textContent     = `${remaining} task${remaining !== 1 ? 's' : ''} remaining`;
    completedCount.textContent = `${completed} completed`;
    liFooter.style.display  = tasks.length > 0 ? 'flex' : 'none';

    // Remove old task items
    Array.from(list.querySelectorAll('.task-item')).forEach(el => el.remove());

    if (filtered.length === 0) {
        empState.style.display = 'flex';
        const p = empState.querySelector('p');
        const query = (document.getElementById('txtTask')?.value || '').trim();
        if (query)                          p.textContent = 'No tasks match your search.';
        else if (currentFilter === 'completed') p.textContent = 'No completed tasks yet.';
        else if (currentFilter === 'active')    p.textContent = 'All tasks are done!';
        else                                    p.textContent = 'No tasks yet. Press + to add one!';
        return;
    }

    empState.style.display = 'none';

    filtered.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item${task.completed ? ' done' : ''}`;
        li.dataset.id = task.id;

        const descHTML = task.description
            ? `<span class="task-desc-preview">${escapeHTML(task.description)}</span>`
            : '';

        li.innerHTML = `
            <input
                type="checkbox"
                class="task-checkbox"
                ${task.completed ? 'checked' : ''}
                onchange="toggleTask(${task.id})"
                aria-label="Mark as ${task.completed ? 'incomplete' : 'complete'}"
            >
            <div class="task-text-wrap">
                <span class="task-name">${escapeHTML(task.text)}</span>
                ${descHTML}
            </div>
            <div class="task-actions">
                <button class="action-btn edit-btn" onclick="showEditPanel(${task.id})" title="Edit" aria-label="Edit task">✎</button>
                <button class="action-btn delete-btn" onclick="deleteTask(${task.id})" title="Delete" aria-label="Delete task">✕</button>
            </div>
        `;

        list.appendChild(li);
    });
}

// ── XSS guard ──
function escapeHTML(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

init();
