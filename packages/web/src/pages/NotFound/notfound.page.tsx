import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../store/user/user.selector';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const { accessToken } = useSelector(selectAccessToken);

  const buttonClasses =
    'w-28 md:w-36 mt-3 p-2 bg-yellow-300 text-black text-center rounded-md hover:bg-[#1f1f1f] hover:text-white transition-colors duration-200';
  return (
    <section className="h-screen w-full flex flex-col justify-center items-center relative bg-[linear-gradient(to_right_bottom,rgba(0,0,0,1),rgba(254,254,254,.2)),url('./landing-1.jpg')] bg-center bg-no-repeat bg-cover">
      <h1 className="font-bold text-6xl tracking-wide md:text-9xl md:tracking-widest mb-3">
        4<span className="text-yellow-300">0</span>4
      </h1>
      <p className="text-4xl md:text-6xl ">SORRY,THERE'S</p>
      <p className="text-yellow-300 text-4xl md:text-6xl ">NOTHING HERE</p>

      {accessToken ? (
        <Link to={'/'} className={buttonClasses}>
          GO HOME
        </Link>
      ) : (
        <Link to={'/signin'} className={buttonClasses}>
          SIGN IN
        </Link>
      )}
    </section>
  );
};

export default NotFound;
