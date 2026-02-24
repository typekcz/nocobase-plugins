import { CopyOutlined } from '@ant-design/icons';
import { ArrayItems, FormTab } from '@formily/antd-v5';
import { observer, useField } from '@formily/react';
import type { ArrayField, Field } from '@formily/core';
import { FormItem, Icon, Input, SchemaComponent, useApp } from '@nocobase/client';
import { Button, Card, Space, message } from 'antd';
import React, { useMemo } from 'react';
import { lang, useOidcTranslation } from './locale';
import { _ButtonColorTypes, _ButtonVariantTypes } from 'antd/es/button';

const schema = {
  type: 'object',
  properties: {
    public: {
      type: 'object',
      properties: {
        autoSignup: {
          'x-decorator': 'FormItem',
          type: 'boolean',
          title: '{{t("Sign up automatically when the user does not exist")}}',
          'x-component': 'Checkbox',
          default: true,
        },
      },
    },
    oidc: {
      type: 'object',
      properties: {
        collapse: {
          type: 'void',
          'x-component': 'FormTab',
          properties: {
            basic: {
              type: 'void',
              'x-component': 'FormTab.TabPane',
              'x-component-props': {
                tab: lang('Basic configuration'),
              },
              properties: {
                issuer: {
                  type: 'string',
                  title: '{{t("Issuer")}}',
                  'x-component': 'Input',
                  'x-decorator': 'FormItem',
                  required: true,
                },
                clientId: {
                  type: 'string',
                  title: '{{t("Client ID")}}',
                  'x-component': 'Input',
                  'x-decorator': 'FormItem',
                  required: true,
                },
                clientSecret: {
                  type: 'string',
                  title: '{{t("Client Secret")}}',
                  'x-component': 'Input',
                  'x-decorator': 'FormItem',
                  required: true,
                },
                scope: {
                  type: 'string',
                  title: '{{t("scope")}}',
                  'x-component': 'Input',
                  'x-decorator': 'FormItem',
                  'x-decorator-props': {
                    tooltip: '{{t("Default: openid profile email")}}',
                  },
                },
                idTokenSignedResponseAlg: {
                  type: 'string',
                  title: '{{t("id_token signed response algorithm")}}',
                  'x-component': 'Select',
                  'x-decorator': 'FormItem',
                  enum: [
                    { label: 'HS256', value: 'HS256' },
                    { label: 'HS384', value: 'HS384' },
                    { label: 'HS512', value: 'HS512' },
                    { label: 'RS256', value: 'RS256' },
                    { label: 'RS384', value: 'RS384' },
                    { label: 'RS512', value: 'RS512' },
                    { label: 'ES256', value: 'ES256' },
                    { label: 'ES384', value: 'ES384' },
                    { label: 'ES512', value: 'ES512' },
                    { label: 'PS256', value: 'PS256' },
                    { label: 'PS384', value: 'PS384' },
                    { label: 'PS512', value: 'PS512' },
                  ],
                },
                usage: {
                  type: 'void',
                  'x-component': 'Usage',
                },
              },
            },
            mapping: {
              type: 'void',
              'x-component': 'FormTab.TabPane',
              'x-component-props': {
                tab: lang('Field mapping'),
              },
              properties: {
                fieldMap: {
                  title: '{{t("Field Map")}}',
                  type: 'array',
                  'x-decorator': 'FormItem',
                  'x-component': 'ArrayItems',
                  items: {
                    type: 'object',
                    'x-decorator': 'ArrayItems.Item',
                    properties: {
                      space: {
                        type: 'void',
                        'x-component': 'Space',
                        properties: {
                          source: {
                            type: 'string',
                            'x-decorator': 'FormItem',
                            'x-component': 'Input',
                            'x-component-props': {
                              placeholder: '{{t("source")}}',
                            },
                          },
                          target: {
                            type: 'string',
                            'x-decorator': 'FormItem',
                            'x-component': 'Input',
                            'x-component-props': {
                              placeholder: '{{t("target")}}',
                            },
                          },
                          remove: {
                            type: 'void',
                            'x-decorator': 'FormItem',
                            'x-component': 'ArrayItems.Remove',
                          },
                        },
                      },
                    },
                  },
                  properties: {
                    add: {
                      type: 'void',
                      title: 'Add',
                      'x-component': 'ArrayItems.Addition',
                    },
                  },
                },
                userBindField: {
                  type: 'string',
                  title: '{{t("Use this field to bind the user")}}',
                  'x-component': 'Select',
                  'x-decorator': 'FormItem',
                  default: 'email',
                  enum: [
                    { label: lang('Email'), value: 'email' },
                    { label: lang('Username'), value: 'username' },
                  ],
                  required: true,
                },
              },
            },
            advanced: {
              type: 'void',
              'x-component': 'FormTab.TabPane',
              'x-component-props': {
                tab: lang('Advanced configuration'),
              },
              properties: {
                logout: {
                  type: 'boolean',
                  title: '{{t("RP-initiated logout")}}',
                  'x-component': 'Checkbox',
                  'x-decorator': 'FormItem',
                  'x-decorator-props': {
                    tooltip:
                      '{{t("Performs logout on the issuer (uses end_session_endpoint in the issuer configuration)")}}',
                  },
                },
                autoLoginRedirect: {
                  type: 'boolean',
                  title: '{{t("Automatic redirect to issuer login")}}',
                  'x-component': 'Checkbox',
                  'x-decorator': 'FormItem',
                  'x-decorator-props': {
                    tooltip:
                      '{{t("When user is logged out, redirect them to issuer login, skipping Nocobase login page. If you want to access the login page without being redirected, make sure your URL doesn\'t have the redirect parameter.")}}',
                  },
                },
                http: {
                  type: 'boolean',
                  title: '{{t("HTTP")}}',
                  'x-component': 'Checkbox',
                  'x-decorator': 'FormItem',
                  'x-decorator-props': {
                    tooltip: '{{t("Check if NocoBase is running on HTTP protocol")}}',
                  },
                },
                port: {
                  type: 'number',
                  title: '{{t("Port")}}',
                  'x-component': 'InputNumber',
                  'x-decorator': 'FormItem',
                  'x-decorator-props': {
                    tooltip: '{{t("The port number of the NocoBase service if it is not 80 or 443")}}',
                  },
                  'x-component-props': {
                    style: {
                      width: '15%',
                      minWidth: '100px',
                    },
                  },
                },
                stateToken: {
                  type: 'string',
                  title: '{{t("State token")}}',
                  'x-component': 'Input',
                  'x-decorator': 'FormItem',
                  description: lang(
                    "The state token helps prevent CSRF attacks. It's recommended to leave it blank for automatic random generation.",
                  ),
                },
                exchangeBodyKeys: {
                  type: 'array',
                  title: '{{t("Pass parameters in the authorization code grant exchange")}}',
                  'x-decorator': 'FormItem',
                  'x-component': 'ArrayItems',
                  default: [
                    { paramName: '', optionsKey: 'clientId' },
                    {
                      paramName: '',
                      optionsKey: 'clientSecret',
                    },
                  ],
                  items: {
                    type: 'object',
                    'x-decorator': 'ArrayItems.Item',
                    properties: {
                      space: {
                        type: 'void',
                        'x-component': 'Space',
                        properties: {
                          enabled: {
                            type: 'boolean',
                            'x-decorator': 'FormItem',
                            'x-component': 'Checkbox',
                          },
                          optionsKey: {
                            type: 'string',
                            'x-decorator': 'FormItem',
                            'x-decorator-props': {
                              style: {
                                width: '100px',
                              },
                            },
                            'x-component': 'Select',
                            'x-read-pretty': true,
                            enum: [
                              { label: lang('Client ID'), value: 'clientId' },
                              { label: lang('Client Secret'), value: 'clientSecret' },
                            ],
                          },
                          paramName: {
                            type: 'string',
                            'x-decorator': 'FormItem',
                            'x-component': 'Input',
                            'x-component-props': {
                              placeholder: '{{t("Parameter name")}}',
                            },
                          },
                        },
                      },
                    },
                  },
                },
                userInfoMethod: {
                  type: 'string',
                  title: '{{t("Method to call the user info endpoint")}}',
                  'x- decorator': 'FormItem',
                  'x-component': 'Radio.Group',
                  default: 'GET',
                  enum: [
                    {
                      label: 'GET',
                      value: 'GET',
                    },
                    {
                      label: 'POST',
                      value: 'POST',
                    },
                  ],
                  'x-reactions': [
                    {
                      dependencies: ['.accessTokenVia'],
                      when: '{{$deps[0] === "query"}}',
                      fulfill: {
                        state: {
                          value: 'GET',
                        },
                      },
                    },
                    {
                      dependencies: ['.accessTokenVia'],
                      when: '{{$deps[0] === "body"}}',
                      fulfill: {
                        state: {
                          value: 'POST',
                        },
                      },
                    },
                  ],
                },
                accessTokenVia: {
                  type: 'string',
                  title: '{{t("Where to put the access token when calling the user info endpoint")}}',
                  'x- decorator': 'FormItem',
                  'x-component': 'Radio.Group',
                  default: 'header',
                  enum: [
                    {
                      label: lang('Header'),
                      value: 'header',
                    },
                    {
                      label: lang('Body (Use with POST method)'),
                      value: 'body',
                    },
                    {
                      label: lang('Query parameters (Use with GET method)'),
                      value: 'query',
                    },
                  ],
                },
              },
            },
            buttonStyle: {
              type: 'object',
              'x-component': 'FormTab.TabPane',
              'x-component-props': {
                tab: lang('Button Style'),
              },
              properties: {
                type: {
                  type: 'string',
                  title: '{{t("Type")}}',
                  'x-component': 'Select',
                  'x-decorator': 'FormItem',
                  enum: ["default", "primary", "dashed", "link", "text"].map(v => ({ label: v.charAt(0).toUpperCase()+v.slice(1), value: v})),
                },
                shape: {
                  type: 'string',
                  title: '{{t("Shape")}}',
                  'x-component': 'Select',
                  'x-decorator': 'FormItem',
                  enum: ["default", "circle", "round"].map(v => ({ label: v.charAt(0).toUpperCase()+v.slice(1), value: v})),
                },
                variant: {
                  type: 'string',
                  title: '{{t("Variant")}}',
                  'x-component': 'Select',
                  'x-decorator': 'FormItem',
                  enum: _ButtonVariantTypes.map(v => ({ label: v.charAt(0).toUpperCase()+v.slice(1), value: v})),
                },
                color: {
                  type: 'string',
                  title: '{{t("Color")}}',
                  'x-component': 'Select',
                  'x-decorator': 'FormItem',
                  enum: _ButtonColorTypes.map(v => ({ label: v.charAt(0).toUpperCase()+v.slice(1), value: v})),
                },
                icon: {
                  type: 'string',
                  title: '{{t("Icon")}}',
                  'x-component': 'IconPicker',
                  'x-decorator': 'FormItem',
                  enum: _ButtonColorTypes.map(v => ({ label: v.charAt(0).toUpperCase()+v.slice(1), value: v})),
                },
                customStyle: {
                  title: '{{t("Custom Style")}}',
                  type: 'array',
                  'x-decorator': 'FormItem',
                  'x-component': 'ArrayItems',
                  items: {
                    type: 'object',
                    'x-decorator': 'ArrayItems.Item',
                    properties: {
                      space: {
                        type: 'void',
                        'x-component': 'Space',
                        properties: {
                          property: {
                            type: 'string',
                            'x-decorator': 'FormItem',
                            'x-component': 'Input',
                            'x-component-props': {
                              placeholder: '{{t("property")}}',
                            },
                          },
                          value: {
                            type: 'string',
                            'x-decorator': 'FormItem',
                            'x-component': 'Input',
                            'x-component-props': {
                              placeholder: '{{t("value")}}',
                            },
                          },
                          remove: {
                            type: 'void',
                            'x-decorator': 'FormItem',
                            'x-component': 'ArrayItems.Remove',
                          },
                        },
                      },
                    },
                  },
                  description: lang("JavaScript style CSS property names on the left, values on the right."),
                  properties: {
                    add: {
                      type: 'void',
                      title: 'Add',
                      'x-component': 'ArrayItems.Addition',
                    },
                  },
                },
                preview: {
                  type: 'void',
                  'x-component': 'ButtonStylePreview',
                },
              },
            },
          },
        },
      },
    },
  },
};

