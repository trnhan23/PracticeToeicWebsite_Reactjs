import axios from "../axios";

const getAllFlashcards = async (userId) => {
    try {
        const response = await axios.get('/api/get-all-flashcard', {
            params: { userId }
        });
        console.log('API response data:', response.data);

        return response.data;
    } catch (error) {
        console.error('Error fetching flashcards:', error);
        throw error;
    }
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








const createFlashcard = (data) => {
    return axios.post('/api/create-flashcard', data);
};

const editFlashcard = (flashcardId, updatedData) => {
    return axios.put('/api/edit-flashcard', {
        flashcardId: flashcardId,
        ...updatedData
    });
};


const deleteFlashcard = (flashcardId) => {
    return axios.delete('/api/delete-flashcard', {
        data: { flashcardId: flashcardId }
    });
};


export { getAllFlashcards, createFlashcard, saveWordToFlashcard, saveVocabtoFlashcard, deleteVocabFromFlashcard };


