import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../Styles/GlobalStyles';
import Theme from '../Styles/Theme';
import Router from './Router';

const QUERY = gql`
    {
        isLoggedIn @client
    }
`;

export default () => {

    const { data : { isLoggedIn } } = useQuery(QUERY);

    return (
        <ThemeProvider theme={ Theme }>
            <>
                <GlobalStyles />
                <Router isLoggedIn={ isLoggedIn } />
            </>
        </ThemeProvider>
    );
};