import React from 'react';
import Search from '../Search/Search';
import styles from './Toolbar.module.css';
import { categoriesData } from '../../types/types';

interface Props {
  changeCategory: (category: string) => void;
  changeText: (text: string) => void;
  categories: categoriesData[] | undefined;
  filteredCategory: string;
}

const Toolbar: React.FC<Props> = React.memo((props) => {
  return (
    <div className={styles.toolbar}>
      <h2 className={styles.logo}>OrgaVision</h2>
      <Search {...props} />
    </div>
  );
});

export default Toolbar;