import { Story, Meta } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { FormItem, FormItemProps } from '.';
import { FaEnvelope } from 'react-icons/fa';
import { Textarea } from '@chakra-ui/react';

export default {
  title: 'Forms/FormItem',
  component: FormItem,
} as Meta<typeof FormItem>;

const schema = yup.object({
  email: yup.string().email().required(),
});

const Template: Story<FormItemProps> = (args) => {
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  return (
    <FormItem {...args} name="email" errors={errors} register={register} />
  );
};

export const Default = Template.bind({});
Default.args = {};

export const LeftElement = Template.bind({});
LeftElement.args = {
  leftElement: <FaEnvelope />,
};

export const AsTextarea = Template.bind({});
AsTextarea.args = {
  label: 'Textarea',
  placeholder: 'Enter text',
  as: Textarea,
};
