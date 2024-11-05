import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import CustomScrollbars from '../../../components/CustomScrollbars';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
import { getAllFlashcards, createFlashcard } from '../../../services/flashcardService';
import './FlashCard.scss';

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
            itemsPerPage: 6,
        };
    }

    componentDidMount() {
        this.fetchFlashcards();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.userInfor !== this.props.userInfor) {
            this.fetchFlashcards();
        }
    }

    fetchFlashcards = async () => {
        const { userInfor } = this.props;
        if (!userInfor || !userInfor.id) {
            console.error("User information is not available");
            return;
        }

        try {
            const res = await getAllFlashcards(userInfor.id);
            // Kiểm tra dữ liệu trả về từ API có phải là mảng không
            if (Array.isArray(res.flashcards.data)) {
                this.setState({
                    flashcards: res.flashcards.data,
                    loading: false,
                });
            } else {
                console.error('Dữ liệu không phải là mảng:', res.flashcards.data);
                this.setState({ flashcards: [], loading: false });
            }
        } catch (error) {
            this.setState({ loading: false, error: 'Failed to fetch flashcards.' });
        }
    };


    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleCreateFlashcard = async () => {
        const { userInfor } = this.props;
        const { flashcardName, description } = this.state;

        if (!flashcardName || !description) {
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

    handlePageChange = (pageNumber) => {
        this.setState({ currentPage: pageNumber });
    };
    renderFlashcards = () => {
        const { flashcards, currentPage, itemsPerPage } = this.state;

        // Tính toán chỉ số bắt đầu và kết thúc cho flashcard
        const indexOfLastFlashcard = currentPage * itemsPerPage;
        const indexOfFirstFlashcard = indexOfLastFlashcard - itemsPerPage;
        const currentFlashcards = Array.isArray(flashcards) ? flashcards.slice(indexOfFirstFlashcard, indexOfLastFlashcard) : [];

        return (
            <div className="flashcard-container">
                <div className='flashcard-title'>
                    {currentFlashcards.length > 0 ? (
                        currentFlashcards.map((flashcard) => (
                            <div
                                key={flashcard.id}
                                className="flashcard-item"
                                onClick={() => this.props.navigate(`/flashcard/${flashcard.id}`)}
                            >
                                <h3 className="list-title">{flashcard.flashcardName || 'Không có tiêu đề'}</h3>
                                <p className="list-meta">
                                    <i className="fa-regular fa-copy"></i>
                                    <span>{flashcard.amount} từ | </span>
                                    <span className="icon">👤</span>
                                    <span>{flashcard.countVocabularyViewed}</span>
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
                <div className="pagination">
                    {Array.from({ length: Math.ceil(flashcards.length / itemsPerPage) }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => this.handlePageChange(index + 1)}
                            className={index + 1 === currentPage ? 'active' : ''}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        );
    };


    render() {
        const { loading, error, flashcardName, description, showModal } = this.state;

        return (
            <React.Fragment>
                <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                    <HomeHeader />
                    <div className="flashcard-layout">
                        <div className="header">
                            <h3>My Flashcard</h3>
                        </div>
                        <div className="main-content">
                            <div className="create-list-container">
                                <div className="create-list-card" onClick={() => this.setState({ showModal: true })}>
                                    <div className="create-list-button">+ Create Flashcard</div>
                                </div>

                                <div className="flashcards-display">
                                    {loading ? (
                                        <h4>Loading...</h4>
                                    ) : error ? (
                                        <h4>{error}</h4>
                                    ) : (
                                        this.renderFlashcards()
                                    )}
                                </div>
                            </div>

                            {showModal && (
                                <div className="modal">
                                    <div className="modal-content">
                                        <p className="modal-title">My Flashcard</p>
                                        <i className="fa-solid fa-x modal-close" onClick={() => this.setState({ showModal: false })}></i>
                                        <label className="modal-input">
                                            Flashcard Name:
                                            <input
                                                type="text"
                                                name="flashcardName"
                                                value={flashcardName}
                                                onChange={this.handleInputChange}
                                            />
                                        </label>
                                        <label className="modal-description">
                                            Description:
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
                        </div>
                    </div>
                    <HomeFooter />
                </CustomScrollbars>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        userInfor: state.user.userInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Flashcard);
