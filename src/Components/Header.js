import React from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import Input from './Input';
import useInput from '../Hooks/useInput';
import { Compass, HeartEmpty, User, Logo } from './Icons';

const Header = styled.header`
    width: 100%;
    border: 0;
    background-color: white;
    border-bottom: ${ props => props.theme.boxBorder };
    border-radius: 0px;
    margin-bottom: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 25px 0;
    z-index: 2;
`;

const HeaderWrapper = styled.div`
    width: 100%;
    max-width: ${ props => props.theme.maxWidth };
    display: flex;
    justify-content: center;
`;

const HeaderColumn = styled.div`
    width: 33%;
    text-align: center;
    &:first-child {
        margin-right: auto;
        text-align: left;
    }

    &:last-child {
        margin-left: auto;
        text-align: right;
    }
`;

const SearchInput = styled(Input)`
    background-color: ${ props => props.theme.bgColor };
    padding: 5px;
    font-size: 14px;
    border-radius: 3px;
    height: auto;
    text-align: center;
    width: 70%;
    &::placeholder {
        opacity: 0.8;
        font-weight: 200;
    }
`;

const HeaderLink = styled(Link)`
    &:not(:last-child) {
        margin-right: 30px;
    }
`;

const ME = gql`
    {
        me {
            username
        }
    }
`;

// router에 접근하고 싶은데 router를 가지고 있지 않을 때, 
// withRouter를 사용하면 router가 할 수 있는 모든 것들에 access를 준다.
export default withRouter(({ history }) => {
    const search = useInput('');
    const { data } = useQuery(ME);

    const onSearchSubmit = e => {
        e.preventDefault();

        history.push(`/search?term=${ search.value }`);
    };

    return (
        <Header>
            <HeaderWrapper>
                <HeaderColumn>
                    <Link to="/">
                        <Logo />
                    </Link>
                </HeaderColumn>
                <HeaderColumn>
                    <form onSubmit={ onSearchSubmit }>
                        <SearchInput { ...search } placeholder="Search" />
                    </form>
                </HeaderColumn>
                <HeaderColumn>
                    <HeaderLink to="/explore">
                        <Compass />
                    </HeaderLink>
                    <HeaderLink to="/notificatioons">
                        <HeartEmpty />
                    </HeaderLink>
                    {
                        !data.me ? (
                            <HeaderLink to="/#">
                                <User />
                            </HeaderLink>
                        ) : (
                            <HeaderLink to={ data.me.username }>
                                <User />
                            </HeaderLink>
                        )
                    }
                </HeaderColumn>
            </HeaderWrapper>
        </Header>
    )
});