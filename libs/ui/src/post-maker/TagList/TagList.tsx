import { Tag, TagCloseButton, TagLabel, TagProps, Wrap } from '@chakra-ui/react'

interface TagListProps {
  tags: string[]
  onClickButton: (value: string) => void
  action?: 'add' | 'remove'
}

export const TagList = ({
  tags,
  onClickButton,
  ...rest
}: TagListProps & TagProps): JSX.Element => {
  return (
    <Wrap>
      {tags
        .filter(tag => !!tag)
        .map((tag, i) => (
          <Tag rounded="full" key={i} variant="outline" {...rest}>
            <TagLabel>{tag}</TagLabel>
            <TagCloseButton onClick={() => onClickButton(tag)} />
          </Tag>
        ))}
    </Wrap>
  )
}
