import { useDispatch } from 'react-redux';
import { CarBrand, setCarsBrands } from '../../store/cars/cars.slice';
import useHttpRequest from '../useHttpRequest/useHttp.hook';

const useGetCarsBrands = () => {
  const dispatch = useDispatch();
  const {
    sendRequest,
    error: errorGetCarsBrands,
    loading: loadingGetCarsBrands,
  } = useHttpRequest<{ carsBrands: CarBrand[] }>();
  const getCarsBrands = async () => {
    const brandsResponse = await sendRequest('/api/car/brands', {
      method: 'GET',
      withCredentials: true,
    });

    if (brandsResponse) {
      const { status, data } = brandsResponse;
      if (status === 200 && data.carsBrands.length > 0) {
        dispatch(setCarsBrands({ carsBrands: data.carsBrands }));
      }
    }
  };

  return {
    getCarsBrands,
    errorGetCarsBrands,
    loadingGetCarsBrands,
  };
};

export default useGetCarsBrands;
