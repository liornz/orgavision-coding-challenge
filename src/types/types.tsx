export interface article {
  id: string;
  title: string;
  teaser: string;
  category: string[];
  categoryDisplayName: string | undefined;
  categoryDisplayColor: string | undefined;
}

export interface backendResponse {
  records: {
    id: string;
    fields: {
      teaser: string;
      title: string;
      categoryId: string[];
    };
  }[];
}

export interface categoriesResponse {
  records: {
    id: string;
    fields: {
      color: string;
      name: string;
    };
  }[];
}

export interface categoriesData {
  id: string;
  color: string;
  name: string;
}
