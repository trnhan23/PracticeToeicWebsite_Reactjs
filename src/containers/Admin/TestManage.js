import React, { Component } from 'react';
import { connect } from 'react-redux';
import UploadFile from '../../components/UploadAndViewFile/UploadFile';
import CustomScrollbars from '../../components/CustomScrollbars';
class TestManage extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <CustomScrollbars style={{ height: '100vh', width: '100%' }}>

                <div className='user-redux-container'>
                    <div className='title'>
                        TEST MANAGE
                    </div>
                    <div className='user-redux-body'>
                        {/* <div>Thêm bài thi mới</div> */}
                        <UploadFile />
                    </div>
                </div>
            </CustomScrollbars>
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

export default connect(mapStateToProps, mapDispatchToProps)(TestManage);
