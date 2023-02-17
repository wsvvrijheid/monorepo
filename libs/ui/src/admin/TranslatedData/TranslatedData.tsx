// import { FormControl, FormLabel, Stack, Textarea } from '@chakra-ui/react'
// import { StrapiModel, StrapiUrl } from '@wsvvrijheid/types'
// import { capitalize } from 'lodash'

// import { FormItem, MasonryGrid, MdFormItem, WImage } from '../../components'
// import { ModelSelect } from '../ModelForm/ModelSelect'
// export type TranslatedFieldProps = {
//   url: string
//   model: ''
//   fields: ''
// }

// export const TranslatedData = <T extends StrapiModel>({
//   url,
//   model,
//   fields,
// }: TranslatedFieldProps<T>) => {
//   const disabledStyle = {
//     borderColor: 'transparent',
//     _hover: { borderColor: 'transparent' },
//     color: 'gray.500',
//   }
// const translatedModel ={
//     title:model?.title,
//     description:model?.description,
//     content:model?.content,
//     image:model?.
// }

//   return (
//     <Stack spacing={8}>
//       <MasonryGrid cols={[1, 1, 1, 2]} columnGap={8} rowGap={4}>
//         {fields.map((field, index) => {
//           const label = field.label || capitalize(field.name as string)

//           if (field.type === 'file') {
//             return (
//               <FormControl key={index} isRequired={field.isRequired} maxW={500}>
//                 <FormLabel>Image</FormLabel>
//                 <WImage url={url} model={model} />
//               </FormControl>
//             )
//           }

//           if (field.type === 'select') {
//             return (
//               <ModelSelect<T>
//                 key={index}
//                 url={field.url as StrapiUrl}
//                 isMulti={field.isMulti}
//                 isRequired={field.isRequired}
//                 name={field.name as string}
//                 label={label}
//                 _disabled={disabledStyle}
//               />
//             )
//           }

//           if (field.type === 'markdown') {
//             return (
//               <MdFormItem
//                 key={index}
//                 name={field.name as string}
//                 label={label}
//                 _disabled={disabledStyle}
//               />
//             )
//           }

//           const inputType =
//             field.type === 'date'
//               ? 'date'
//               : field.type === 'datetime-local'
//               ? 'datetime-local'
//               : 'text'

//           return (
//             <FormItem
//               {...(field.type === 'textarea' && { as: Textarea })}
//               key={index}
//               name={field.name as string}
//               type={inputType}
//               label={label}
//               isRequired={field.isRequired}
//               _disabled={disabledStyle}
//             />
//           )
//         })}
//       </MasonryGrid>
//     </Stack>
//   )
// }
