import React, { Component } from 'react';
import { connect } from 'react-redux';
class VocabularyManage extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    VOCABULARY MANAGE
                </div>
                <div className='user-redux-body'>
                    <div>Thêm từ vựng mới</div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VocabularyManage);
