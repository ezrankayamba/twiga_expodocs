import React, {Component} from 'react';

const LoadingIndicator = ({isLoading}) => {
    return isLoading ? (
        <div className="loading-indicator bg-info text-white">
            <i>Loading, please wait ...</i>
        </div>
    ) : null;
}


export default LoadingIndicator;