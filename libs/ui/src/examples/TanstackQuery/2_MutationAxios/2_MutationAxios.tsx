/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormEvent, useState } from 'react'

import { Button, Input, SimpleGrid, Skeleton, Stack } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { Category } from '@wsvvrijheid/types'
import { Request } from '@wsvvrijheid/utils'

import { createCategoryWithAxios } from '../createCategoryWithAxios'

// We will create a new category
// Category has `name_en`, `name_nl`, `name_tr` and `slug` fields

export const MutationAxios = () => {
  // TODO: Create states for the input fields `name_en`, `name_tr` and `name_nl`
  const [nameEn, setNameEn] = useState<string>('')
  const [nameTr, setNameTr] = useState<string>('')
  const [nameNl, setNameNl] = useState<string>('')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      Request.collection<Category[]>({
        url: 'api/categories',
      }),
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: Call the mutation function (createCategoryWithAxios) with the input values from the state
    const res = createCategoryWithAxios({
      name_en: nameEn,
      name_nl: nameTr,
      name_tr: nameNl,
    })
    console.log(res)
  }

  return (
    <SimpleGrid p={8} bg="gray.100" columns={{ base: 1, md: 2 }} gap={8}>
      <form onSubmit={handleSubmit}>
        <Stack p={8} bg="white" spacing={4}>
          {/* TODO: Add input fields for `name_en`, `name_tr` and `name_nl` */}
          <Input
            placeholder="name_en"
            onChange={e => setNameEn(e.target.value)}
          />
          <Input
            placeholder="name_tr"
            onChange={e => setNameTr(e.target.value)}
          />
          <Input
            placeholder="name_nl"
            onChange={e => setNameNl(e.target.value)}
          />
          <Button colorScheme="primary" type="submit">
            Create
          </Button>
        </Stack>
      </form>
      <Stack p={8} bg="white" spacing={4}>
        {data?.data.map((category, i) => (
          <Skeleton isLoaded={!isLoading && !isFetching} key={i}>
            {category.name_en}
          </Skeleton>
        ))}
      </Stack>
    </SimpleGrid>
  )
}
