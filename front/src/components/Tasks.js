import React, { useState, useEffect } from "react";
import axios from "axios";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editingTask, setEditingTask] = useState(null);
  const [count, setCount] = useState(0);

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

  // Función para obtener las tareas
  const getAllTasks = async () => {
    if (user) {
      try {
        const response = await axios.get(`${endpoint}/user/${user.id}/tasks`);
        setTasks(response.data); // Establecer las tareas recibidas
      } catch (error) {
        console.error("Error al obtener las tareas:", error);
      }
    }
  };

  // Función para crear una nueva tarea
  const createTask = async () => {
    if (!newTask.title || !newTask.description) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    try {
      // Enviar la tarea al servidor (POST)
      const response = await axios.post(`${endpoint}/user/${user.id}/tasks`, {
        title: newTask.title,
        description: newTask.description,
      });

      console.log("Tarea creada:", response.data);

      getAllTasks(); // Recargar las tareas después de eliminar

      // Limpiar los campos después de la creación
      setNewTask({ title: "", description: "" });
    } catch (error) {
      console.error("Error al crear la tarea:", error);
    }
  };

  // Función para eliminar una tarea
  const deleteTask = async (userId, taskId) => {
    try {
      const response = await axios.delete(
        `${endpoint}/user/${userId}/tasks/${taskId}`
      );
      console.log("Tarea eliminada:", response.data);
      getAllTasks(); // Recargar las tareas después de eliminar
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  // Función para actualizar una tarea
  const updateTask = async () => {
    if (!newTask.title || !newTask.description) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    try {
      // Enviar la tarea al servidor (PUT)
      const response = await axios.put(
        `${endpoint}/user/${user.id}/tasks/${editingTask.id}`,
        {
          title: newTask.title,
          description: newTask.description,
        }
      );

      console.log("Tarea actualizada:", response.data);
      getAllTasks(); // Recargar las tareas después de actualizar

      // Limpiar los campos después de la edición
      setNewTask({ title: "", description: "" });
      setEditingTask(null); // Limpiar la tarea en edición
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    }
  };

  // Cargar las tareas cuando el usuario cambie
  useEffect(() => {
    getAllTasks();
  }, [user]);

  // Función para cargar la tarea en el formulario para editar
  const editTask = (task) => {
    setNewTask({ title: task.title, description: task.description });
    setEditingTask(task); // Establecer la tarea que se va a editar
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Hola, {user ? user.name : "Usuario"}</h2>
      <h2 className="text-center mb-4">Tareas</h2>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="mb-4">
            <h3 className="text-center">
              {editingTask ? "Editar tarea" : "Crear nueva tarea"}
            </h3>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Título"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Descripción"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
              />
            </div>
            <button
              className="btn btn-primary w-100"
              onClick={editingTask ? updateTask : createTask}
            >
              {editingTask ? "Actualizar tarea" : "Crear tarea"}
            </button>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Título</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => editTask(task)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger ml-2"
                    onClick={() => {
                      deleteTask(user.id, task.id); // Pasar ambos IDs al eliminar
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tasks;
