import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import './KetQuaLamBai.scss';

class KetQuaLamBai extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ketQua: [
                {
                    ngayLam: '13/07/2023',
                    ketQua: '46/69',
                    thoiGian: '0:16:19',
                    chiTiet: '/detail/1',
                    loaiBai: ['Luyện tập', 'Part 3', 'Part 4'],
                },
                {
                    ngayLam: '13/07/2023',
                    ketQua: '24/200 (Điểm: 130)',
                    thoiGian: '0:18:12',
                    chiTiet: '/detail/2',
                    loaiBai: ['Full test'],
                },
                {
                    ngayLam: '22/04/2023',
                    ketQua: '73/100',
                    thoiGian: '0:50:54',
                    chiTiet: '/detail/3',
                    loaiBai: ['Luyện tập', 'Part 1', 'Part 3', 'Part 4'],
                },
            ],
        };
    }

    handleChiTiet = (path) => {
        this.props.navigate(path);
    };

    renderKetQuaRow = (item, index) => {
        return (
            <tr key={index}>
                <td className="ngay-lam">
                    <div>{item.ngayLam}</div>
                    <div className="tags">
                        {item.loaiBai.map((tag, i) => (
                            <span key={i} className="tag">
                                {tag}
                            </span>
                        ))}
                    </div>
                </td>
                <td>{item.ketQua}</td>
                <td>{item.thoiGian}</td>
                <td>
                    <button
                        className="btn-link"
                        onClick={() => this.handleChiTiet(item.chiTiet)}
                    >
                        Xem chi tiết
                    </button>
                </td>
            </tr>
        );
    };

    render() {
        const { ketQua } = this.state;

        return (
            <React.Fragment>
                <div className="ket-qua-lam-bai-container">
                    <h3>Kết quả làm bài của bạn:</h3>
                    <table className="ket-qua-table">
                        <thead>
                            <tr>
                                <th>Ngày làm</th>
                                <th>Kết quả</th>
                                <th>Thời gian làm bài</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>{ketQua.map(this.renderKetQuaRow)}</tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfor: state.user.userInfor,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(KetQuaLamBai);
