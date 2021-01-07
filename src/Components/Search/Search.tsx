import React, { useState } from 'react';
import styles from './Search.module.css';

interface categoriesData {
  id: string;
  color: string;
  name: string;
}

interface Props {
  changeCategory: (category: string) => void;
  changeText: (text: string) => void;
  categories: categoriesData[];
}

const Search: React.FC<Props> = ({changeCategory, changeText, categories}) => {
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
      <input type="text" value={textSearch} onChange={handleInputTextChange} />
      <select name="category" id="catfilter" onChange={handleCategoryChange}>
        <option value="">Alle Kategorien</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Search;