import styled from 'styled-components'
import { shade } from 'polished'

export const Title = styled.h1`
    font-size: 48px;
    color: #3A3A3A;
    max-width: 450px;
    line-height: 56px;
    margin-top: 80px;
    `

export const Form = styled.form`
    margin-top: 40px;
    max-width: 700px;
    display: flex;
    input{
        flex: 1;
        height: 70px;
        padding: 0 24px;
        border: 0;
        border-radius: 5px 0 0 5px;
        color: #3A3A3A;
        &::placeholder{
            color: #a8a8b3;
        }
    }
    button{
        width: 210px;
        height: 70px;
        background-color: #04D361;
        border-radius: 0px 5px 5px 0px;
        border: 0;
        font-weight: bold;
        color: #fff;
        transition: all .2s;
        &:hover{
            background-color: ${shade(0.2, '#04D361')};
        }
    }
`

export const Repositorys = styled.div`
    margin-top: 80px;
    max-width: 700px;
    a{
        background-color: #fff;
        border-radius: 5px;
        width: 100%;
        padding: 24px;
        display: block;
        text-decoration: none;
        display: flex;
        align-items: center;
        transition: all .2s;
        & + a {
            margin-top: 16px;
        }
        &:hover{
            transform: translateX(10px);
        }
        img{
            width: 64px;
            height: 64px;
            border-radius: 50%;
        }
        div{
            margin: 0 16px;
            flex: 1;
            strong{
                font-size: 20px;
                color: #3D3D4D;
            }
            p{
                font-size: 18px;
                color: #a8a8b3;
                margin-top: 5px;
            }
        }
        svg{
            margin-left: auto;
            color: #cbcbd6;
        }
    }
`
