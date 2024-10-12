import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import './Loading.scss';

const Loading = () => {
    return (
        <div className="loading-container">
            <ReactLoading type="spinningBubbles" color="#35509A" height={60} width={60} />
            <p>Loading, please wait...</p>
        </div>
    );
};

export default Loading;
