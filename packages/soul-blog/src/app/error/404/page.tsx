export async function generateStaticParams() {
  return {
    props: {
      message: "404 Not Found",
    },
  };
}

function ERROR_404_PAGE({ message }: { message: string }) {
  return <div>{message}</div>;
}

export default ERROR_404_PAGE;
