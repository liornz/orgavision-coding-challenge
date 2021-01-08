import React from 'react';
import styles from './Card.module.css';

interface article {
  id: string;
  title: string;
  teaser: string;
  category: string[];
  categoryDisplayName: string | undefined;
  categoryDisplayColor: string | undefined;
}

interface Props {
  article: article;
  openModal?: () => void;
  catFilter: (filter: string) => void;
}

const Card: React.FC<Props> = ({ article, openModal, catFilter }) => {
 

  const noData = article.id === '';
  const categoryDNPlaceholder = noData ? '_______' : article.categoryDisplayName;

  return (
    <>
      <div className={styles.card}>
        <h3
          className={noData ? styles.titleEmpty : styles.title}
          onClick={openModal}
        >
          {article.title}
        </h3>
        <p
          style={{
            backgroundColor: noData
              ? 'lightgrey'
              : article.categoryDisplayColor,
          }}
          className={noData ? styles.categoryEmpty : styles.category}
          onClick={() => catFilter(article.categoryDisplayName || '')}
        >
          {article.categoryDisplayName || categoryDNPlaceholder}
        </p>
        <p className={noData ? styles.teaserEmpty : styles.teaser}>
          {article.teaser}
        </p>
      </div>
    </>
  );
};

export default Card;
