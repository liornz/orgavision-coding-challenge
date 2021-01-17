import React from 'react';
// import Search from '../Search/Search';
import styles from './Toolbar.module.css';
// import { categoriesData } from '../../types/types';

// interface pprops {
//   changeCategory: (category: string) => void;
//   changeText: (text: string) => void;
//   categories: categoriesData[] | undefined;
//   filteredCategory: string;
// }

interface Props {
  // changeCategory: (category: string) => void;
  // changeText: (text: string) => void;
  // categories: categoriesData[] | undefined;
  // filteredCategory: string;
  search: React.ReactElement
}

const Toolbar: React.FC<Props> = React.memo((props) => {
  const { search } = props;
  return (
    <div className={styles.toolbar}>
      <h2 className={styles.logo}>OrgaVision</h2>
      {/* <Search {...props} /> */}
      {search}
    </div>
  );
});

export default Toolbar;