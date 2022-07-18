import { Story, Meta } from '@storybook/react';
import React from 'react';
import { FieldValues } from 'react-hook-form';

import { ResetPasswordForm, ResetPasswordFormProps } from '.';

export default {
  title: 'Forms/ResetPasswordForm',
  component: ResetPasswordForm,
} as Meta<typeof ResetPasswordForm>;

const Template: Story<ResetPasswordFormProps> = (args) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const onSubmit = (data: FieldValues) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    confirm(JSON.stringify(data));
  };
  return <ResetPasswordForm onSubmitHandler={onSubmit} isLoading={isLoading} />;
};

export const Default = Template.bind({});
Default.args = {};
