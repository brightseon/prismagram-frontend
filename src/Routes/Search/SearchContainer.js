import React from 'react';
import { withRouter } from 'react-router-dom';
import SearchPresenter from './SearchPresenter';
import { useQuery } from 'react-apollo-hooks';
import { SEARCH } from './SearchQueries';

export default withRouter(({ location : { search } }) => {
    const term = search.split('=')[1];
    const { data, loading } = useQuery(SEARCH, {
        // skip은 query를 실행하고 싶지 않을 때 사용한다.
        skip : !term ? true : false,
        variables : {
            term
        }
    });

    return <SearchPresenter searchTerm={ term } loading={ loading } data={ data } />;
});