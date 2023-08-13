'use client'
import {useQuery} from "@tanstack/react-query";
import {getProblems} from "@/api/problems";
import {IProblem} from "@/models/IProblem";
import ProblemCard from "@/components/ProblemCard";
import {Container} from "@mui/material";
import Loading from "@/utils/loading";
import Error from "@/utils/Error";
import {AxiosError} from "axios";

const ProblemList = () => {
    const {data: problems, error, isLoading} = useQuery<IProblem[], AxiosError>({
        queryKey: ["problems"],
        queryFn: getProblems
    })

    if (isLoading) return <Loading/>
    if (error) {
        return <Error message={JSON.stringify(error?.message)}/>
    }

    return (
        <Container>
            {problems?.map(problem => (
                <ProblemCard key={problem.id} problem={problem} page="problems"/>
            ))}
        </Container>
    )
}

export default ProblemList