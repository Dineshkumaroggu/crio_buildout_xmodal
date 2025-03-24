import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    dob: ''
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const { username, email, phone, dob } = formData;
  
    if (!username) {
      alert("Please fill all fields.");
      return;
    }
  
    if (!email) {
      alert("Please fill all fields.");
      return;
    }
  
    if (!email.includes('@')) {
      alert("Invalid email. Please check your email address.");
      return;
    }
  
    if (!phone) {
      alert("Please fill all fields.");
      return;
    }
  
    if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }
  
    if (!dob) {
      alert("Please fill all fields.");
      return;
    }
  
    const today = new Date();
    const dobDate = new Date(dob);
    if (dobDate > today) {
      alert("Invalid date of birth. Please enter a valid past date.");
      return;
    }
  
    setFormData({ username: '', email: '', phone: '', dob: '' });
    setIsModalOpen(false);
  };
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isModalOpen && event.target.className === "modal") {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isModalOpen]);

  return (
    <>
      <h1>User Details Modal</h1>
      <button onClick={openModal} className="submit-button">Open Form</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Fill Details</h2>
            <form onSubmit={handleSubmit}>
              <label>Username:</label>
              <input id="username" type="text" value={formData.username} onChange={handleChange} />

              <label>Email Address:</label>
              <input id="email" type="text" value={formData.email} onChange={handleChange} />

              <label>Phone Number:</label>
              <input id="phone" type="text" value={formData.phone} onChange={handleChange} />

              <label>Date of Birth:</label>
              <input id="dob" type="date" value={formData.dob} onChange={handleChange} />

              <button className="submit-button" type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
