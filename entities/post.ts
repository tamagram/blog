type POST = {
  id: string;
  title: string;
  content: string;
  published: Date;
  updated: Date;
  tags: string[];
  link: string;
};

export default POST;
