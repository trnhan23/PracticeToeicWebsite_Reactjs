import React, { Component } from 'react';
import './PracticeVocab.scss';
import HomeVocab from './HomeVocab';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
import CustomScrollbars from '../../../components/CustomScrollbars';
import { withRouter } from 'react-router-dom';
import { push } from "connected-react-router";
import { connect } from 'react-redux';
import { path } from '../../../utils';
import { getVocabInFlashcard } from '../../../services/flashcardService';
import { getAudioVocabularyApi } from '../../../services/vocabularyService';

class PracticeVocab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flashcardId: '',
            showHomeVocab: false,
            isFlipped: false,
            currentWordIndex: 0,
            words: [
                {
                    word: 'transport',
                    partOfSpeech: '(noun)',
                    pronunciation: '/trænspɔːrt/',
                    audioUK: '',
                    audioUS: '',
                    definition: 'The act of moving people or goods from one place to another.',
                    example: 'Public transport includes buses, trains, and subways.',
                },
                {
                    word: 'communication',
                    partOfSpeech: '(noun)',
                    pronunciation: '/kəˌmjuːnɪˈkeɪʃən/',
                    audioUK: '',
                    audioUS: '',
                    definition: 'The act of transferring information from one place to another.',
                    example: 'Effective communication is key in business.',
                },
                {
                    word: 'collaborate',
                    partOfSpeech: '(verb)',
                    pronunciation: '/kəˈlæbəreɪt/',
                    audioUK: '',
                    audioUS: '',
                    definition: 'To work together with others to achieve a common goal.',
                    example: 'Teams need to collaborate effectively to succeed.',
                },
                {
                    word: 'efficient',
                    partOfSpeech: '(adjective)',
                    pronunciation: '/ɪˈfɪʃənt/',
                    audioUK: '',
                    audioUS: '',
                    definition: 'Achieving maximum productivity with minimum wasted effort or expense.',
                    example: 'The new process is more efficient and cost-effective.',
                }
            ],
            flashcardName: '',
        };
    }

    componentDidMount = async () => {
        const flashcardId = localStorage.getItem('flashcardId');
        this.setState({
            flashcardId: flashcardId
        }, async () => {
            await this.fetchVocabInFlashcards();
        })
    }

    fetchVocabInFlashcards = async () => {
        let res = await getVocabInFlashcard(this.state.flashcardId);
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
            words: wordsWithAudio,
            flashcardName: res.flashcard.flashcardName,
        })
    }

    handleHomeVocabClick = () => {
        this.setState({ showHomeVocab: true });
        this.props.navigate(path.FLASHCARD);
    };

    toggleFlip = () => {
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    };

    handleNextWord = () => {
        this.setState(prevState => ({
            currentWordIndex: (prevState.currentWordIndex + 1) % prevState.words.length,
            isFlipped: false
        }));
    };

    playAudio = (audioUrl) => {
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play();
            this.toggleFlip();

        } else {
            console.log("Audio URL not available");
        }
    };

    render() {
        if (this.state.showHomeVocab) {
            return <HomeVocab />;
        }
        const currentWord = this.state.words[this.state.currentWordIndex];
        const { flashcardName } = this.state;

        return (
            <React.Fragment>
                <HomeHeader />
                <CustomScrollbars style={{ height: '95vh', width: '100%' }}>
                    <div className="practice-container">
                        <h2>Luyện tập: {flashcardName}</h2>
                        <div className='btn-exit'>
                            <button className="stop-list-button" onClick={this.handleHomeVocabClick}>
                                <i className="fa-solid fa-xmark"></i>Dừng học list từ này
                            </button>
                        </div>

                        <div className={`flashcard ${this.state.isFlipped ? 'flipped' : ''}`} onClick={this.toggleFlip}>
                            <div className="flashcard-front">
                                <h3>{currentWord.word}</h3>
                                <div className="audio-icons">

                                    {currentWord.audioUS && (
                                        <div className="us" title="Phát âm (US)" onClick={() => { this.playAudio(currentWord.audioUS) }}>
                                            <i className="fas fa-volume-up"></i>
                                            <div className='name'> US</div>
                                        </div>
                                    )}

                                    {currentWord.audioUK && (
                                        <div className="uk" title="Phát âm (UK)" onClick={() => { this.playAudio(currentWord.audioUK) }}>
                                            <i className="fas fa-volume-up"></i>
                                            <div className='name'> UK</div>
                                        </div>
                                    )}

                                </div>
                                <p className="part-of-speech">{currentWord.partOfSpeech} <span>{currentWord.pronunciation}</span></p>
                                <i className="fa fa-repeat"></i>
                            </div>
                            <div className="flashcard-back">
                                <div className='vocab_name'>
                                    Định nghĩa:
                                    <div className='noidung'>{currentWord.definition}</div>
                                </div>
                                <div className='vocab_name'>
                                    Ví dụ:
                                    <div className='noidung'>{currentWord.exampleSentence}</div>
                                </div>
                                <i className="fa fa-repeat"></i>
                            </div>
                        </div>
                        <div className="difficulty-buttons">
                            <div className="easy"><i className="fa-regular fa-face-smile"></i><p>Dễ</p></div>
                            <div className="medium"><i className="fa-regular fa-face-meh"></i><p>Trung bình</p></div>
                            <div className="hard"><i className="fa-regular fa-face-sad-tear"></i><p>Khó</p></div>
                            <div className="stats" onClick={this.handleNextWord}>
                                <i className="fa fa-forward"></i>

                                <p>Từ kế tiếp</p>
                            </div>
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
        isLoggedIn: state.user.isLoggedIn,
        userInfor: state.user.userInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PracticeVocab);
