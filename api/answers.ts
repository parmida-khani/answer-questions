import axios from "axios"
import {IAnswer} from "@/models/IAnswer";

export function getAnswers(problemId: number): Promise<IAnswer[]> {
    return axios.get(`http://localhost:8000/answers?problemId=${problemId}`)
        .then(res => res.data)
}

export function createAnswer({body, problemId}: { body: string, problemId: number }) {
    const answer = {
        body,
        problemId,
        author: 'علی کیا',
        createdTime: new Date().toISOString(),
        likedUsers: [],
        dislikedUsers: []
    }
    return axios
        .post("http://localhost:8000/answers", answer)
        .then(res => res.data)
}

export function updateLikedUsers({id, likedUsers}: { id: number, likedUsers: number[] }) {
    return axios
        .patch(`http://localhost:8000/answers/${id}`, {likedUsers})
        .then(res => res.data)
}

export function updateDislikedUsers({id, dislikedUsers}: { id: number, dislikedUsers: number[] }) {
    return axios
        .patch(`http://localhost:8000/answers/${id}`, {dislikedUsers})
        .then(res => res.data)
}