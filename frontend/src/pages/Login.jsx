import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:8800/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                const data = await res.json();
                alert(data.message);
                if (data.role === "admin") {
                    navigate("/shoes");
                } else {
                    navigate("/user");
                }
            } else {
                const error = await res.json();
                alert(error.message);
            }
        } catch (err) {
            alert("Login failed. Please try again.");
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="form">
                <h2>Login</h2>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                <div className="register-link">
                    <button
                        type="button"
                        className="register-button"
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
