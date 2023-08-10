import axios from "axios"
import {IProblem} from "@/models/IProblem";

export function getProblems(): Promise<IProblem[]> {
    return axios
        .get("http://localhost:8000/problems")
        .then(res => res.data)
}