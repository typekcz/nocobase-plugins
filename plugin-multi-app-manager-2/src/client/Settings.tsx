/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { SchemaComponent } from '@nocobase/client';
import { Card } from 'antd';
import React from 'react';

const schema = {
  type: 'object',
};

export const Settings = () => {
  return (
    <Card bordered={false}>
      <SchemaComponent schema={schema} />
    </Card>
  );
};
