/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import axios from 'axios';

/*
  PUBLIC TOKEN'i buradan elde edemedim. 
  
  .env.local dosyasını '\monorepo\packages\ui\.env.local' lokasyonuna attım olmadı
  sonra  '\monorepo\packages\config\.env.local' lokasyonuna attım, ki burası aynı zamandan constants.ts dosyasının bulunduğu yer,
  ama yine olmadı bende en azından fetch'i çalıştırmak için direk public token'i verdim.

  import { API_URL, PUBLIC_TOKEN } from '@wsvvrijheid/config'
*/

// https://wsvv-api-staging.onrender.com/api/blogs?locale=tr
// You can use local API_URL instead of the above url
// yarn --cwd apps/api dev to run the api locally (http://localhost:1337)
// const BLOG_URL = `${API_URL}/api/blogs`

// Burada yine wsvv-api url'unu kullandım çünkü lokalde blogs kısmı boş.
const BLOG_URL = 'https://wsvv-api-staging.onrender.com/api/blogs';
const PUBLIC_TOKEN = '2ff0613e2f32eae88e6dbdb8f806d8b1bdbb7fab7b1b9c2f693013220fceae7423a1eb8fdf06938c3bd1afd8e695364e883434d714b223b0a2fb585fcd06432f105d80ff90be73f59d2fc4690919c8737e75b0f786b19f4cc6454e638ea77cefe3675d592580eb77656dcfcdb8c1042d599313e297012703ebf3ecf1d6e30603'

export const FetcWithAxios = () => {
  const [blogs, setBlogs] = useState([])
  //const [errors, setErrors] = useState('')
  let { locale } = useRouter()
  locale = 'tr';

  useEffect(() => {
    // TODO: fetch blogs with axios by using the API_URL and TOKEN (Authorization header with Bearer token)
    // NOTE: Not every locale may have a blog, so you may need to change the locale to tr
    // REF: https://docs.strapi.io/dev-docs/plugins/i18n#getting-localized-entries-with-the-locale-parameter

    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${BLOG_URL}?locale=${locale}`, {
          headers: {
            Authorization: `Bearer ${PUBLIC_TOKEN}`,
          }
        });
        console.log(response.data.data);
        setBlogs(response.data.data);
      } catch (error: any) {
        //  setErrors(PUBLIC_TOKEN + '\n' + error.message);
        console.error(error);
      }
    };

    fetchBlogs();
  }, [])

  return <Box>{/* TODO: Show only title of the blogs */}
    {/*errors && <h2>{errors}</h2>*/}
    <h1>Blog titles : </h1>
    {blogs.map(blog => <p key={blog.id}>{blog.title}</p>)}
  </Box>
}
