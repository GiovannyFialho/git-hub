import React, { useEffect } from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import logoImg from '../../assets/github-logo.svg'
import api from '../../services/api'

import { Header, RepositoryInfo, Issues } from './styles'

interface RepositoryParams {
    repository: string
}

const Repository: React.FC = () => {
    const { params } = useRouteMatch<RepositoryParams>()

    useEffect(() => {
        api.get(`repos/${params.repository}`).then(response => {
            console.log(response.data)
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
            <RepositoryInfo>
                <header>
                    <img src="https://avatars0.githubusercontent.com/u/8743217?v=4" alt="Giovanny Fialho"/>
                    <div>
                        <strong>Giovanny Fialho</strong>
                        <p>Descrição</p>
                    </div>
                </header>
                <ul>
                    <li>
                        <strong>1800</strong>
                        <span>Start</span>
                    </li>
                    <li>
                        <strong>48</strong>
                        <span>Forks</span>
                    </li>
                    <li>
                        <strong>67</strong>
                        <span>Issues abertas</span>
                    </li>
                </ul>
            </RepositoryInfo>
            <Issues>
                <Link to="dsdas">
                    <div>
                        <strong>sdada</strong>
                        <p>dsads</p>
                    </div>
                    <FiChevronRight size={20} />
                </Link>
            </Issues>
        </>
    )
}

export default Repository
