import Link from 'next/link';
import Button from '@/components/Button';

const Home = () => {
  return (
    <div className="home">
      <h1 className="home__header">Welcome to localghost shop!</h1>
      <Link href="/products">
        <Button title="Browse products" />
      </Link>
    </div>
  );
};

export default Home;
