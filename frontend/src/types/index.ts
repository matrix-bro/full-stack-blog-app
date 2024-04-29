export interface BlogListProps {
  id: number;
  title: string;
  content: string;
}

export interface TagProps {
  id: number;
  name: string;
}

export interface CategoryProps {
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
  categories: CategoryProps[];
  tags: TagProps[];
  comments?: Comment[];
}

export type BlogFormFields = {
  title: string;
  content: string;
  categories: string[];
  tags: string[];
};
