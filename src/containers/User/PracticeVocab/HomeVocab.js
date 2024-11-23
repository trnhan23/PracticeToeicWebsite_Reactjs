import React, { Component } from 'react';
import './HomeVocab.scss';
import Practice from './PracticeVocab';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
import CustomScrollbars from '../../../components/CustomScrollbars';
import Pagination from '../../../components/Pagination/Pagination';
import { getVocabInFlashcardPagination } from '../../../services/flashcardService';
import { getAudioVocabularyApi } from '../../../services/vocabularyService';
import { createVocabularyInFlashcard } from '../../../services/vocabularyService';
import { toast } from 'react-toastify';


class HomeVocab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPractice: false,
            flashcardName: '',
            amount: '',
            words: [],
            currentPage: 1,
            totalPages: 0,
            numberOfElementPerPAge: 8,
            showAddWordPopup: false,
            wordDetails: {
                word: '',
                definition: '',
                partOfSpeech: '',
                exampleSentence: '',
                pronunciation: '',
                flashcardId: ''
            }
        };
    }

    componentDidMount = async () => {
        await this.fetchVocabInFlashcards();
    }

    fetchVocabInFlashcards = async (page = 1) => {
        const { match } = this.props;
        const { flashcardId } = match.params;
        if (flashcardId) {
            localStorage.setItem('flashcardId', flashcardId);
            this.setState({
                wordDetails: {
                    flashcardId: flashcardId
                }
            })
        }
        let res = await getVocabInFlashcardPagination(flashcardId, page);

        const wordsWithAudio = await Promise.all(
            res.flashcard.vocabularies.map(async (wordObj) => {
                const dataAudio = await getAudioVocabularyApi(wordObj.word);
                return {
                    ...wordObj,
                    audioUS: dataAudio.audioUS,
                    audioUK: dataAudio.audioUK,
                };
            })
        );

        this.setState({
            flashcardName: res.flashcard.flashcardName,
            amount: res.flashcard.amount,
            words: wordsWithAudio,
            currentPage: page,
            totalPages: Math.ceil(res.totalCount / this.state.numberOfElementPerPAge),
        })
    }

    playAudio = (audioUrl) => {
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play();
        } else {
            console.log("Audio URL not available");
        }
    };

    handlePracticeClick = () => {
        this.setState({ showPractice: true })
    };

    // Hàm xử lý khi chuyển trang
    handlePageChange = (newPage) => {
        this.fetchVocabInFlashcards(newPage);
    }

    // hàm xử lý khi thêm từ
    handleClickAddWord = () => {
        this.setState({ showAddWordPopup: true });
    }

    handleSaveWord = async () => {

        if (this.state.wordDetails.word === '' ||
            this.state.wordDetails.definition === '' ||
            this.state.wordDetails.partOfSpeech === '' ||
            this.state.wordDetails.exampleSentence === '' ||
            this.state.wordDetails.pronunciation === ''
        ) {
            alert(`Vui lòng nhập đủ thông tin`);
        } else {
            let res = await createVocabularyInFlashcard(this.state.wordDetails);

            if (res.errCode === 0) {
                await this.fetchVocabInFlashcards();
                toast.success("Thêm từ thành công");
            } else {
                toast.success("Thêm từ thất bại");
            }

            this.setState({
                showAddWordPopup: false,
                wordDetails: {
                    word: '',
                    definition: '',
                    partOfSpeech: '',
                    exampleSentence: '',
                    pronunciation: '',
                }
            });
        }


        // Thêm logic lưu từ vựng tại đây
    };

    handleClosePopup = () => {
        this.setState({
            showAddWordPopup: false,
            wordDetails: {
                word: '',
                definition: '',
                partOfSpeech: '',
                exampleSentence: '',
                pronunciation: '',
            }
        });
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            wordDetails: {
                ...prevState.wordDetails,
                [name]: value
            }
        }));
    };

    render() {

        const { flashcardName, amount, currentPage, totalPages } = this.state;
        const { showAddWordPopup, wordDetails } = this.state;
        if (this.state.showPractice) {
            return <Practice />;
        }
        return (

            <React.Fragment>
                <HomeHeader />
                <CustomScrollbars style={{ height: '95vh', width: '100%' }}>
                    <div className="home-vocab-container">
                        <h2>Flashcards: {flashcardName}</h2>
                        <button className="practice-button" onClick={() => { this.handlePracticeClick() }}>
                            Luyện tập flashcards
                        </button>
                        <div className='btn-add-word'><button className='button' onClick={() => { this.handleClickAddWord() }}>Thêm từ</button></div>
                        <div> <span className="pratice-count">List có {amount} từ</span></div>

                        <div className="flashcard-list">
                            {this.state.words <= 0 ? (<div>Chưa có từ vựng bạn ơi</div>)
                                :
                                (this.state.words.map((word, index) => (
                                    <div key={index} className="flashcard">
                                        <div className="word-info">
                                            <h3><div className='word'>{word.word}</div> -- {word.partOfSpeech} <span className="pronunciation"><i>{word.pronunciation}</i></span></h3>
                                            <div className="audio-icons">

                                                {word.audioUS && (
                                                    <div className="us" title="Phát âm (US)" onClick={() => this.playAudio(word.audioUS)}>
                                                        <i className="fas fa-volume-up"></i>
                                                        <div className='name'> US</div>
                                                    </div>
                                                )}
                                                {word.audioUK && (
                                                    <div className="uk" title="Phát âm (UK)" onClick={() => this.playAudio(word.audioUK)}>
                                                        <i className="fas fa-volume-up"></i>
                                                        <div className='name'> UK</div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className='vocab-content'>
                                                <div className='vocab_name'>
                                                    Định nghĩa:
                                                    <div className='noidung'>{word.definition}</div>
                                                </div>
                                                <div className='vocab_name'>
                                                    Ví dụ:
                                                    <div className='noidung'>{word.exampleSentence}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )))}
                        </div>
                        <div className='pagination'>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={this.handlePageChange}
                            />
                        </div>
                        {/* Popup thêm từ */}
                        {showAddWordPopup && (
                            <div className="popup-overlay">
                                <div className="popup-content">
                                    <h3>Thêm từ mới</h3>
                                    <div className="popup-form">
                                        <label>
                                            Từ:
                                            <input
                                                type="text"
                                                name="word"
                                                value={wordDetails.word || ''}
                                                onChange={this.handleInputChange}
                                            />
                                        </label>
                                        <label>
                                            Định nghĩa:
                                            <input
                                                type="text"
                                                name="definition"
                                                value={wordDetails.definition || ''}
                                                onChange={this.handleInputChange}
                                            />
                                        </label>
                                        <label>
                                            Phát âm:
                                            <input
                                                type="text"
                                                name="pronunciation"
                                                value={wordDetails.pronunciation || ''}
                                                onChange={this.handleInputChange}
                                            />
                                        </label>
                                        <label>
                                            Loại từ:
                                            <input
                                                type="text"
                                                name="partOfSpeech"
                                                value={wordDetails.partOfSpeech || ''}
                                                onChange={this.handleInputChange}
                                            />
                                        </label>
                                        <label>
                                            Câu ví dụ:
                                            <input
                                                type="text"
                                                name="exampleSentence"
                                                value={wordDetails.exampleSentence || ''}
                                                onChange={this.handleInputChange}
                                            />
                                        </label>

                                        <div className="popup-buttons">
                                            <button onClick={this.handleSaveWord}>
                                                Lưu
                                            </button>
                                            <button onClick={this.handleClosePopup}>
                                                Đóng
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <HomeFooter />
                </CustomScrollbars>
            </React.Fragment>
        );
    }
}

export default HomeVocab;
