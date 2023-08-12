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

export default function ProblemDetails({params}) {
    const problemQuery = useQuery<IProblem, Error>({
        queryKey: ["problems", params?.id],
        queryFn: () => getProblem(params?.id),
    });

    const answersQuery = useQuery<IAnswer[], Error>({
        queryKey: ["answers", params?.id],
        enabled: problemQuery?.data != null,
        queryFn: () => getAnswers(params?.id),
    });

    if (problemQuery.isLoading) return <Loading/>;
    if (problemQuery.error) {
        return <Error message={problemQuery.error.message}/>;
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
                <Error message={answersQuery.error.message}/>
            )}
            {answersQuery.data && <AnswerList answers={answersQuery.data as IAnswer[]}/>}
        </Container>
    );
}
