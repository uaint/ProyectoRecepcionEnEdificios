import React, { useState } from 'react';
import '../App.css';

const AdminMessages = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: 'Felipe',
      lastName: 'Rojas',
      rut: '12.345.678-9',
      building: 'Building C',
      apartment: '8A',
      contact: '983746555',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consequat efficitur urna id placerat. Proin cursus varius nisi, ac fermentum magna convallis vel. In hac habitasse platea dictumst. Duis a velit condimentum, ullamcorper elit nec, malesuada enim. Phasellus viverra massa sit amet volutpat varius. Sed gravida ex vitae eros ultrices, in fermentum magna euismod. Cras accumsan a eros sit amet tempus. Suspendisse potenti. Duis vitae purus vel libero eleifend dapibus id ac mi. Donec ac ultricies metus, non interdum arcu. Suspendisse vel purus in turpis egestas venenatis id id orci.',
    },
    {
      id: 2,
      name: 'Maria',
      lastName: 'Garcia',
      rut: '23.456.789-0',
      building: 'Building D',
      apartment: '12B',
      contact: '987654321',
      message: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam erat volutpat. Nulla facilisi. Nullam in lorem id urna dignissim fermentum. Sed fermentum sagittis erat. Sed id lacus at eros sodales elementum. Donec in lectus ac felis consequat suscipit nec eget nunc. Ut ullamcorper tortor et imperdiet vestibulum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi fermentum purus id sapien placerat ultrices.',
    },
  ]);

  return (
    <div className="admin-messages-container">
    <h1>Admin Messages</h1>
    {messages.map((user) => (
      <div key={user.id} className="user-container">
        <div className="user-info">
          <p><span className="label">Name:</span> {user.name}</p>
          <p><span className="label">Last Name:</span> {user.lastName}</p>
          <p><span className="label">RUT:</span> {user.rut}</p>
          <p><span className="label">Building:</span> {user.building}</p>
          <p><span className="label">Apartment:</span> {user.apartment}</p>
          <p><span className="label">Contact:</span> {user.contact}</p>
        </div>
        <div className="user-message">{user.message}</div>
      </div>
    ))}
  </div>
);
};

export default AdminMessages;
