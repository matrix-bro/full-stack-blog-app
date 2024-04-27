export interface BlogListProps {
  id: number;
  title: string;
  content: string;
}

interface Tag {
  name: string;
}

interface Category {
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
