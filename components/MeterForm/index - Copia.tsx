import { useState, ChangeEvent, FormEvent } from 'react';

const MeterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    acronym: '',
    unit: '',
    latitude: 0,
    longitude: 0
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Convert the value to a number for latitude and longitude fields
    const newValue = name === 'latitude' || name === 'longitude' ? parseFloat(value) : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch('BACKEND/meter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
       
        console.log('Medidor criado com sucesso');
      } else {
        console.error('Falha ao criar o medidor');
      }
    } catch (error) {
      console.error('Erro ao criar o medidor:', error);
    }
  
    // Reset the form fields
    setFormData({
      name: '',
      acronym: '',
      unit: '',
      latitude: 0,
      longitude: 0,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Acronym:
        <input
          type="text"
          name="acronym"
          value={formData.acronym}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Unit:
        <input
          type="text"
          name="unit"
          value={formData.unit}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Latitude:
        <input
          type="number"
          name="latitude"
          value={formData.latitude}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Longitude:
        <input
          type="number"
          name="longitude"
          value={formData.longitude}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Criar Medidor</button>
    </form>
  );
};

export default MeterForm;
