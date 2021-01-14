import { categoriesData, article } from '../types/types';
import { json, categoryList } from '../Data/Data';

let categoriesArr: categoriesData[] = [];

const getCategories = () => {
    categoriesArr = categoryList.map((cat) => {
      return {
        id: cat.code,
        color: cat.color,
        name: cat.displayName,
      };
    });
    return categoriesArr;
};

const getArticles = async (articleUrl: string) => {
    const categoriesArr = getCategories();
    const articleArr: article[] = json.records.map((item) => {
      return {
        id: item.id,
        title: item.fields.title,
        teaser: item.fields.teaser,
        category: item.fields.category,
        categoryDisplayName: categoriesArr?.find(
          (cat) => cat.id === item.fields.category[0]
        )?.name,
        categoryDisplayColor: categoriesArr?.find(
          (cat) => cat.id === item.fields.category[0]
        )?.color,
      };
    });
    return {
      articleArr: articleArr,
      categoriesArr: categoriesArr,
    };
};

export default getArticles;
