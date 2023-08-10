import {IProblem} from "@/models/IProblem";

const ProblemCard = ({problem}: { problem: IProblem }) => {
    return (
        <div>{problem
            .id}</div>
    )

}

export default ProblemCard