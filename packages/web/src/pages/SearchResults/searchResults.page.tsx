import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '../../components/Layouts/Main/main.layout';
import Nav from '../../components/Nav/nav.component';
import Sidebar from '../../components/Sidebar/sidebar.component';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getSearchResultsByQuery } from '../../store/search/search.selector';
import SearchResultItem from '../../components/SearchResultItem/searchResultItem.component';

const SearchResultsPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const queryURL = state?.queryURL;

  useEffect(() => {
    if (!queryURL) {
      navigate('/');
    }
  }, [queryURL]);

  const searchResults = useSelector(getSearchResultsByQuery(queryURL));

  let NoResultsContent;

  if (!searchResults?.resultsCount || searchResults.resultsCount === 0) {
    NoResultsContent = (
      <div className="h-screen w-full flex items-center justify-center">
        <h1 className="font-bold capitalize text-black text-3xl">No results found</h1>
      </div>
    );
  }

  return (
    <MainLayout className="bg-white">
      <Nav setShowComponent={() => {}} />
      <Sidebar setShowComponent={() => {}} />
      {NoResultsContent}
      {searchResults && searchResults?.resultsCount > 0 && (
        <div className="w-full px-2 py-6 lg:px-56 lg:py-10 flex flex-col gap-10 overflow-y-auto">
          <h3 className="text-2xl font-bold font-kanit">
            Found {searchResults?.resultsCount} {searchResults?.resultsCount === 1 ? 'result' : 'results'}
          </h3>
          {searchResults?.results.map((result) => (
            <SearchResultItem key={result.id} {...result} />
          ))}
        </div>
      )}
    </MainLayout>
  );
};

export default SearchResultsPage;
