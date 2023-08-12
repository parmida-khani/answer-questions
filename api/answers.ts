import axios from 'axios';
import {IAnswer} from '@/models/IAnswer';

const API_URL = 'http://localhost:8000';

export async function getAnswers(problemId: number): Promise<IAnswer[]> {
    const response = await axios.get(`${API_URL}/answers?problemId=${problemId}`);
    return response.data;
}

export async function createAnswer({body, problemId}: { body: string, problemId: number }) {
    const answer = {
        body,
        problemId,
        author: 'علی کیا',
        createdTime: new Date().toISOString(),
        likedUsers: [],
        dislikedUsers: [],
    };

    const response = await axios.post(`${API_URL}/answers`, answer);
    return response.data;

}

export async function updateLikedDislikedUsers({
                                                   id,
                                                   likedUsers,
                                                   dislikedUsers,
                                               }: { id: number; likedUsers: number[]; dislikedUsers: number[] }) {
    const response = await axios.patch(`${API_URL}/answers/${id}`, {likedUsers, dislikedUsers});
    return response.data;

}
