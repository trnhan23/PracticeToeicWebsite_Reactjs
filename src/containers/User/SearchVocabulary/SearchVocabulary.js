import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
import CustomScrollbars from '../../../components/CustomScrollbars';
import { push } from "connected-react-router";
import { getSearchVocabularyApi, getAudioVocabularyApi } from '../../../services/vocabularyService';
import { getAllFlashcards, saveVocabtoFlashcard, deleteVocabFromFlashcard } from '../../../services/flashcardService';
import './SearchVocabulary.scss';

class SearchVocabulary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: '',
            result: null,
            error: '',
            lang: 'en',
            searchType: 'dictionary',
            audioUS: '',
            audioUK: '',
            showModal: false,
            flashcards: [],
            savedWords: {}
        };

    }

    // handleDeleteFromFlashcard = async (flashcardId, vocabularyId) => {
    //     try {
    //         const response = await deleteVocabFromFlashcard({ flashcardId, vocabularyId });

    //         // Kiểm tra phản hồi từ API và cập nhật giao diện
    //         if (response && response.data.errCode === 0) {
    //             alert("Đã xóa từ khỏi flashcard thành công!");
    //             this.setState(prevState => ({
    //                 savedWords: {
    //                     ...prevState.savedWords,
    //                     [flashcardId]: false, // Đánh dấu flashcard này chưa được lưu
    //                 }
    //             }));
    //         } else if (response && response.data.errMessage) {
    //             alert(`Error: ${response.data.errMessage}`);
    //         } else {
    //             alert("Đã xảy ra lỗi không xác định.");
    //         }
    //     } catch (error) {
    //         console.error("Lỗi khi xóa từ khỏi flashcard:", error);
    //         alert(`Error: ${error.response ? error.response.data.errMessage : error.message}`);
    //     }
    // };


    handleSaveClick = async () => {
        try {
            const res = await getAllFlashcards(this.props.userInfor.id);
            if (res.errCode === 0) {
                this.setState({
                    flashcards: res.flashcards,
                    showModal: true
                });
            }

        } catch (error) {
            console.error("Lỗi khi tải flashcards", error);
        }
    };


    handleSaveToFlashcard = async (flashcardId) => {
        const { word, result, audioUS, audioUK } = this.state;

        // Lấy chuỗi HTML từ API trả về
        const documentHTML = result?.tratu?.[0]?.fields?.fulltext;
        if (!documentHTML) {
            console.log("Không có tài liệu HTML để xử lý.");
            return;
        }

        try {

            // Sử dụng DOMParser để chuyển đổi HTML thành tài liệu DOM
            const parser = new DOMParser();
            const doc = parser.parseFromString(documentHTML, "text/html");

            // Trích xuất các giá trị cần thiết từ tài liệu DOM
            let pronunciation = '';
            let partOfSpeech = '';
            let definition = '';
            let exampleSentence = '';

            // Tìm phần tử chứa cách phát âm (pronunciation)
            const pronunciationElement = doc.querySelector('#C_C font[color="#9e9e9e"]');
            if (pronunciationElement) {
                pronunciation = pronunciationElement.innerText;
            }

            // Tìm phần tử chứa loại từ (partOfSpeech)
            const partOfSpeechElement = doc.querySelector('#tl b font[color="#1a76bf"]');
            if (partOfSpeechElement) {
                partOfSpeech = partOfSpeechElement.innerText;
            }

            // Tìm phần tử chứa định nghĩa (definition)
            const definitionElement = doc.querySelectorAll('#mn #C_C')[0];
            if (definitionElement) {
                definition = definitionElement.innerText;
            }

            // Tìm phần tử chứa ví dụ (exampleSentence)
            const exampleSentenceElement = doc.querySelectorAll('#mh #C_C font[color="#1371BB"]')[0];
            if (exampleSentenceElement) {
                exampleSentence = exampleSentenceElement.innerText;
            }

            // Gửi dữ liệu từ vựng đến API
            const response = await saveVocabtoFlashcard({
                word,
                definition,
                partOfSpeech,
                exampleSentence,
                pronunciation,
                audioUS,
                audioUK,
                flashcardId
            });

            // Kiểm tra phản hồi từ API và hiển thị thông báo
            if (response && response.errCode === 0) {
                alert("Đã lưu từ vào flashcard thành công!");
                this.setState(prevState => ({
                    showModal: false,
                    savedWords: {
                        ...prevState.savedWords,
                        [flashcardId]: true, // Đánh dấu flashcard này đã được lưu
                    }
                }));
            }

            else if (response && response.errMessage) {
                alert(`Error: ${response.errMessage}`);
            } else {
                alert("Đã xảy ra lỗi không xác định.");
            }
        } catch (error) {
            console.error("Lỗi khi lưu từ vào flashcard:", error);
            alert(`Error: ${error.response ? error.response.data.errMessage : error.message}`);
        }

    };

    handleInputChange = (event) => {
        this.setState({
            word: event.target.value
        });
    };

    renderDefinition = (fulltext) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(fulltext, 'text/html');

        const title = doc.querySelector('.dict--title');
        const content = doc.querySelector('.dict--content');

        if (!title || !content) {
            return <p>No definitions found</p>;
        }

        return (
            <div>
                <h4 dangerouslySetInnerHTML={{ __html: title.innerHTML }} />
                <div dangerouslySetInnerHTML={{ __html: content.innerHTML }} />
            </div>
        );
    };

    handleSearch = async () => {
        const { word, lang } = this.state;

        if (!word) {
            this.setState({ error: 'Please enter a word to search' });
            return;
        }

        try {
            let response = await getSearchVocabularyApi(word, lang);
            let dataAudio = await getAudioVocabularyApi(word);
            this.setState({
                result: response,
                audioUS: dataAudio.audioUS,
                audioUK: dataAudio.audioUK,
                error: ''
            });
        } catch (error) {
            this.setState({ error: 'Word not found! Plz enter another word!' });
        }
    };

    playAudio = (audioUrl) => {
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play();
        } else {
            console.log("Audio URL not available");
        }
    };

    render() {
        const { word, result, error, audioUS, audioUK, showModal, flashcards } = this.state;
        return (
            <React.Fragment>
                <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                    <HomeHeader />
                    <div className='search-vocabulary'>
                        <div className='search-vocabulary-container'>
                            <div className='search-vocabulary-title'>
                                <i className="fa-solid fa-book"></i>
                                <span className='search-vocabulary-title-one'>Dictionary</span>
                            </div>
                            <div className='search-vocabulary-input'>
                                <input
                                    type='text'
                                    value={word}
                                    onChange={this.handleInputChange}
                                    placeholder='Enter a word'
                                />
                                <button onClick={this.handleSearch}>Tra từ</button>
                            </div>
                            {error && <div className='search-vocabulary-input-error'>😊{error}😊</div>}

                            <div className='search-vocabulary-content'>
                                {result && result.tratu && result.tratu.length > 0 && (
                                    <div className='vocabulary-result'>
                                        <div className='vocabulary-header'>
                                            <h3>Kết quả cho "{word}"</h3>
                                            {/* Thêm nút Save */}

                                            <i
                                                className='fa-solid fa-heart'
                                                onClick={() => { this.handleSaveClick() }}
                                            ></i>
                                        </div>

                                        <div className='audio-controls'>
                                            {audioUS && (
                                                <a onClick={() => this.playAudio(audioUS)} className="us" title="Phát âm (US)">
                                                    <i className="fas fa-volume-up"> US</i>
                                                </a>
                                            )}
                                            {audioUK && (
                                                <a onClick={() => this.playAudio(audioUK)} className="uk" title="Phát âm (UK)">
                                                    <i className="fas fa-volume-up"> UK</i>
                                                </a>
                                            )}
                                        </div>

                                        <div className='vocabulary-definition'>
                                            {result.tratu[0].fields.fulltext && this.renderDefinition(result.tratu[0].fields.fulltext)}
                                        </div>
                                        {/* Modal hiển thị danh sách flashcards */}
                                        {showModal && (
                                            <div className="flashcard-modal">
                                                <h2>Chọn Flashcard để lưu</h2>
                                                <ul>
                                                    {Array.isArray(flashcards) && flashcards.length > 0 ? (
                                                        flashcards.map(flashcard => (
                                                            <li key={flashcard.id}>
                                                                <button>
                                                                    {flashcard.flashcardName}
                                                                </button>
                                                                <i
                                                                    className={`fa-heart ${this.state.savedWords[flashcard.id] ? 'fa-solid' : 'fa-regular'}`}
                                                                    style={{ color: this.state.savedWords[flashcard.id] ? 'pink' : 'black' }}
                                                                    onClick={() => { this.handleSaveToFlashcard(flashcard.id) }}
                                                                ></i>

                                                            </li>

                                                        ))
                                                    ) : (
                                                        <li>Không có flashcard nào để hiển thị.</li>
                                                    )}
                                                </ul>
                                                <button onClick={() => this.setState({ showModal: false })}>Đóng</button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(SearchVocabulary);
