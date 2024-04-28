export interface BlogListProps {
  id: number;
  title: string;
  content: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

interface Comment {
  content: string;
  user: {
    first_name: string;
  };
}

export interface BlogDetailsProps {
  id: number;
  title: string;
  content: string;
  categories: Category[];
  tags: Tag[];
  comments?: Comment[];
}
