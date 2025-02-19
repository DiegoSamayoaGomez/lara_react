import { useEffect, useState } from "react";
import axios from "axios";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    // Obtener los datos del usuario y las tareas del localStorage
    const storedUser = localStorage.getItem("user");
    const tasksData = localStorage.getItem("tasks");

    if (storedUser && tasksData) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData); // Establecer el usuario
        const tasksList = JSON.parse(tasksData);
        setTasks(tasksList); // Establecer las tareas
      } catch (error) {
        console.error("Error al parsear los datos:", error);
      }
    }
  }, []);

  const endpoint = "http://127.0.0.1:8000/api";

  // Función para crear una nueva tarea
  const createTask = async () => {
    if (newTask.title && newTask.description) {
      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/user/${user.id}/tasks`,
          newTask
        );
        setTasks((prevTasks) => [...prevTasks, response.data]); // Añadir la nueva tarea de forma segura
        setNewTask({ title: "", description: "" }); // Limpiar formulario
      } catch (error) {
        console.error("Error al crear tarea:", error);
      }
    }
  };

  // Función para editar una tarea
  const editTask = async () => {
    if (editingTask) {
      try {
        const response = await axios.put(
          `/user/${user.id}/tasks/${editingTask.id}`,
          editingTask
        );
        setTasks(
          tasks.map((task) =>
            task.id === editingTask.id ? response.data : task
          )
        );
        setEditingTask(null); // Limpiar estado de tarea editada
      } catch (error) {
        console.error("Error al editar tarea:", error);
      }
    }
  };

  // Función para eliminar una tarea
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`/user/${user.id}/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task.id !== taskId)); // Eliminar la tarea de la lista
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  return (
    <div>
      <h1>Hola, {user ? user.name : "Usuario"}</h1>
      <h2>Tareas</h2>

      {/* Formulario para crear una nueva tarea */}
      <div>
        <h3>Crear nueva tarea</h3>
        <input
          type="text"
          placeholder="Título"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <button onClick={createTask}>Crear tarea</button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>
                  {editingTask && editingTask.id === task.id ? (
                    <input
                      type="text"
                      value={editingTask.title}
                      onChange={(e) =>
                        setEditingTask({
                          ...editingTask,
                          title: e.target.value,
                        })
                      }
                    />
                  ) : (
                    task.title
                  )}
                </td>
                <td>
                  {editingTask && editingTask.id === task.id ? (
                    <input
                      type="text"
                      value={editingTask.description}
                      onChange={(e) =>
                        setEditingTask({
                          ...editingTask,
                          description: e.target.value,
                        })
                      }
                    />
                  ) : (
                    task.description
                  )}
                </td>
                <td>
                  {editingTask && editingTask.id === task.id ? (
                    <button
                      onClick={editTask}
                      className="btn btn-primary btn-sm mx-1"
                    >
                      Guardar
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditingTask(task)}
                      className="btn btn-warning btn-sm mx-1"
                    >
                      Editar
                    </button>
                  )}
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="btn btn-danger btn-sm mx-1"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No hay tareas disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;
