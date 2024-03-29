import { useEffect, useRef, useState } from 'react';
import TopLevelNotification, {
  TopLevelNotificationHandlers,
} from '../../components/UI/TopLevelNotification/topLevelNotification.component';
import Nav from '../../components/Nav/nav.component';
import useHttpRequest from '../../hooks/useHttpRequest/useHttp.hook';
import { useNavigate, useParams } from 'react-router-dom';
import { type Ad } from '../../types/ad.types';
import { Warning } from 'phosphor-react';
import ImageSlideShow from '../../components/ImageSlideshow/imageSlideShow.component';
import AdSellerDetails from '../../components/Ad/adSellerDetails.component';
import AdTechnicalDetails from '../../components/Ad/adTechnicalDetails.component';
import AdCarShortDetails from '../../components/Ad/adCarShortDetails.component';

export interface AdTechnicalDetailsProps extends Ad {
  isLoading?: boolean;
  brandName: string;
  modelName: string;
  userId: string;
}

const AdDetailsPage = () => {
  const { adId } = useParams();
  const { sendRequest, loading, error } = useHttpRequest<AdTechnicalDetailsProps>();
  const topLevelNotificationRef = useRef<TopLevelNotificationHandlers>(null);
  const navigate = useNavigate();
  const [info, setInfo] = useState<AdTechnicalDetailsProps>();

  const getAdDetailsById = async (adId: string) => {
    const adDetails = await sendRequest(`/api/ad/${adId}`, {
      method: 'GET',
      withCredentials: true,
    });
    if (adDetails && adDetails?.data.id) {
      setInfo(adDetails.data);
    }
  };

  useEffect(() => {
    if (!adId) {
      navigate('/');
      return;
    }

    !info && getAdDetailsById(adId);
  }, [adId]);

  if (error) {
    if (topLevelNotificationRef) {
      topLevelNotificationRef.current?.display({
        icon: <Warning className="w-14 h-8 text-red-600" />,
        message: error?.message || 'Offer of the day not available. Please try again later!',
      });
    }
  }

  return (
    <>
      <TopLevelNotification ref={topLevelNotificationRef} hasCloseButton={false} dismissAfterXMs={5500} />
      <Nav showOnAllScreens={true} setShowComponent={() => {}} />
      <section className="h-full max-h-[98%] mx-auto max-w-7xl md:px-4 lg:px-8">
        <div className="flex flex-col md:flex-row h-full gap-0 md:gap-5">
          <ImageSlideShow classNames="w-full md:w-[75%]" imagesSource={info?.images || []} isLoading={loading} />
          {info && (
            <AdCarShortDetails
              {...info}
              isLoading={loading}
              thumbnail={info?.images[0]?.path || ''}
              description={info.description ?? ''}
            />
          )}
        </div>
        {info && <AdTechnicalDetails {...info} isLoading={loading} />}
        {info && (
          <AdSellerDetails
            header="Informations about seller"
            className="flex md:hidden w-full flex-col border border-black p-2 my-4"
            {...info}
            sellerName={info.sellerFullName}
          />
        )}
      </section>
    </>
  );
};

export default AdDetailsPage;
