import axios from 'axios';
import {
  categoriesResponse,
  backendResponse,
  article,
} from '../types/types';

const getCategories = async () => {
  try {
    const categoryUrl =
      'https://orgavision-codingchallenge.azurewebsites.net/v1/category';
    const resCategories = await axios.get<categoriesResponse>(categoryUrl);
    const categoriesArr = resCategories.data.records.map((cat) => {
      return {
        id: cat.id,
        color: cat.fields.color,
        name: cat.fields.name,
      };
    });
    return categoriesArr;
  } catch (err) {
    return undefined;
  }
};

const getArticles = async (articleUrl: string) => {
  const categoriesArr = await getCategories();
  try {
    const response = await axios.get<backendResponse>(articleUrl);

    const articleArr: article[] = response.data.records.map((item) => {
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
  } catch (err) {
    return {
      articleArr: undefined,
      categoriesArr: categoriesArr,
    };
  }
};

export default getArticles;
