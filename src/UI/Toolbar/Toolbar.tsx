import React from 'react';
import Search from '../../Components/Search/Search';
import styles from './Toolbar.module.css';

interface categoriesData {
  id: string;
  color: string;
  name: string;
}

interface Props {
  changeCategory: (category: string) => void;
  changeText: (text: string) => void;
  categories: categoriesData[];
  filteredCategory: string;
}

const Toolbar: React.FC<Props> = (props) => {
  return (
    <div className={styles.toolbar}>
      <h2 className={styles.logo}>OrgaVision</h2>
      <Search {...props} />
    </div>
  );
};

export default Toolbar;