const Usage = observer(
  () => {
    const { t } = useOidcTranslation();
    const app = useApp();

    const url = useMemo(() => {
      return app.getApiUrl('oidc:redirect');
    }, [app]);

    const copy = (text: string) => {
      navigator.clipboard.writeText(text);
      message.success(t('Copied'));
    };

    return (
      <Card title={t('Usage')} type="inner">
        <FormItem label={t('Redirect URL')}>
          <Input value={url} disabled={true} addonBefore={<CopyOutlined onClick={() => copy(url)} />} />
        </FormItem>
      </Card>
    );
  },
  { displayName: 'Usage' },
);

const ButtonStylePreview = observer(
  () => {
    const field = useField();

    // Query sibling fields to access their observable values
    const typeField = field.query('.type').take() as Field;
    const shapeField = field.query('.shape').take() as Field;
    const variantField = field.query('.variant').take() as Field;
    const colorField = field.query('.color').take() as Field;
    const iconField = field.query('.icon').take() as Field;
    const customStyleField = field.query('.customStyle').take() as ArrayField;

    const buttonProps = useMemo(() => {
      const props: any = {};

      if(typeField?.value) props.type = typeField.value;
      if(shapeField?.value) props.shape = shapeField.value;
      if(variantField?.value) props.variant = variantField.value;
      if(colorField?.value) props.color = colorField.value;
      if(iconField?.value) props.icon = <Icon type={iconField.value} />;

      if (Array.isArray(customStyleField?.value)) {
        props.style = customStyleField.value.reduce((obj: React.CSSProperties, s: { property: string, value: string }) => {
          obj[s.property] = s.value; return obj;
        }, {});
      }

      return props;
    }, [typeField?.value, shapeField?.value, variantField?.value, colorField?.value, iconField?.value, customStyleField?.value]);

    return (
      <Card title="Preview" type="inner">
        <Space direction="vertical" style={{ width: '100%' }}>
          <div style={{ display: "flex", flexDirection: "column", width: "320px" }}>
            <Button {...buttonProps}>
              Preview Button
            </Button>
          </div>
        </Space>
      </Card>
    );
  },
  { displayName: 'ButtonStylePreview' },
);

export const Options = () => {
  const { t } = useOidcTranslation();
  return <SchemaComponent scope={{ t }} components={{ Usage, ButtonStylePreview, ArrayItems, Space, FormTab }} schema={schema} />;
};
