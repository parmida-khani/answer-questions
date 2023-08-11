import axios from "axios"
import {IAnswer} from "@/models/IAnswer";

export function getAnswers(problemId: number): Promise<IAnswer[]> {
    return axios.get(`http://localhost:8000/answers?problemId=${problemId}`)
        .then(res => res.data)
}