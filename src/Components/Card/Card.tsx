import React from 'react';
import styles from './Card.module.css';
import { article } from '../../types/types';

interface Props {
  article: article | undefined;
  openModal: () => void;
  catFilter: (filter: string) => void;
}

const Card: React.FC<Props> = (props) => {
  const { article, openModal, catFilter } = props;

  const cardDisplay = () => {
    if (article === undefined) {
      return (
        <div className={styles.list}>
          <div className={styles.card}>
            <h3 className={styles.titleEmpty}>XXXXX</h3>
            <p className={styles.categoryEmpty}>XXXXXX</p>
            <p className={styles.teaserEmpty}>
              XXX XXX XXX XXXX XXX XXX XXXX XXX XXX XXX XXX XXX
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.card}>
          <button className={styles.title} onClick={openModal}>
            {article.title}
          </button>   
          <button
            className={styles.category}
            style={{backgroundColor: article.categoryDisplayColor}}
            onClick={() => catFilter(article.categoryDisplayName || '')}
          >
            {article.categoryDisplayName}
          </button>
          <p className={styles.teaser}>{article.teaser}</p>
        </div>
      );
    }
  };
  return cardDisplay();
};

export default Card;
