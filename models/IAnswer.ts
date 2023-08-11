export interface IAnswer {
    id: number,
    problemId: number,
    author: string,
    body: string,
    createdTime: string,
    numOfLikes: number,
    numOfDislikes: number
}