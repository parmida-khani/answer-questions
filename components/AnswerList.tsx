import {IAnswer} from "@/models/IAnswer";
import AnswerCard from "@/components/AnswerCard";

export default function AnswerList({answers}: { answers: IAnswer[] }) {
    return (
        <div>
            {answers.map(answer =>
                <AnswerCard key={answer.id} answer={answer}/>
            )}
        </div>
    )
}