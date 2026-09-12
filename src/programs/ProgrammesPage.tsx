import AllProgrammes from './AllProgrammes';
import UndergraduateProgrammes from './UndergraduateProgrammes';
import PostgraduateProgrammes from './PostgraduateProgrammes';

type ProgrammesPageProps = {
  currentPath: string;
};

export default function ProgrammesPage({ currentPath }: ProgrammesPageProps) {
  switch (currentPath) {
    case '/undergraduate':
      return <UndergraduateProgrammes />;
    case '/postgraduate':
      return <PostgraduateProgrammes />;
    case '/programmes':
    default:
      return <AllProgrammes />;
  }
}
