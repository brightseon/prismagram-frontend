import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../Components/Loader';
import Post from '../Components/Post';

const FEED_QUERY = gql`
    {
        seeFeed {
            id
            location
            caption
            user {
                id
                avatar
                username
            }
            files {
                id
                url
            }
            likeCount
            isLiked
            comments {
                id
                text
                user {
                    id
                    username
                }
            }
            createdAt
        }
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 80vh;
`;

export default () => {
    const { data, loading } = useQuery(FEED_QUERY);
    
    return (
        <Wrapper>
            {/* 기존에 쓰던 방식이 Maximum call stack size exceeded 에러가 발생하여 아래의 방식으로 수정함 */}
            <Helmet title="Feed | Prismagram" />
            { loading && <Loader /> }
            { 
                !loading && data && data.seeFeed && (
                    data.seeFeed.map(post => 
                        <Post key={ post.id } id={ post.id } user={ post.user } files={ post.files } likeCount={ post.likeCount }
                            isLiked={ post.isLiked } comments={ post.comments } createdAt={ post.createdAt } location={ post.location } caption={ post.caption } />
                    )
                )
            }
        </Wrapper>
    );
};