import { FormEvent, useState } from 'react'

import { Button, Input, Stack } from '@chakra-ui/react'

import { createCategoryWithMutation } from '../createCategoryWithMutation'

export const MutationFn = () => {
  // TODO: Create states for the input fields `name_en`, `name_tr` and `name_nl`
  const [nameEn, setNameEn] = useState<string>('')
  const [nameTr, setNameTr] = useState<string>('')
  const [nameNl, setNameNl] = useState<string>('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: Call the mutation function (createCategoryWithMutation) with the input values from the state
    const res = createCategoryWithMutation({
      name_en: nameEn,
      name_tr: nameTr,
      name_nl: nameNl,
    })
    console.log(res)
  }

  return (
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
  )
}
