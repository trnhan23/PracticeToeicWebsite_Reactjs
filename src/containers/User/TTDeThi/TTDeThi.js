import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import './TTDeThi.scss'
import KetQuaLamBai from '../../../components/KetQua/KetQuaLamBai';
import PhanThi from '../../../components/KetQua/PhanThi';
import BinhLuan from '../../../components/BinhLuan/BinhLuan';
import CustomScrollbars from '../../../components/CustomScrollbars';
import ThongTinDeThi from '../../../components/KetQua/ThongTinDeThi';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
class TTDeThi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ({
                examId: '',
                userId: '',
            }),
            // normalizedComments: [],
        };
    }
    componentDidMount = async () => {
        // console.log("KT TTDeThi: ", this.props.exam);
        //await this.handleGetComment();
    }

    // handleGetComment = async () => {
    //     try {
    //         const res = await getComments(this.props.exam.id, this.props.userInfor.id);

    //         const normalizedComments = this.normalizeComments(res);
    //         console.log("Normalized comments: ", normalizedComments);

    //         this.setState({
    //             normalizedComments: normalizedComments,
    //         })

    //     } catch (error) {
    //         console.error("Error fetching comments: ", error);
    //     }
    // }

    // normalizeComments = (commentsData) => {
    //     const commentsMap = {};

    //     commentsData.forEach(comment => {
    //         const { id, userId, contentComment, cmtDate, parentCmtId } = comment;

    //         const formattedDate = new Date(cmtDate).toLocaleDateString('en-US', {
    //             year: 'numeric',
    //             month: 'long',
    //             day: 'numeric',
    //         });

    //         const normalizedComment = {
    //             id,
    //             fullName: `User_${userId}`,
    //             avatar: `https://i.pravatar.cc/300?img=2`,
    //             cmtDate: formattedDate,
    //             text: contentComment,
    //             replies: [],
    //         };

    //         commentsMap[id] = normalizedComment;

    //         // Nếu comment có parent, thêm nó vào replies của comment cha
    //         if (parentCmtId) {
    //             if (!commentsMap[parentCmtId]) {
    //                 commentsMap[parentCmtId] = {
    //                     replies: [],
    //                 };
    //             }
    //             commentsMap[parentCmtId].replies.push(normalizedComment);
    //         }
    //     });
    //     return Object.values(commentsMap).filter(comment => !comment.parentCmtId);
    // };


    render() {
        const { exam } = this.props;
        const { normalizedComments } = this.state;

        return (
            <React.Fragment>
                {exam ? (
                    <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                        <HomeHeader />
                        <div className='container'>
                            <div className='content-top'>
                                <div className='thong-tin-de-thi'>
                                    <ThongTinDeThi />
                                </div>
                                {(exam.statusExam === true ? (<div className='ket-qua-lam-bai'>
                                    <KetQuaLamBai />
                                </div>) : '')}

                                <div className='phan-thi'>
                                    <PhanThi />
                                </div>
                            </div>
                            <div className='content-bottom'>
                                <BinhLuan normalizedComments={normalizedComments} />
                            </div>
                        </div>
                        <HomeFooter />
                    </CustomScrollbars>
                ) : (
                    <div>Không có dữ liệu bài thi</div>
                )}

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfor: state.user.userInfor,
        exam: state.user.selectedExam
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TTDeThi);