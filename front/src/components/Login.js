// src/components/Login.js

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Llamada al backend para verificar usuario y obtener tareas
      const response = await axios.get(
        `http://127.0.0.1:8000/api/user/email/${email}`
      );

      if (response.status === 200) {
        // Si el usuario existe y tiene tareas, guarda los datos
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("tasks", JSON.stringify(response.data.tasks));

        // Redirige a la página de tareas
        navigate("/tasks");
      }
    } catch (error) {
      console.error("Error de login:", error.response?.data?.message);
      alert("Usuario no encontrado o credenciales incorrectas.");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="row justify-content-center w-100">
        <div className="col-md-4">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">Iniciar sesión</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Iniciar sesión
              </button>
              <div>
                ¿No tienes cuenta? <a href="/register">Regístrate</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
