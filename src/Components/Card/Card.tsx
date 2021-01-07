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
article : article;
}

const Card: React.FC<Props> = ({article}) => {

  const noData = article.id === '';
  const categoryDNPlacegolder = noData ? '_______': null;

  return (
    <div className={styles.card}>
      <h3 className={noData ? styles.titleEmpty : styles.title}>{article.title}</h3>
      <p style={{backgroundColor: noData ? 'lightgrey' : article.categoryDisplayColor}} className={noData ? styles.categoryEmpty : styles.category}>{article.categoryDisplayName || categoryDNPlacegolder}</p>
      <p className={noData ? styles.teaserEmpty : styles.teaser}>{article.teaser}</p>
    </div>
  );
};

export default Card;