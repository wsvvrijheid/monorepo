/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from 'react'

import { Box } from '@chakra-ui/react'

import { strapiRequest } from '@wsvvrijheid/lib';
import { Blog } from '@wsvvrijheid/types';

export type RequestFilterProps = {
  initialValue: string
}

export const FetchWithFilters: FC<RequestFilterProps> = ({ initialValue }) => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [title, setTitle] = useState(initialValue)

  const fetchBlogs = async () => {
    try {
      const response = await strapiRequest<Blog>({
        endpoint: 'blogs',
        locale: 'tr', 
        filters: {
          title: { $containsi: title },
        },
      });

      setBlogs(response.data); 
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, ); // Do I have to include a dependency array here? 

  // Title filter'ını değiştirmek için bir input ekleyin
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  return (
    <Box>
      <input
        type="text"
        value={title}
        onChange={(e) => handleTitleChange(e.target.value)}
        placeholder="Title'a göre filtrele"
      />

      {blogs.map((blog) => (
        <div key={blog.id}>{blog.title}</div>
      ))}
    </Box>
  );
};
