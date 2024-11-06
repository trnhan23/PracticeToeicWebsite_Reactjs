import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import CustomScrollbars from '../../../components/CustomScrollbars';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
import { getAllFlashcardsPagination, createFlashcard } from '../../../services/flashcardService';
import './FlashCard.scss';
import Loading from '../../../components/Loading/Loading';
import Pagination from '../../../components/Pagination/Pagination';

class Flashcard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flashcards: [],
            loading: true,
            error: null,
            flashcardName: '',
            description: '',
            showModal: false,
            currentPage: 1,
            totalPages: 0,
            numberOfElementPerPAge: 8,
        };
    }

    // hàm xử lý khi mới render component
    componentDidMount = async () => {
        if (this.props.userInfor?.id) {
            await this.fetchFlashcards();
        }
    }

    // hàm xử lý khi state cập nhật
    componentDidUpdate = async (prevProps) => {
        if (prevProps.userInfor !== this.props.userInfor && this.props.userInfor?.id) {
            await this.fetchFlashcards();
        }
    }

    // hàm gọi getAllFlashcard từ API
    fetchFlashcards = async (page = 1) => {
        const { userInfor } = this.props;

        if (!userInfor || !userInfor.id) {
            console.error("User information is not available");
            this.setState({ loading: false, error: 'User information is missing.' });
            return;
        }

        try {
            const res = await getAllFlashcardsPagination(userInfor.id, page);
            if (Array.isArray(res.flashcards)) {
                this.setState({
                    flashcards: res.flashcards,
                    loading: false,
                    currentPage: page,
                    totalPages: Math.ceil(res.totalCount / this.state.numberOfElementPerPAge),
                });
            } else {
                this.setState({ flashcards: [], loading: false });
            }
        } catch (error) {
            console.error("Error fetching flashcards:", error);
            this.setState({ loading: false, error: 'Failed to fetch flashcards.' });
        }
    };

    // hàm xử lý khi nhập flashcardName hoặc description
    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    // hàm xử lý tạo flashcard
    handleCreateFlashcard = async () => {
        const { userInfor } = this.props;
        const { flashcardName, description } = this.state;

        if (!flashcardName) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const res = await createFlashcard({
                userId: userInfor.id,
                flashcardName,
                description
            });
            if (res && res.errCode === 0) {
                this.setState({
                    flashcardName: '',
                    description: '',
                    showModal: false,
                });
                this.fetchFlashcards();
            } else {
                alert('Failed to save flashcard.');
            }
        } catch (error) {
            console.error('Error saving flashcard:', error);
            alert('Failed to save flashcard.');
        }
    };

    // Hàm xử lý khi chuyển trang
    handlePageChange = (newPage) => {
        this.fetchFlashcards(newPage);
    }

    // hàm render flashcard
    renderFlashcards = () => {
        const { flashcards } = this.state;

        return (
            <React.Fragment>
                <div className="flashcard-container">
                    <div className='flashcard-title'>
                        {flashcards.length > 0 ? (
                            flashcards.map((flashcard) => (
                                <div
                                    key={flashcard.id}
                                    className="flashcard-item"
                                    onClick={() => this.props.navigate(`/flashcard/${flashcard.id}`)}
                                >
                                    <div className="list-title">{flashcard.flashcardName || 'Không có tiêu đề'}</div>
                                    <p className="list-meta">
                                        <i className="fa-regular fa-copy"></i>
                                        <span>{flashcard.amount} từ | </span>
                                        <span className="icon"><i className="far fa-user"></i></span>
                                        <span> {flashcard.countVocabularyViewed}</span>
                                    </p>
                                    <p className="list-description">{flashcard.description || 'Không có mô tả'}</p>
                                    <div className="list-author">
                                        <img src="https://i.pravatar.cc/300?img=2" alt="User Avatar" className="user-avatar" />
                                        <span>{this.props.userInfor?.fullName || 'Anonymous'}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Không có flashcard nào để hiển thị.</p>
                        )}
                    </div>
                </div>
            </React.Fragment>


        );
    };

    render() {
        const { loading, error, flashcardName, description, showModal, currentPage, totalPages } = this.state;

        return (
            <React.Fragment>
                <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                    <HomeHeader />
                    <div className="flashcard-layout">
                        <div className="header">
                            <div className='title'>My Flashcard</div>
                        </div>
                        <div className="main-content">
                            <div className="create-list-container">
                                <div className="create-list-card" onClick={() => this.setState({ showModal: true })}>
                                    <div className="create-list-button">
                                        <i className="fas fa-plus"></i>
                                        <div className='name'>
                                            Tạo flashcard
                                        </div>
                                    </div>
                                </div>

                                <div className="flashcards-display">
                                    {loading ? (
                                        <Loading />
                                    ) : error ? (
                                        <h4>{error}</h4>
                                    ) : (
                                        this.renderFlashcards()
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='pagination'>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={this.handlePageChange}
                            />
                        </div>

                    </div>
                    {showModal && (
                        <div className="modal">
                            <div className="modal-content">
                                <div className='modal-header'>
                                    <div className="modal-title">Tạo Flashcard</div>
                                    <div className='icon'>
                                        <i className="fa-solid fa-x modal-close" onClick={() => this.setState({ showModal: false })}></i>
                                    </div>
                                </div>
                                <label className="modal-input">
                                    Tiêu đề*:
                                    <input
                                        type="text"
                                        name="flashcardName"
                                        value={flashcardName}
                                        onChange={this.handleInputChange}
                                    />
                                </label>
                                <label className="modal-description">
                                    Mô tả:
                                    <textarea
                                        name="description"
                                        value={description}
                                        onChange={this.handleInputChange}
                                    ></textarea>
                                </label>
                                <button className="modal-save" onClick={this.handleCreateFlashcard}>Save</button>
                            </div>
                        </div>
                    )}
                    <HomeFooter />
                </CustomScrollbars>
            </React.Fragment>
        );
    }

}

const mapStateToProps = (state) => ({
    isLoggedIn: state.user.isLoggedIn,
    userInfor: state.user.userInfor,
    exam: state.user.selectedExam,
});

const mapDispatchToProps = (dispatch) => ({
    navigate: (path) => dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Flashcard);
