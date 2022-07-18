import { Story, Meta } from '@storybook/react';
import React from 'react';
import { FieldValues } from 'react-hook-form';

import { ForgotPasswordForm, ForgotPasswordFormProps } from '.';

export default {
  title: 'Forms/ForgotPasswordForm',
  component: ForgotPasswordForm,
} as Meta<typeof ForgotPasswordForm>;

const Template: Story<ForgotPasswordFormProps> = (args) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const onSubmit = (data: FieldValues) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    confirm(JSON.stringify(data));
  };
  return (
    <ForgotPasswordForm onSubmitHandler={onSubmit} isLoading={isLoading} />
  );
};

export const Default = Template.bind({});
Default.args = {};
