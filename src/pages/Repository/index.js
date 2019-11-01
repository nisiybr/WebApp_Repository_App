import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import api from '../../services/api';
import { Loading, Owner, IssueList, Filter, PageButton } from './style';
import Container from '../../components/Container';

class Repository extends Component {
  state = {
    repository: {},
    issues: [],
    loading: true,
    estado: 'all',
    actualPage: 1,
    perPage: 10,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { estado, actualPage, perPage } = this.state;
    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: estado,
          per_page: perPage,
          page: actualPage,
        },
      }),
    ]);
    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  handleClickPreviousPage = async () => {
    const { match } = this.props;
    const { actualPage } = this.state;
    await this.setState({ actualPage: actualPage - 1 });
    const { estado, perPage } = this.state;
    const repoName = decodeURIComponent(match.params.repository);
    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: estado,
        per_page: perPage,
        page: actualPage - 1,
      },
    });
    this.setState({
      issues: issues.data,
    });
  };

  handleClickNextPage = async () => {
    const { match } = this.props;
    const { actualPage } = this.state;
    await this.setState({ actualPage: actualPage + 1 });
    const { estado, perPage } = this.state;
    const repoName = decodeURIComponent(match.params.repository);
    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: estado,
        per_page: perPage,
        page: actualPage + 1,
      },
    });
    this.setState({
      issues: issues.data,
    });
  };

  handleSelectChange = async e => {
    await this.setState({ estado: e.target.value, actualPage: 1 });
    const { match } = this.props;
    const { estado, actualPage, perPage } = this.state;
    const repoName = decodeURIComponent(match.params.repository);
    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: estado,
        per_page: perPage,
        page: actualPage,
      },
    });
    this.setState({
      issues: issues.data,
    });
  };

  render() {
    // O render para no primeiro return
    const { repository, issues, loading, actualPage } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositorios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <Filter>
          <div className="filtros">
            <span>Issue Status: </span>
            <select onChange={this.handleSelectChange}>
              <option value="all">All</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </Filter>
        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  <div className="labels">
                    {issue.labels.map(label => (
                      <span key={String(label.id)} className="label">
                        {label.name}
                      </span>
                    ))}
                  </div>
                </strong>
                <p>{issue.user.login}</p>
                <span>{issue.state}</span>
              </div>
            </li>
          ))}
        </IssueList>
        <PageButton actualPage={actualPage}>
          <button
            type="button"
            disabled={actualPage <= 1}
            onClick={this.handleClickPreviousPage}
          >
            <FaArrowCircleLeft />
          </button>
          <button type="button" onClick={this.handleClickNextPage}>
            <FaArrowCircleRight />
          </button>
        </PageButton>
      </Container>
    );
  }
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
    }),
  }).isRequired,
};

export default Repository;
