import React, { Component } from 'react';
import './PracticeVocab.scss';
import HomeVocab from './HomeVocab';

class PracticeVocab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showHomeVocab: false,
            isFlipped: false,
            currentWordIndex: 0,
            words: [
                {
                    text: 'transport',
                    partOfSpeech: '(noun)',
                    pronunciation: '/trænspɔːrt/',
                    audioUK: '',
                    audioUS: '',
                    definition: 'The act of moving people or goods from one place to another.',
                    example: 'Public transport includes buses, trains, and subways.',
                },
                {
                    text: 'communication',
                    partOfSpeech: '(noun)',
                    pronunciation: '/kəˌmjuːnɪˈkeɪʃən/',
                    audioUK: '',
                    audioUS: '',
                    definition: 'The act of transferring information from one place to another.',
                    example: 'Effective communication is key in business.',
                },
                {
                    text: 'collaborate',
                    partOfSpeech: '(verb)',
                    pronunciation: '/kəˈlæbəreɪt/',
                    audioUK: '',
                    audioUS: '',
                    definition: 'To work together with others to achieve a common goal.',
                    example: 'Teams need to collaborate effectively to succeed.',
                },
                {
                    text: 'efficient',
                    partOfSpeech: '(adjective)',
                    pronunciation: '/ɪˈfɪʃənt/',
                    audioUK: '',
                    audioUS: '',
                    definition: 'Achieving maximum productivity with minimum wasted effort or expense.',
                    example: 'The new process is more efficient and cost-effective.',
                }
            ]
        };
    }

    handleHomeVocabClick = () => {
        this.setState({ showHomeVocab: true });
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

    render() {
        if (this.state.showHomeVocab) {
            return <HomeVocab />;
        }

        const currentWord = this.state.words[this.state.currentWordIndex];

        return (
            <div className="practice-container">
                <h2>Luyện tập: Từ vựng tiếng Anh văn phòng</h2>
                <div className='btn-exit'>
                    <button className="stop-list-button" onClick={this.handleHomeVocabClick}>
                        <i className="fa-solid fa-xmark"></i>Dừng học list từ này
                    </button>
                </div>

                <div className={`flashcard ${this.state.isFlipped ? 'flipped' : ''}`} onClick={this.toggleFlip}>
                    <div className="flashcard-front">
                        <h3>{currentWord.text}</h3>
                        <div className="audio-icons">
                            <div className="us" title="Phát âm (US)">
                                <i className="fas fa-volume-up"></i>
                                <div className='name'> US</div>

                            </div>
                            <div className="uk" title="Phát âm (UK)">
                                <i className="fas fa-volume-up"></i>
                                <div className='name'> UK</div>
                            </div>
                        </div>
                        <p className="part-of-speech">{currentWord.partOfSpeech} <span>{currentWord.pronunciation}</span></p>
                        <i class="fa fa-repeat"></i>
                    </div>
                    <div className="flashcard-back">
                        <div className='vocab_name'>
                            Định nghĩa:
                            <div className='noidung'>{currentWord.definition}</div>
                        </div>
                        <div className='vocab_name'>
                            Ví dụ:
                            <div className='noidung'>{currentWord.example}</div>
                        </div>
                        <i class="fa fa-repeat"></i>
                    </div>

                </div>

                <div className="difficulty-buttons">
                    <div className="easy"><i className="fa-regular fa-face-smile"></i><p>Dễ</p></div>
                    <div className="medium"><i className="fa-regular fa-face-meh"></i><p>Trung bình</p></div>
                    <div className="hard"><i className="fa-regular fa-face-sad-tear"></i><p>Khó</p></div>
                    <div className="stats" onClick={this.handleNextWord}>
                        <i class="fa fa-forward"></i>

                        <p>Đã biết, loại khỏi danh sách ôn tập</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default PracticeVocab;
