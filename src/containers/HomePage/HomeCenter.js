import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeCenter.scss'

class HomeCenter extends Component {

    render() {


        return (
            <React.Fragment>
                <div className='home-center-container'>
                    <div className='home-header-banner'>
                        <div className='home-banner'>
                            <div className='title1'>HỌC TIẾNG ANH MỌI LÚC MỌI NƠI!</div>
                            <div className='title2'>Website cung cấp những kiến thức cần thiết về ngữ pháp, topic từ vựng theo chủ đề. Ngoài ra bạn còn có thể thi thử online
                                để đánh giá năng lực của bản thân.</div>
                            <button>Luyện thi ngay!</button>
                        </div>
                    </div>
                    <div class="services">
                        <div class="service">
                            <i class="fa-solid fa-sliders"></i>
                            <h3>Ngữ pháp</h3>
                            <p>Các bài học ngữ pháp từ cơ bản đến nâng cao để giúp bạn làm bài TOEIC tốt hơn.</p>
                        </div>
                        <div class="service">
                            <i class="fa-solid fa-pencil"></i>
                            <h3>Luyện thi</h3>
                            <p>Cung cấp đề thi thử giúp bạn kiểm tra trình độ và chuẩn bị cho kỳ thi.</p>
                        </div>
                        <div class="service">
                            <i class="fa-solid fa-tree"></i>
                            <h3>Từ vựng</h3>
                            <p>Học từ vựng một cách hiệu quả qua các flashcards thông minh.</p>
                        </div>
                    </div>
                    <div className='home-center-content'>
                        <div className='title1'>Về chúng tôi</div>
                        <div className='title2'>Hãy bắt đầu chuyến hành trình của bạn với chúng tôi</div>
                        <div className='title3'>
                            <div className='title3-1'></div>
                            <div className='title3-2'>
                                <div className='title3-2-1'>Hãy nâng cao trình độ tiếng anh của bạn qua các bài học trên website của chúng tôi</div>
                                <div className='title3-2-2'>Các bài học trên website của chúng tôi đều và miễn phí, bên cạnh đó website còn hỗ trợ các gói từ vựng giúp người dùng có thể tra cứu và học tập. Website còn có các đề thi thử Toeic theo đúng định dạng như thi thật để giúp cho người dùng có thể dễ dàng nắm bắt tốt cho việc học và giúp việc học tiếng anh một cách dễ dàng.</div>
                            </div>
                        </div>
                    </div>
                    <div className='home-center-contentnext'>
                        <div className='content1' >Tính năng</div>
                        <div className='content2'>Hãy nâng cao trình độ của bạn qua những tính năng của chúng tôi</div>
                        <div class="content3">
                            <div class="content3s">
                                <i class="fa-solid fa-sliders"></i>
                                <h3>Học từ vựng</h3>
                                <p>Học từ vựng thông dụng và chuyên sâu theo chủ đề</p>
                            </div>
                            <div class="content3s">
                                <i class="fa-solid fa-pencil"></i>
                                <h3>Tra từ vựng</h3>
                                <p>Tra từ vựng trực tiếp trên website</p>
                            </div>
                            <div class="content3s">
                                <i class="fa-solid fa-tree"></i>
                                <h3>Luyện thi</h3>
                                <p>Luyện thi trực tiếp có lời giải và đáp án cụ thể</p>
                            </div>
                        </div>
                    </div>

                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeCenter);
