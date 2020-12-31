import React, { useState, FormEvent } from 'react'
import { FiChevronRight } from 'react-icons/fi'

import logoImg from '../../assets/github-logo.svg'
import { Title, Form, Repositorys } from './styles'

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
    const [repositories, setRepositories] = useState<Repository[]>([])

    async function handleAddRepository (event: FormEvent<HTMLFormElement>):Promise<void> {
        event.preventDefault()
        const response = await api.get<Repository>(`repos/${newRepo}`)

        const respository = response.data;

        setRepositories([...repositories, respository])
        setNewRepo('')
    }

    return (
        <>
            <img src={logoImg} alt="Github Explorer" />
            <Title>Explore repositórios no Github</Title>

            <Form onSubmit={handleAddRepository}>
                <input
                    placeholder="Digite o nome do repositório"
                    value={newRepo}
                    onChange={(e) => setNewRepo(e.target.value)}
                />
                <button type="submit">Pesquisar</button>
            </Form>

            <Repositorys>
                {repositories.map(repository => (
                    <a href="teste" key={repository.full_name}>
                        <img
                            src={repository.owner.avatar_url}
                            alt={repository.owner.login}
                        />
                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>
                        <FiChevronRight size={20} />
                    </a>
                ))}
            </Repositorys>
        </>
    )
}

export default Dashboad
