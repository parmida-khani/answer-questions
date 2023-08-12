import axios from 'axios';
import {IProblem} from '@/models/IProblem';

const API_URL = 'http://localhost:8000';

export async function getProblems(): Promise<IProblem[]> {
    const response = await axios.get(`${API_URL}/problems`);
    return response.data;
}

export async function createProblem({title, body}: { title: string; body: string }) {
    const problem = {
        title,
        body,
        author: 'پارمیدا خانی',
        createdTime: new Date().toISOString(),
        totalAnswers: 0,
    };
    const response = await axios.post(`${API_URL}/problems`, problem);
    return response.data;
}

export async function getProblem(id: number): Promise<IProblem> {
    const response = await axios.get(`${API_URL}/problems/${id}`);
    return response.data;
}

export async function updateTotalAnswers({id, totalAnswers}: { id: number; totalAnswers: number }) {
    const response = await axios.patch(`${API_URL}/problems/${id}`, {totalAnswers});
    return response.data;
}
