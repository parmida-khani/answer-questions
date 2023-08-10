'use client'

import {useQuery} from "@tanstack/react-query";
import {getProblems} from "@/api/problems";
import {IProblem} from "@/models/IProblem";
import ProblemCard from "@/components/ProblemCard";

const ProblemList = () => {
    const {data: problems, error, isLoading} = useQuery<IProblem[], Error>({
        queryKey: ["problems"],
        queryFn: getProblems
    })

    if (isLoading) return <h1>Loading...</h1>
    if (error) {
        return <h1>{JSON.stringify(error)}</h1>
    }

    return (
        <div>
            {problems.map(problem => (
                <ProblemCard key={problem.id} problem={problem}/>
            ))}
        </div>
    )
}

export default ProblemList