import React from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const dataBar = [
  { name: 'Ene', Vehiculos: 10, Usuarios: 5 },
  { name: 'Feb', Vehiculos: 20, Usuarios: 10 },
  { name: 'Mar', Vehiculos: 15, Usuarios: 8 },
];

const dataPie = [
  { name: 'Activos', value: 60 },
  { name: 'Inactivos', value: 40 },
];

const COLORS = ['#00C49F', '#FF8042'];

const GraficasDashboard = () => {
  return (
    <div style={{ display: 'grid', gap: '40px', padding: '20px' }}>
      <h3 style={{ textAlign: 'center' }}>Resumen de Actividad</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dataBar}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Vehiculos" fill="#007bff" />
          <Bar dataKey="Usuarios" fill="#00c49f" />
        </BarChart>
      </ResponsiveContainer>

      <h3 style={{ textAlign: 'center' }}>Estado de Choferes</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={dataPie}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {dataPie.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficasDashboard;
