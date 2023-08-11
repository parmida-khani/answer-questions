import axios from "axios"
import {IProblem} from "@/models/IProblem";

export function getProblems(): Promise<IProblem[]> {
    return axios
        .get("http://localhost:8000/problems")
        .then(res => res.data)
}

export function createProblem({title, body}: { title: string, body: string }) {
    const problem = {
        title,
        body,
        author: 'پارمیدا خانی',
        createdTime: new Date().toISOString(),
        totalAnswers: 0
    }
    return axios
        .post("http://localhost:8000/problems", problem)
        .then(res => res.data)
}

export function getProblem(id): Promise<IProblem> {
    return axios.get(`http://localhost:8000/problems/${id}`).then(res => res.data)
}