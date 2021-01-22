import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import ArticleList from './Components/ArticleList/ArticleList';
import Modal from './Components/Modal/Modal';
import Toolbar from './Components/Toolbar/Toolbar';
import Search from './Components/Toolbar/Search';
import Card from './Components/ArticleList/Card';
import getArticles from './network/getData';
import { article, categoriesData } from './types/types';
import './App.css';

const App: React.FC = () => {
  const [articleListArray, setArticleListArray] = useState<
    article[] | undefined
  >(undefined);
  const [categoriesArr, setCategoriesArr] = useState<
    categoriesData[] | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchText, SetSearchText] = useState('');
  const [showModal, setShowModal] = useState(false);

  const showErrorMessage = useCallback((message: string) => {
    alert(message);
  }, []);

  const articleUrl = `https://orgavision-codingchallenge.azurewebsites.net/v1/article?category=${encodeURI(
    categoryFilter
  )}&search=${encodeURI(searchText)}`;

  const reloadArticles = () => {
    const getDataFromServer = async () => {
      try {
        setIsLoading(true);
        const res = await getArticles(articleUrl);
        setArticleListArray(res.articleArr);
        setCategoriesArr(res.categoriesArr);
        if (res.categoriesArr === undefined) {
          showErrorMessage(
            'Data categories could be retrieved. Display degraded!'
          );
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    getDataFromServer();
  };

  useEffect(reloadArticles, [articleUrl, showErrorMessage]);

  const modalToggler = useCallback(() => {
    setShowModal((state) => !state);
  }, []);

  const handleCatFilterChange = useCallback((filter: string) => {
    setCategoryFilter(filter);
  }, []);

  const handleSearchTextChange = debounce(
    useCallback((text: string) => {
      SetSearchText(text);
    }, []),
    300
  );

  const searchComponent = (
    <Search
      changeText={handleSearchTextChange}
      changeCategory={handleCatFilterChange}
      categories={categoriesArr}
      filteredCategory={categoryFilter}
    />
  );
  const loadingCard = (
    <Card article={undefined} openModal={() => {}} catFilter={() => {}} />
  );
  const articleDisplay = (
    <ArticleList
      articleListArray={articleListArray}
      handleCatFilterChange={handleCatFilterChange}
      modalToggler={modalToggler}
    />
  );

  const renderArticles = () => {
    if (isLoading) {
      return loadingCard;
    } else {
      return articleDisplay;
    }
  };

  return (
    <div>
      <Toolbar search={searchComponent} />
      {renderArticles()}
      <Modal show={showModal} close={modalToggler} />
    </div>
  );
};

export default App;
