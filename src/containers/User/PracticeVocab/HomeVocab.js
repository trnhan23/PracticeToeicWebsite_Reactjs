import React, { Component } from 'react';
import './HomeVocab.scss';
import Practice from './PracticeVocab';

class HomeVocab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPractice: false,
            words: [
                {
                    word: 'absent',
                    partOfSpeech: '(adjective)',
                    pronunciation: '/ˈæbsənt/',
                    audioUK: '',
                    audioUS: '',
                    definition: 'vắng mặt (vì đau ốm,...)',
                    example: 'Most students were absent from school at least once (Hầu hết sinh viên đã vắng mặt ít nhất một lần)',
                },
                {
                    word: 'accept',
                    partOfSpeech: '(verb)',
                    pronunciation: '/ækˈsept/',
                    audioUK: '',
                    audioUS: '',
                    definition: 'nhận, chấp nhận',
                    example: 'We accept payment by Visa Electron, Visa, Switch, Maestro...',
                }
            ]
        };
    }

    handlePracticeClick = () => {
        this.setState({ showPractice: true });  // Cập nhật state để hiển thị Practice component
    };

    render() {
        if (this.state.showPractice) {
            return <Practice />;  // Hiển thị Practice nếu showPractice là true
        }

        return (
            <div className="home-vocab-container">
                <h2>Flashcards: Từ vựng tiếng Anh văn phòng</h2>
                <button className="practice-button" onClick={this.handlePracticeClick}>
                    Luyện tập flashcards
                </button>
                <div> <span className="pratice-count">List có {this.state.words.length} từ</span></div>

                <div className="flashcard-list">
                    {this.state.words.map((word, index) => (
                        <div key={index} className="flashcard">
                            <div className="word-info">
                                <h3>{word.word} {word.partOfSpeech} <span className="pronunciation">{word.pronunciation}</span></h3>
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
                                <div className='vocab-content'>
                                    <div className='vocab_name'>
                                        Định nghĩa:
                                        <div className='noidung'>{word.definition}</div>
                                    </div>
                                    <div className='vocab_name'>
                                        Ví dụ:
                                        <div className='noidung'>{word.example}</div>
                                    </div>
                                </div>
                                {/* <p><strong>Định nghĩa:</strong> {word.definition}</p>
                                <p><strong>Ví dụ:</strong> {word.example}</p> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default HomeVocab;
