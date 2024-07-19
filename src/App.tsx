import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [schooling, setSchooling] = useState('Médio');
  const [resume, setResume] = useState('');
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string[]>([]);

  function resetForm() {
    setName('');
    setEmail('');
    setSchooling('Médio');
    setResume('');
    setTerms(false);
    setError(false);
    setErrorMessage([]);
  }

  const isFormValid = () => {
    const errors: string[] = [];
    if (!name) {
      errors.push('Você deve escrever um nome');
    }
    if (!email) {
      errors.push('Você deve escrever um email');
    }
    if (!resume) {
      errors.push('Você deve escrever um resumo');
    }
    setErrorMessage(errors);
    return errors.length === 0;
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (terms && isFormValid()) {
      alert(
        `Nome: ${name}\nEmail: ${email}\nEscolaridade: ${schooling}\nExperiências: ${resume}`
      );
      resetForm();
    } else {
      setError(true);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Nome
          <input type="text" onChange={({ target }) => setName(target.value)} value={name} />
        </label>
        <label>
          E-mail
          <input type="email" onChange={({ target }) => setEmail(target.value)} value={email} />
        </label>
        <label>
          Escolaridade
          <select onChange={({ target }) => setSchooling(target.value)} value={schooling}>
            <option value="Médio">Médio</option>
            <option value="Superior">Superior</option>
            <option value="Pós-graduação">Pós-graduação</option>
          </select>
        </label>
        <label>
          Resumo das experiências
          <textarea onChange={({ target }) => setResume(target.value)} value={resume} />
        </label>
        <div className="checkbox-container">
          <input type="checkbox" checked={terms} onChange={() => setTerms((prevTerms) => !prevTerms)} />
          <label>Aceito os termos e condições</label>
        </div>
        <button type="submit">Enviar</button>
        <div className="error-messages">
          {error && (
            <h4>Você precisa aceitar os termos e condições para poder enviar o currículo</h4>
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

export default App;
