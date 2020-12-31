import React, { useEffect, useState } from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import { FiChevronLeft, FiChevronRight, FiFolder } from 'react-icons/fi'

import logoImg from '../../assets/github-logo.svg'
import api from '../../services/api'

import { Header, RepositoryInfo, Issues } from './styles'

interface RepositoryParams {
    repository: string
}

interface Repositories {
    full_name: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    html_url: string;
    owner: {
        login: string;
        avatar_url: string;
    }
}

interface Issue {
    id: string;
    title: string;
    html_url: string;
    user: {
        login: string;
    }
}

const Repository: React.FC = () => {
    const [repository, setRepository] = useState<Repositories | null>(null)
    const [issues, setIssues] = useState<Issue[]>([])

    const { params } = useRouteMatch<RepositoryParams>()

    useEffect(() => {
        api.get(`repos/${params.repository}`).then(response => {
            setRepository(response.data)
        })

        api.get(`repos/${params.repository}/issues`).then(response => {
            setIssues(response.data)
        })
    }, [params.repository])

    return (
        <>
            <Header>
                <img src={logoImg} alt="Github Explorer" />
                <Link to="/">
                    <FiChevronLeft size={16} /> Voltar
                </Link>
            </Header>

            {repository && (
                <RepositoryInfo>
                    <header>
                        <img
                            src={repository.owner.avatar_url}
                            alt={repository.owner.login}
                        />
                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>
                    </header>
                    <ul>
                        <li>
                            <strong>{repository.stargazers_count}</strong>
                            <span>Start</span>
                        </li>
                        <li>
                            <strong>{repository.forks_count}</strong>
                            <span>Forks</span>
                        </li>
                        <li>
                            <strong>{repository.open_issues_count}</strong>
                            <span>Issues abertas</span>
                        </li>
                        <li>
                            <a href={repository.html_url} target="_blank" rel="noreferrer">
                                <strong>
                                    <FiFolder />
                                </strong>
                                <span>Repositório</span>
                            </a>
                        </li>
                    </ul>
                </RepositoryInfo>
            )}

            <Issues>
                {issues.map(issue => (
                    <a key={issue.id} href={issue.html_url} target="_blank" rel="noreferrer">
                        <div>
                            <strong>{issue.title}</strong>
                            <p>{issue.user.login}</p>
                        </div>
                        <FiChevronRight size={20} />
                    </a>
                ))}
            </Issues>
        </>
    )
}

export default Repository
