import React, { useState } from 'react';
import styles from './Search.module.css';
import { categoriesData } from '../../types/types';


interface Props {
  changeCategory: (category: string) => void;
  changeText: (text: string) => void;
  categories: categoriesData[] | undefined;
  filteredCategory: string;
}

const Search: React.FC<Props> = React.memo((props) => {
  const { changeCategory, changeText, categories, filteredCategory } = props;
  const [textSearch, setTextSearch] = useState('');

  const handleInputTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTextSearch(event.target.value);
    changeText(event.target.value);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    changeCategory(event.target.value);
  };

  return (
    <div className={styles.search}>
      <input type="text" value={textSearch} onChange={handleInputTextChange} placeholder='Suchen...'/>
      <select name="category" id="catfilter" onChange={handleCategoryChange} value={filteredCategory} >
        <option value="">Alle Kategorien</option>
        { categories !== undefined && categories.map((cat) => (
          <option key={cat.id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Search;
