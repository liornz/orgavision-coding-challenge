import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Card from '../Card/Card';
import Toolbar from '../../UI/Toolbar/Toolbar';
import styles from './ArticleList.module.css';
import Modal from '../../UI/Modal/Modal';
import { debounce } from 'lodash';

interface Props {}

interface article {
  id: string;
  title: string;
  teaser: string;
  category: string[];
  categoryDisplayName: string | undefined;
  categoryDisplayColor: string | undefined;
}

interface backendResponse {
  records: {
    id: string;
    fields: {
      teaser: string;
      title: string;
      category: string[];
    };
  }[];
}

interface categoriesResponse {
  records: {
    id: string;
    fields: {
      color: string;
      name: string;
    };
  }[];
}

interface categoriesData {
  id: string;
  color: string;
  name: string;
}

let categoriesArr: categoriesData[] = [];

const fetchCategories = async () => {
  try {
    const categoryUrl =
      'https://orgavision-codingchallenge.azurewebsites.net/v1/category';
    const resCategories = await axios.get<categoriesResponse>(categoryUrl);
    categoriesArr = resCategories.data.records.map((cat) => {
      return {
        id: cat.id,
        color: cat.fields.color,
        name: cat.fields.name,
      };
    });
  } catch (err) {
          alert('Could not fetch categories - display degraded!');
  }
};

const ArticleList: React.FC<Props> = () => {
  const [artListArr, setArtListArr] = useState<article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchTxt, SetSearchTxt] = useState('');
  const [showModal, setShowModal] = useState(false);

  const modalToggler = () => {
    setShowModal((state) => !state);
  };

  const handleCatFilterChange = (filter: string) => {
    setCategoryFilter(filter);
  };

  const handleSearchTxtChange = debounce((text: string) => {
    SetSearchTxt(text);
  }, 300);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const articleUrl = `https://orgavision-codingchallenge.azurewebsites.net/v1/article?category=${categoryFilter}&search=${searchTxt}`;
    const response = await axios.get<backendResponse>(articleUrl);
    setIsLoading(false);

    if (response.data.records.length !== 0) {
      const articleArr: article[] = response.data.records.map((item) => {
        return {
          id: item.id,
          title: item.fields.title,
          teaser: item.fields.teaser,
          category: item.fields.category,
          categoryDisplayName: categoriesArr.find(
            (cat) => cat.id === item.fields.category[0]
          )?.name,
          categoryDisplayColor: categoriesArr.find(
            (cat) => cat.id === item.fields.category[0]
          )?.color,
        };
      });
      setArtListArr(articleArr);
    } else {
      setArtListArr([]);
    }
  }, [searchTxt, categoryFilter]);

  useEffect(() => {
    fetchCategories().then((res) => {
      fetchData()
        .then()
        .catch((err) => {
          alert('Could not fetch Data!');
        })
        .catch((err) => {
          alert('Could not fetch categories - display degraded!');
        });
    });
  }, [fetchData]);

  const emptyArticle = {
    id: '',
    title: '_______',
    teaser: '_____________________________________________',
    category: ['_________'],
    categoryDisplayName: '__________',
    categoryDisplayColor: '',
  };

  return (
    <>
      <Toolbar
        changeText={handleSearchTxtChange}
        changeCategory={handleCatFilterChange}
        categories={categoriesArr}
        filteredCategory={categoryFilter}
      />
      {isLoading ? (
        <div data-testid="loading" className={styles.list}>
          <Card
            article={emptyArticle}
            openModal={modalToggler}
            catFilter={handleCatFilterChange}
          />
        </div>
      ) : artListArr.length === 0 ? (
        <div className={styles.noResults}>
          <h2>No Results for Your Search Criteria</h2>
        </div>
      ) : (
        <div className={styles.list}>
          {artListArr.map((article) => {
            return (
              <Card
                key={article.id}
                article={article}
                openModal={modalToggler}
                catFilter={handleCatFilterChange}
              />
            );
          })}
        </div>
      )}
      <Modal show={showModal} close={modalToggler} />
    </>
  );
};

export default ArticleList;
