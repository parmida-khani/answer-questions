'use client'
import {Container} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {getAnswers} from "@/api/answers";
import {getProblem} from "@/api/problems";
import {IProblem} from "@/models/IProblem";
import ProblemCard from "@/components/ProblemCard";

export default function ProblemDetails({params}) {
    const problemQuery = useQuery<IProblem, Error>({
        queryKey: ["problems", params?.id],
        queryFn: () => getProblem(params?.id),
    })

    // const answersQuery = useQuery({
    //     queryKey: ["answers", problemQuery?.data?.id],
    //     enabled: problemQuery?.data?.id != null,
    //     queryFn: () => getAnswers(problemQuery.data.id),
    // })

    return (
        <Container>
            {problemQuery.isLoading && <h1>Loading...</h1>}
            {problemQuery.error && <h1>{JSON.stringify(problemQuery.error)}</h1>}
            {problemQuery?.data && <ProblemCard problem={problemQuery?.data as IProblem} page="details"/>}
        </Container>
    )
}