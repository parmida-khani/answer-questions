'use client'
import {Container, Typography} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {getAnswers} from "@/api/answers";
import {getProblem} from "@/api/problems";
import {IProblem} from "@/models/IProblem";
import ProblemCard from "@/components/ProblemCard";
import AnswerList from "@/components/AnswerList";
import {IAnswer} from "@/models/IAnswer";
import Loading from "@/utils/loading";
import Error from "@/utils/Error";

interface ProblemDetailsProps {
    params: {
        id: string;
    };
}

export default function ProblemDetails({params}: ProblemDetailsProps) {
    const problemQuery = useQuery<IProblem, Error>({
        queryKey: ["problems", params?.id],
        queryFn: () => getProblem(parseInt(params.id)),
    });

    const answersQuery = useQuery<IAnswer[], Error>({
        queryKey: ["answers", params?.id],
        enabled: problemQuery?.data != null,
        queryFn: () => getAnswers(parseInt(params.id)),
    });

    if (problemQuery.isLoading) return <Loading/>;
    if (problemQuery.error) {
        return <Error message={JSON.stringify(problemQuery.error)}/>;
    }
    return (
        <Container>
            {problemQuery?.data && (
                <ProblemCard problem={problemQuery?.data as IProblem} page="details"/>
            )}
            <Typography variant="h6" sx={{fontWeight: "bold"}}>
                پاسخ ها
            </Typography>
            {answersQuery.isLoading && <h1>Loading...</h1>}
            {answersQuery.isError && (
                <Error message={JSON.stringify(answersQuery.error)}/>
            )}
            {answersQuery.data && <AnswerList answers={answersQuery.data as IAnswer[]}/>}
        </Container>
    );
}
