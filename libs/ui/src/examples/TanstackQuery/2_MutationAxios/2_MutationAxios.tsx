/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormEvent, useState } from 'react'

import { Button, Input, SimpleGrid, Skeleton, Stack } from '@chakra-ui/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Category, CategoryCreateInput, StrapiModel } from '@wsvvrijheid/types'
import { Mutation, Request, useGetArtCategories } from '@wsvvrijheid/utils'


import { createCategoryWithAxios } from '../createCategoryWithAxios'
import { Pagination } from 'libs/ui/src/components'
import { sendStatusCode } from 'next/dist/server/api-utils'

// We will create a new category
// Category has `name_en`, `name_nl`, `name_tr` and `slug` fields

export const MutationAxios = () => {
  const [nameEn, setNameEn] = useState<string>("")
  const [nameTr, setNameTr] = useState<string>("")
  const [nameNl, setNameNl] = useState<string>("")
  const [page, setPage] = useState(1)
  // TODO: Create states for the input fields `name_en`, `name_tr` and `name_nl`

  type CreateCategoryFormFields = {
    name_en: string,
    name_tr: string,
    name_nl: string,
  }

  type CategoryFormFields = Pick<
    CategoryCreateInput,
    'name_en' | 'name_nl' | 'name_tr'
  >
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['categories', page],
    queryFn: () =>
      Request.collection<Category[]>({
        url: 'api/categories',

      }),
  })

  // const createCategoryMutation = useMutation({
  //   mutationKey: ['create-category'],
  //   mutationFn: (variables: CreateCategoryFormFields) => {
  //     const categoryBody = {

  //       name_en: variables.name_en,
  //       name_tr: variables.name_tr,
  //       name_nl: variables.name_nl
  //     }
  //     return Mutation.post<Category, CategoryFormFields>(
  //       'api/categories',
  //       categoryBody,

  //     )
  //   },
  //   onSuccess: (data, variables) => {

  //   }
  // })
  console.log(nameNl)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: Call the mutation function (createCategoryWithAxios) with the input values from the state
    const args:CreateCategoryFormFields = {
      name_en:nameEn,
      name_tr:nameTr,
      name_nl:nameNl
    }
    createCategoryWithAxios({
      name_en: nameEn,
      name_nl: nameTr,
      name_tr: nameNl,
  })
  }

  return (
    <SimpleGrid p={8} bg='gray.100' columns={{ base: 1, md: 2 }} gap={8}>
      <form onSubmit={handleSubmit}>
        <Stack p={8} bg='white' spacing={4} >
          {/* TODO: Add input fields for `name_en`, `name_tr` and `name_nl` */}
          <Input
            placeholder='name_en'
            onChange={e => setNameEn(e.target.value)}
          />
          <Input
            placeholder='name_tr'
            onChange={e => setNameTr(e.target.value)}
          />
          <Input
            placeholder='name_nl'
            onChange={e => setNameNl(e.target.value)}
          />
          <Button colorScheme="primary">Create</Button>
        </Stack>
      </form>
      <Stack p={8} bg='white' spacing={4} >
        {data?.data.map((category, i) => (
          <Skeleton isLoaded={!isLoading && !isFetching} key={i} >
            {category.name_en}
          </Skeleton>
        ))}
      </Stack>



    </SimpleGrid>
  )
}
