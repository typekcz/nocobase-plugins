import { ArrayItems, FormTab } from '@formily/antd-v5';
import { RemoteSelect, SchemaComponent, Variable } from '@nocobase/client';
import { Space } from 'antd';
import React from 'react';
import { useAuthAnonymousTranslation } from './locale';

const schema = {
  type: 'object',
  properties: {
    public: {
      type: 'object',
      properties: {
        anonymousUser: {
          'x-decorator': 'FormItem',
          type: 'number',
          title: '{{t("Anonymous user")}}',
          required: true,
          'x-component': 'RemoteSelect',
          'x-component-props': {
            multiple: false,
            fieldNames: {
              label: 'nickname',
              value: 'id',
            },
            service: {
              resource: 'users',
            },
          },
        },
      },
    },
  },
};

export const Options = () => {
  const { t } = useAuthAnonymousTranslation();
  return <SchemaComponent scope={{ t }} components={{ ArrayItems, Space, FormTab }} schema={schema} />;
};
