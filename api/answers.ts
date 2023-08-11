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
        numOfLikes: 0,
        numOfDislikes: 0
    }
    return axios
        .post("http://localhost:8000/answers", answer)
        .then(res => res.data)
}