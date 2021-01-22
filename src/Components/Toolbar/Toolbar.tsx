import React from 'react';
import styles from './Toolbar.module.css';

interface Props {
  search: React.ReactElement
}

const Toolbar: React.FC<Props> = React.memo((props) => {
  const { search } = props;
  return (
    <div className={styles.toolbar}>
      <h2 className={styles.logo}>Knowledge Base</h2>
      {search}
    </div>
  );
});

export default Toolbar;