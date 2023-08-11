import {IAnswer} from "@/models/IAnswer";

export default function AnswerList({answers}: { answers: IAnswer[] }) {
    return (
        <div>
            {answers.map(answer =>
                <div key={answer.id}>{answer.id}</div>
            )}
        </div>
    )
}