import { Avatar, HStack, Stack, Text } from '@chakra-ui/react';
import { Comment } from '@wsvvrijheid/types';
import { formatDistanceStrict } from 'date-fns';
import { FC } from 'react';

interface CommentItemProps {
  comment: Comment;
}

export const CommentItem: FC<CommentItemProps> = ({ comment }) => {
  const name =
    comment.user?.username ||
    comment.user?.artist?.name ||
    comment.user?.username ||
    comment.name;

  return (
    <HStack align="start">
      <Avatar
        size="sm"
        src={`${process.env['NX_PUBLIC_URL']}${comment.user?.avatar.url}`}
        name={name}
      />
      <Stack fontSize="sm">
        <HStack>
          <Text fontWeight={600}>{name}</Text>
          <Text textColor="gray.500" fontSize="xs">
            {formatDistanceStrict(new Date(comment.createdAt), new Date())}
          </Text>
        </HStack>

        {/* TODO Add read more button like instagram */}
        <Text noOfLines={3}>{comment.content}</Text>
      </Stack>
    </HStack>
  );
};
