import AllNews from './AllNews';
import Media from './Media';

type NewsPageProps = {
  currentPath: string;
};

export default function NewsPage({ currentPath }: NewsPageProps) {
  switch (currentPath) {
    case '/media':
      return <Media />;
    case '/news':
    default:
      return <AllNews />;
  }
}
