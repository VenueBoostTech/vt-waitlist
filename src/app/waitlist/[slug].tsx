import { GetServerSideProps } from 'next';
import prisma from '../../lib/prisma';

const WaitlistPage = ({ waitlist }: { waitlist: { name: string; description: string } }) => {
  if (!waitlist) return <h1>Waitlist not found</h1>;
  return (
    <div>
      <h1>{waitlist.name}</h1>
      <p>{waitlist.description}</p>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug;

  const waitlist = await prisma.waitlist.findUnique({
    where: { slug: String(slug) },
  });

  return {
    props: {
      waitlist,
    },
  };
};

export default WaitlistPage;
