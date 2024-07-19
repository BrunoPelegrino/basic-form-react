import React, { useState } from 'react';

function Forms() {
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    schooling: 'Médio',
    resume: '',
  });

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function resetForm() {
    setFormData({
      name: '',
      email: '',
      schooling: 'Médio',
      resume: '',
    });
    setTerms(false);
    setError(false);
    setErrorMessage([]);
  }

  const isFormValid = () => {
    const errors: string[] = [];
    if (!formData.name) {
      errors.push('Você deve escrever um nome');
    }
    if (!formData.email) {
      errors.push('Você deve escrever um email');
    }
    if (!formData.resume) {
      errors.push('Você deve escrever um resumo');
    }
    setErrorMessage(errors);
    return errors.length === 0;
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (terms && isFormValid()) {
      alert(
        `Nome: ${formData.name}\nEmail: ${formData.email}\nEscolaridade: ${formData.schooling}\nExperiências: ${formData.resume}`,
      );
      resetForm();
    } else {
      setError(true);
    }
  }

  return (
    <>
      <form onSubmit={(event) => handleSubmit(event)}>
        <label>
          Nome
          <input
            name="name"
            type="text"
            onChange={handleChange}
            value={formData.name}
          />
        </label>
        <label>
          E-mail
          <input
            name="email"
            type="email"
            onChange={handleChange}
            value={formData.email}
          />
        </label>
        <label>
          Escolaridade
          <select
            name="schooling"
            onChange={handleChange}
            value={formData.schooling}
          >
            <option value="Médio">Médio</option>
            <option value="Superior">Superior</option>
            <option value="Pós-graduação">Pós-graduação</option>
          </select>
        </label>
        <label>
          Resumo das experiências
          <textarea
            name="resume"
            onChange={handleChange}
            value={formData.resume}
          />
        </label>
        <div className="checkbox-container">
          <input
            type="checkbox"
            checked={terms}
            onChange={() => setTerms((prevTerms) => !prevTerms)}
          />
          <label>Aceito os termos e condições</label>
        </div>
        <button type="submit">Enviar</button>
        <div className="error-messages">
          {error && (
            <h4>
              Você precisa aceitar os termos e condições para poder enviar o
              currículo
            </h4>
          )}
          {errorMessage.length > 0 && (
            <div>
              {errorMessage.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
        </div>
      </form>
    </>
  );
}

export default Forms;
