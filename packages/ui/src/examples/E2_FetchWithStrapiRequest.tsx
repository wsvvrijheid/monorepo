import React, { useEffect, useState } from 'react';

import { Box } from '@chakra-ui/react';

import { strapiRequest } from '@wsvvrijheid/lib';
import { Blog } from '@wsvvrijheid/types';


// const blogUrl = `https://wsvv-api-staging.onrender.com/api/blogs?locale=tr` -> I don't know how the implement this url to the strapiRequest function. Beside this problem I think code is working properly.


// interface Blog {
//   id: number;
//   title: string;
// }

export const FetchWithStrapiRequest = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // I couldn't find any argument for api url in strapiRequest function
        const response = await strapiRequest<Blog>({
          endpoint: 'blogs',
          locale: 'tr',
        });
        // There is no response data here. 
        

        // property data does not exist on type 'StrapiModel[] so I write an if statement here 
        // if ('data' in response.data)
          setBlogs(response.data)
          console.log(response.data)
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </Box>
  );
};
