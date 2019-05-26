import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo-hooks';
import { FOLLOW, UNFOLLOW } from './FollowButtonQueries';
import FollowButtonPresenter from './FollowButtonPresenter';

const FollowButtonContainer = ({ isFollowing, id }) => {
    const [isFollowingS, setIsFollowing] = useState(isFollowing);
    const followMutation = useMutation(FOLLOW, { variables : { id } });
    const unfollowMutation = useMutation(UNFOLLOW, { variables : { id } });

    const onClick = () => {
        if(isFollowingS) {
            setIsFollowing(false);
            
            try {
                unfollowMutation();
            } catch(err) {
                console.log('FollowButtonContainer.js unfollowMutation error : ', err);
            }
        } else {
            setIsFollowing(true);

            try {
                followMutation();
            } catch(err) {
                console.log('FollowButtonContainer.js followMutation error : ', err);
            }
        }
    };

    return (
        <FollowButtonPresenter isFollowing={ isFollowingS } onClick={ onClick } />
    );
};

FollowButtonContainer.propTypes = {
    isFollowing : PropTypes.bool.isRequired,
    id : PropTypes.string.isRequired
};

export default FollowButtonContainer;