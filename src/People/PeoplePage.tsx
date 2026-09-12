import AllPeople from './AllPeople';
import Teaching from './Teaching';
import NonTeaching from './NonTeaching';
import Executives from './Executives';
import Alumni from './Alumni';

type PeoplePageProps = {
  currentPath: string;
};

export default function PeoplePage({ currentPath }: PeoplePageProps) {
  switch (currentPath) {
    case '/people/teaching':
      return <Teaching />;
    case '/people/non-teaching':
      return <NonTeaching />;
    case '/people/executives':
      return <Executives />;
    case '/people/alumni':
      return <Alumni />;
    case '/people':
    default:
      return <AllPeople />;
  }
}
