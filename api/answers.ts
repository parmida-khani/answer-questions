import axios from 'axios';
import { IAnswer } from '@/models/IAnswer';

const API_URL = 'http://localhost:8000';

export async function getAnswers(problemId: number): Promise<IAnswer[]> {
    try {
        const response = await axios.get(`${API_URL}/answers?problemId=${problemId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching answers');
    }
}

export async function createAnswer({ body, problemId }: { body: string, problemId: number }) {
    const answer = {
        body,
        problemId,
        author: 'علی کیا',
        createdTime: new Date().toISOString(),
        likedUsers: [],
        dislikedUsers: [],
    };

    try {
        const response = await axios.post(`${API_URL}/answers`, answer);
        return response.data;
    } catch (error) {
        throw new Error('Error creating answer');
    }
}

export async function updateLikedDislikedUsers({
                                                   id,
                                                   likedUsers,
                                                   dislikedUsers,
                                               }: { id: number; likedUsers: number[]; dislikedUsers: number[] }) {
    try {
        const response = await axios.patch(`${API_URL}/answers/${id}`, { likedUsers, dislikedUsers });
        return response.data;
    } catch (error) {
        throw new Error('Error updating liked/disliked users');
    }
}
