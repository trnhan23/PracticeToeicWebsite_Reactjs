import axios from "../axios";

const getAllFlashcardsPagination = (userId, page) => {
    return axios.get('/api/get-all-flashcard-pagination', {
        params: { userId, page }
    });
};

const getAllFlashcards = (userId) => {
    return axios.get('/api/get-all-flashcard', {
        params: { userId }
    });
};

const createFlashcard = (data) => {
    return axios.post('/api/create-flashcard', data);
};

const saveWordToFlashcard = async (flashcardId, data) => {
    try {
        console.log('Sending data to API:', { flashcardId, data });
        const response = await axios.post(`/api/flashcards/${flashcardId}/vocabulary`, data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error response:', error.response.data);
            console.error('Status code:', error.response.status);
        } else if (error.request) {
            console.error('Error request:', error.request);
        } else {
            console.error('General error:', error.message);
        }
        throw error;
    }
};

const saveVocabtoFlashcard = async (data) => {
    try {
        console.log('Sending data to API:', { data });

        const response = await axios.post('/api/save-vocab-flashcard', data);
        return response;
    } catch (error) {
        console.error("Error in saveWordToFlashcard API call:", error);
        throw error;
    }
};

const deleteVocabFromFlashcard = async (data) => {
    try {
        console.log('Sending data to API for deletion:', { data });

        const response = await axios.delete('/api/delete-vocab-flashcard', { data });
        return response;
    } catch (error) {
        console.error("Error in deleteVocabFromFlashcard API call:", error);
        throw error;
    }
};

const getVocabInFlashcardPagination = async (flashcardId, page) => {
    return axios.get('/api/get-vocab-in-flashcard-pagination', {
        params: { flashcardId, page }
    });
}

// const editFlashcard = (flashcardId, updatedData) => {
//     return axios.put('/api/edit-flashcard', {
//         flashcardId: flashcardId,
//         ...updatedData
//     });
// };

// const deleteFlashcard = (flashcardId) => {
//     return axios.delete('/api/delete-flashcard', {
//         data: { flashcardId: flashcardId }
//     });
// };

export {
    getAllFlashcards,
    getAllFlashcardsPagination,
    createFlashcard,
    saveWordToFlashcard,
    saveVocabtoFlashcard,
    deleteVocabFromFlashcard,
    getVocabInFlashcardPagination,

};


