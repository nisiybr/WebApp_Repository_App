import React, { Component } from 'react';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Form, SubmitButton, List } from './styles';
import Container from '../../components/Container';

import api from '../../services/api';

export default class Main extends Component {
  state = {
    newRepo: '', // variavel que mimetiza o campo value do input
    repositories: [], // variavel para guardar os repositorios
    loading: false, // variavel para desabilitar o botao e apresentar spinning girando
    inputError: false,
  };

  // Carregar os dados do localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');
    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // Salvar os dados do localStorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    // dispara o evento quando atualiza o campo
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    // dispara evento quando da o submit
    e.preventDefault();

    this.setState({ loading: true, inputError: false });
    const { newRepo, repositories } = this.state;
    try {
      const isInRepository = repositories.filter(repository => {
        return repository.name === newRepo;
      });
      console.log(isInRepository);
      if (isInRepository.length > 0) {
        throw new Error('Repositório duplicado');
      }

      const response = await api.get(`/repos/${newRepo}`); // chama o metodo get da api axios
      const data = {
        name: response.data.full_name,
      };
      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
      });
    } catch (error) {
      this.setState({
        loading: false,
        newRepo: '',
        inputError: true,
      });
      console.log(error);
    }
  };

  render() {
    const { newRepo, repositories, loading, inputError } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit} inputError={inputError}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>
        <List>
          {repositories.map((
            repository // para cada repositorio vai ser retornado um li
          ) => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
