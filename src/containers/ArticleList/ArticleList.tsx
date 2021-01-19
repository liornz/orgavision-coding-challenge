import React from 'react';
import Card from '../../Components/Card/Card';
import styles from './ArticleList.module.css';
import { article } from '../../types/types';

interface Props {
  artListArr: article[] | undefined;
  handleCatFilterChange: (filter: string) => void;
  modalToggler: () => void;
}

const ArticleList: React.FC<Props> = React.memo((props) => {
  const { artListArr, handleCatFilterChange, modalToggler } = props;

  const renderArticleCards = () => {
    if (artListArr === undefined) {
      return (
        <div className={styles.noResults}>
          <h2>No data could be retrieved! Try again later!</h2>
        </div>
      );
    } else if (artListArr.length === 0) {
      return (
        <div className={styles.noResults}>
          <h2>No Results for Your Search Criteria</h2>
        </div>
      );
    } else
      return (
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
      );
  };
  return renderArticleCards();
});

export default ArticleList;
