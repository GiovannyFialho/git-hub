import React, { useState, useEffect, FormEvent } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/github-logo.svg'
import { Title, Form, Repositorys, Error } from './styles'

import api from '../../services/api'

interface Repository {
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    };
}

const Dashboad: React.FC = () => {
    const [newRepo, setNewRepo] = useState('')
    const [inputError, setInputError] = useState('')

    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storagedRepositories = localStorage.getItem('@GithubExplorer:repositories')

        if (storagedRepositories) {
            return JSON.parse(storagedRepositories)
        }

        return []
    })

    useEffect(() => {
        localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories))
    }, [repositories])

    async function handleAddRepository (event: FormEvent<HTMLFormElement>):Promise<void> {
        event.preventDefault()

        if (!newRepo) {
            return setInputError('Digite autor/nome do repositório')
        }

        try {
            const response = await api.get<Repository>(`repos/${newRepo}`)

            const respository = response.data;

            setRepositories([...repositories, respository])

            setNewRepo('')

            setInputError('')
        } catch (err) {
            setInputError('Erro ao buscar esse repositório')
        }
    }

    return (
        <>
            <img src={logoImg} alt="Github Explorer" />
            <Title>Explore repositórios no Github</Title>

            <Form hasError={!!inputError} onSubmit={handleAddRepository}>
                <input
                    placeholder="Digite o nome do repositório. Ex: autor/nome"
                    value={newRepo}
                    onChange={(e) => setNewRepo(e.target.value)}
                />
                <button type="submit">Pesquisar</button>
            </Form>

            { inputError && <Error>{inputError}</Error> }

            <Repositorys>
                {repositories.map(repository => (
                    <Link to={`/repositories/${repository.full_name}`} key={repository.full_name}>
                        <img
                            src={repository.owner.avatar_url}
                            alt={repository.owner.login}
                        />
                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>
                        <FiChevronRight size={20} />
                    </Link>
                ))}
            </Repositorys>
        </>
    )
}

export default Dashboad
