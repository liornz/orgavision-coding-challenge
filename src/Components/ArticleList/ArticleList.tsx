import React from 'react';
import Card from './Card';
import styles from './ArticleList.module.css';
import { article } from '../../types/types';

interface Props {
  articleListArray: article[] | undefined;
  handleCatFilterChange: (filter: string) => void;
  modalToggler: () => void;
}

const ArticleList: React.FC<Props> = React.memo((props) => {
  const { articleListArray, handleCatFilterChange, modalToggler } = props;

  const errorLoadingList = () => (
    <div className={styles.noResults}>
      <h2>No data could be retrieved! Try again later!</h2>
    </div>
  );

  const emptyResultsList = () => (
    <div className={styles.noResults}>
      <h2>No Results for Your Search Criteria</h2>
    </div>
  );

  const articleList = () => (
    <div className={styles.list}>
      {articleListArray?.map((article) => {
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
  );

  const renderArticleCards = () => {
    if (articleListArray === undefined) {
      return errorLoadingList();
    } else if (articleListArray.length === 0) {
      return emptyResultsList();
    } else
      return articleList();
  };
  return renderArticleCards();
});

export default ArticleList;
