import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import ArticleList from './containers/ArticleList/ArticleList';
import Modal from './UI/Modal/Modal';
import Toolbar from './Components/Toolbar/Toolbar';
import Card from './Components/Card/Card';
import getArticles from './network/getDataStatic';
import { article, categoriesData } from './types/types';
import './App.css';

const App: React.FC = () => {
  const [artListArr, setArtListArr] = useState<article[] | undefined>(
    undefined
  );
  const [categoriesArr, setCategoriesArr] = useState<
    categoriesData[] | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchTxt, SetSearchTxt] = useState('');
  const [showModal, setShowModal] = useState(false);

  const articleUrl = `https://orgavision-codingchallenge.azurewebsites.net/v1/article
    ?category=${encodeURI(categoryFilter)}
    &search=${encodeURI(searchTxt)}`;

  useEffect(() => {
    setIsLoading(true);
    getArticles(articleUrl)
      .then((res) => {
        setArtListArr(res.articleArr);
        setCategoriesArr(res.categoriesArr);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [articleUrl]);

  const modalToggler = useCallback(() => {
    setShowModal((state) => !state);
  }, []);

  const handleCatFilterChange = useCallback((filter: string) => {
    setCategoryFilter(filter);
  }, []);

  const handleSearchTxtChange = debounce(
    useCallback((text: string) => {
      SetSearchTxt(text);
    }, []),
    300
  );

  const articleDisplay = isLoading ? (
    <Card 
      article={undefined} 
      openModal={() => {}} 
      catFilter={() => {}} />
  ) : (
    <ArticleList
      artListArr={artListArr}
      handleCatFilterChange={handleCatFilterChange}
      modalToggler={modalToggler}
    />
  );

  return (
    <div>
      <Toolbar
        changeText={handleSearchTxtChange}
        changeCategory={handleCatFilterChange}
        categories={categoriesArr}
        filteredCategory={categoryFilter}
      />
      {articleDisplay}
      <Modal show={showModal} close={modalToggler} />
    </div>
  );
};

export default App;
