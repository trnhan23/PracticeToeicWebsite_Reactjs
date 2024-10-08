import axios from "../axios"

const getSearchVocabularyApi = async (word, language) => {
    return await axios.get('/api/search-vocabulary', {
        params: {
            word: word,
            language: language
        }
    })
};

const getAudioVocabularyApi = async (word) => {
    return await axios.get('/api/audio-vocabulary', {
        params: {
            word: word
        }
    })
};

export {
    getSearchVocabularyApi,
    getAudioVocabularyApi,

}


