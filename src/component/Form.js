import React, { useState } from "react";

function Form() {
  const [activetab, setactivetab] = useState("login");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (change) => {
    const { name, value } = change.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = (up) => {
    up.preventDefault();
    const { email, password, confirmpassword } = formData;

    if (!email || !password || !confirmpassword) {
      alert("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      alert("Enter valid password length 6");
      return;
    }

    if (password !== confirmpassword) {
      alert("Passwords not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find((user) => user.email === email);
    if (userExists) {
      alert("User already exists");
      return;
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successfully");
    setFormData({ email: "", password: "", confirmpassword: "" });
    setactivetab("login");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      alert("Login successful");
      setFormData({ email: "", password: "", confirmpassword: "" });
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="main-container">
      <div className="form-container">
        <h1>{activetab === "signup" ? "Signup Form" : "Login Form"}</h1>
        <div className="tab-buttons">
          <h2 className={activetab === "login" ? "tab active" : "tab"}onClick={() => setactivetab("login")}>Login</h2>
          <h2 className={activetab === "signup" ? "tab active" : "tab"}onClick={() => setactivetab("signup")}>Signup</h2>
        </div>

        <form onSubmit={activetab === "signup" ? handleSignup : handleLogin}>
          <div className="input-fields">
            <input type="email" name="email" placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
            <input type="password" name="password" placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {activetab === "signup" && (
              <input type="password" name="confirmpassword" placeholder="Confirm Password"
                value={formData.confirmpassword}
                onChange={handleChange}
              />
            )}
            <button className="submit-btn" type="submit">
              {activetab === "signup" ? "Signup" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
