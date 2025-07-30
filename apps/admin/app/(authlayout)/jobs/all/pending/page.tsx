import Jobs from "../../../../../components/jobs/Jobs";
import TableLoading from "../../../../../components/skeleton/TableLoading";
import { JobStatus, useJobs } from "../../../../../graphql/actions/jobs";

const page = () => {
  const { data, error, loading } = useJobs({
    variables: {
      input: {
        status: JobStatus.PENDING,
      },
    },
  });
  return (
    <>
      {loading && <TableLoading />}
      <Jobs data={data?.getJob} />
    </>
  );
};

export default page;
